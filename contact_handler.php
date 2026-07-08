<?php
// ================= HEADERS =================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ================= ERROR LOG =================
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

ob_start();

// ================= PHPMAILER =================
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/PHPMailer-master/src/PHPMailer.php')) {
    require __DIR__ . '/PHPMailer-master/src/Exception.php';
    require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
    require __DIR__ . '/PHPMailer-master/src/SMTP.php';
} elseif (file_exists(__DIR__ . '/src/PHPMailer.php')) {
    require __DIR__ . '/src/Exception.php';
    require __DIR__ . '/src/PHPMailer.php';
    require __DIR__ . '/src/SMTP.php';
} else {
    error_log("PHPMailer not found!");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ================= SMTP CONFIG =================
define('SMTP_HOST',     'localhost');
define('SMTP_USERNAME', 'info@cyberdyketech.org.in');
define('SMTP_PASSWORD', 'vijayceo@99');
define('SMTP_PORT',     25);
define('FROM_NAME',     'Cyberdyke Tech');
define('FROM_EMAIL',    'info@cyberdyketech.org.in');

// ✅ LEAD goes to Gmail — guaranteed delivery
define('LEAD_EMAIL',        'sagarvijay075@gmail.com');
define('LEAD_EMAIL_BACKUP', 'info@cyberdyketech.org.in'); // CC backup

// ================= INPUT =================
$input = file_get_contents("php://input");
$data  = json_decode($input, true);
if (!$data) { $data = $_POST; }

if (empty($data)) {
    ob_clean();
    echo json_encode(["error" => "No data received"]);
    exit;
}

// ================= HONEYPOT =================
if (!empty($data['b_trap'])) {
    ob_clean();
    echo json_encode(["error" => "Spam detected"]);
    exit;
}

// ================= SANITIZE =================
$full_name    = htmlspecialchars(trim($data['full_name']    ?? ''));
$email        = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone        = htmlspecialchars(trim($data['phone']        ?? ''));
$service_type = htmlspecialchars(trim($data['service_type'] ?? ''));
$message      = htmlspecialchars(trim($data['message']      ?? ''));
$ip           = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (!$full_name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ob_clean();
    echo json_encode(["error" => "Valid Name and Email are required"]);
    exit;
}

// ================= DATABASE =================
require_once __DIR__ . '/db_config.php';
$insertId = null;

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("
        INSERT INTO contact_submissions (full_name, email, phone, service_type, message, ip_address)
        VALUES (:name, :email, :phone, :service, :message, :ip)
    ");

    $stmt->execute([
        ':name'    => $full_name,
        ':email'   => $email,
        ':phone'   => $phone,
        ':service' => $service_type,
        ':message' => $message,
        ':ip'      => $ip,
    ]);

    $insertId = $pdo->lastInsertId();
    error_log("DB Insert OK: ID $insertId");

} catch (Exception $e) {
    error_log("DB ERROR: " . $e->getMessage());
    ob_clean();
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    exit;
}

$date          = date('d M Y, h:i A');
$company_name  = "Cyberdyke Tech";
$company_email = "info@cyberdyketech.org.in";
$company_phone = "+91 9391856552";
$company_site  = "https://cyberdyketech.org.in";

// ================= SMART SEND FUNCTION =================
function sendSMTPMail($toEmail, $toName, $subject, $htmlBody, $plainBody, $replyTo = '', $ccEmail = '') {

    // ── METHOD 1: PHPMailer via localhost ──
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host     = 'localhost';
            $mail->SMTPAuth = false;
            $mail->Port     = 25;
            $mail->CharSet  = 'UTF-8';
            $mail->Timeout  = 10;

            $mail->setFrom(FROM_EMAIL, FROM_NAME);
            $mail->addAddress($toEmail, $toName);

            // ✅ Add CC if provided
            if ($ccEmail) {
                $mail->addCC($ccEmail, 'Cyberdyke Team');
            }

            if ($replyTo) { $mail->addReplyTo($replyTo); }

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $htmlBody;
            $mail->AltBody = $plainBody;

            $mail->send();
            error_log("PHPMAILER SENT to $toEmail" . ($ccEmail ? " (CC: $ccEmail)" : ""));
            return "sent";

        } catch (Exception $e) {
            error_log("PHPMAILER FAILED: " . $mail->ErrorInfo . " — trying mail() fallback");
        }
    }

    // ── METHOD 2: Native mail() fallback ──
    $headers  = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . ($replyTo ?: FROM_EMAIL) . "\r\n";
    if ($ccEmail) {
        $headers .= "Cc: $ccEmail\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    if (mail($toEmail, $subject, $htmlBody, $headers)) {
        error_log("NATIVE MAIL() SENT to $toEmail");
        return "sent";
    } else {
        error_log("NATIVE MAIL() ALSO FAILED to $toEmail");
        return "failed";
    }
}

