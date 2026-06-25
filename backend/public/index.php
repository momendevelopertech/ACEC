<?php

// ============================================================
// HANDLE STORAGE REQUESTS (Bypass .htaccess)
// ============================================================
$requestUri = $_SERVER['REQUEST_URI'];

if (strpos($requestUri, '/storage/') === 0) {
    // Strip query string for cache-busting support (?v=timestamp)
    $pathOnly = parse_url($requestUri, PHP_URL_PATH);
    // Extract the file path (URL-decode for filenames with spaces or special chars)
    $file = urldecode(substr($pathOnly, 9)); // Remove '/storage/'
    
    // Security: prevent directory traversal
    $file = str_replace(['..', '//', '\\'], '', $file);
    
    // Build the real path
    $realPath = __DIR__ . '/../storage/app/public/' . $file;
    
    // Check if file exists
    if (file_exists($realPath) && is_file($realPath)) {
        // Get file extension for MIME type
        $ext = strtolower(pathinfo($realPath, PATHINFO_EXTENSION));
        $mimeTypes = [
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            'svg' => 'image/svg+xml',
            'pdf' => 'application/pdf',
            'json' => 'application/json',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'txt' => 'text/plain'
        ];
        $mime = $mimeTypes[$ext] ?? 'application/octet-stream';
        
        // Send headers (with CORS support)
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . filesize($realPath));
        header('Content-Disposition: inline; filename="' . basename($realPath) . '"');
        header('Cache-Control: public, max-age=86400, must-revalidate');
        header('Accept-Ranges: bytes');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');
        header('X-Content-Type-Options: nosniff');
        header('X-Content-Type-Options: nosniff');
        
        // Send file
        readfile($realPath);
        exit;
    } else {
        // File not found
        http_response_code(404);
        echo "File not found: " . $file;
        exit;
    }
}
// ============================================================
// END STORAGE HANDLER
// ============================================================

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());