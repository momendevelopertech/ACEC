<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate existing themes so we only have exactly the two we want
        Theme::truncate();

        $themes = [
            [
                'name' => 'Light Theme',
                'name_ar' => 'الوضع الفاتح',
                'slug' => 'light',
                'is_active' => true,
                'colors' => [
                    'background' => '#D9D3CA',
                    'surface'    => '#E8E4DE',
                    'accent'     => '#6B695A',
                    'text'       => '#474A4D',
                ],
            ],
            [
                'name' => 'Dark Theme',
                'name_ar' => 'الوضع الداكن',
                'slug' => 'dark',
                'is_active' => true,
                'colors' => [
                    'background' => '#2C2E30',
                    'surface'    => '#363A3D',
                    'accent'     => '#9A9882',
                    'text'       => '#D9D3CA',
                ],
            ],
        ];

        foreach ($themes as $t) {
            Theme::create($t);
        }
    }
}
