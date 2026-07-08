<?php
session_start(); // Start the session for CSRF token management

header('Content-Type: application/json'); // Set content type for AJAX response

// Include database configuration
require_once 'db_config.php';

// Define reCAPTCHA secret key (Consider moving to a .env file for better security)
define('RECAPTCHA_SECRET_KEY', '6Ld2f4grAAAAAPKwevcnby7QZ6wRrbFp_JpdLmem');

// This script handles the POST request. The initial CSRF token should be generated
// in the PHP file that serves the HTML form (e.g., your webinar.php).
// We'll proceed assuming the token is correctly passed from the form.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'message' => 'An unexpected error occurred.'];

    // 1. CSRF Token Validation
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $response['message'] = 'Invalid security token. Please refresh the page and try again.';
        error_log('CSRF token mismatch detected for IP: ' . $_SERVER['REMOTE_ADDR']);
        // Regenerate token for the next attempt on the page
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        echo json_encode($response);
        exit;
    }

    // After successful validation, regenerate the token to prevent replay attacks.
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    // 2. Honeypot Check
    if (!empty($_POST['website'])) {
        $response['message'] = 'Spam detected. Your submission could not be processed.';
        echo json_encode($response);
        exit;
    }

    // 3. reCAPTCHA Verification
    if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        $response['message'] = 'Please complete the reCAPTCHA.';
        echo json_encode($response);
        exit;
    }
    
    // NEW: Use cURL for a more robust API request
    $recaptcha_data = [
        'secret' => RECAPTCHA_SECRET_KEY,
        'response' => $_POST['g-recaptcha-response'],
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($recaptcha_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $recaptcha_result = curl_exec($ch);
    curl_close($ch);
    $recaptcha_json = json_decode($recaptcha_result, true);

    if (!$recaptcha_json || !$recaptcha_json['success']) {
        $response['message'] = 'reCAPTCHA verification failed. Please try again.';
        error_log('Webinar reCAPTCHA error: ' . ($recaptcha_json ? json_encode($recaptcha_json['error-codes']) : 'Request failed'));
        echo json_encode($response);
        exit;
    }

    // 4. Input Validation and Sanitization
    // NEW: Use trim() and validate. FILTER_SANITIZE_STRING is deprecated.
    $webinar_title = trim($_POST['webinar_title'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $company = trim($_POST['company'] ?? '');
    $role = trim($_POST['role'] ?? '');
    $privacy_consent = isset($_POST['privacy_consent']) ? 1 : 0;

    // Validate inputs
    if (empty($webinar_title) || empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || $privacy_consent === 0) {
        $response['message'] = 'Please fill in all required fields and accept the privacy policy.';
        echo json_encode($response);
        exit;
    }

    // 5. Duplicate Entry Prevention
    $pdo = getDbConnection();
    try {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM webinar_registrations WHERE email = :email AND webinar_title = :webinar_title");
        $stmt->execute([':email' => $email, ':webinar_title' => $webinar_title]);
        if ($stmt->fetchColumn() > 0) {
            $response['message'] = 'You are already registered for this webinar.';
            echo json_encode($response);
            exit;
        }
    } catch (PDOException $e) {
        error_log("Database error during webinar duplicate check: " . $e->getMessage());
        $response['message'] = 'A database error occurred. Please try again later.';
        echo json_encode($response);
        exit;
    }

    // 6. Database Insertion
    try {
        $stmt = $pdo->prepare(
            "INSERT INTO webinar_registrations (webinar_title, name, email, company, role, privacy_consent, ip_address, user_agent) 
             VALUES (:webinar_title, :name, :email, :company, :role, :privacy_consent, :ip_address, :user_agent)"
        );

        $stmt->execute([
            ':webinar_title' => $webinar_title,
            ':name' => $name,
            ':email' => $email,
            ':company' => $company,
            ':role' => $role,
            ':privacy_consent' => $privacy_consent,
            ':ip_address' => $_SERVER['REMOTE_ADDR'],
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
        ]);

        // 7. Email Notifications
        // NOTE: The mail() function is often unreliable. For production, it's highly recommended
        // to use a library like PHPMailer with an SMTP service (e.g., Gmail, SendGrid).
        $to_registrant = $email;
        $subject_registrant = 'Webinar Registration Confirmation: ' . $webinar_title;
        $message_registrant = "Dear " . htmlspecialchars($name) . ",\n\n" .
                              "Thank you for registering for our webinar: \"" . htmlspecialchars($webinar_title) . "\".\n" .
                              "We look forward to seeing you there!\n\n" .
                              "Best regards,\nThe Cyberdyke Tech Team";
        $headers_registrant = 'From: Cyberdyke Tech <support@cyberdyketech.org.in>' . "\r\n" .
                              'Reply-To: info@cyberdyketech.org.in' . "\r\n" .
                              'Content-Type: text/plain; charset=UTF-8' . "\r\n" .
                              'X-Mailer: PHP/' . phpversion();

        $to_admin = 'info@cyberdyketech.org.in';
        $subject_admin = 'New Webinar Registration: ' . $webinar_title;
        $message_admin = "A new user has registered for the webinar:\n\n" .
                         "Webinar Title: " . htmlspecialchars($webinar_title) . "\n" .
                         "Name: " . htmlspecialchars($name) . "\n" .
                         "Email: " . htmlspecialchars($email) . "\n" .
                         "Company: " . htmlspecialchars($company ?: 'N/A') . "\n" .
                         "Role: " . htmlspecialchars($role ?: 'N/A');
        $headers_admin = 'From: System <support@cyberdyketech.org.in>' . "\r\n" .
                         'Reply-To: ' . htmlspecialchars($email) . "\r\n" .
                         'Content-Type: text/plain; charset=UTF-8';

        if (mail($to_registrant, $subject_registrant, $message_registrant, $headers_registrant) && mail($to_admin, $subject_admin, $message_admin, $headers_admin)) {
            $response['success'] = true;
            $response['message'] = 'Thank you for registering! A confirmation email has been sent.';
        } else {
            // Data was saved, but email failed. Still a partial success for the user.
            $response['success'] = true; 
            $response['message'] = 'Registration successful, but the confirmation email could not be sent. Please contact support if needed.';
            error_log('Failed to send webinar confirmation emails for ' . $email);
        }

    } catch (PDOException $e) {
        error_log("Database insertion error for webinar registration: " . $e->getMessage());
        $response['message'] = 'Database error. Your registration could not be saved.';
    } catch (Exception $e) {
        error_log("General error in webinar registration script: " . $e->getMessage());
        $response['message'] = 'An internal server error occurred.';
    }

    echo json_encode($response);
    exit;
} else {
    // Handle cases where the script is accessed directly via GET method
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}
?>