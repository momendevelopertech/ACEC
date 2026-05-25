<?php

namespace Database\Seeders;

use App\Models\ProfilePdf;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProfilePdfSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = 'profile-pdfs/profile.pdf';
        $fullPath = Storage::disk('public')->path($filePath);

        if (!file_exists($fullPath)) {
            $this->command->warn("Profile PDF file not found at: {$fullPath}");
            return;
        }

        $fileSize = filesize($fullPath);

        ProfilePdf::updateOrCreate(
            ['file_path' => $filePath],
            [
                'name' => 'ACEC Company Profile',
                'file_size' => $fileSize,
                'is_active' => true,
            ]
        );

        $this->command->info('Profile PDF seeded successfully.');
    }
}
