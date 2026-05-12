<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Lang path: " . app()->langPath() . "\n";
echo "Locale: " . app()->getLocale() . "\n";

$arFile = app()->langPath() . '/ar/admin.php';
echo "AR file exists: " . (file_exists($arFile) ? 'yes' : 'no') . "\n";

$enFile = app()->langPath() . '/en/admin.php';
echo "EN file exists: " . (file_exists($enFile) ? 'yes' : 'no') . "\n";

// Try the translation
echo "\n--- Translation test ---\n";
echo "__('admin.col_name_en'): " . __('admin.col_name_en') . "\n";
echo "__('admin.col_name_ar'): " . __('admin.col_name_ar') . "\n";
echo "\n--- With explicit locale ---\n";
echo "Lang::get en: " . Lang::get('admin.col_name_en', [], 'en') . "\n";
echo "Lang::get ar: " . Lang::get('admin.col_name_ar', [], 'ar') . "\n";
echo "\n--- Has check ---\n";
echo "Lang::has en: " . (Lang::has('admin.col_name_en', 'en') ? 'yes' : 'no') . "\n";
echo "Lang::has ar: " . (Lang::has('admin.col_name_en', 'ar') ? 'yes' : 'no') . "\n";

echo "\n--- Namespaces check ---\n";
$loader = app('translator')->getLoader();
if (method_exists($loader, 'namespaces')) {
    echo "Namespaces: " . json_encode($loader->namespaces()) . "\n";
}
echo "Loaded locales: " . json_encode(array_keys(app('translator')->getLoader()->load('*', '*'))) . "\n";
