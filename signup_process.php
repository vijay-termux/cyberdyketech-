<?php
// signup_process.php
require_once "database.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("⚠️ Invalid request method.");
}

// Collect and sanitize input
$firstName = trim($_POST['firstName'] ?? '');
$lastName  = trim($_POST['lastName'] ?? '');
$email     = trim($_POST['email'] ?? '');
$username  = trim($_POST['username'] ?? '');
$userType  = trim($_POST['userType'] ?? '');
$password  = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

// Basic validation
$errors = [];
if (!$firstName) $errors[] = "First name is required.";
if (!$lastName) $errors[] = "Last name is required.";
if (!$email) $errors[] = "Email is required.";
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";
if (!$username) $errors[] = "Username is required.";
if (!$userType) $errors[] = "User type is required.";
if (!$password) $errors[] = "Password is required.";
if ($password !== $confirmPassword) $errors[] = "Passwords do not match.";

if ($errors) {
    die("⚠️ " . implode(" ", $errors));
}

// Hash the password securely
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

try {
    $database = new Database();
    $db = $database->getConnection();

    // Check for existing email or username
    $stmt = $db->prepare("SELECT id FROM users WHERE email = :email OR username = :username");
    $stmt->execute([':email' => $email, ':username' => $username]);
    if ($stmt->fetch()) {
        die("⚠️ Email or username already exists.");
    }

    // Insert new user
    $insert = $db->prepare("
        INSERT INTO users
        (first_name, last_name, email, username, user_type, password_hash, created_at, updated_at, is_active)
        VALUES
        (:first_name, :last_name, :email, :username, :user_type, :password_hash, NOW(), NOW(), 1)
    ");

    $insert->execute([
        ':first_name'    => $firstName,
        ':last_name'     => $lastName,
        ':email'         => $email,
        ':username'      => $username,
        ':user_type'     => $userType,
        ':password_hash' => $hashedPassword
    ]);

    echo "✅ Signup successful! You can now <a href='login.html'>login</a>.";
} catch (PDOException $e) {
    die("❌ Database error: " . $e->getMessage());
} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}