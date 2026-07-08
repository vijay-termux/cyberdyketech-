<?php
// --- TEMPORARY DEBUGGING SETTINGS (URGENT FIX) ---
// !!! REMOVE THESE LINES BEFORE DEPLOYING TO PRODUCTION !!!
ini_set('display_errors', 1);        // Force display of errors
ini_set('display_startup_errors', 1); // Force display of startup errors
error_reporting(E_ALL);             // Report all types of errors
// --- END TEMPORARY DEBUGGING SETTINGS ---

header('Content-Type: application/json'); // Set content type to JSON for AJAX response

// Include database configuration
try {
    require_once 'db_config.php';
    if (!function_exists('getDbConnection')) {
        throw new Exception("getDbConnection() function not found in db_config.php.");
    }
} catch (Throwable $e) {
    // This will now be displayed because of ini_set, but also logged
    error_log('FATAL: Failed to include or initialize db_config.php: ' . $e->getMessage() . ' on line ' . $e->getLine() . ' in ' . $e->getFile());
    
    $response = [
        'success' => false,
        'message' => 'Server configuration error: Database setup failed. Details: ' . $e->getMessage() // More detailed for debugging
    ];
    echo json_encode($response);
    exit;
}

// Initialize response array
$response = ['success' => false, 'message' => 'Invalid request.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... (rest of your cookie-log.php code remains the same as the "supported" version) ...

    $consentType = trim(htmlspecialchars($_POST['consent_type'] ?? '', ENT_QUOTES, 'UTF-8'));
    $preferencesJson = $_POST['preferences'] ?? '{}';

    if (!in_array($consentType, ['accepted_all', 'managed_preferences'])) {
        $response['message'] = 'Invalid consent type provided.';
        echo json_encode($response);
        exit;
    }

    $preferencesArray = json_decode($preferencesJson, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $response['message'] = 'Invalid preferences data format: ' . json_last_error_msg(); // Added for debugging clarity
        error_log('Client provided malformed JSON for preferences: ' . json_last_error_msg());
        echo json_encode($response);
        exit;
    }
    $preferencesStoredJson = json_encode($preferencesArray);

    $ipAddress = 'Unknown';
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipAddress = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    $ipAddress = trim($ipAddress);
    if (!filter_var($ipAddress, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
        error_log("Attempted logging with invalid or private/reserved IP format: {$ipAddress}");
        $ipAddress = 'Invalid_IP_Format';
    }

    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    $userAgent = substr($userAgent, 0, 255); 

    $consentTime = date('Y-m-d H:i:s');

    $pdo = null;
    try {
        $pdo = getDbConnection();
    } catch (PDOException $e) {
        error_log('Database CONNECTION error: ' . $e->getMessage(), 0);
        $response['message'] = 'Failed to connect to the database. Error: ' . $e->getMessage(); // More detailed for debugging
        echo json_encode($response);
        exit;
    } catch (Exception $e) {
        error_log('General error from getDbConnection(): ' . $e->getMessage(), 0);
        $response['message'] = 'A server error occurred during database setup. Error: ' . $e->getMessage(); // More detailed for debugging
        echo json_encode($response);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO cookie_consents (consent_type, preferences, ip_address, user_agent, consent_time) VALUES (:consentType, :preferences, :ipAddress, :userAgent, :consentTime)");
        $stmt->execute([
            ':consentType' => $consentType,
            ':preferences' => $preferencesStoredJson,
            ':ipAddress' => $ipAddress,
            ':userAgent' => $userAgent,
            ':consentTime' => $consentTime
        ]);

        $response['success'] = true;
        $response['message'] = 'Cookie consent logged successfully.';

    } catch (PDOException $e) {
        error_log('Database QUERY error logging cookie consent: ' . $e->getMessage(), 0);
        $response['message'] = 'Failed to log consent due to a database query error. Details: ' . $e->getMessage(); // More detailed for debugging
    } catch (Exception $e) {
        error_log('General script error during consent logging: ' . $e->getMessage(), 0);
        $response['message'] = 'An internal server error occurred during consent logging. Details: ' . $e->getMessage(); // More detailed for debugging
    } finally {
        $pdo = null;
    }

} else {
    $response['message'] = 'Invalid request method. This endpoint only accepts POST requests.';
}

echo json_encode($response);
?>