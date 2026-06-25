<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HeroSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        DB::table('hero_sections')->truncate();

        $arImage = $this->generatePlaceholderImage('models/hero/ar.jpg', 'hero-ar', 1920, 800);
        $enImage = $this->generatePlaceholderImage('models/hero/en.jpg', 'hero-en', 1920, 800);

        DB::table('hero_sections')->insert([
            [
                'lang' => 'ar',
                'title' => 'من التخطيط إلى الحيازة',
                'subtitle' => 'الميثاق العربي للاستشارات الهندسية',
                'description' => 'استشارات هندسية شاملة، حماية من الحرائق، وهندسة سلامة في جميع أنحاء المملكة العربية السعودية — نقدم التميز منذ 2006.',
                'stat1_number' => '500+', 'stat1_label' => 'مشروع منجز',
                'stat2_number' => '25+', 'stat2_label' => 'سنة خبرة',
                'stat3_number' => '300+', 'stat3_label' => 'عميل',
                'stat4_number' => '10', 'stat4_label' => 'خدمات متخصصة',
                'image' => $arImage,
                'cta1_text' => 'خدماتنا',
                'cta1_link' => '/ar/services',
                'cta2_text' => 'تواصل معنا',
                'cta2_link' => '/ar/contact',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lang' => 'en',
                'title' => 'From Plan to Possession',
                'subtitle' => 'Arabian Covenant Engineering Consultants',
                'description' => 'Comprehensive engineering consultancy, fire protection, and safety engineering across Saudi Arabia — delivering excellence since 2006.',
                'stat1_number' => '500+', 'stat1_label' => 'Completed Projects',
                'stat2_number' => '25+', 'stat2_label' => 'Years of Practice',
                'stat3_number' => '300+', 'stat3_label' => 'Trusted Clients',
                'stat4_number' => '10', 'stat4_label' => 'Specialized Services',
                'image' => $enImage,
                'cta1_text' => 'Our Services',
                'cta1_link' => '/en/services',
                'cta2_text' => 'Contact Us',
                'cta2_link' => '/en/contact',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
