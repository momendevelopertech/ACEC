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
                    'background' => '#FAFAFA',
                    'surface'    => '#FFFFFF',
                    'accent'     => '#8A6B24',
                    'text'       => '#111827',
                ],
            ],
            [
                'name' => 'Dark Theme',
                'name_ar' => 'الوضع الداكن',
                'slug' => 'dark',
                'is_active' => true,
                'colors' => [
                    'background' => '#0D1B2A',
                    'surface'    => '#162234',
                    'accent'     => '#C9A84C',
                    'text'       => '#F0F4F8',
                ],
            ],
        ];

        foreach ($themes as $t) {
            Theme::create($t);
        }
    }
}
