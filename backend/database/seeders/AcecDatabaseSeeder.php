<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AcecDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Admin User
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@ac-ec.com.sa',
            'password' => Hash::make('ACEC@2024Admin'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Settings
        $settings = [
            ['key' => 'site_name_ar', 'value' => 'مكتب الميثاق العربي للاستشارات الهندسية', 'group' => 'general'],
            ['key' => 'site_name_en', 'value' => 'Arab Charter Engineering Consultants - ACEC', 'group' => 'general'],
            ['key' => 'address_ar', 'value' => 'شارع عمر بن عبدالعزيز، حي الزهراء، الرياض، المملكة العربية السعودية', 'group' => 'contact'],
            ['key' => 'address_en', 'value' => 'Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia', 'group' => 'contact'],
            ['key' => 'phone', 'value' => '+966 500 037 049', 'group' => 'contact'],
            ['key' => 'whatsapp', 'value' => '+966 500 037 049', 'group' => 'contact'],
            ['key' => 'email', 'value' => 'info@ac-ec.com.sa', 'group' => 'contact'],
            ['key' => 'working_hours_ar', 'value' => 'الأحد - الخميس، 9:00 صباحاً - 6:00 مساءً', 'group' => 'contact'],
            ['key' => 'working_hours_en', 'value' => 'Sunday to Thursday, 9:00 AM - 6:00 PM', 'group' => 'contact'],
        ];
        
        foreach($settings as $setting) {
            DB::table('settings')->insert(array_merge($setting, ['created_at' => now(), 'updated_at' => now()]));
        }

        // 3. Themes
        DB::table('themes')->insert([
            [
                'name' => 'Classic Blue',
                'name_ar' => 'الأزرق الكلاسيكي',
                'slug' => 'classic-blue',
                'is_active' => true,
                'colors' => json_encode(['primary' => '#1a3c5e', 'secondary' => '#c9a84c', 'background' => '#ffffff', 'text' => '#1a1a2e', 'accent' => '#f0f4f8']),
                'typography' => json_encode(['font_ar' => 'Cairo', 'font_en' => 'Inter']),
                'layout' => json_encode(['border_radius' => 'md']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dark Professional',
                'name_ar' => 'الاحترافي الداكن',
                'slug' => 'dark-professional',
                'is_active' => false,
                'colors' => json_encode(['primary' => '#1a1a2e', 'secondary' => '#c9a84c', 'background' => '#121212', 'text' => '#f0f4f8', 'accent' => '#1a3c5e']),
                'typography' => json_encode(['font_ar' => 'Cairo', 'font_en' => 'Inter']),
                'layout' => json_encode(['border_radius' => 'sm']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Modern Green',
                'name_ar' => 'الأخضر الحديث',
                'slug' => 'modern-green',
                'is_active' => false,
                'colors' => json_encode(['primary' => '#2e7d32', 'secondary' => '#c9a84c', 'background' => '#f9fbf9', 'text' => '#1b2a1c', 'accent' => '#e8f5e9']),
                'typography' => json_encode(['font_ar' => 'Tajawal', 'font_en' => 'Poppins']),
                'layout' => json_encode(['border_radius' => 'lg']),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 4. Hero Section
        DB::table('hero_sections')->insert([
            [
                'lang' => 'en',
                'title' => 'Building the Future with Exceptional Engineering',
                'subtitle' => 'Excellence in Engineering & Safety',
                'description' => 'Delivering innovative and sustainable engineering solutions with the highest standards of quality and safety.',
                'stat1_number' => '50+', 'stat1_label' => 'Projects',
                'stat2_number' => '15+', 'stat2_label' => 'Years',
                'stat3_number' => '30+', 'stat3_label' => 'Clients',
                'stat4_number' => '100%', 'stat4_label' => 'Commitment',
                'cta1_text' => 'Book Consultation', 'cta1_link' => '/contact',
                'cta2_text' => 'Our Projects', 'cta2_link' => '/projects',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'lang' => 'ar',
                'title' => 'نبني المستقبل بهندسة استثنائية',
                'subtitle' => 'التميز في الهندسة والسلامة',
                'description' => 'نقدم حلولاً هندسية مبتكرة ومستدامة بأعلى معايير الجودة والسلامة.',
                'stat1_number' => '+50', 'stat1_label' => 'مشروع',
                'stat2_number' => '+15', 'stat2_label' => 'سنة خبرة',
                'stat3_number' => '+30', 'stat3_label' => 'عميل',
                'stat4_number' => '%100', 'stat4_label' => 'التزام',
                'cta1_text' => 'احجز استشارة', 'cta1_link' => '/contact',
                'cta2_text' => 'مشاريعنا', 'cta2_link' => '/projects',
                'created_at' => now(), 'updated_at' => now(),
            ]
        ]);

        // 5. Services
        $services = [
            ['slug' => 'consulting', 'icon' => 'Building2', 'title_ar' => 'استشارات هندسية', 'title_en' => 'Engineering Consulting', 'desc_ar' => 'استشارات هندسية متكاملة لضمان نجاح مشروعك.', 'desc_en' => 'Comprehensive engineering consulting to ensure project success.'],
            ['slug' => 'safety', 'icon' => 'ShieldAlert', 'title_ar' => 'هندسة السلامة', 'title_en' => 'Safety Engineering', 'desc_ar' => 'تصميم واعتماد أنظمة السلامة والوقاية من الحريق.', 'desc_en' => 'Design and approval of fire safety and prevention systems.'],
            ['slug' => 'supervision', 'icon' => 'Eye', 'title_ar' => 'إشراف هندسي', 'title_en' => 'Engineering Supervision', 'desc_ar' => 'إشراف دقيق لضمان تنفيذ المشاريع بأعلى المعايير.', 'desc_en' => 'Precise supervision to ensure project execution at highest standards.'],
            ['slug' => 'interior', 'icon' => 'Paintbrush', 'title_ar' => 'تصميم داخلي', 'title_en' => 'Interior Design', 'desc_ar' => 'تصاميم داخلية مبتكرة تجمع بين الجمال والوظيفة.', 'desc_en' => 'Innovative interior designs combining beauty and function.'],
            ['slug' => 'factory', 'icon' => 'Factory', 'title_ar' => 'تصميم مصانع', 'title_en' => 'Factory Design', 'desc_ar' => 'تصميم المنشآت الصناعية وفق أحدث المعايير.', 'desc_en' => 'Industrial facility design according to latest standards.'],
            ['slug' => 'modon', 'icon' => 'CheckCircle', 'title_ar' => 'امتثال مدن', 'title_en' => 'MODON Compliance', 'desc_ar' => 'استخراج التراخيص والاعتمادات اللازمة من مدن.', 'desc_en' => 'Obtaining required licenses and approvals from MODON.']
        ];
        
        foreach($services as $i => $s) {
            DB::table('services')->insert([
                'slug' => $s['slug'],
                'icon' => $s['icon'],
                'title_ar' => $s['title_ar'],
                'title_en' => $s['title_en'],
                'description_ar' => $s['desc_ar'],
                'description_en' => $s['desc_en'],
                'order' => $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 6. Clients
        $clients = ['Dr. Sulaiman Al Habib', 'McDonald\'s', 'PepsiCo', 'STC', 'Leejam', 'Deemah', 'SRMG', 'Amlak', 'Flyadeal', 'Floward', 'Gulf Aluminum', 'SME Marketplace', 'Hataba'];
        foreach($clients as $i => $c) {
            DB::table('clients')->insert([
                'name_ar' => $c,
                'name_en' => $c,
                'order' => $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
        // 7. Sections Config
        $sections = [
            ['key' => 'hero', 'name_en' => 'Hero Section', 'name_ar' => 'القسم الرئيسي'],
            ['key' => 'stats', 'name_en' => 'Statistics', 'name_ar' => 'الإحصائيات'],
            ['key' => 'services', 'name_en' => 'Services', 'name_ar' => 'الخدمات'],
            ['key' => 'projects', 'name_en' => 'Projects', 'name_ar' => 'المشاريع'],
            ['key' => 'about', 'name_en' => 'About Us', 'name_ar' => 'من نحن'],
            ['key' => 'why_us', 'name_en' => 'Why Us', 'name_ar' => 'لماذا نحن'],
            ['key' => 'clients', 'name_en' => 'Clients', 'name_ar' => 'العملاء'],
            ['key' => 'cta', 'name_en' => 'Call to Action', 'name_ar' => 'دعوة للتواصل'],
        ];
        
        foreach($sections as $i => $s) {
            DB::table('sections_config')->insert([
                'section_key' => $s['key'],
                'name_en' => $s['name_en'],
                'name_ar' => $s['name_ar'],
                'order' => $i,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
