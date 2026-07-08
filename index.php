<?php
// ======================================================================
// 🛡️ CRITICAL SECURITY FIX
// We must start the session and check if the user is logged in
// before showing any content.
// ======================================================================
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: login.php'); // Or your main landing/login page
    exit;
}

$pageTitle = 'Home Feed';
include 'includes/header.php';
// You must create and include a file with your helper functions
// require_once 'includes/functions.php'; 

$database = new Database();
$db = $database->getConnection();

// Handle new post creation (your existing logic is good)
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['create_post'])) {
    // ... your existing, correct post creation logic goes here ...
    // Make sure sanitizeInput() and uploadFile() are defined in your functions file.
}

// =================================================================
// 🚀 PERFORMANCE FIX: EFFICIENT DATA FETCHING (N+1 PROBLEM SOLVED)
// =================================================================

// 1. Get all posts in one query
$postsQuery = "
    SELECT p.*, u.name as user_name, u.role as user_role,
           COUNT(DISTINCT l.id) as like_count,
           COUNT(DISTINCT c.id) as comment_count,
           EXISTS(SELECT 1 FROM likes WHERE user_id = :current_user_id AND target_type = 'post' AND target_id = p.id) as user_liked
    FROM posts p 
    JOIN users u ON p.user_id = u.id 
    LEFT JOIN likes l ON l.target_type = 'post' AND l.target_id = p.id
    LEFT JOIN comments c ON c.parent_type = 'post' AND c.parent_id = p.id
    GROUP BY p.id 
    ORDER BY p.created_at DESC
";
$stmt = $db->prepare($postsQuery);
$stmt->bindParam(':current_user_id', $_SESSION['user_id']);
$stmt->execute();
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

$commentsByPost = [];
$pollsByPost = [];

// If posts exist, fetch all their comments and polls in just two more queries
if (!empty($posts)) {
    $postIds = array_column($posts, 'id');
    $placeholders = implode(',', array_fill(0, count($postIds), '?'));

    // 2. Get all comments for ALL posts at once
    $commentsQuery = "
        SELECT c.*, u.name as user_name, u.role as user_role 
        FROM comments c 
        JOIN users u ON c.user_id = u.id 
        WHERE c.parent_type = 'post' AND c.parent_id IN ($placeholders)
        ORDER BY c.created_at ASC
    ";
    $commentsStmt = $db->prepare($commentsQuery);
    $commentsStmt->execute($postIds);
    $allComments = $commentsStmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Get all poll options for ALL posts at once
    $pollsQuery = "SELECT * FROM polls WHERE post_id IN ($placeholders) ORDER BY id";
    $pollsStmt = $db->prepare($pollsQuery);
    $pollsStmt->execute($postIds);
    $allPollOptions = $pollsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Now, organize the data in PHP to avoid extra queries in the loop
    foreach ($allComments as $comment) {
        $commentsByPost[$comment['parent_id']][] = $comment;
    }
    foreach ($allPollOptions as $pollOption) {
        $pollsByPost[$pollOption['post_id']][] = $pollOption;
    }
}
?>

<div class="feed-container">
    <div class="card">
        </div>
    
    <?php if (empty($posts)): ?>
        <div class="card"><div class="card-body text-center"><p>No posts yet. Be the first to share!</p></div></div>
    <?php else: ?>
        <?php foreach ($posts as $post): ?>
            <div class="post-card">
                <div class="post-header">
                    </div>
                
                <div class="post-content">
                    <p><?php echo nl2br(htmlspecialchars($post['content'])); ?></p>
                    
                    <?php if ($post['type'] === 'photo' && $post['media_path']): ?>
                        <img src="uploads/posts/<?php echo htmlspecialchars($post['media_path']); ?>" alt="Post image" style="max-width: 100%;">
                    <?php endif; ?>
                    
                    <?php if ($post['type'] === 'poll'): ?>
                        <div class="poll-container">
                            <?php
                            // Use the pre-fetched poll data - NO NEW QUERY NEEDED
                            $pollOptions = $pollsByPost[$post['id']] ?? [];
                            $totalVotes = array_sum(array_column($pollOptions, 'votes'));
                            ?>
                            <?php foreach ($pollOptions as $option): ?>
                                <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
                
                <div class="post-actions">
                    </div>
                
                <div id="comments-<?php echo $post['id']; ?>" class="comments-section" style="display: none;">
                    <div class="comments-container">
                        <?php
                        // Use the pre-fetched comment data - NO NEW QUERY NEEDED
                        $comments = $commentsByPost[$post['id']] ?? [];
                        ?>
                        <?php foreach ($comments as $comment): ?>
                            <div class="comment">
                                </div>
                        <?php endforeach; ?>
                        
                        <div class="add-comment">
                            </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<style>
    /* ... your CSS ... */
</style>
<script>
    // ... your JavaScript ...
</script>

<?php include 'includes/footer.php'; ?>