// ─────────────────────────────────────────
// EMAIL 1 — LEAD NOTIFICATION
// → Primary:  sagarvijay075@gmail.com  ✅
// → CC:       info@cyberdyketech.org.in ✅
// ─────────────────────────────────────────
$whatsapp_number = preg_replace('/[^0-9]/', '', $phone);

$leadHtml = "
<!DOCTYPE html>
<html>
<body style='font-family:Inter,Arial,sans-serif;background:#f4f4f4;padding:30px;margin:0;'>
<div style='max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);'>
  <div style='background:#007bff;padding:30px;text-align:center;'>
    <h2 style='color:#fff;margin:0;font-size:22px;'>NEW LEAD RECEIVED — #{$insertId}</h2>
    <p style='color:#cce5ff;margin:6px 0 0;font-size:14px;'>Cyberdyke Tech Website &middot; {$date}</p>
  </div>
  <div style='padding:30px;'>
    <div style='background:#fff3cd;border-left:4px solid #ffc107;padding:12px 16px;border-radius:6px;margin-bottom:20px;'>
      <strong>Action Required:</strong> Follow up with this lead within 24 hours.
    </div>
    <table style='width:100%;border-collapse:collapse;'>
      <tr style='background:#f8f9fa;'>
        <td style='padding:12px 16px;font-weight:700;color:#495057;width:38%;border-bottom:1px solid #eee;'>Lead ID</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'><strong>#{$insertId}</strong></td>
      </tr>
      <tr>
        <td style='padding:12px 16px;font-weight:700;color:#495057;border-bottom:1px solid #eee;'>Full Name</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'>{$full_name}</td>
      </tr>
      <tr style='background:#f8f9fa;'>
        <td style='padding:12px 16px;font-weight:700;color:#495057;border-bottom:1px solid #eee;'>Email</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'><a href='mailto:{$email}' style='color:#007bff;'>{$email}</a></td>
      </tr>
      <tr>
        <td style='padding:12px 16px;font-weight:700;color:#495057;border-bottom:1px solid #eee;'>Phone</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'><a href='tel:{$phone}' style='color:#007bff;'>{$phone}</a></td>
      </tr>
      <tr style='background:#f8f9fa;'>
        <td style='padding:12px 16px;font-weight:700;color:#495057;border-bottom:1px solid #eee;'>Service Requested</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'><span style='background:#e7f3ff;color:#007bff;padding:3px 10px;border-radius:20px;font-size:13px;'>{$service_type}</span></td>
      </tr>
      <tr>
        <td style='padding:12px 16px;font-weight:700;color:#495057;border-bottom:1px solid #eee;'>IP Address</td>
        <td style='padding:12px 16px;border-bottom:1px solid #eee;'>{$ip}</td>
      </tr>
    </table>
    <div style='margin-top:20px;background:#f8f9fa;border-radius:8px;padding:20px;border-left:4px solid #007bff;'>
      <p style='font-weight:700;color:#495057;margin:0 0 10px;'>Message:</p>
      <p style='margin:0;color:#333;line-height:1.7;'>{$message}</p>
    </div>
    <div style='margin-top:24px;text-align:center;'>
      <a href='mailto:{$email}' style='background:#007bff;color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;margin:5px;'>
        Reply via Email
      </a>
      <a href='https://wa.me/{$whatsapp_number}' style='background:#25d366;color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;margin:5px;'>
        WhatsApp Lead
      </a>
    </div>
  </div>
  <div style='background:#212529;padding:18px;text-align:center;'>
    <p style='color:#adb5bd;margin:0;font-size:12px;'>© 2026 Cyberdyke Tech | Uppal, Hyderabad, Telangana 500039</p>
  </div>
</div>
</body>
</html>";

$leadPlain = "NEW LEAD #{$insertId}\n\nName: {$full_name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service_type}\nMessage: {$message}\nDate: {$date}\nIP: {$ip}\n\nFollow up within 24 hours.";

$leadMailStatus = sendSMTPMail(
    LEAD_EMAIL,                         // ✅ Primary → Gmail
    'Cyberdyke Tech',
    "[NEW LEAD #{$insertId}] {$full_name} - {$service_type}",
    $leadHtml,
    $leadPlain,
    $email,                             // reply-to = client email
    LEAD_EMAIL_BACKUP                   // ✅ CC → info@cyberdyketech.org.in
);

