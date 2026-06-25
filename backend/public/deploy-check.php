<?php
/**
 * ACEC Deployment Health Check
 * 
 * Run from browser: https://backend.ac-ec.com.sa/deploy-check.php
 * Remove or secure this file after verification.
 */

$checks = [];
$allPass = true;

// 1. PHP version
$checks[] = [
    'name' => 'PHP Version',
    'pass' => version_compare(PHP_VERSION, '8.1', '>='),
    'detail' => PHP_VERSION,
];

// 2. Required extensions
$required = ['pdo', 'mbstring', 'xml', 'curl', 'gd', 'fileinfo', 'json'];
foreach ($required as $ext) {
    $checks[] = [
        'name' => "Extension: $ext",
        'pass' => extension_loaded($ext),
    ];
}

// 3. Storage directory writable
$storagePath = __DIR__ . '/../storage/app/public';
$checks[] = [
    'name' => 'Storage writable',
    'pass' => is_writable($storagePath),
    'detail' => $storagePath,
];

// 4. Storage link (public/storage -> storage/app/public)
$linkPath = __DIR__ . '/storage';
$checks[] = [
    'name' => 'Storage link exists',
    'pass' => is_link($linkPath) || is_dir($linkPath),
    'detail' => $linkPath,
];

// 5. .env exists
$envPath = __DIR__ . '/../.env';
$checks[] = [
    'name' => 'Environment file (.env)',
    'pass' => file_exists($envPath),
];

// 6. Key generated (APP_KEY in .env)
if (file_exists($envPath)) {
    $env = file_get_contents($envPath);
    $hasKey = preg_match('/^APP_KEY=base64:/m', $env);
    $checks[] = [
        'name' => 'APP_KEY set',
        'pass' => (bool) $hasKey,
    ];
}

// 7. Database connectivity
try {
    $dbConfig = require __DIR__ . '/../config/database.php';
    $conn = $dbConfig['connections'][$dbConfig['default']] ?? null;
    if ($conn && $conn['driver'] === 'mysql') {
        $dsn = "mysql:host={$conn['host']};port={$conn['port']};dbname={$conn['database']}";
        new PDO($dsn, $conn['username'], $conn['password']);
        $checks[] = [
            'name' => 'Database connection (MySQL)',
            'pass' => true,
        ];
    } elseif ($conn && $conn['driver'] === 'sqlite') {
        $checks[] = [
            'name' => 'Database connection (SQLite)',
            'pass' => file_exists($conn['database']),
        ];
    } else {
        $checks[] = ['name' => 'Database connection', 'pass' => false, 'detail' => 'Unknown driver'];
    }
} catch (Exception $e) {
    $checks[] = ['name' => 'Database connection', 'pass' => false, 'detail' => $e->getMessage()];
}

// 8. API endpoint test (self-check)
$apiUrl = (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . '/api/v1/hero/ar';
$ctx = stream_context_create(['http' => ['timeout' => 5]]);
$apiResult = @file_get_contents($apiUrl, false, $ctx);
$checks[] = [
    'name' => 'API /api/v1/hero/ar responds',
    'pass' => $apiResult !== false && str_contains($apiResult, 'success'),
];

// 9. Storage file test
$testFile = __DIR__ . '/../storage/app/public/models/hero/ar.jpg';
$checks[] = [
    'name' => 'Sample hero image exists',
    'pass' => file_exists($testFile),
    'detail' => $testFile,
];

// 10. CORS config
$corsConfig = include __DIR__ . '/../config/cors.php';
$prodOrigins = ['https://ac-ec.com.sa', 'https://acec-iota.vercel.app', 'https://backend.ac-ec.com.sa'];
$missing = array_diff($prodOrigins, $corsConfig['allowed_origins']);
$checks[] = [
    'name' => 'CORS origins include production URLs',
    'pass' => empty($missing),
    'detail' => empty($missing) ? 'All present' => 'Missing: ' . implode(', ', $missing),
];

$allPass = !in_array(false, array_column($checks, 'pass'));
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ACEC Deployment Check</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f3ef; color: #3d3a34; padding: 2rem; }
  .container { max-width: 700px; margin: 0 auto; }
  h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
  .subtitle { color: #8a8278; margin-bottom: 2rem; }
  .summary { padding: 1rem; border-radius: 8px; font-weight: 600; margin-bottom: 1.5rem; }
  .pass { background: #dff0d8; color: #3c763d; border: 1px solid #d6e9c6; }
  .fail { background: #f2dede; color: #a94442; border: 1px solid #ebccd1; }
  .check { background: #fff; border: 1px solid #e0ddd6; border-radius: 6px; padding: 0.75rem 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem; }
  .check .icon { font-size: 1.25rem; width: 1.5rem; text-align: center; }
  .check .name { flex: 1; font-size: 0.9rem; }
  .check .detail { font-size: 0.8rem; color: #8a8278; font-family: monospace; }
</style>
</head>
<body>
<div class="container">
  <h1>🔍 ACEC Deployment Check</h1>
  <p class="subtitle"><?= date('Y-m-d H:i:s') ?> — Server: <?= $_SERVER['SERVER_NAME'] ?? 'unknown' ?></p>

  <div class="summary <?= $allPass ? 'pass' : 'fail' ?>">
    <?= $allPass ? '✅ All checks passed' : '❌ Some checks failed — see below' ?>
  </div>

  <?php foreach ($checks as $c): ?>
    <div class="check">
      <span class="icon"><?= $c['pass'] ? '✅' : '❌' ?></span>
      <div>
        <div class="name"><?= htmlspecialchars($c['name']) ?></div>
        <?php if (!empty($c['detail'])): ?>
          <div class="detail"><?= htmlspecialchars($c['detail']) ?></div>
        <?php endif; ?>
      </div>
    </div>
  <?php endforeach; ?>

  <p class="subtitle" style="margin-top: 2rem;">
    ⚠️ Remove this file after verification: <code>rm deploy-check.php</code>
  </p>
</div>
</body>
</html>
