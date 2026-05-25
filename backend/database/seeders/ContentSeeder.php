<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        $this->seedTeam();
        $this->seedClients();
        $this->seedServices();
        $this->seedProjects();
        $this->seedCertifications();
        $this->seedWhyUs();
        $this->seedBlogPosts();
        $this->seedHero();
    }

    private function seedTeam(): void
    {
        DB::table('team_members')->truncate();
        $members = [
            [
                'name_ar' => 'م. ماجد الذييب',
                'name_en' => 'Eng. Majed Al-Thuaiyb',
                'position_ar' => 'المالك والمدير العام',
                'position_en' => 'Founder & General Manager',
                'bio_ar' => 'مؤسس الميثاق العربي للاستشارات الهندسية (ACEC) عام 2006. يتمتع بخبرة تزيد عن 25 عاماً في مجال الاستشارات الهندسية وهندسة السلامة والوقاية من الحريق. المكتب من المكاتب القليلة المعتمدة من الدفاع المدني للعمل بجميع مدن المملكة.',
                'bio_en' => 'Founder of Arabian Covenant Engineering Consultants (ACEC) in 2006. Has over 25 years of experience in engineering consultancy, safety engineering, and fire prevention. The office is one of the few accredited by Civil Defense to operate across all KSA cities.',
                'order' => 1,
                'is_active' => true,
                'email' => 'majed@ac-ec.com.sa',
            ],
            [
                'name_ar' => 'م. عبدالله القحطاني',
                'name_en' => 'Eng. Abdullah Al-Qahtani',
                'position_ar' => 'مدير قسم التصميم',
                'position_en' => 'Design Department Manager',
                'bio_ar' => 'متخصص في التصميم المعماري والإنشائي للمشاريع السكنية والتجارية والصناعية.',
                'bio_en' => 'Specialized in architectural and structural design for residential, commercial, and industrial projects.',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. محمد العتيبي',
                'name_en' => 'Eng. Mohammed Al-Otaibi',
                'position_ar' => 'مدير قسم السلامة',
                'position_en' => 'Safety Department Manager',
                'bio_ar' => 'متخصص في هندسة السلامة وأنظمة الحماية من الحريق مع اعتماد الدفاع المدني.',
                'bio_en' => 'Specialized in safety engineering and fire protection systems with Civil Defense accreditation.',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. سارة الشمري',
                'name_en' => 'Eng. Sarah Al-Shamari',
                'position_ar' => 'مديرة التصميم الداخلي',
                'position_en' => 'Interior Design Manager',
                'bio_ar' => 'مصممة داخلية متخصصة للمشاريع التجارية والسكنية والضيافة.',
                'bio_en' => 'Specialized interior designer for commercial, residential, and hospitality projects.',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. خالد الدوسري',
                'name_en' => 'Eng. Khaled Al-Dosari',
                'position_ar' => 'رئيس قسم الإشراف',
                'position_en' => 'Head of Supervision',
                'bio_ar' => 'مهندس مشرف معتمد بخبرة في إشراف المشاريع الحكومية والخاصة.',
                'bio_en' => 'Certified supervising engineer with experience in government and private projects.',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. فيصل الحربي',
                'name_en' => 'Eng. Faisal Al-Harbi',
                'position_ar' => 'مهندس مساحة',
                'position_en' => 'Land Surveying Engineer',
                'bio_ar' => 'متخصص في المسوحات الطبوغرافية والمساحية وتقسيم الأراضي.',
                'bio_en' => 'Specialized in topographic and cadastral surveys and land subdivision.',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($members as $m) {
            $slug = Str::slug($m['name_en']);
            $imagePath = $this->generatePlaceholderImage("models/team-members/{$slug}.jpg", "team-{$slug}", 300, 300);
            DB::table('team_members')->insert(array_merge($m, [
                'image' => $imagePath,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    private function seedClients(): void
    {
        DB::table('clients')->truncate();
        $clients = [
            ['en' => 'STC',                       'ar' => 'الاتصالات السعودية',          'img' => 'stc.jpg'],
            ['en' => 'Diriyah Gate',               'ar' => 'بوابة الدرعية',               'img' => 'diriyah.jpg'],
            ['en' => 'Al Faisal University',       'ar' => 'جامعة الفيصل',                'img' => 'alfaisal.jpg'],
            ['en' => 'King Saud University',       'ar' => 'جامعة الملك سعود',            'img' => 'king saud.jpg'],
            ['en' => 'Riyadh Chamber',             'ar' => 'غرفة الرياض',                 'img' => 'riyadh chamber.jpg'],
            ['en' => 'Sulaiman Al Habib',          'ar' => 'مستشفى سليمان الحبيب',        'img' => 'sulaiman.jpg'],
            ['en' => 'Leejam',                     'ar' => 'ليجام',                       'img' => 'leejam.jpg'],
            ['en' => 'SRMG',                       'ar' => 'مجموعة SRMG الإعلامية',       'img' => 'srmg.jpg'],
            ['en' => 'Flyadeal',                   'ar' => 'فلاي أديل',                   'img' => 'flyadeal.jpg'],
            ['en' => 'PepsiCo',                    'ar' => 'بيبسيكو',                     'img' => 'PepsiCo.jpg'],
            ['en' => 'Alfanar',                    'ar' => 'الفنار',                      'img' => 'alfanar.jpg'],
            ['en' => 'McDonald\'s',                'ar' => 'ماكدونالدز',                  'img' => "McDonald's.jpg"],
            ['en' => 'Americana Group',            'ar' => 'أمريكانا',                    'img' => 'Americana_Group.jpg'],
            ['en' => 'Al Forsan Schools',          'ar' => 'مدارس الفرسان',               'img' => 'al forsan.jpg'],
            ['en' => 'SABIL',                      'ar' => 'سبيل',                        'img' => 'sabil.jpg'],
            ['en' => 'KFC',                        'ar' => 'كنتاكي',                      'img' => 'KFC.jpg'],
            ['en' => 'Khatib & Alami',             'ar' => 'الخطيب والعالمي',             'img' => 'Khatib And Alami.png'],
            ['en' => 'Hardee\'s',                  'ar' => 'هارديز',                      'img' => 'hardees.jpg'],
            ['en' => 'Kudu',                       'ar' => 'كودو',                        'img' => 'kudu.jpg'],
            ['en' => 'Saudi Electric Company',     'ar' => 'الشركة السعودية للكهرباء',     'img' => 'Saudi_Electric_Company.jpg'],
            ['en' => 'Roshn',                      'ar' => 'روشن',                        'img' => 'roshn.jpg'],
            ['en' => 'Downtown',                   'ar' => 'داون تاون',                   'img' => 'downtown.png'],
            ['en' => 'Deemah',                     'ar' => 'ديمة',                        'img' => 'deemah.jpg'],
            ['en' => 'Amlak',                      'ar' => 'أملاك',                       'img' => 'amlak.jpg'],
            ['en' => 'Mechinal',                   'ar' => 'ميشينال',                     'img' => 'mechinal.jpg'],
            ['en' => 'AJ Asudi',                   'ar' => 'إيه جي أسودي',                'img' => 'aj - asudi.jpg'],
            ['en' => 'Hataba',                     'ar' => 'حطابة',                       'img' => 'hataba.jpg'],
        ];

        foreach ($clients as $i => $c) {
            DB::table('clients')->updateOrInsert(
                ['name_en' => $c['en']],
                [
                    'name_ar' => $c['ar'],
                    'logo' => "models/clients/{$c['img']}",
                    'order' => $i,
                    'is_active' => true,
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function seedServices(): void
    {
        DB::table('services')->truncate();

        $services = [
            [
                'slug' => 'design',
                'icon' => 'Building2',
                'title_ar' => 'تصميم',
                'title_en' => 'Design',
                'description_ar' => 'تصاميم معمارية وإنشائية وكهربائية وميكانيكية للمشاريع السكنية والتجارية والإدارية والفنادق والمستشفيات.',
                'description_en' => 'Design drawings for residential, commercial, administrative, hotel, and hospital projects — architectural, structural, electrical, and mechanical.',
                'content_ar' => '<p>يشمل قسم التصميم لدينا:</p><ul><li>التصميم المعماري: مخططات المواقع والرسومات التنفيذية والتصميم الداخلي</li><li>التصميم الإنشائي: باستخدام SAP وSAFE وETABS مع حصر الكميات</li><li>التصميم الكهربائي: الإضاءة وأنظمة الإنذار وشبكات البيانات</li><li>التصميم الميكانيكي: التكييف والسباكة والصرف وأنظمة مكافحة الحريق</li></ul>',
                'content_en' => '<p>Our design division includes:</p><ul><li>Architectural design: site plans, construction drawings, interior design</li><li>Structural engineering: using SAP, SAFE, ETABS with quantity surveying</li><li>Electrical design: lighting, fire alarm, data networks</li><li>Mechanical design: HVAC, plumbing, drainage, fire suppression</li></ul>',
                'is_featured' => true,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'interior',
                'icon' => 'Paintbrush',
                'title_ar' => 'تصميم داخلي',
                'title_en' => 'Interior Design',
                'description_ar' => 'مخططات ديكور داخلي وتخطيط المساحات وتحسين الوظائف واختيار المواد المستدامة المخصصة.',
                'description_en' => 'Interior decoration layouts, space planning, functionality optimization, and custom sustainable material selection.',
                'content_ar' => '<p>خدمات التصميم الداخلي لدينا:</p><ul><li>مخططات الديكور الداخلي للمساحات التجارية والسكنية</li><li>تخطيط المساحات وتحسين الوظائف</li><li>اختيار المواد المستدامة حسب الطلب</li><li>دمج أنظمة الإضاءة والميكانيكية</li></ul>',
                'content_en' => '<p>Our interior design services:</p><ul><li>Interior decoration layouts for commercial and residential spaces</li><li>Space planning and functionality optimization</li><li>Custom sustainable material selection</li><li>Integration of lighting and mechanical systems</li></ul>',
                'is_featured' => true,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'supervision',
                'icon' => 'Eye',
                'title_ar' => 'إشراف',
                'title_en' => 'Supervision',
                'description_ar' => 'مراجعة واعتماد العقود ومخططات التنفيذ والإشراف على الحفريات والردم والتسوية والمراقبة اليومية للأعمال.',
                'description_en' => 'Reviewing and approving contracts and execution plans, overseeing excavation and grading, and daily monitoring of all construction works.',
                'content_ar' => '<p>خدمات الإشراف الهندسي:</p><ul><li>مراجعة واعتماد العقود ومخططات التنفيذ</li><li>الإشراف على الحفريات والردم والتسوية</li><li>المراقبة اليومية: الجدران والأرضيات والأسقف والفواصل والدهان والنجارة</li><li>اعتماد المستخلصات المالية</li><li>اختبار وتسليم أنظمة الإنذار والإطفاء</li></ul>',
                'content_en' => '<p>Engineering supervision services:</p><ul><li>Reviewing and approving contracts and execution plans</li><li>Overseeing excavation, backfilling, and grading</li><li>Daily monitoring: walls, flooring, ceilings, partitions, painting, joinery</li><li>Approving financial certificates</li><li>Testing and handing over fire alarm and suppression systems</li></ul>',
                'is_featured' => true,
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'fire-protection',
                'icon' => 'ShieldAlert',
                'title_ar' => 'حماية من الحريق',
                'title_en' => 'Fire Protection',
                'description_ar' => 'تصميم مفصل لأنظمة مكافحة الحريق حسب الكودات الوطنية والدولية مع حسابات هيدروليكية واعتماد الدفاع المدني.',
                'description_en' => 'Detailed fire fighting system design per national and international codes with hydraulic calculations and Civil Defense approval.',
                'content_ar' => '<p>خدمات الحماية من الحريق:</p><ul><li>تصميم مفصل لأنظمة مكافحة الحريق حسب الكودات الوطنية والدولية</li><li>الحسابات الهيدروليكية وتحديد أحجام المعدات</li><li>تصميم طرق الإخلاء في حالات الطوارئ</li><li>اعتماد مخططات الدفاع المدني</li><li>اختبار واعتماد الأنظمة الكهربائية والميكانيكية وأنظمة الحريق</li></ul>',
                'content_en' => '<p>Fire protection services:</p><ul><li>Detailed fire fighting system design per national and international codes</li><li>Hydraulic calculations and equipment sizing</li><li>Emergency evacuation route design</li><li>Civil Defense drawing approval</li><li>Testing and approval of electrical, mechanical, and fire systems</li></ul>',
                'is_featured' => true,
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'land-surveying',
                'icon' => 'Compass',
                'title_ar' => 'مساحة',
                'title_en' => 'Land Surveying',
                'description_ar' => 'مسوحات طبوغرافية ومساحية وتحديد مناسيب الشبكة وتقسيم الأراضي وتخطيط المواقع.',
                'description_en' => 'Topographic and cadastral surveys, grid leveling and benchmarking, land subdivision and layout planning.',
                'content_ar' => '<p>خدمات المساحة:</p><ul><li>المسوحات الطبوغرافية والمساحية</li><li>تحديد مناسيب الشبكة والنقاط المرجعية</li><li>تقسيم الأراضي وتخطيط المواقع</li></ul>',
                'content_en' => '<p>Surveying services:</p><ul><li>Topographic and cadastral surveys</li><li>Grid leveling and benchmarking</li><li>Land subdivision and layout planning</li></ul>',
                'is_featured' => false,
                'order' => 5,
                'is_active' => true,
            ],
            [
                'slug' => 'consulting',
                'icon' => 'Building2',
                'title_ar' => 'استشارات شاملة',
                'title_en' => 'Full Consulting',
                'description_ar' => 'استشارات متكاملة في جميع التخصصات الهندسية مع إدارة المشاريع والتدريب والتقييم والتحكيم.',
                'description_en' => 'Comprehensive consulting across all engineering disciplines with project management, training, evaluation, and arbitration.',
                'content_ar' => '<p>خدمات الاستشارات الشاملة:</p><ul><li>استشارات في جميع التخصصات الهندسية</li><li>إدارة المشاريع والتدريب والتقييم والتحكيم</li><li>الدعم الفني ومتابعة المواقع</li></ul>',
                'content_en' => '<p>Comprehensive consulting services:</p><ul><li>Consulting across all engineering disciplines</li><li>Project management, training, evaluation, arbitration</li><li>Technical support and site follow-up</li></ul>',
                'is_featured' => false,
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($services as $s) {
            $img = $this->generatePlaceholderImage("models/services/{$s['slug']}.jpg", "service-{$s['slug']}");
            DB::table('services')->insert(array_merge($s, [
                'image' => $img,
                'meta_title_ar' => $s['title_ar'] . ' | ACEC',
                'meta_title_en' => $s['title_en'] . ' | ACEC',
                'meta_desc_ar' => $s['description_ar'],
                'meta_desc_en' => $s['description_en'],
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    private function seedProjects(): void
    {
        DB::table('projects')->truncate();

        $projects = [
            // A. Commercial – Towers & Complexes
            ['slug' => 'najd-complex-tower', 'title_ar' => 'برج مجمع نجد', 'title_en' => 'Najd Complex Tower', 'category' => 'commercial', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => 'مجموعة نجد', 'client_en' => 'Najd Group', 'year' => 2024, 'area' => '1,885 m² tower / 792 m² built', 'desc_ar' => 'برج تجاري بواجهة زجاجية منحنية وتكسية حجرية مع علامات تجارية مضيئة.', 'desc_en' => 'Commercial tower with curved glass façade, stone cladding, and illuminated branding.', 'content_ar' => 'برج تجاري متميز بواجهة زجاجية منحنية وتكسية حجرية مع علامات تجارية مضيئة.', 'content_en' => 'Distinguished commercial tower with curved glass façade, stone cladding, and illuminated branding.', 'featured' => true, 'order' => 1],
            ['slug' => 'juin-mixed-use', 'title_ar' => 'جوين متعدد الاستخدامات', 'title_en' => 'Juin Mixed Use', 'category' => 'commercial', 'location_ar' => 'حي الملتقى', 'location_en' => 'Al-Multaqa District', 'client_ar' => 'جوين العقارية', 'client_en' => 'Juin Real Estate', 'year' => 2024, 'area' => '6,456 m²', 'desc_ar' => 'مركز تجاري للمعارض بخطوط نظيفة ومساحات مفتوحة.', 'desc_en' => 'Commercial exhibition center with clean lines and open spaces.', 'content_ar' => 'مشروع تجاري متعدد الاستخدامات بمساحة 6,456 م² يتميز بخطوط معمارية نظيفة ومساحات مفتوحة.', 'content_en' => 'Mixed-use commercial project of 6,456 m² featuring clean architectural lines and open spaces.', 'featured' => true, 'order' => 2],
            ['slug' => 'hotel-riyadh', 'title_ar' => 'فندق في الرياض', 'title_en' => 'Hotel in Riyadh', 'category' => 'commercial', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2023, 'area' => '7,200 m²', 'desc_ar' => 'فندق بواجهة مستوحاة من المشربيات مع نافورة مائية مركزية.', 'desc_en' => 'Hotel with Mashrabiya-inspired façade and central water feature.', 'content_ar' => 'فندق بمساحة 7,200 م² يتميز بواجهة مستوحاة من المشربيات ونافورة مائية مركزية.', 'content_en' => 'Hotel of 7,200 m² featuring a Mashrabiya-inspired façade and central water feature.', 'featured' => false, 'order' => 3],
            ['slug' => 'leejam-sports-complex', 'title_ar' => 'مجمع ليجام الرياضي', 'title_en' => 'Leejam Sports Complex', 'category' => 'commercial', 'location_ar' => 'حي الروابي', 'location_en' => 'Rawaby District', 'client_ar' => 'ليجام', 'client_en' => 'Leejam', 'year' => 2024, 'area' => '6,456 m²', 'desc_ar' => 'مجمع تجاري رياضي حديث.', 'desc_en' => 'Modern commercial sports complex.', 'content_ar' => 'مجمع تجاري رياضي حديث بمساحة 6,456 م².', 'content_en' => 'Modern commercial sports complex of 6,456 m².', 'featured' => true, 'order' => 4],
            // B. Commercial – Retail & Drive-Thru
            ['slug' => 'najd-drive-thru', 'title_ar' => 'مشروع نجد للقيادة', 'title_en' => 'Najd Drive-Thru', 'category' => 'commercial', 'location_ar' => 'تبوك', 'location_en' => 'Tabuk', 'client_ar' => 'مجموعة نجد', 'client_en' => 'Najd Group', 'year' => 2024, 'area' => '13,462 m²', 'desc_ar' => 'تصميم بسيط مع خشب ومساحات خضراء وممرات مغطاة.', 'desc_en' => 'Minimalistic design with wood, greenery, and covered lanes.', 'content_ar' => 'مشروع قيادة بمساحة 13,462 م² بتصميم بسيط مع عناصر خشبية ومساحات خضراء وممرات مغطاة.', 'content_en' => 'Drive-thru project of 13,462 m² with minimalistic design featuring wood elements, greenery, and covered lanes.', 'featured' => false, 'order' => 5],
            ['slug' => 'najd-strip-mall', 'title_ar' => 'مركز نجد التجاري', 'title_en' => 'Najd Strip Mall', 'category' => 'commercial', 'location_ar' => 'تبوك', 'location_en' => 'Tabuk', 'client_ar' => 'مجموعة نجد', 'client_en' => 'Najd Group', 'year' => 2024, 'area' => '4,038 m²', 'desc_ar' => 'مركز تجاري من مستويين مع تراسات طعام خارجية.', 'desc_en' => '2-level strip mall with outdoor dining terraces.', 'content_ar' => 'مركز تجاري من مستويين بمساحة 4,038 م² مع تراسات طعام خارجية.', 'content_en' => '2-level strip mall of 4,038 m² with outdoor dining terraces.', 'featured' => false, 'order' => 6],
            ['slug' => 'zulfi-retail-shops', 'title_ar' => 'محلات الزلفي التجارية', 'title_en' => 'Zulfi Retail Shops', 'category' => 'commercial', 'location_ar' => 'الخالدية، الزلفي', 'location_en' => 'Al-Khalidiya, Al Zulfi', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '8,456 m²', 'desc_ar' => 'عمارة سلمانية بأسلوب الطوب اللبن وأشجار النخيل.', 'desc_en' => 'Salmani architecture with adobe-style and palm trees.', 'content_ar' => 'محلات تجارية بمساحة 8,456 م² بتصميم سلماني وأسلوب الطوب اللبن.', 'content_en' => 'Retail shops of 8,456 m² with Salmani architectural style.', 'featured' => false, 'order' => 7],
            ['slug' => 'mcdonalds-salmani', 'title_ar' => 'ماكدونالدز - الطراز السلماني', 'title_en' => "McDonald's – Salmani Style", 'category' => 'commercial', 'location_ar' => 'المملكة العربية السعودية', 'location_en' => 'Saudi Arabia', 'client_ar' => 'ماكدونالدز السعودية', 'client_en' => "McDonald's Saudi Arabia", 'year' => 2023, 'area' => '-', 'desc_ar' => 'تأقلم الواجهة التراثية مع المعايير الحضرية المحلية.', 'desc_en' => 'Heritage façade adaptation to local urban standards.', 'content_ar' => 'تأقلم واجهة المطعم مع الطراز السلماني والمعايير الحضرية المحلية.', 'content_en' => 'Restaurant façade adaptation to Salmani style and local urban standards.', 'featured' => false, 'order' => 8],
            ['slug' => 'juin-commercial-complex', 'title_ar' => 'مجمع جوين التجاري', 'title_en' => 'Juin Commercial Complex', 'category' => 'commercial', 'location_ar' => 'تبوك', 'location_en' => 'Tabuk', 'client_ar' => 'جوين العقارية', 'client_en' => 'Juin Real Estate', 'year' => 2024, 'area' => '13,462 m²', 'desc_ar' => 'مجمع تجاري حديث بتصميم بسيط.', 'desc_en' => 'Modern commercial complex with minimalistic design.', 'content_ar' => 'مجمع تجاري حديث بمساحة 13,462 م² بتصميم بسيط.', 'content_en' => 'Modern commercial complex of 13,462 m² with minimalistic design.', 'featured' => false, 'order' => 9],
            // C. Recreational
            ['slug' => 'al-wasil-equestrian', 'title_ar' => 'ميدان الوصيل للفروسية', 'title_en' => 'Al Wasil Equestrian Field', 'category' => 'recreational', 'location_ar' => 'الوصيل - الدرعية', 'location_en' => 'Al Wasil – Diriyah', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'ميادين مفتوحة وإسطبلات للفروسية تراعي راحة الفارس والحصان.', 'desc_en' => 'Open arenas and stables prioritizing rider and horse comfort.', 'content_ar' => 'ميدان فروسية في الدرعية يتميز بميادين مفتوحة وإسطبلات مريحة.', 'content_en' => 'Equestrian field in Diriyah featuring open arenas and comfortable stables.', 'featured' => false, 'order' => 10],
            ['slug' => 'pedestrian-bridge', 'title_ar' => 'جسر مشاة', 'title_en' => 'Pedestrian Bridge', 'category' => 'recreational', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'جسر بيضاوي ديناميكي هوائي مع مصاعد وسلالم.', 'desc_en' => 'Aerodynamic elliptical bridge with elevators and stairs.', 'content_ar' => 'جسر مشاة بتصميم بيضاوي ديناميكي هوائي مع مصاعد وسلالم.', 'content_en' => 'Pedestrian bridge with aerodynamic elliptical form and elevators and stairs.', 'featured' => false, 'order' => 11],
            ['slug' => 'al-ghat-square', 'title_ar' => 'ساحة بلدية الغاط', 'title_en' => 'The Square of Al-Ghat Municipality', 'category' => 'recreational', 'location_ar' => 'محافظة الغاط', 'location_en' => 'Al Ghat Governorate', 'client_ar' => 'بلدية الغاط', 'client_en' => 'Al-Ghat Municipality', 'year' => 2024, 'area' => '-', 'desc_ar' => 'ساحة عامة تجمع بين الهوية التراثية والحياة العصرية.', 'desc_en' => 'Public square blending heritage identity with contemporary life.', 'content_ar' => 'ساحة عامة تعيد إحياء الساحة الحضرية بمزيج من الهوية التراثية والحياة العصرية.', 'content_en' => 'Public square reviving the urban square with a blend of heritage identity and contemporary life.', 'featured' => false, 'order' => 12],
            // D. Residential
            ['slug' => 'shaheqa-nakheel-1', 'title_ar' => 'شاهقة - النخيل (مبنى + 6 فلل)', 'title_en' => 'Shaheqa – Al Nakheel (1 Building + 6 Villas)', 'category' => 'residential', 'location_ar' => 'النخيل', 'location_en' => 'Al Nakheel', 'client_ar' => 'شاهقة العقارية', 'client_en' => 'Shaheqa Real Estate', 'year' => 2024, 'area' => '-', 'desc_ar' => 'أناقة عصرية تجمع بين الفخامة والبساطة.', 'desc_en' => 'Modern elegance combining luxury with simplicity.', 'content_ar' => 'مشروع سكني بأناقة عصرية تجمع بين الفخامة والبساطة.', 'content_en' => 'Residential project with modern elegance combining luxury and simplicity.', 'featured' => false, 'order' => 13],
            ['slug' => 'shaheqa-nakheel-6', 'title_ar' => 'شاهقة - النخيل (6 فلل)', 'title_en' => 'Shaheqa – Al Nakheel (6 Villas)', 'category' => 'residential', 'location_ar' => 'النخيل', 'location_en' => 'Al Nakheel', 'client_ar' => 'شاهقة العقارية', 'client_en' => 'Shaheqa Real Estate', 'year' => 2024, 'area' => '-', 'desc_ar' => 'واجهة معيارية وخامات مختارة.', 'desc_en' => 'Modular façade with refined materials.', 'content_ar' => 'فلل سكنية بواجهة معيارية وخامات مختارة بعناية.', 'content_en' => 'Residential villas with modular façade and carefully refined materials.', 'featured' => false, 'order' => 14],
            ['slug' => 'shaheqa-maather', 'title_ar' => 'شاهقة - المعذر', 'title_en' => 'Shaheqa – Al Maather', 'category' => 'residential', 'location_ar' => 'المعذر', 'location_en' => 'Al Maather', 'client_ar' => 'شاهقة العقارية', 'client_en' => 'Shaheqa Real Estate', 'year' => 2024, 'area' => '-', 'desc_ar' => 'واجهة معيارية بسيطة ومتناغمة.', 'desc_en' => 'Modular façade with simplicity and harmony.', 'content_ar' => 'واجهة معيارية تتميز بالبساطة والتناغم.', 'content_en' => 'Modular façade characterized by simplicity and harmony.', 'featured' => false, 'order' => 15],
            ['slug' => 'almatwa-resthouse', 'title_ar' => 'استراحة المطوع', 'title_en' => "Almatwa' Resthouse", 'category' => 'residential', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مخطط ترفيهي فاخر بخطوط أنيقة وزخارف ثقافية.', 'desc_en' => 'Luxury landscape with sleek lines and cultural motifs.', 'content_ar' => 'استراحة فاخرة بمخطط ترفيهي فاخر وخطوط أنيقة وزخارف ثقافية.', 'content_en' => 'Luxury resthouse with landscape design, sleek lines, and cultural motifs.', 'featured' => false, 'order' => 16],
            ['slug' => 'villa-al-wadi', 'title_ar' => 'فيلا سكنية (حي الوادي)', 'title_en' => 'Residential Villa (Al-Wadi District)', 'category' => 'residential', 'location_ar' => 'حي الوادي، الرياض', 'location_en' => 'Al-Wadi District, Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2023, 'area' => '312 m²', 'desc_ar' => 'فيلا عصرية حضرية.', 'desc_en' => 'Contemporary urban villa.', 'content_ar' => 'فيلا عصرية حضرية بمساحة 312 م².', 'content_en' => 'Contemporary urban villa of 312 m².', 'featured' => false, 'order' => 17],
            ['slug' => 'villa-jarir', 'title_ar' => 'فيلا سكنية (جرير)', 'title_en' => 'Residential Villa (Jarir)', 'category' => 'residential', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2023, 'area' => '952 m²', 'desc_ar' => 'فيلا عصرية.', 'desc_en' => 'Contemporary villa.', 'content_ar' => 'فيلا عصرية بمساحة 952 م².', 'content_en' => 'Contemporary villa of 952 m².', 'featured' => false, 'order' => 18],
            ['slug' => 'villa-minimalist-520', 'title_ar' => 'فيلا سكنية 520 م²', 'title_en' => 'Residential Villa 520 m²', 'category' => 'residential', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '520 m²', 'desc_ar' => 'تصميم بسيط بالزجاج والخشب والخرسانة مع أشجار نخيل.', 'desc_en' => 'Minimalist design with glass, wood, concrete, and palm trees.', 'content_ar' => 'فيلا بتصميم بسيط يجمع الزجاج والخشب والخرسانة مع أشجار النخيل.', 'content_en' => 'Villa with minimalist design combining glass, wood, concrete, and palm trees.', 'featured' => false, 'order' => 19],
            ['slug' => 'villa-muzahmiya', 'title_ar' => 'فيلا سكنية (المزاحمية)', 'title_en' => 'Residential Villa (Al Muzahmiya)', 'category' => 'residential', 'location_ar' => 'المزاحمية، الرياض', 'location_en' => 'Al Muzahmiya, Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '425 m²', 'desc_ar' => 'فيلا بتصميم بسيط وخطوط نظيفة.', 'desc_en' => 'Minimalist villa with clean lines.', 'content_ar' => 'فيلا بتصميم بسيط وخطوط نظيفة بمساحة 425 م².', 'content_en' => 'Minimalist villa with clean lines of 425 m².', 'featured' => false, 'order' => 20],
            ['slug' => 'villa-abdullah', 'title_ar' => 'فيلا عبدالله', 'title_en' => 'Villa Abdullah', 'category' => 'residential', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'فيلا سكنية فاخرة.', 'desc_en' => 'Luxury residential villa.', 'content_ar' => 'فيلا سكنية فاخرة.', 'content_en' => 'Luxury residential villa.', 'featured' => false, 'order' => 21],
            ['slug' => 'villa-al-refaei', 'title_ar' => 'فيلا الرفاعي', 'title_en' => 'Villa Al-Refaei', 'category' => 'residential', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'فيلا سكنية.', 'desc_en' => 'Residential villa.', 'content_ar' => 'فيلا سكنية.', 'content_en' => 'Residential villa.', 'featured' => false, 'order' => 22],
            ['slug' => 'villa-dr-abdullah', 'title_ar' => 'فيلا د. عبدالله', 'title_en' => 'Villa Dr. Abdullah', 'category' => 'residential', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'فيلا سكنية.', 'desc_en' => 'Residential villa.', 'content_ar' => 'فيلا سكنية.', 'content_en' => 'Residential villa.', 'featured' => false, 'order' => 23],
            // E. Educational & Governmental
            ['slug' => 'vegetable-market-lab', 'title_ar' => 'مختبر سوق الخضار', 'title_en' => 'Vegetable Market Laboratory', 'category' => 'educational', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'واجهة زجاجية وحجرية تجمع بين الشفافية والمتانة.', 'desc_en' => 'Glass and stone façade combining transparency and durability.', 'content_ar' => 'مختبر بواجهة زجاجية وحجرية تجمع بين الشفافية والمتانة.', 'content_en' => 'Laboratory with glass and stone façade combining transparency and durability.', 'featured' => false, 'order' => 24],
            ['slug' => 'secondary-industrial-institute', 'title_ar' => 'المعهد الصناعي الثانوي', 'title_en' => 'Secondary Industrial Institute', 'category' => 'educational', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'واجهة بهندسة خطية وتكسية حجرية ومعدنية وزجاج.', 'desc_en' => 'Geometric lines with stone cladding, metal, and glass.', 'content_ar' => 'معهد صناعي بواجهة بهندسة خطية وتكسية حجرية ومعدنية وزجاج.', 'content_en' => 'Industrial institute with geometric lines, stone cladding, metal, and glass.', 'featured' => false, 'order' => 25],
            ['slug' => 'unaizah-technical-institute', 'title_ar' => 'المعهد التقني بعنيزة', 'title_en' => 'Technical Institute of Unaizah', 'category' => 'educational', 'location_ar' => 'عنيزة', 'location_en' => 'Unaizah', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'نوافذ عمودية وعناصر تظليل بطابع مؤسسي.', 'desc_en' => 'Vertical windows and shading elements with institutional character.', 'content_ar' => 'معهد تقني بنوافذ عمودية وعناصر تظليل وطابع مؤسسي.', 'content_en' => 'Technical institute with vertical windows, shading elements, and institutional character.', 'featured' => false, 'order' => 26],
            // F. Industrial – Factories & Warehouses
            ['slug' => 'hotpack-factory', 'title_ar' => 'مصنع هوت باك', 'title_en' => 'Hotpack Factory', 'category' => 'industrial', 'location_ar' => 'مدينة الخرج الصناعية', 'location_en' => 'Al-Kharj Industrial City', 'client_ar' => 'هوت باك', 'client_en' => 'Hotpack', 'year' => 2024, 'area' => '96,256 m²', 'desc_ar' => 'مصنع للتعبئة والتغليف.', 'desc_en' => 'Packaging factory.', 'content_ar' => 'مصنع هوت باك للتعبئة والتغليف في مدينة الخرج الصناعية بمساحة 96,256 م².', 'content_en' => 'Hotpack packaging factory in Al-Kharj Industrial City, 96,256 m².', 'featured' => true, 'order' => 27],
            ['slug' => 'al-saif-warehouse', 'title_ar' => 'مستودع شركة السيف', 'title_en' => 'Al Saif Company Warehouse', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => 'شركة السيف', 'client_en' => 'Al Saif Company', 'year' => 2024, 'area' => '100,000 m²', 'desc_ar' => 'مستودع ضخم.', 'desc_en' => 'Large warehouse.', 'content_ar' => 'مستودع شركة السيف بمساحة 100,000 م² في بوابة المدينة الصناعية.', 'content_en' => 'Al Saif Company warehouse of 100,000 m² in Industrial Gate City.', 'featured' => true, 'order' => 28],
            ['slug' => 'hoson-najd-warehouse', 'title_ar' => 'مستودع حصن نجد', 'title_en' => 'Hoson Najd Warehouse', 'category' => 'industrial', 'location_ar' => 'طريق الخرج', 'location_en' => 'Al Kharj Road', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '100,000 m²', 'desc_ar' => 'مستودع مستوحى من قلعة نجدية.', 'desc_en' => 'Warehouse inspired by Najdi fortress.', 'content_ar' => 'مستودع بمساحة 100,000 م² بتصميم مستوحى من القلاع النجدية.', 'content_en' => 'Warehouse of 100,000 m² with design inspired by Najdi fortresses.', 'featured' => false, 'order' => 29],
            ['slug' => 'utng-factory', 'title_ar' => 'مصنع المجموعة الوطنية للتجارة', 'title_en' => 'United Trading National Group Factory', 'category' => 'industrial', 'location_ar' => 'مدينة زامل الصناعية', 'location_en' => 'Zamil Industrial City', 'client_ar' => 'المجموعة الوطنية للتجارة', 'client_en' => 'United Trading National Group', 'year' => 2024, 'area' => '14,819 m²', 'desc_ar' => 'مصنع تجاري.', 'desc_en' => 'Commercial factory.', 'content_ar' => 'مصنع المجموعة الوطنية للتجارة بمساحة 14,819 م².', 'content_en' => 'United Trading National Group factory of 14,819 m².', 'featured' => false, 'order' => 30],
            ['slug' => 'al-watania-factory', 'title_ar' => 'مصنع الوطنية للصناعات', 'title_en' => 'Al Watania for Industries Factory', 'category' => 'industrial', 'location_ar' => 'مدينة الخرج الصناعية', 'location_en' => 'Al Kharj Industrial City', 'client_ar' => 'الوطنية للصناعات', 'client_en' => 'Al Watania for Industries', 'year' => 2024, 'area' => '96,256 m²', 'desc_ar' => 'مصنع صناعي.', 'desc_en' => 'Industrial factory.', 'content_ar' => 'مصنع الوطنية للصناعات بمساحة 96,256 م².', 'content_en' => 'Al Watania for Industries factory of 96,256 m².', 'featured' => false, 'order' => 31],
            ['slug' => 'al-munajem-foods', 'title_ar' => 'مصنع المنجم للأغذية', 'title_en' => 'Al Munajem Foods Factory', 'category' => 'industrial', 'location_ar' => 'جدة - المدينة الصناعية الثالثة', 'location_en' => 'Jeddah 3rd Industrial City', 'client_ar' => 'المنجم للأغذية', 'client_en' => 'Al Munajem Foods', 'year' => 2024, 'area' => '55,905 m²', 'desc_ar' => 'مصنع أغذية.', 'desc_en' => 'Food factory.', 'content_ar' => 'مصنع المنجم للأغذية بمساحة 55,905 م².', 'content_en' => 'Al Munajem Foods factory of 55,905 m².', 'featured' => false, 'order' => 32],
            ['slug' => 'aflak-electronics', 'title_ar' => 'مصنع أفلاك للإلكترونيات', 'title_en' => 'Aflak Electronics Factory', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => 'أفلاك', 'client_en' => 'Aflak', 'year' => 2024, 'area' => '23,398 m²', 'desc_ar' => 'مصنع إلكترونيات.', 'desc_en' => 'Electronics factory.', 'content_ar' => 'مصنع أفلاك للإلكترونيات بمساحة 23,398 م².', 'content_en' => 'Aflak Electronics factory of 23,398 m².', 'featured' => false, 'order' => 33],
            ['slug' => 'abo-moati', 'title_ar' => 'شركة أبو معاتي', 'title_en' => 'Abo Moati Company', 'category' => 'industrial', 'location_ar' => 'مدينة طيبة الصناعية', 'location_en' => 'Taiba Industrial City', 'client_ar' => 'أبو معاتي', 'client_en' => 'Abo Moati', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مستودع للوازم التعليمية والمكتبية.', 'desc_en' => 'Educational and office supplies warehouse.', 'content_ar' => 'مستودع للوازم التعليمية والمكتبية.', 'content_en' => 'Educational and office supplies warehouse.', 'featured' => false, 'order' => 34],
            ['slug' => 'al-kamal-medicine', 'title_ar' => 'مستودع الكمال للأدوية', 'title_en' => 'Al Kamal Medicine Warehouse', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مستودع أدوية.', 'desc_en' => 'Medical warehouse.', 'content_ar' => 'مستودع أدوية.', 'content_en' => 'Medical warehouse.', 'featured' => false, 'order' => 35],
            ['slug' => 'abana-warehouse', 'title_ar' => 'مستودع أبنا', 'title_en' => 'Abana Warehouse', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مستودع إلكترونيات.', 'desc_en' => 'Electronics warehouse.', 'content_ar' => 'مستودع إلكترونيات.', 'content_en' => 'Electronics warehouse.', 'featured' => false, 'order' => 36],
            ['slug' => 'al-babtin-warehouses', 'title_ar' => 'مستودعات البابطين', 'title_en' => 'Al Babtin Warehouses', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => 'البابطين للطاقة', 'client_en' => 'Al Babtin Power', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مستودعات معدات طاقة وثقيلة.', 'desc_en' => 'Power and heavy equipment warehouses.', 'content_ar' => 'مستودعات معدات طاقة وثقيلة.', 'content_en' => 'Power and heavy equipment warehouses.', 'featured' => false, 'order' => 37],
            ['slug' => 'ncsp-factory', 'title_ar' => 'مصنع NCSP', 'title_en' => 'NCSP Factory', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع كبريت.', 'desc_en' => 'Sulfur factory.', 'content_ar' => 'مصنع كبريت.', 'content_en' => 'Sulfur factory.', 'featured' => false, 'order' => 38],
            ['slug' => 'al-olayan-aluminum', 'title_ar' => 'مصنع العليان للألمنيوم', 'title_en' => 'Al Olayan Aluminum Factory', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => 'مجموعة العليان', 'client_en' => 'Al Olayan Group', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع ألمنيوم.', 'desc_en' => 'Aluminum factory.', 'content_ar' => 'مصنع ألمنيوم.', 'content_en' => 'Aluminum factory.', 'featured' => false, 'order' => 39],
            ['slug' => 'intercement-factory', 'title_ar' => 'مصنع إنترسمنت', 'title_en' => 'Intercement Factory', 'category' => 'industrial', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع أسمنت.', 'desc_en' => 'Cement factory.', 'content_ar' => 'مصنع أسمنت.', 'content_en' => 'Cement factory.', 'featured' => false, 'order' => 40],
            ['slug' => 'armital-factory', 'title_ar' => 'مصنع أرميتال', 'title_en' => 'Armital Factory', 'category' => 'industrial', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع.', 'desc_en' => 'Factory.', 'content_ar' => 'مصنع.', 'content_en' => 'Factory.', 'featured' => false, 'order' => 41],
            ['slug' => 'pepsico-factory', 'title_ar' => 'مصنع بيبسيكو', 'title_en' => 'PepsiCo Factory', 'category' => 'industrial', 'location_ar' => 'المدينة الصناعية الثانية', 'location_en' => '2nd Industrial City', 'client_ar' => 'بيبسيكو', 'client_en' => 'PepsiCo', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع مشروبات.', 'desc_en' => 'Beverage factory.', 'content_ar' => 'مصنع مشروبات.', 'content_en' => 'Beverage factory.', 'featured' => true, 'order' => 42],
            ['slug' => 'deemah-factory', 'title_ar' => 'مصنع ديمة', 'title_en' => 'Deemah Factory', 'category' => 'industrial', 'location_ar' => 'المدينة الصناعية الثانية', 'location_en' => '2nd Industrial City', 'client_ar' => 'ديمة', 'client_en' => 'Deemah', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع منتجات غذائية.', 'desc_en' => 'Food products factory.', 'content_ar' => 'مصنع منتجات غذائية.', 'content_en' => 'Food products factory.', 'featured' => false, 'order' => 43],
            ['slug' => 'advanced-medicine-factory', 'title_ar' => 'مصنع الدواء المتقدم', 'title_en' => 'Advanced Medicine Factory', 'category' => 'industrial', 'location_ar' => 'المدينة الصناعية الثانية', 'location_en' => '2nd Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع أدوية بتقنية GMP.', 'desc_en' => 'Pharma factory (GMP).', 'content_ar' => 'مصنع أدوية بتقنية GMP.', 'content_en' => 'Pharma factory (GMP certified).', 'featured' => false, 'order' => 44],
            ['slug' => 'german-pharma', 'title_ar' => 'المستحضرات الدوائية الألمانية', 'title_en' => 'German Pharmaceutical Industries', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => 'المستحضرات الدوائية الألمانية', 'client_en' => 'German Pharmaceutical Industries', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع أدوية بالمعايير الألمانية GMP.', 'desc_en' => 'Pharma factory (German GMP standards).', 'content_ar' => 'مصنع أدوية بالمعايير الألمانية GMP.', 'content_en' => 'Pharma factory meeting German GMP standards.', 'featured' => false, 'order' => 45],
            ['slug' => 'wareed-medicine', 'title_ar' => 'مصنع وريد للأدوية', 'title_en' => 'Wareed Medicine Factory', 'category' => 'industrial', 'location_ar' => 'مدينة الخرج الصناعية', 'location_en' => 'Al Kharj Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع أدوية.', 'desc_en' => 'Medical factory.', 'content_ar' => 'مصنع أدوية.', 'content_en' => 'Medical factory.', 'featured' => false, 'order' => 46],
            ['slug' => 'emdad-medicine', 'title_ar' => 'مصنع إمداد للأدوية', 'title_en' => 'Emdad Medicine Factory', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع أدوية.', 'desc_en' => 'Medical factory.', 'content_ar' => 'مصنع أدوية.', 'content_en' => 'Medical factory.', 'featured' => false, 'order' => 47],
            ['slug' => '2m-electric-factory', 'title_ar' => 'مصنع 2M للكهرباء', 'title_en' => '2M Electric Factory', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع لوحات كهربائية.', 'desc_en' => 'Electrical panels factory.', 'content_ar' => 'مصنع لوحات كهربائية.', 'content_en' => 'Electrical panels factory.', 'featured' => false, 'order' => 48],
            ['slug' => 'riyadh-foods-complex', 'title_ar' => 'مجمع مصانع رياض فودز', 'title_en' => 'Riyadh Foods Factory Complex', 'category' => 'industrial', 'location_ar' => 'مدينة العجيمي الصناعية', 'location_en' => 'Al-Ajimy Industrial City', 'client_ar' => 'رياض فودز', 'client_en' => 'Riyadh Foods', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مجمع متعدد المصانع للأغذية.', 'desc_en' => 'Multi-factory food complex.', 'content_ar' => 'مجمع متعدد المصانع للأغذية.', 'content_en' => 'Multi-factory food complex.', 'featured' => false, 'order' => 49],
            ['slug' => 'shams-al-qahwa', 'title_ar' => 'مصنع شمس القهوة', 'title_en' => 'Shams Al Qahwa Factory', 'category' => 'industrial', 'location_ar' => 'بوابة المدينة الصناعية', 'location_en' => 'Industrial Gate City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع قهوة.', 'desc_en' => 'Coffee factory.', 'content_ar' => 'مصنع قهوة.', 'content_en' => 'Coffee factory.', 'featured' => false, 'order' => 50],
            ['slug' => 'geer-communications', 'title_ar' => 'مصنع جير للاتصالات', 'title_en' => 'Geer Communications & Technology', 'category' => 'industrial', 'location_ar' => 'مدينة سدير الصناعية', 'location_en' => 'Sudair Industrial City', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مصنع معدات اتصالات.', 'desc_en' => 'Telecom equipment factory.', 'content_ar' => 'مصنع معدات اتصالات.', 'content_en' => 'Telecom equipment factory.', 'featured' => false, 'order' => 51],
            ['slug' => 'neom-weighing', 'title_ar' => 'محطة وزن نيوم', 'title_en' => 'Neom Weighing Stop', 'category' => 'industrial', 'location_ar' => 'نيوم', 'location_en' => 'NEOM', 'client_ar' => 'نيوم', 'client_en' => 'NEOM', 'year' => 2024, 'area' => '-', 'desc_ar' => 'نقطة تفتيش لنقل النفايات.', 'desc_en' => 'Waste transport checkpoint.', 'content_ar' => 'نقطة تفتيش لنقل النفايات.', 'content_en' => 'Waste transport checkpoint.', 'featured' => true, 'order' => 52],
            ['slug' => 'north-veg-market', 'title_ar' => 'سوق الخضار الشمالي', 'title_en' => 'North Vegetable & Fruit Market', 'category' => 'industrial', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'سوق خضار.', 'desc_en' => 'Vegetable market.', 'content_ar' => 'سوق خضار.', 'content_en' => 'Vegetable market infrastructure.', 'featured' => false, 'order' => 53],
            // G. Safety Projects
            ['slug' => 'jeddah-oceanarium', 'title_ar' => 'أحواض جدة - الحماية من الحريق', 'title_en' => 'Jeddah Central Oceanarium - Fire Safety', 'category' => 'safety', 'location_ar' => 'جدة', 'location_en' => 'Jeddah', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'امتثال كامل للسلامة العامة.', 'desc_en' => 'Full compliance, public safety.', 'content_ar' => 'تصميم أنظمة السلامة والحماية من الحريق للأحواض المائية.', 'content_en' => 'Fire and life safety design for the oceanarium.', 'featured' => true, 'order' => 54],
            ['slug' => 'stc-square-aqalat', 'title_ar' => 'ساحة STC - أبراج العقيلات', 'title_en' => 'STC Square – Aqalat Towers', 'category' => 'safety', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'STC', 'client_en' => 'STC', 'year' => 2024, 'area' => '-', 'desc_ar' => 'الحماية من الحريق لبرج STC والمرافق.', 'desc_en' => 'Fire and life safety for STC tower and facilities.', 'content_ar' => 'تصميم أنظمة السلامة والحماية من الحريق.', 'content_en' => 'Fire and life safety design for the tower and associated facilities.', 'featured' => true, 'order' => 55],
            ['slug' => 'dgda-diriyah-gate', 'title_ar' => 'هيئة تطوير بوابة الدرعية', 'title_en' => 'DGDA – Diriyah Gate', 'category' => 'safety', 'location_ar' => 'الدرعية', 'location_en' => 'Diriyah', 'client_ar' => 'هيئة تطوير بوابة الدرعية', 'client_en' => 'Diriyah Gate Dev. Authority', 'year' => 2024, 'area' => '-', 'desc_ar' => 'السلامة والإشراف مع تسليم الدفاع المدني.', 'desc_en' => 'Fire safety and supervision, handover to Civil Defense.', 'content_ar' => 'تصميم أنظمة السلامة والحماية مع الإشراف والتسليم للدفاع المدني.', 'content_en' => 'Fire and life safety design with supervision and handover to Civil Defense.', 'featured' => true, 'order' => 56],
            ['slug' => 'sabil-14-branches', 'title_ar' => 'سبيل - 14 فرعاً', 'title_en' => 'SABIL – 14 Branches KSA', 'category' => 'safety', 'location_ar' => 'جميع أنحاء المملكة', 'location_en' => 'Across KSA', 'client_ar' => 'سبيل', 'client_en' => 'SABIL', 'year' => 2024, 'area' => '-', 'desc_ar' => '14 فرعاً في جميع أنحاء المملكة.', 'desc_en' => '14 branches across Saudi Arabia.', 'content_ar' => 'تصميم أنظمة السلامة والحماية من الحريق لـ 14 فرعاً.', 'content_en' => 'Fire and life safety design for 14 branches across the Kingdom.', 'featured' => false, 'order' => 57],
            ['slug' => 'alfaisal-university-engineering', 'title_ar' => 'جامعة الفيصل - كلية الهندسة', 'title_en' => 'Al Faisal University – Engineering College', 'category' => 'safety', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => 'جامعة الفيصل', 'client_en' => 'Al Faisal University', 'year' => 2024, 'area' => '-', 'desc_ar' => 'السلامة والحماية للحرم الجامعي.', 'desc_en' => 'Fire and life safety for university facilities.', 'content_ar' => 'تصميم أنظمة السلامة والحماية من الحريق.', 'content_en' => 'Fire and life safety design for university facilities.', 'featured' => false, 'order' => 58],
            ['slug' => 'ksu-sports-club', 'title_ar' => 'جامعة الملك سعود - النادي الرياضي', 'title_en' => 'King Saud University – Sports Club', 'category' => 'safety', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => 'جامعة الملك سعود', 'client_en' => 'King Saud University', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مخارج طوارئ إضافية مع اعتماد الدفاع المدني.', 'desc_en' => 'Additional emergency exits, Civil Defense approved.', 'content_ar' => 'تصميم مخارج طوارئ إضافية مع اعتماد الدفاع المدني.', 'content_en' => 'Additional emergency exits design with Civil Defense approval.', 'featured' => false, 'order' => 59],
            ['slug' => 'riyadh-chamber-building', 'title_ar' => 'مبنى غرفة الرياض', 'title_en' => 'Riyadh Chamber Building', 'category' => 'safety', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => 'غرفة الرياض', 'client_en' => 'Riyadh Chamber', 'year' => 2024, 'area' => '-', 'desc_ar' => 'امتثال تنظيمي كامل.', 'desc_en' => 'Full regulatory compliance.', 'content_ar' => 'تصميم أنظمة السلامة والحماية من الحريق مع الامتثال التنظيمي.', 'content_en' => 'Fire safety design with full regulatory compliance.', 'featured' => false, 'order' => 60],
            // H. Interior – Commercial
            ['slug' => 'hataba-restaurant', 'title_ar' => 'مطعم حتابة', 'title_en' => 'Hataba Restaurant', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'حتابة', 'client_en' => 'Hataba', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم داخلي بالخشب والحجر والإضاءة الدافئة.', 'desc_en' => 'Wood, stone, warm lighting interior design.', 'content_ar' => 'تصميم داخلي يجمع الخشب والحجر والإضاءة الدافئة بألوان ترابية.', 'content_en' => 'Interior design featuring wood, stone, warm lighting, and earthy tones.', 'featured' => false, 'order' => 61],
            ['slug' => 'srmg-interior', 'title_ar' => 'المقر الرئيسي SRMG', 'title_en' => 'SRMG Headquarters', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'مجموعة SRMG الإعلامية', 'client_en' => 'SRMG', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم مؤسسي حديث بمساحات تعاونية ومكاتب خاصة.', 'desc_en' => 'Modern corporate with collaborative areas and private offices.', 'content_ar' => 'تصميم داخلي مؤسسي حديث بمساحات تعاونية ومكاتب خاصة.', 'content_en' => 'Modern corporate interior with collaborative areas and private offices.', 'featured' => false, 'order' => 62],
            ['slug' => 'floward-interior', 'title_ar' => 'المقر الرئيسي فلورارد', 'title_en' => 'Floward Headquarters', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'فلورارد', 'client_en' => 'Floward', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم مستوحى من الطبيعة بألوان ناعمة ومساحات خضراء.', 'desc_en' => 'Nature-inspired design with soft palettes and greenery.', 'content_ar' => 'تصميم داخلي مستوحى من الطبيعة بألوان ناعمة ومساحات خضراء.', 'content_en' => 'Nature-inspired interior with soft palettes, greenery, and open collaboration.', 'featured' => false, 'order' => 63],
            ['slug' => 'fly-adeal-interior', 'title_ar' => 'المقر الرئيسي فلاي أديل', 'title_en' => 'Fly Adeal Headquarters', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'فلاي أديل', 'client_en' => 'Fly Adeal', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم أنيق وعصري بمساحات وظيفية.', 'desc_en' => 'Sleek, contemporary design with functional zones.', 'content_ar' => 'تصميم داخلي أنيق وعصري بمساحات وظيفية.', 'content_en' => 'Sleek, contemporary interior design with functional zones.', 'featured' => false, 'order' => 64],
            ['slug' => 'al-olayan-admin', 'title_ar' => 'المبنى الإداري للعليان', 'title_en' => 'Al Olyan Admin Building', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => 'مجموعة العليان', 'client_en' => 'Al Olayan Group', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم بألوان محايدة وأنظمة ذكية.', 'desc_en' => 'Aluminum finishes, neutral palette, smart systems.', 'content_ar' => 'تصميم داخلي بألومنيوم وألوان محايدة وأنظمة ذكية.', 'content_en' => 'Interior with aluminum finishes, neutral palette, smart systems, and acoustic treatment.', 'featured' => false, 'order' => 65],
            // I. Interior – Residential
            ['slug' => 'villa-abdullah-interior', 'title_ar' => 'فيلا عبدالله - التصميم الداخلي', 'title_en' => 'Villa Abdullah Interior', 'category' => 'interior', 'location_ar' => 'الرياض', 'location_en' => 'Riyadh', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم كلاسيكي حديث بألواح جدارية ولمسات ذهبية.', 'desc_en' => 'Neo-Classical Modern with wall paneling and gold accents.', 'content_ar' => 'تصميم داخلي كلاسيكي حديث بألواح جدارية ولمسات ذهبية.', 'content_en' => 'Neo-Classical Modern interior design with wall paneling, gold accents, and rich fabrics.', 'featured' => false, 'order' => 66],
            ['slug' => 'villa-kahtany-proposal1', 'title_ar' => 'فيلا سليم القحطاني (اقتراح 1)', 'title_en' => 'Villa Salim Al-Kahtany (Proposal 1)', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'مجلس فاخر حديث بلمسات عربية.', 'desc_en' => 'Modern luxury Majlis with Arabic influence.', 'content_ar' => 'مجلس فاخر حديث بلمسات عربية للتجمعات الرسمية.', 'content_en' => 'Modern luxury Majlis with Arabic influence for formal gatherings.', 'featured' => false, 'order' => 67],
            ['slug' => 'villa-kahtany-proposal2', 'title_ar' => 'فيلا سليم القحطاني (اقتراح 2)', 'title_en' => 'Villa Salim Al-Kahtany (Proposal 2)', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم تقليدي حديث بألوان محايدة.', 'desc_en' => 'Modern traditional with neutral palette and gold accents.', 'content_ar' => 'تصميم تقليدي حديث بألوان محايدة ولمسات ذهبية.', 'content_en' => 'Modern traditional design with neutral palette and gold accents.', 'featured' => false, 'order' => 68],
            ['slug' => 'villa-saadon', 'title_ar' => 'فيلا سعدون', 'title_en' => 'Villa Saadon', 'category' => 'interior', 'location_ar' => '-', 'location_en' => '-', 'client_ar' => '-', 'client_en' => '-', 'year' => 2024, 'area' => '-', 'desc_ar' => 'تصميم عصري بخطوط أنيقة وإضاءة طبيعية.', 'desc_en' => 'Modern contemporary with sleek lines and natural lighting.', 'content_ar' => 'تصميم داخلي عصري بخطوط أنيقة وإضاءة طبيعية.', 'content_en' => 'Modern contemporary interior with sleek lines and natural lighting.', 'featured' => false, 'order' => 69],
        ];

        foreach ($projects as $p) {
            $slug = $p['slug'];
            $img = $this->generatePlaceholderImage("models/projects/{$slug}.jpg", "project-{$slug}");
            DB::table('projects')->insert([
                'slug' => $p['slug'],
                'title_ar' => $p['title_ar'],
                'title_en' => $p['title_en'],
                'description_ar' => $p['desc_ar'],
                'description_en' => $p['desc_en'],
                'content_ar' => $p['content_ar'],
                'content_en' => $p['content_en'],
                'category' => $p['category'],
                'location_ar' => $p['location_ar'],
                'location_en' => $p['location_en'],
                'client_ar' => $p['client_ar'],
                'client_en' => $p['client_en'],
                'year' => $p['year'],
                'area' => $p['area'] ?? null,
                'image' => $img,
                'is_featured' => $p['featured'],
                'order' => $p['order'],
                'is_active' => true,
                'meta_title_ar' => $p['title_ar'] . ' | ACEC',
                'meta_title_en' => $p['title_en'] . ' | ACEC',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedCertifications(): void
    {
        DB::table('certifications')->truncate();
        $certs = [
            [
                'name_ar' => 'اعتماد الدفاع المدني',
                'name_en' => 'Civil Defense Accreditation',
                'description_ar' => 'رخصة وطنية شاملة للعمل في جميع مدن المملكة العربية السعودية في مجال الحماية ومكافحة الحريق.',
                'description_en' => 'Comprehensive nationwide license to operate across all KSA cities in fire protection and safety.',
                'issuer_ar' => 'المديرية العامة للدفاع المدني',
                'issuer_en' => 'General Directorate of Civil Defense',
                'order' => 1, 'is_active' => true,
            ],
            [
                'name_ar' => 'اعتماد مدن',
                'name_en' => 'MODON Accreditation',
                'description_ar' => 'معتمد من الهيئة السعودية للمدن الصناعية ومناطق التقنية لتقديم الخدمات الهندسية.',
                'description_en' => 'Accredited by the Saudi Authority for Industrial Cities and Technology Zones for engineering services.',
                'issuer_ar' => 'الهيئة السعودية للمدن الصناعية ومناطق التقنية',
                'issuer_en' => 'Saudi Authority for Industrial Cities & Technology Zones',
                'order' => 2, 'is_active' => true,
            ],
            [
                'name_ar' => 'العضوية في الهيئة السعودية للمهندسين',
                'name_en' => 'Saudi Council of Engineers Membership',
                'description_ar' => 'عضوية معتمدة من الهيئة السعودية للمهندسين لجميع المهندسين العاملين.',
                'description_en' => 'Accredited membership from the Saudi Council of Engineers.',
                'issuer_ar' => 'الهيئة السعودية للمهندسين',
                'issuer_en' => 'Saudi Council of Engineers',
                'order' => 3, 'is_active' => true,
            ],
        ];

        foreach ($certs as $c) {
            $slug = Str::slug($c['name_en']);
            $img = $this->generatePlaceholderImage("models/certifications/{$slug}.jpg", "cert-{$slug}");
            DB::table('certifications')->insert(array_merge($c, [
                'image' => $img,
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }
    }

    private function seedWhyUs(): void
    {
        DB::table('why_us_items')->truncate();
        $items = [
            [
                'icon' => 'experience',
                'title_ar' => '+25 سنة خبرة',
                'title_en' => '25+ Years Experience',
                'description_ar' => 'خبرة واسعة منذ عام 2006 في تنفيذ مشاريع هندسية متنوعة في جميع أنحاء المملكة.',
                'description_en' => 'Extensive experience since 2006 delivering diverse engineering projects across Saudi Arabia.',
                'order' => 1, 'is_active' => true,
            ],
            [
                'icon' => 'compliance',
                'title_ar' => 'امتثال كامل',
                'title_en' => 'Full Compliance',
                'description_ar' => 'التزام تام بالكود السعودي (SBC) ومعايير NFPA ومتطلبات الجهات الحكومية.',
                'description_en' => 'Full adherence to Saudi Building Code (SBC), NFPA standards, and government requirements.',
                'order' => 2, 'is_active' => true,
            ],
            [
                'icon' => 'quality',
                'title_ar' => 'معايير عالية',
                'title_en' => 'High Standards',
                'description_ar' => 'أعلى معايير الجودة مع اعتماد الدفاع المدني في جميع مراحل المشروع.',
                'description_en' => 'Highest quality standards with Civil Defense accreditation at every project stage.',
                'order' => 3, 'is_active' => true,
            ],
            [
                'icon' => 'team',
                'title_ar' => 'فريق متخصص',
                'title_en' => 'Specialized Team',
                'description_ar' => 'مهندسون معتمدون في جميع التخصصات الهندسية بما في ذلك الحماية من الحريق.',
                'description_en' => 'Certified engineers in all engineering disciplines including fire protection.',
                'order' => 4, 'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            DB::table('why_us_items')->insert(array_merge($item, [
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }
    }

    private function seedBlogPosts(): void
    {
        DB::table('blog_posts')->truncate();
        $posts = [
            [
                'slug' => 'importance-safety-engineering',
                'title_ar' => 'أهمية هندسة السلامة في المشاريع الصناعية',
                'title_en' => 'The Importance of Safety Engineering in Industrial Projects',
                'excerpt_ar' => 'تعرف على دور هندسة السلامة في حماية المنشآت الصناعية وتقليل المخاطر.',
                'excerpt_en' => 'Learn about the role of safety engineering in protecting industrial facilities and reducing risks.',
                'content_ar' => '<p>تعتبر هندسة السلامة من أهم الجوانب في تصميم وتنفيذ المشاريع الصناعية. تشمل هذه الهندسة تصميم أنظمة الإنذار والإطفاء وتقييم المخاطر ووضع خطط الطوارئ.</p><p>في المملكة العربية السعودية، تشترط الجهات المعنية مثل الدفاع المدني وهيئة المدن الصناعية توفير أنظمة سلامة متكاملة في جميع المنشآت الصناعية.</p>',
                'content_en' => '<p>Safety engineering is one of the most critical aspects in the design and implementation of industrial projects. It encompasses the design of alarm and fire suppression systems, risk assessment, and emergency planning.</p><p>In Saudi Arabia, authorities such as Civil Defense and MODON require integrated safety systems in all industrial facilities.</p>',
                'category' => 'Fire Safety',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'slug' => 'modon-requirements-guide',
                'title_ar' => 'دليل اشتراطات مدن للمصانع الجديدة',
                'title_en' => 'MODON Requirements Guide for New Factories',
                'excerpt_ar' => 'كل ما تحتاج معرفته عن اشتراطات الهيئة السعودية للمدن الصناعية.',
                'excerpt_en' => 'Everything you need to know about MODON requirements for new industrial facilities.',
                'content_ar' => '<p>تضع الهيئة السعودية للمدن الصناعية ومناطق التقنية (مدن) اشتراطات محددة للمصانع الجديدة تشمل التصميم المعماري والإنشائي وأنظمة السلامة.</p>',
                'content_en' => '<p>The Saudi Authority for Industrial Cities and Technology Zones (MODON) sets specific requirements for new factories covering architectural and structural design and safety systems.</p>',
                'category' => 'Engineering Insights',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'slug' => 'fire-protection-sbc',
                'title_ar' => 'أنظمة الحماية من الحريق وفق الكود السعودي',
                'title_en' => 'Fire Protection Systems Under Saudi Building Code',
                'excerpt_ar' => 'نظرة على متطلبات الكود السعودي لأنظمة الحماية من الحريق.',
                'excerpt_en' => 'An overview of SBC requirements for fire protection systems.',
                'content_ar' => '<p>يحدد الكود السعودي (SBC) متطلبات صارمة لأنظمة الحماية من الحريق في جميع أنواع المباني.</p>',
                'content_en' => '<p>The Saudi Building Code (SBC) sets stringent requirements for fire protection systems in all building types.</p>',
                'category' => 'Industry News',
                'is_published' => true,
                'published_at' => now(),
            ],
        ];

        foreach ($posts as $p) {
            $img = $this->generatePlaceholderImage("models/blog-posts/{$p['slug']}.jpg", "blog-{$p['slug']}");
            DB::table('blog_posts')->insert(array_merge($p, [
                'image' => $img,
                'author_id' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }
    }

    private function seedHero(): void
    {
        DB::table('hero_sections')->truncate();
        $arImg = $this->generatePlaceholderImage('models/hero/ar.jpg', 'hero-ar', 1920, 800);
        $enImg = $this->generatePlaceholderImage('models/hero/en.jpg', 'hero-en', 1920, 800);

        DB::table('hero_sections')->insert([
            [
                'lang' => 'ar',
                'title' => 'من التصميم إلى التسليم',
                'subtitle' => 'الميثاق العربي للاستشارات الهندسية',
                'description' => 'استشارات هندسية شاملة وهندسة سلامة والوقاية من الحريق في جميع أنحاء المملكة العربية السعودية — نقدم التميز منذ 2006.',
                'stat1_number' => '+25', 'stat1_label' => 'سنة خبرة',
                'stat2_number' => '+2500', 'stat2_label' => 'مشروع منجز',
                'stat3_number' => '+200', 'stat3_label' => 'عميل',
                'stat4_number' => '2006', 'stat4_label' => 'تأسسنا',
                'image' => $arImg,
                'cta1_text' => 'تعرف على خدماتنا',
                'cta1_link' => '/ar/services',
                'cta2_text' => 'تواصل معنا',
                'cta2_link' => '/ar/contact',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'lang' => 'en',
                'title' => 'From Plan to Possession',
                'subtitle' => 'Arabian Covenant Engineering Consultants',
                'description' => 'Comprehensive engineering consultancy, fire protection, and safety engineering across Saudi Arabia — delivering excellence since 2006.',
                'stat1_number' => '25+', 'stat1_label' => 'Years Experience',
                'stat2_number' => '2500+', 'stat2_label' => 'Projects Completed',
                'stat3_number' => '200+', 'stat3_label' => 'Clients',
                'stat4_number' => '2006', 'stat4_label' => 'Established',
                'image' => $enImg,
                'cta1_text' => 'Explore Services',
                'cta1_link' => '/en/services',
                'cta2_text' => 'Contact Us',
                'cta2_link' => '/en/contact',
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }
}
