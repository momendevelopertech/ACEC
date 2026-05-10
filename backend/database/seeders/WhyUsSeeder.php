<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WhyUsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('why_us_items')->truncate();

        $items = [
            [
                'icon' => 'experience',
                'title_ar' => 'خبرة تتجاوز 15 عاماً',
                'title_en' => 'Over 15 Years of Experience',
                'description_ar' => 'فريق من المهندسين المتخصصين ذوي خبرة واسعة في مختلف القطاعات الهندسية بالمملكة العربية السعودية.',
                'description_en' => 'A team of specialized engineers with extensive experience across various engineering sectors in Saudi Arabia.',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'icon' => 'compliance',
                'title_ar' => 'جودة معتمدة ومضمونة',
                'title_en' => 'Certified & Guaranteed Quality',
                'description_ar' => 'نلتزم بأعلى معايير الجودة العالمية والمتطلبات السعودية في جميع مشاريعنا وخدماتنا.',
                'description_en' => 'We adhere to the highest international quality standards and Saudi requirements in all our projects and services.',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'icon' => 'quality',
                'title_ar' => 'فريق متخصص ومتكامل',
                'title_en' => 'Integrated Specialized Team',
                'description_ar' => 'فريق متعدد التخصصات يضم مهندسين معتمدين في الاستشارات والسلامة والتصميم والإشراف.',
                'description_en' => 'A multidisciplinary team including certified engineers in consulting, safety, design, and supervision.',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'icon' => 'team',
                'title_ar' => 'التزام تام بالمواعيد',
                'title_en' => 'Full Commitment to Deadlines',
                'description_ar' => 'نضمن تسليم مشاريعكم في الوقت المحدد دون التنازل عن معايير الجودة والدقة.',
                'description_en' => 'We guarantee the delivery of your projects on time without compromising quality and accuracy standards.',
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            DB::table('why_us_items')->insert(array_merge($item, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
