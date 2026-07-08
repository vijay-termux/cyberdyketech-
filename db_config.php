<?php
// db_config.php

// Load environment variables (if using a library like vlucas/phpdotenv)
// Otherwise, set these in your server configuration (.env or Apache/Nginx env vars)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'cyberdyke_db');
define('DB_USER', getenv('DB_USER') ?: 'cyberdyke_db');
define('DB_PASS', getenv('DB_PASS') ?: 'Vijaymux@009');

function getDbConnection() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exceptions
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Safer default
        PDO::ATTR_EMULATE_PREPARES   => false,                  // Native prepares
        PDO::ATTR_PERSISTENT         => true,                   // Persistent connection
    ];

    try {
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // Log detailed error securely (not shown to user)
        $logFile = __DIR__ . '/logs/db_errors.log';
        if (!is_dir(dirname($logFile))) {
            mkdir(dirname($logFile), 0750, true);
        }
        error_log(
            date('[Y-m-d H:i:s] ') . 'DB Connection Error: ' . $e->getMessage() . PHP_EOL,
            3,
            $logFile
        );

        // Throw a generic error up the chain (contact_handler.php will handle)
        throw new PDOException('Database connection failed.', (int)$e->getCode());
    }
}
