<?php
// Application configuration

// Helper function for environment variables
function env($key, $default = null) {
    $value = $_ENV[$key] ?? getenv($key);
    return ($value !== false && $value !== null) ? $value : $default;
}

// JWT Configuration
define('JWT_SECRET', env('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production'));
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRATION', (int) env('JWT_EXPIRATION', 3600)); // 1 hour
define('JWT_REFRESH_EXPIRATION', (int) env('JWT_REFRESH_EXPIRATION', 604800)); // 7 days

// File Upload Configuration
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
define('ALLOWED_VIDEO_TYPES', ['video/mp4', 'video/webm', 'video/ogg']);

// Google OAuth
define('GOOGLE_CLIENT_ID', env('GOOGLE_CLIENT_ID', ''));
define('GOOGLE_CLIENT_SECRET', env('GOOGLE_CLIENT_SECRET', ''));
define('GOOGLE_REDIRECT_URI', env('API_URL', 'https://api.studyke.com') . '/auth/google/callback');

// LinkedIn OAuth
define('LINKEDIN_CLIENT_ID', env('LINKEDIN_CLIENT_ID', ''));
define('LINKEDIN_CLIENT_SECRET', env('LINKEDIN_CLIENT_SECRET', ''));
define('LINKEDIN_REDIRECT_URI', env('API_URL', 'https://api.studyke.com') . '/auth/linkedin/callback');

// SMTP (Email)
define('SMTP_HOST', env('SMTP_HOST', 'smtp.gmail.com'));
define('SMTP_PORT', (int) env('SMTP_PORT', 587));
define('SMTP_USERNAME', env('SMTP_USERNAME', ''));
define('SMTP_PASSWORD', env('SMTP_PASSWORD', ''));
define('FROM_EMAIL', env('FROM_EMAIL', 'noreply@studyke.com'));
define('FROM_NAME', env('FROM_NAME', 'StuDyke# Platform'));

// Application Info
define('APP_NAME', env('APP_NAME', 'StuDyke#'));
define('APP_URL', env('APP_URL', 'https://studyke.com'));
define('API_URL', env('API_URL', 'https://api.studyke.com'));
define('FRONTEND_URL', env('FRONTEND_URL', 'https://studyke.com'));

// Pagination defaults
define('DEFAULT_PAGE_SIZE', (int) env('DEFAULT_PAGE_SIZE', 20));
define('MAX_PAGE_SIZE', (int) env('MAX_PAGE_SIZE', 100));

// Rate limiting
define('RATE_LIMIT_REQUESTS', (int) env('RATE_LIMIT_REQUESTS', 100));
define('RATE_LIMIT_WINDOW', (int) env('RATE_LIMIT_WINDOW', 3600)); // 1 hour

// Environment
define('APP_ENV', env('APP_ENV', 'production'));
define('DEBUG_MODE', APP_ENV === 'development');

// CORS allowed origins
define('CORS_ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://studyke.com',
    'https://www.studyke.com',
    FRONTEND_URL
]);
