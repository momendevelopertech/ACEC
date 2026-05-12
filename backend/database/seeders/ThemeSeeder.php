<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        if (Theme::count() > 0) return;

        $themes = [
            [
                'name' => 'Dark Professional',
                'name_ar' => 'الاحترافي الداكن',
                'slug' => 'dark-professional',
                'is_active' => true,
                'colors' => [
                    'bg_primary'     => '#0D1B2A',
                    'bg_secondary'   => '#1A2B3C',
                    'bg_card'        => '#162234',
                    'bg_section_alt' => '#111E2C',
                    'text_primary'   => '#F5F0E8',
                    'text_secondary' => '#B0A090',
                    'text_muted'     => '#6B7A8D',
                    'accent'         => '#C9A84C',
                    'accent_hover'   => '#E0BC6A',
                    'accent_text'    => '#0D1B2A',
                    'border'         => '#2A3D52',
                    'navbar_bg'      => '#0D1B2A',
                    'navbar_text'    => '#F5F0E8',
                    'button_bg'      => '#C9A84C',
                    'button_text'    => '#0D1B2A',
                    'button_hover'   => '#E0BC6A',
                    'card_bg'        => '#162234',
                    'card_border'    => '#2A3D52',
                    'footer_bg'      => '#080F18',
                    'footer_text'    => '#B0A090',
                ],
            ],
            [
                'name' => 'Classic Blue',
                'name_ar' => 'الأزرق الكلاسيكي',
                'slug' => 'classic-blue',
                'is_active' => false,
                'colors' => [
                    'bg_primary'     => '#0A1628',
                    'bg_secondary'   => '#132743',
                    'bg_card'        => '#0F1F38',
                    'bg_section_alt' => '#0C1A2E',
                    'text_primary'   => '#ECF0F5',
                    'text_secondary' => '#9BB0CC',
                    'text_muted'     => '#5A7A9A',
                    'accent'         => '#4A90D9',
                    'accent_hover'   => '#6AADF0',
                    'accent_text'    => '#FFFFFF',
                    'border'         => '#1E3A5C',
                    'navbar_bg'      => '#0A1628',
                    'navbar_text'    => '#ECF0F5',
                    'button_bg'      => '#4A90D9',
                    'button_text'    => '#FFFFFF',
                    'button_hover'   => '#6AADF0',
                    'card_bg'        => '#0F1F38',
                    'card_border'    => '#1E3A5C',
                    'footer_bg'      => '#060E1A',
                    'footer_text'    => '#9BB0CC',
                ],
            ],
            [
                'name' => 'Modern Green',
                'name_ar' => 'الأخضر الحديث',
                'slug' => 'modern-green',
                'is_active' => false,
                'colors' => [
                    'bg_primary'     => '#0F1F14',
                    'bg_secondary'   => '#1A2E20',
                    'bg_card'        => '#142618',
                    'bg_section_alt' => '#0F1F14',
                    'text_primary'   => '#E8F0E8',
                    'text_secondary' => '#A0B8A0',
                    'text_muted'     => '#5A7A5A',
                    'accent'         => '#4CAF50',
                    'accent_hover'   => '#6BCF6F',
                    'accent_text'    => '#FFFFFF',
                    'border'         => '#1E3A24',
                    'navbar_bg'      => '#0F1F14',
                    'navbar_text'    => '#E8F0E8',
                    'button_bg'      => '#4CAF50',
                    'button_text'    => '#FFFFFF',
                    'button_hover'   => '#6BCF6F',
                    'card_bg'        => '#142618',
                    'card_border'    => '#1E3A24',
                    'footer_bg'      => '#080F0A',
                    'footer_text'    => '#A0B8A0',
                ],
            ],
        ];

        foreach ($themes as $t) {
            Theme::create($t);
        }
    }
}
