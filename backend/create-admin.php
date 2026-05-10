<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@ac-ec.com.sa',
    'password' => bcrypt('password123'),
]);

if ($user) {
    echo "Admin user created successfully!\n";
    echo "Email: admin@ac-ec.com.sa\n";
    echo "Password: password123\n";
} else {
    echo "Failed to create user.\n";
}