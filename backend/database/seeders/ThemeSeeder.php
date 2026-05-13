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
                    'bg_secondary'   => '#162234',
                    'bg_card'        => '#162234',
                    'bg_section_alt' => '#111E2C',
                    'text_primary'   => '#F0F4F8',
                    'text_secondary' => '#9AABBE',
                    'text_muted'     => '#8A9BB0',
                    'accent'         => '#C9A84C',
                    'accent_hover'   => '#F0CF7A',
                    'accent_text'    => '#0D1B2A',
                    'border'         => '#3A5068',
                    'navbar_bg'      => '#162234',
                    'navbar_text'    => '#F0F4F8',
                    'button_bg'      => '#C9A84C',
                    'button_text'    => '#0D1B2A',
                    'button_hover'   => '#F0CF7A',
                    'card_bg'        => '#162234',
                    'card_border'    => '#3A5068',
                    'footer_bg'      => '#080D14',
                    'footer_text'    => '#8A9BB0',
                ],
            ],
            [
                'name' => 'Classic Blue',
                'name_ar' => 'الأزرق الكلاسيكي',
                'slug' => 'classic-blue',
                'is_active' => false,
                'colors' => [
                    'bg_primary'     => '#0F1F3D',
                    'bg_secondary'   => '#1A2F55',
                    'bg_card'        => '#1A2F55',
                    'bg_section_alt' => '#142744',
                    'text_primary'   => '#EEF2FF',
                    'text_secondary' => '#94A3C4',
                    'text_muted'     => '#94A3C4',
                    'accent'         => '#3B82F6',
                    'accent_hover'   => '#60A5FA',
                    'accent_text'    => '#FFFFFF',
                    'border'         => '#2E4A7A',
                    'navbar_bg'      => '#1A2F55',
                    'navbar_text'    => '#EEF2FF',
                    'button_bg'      => '#3B82F6',
                    'button_text'    => '#FFFFFF',
                    'button_hover'   => '#60A5FA',
                    'card_bg'        => '#1A2F55',
                    'card_border'    => '#2E4A7A',
                    'footer_bg'      => '#080D14',
                    'footer_text'    => '#94A3C4',
                ],
            ],
            [
                'name' => 'Modern Green',
                'name_ar' => 'الأخضر الحديث',
                'slug' => 'modern-green',
                'is_active' => false,
                'colors' => [
                    'bg_primary'     => '#0A1A14',
                    'bg_secondary'   => '#122A1F',
                    'bg_card'        => '#122A1F',
                    'bg_section_alt' => '#0D2118',
                    'text_primary'   => '#ECFDF5',
                    'text_secondary' => '#86B89A',
                    'text_muted'     => '#86B89A',
                    'accent'         => '#10B981',
                    'accent_hover'   => '#34D399',
                    'accent_text'    => '#0A1A14',
                    'border'         => '#1E4D35',
                    'navbar_bg'      => '#122A1F',
                    'navbar_text'    => '#ECFDF5',
                    'button_bg'      => '#10B981',
                    'button_text'    => '#0A1A14',
                    'button_hover'   => '#34D399',
                    'card_bg'        => '#122A1F',
                    'card_border'    => '#1E4D35',
                    'footer_bg'      => '#060F0A',
                    'footer_text'    => '#86B89A',
                ],
            ],
        ];

        foreach ($themes as $t) {
            Theme::create($t);
        }
    }
}
