<?php
echo '<pre>';

// توليد مفتاح التطبيق لو مش موجود
echo "Running: php artisan key:generate\n";
echo shell_exec('php artisan key:generate 2>&1') . "\n";

// تشغيل Migrations لإنشاء كل الجداول المطلوبة
echo "Running: php artisan migrate --force\n";
echo shell_exec('php artisan migrate --force 2>&1') . "\n";

// عمل رابط لمجلد التخزين
echo "Running: php artisan storage:link\n";
echo shell_exec('php artisan storage:link 2>&1') . "\n";

echo "\n✅ All commands executed. Tables should now exist!";
echo '</pre>';