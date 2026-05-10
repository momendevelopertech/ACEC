<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        // Create default theme if none exists
        if (Theme::count() === 0) {
            Theme::create([
                'name' => 'Default Gold & Dark',
                'name_ar' => 'الذهبي الداكن الافتراضي',
                'slug' => 'default-gold-dark',
                'is_active' => true,
                'colors' => [
                    'primary' => '#1a3c5e',
                    'secondary' => '#c9a84c',
                    'background' => '#0a0a0f',
                    'surface' => '#12121a',
                    'text' => '#f5f5f0',
                    'text_muted' => '#6b6b7a',
                    'header_bg' => '#0a0a0f',
                    'footer_bg' => '#12121a',
                    'button_primary' => '#c9a84c',
                    'button_secondary' => '#1a3c5e',
                    'border' => '#1e1e2e',
                    'card_bg' => '#12121a',
                ],
                'typography' => [
                    'font_ar' => 'Tajawal, Cairo, sans-serif',
                    'font_en' => 'Inter, system-ui, sans-serif',
                ],
                'layout' => [
                    'border_radius' => 'md',
                ],
            ]);

            // Create a light theme
            Theme::create([
                'name' => 'Light Professional',
                'name_ar' => 'الفاتح المهني',
                'slug' => 'light-professional',
                'is_active' => false,
                'colors' => [
                    'primary' => '#1a3c5e',
                    'secondary' => '#c9a84c',
                    'background' => '#ffffff',
                    'surface' => '#f0f4f8',
                    'text' => '#1a1a2e',
                    'text_muted' => '#6b7280',
                    'header_bg' => '#ffffff',
                    'footer_bg' => '#f0f4f8',
                    'button_primary' => '#c9a84c',
                    'button_secondary' => '#1a3c5e',
                    'border' => '#e5e7eb',
                    'card_bg' => '#ffffff',
                ],
                'typography' => [
                    'font_ar' => 'Tajawal, Cairo, sans-serif',
                    'font_en' => 'Inter, system-ui, sans-serif',
                ],
                'layout' => [
                    'border_radius' => 'md',
                ],
            ]);
        }
    }
}
