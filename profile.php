<?php
$pageTitle = 'Profile';
include 'includes/header.php';

$database = new Database();
$db = $database->getConnection();

// Handle profile updates
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update_profile'])) {
    $name = sanitizeInput($_POST['name']);
    $bio = sanitizeInput($_POST['bio']);
    $location = sanitizeInput($_POST['location']);
    $fieldOfInterest = sanitizeInput($_POST['field_of_interest']);
    $profilePic = $currentUser['profile_pic'];
    
    // Handle profile picture upload
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === 0) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (in_array($_FILES['profile_pic']['type'], $allowedTypes)) {
            $uploadedPic = uploadFile($_FILES['profile_pic'], 'uploads/profiles/');
            if ($uploadedPic) {
                $profilePic = $uploadedPic;
            }
        }
    }
    
    if (!empty($name)) {
        $query = "UPDATE users SET name = :name, bio = :bio, location = :location, field_of_interest = :field_of_interest, profile_pic = :profile_pic WHERE id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':bio', $bio);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':field_of_interest', $fieldOfInterest);
        $stmt->bindParam(':profile_pic', $profilePic);
        $stmt->bindParam(':user_id', $_SESSION['user_id']);
        
        if ($stmt->execute()) {
            $_SESSION['user_name'] = $name;
            header('Location: profile.php?updated=1');
            exit();
        }
    }
}

// Get user statistics
$statsQuery = "
    SELECT 
        (SELECT COUNT(*) FROM posts WHERE user_id = :user_id) as posts_count,
        (SELECT COUNT(*) FROM questions WHERE user_id = :user_id) as questions_count,
        (SELECT COUNT(*) FROM answers WHERE user_id = :user_id) as answers_count,
        (SELECT COUNT(*) FROM follows WHERE follower_id = :user_id) as following_count,
        (SELECT COUNT(*) FROM follows WHERE following_id = :user_id) as followers_count,
        (SELECT COUNT(*) FROM community_members WHERE user_id = :user_id) as communities_count
";
$statsStmt = $db->prepare($statsQuery);
$statsStmt->bindParam(':user_id', $_SESSION['user_id']);
$statsStmt->execute();
$userStats = $statsStmt->fetch();

// Get user's recent posts
$recentPostsQuery = "
    SELECT p.*, COUNT(DISTINCT l.id) as like_count, COUNT(DISTINCT c.id) as comment_count
    FROM posts p
    LEFT JOIN likes l ON l.target_type = 'post' AND l.target_id = p.id
    LEFT JOIN comments c ON c.parent_type = 'post' AND c.parent_id = p.id
    WHERE p.user_id = :user_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT 5
";
$recentPostsStmt = $db->prepare($recentPostsQuery);
$recentPostsStmt->bindParam(':user_id', $_SESSION['user_id']);
$recentPostsStmt->execute();
$recentPosts = $recentPostsStmt->fetchAll();

// Get user's recent Q&A activity
$recentQAQuery = "
    (SELECT 'question' as type, q.id, q.question as content, q.created_at, q.category
     FROM questions q WHERE q.user_id = :user_id)
    UNION ALL
    (SELECT 'answer' as type, a.id, a.answer as content, a.created_at, 
     (SELECT category FROM questions WHERE id = a.question_id) as category
     FROM answers a WHERE a.user_id = :user_id)
    ORDER BY created_at DESC
    LIMIT 5
";
$recentQAStmt = $db->prepare($recentQAQuery);
$recentQAStmt->bindParam(':user_id', $_SESSION['user_id']);
$recentQAStmt->execute();
$recentQA = $recentQAStmt->fetchAll();

// Get user's communities
$userCommunitiesQuery = "
    SELECT c.name, c.category, cm.joined_at
    FROM community_members cm
    JOIN communities c ON cm.community_id = c.id
    WHERE cm.user_id = :user_id
    ORDER BY cm.joined_at DESC
    LIMIT 5
";
$userCommunitiesStmt = $db->prepare($userCommunitiesQuery);
$userCommunitiesStmt->bindParam(':user_id', $_SESSION['user_id']);
$userCommunitiesStmt->execute();
$userCommunities = $userCommunitiesStmt->fetchAll();
?>

