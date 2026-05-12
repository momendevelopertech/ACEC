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
                'title' => 'نبني مستقبلاً أفضل بهندسة استثنائية',
                'subtitle' => 'مكتب الميثاق العربي للاستشارات الهندسية',
                'description' => 'شركاؤكم الموثوقون في تحقيق مشاريعكم الهندسية بأعلى معايير الجودة والسلامة في المملكة العربية السعودية.',
                'stat1_number' => '50+', 'stat1_label' => 'مشروع منجز',
                'stat2_number' => '15+', 'stat2_label' => 'سنة خبرة',
                'stat3_number' => '30+', 'stat3_label' => 'عميل',
                'stat4_number' => '6', 'stat4_label' => 'خدمات متخصصة',
                'image' => $arImage,
                'cta1_text' => 'احجز استشارة',
                'cta1_link' => '/ar/contact',
                'cta2_text' => 'تعرف على خدماتنا',
                'cta2_link' => '/ar/services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'lang' => 'en',
                'title' => 'Building the Future with Exceptional Engineering',
                'subtitle' => 'Arab Charter Engineering Consultants',
                'description' => 'Your trusted partners in delivering engineering projects with the highest standards of quality and safety in Saudi Arabia.',
                'stat1_number' => '50+', 'stat1_label' => 'Completed Projects',
                'stat2_number' => '15+', 'stat2_label' => 'Years Experience',
                'stat3_number' => '30+', 'stat3_label' => 'Clients',
                'stat4_number' => '6', 'stat4_label' => 'Specialized Services',
                'image' => $enImage,
                'cta1_text' => 'Book Consultation',
                'cta1_link' => '/en/contact',
                'cta2_text' => 'Our Services',
                'cta2_link' => '/en/services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
