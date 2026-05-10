<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = App\Models\User::where('email', 'admin@ac-ec.com.sa')->first();
if ($user) {
    $user->password = bcrypt('password123');
    $user->save();
    echo "Password reset!\nEmail: admin@ac-ec.com.sa\nPassword: password123\n";
} else {
    echo "User not found.\n";
}