<div class="container">
    <?php if (isset($_GET['updated'])): ?>
        <div class="alert alert-success">
            Profile updated successfully!
        </div>
    <?php endif; ?>
    
    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
        <!-- Profile Info & Edit -->
        <div>
            <div class="card mb-3">
                <div class="card-header">
                    <h3 class="card-title">Profile Information</h3>
                </div>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <div class="user-avatar" style="width: 80px; height: 80px; font-size: 32px; margin: 0 auto 16px;">
                            <?php if ($currentUser['profile_pic'] && $currentUser['profile_pic'] !== 'default-avatar.jpg'): ?>
                                <img src="uploads/profiles/<?php echo htmlspecialchars($currentUser['profile_pic']); ?>" 
                                     alt="Profile Picture" 
                                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                            <?php else: ?>
                                <?php echo strtoupper(substr($currentUser['name'], 0, 1)); ?>
                            <?php endif; ?>
                        </div>
                        <h4 style="margin: 0 0 4px 0;"><?php echo htmlspecialchars($currentUser['name']); ?></h4>
                        <p style="margin: 0; color: var(--text-secondary); text-transform: capitalize;">
                            <?php echo htmlspecialchars($currentUser['role']); ?>
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; text-align: center;">
                            <div>
                                <div style="font-size: 20px; font-weight: bold; color: var(--primary-color);">
                                    <?php echo $userStats['followers_count']; ?>
                                </div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Followers</div>
                            </div>
                            <div>
                                <div style="font-size: 20px; font-weight: bold; color: var(--primary-color);">
                                    <?php echo $userStats['following_count']; ?>
                                </div>
                                <div style="font-size: 12px; color: var(--text-secondary);">Following</div>
                            </div>
                        </div>
                    </div>
                    
                    <?php if ($currentUser['bio']): ?>
                        <div style="margin-bottom: 16px;">
                            <strong style="font-size: 13px;">Bio:</strong>
                            <p style="margin: 4px 0 0 0; font-size: 14px; color: var(--text-secondary);">
                                <?php echo nl2br(htmlspecialchars($currentUser['bio'])); ?>
                            </p>
                        </div>
                    <?php endif; ?>
                    
                    <div style="display: grid; gap: 8px; font-size: 13px;">
                        <div>
                            <i class="fas fa-graduation-cap" style="color: var(--primary-color); width: 16px;"></i>
                            <?php echo htmlspecialchars($currentUser['field_of_interest']); ?>
                        </div>
                        <?php if ($currentUser['location']): ?>
                            <div>
                                <i class="fas fa-map-marker-alt" style="color: var(--primary-color); width: 16px;"></i>
                                <?php echo htmlspecialchars($currentUser['location']); ?>
                            </div>
                        <?php endif; ?>
                        <div>
                            <i class="fas fa-calendar" style="color: var(--primary-color); width: 16px;"></i>
                            Joined <?php echo date('M Y', strtotime($currentUser['created_at'])); ?>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary btn-full mt-3" onclick="toggleEditProfile()">
                        <i class="fas fa-edit"></i> Edit Profile
                    </button>
                </div>
            </div>
            
            <!-- Activity Stats -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Activity Stats</h3>
                </div>
                <div class="card-body">
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px;">
                                <i class="fas fa-edit" style="color: var(--primary-color); width: 16px;"></i>
                                Posts
                            </span>
                            <span style="font-weight: 600;"><?php echo $userStats['posts_count']; ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px;">
                                <i class="fas fa-question-circle" style="color: var(--accent-color); width: 16px;"></i>
                                Questions
                            </span>
                            <span style="font-weight: 600;"><?php echo $userStats['questions_count']; ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px;">
                                <i class="fas fa-lightbulb" style="color: var(--success-color); width: 16px;"></i>
                                Answers
                            </span>
                            <span style="font-weight: 600;"><?php echo $userStats['answers_count']; ?></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 14px;">
                                <i class="fas fa-users" style="color: var(--secondary-color); width: 16px;"></i>
                                Communities
                            </span>
                            <span style="font-weight: 600;"><?php echo $userStats['communities_count']; ?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Activity Feed -->
        <div>
            <!-- Edit Profile Form -->
            <div id="editProfileForm" class="card" style="display: none; margin-bottom: 24px;">
                <div class="card-header">
                    <h3 class="card-title">Edit Profile</h3>
                </div>
                <div class="card-body">
                    <form method="POST" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="profile_pic">Profile Picture</label>
                            <input type="file" name="profile_pic" id="profile_pic" class="form-control" accept="image/*">
                        </div>
                        
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" name="name" id="name" class="form-control" 
                                   value="<?php echo htmlspecialchars($currentUser['name']); ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="bio">Bio</label>
                            <textarea name="bio" id="bio" class="form-control" rows="3" 
                                      placeholder="Tell us about yourself..."><?php echo htmlspecialchars($currentUser['bio']); ?></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="location">Location</label>
                            <input type="text" name="location" id="location" class="form-control" 
                                   value="<?php echo htmlspecialchars($currentUser['location']); ?>"
                                   placeholder="City, Country">
                        </div>
                        
                        <div class="form-group">
                            <label for="field_of_interest">Field of Interest</label>
                            <select name="field_of_interest" id="field_of_interest" class="form-control" required>
                                <option value="Engineering" <?php echo $currentUser['field_of_interest'] === 'Engineering' ? 'selected' : ''; ?>>Engineering</option>
                                <option value="Medical" <?php echo $currentUser['field_of_interest'] === 'Medical' ? 'selected' : ''; ?>>Medical</option>
                                <option value="Commerce" <?php echo $currentUser['field_of_interest'] === 'Commerce' ? 'selected' : ''; ?>>Commerce</option>
                                <option value="Arts & Design" <?php echo $currentUser['field_of_interest'] === 'Arts & Design' ? 'selected' : ''; ?>>Arts & Design</option>
                                <option value="Entrepreneurship" <?php echo $currentUser['field_of_interest'] === 'Entrepreneurship' ? 'selected' : ''; ?>>Entrepreneurship</option>
                            </select>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button type="submit" name="update_profile" class="btn btn-primary">Save Changes</button>
                            <button type="button" class="btn btn-secondary" onclick="toggleEditProfile()">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Recent Posts -->
            <div class="card mb-3">
                <div class="card-header">
                    <h3 class="card-title">Recent Posts</h3>
                </div>
                <div class="card-body">
                    <?php if (empty($recentPosts)): ?>
                        <p class="text-center" style="color: var(--text-secondary);">No posts yet.</p>
                    <?php else: ?>
                        <div style="display: grid; gap: 16px;">
                            <?php foreach ($recentPosts as $post): ?>
                                <div style="padding: 16px; border: 1px solid var(--border-light); border-radius: 8px;">
                                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5;">
                                        <?php echo nl2br(htmlspecialchars(substr($post['content'], 0, 150))) . (strlen($post['content']) > 150 ? '...' : ''); ?>
                                    </p>
                                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
                                        <div>
                                            <span><i class="fas fa-heart"></i> <?php echo $post['like_count']; ?></span>
                                            <span style="margin-left: 12px;"><i class="fas fa-comment"></i> <?php echo $post['comment_count']; ?></span>
                                        </div>
                                        <span><?php echo date('M j, Y', strtotime($post['created_at'])); ?></span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Recent Q&A Activity -->
            <div class="card mb-3">
                <div class="card-header">
                    <h3 class="card-title">Recent Q&A Activity</h3>
                </div>
                <div class="card-body">
                    <?php if (empty($recentQA)): ?>
                        <p class="text-center" style="color: var(--text-secondary);">No Q&A activity yet.</p>
                    <?php else: ?>
                        <div style="display: grid; gap: 16px;">
                            <?php foreach ($recentQA as $qa): ?>
                                <div style="padding: 16px; border: 1px solid var(--border-light); border-radius: 8px;">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                        <span style="background: <?php echo $qa['type'] === 'question' ? 'var(--accent-color)' : 'var(--success-color)'; ?>; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;">
                                            <?php echo $qa['type']; ?>
                                        </span>
                                        <span style="font-size: 12px; color: var(--text-secondary);">
                                            <?php echo htmlspecialchars($qa['category']); ?>
                                        </span>
                                    </div>
                                    <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.5;">
                                        <?php echo nl2br(htmlspecialchars(substr($qa['content'], 0, 120))) . (strlen($qa['content']) > 120 ? '...' : ''); ?>
                                    </p>
                                    <div style="font-size: 12px; color: var(--text-secondary);">
                                        <?php echo date('M j, Y', strtotime($qa['created_at'])); ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Communities -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Your Communities</h3>
                </div>
                <div class="card-body">
                    <?php if (empty($userCommunities)): ?>
                        <p class="text-center" style="color: var(--text-secondary);">Not a member of any communities yet.</p>
                    <?php else: ?>
                        <div style="display: grid; gap: 12px;">
                            <?php foreach ($userCommunities as $community): ?>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 14px;"><?php echo htmlspecialchars($community['name']); ?></div>
                                        <div style="font-size: 12px; color: var(--text-secondary);"><?php echo htmlspecialchars($community['category']); ?></div>
                                    </div>
                                    <div style="font-size: 11px; color: var(--text-light);">
                                        Joined <?php echo date('M Y', strtotime($community['joined_at'])); ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function toggleEditProfile() {
    const form = document.getElementById('editProfileForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
</script>

<?php include 'includes/footer.php'; ?>
