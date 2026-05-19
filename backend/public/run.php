<?php
echo '<pre>';

// توليد مفتاح التطبيق
echo "Running: php artisan key:generate\n";
$key_output = shell_exec('php artisan key:generate 2>&1');
echo $key_output . "\n";

// تشغيل Migrations
echo "Running: php artisan migrate --force\n";
$migrate_output = shell_exec('php artisan migrate --force 2>&1');
echo $migrate_output . "\n";

// عمل رابط لمجلد التخزين
echo "Running: php artisan storage:link\n";
$storage_output = shell_exec('php artisan storage:link 2>&1');
echo $storage_output . "\n";

// رسالة تأكيد
echo "\n✅ Laravel commands executed successfully!";
echo '</pre>';