// ─────────────────────────────────────────
// EMAIL 2 — AUTO-REPLY TO CLIENT
// ─────────────────────────────────────────
$clientHtml = "
<!DOCTYPE html>
<html>
<body style='font-family:Inter,Arial,sans-serif;background:#f4f4f4;padding:30px;margin:0;'>
<div style='max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);'>
  <div style='background:linear-gradient(135deg,#007bff,#0056b3);padding:45px 30px;text-align:center;'>
    <h1 style='color:#fff;margin:0;font-size:28px;'>Message Received!</h1>
    <p style='color:#cce5ff;margin:10px 0 0;font-size:15px;'>Thank you for contacting Cyberdyke Tech</p>
  </div>
  <div style='padding:35px;'>
    <p style='font-size:16px;color:#333;margin-top:0;'>Dear <strong>{$full_name}</strong>,</p>
    <p style='color:#555;line-height:1.8;'>
      Thank you for reaching out! We have successfully received your inquiry.
      Our consultants will respond within <strong style='color:#007bff;'>24 business hours</strong>.
    </p>
    <div style='background:#f0f9ff;border:1px solid #bae6fd;border-left:5px solid #007bff;border-radius:10px;padding:22px;margin:24px 0;'>
      <h4 style='margin:0 0 16px;color:#007bff;font-size:15px;'>Your Submission Summary</h4>
      <table style='width:100%;'>
        <tr>
          <td style='padding:7px 0;color:#666;font-size:14px;width:45%;'>Reference ID</td>
          <td style='padding:7px 0;font-weight:700;font-size:14px;'>#{$insertId}</td>
        </tr>
        <tr>
          <td style='padding:7px 0;color:#666;font-size:14px;'>Service Requested</td>
          <td style='padding:7px 0;font-weight:700;font-size:14px;'>{$service_type}</td>
        </tr>
        <tr>
          <td style='padding:7px 0;color:#666;font-size:14px;'>Submitted On</td>
          <td style='padding:7px 0;font-weight:700;font-size:14px;'>{$date}</td>
        </tr>
      </table>
    </div>
    <h4 style='color:#333;margin-bottom:14px;'>What Happens Next?</h4>
    <div style='background:#f0fdf4;border-radius:8px;padding:16px 20px;margin-bottom:8px;border-left:4px solid #16a34a;'>
      <strong style='color:#16a34a;'>Step 1:</strong> Our team reviews your requirements carefully
    </div>
    <div style='background:#f0fdf4;border-radius:8px;padding:16px 20px;margin-bottom:8px;border-left:4px solid #16a34a;'>
      <strong style='color:#16a34a;'>Step 2:</strong> A consultant contacts you within 24 hours
    </div>
    <div style='background:#f0fdf4;border-radius:8px;padding:16px 20px;margin-bottom:8px;border-left:4px solid #16a34a;'>
      <strong style='color:#16a34a;'>Step 3:</strong> We schedule a free consultation call
    </div>
    <div style='background:#f0fdf4;border-radius:8px;padding:16px 20px;margin-bottom:20px;border-left:4px solid #16a34a;'>
      <strong style='color:#16a34a;'>Step 4:</strong> We deliver a tailored solution proposal
    </div>
    <div style='background:#f8f9fa;border-radius:10px;padding:22px;text-align:center;'>
      <p style='font-weight:700;color:#333;margin:0 0 16px;font-size:15px;'>Need Immediate Help?</p>
      <a href='https://wa.me/919391856552' style='background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;margin:5px;'>
        WhatsApp Us
      </a>
      <a href='tel:+919391856552' style='background:#007bff;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;margin:5px;'>
        Call Us
      </a>
    </div>
  </div>
  <div style='background:#212529;padding:25px;text-align:center;'>
    <p style='color:#fff;font-weight:700;margin:0 0 6px;font-size:15px;'>Cyberdyke Tech</p>
    <p style='color:#adb5bd;font-size:13px;margin:0 0 4px;'>Uppal, Hyderabad, Telangana 500039, India</p>
    <p style='color:#adb5bd;font-size:13px;margin:0 0 14px;'>+91 9391856552 | info@cyberdyketech.org.in</p>
    <p style='color:#6c757d;font-size:11px;margin:0;line-height:1.6;'>
      This is an automated confirmation. Please do not reply.<br>
      © 2026 Cyberdyke Tech. All Rights Reserved.
    </p>
  </div>
</div>
</body>
</html>";

$clientPlain = "Dear {$full_name},\n\nThank you for contacting Cyberdyke Tech!\n\nReference ID : #{$insertId}\nService      : {$service_type}\nSubmitted On : {$date}\n\nWe will respond within 24 business hours.\n\n+91 9391856552\ninfo@cyberdyketech.org.in\nhttps://cyberdyketech.org.in\n\n(c) 2026 Cyberdyke Tech. All Rights Reserved.";

$clientMailStatus = sendSMTPMail(
    $email,
    $full_name,
    "We Received Your Inquiry — Cyberdyke Tech [Ref #{$insertId}]",
    $clientHtml,
    $clientPlain
    // No CC for client email
);

// ================= FINAL RESPONSE =================
ob_clean();
echo json_encode([
    "status"      => "success",
    "id"          => $insertId,
    "lead_mail"   => $leadMailStatus,
    "client_mail" => $clientMailStatus
]);
exit;