<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        DB::table('projects')->truncate();

        $projects = [
            [
                'slug' => 'hospital-complex-riyadh',
                'title_ar' => 'مجمع مستشفى بالرياض',
                'title_en' => 'Hospital Complex in Riyadh',
                'description_ar' => 'تصميم وإشراف هندسي متكامل لمجمع مستشفى يضم 200 سرير مع جميع المرافق الطبية المساندة.',
                'description_en' => 'Complete engineering design and supervision for a 200-bed hospital complex with all supporting medical facilities.',
                'content_ar' => 'شمل المشروع تصميم معماري وإنشائي وكهروميكانيكي متكامل، مع الإشراف على جميع مراحل التنفيذ. تم الالتزام بأعلى معايير السلامة وجودة البناء.',
                'content_en' => 'The project included integrated architectural, structural, and MEP design, with supervision of all implementation phases. Highest safety and construction quality standards were maintained.',
                'category' => 'healthcare',
                'location_ar' => 'الرياض، السعودية',
                'location_en' => 'Riyadh, Saudi Arabia',
                'client_ar' => 'مجموعة المستشفيات المتخصصة',
                'client_en' => 'Specialized Hospitals Group',
                'year' => 2024,
                'is_featured' => true,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'commercial-tower-jeddah',
                'title_ar' => 'برج تجاري بجدة',
                'title_en' => 'Commercial Tower in Jeddah',
                'description_ar' => 'تصميم هندسي لبرج تجاري بارتفاع 30 طابقاً مع مواقف متعددة الطوابق.',
                'description_en' => 'Engineering design for a 30-story commercial tower with multi-level parking.',
                'content_ar' => 'تضمن المشروع دراسة الجدوى والتصميم المعماري والإنشائي وأنظمة السلامة والحماية من الحريق.',
                'content_en' => 'The project included feasibility study, architectural and structural design, and fire safety and protection systems.',
                'category' => 'commercial',
                'location_ar' => 'جدة، السعودية',
                'location_en' => 'Jeddah, Saudi Arabia',
                'client_ar' => 'شركة التطوير العقاري',
                'client_en' => 'Real Estate Development Co.',
                'year' => 2023,
                'is_featured' => true,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'industrial-factory-dammam',
                'title_ar' => 'مصنع صناعي بالدمام',
                'title_en' => 'Industrial Factory in Dammam',
                'description_ar' => 'تصميم مصنع صناعي متكامل وفقاً لاشتراطات مدن مع أنظمة تهوية وإضاءة صناعية متطورة.',
                'description_en' => 'Design of a complete industrial factory according to MODON requirements with advanced ventilation and industrial lighting systems.',
                'content_ar' => 'شمل التصميم المخططات التنظيمية للمعدات وأنظمة المناولة والتدفق الإنتاجي ومتطلبات الترخيص.',
                'content_en' => 'The design included equipment layout plans, handling systems, production flow, and licensing requirements.',
                'category' => 'industrial',
                'location_ar' => 'الدمام، السعودية',
                'location_en' => 'Dammam, Saudi Arabia',
                'client_ar' => 'شركة الصناعات المتقدمة',
                'client_en' => 'Advanced Industries Co.',
                'year' => 2024,
                'is_featured' => true,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'educational-complex',
                'title_ar' => 'مجمع تعليمي',
                'title_en' => 'Educational Complex',
                'description_ar' => 'تصميم وإشراف على مجمع تعليمي يضم مدارس ومرافق رياضية متكاملة.',
                'description_en' => 'Design and supervision of an educational complex with schools and integrated sports facilities.',
                'content_ar' => 'شمل المشروع التصميم المعماري والإنشائي وأنظمة السلامة مع الالتزام بمعايير وزارة التعليم.',
                'content_en' => 'The project included architectural and structural design and safety systems in compliance with Ministry of Education standards.',
                'category' => 'education',
                'location_ar' => 'الرياض، السعودية',
                'location_en' => 'Riyadh, Saudi Arabia',
                'client_ar' => 'مؤسسة التعليم الأهلي',
                'client_en' => 'Private Education Foundation',
                'year' => 2023,
                'is_featured' => false,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'luxury-residential-villas',
                'title_ar' => 'فلل سكنية فاخرة',
                'title_en' => 'Luxury Residential Villas',
                'description_ar' => 'تصميم 12 فيلا سكنية فاخرة مع حدائق خاصة ومرافق ترفيهية متكاملة.',
                'description_en' => 'Design of 12 luxury residential villas with private gardens and integrated recreational facilities.',
                'content_ar' => 'تضمن المشروع التصميم الداخلي والخارجي مع أنظمة ذكية للتحكم في المنزل.',
                'content_en' => 'The project included interior and exterior design with smart home control systems.',
                'category' => 'residential',
                'location_ar' => 'الرياض، السعودية',
                'location_en' => 'Riyadh, Saudi Arabia',
                'client_ar' => 'شركة الإعمار السكني',
                'client_en' => 'Residential Construction Co.',
                'year' => 2024,
                'is_featured' => false,
                'order' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'restaurant-interior-design',
                'title_ar' => 'تصميم داخلي لمطعم فاخر',
                'title_en' => 'Luxury Restaurant Interior Design',
                'description_ar' => 'تصميم داخلي متكامل لمطعم فاخر بسعة 200 مقعد مع إضاءة وديكور عصري.',
                'description_en' => 'Complete interior design for a luxury restaurant with 200-seat capacity featuring modern lighting and decor.',
                'content_ar' => 'شمل التصميم اختيار المواد والألوان والأثاث مع مراعاة أنظمة السلامة والصحة.',
                'content_en' => 'The design included material, color, and furniture selection while complying with safety and health regulations.',
                'category' => 'interior',
                'location_ar' => 'جدة، السعودية',
                'location_en' => 'Jeddah, Saudi Arabia',
                'client_ar' => 'مجموعة الضيافة الفاخرة',
                'client_en' => 'Luxury Hospitality Group',
                'year' => 2025,
                'is_featured' => false,
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($projects as $project) {
            $slug = $project['slug'];
            $imagePath = $this->generatePlaceholderImage("models/projects/{$slug}.jpg", "project-{$slug}");
            DB::table('projects')->insert(array_merge($project, [
                'image' => $imagePath,
                'meta_title_ar' => $project['title_ar'] . ' | مكتب الميثاق العربي',
                'meta_title_en' => $project['title_en'] . ' | ACEC',
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
