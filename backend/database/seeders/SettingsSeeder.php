<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('settings')->truncate();

        $settings = [
            // General
            ['key' => 'site_name_ar', 'value' => 'مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_name_en', 'value' => 'Arab Charter Engineering Consultants — ACEC', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_tagline_ar', 'value' => 'شركاؤكم في التميز الهندسي', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_tagline_en', 'value' => 'Your Partners in Engineering Excellence', 'group' => 'general', 'type' => 'text'],
            ['key' => 'default_lang', 'value' => 'ar', 'group' => 'general', 'type' => 'text'],
            ['key' => 'logo', 'value' => '', 'group' => 'general', 'type' => 'image'],
            // Contact
            ['key' => 'phone', 'value' => '+966 500 037 049', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'whatsapp', 'value' => '+966500037049', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'email', 'value' => 'info@ac-ec.com.sa', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'address_ar', 'value' => 'شارع عمر بن عبدالعزيز، حي الزهراء، الرياض، المملكة العربية السعودية', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'address_en', 'value' => 'Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'working_hours_ar', 'value' => 'الأحد - الخميس، 9:00 صباحاً - 6:00 مساءً', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'working_hours_en', 'value' => 'Sunday to Thursday, 9:00 AM - 6:00 PM', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'google_maps_url', 'value' => '', 'group' => 'contact', 'type' => 'text'],
            // Social
            ['key' => 'linkedin', 'value' => '', 'group' => 'social', 'type' => 'text'],
            ['key' => 'twitter', 'value' => '', 'group' => 'social', 'type' => 'text'],
            ['key' => 'instagram', 'value' => '', 'group' => 'social', 'type' => 'text'],
            // SEO
            ['key' => 'meta_title_ar', 'value' => 'مكتب الميثاق العربي | استشارات هندسية وهندسة سلامة', 'group' => 'seo', 'type' => 'text'],
            ['key' => 'meta_title_en', 'value' => 'ACEC | Engineering Consultants & Safety Engineering', 'group' => 'seo', 'type' => 'text'],
            ['key' => 'meta_desc_ar', 'value' => 'مكتب متخصص في الاستشارات الهندسية وهندسة السلامة والإشراف الهندسي في المملكة العربية السعودية', 'group' => 'seo', 'type' => 'text'],
            ['key' => 'meta_desc_en', 'value' => 'Specialized in engineering consultancy, safety engineering and supervision in Saudi Arabia', 'group' => 'seo', 'type' => 'text'],
            ['key' => 'google_analytics_id', 'value' => '', 'group' => 'seo', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->insert(array_merge($setting, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
