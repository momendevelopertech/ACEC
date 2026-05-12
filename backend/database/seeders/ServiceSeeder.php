<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        DB::table('services')->truncate();

        $services = [
            [
                'slug' => 'engineering-consulting',
                'icon' => 'Building2',
                'title_ar' => 'الاستشارات الهندسية',
                'title_en' => 'Engineering Consulting',
                'description_ar' => 'نقدم استشارات هندسية متخصصة ومتكاملة لمختلف أنواع المشاريع الإنشائية والصناعية، بخبرة تتجاوز 15 عاماً في المملكة العربية السعودية.',
                'description_en' => 'We provide specialized and integrated engineering consultancy for various construction and industrial projects, with over 15 years of experience in Saudi Arabia.',
                'content_ar' => '<p>تشمل خدماتنا في الاستشارات الهندسية: دراسات الجدوى الهندسية، المراجعة الفنية للمشاريع، إدارة المشاريع، وضع المواصفات الفنية، والتحقق من الامتثال للمعايير السعودية والدولية.</p><p>فريقنا المتخصص يقدم حلولاً هندسية مبتكرة تجمع بين الجودة والكفاءة والالتزام بالمواعيد.</p>',
                'content_en' => '<p>Our engineering consultancy services include: feasibility studies, technical project reviews, project management, technical specifications, and verification of compliance with Saudi and international standards.</p><p>Our specialized team provides innovative engineering solutions that combine quality, efficiency, and commitment to deadlines.</p>',
                'is_featured' => true,
                'order' => 1,
                'is_active' => true,
                'meta_title_ar' => 'الاستشارات الهندسية | مكتب الميثاق العربي',
                'meta_title_en' => 'Engineering Consulting | ACEC',
                'meta_desc_ar' => 'خدمات استشارات هندسية متخصصة في المملكة العربية السعودية',
                'meta_desc_en' => 'Specialized engineering consulting services in Saudi Arabia',
            ],
            [
                'slug' => 'safety-engineering',
                'icon' => 'ShieldAlert',
                'title_ar' => 'هندسة السلامة',
                'title_en' => 'Safety Engineering',
                'description_ar' => 'نضمن أعلى معايير السلامة والحماية لمنشآتكم من خلال فحص شامل وتقييم دقيق لجميع متطلبات الدفاع المدني والسلامة.',
                'description_en' => 'We ensure the highest safety and protection standards for your facilities through comprehensive inspection and accurate assessment of all civil defense and safety requirements.',
                'content_ar' => '<p>خدمات هندسة السلامة: تصميم أنظمة الإنذار والإطفاء، تقييم المخاطر، خطط الطوارئ والإخلاء، تدريب الكوادر، والحصول على اعتمادات الدفاع المدني.</p>',
                'content_en' => '<p>Safety engineering services: design of alarm and fire suppression systems, risk assessment, emergency and evacuation plans, personnel training, and obtaining civil defense accreditations.</p>',
                'is_featured' => true,
                'order' => 2,
                'is_active' => true,
                'meta_title_ar' => 'هندسة السلامة | مكتب الميثاق العربي',
                'meta_title_en' => 'Safety Engineering | ACEC',
                'meta_desc_ar' => 'خدمات هندسة السلامة والدفاع المدني في السعودية',
                'meta_desc_en' => 'Safety engineering and civil defense services in Saudi Arabia',
            ],
            [
                'slug' => 'engineering-supervision',
                'icon' => 'Eye',
                'title_ar' => 'الإشراف الهندسي',
                'title_en' => 'Engineering Supervision',
                'description_ar' => 'نتولى الإشراف الكامل على تنفيذ مشاريعكم لضمان الجودة والالتزام بالمواصفات والجداول الزمنية المحددة.',
                'description_en' => 'We undertake full supervision of your project execution to ensure quality and compliance with specified specifications and schedules.',
                'content_ar' => '<p>خدمات الإشراف الهندسي: متابعة التنفيذ الميداني، التحقق من الجودة، مراجعة المستخلصات، تنسيق المقاولين، وإعداد تقارير الإنجاز الدورية.</p>',
                'content_en' => '<p>Engineering supervision services: field execution follow-up, quality verification, invoice review, contractor coordination, and preparation of periodic progress reports.</p>',
                'is_featured' => true,
                'order' => 3,
                'is_active' => true,
                'meta_title_ar' => 'الإشراف الهندسي | مكتب الميثاق العربي',
                'meta_title_en' => 'Engineering Supervision | ACEC',
                'meta_desc_ar' => 'خدمات الإشراف الهندسي على المشاريع في السعودية',
                'meta_desc_en' => 'Engineering supervision services for projects in Saudi Arabia',
            ],
            [
                'slug' => 'interior-design',
                'icon' => 'Paintbrush',
                'title_ar' => 'التصميم الداخلي',
                'title_en' => 'Interior Design',
                'description_ar' => 'نبتكر مساحات داخلية راقية تجمع بين الجماليات العصرية والوظيفية العملية، مصممة خصيصاً لتعكس هويتكم وتلبي احتياجاتكم.',
                'description_en' => 'We create elegant interior spaces that combine modern aesthetics with practical functionality, specially designed to reflect your identity and meet your needs.',
                'content_ar' => '<p>خدمات التصميم الداخلي: تصميم المكاتب والمجمعات التجارية، المطاعم والمقاهي، المرافق الصحية، الفنادق، والمنشآت الصناعية.</p>',
                'content_en' => '<p>Interior design services: offices and commercial complexes, restaurants and cafes, healthcare facilities, hotels, and industrial facilities.</p>',
                'is_featured' => false,
                'order' => 4,
                'is_active' => true,
                'meta_title_ar' => 'التصميم الداخلي | مكتب الميثاق العربي',
                'meta_title_en' => 'Interior Design | ACEC',
                'meta_desc_ar' => 'خدمات التصميم الداخلي الاحترافي في السعودية',
                'meta_desc_en' => 'Professional interior design services in Saudi Arabia',
            ],
            [
                'slug' => 'factory-design',
                'icon' => 'Factory',
                'title_ar' => 'تصميم المصانع',
                'title_en' => 'Factory Design',
                'description_ar' => 'نصمم مصانع عصرية تحقق أقصى كفاءة تشغيلية مع الالتزام بمعايير السلامة الصناعية وإمكانية التوسع المستقبلي.',
                'description_en' => 'We design modern factories that achieve maximum operational efficiency while complying with industrial safety standards and future expansion potential.',
                'content_ar' => '<p>خدمات تصميم المصانع: المخططات التنظيمية للمعدات، أنظمة المناولة، التدفق الإنتاجي، أنظمة التهوية والإضاءة الصناعية، ومتطلبات الترخيص من الجهات المعنية.</p>',
                'content_en' => '<p>Factory design services: equipment layout plans, handling systems, production flow, industrial ventilation and lighting systems, and licensing requirements from relevant authorities.</p>',
                'is_featured' => false,
                'order' => 5,
                'is_active' => true,
                'meta_title_ar' => 'تصميم المصانع | مكتب الميثاق العربي',
                'meta_title_en' => 'Factory Design | ACEC',
                'meta_desc_ar' => 'تصميم المصانع والمنشآت الصناعية في السعودية',
                'meta_desc_en' => 'Factory and industrial facilities design in Saudi Arabia',
            ],
            [
                'slug' => 'modon-compliance',
                'icon' => 'CheckCircle',
                'title_ar' => 'امتثال مدن',
                'title_en' => 'MODON Compliance',
                'description_ar' => 'نساعدكم في استيفاء جميع متطلبات الهيئة السعودية للمدن الصناعية ومناطق التقنية (مدن) وتسريع الحصول على التراخيص اللازمة.',
                'description_en' => 'We help you meet all requirements of the Saudi Authority for Industrial Cities and Technology Zones (MODON) and expedite obtaining the necessary licenses.',
                'content_ar' => '<p>خدمات الامتثال: مراجعة المخططات وفق اشتراطات مدن، إعداد الوثائق المطلوبة، التواصل مع الجهة، متابعة اعتماد المخططات، وضمان الامتثال الكامل للاشتراطات.</p>',
                'content_en' => '<p>Compliance services: review of plans according to MODON requirements, preparation of required documents, coordination with the authority, follow-up on plan approval, and ensuring full compliance with requirements.</p>',
                'is_featured' => false,
                'order' => 6,
                'is_active' => true,
                'meta_title_ar' => 'امتثال مدن | مكتب الميثاق العربي',
                'meta_title_en' => 'MODON Compliance | ACEC',
                'meta_desc_ar' => 'خدمات امتثال مدن والمدن الصناعية في السعودية',
                'meta_desc_en' => 'MODON and industrial cities compliance services in Saudi Arabia',
            ],
        ];

        foreach ($services as $service) {
            $imagePath = $this->generatePlaceholderImage("models/services/{$service['slug']}.jpg", "service-{$service['slug']}");
            DB::table('services')->insert(array_merge($service, [
                'image' => $imagePath,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
