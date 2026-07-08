<?php
session_start();
$conn = new mysqli("localhost", "root", "", "cyberdyke_db");

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Login Handler
if (isset($_POST['action']) && $_POST['action'] == 'login') {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $res = $conn->query("SELECT * FROM admins WHERE username='$user'");
    $row = $res->fetch_assoc();
    if ($row && password_verify($pass, $row['password'])) {
        $_SESSION['admin'] = true;
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
    exit;
}

// Fetch Leads for Dashboard
if (isset($_GET['action']) && $_GET['action'] == 'fetch_leads') {
    if (!isset($_SESSION['admin'])) die("Unauthorized");
    $res = $conn->query("SELECT * FROM leads ORDER BY created_at DESC");
    $data = [];
    while($row = $res->fetch_assoc()) $data[] = $row;
    echo json_encode($data);
    exit;
}

// Save Contact/Lead
if (isset($_POST['action']) && $_POST['action'] == 'save_lead') {
    $email = $conn->real_escape_string($_POST['email']);
    $interest = $conn->real_escape_string($_POST['interest']);
    $conn->query("INSERT INTO leads (email, interest) VALUES ('$email', '$interest')");
    echo "Saved";
    exit;
}
?>