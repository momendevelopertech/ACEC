<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AcecDatabaseSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Admin User
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@ac-ec.com.sa'],
            [
                'name' => 'Admin ACEC',
                'password' => bcrypt('password123'),
                'role' => 'admin',
                'email_verified_at' => now(),
                'avatar' => $this->generatePlaceholderImage('models/users/admin-avatar.jpg', 'admin-avatar', 200, 200),
            ]
        );

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
            DB::table('settings')->updateOrInsert(
                ['key' => $setting['key']],
                array_merge($setting, ['updated_at' => now()])
            );
        }

        // 3. Themes
        $themes = [
            [
                'name' => 'Dark Professional',
                'name_ar' => 'الاحترافي الداكن',
                'slug' => 'dark-professional',
                'is_active' => true,
                'colors' => json_encode([
                    'bg_primary'     => '#0D1B2A',
                    'bg_secondary'   => '#162234',
                    'bg_card'        => '#162234',
                    'bg_section_alt' => '#111E2C',
                    'text_primary'   => '#F0F4F8',
                    'text_dark'      => '#0D1B2A',
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
                ]),
                'typography' => json_encode(['font_ar' => 'Tajawal, Cairo, Arial, sans-serif', 'font_en' => 'Inter, system-ui, Arial, sans-serif']),
                'layout' => json_encode(['border_radius' => 'md']),
            ],
            [
                'name' => 'Classic Blue',
                'name_ar' => 'الأزرق الكلاسيكي',
                'slug' => 'classic-blue',
                'is_active' => false,
                'colors' => json_encode([
                    'bg_primary'     => '#0F1F3D',
                    'bg_secondary'   => '#1A2F55',
                    'bg_card'        => '#1A2F55',
                    'bg_section_alt' => '#142744',
                    'text_primary'   => '#EEF2FF',
                    'text_dark'      => '#0F1F3D',
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
                ]),
                'typography' => json_encode(['font_ar' => 'Tajawal, Cairo, Arial, sans-serif', 'font_en' => 'Inter, system-ui, Arial, sans-serif']),
                'layout' => json_encode(['border_radius' => 'md']),
            ],
            [
                'name' => 'Modern Green',
                'name_ar' => 'الأخضر الحديث',
                'slug' => 'modern-green',
                'is_active' => false,
                'colors' => json_encode([
                    'bg_primary'     => '#0A1A14',
                    'bg_secondary'   => '#122A1F',
                    'bg_card'        => '#122A1F',
                    'bg_section_alt' => '#0D2118',
                    'text_primary'   => '#ECFDF5',
                    'text_dark'      => '#0A1A14',
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
                ]),
                'typography' => json_encode(['font_ar' => 'Tajawal, Cairo, Arial, sans-serif', 'font_en' => 'Inter, system-ui, Arial, sans-serif']),
                'layout' => json_encode(['border_radius' => 'lg']),
            ],
        ];

        foreach ($themes as $theme) {
            DB::table('themes')->updateOrInsert(
                ['slug' => $theme['slug']],
                array_merge($theme, ['updated_at' => now()])
            );
        }

        // 4. Hero Section
        foreach (['en', 'ar'] as $lang) {
            DB::table('hero_sections')->updateOrInsert(
                ['lang' => $lang],
                [
                    'title' => $lang === 'en' ? 'Building the Future with Exceptional Engineering' : 'نبني المستقبل بهندسة استثنائية',
                    'subtitle' => $lang === 'en' ? 'Excellence in Engineering & Safety' : 'التميز في الهندسة والسلامة',
                    'description' => $lang === 'en' ? 'Delivering innovative and sustainable engineering solutions with the highest standards of quality and safety.' : 'نقدم حلولاً هندسية مبتكرة ومستدامة بأعلى معايير الجودة والسلامة.',
                    'stat1_number' => $lang === 'en' ? '50+' : '+50', 'stat1_label' => $lang === 'en' ? 'Projects' : 'مشروع',
                    'stat2_number' => $lang === 'en' ? '15+' : '+15', 'stat2_label' => $lang === 'en' ? 'Years' : 'سنة خبرة',
                    'stat3_number' => $lang === 'en' ? '30+' : '+30', 'stat3_label' => $lang === 'en' ? 'Clients' : 'عميل',
                    'stat4_number' => $lang === 'en' ? '100%' : '%100', 'stat4_label' => $lang === 'en' ? 'Commitment' : 'التزام',
                    'image' => $this->generatePlaceholderImage("models/hero/{$lang}.jpg", "hero-{$lang}", 1920, 800),
                    'cta1_text' => $lang === 'en' ? 'Book Consultation' : 'احجز استشارة', 'cta1_link' => '/contact',
                    'cta2_text' => $lang === 'en' ? 'Our Projects' : 'مشاريعنا', 'cta2_link' => '/projects',
                    'updated_at' => now(),
                ]
            );
        }

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
            $slug = $s['slug'];
            $imagePath = $this->generatePlaceholderImage("models/services/{$slug}.jpg", "service-{$slug}");
            DB::table('services')->updateOrInsert(
                ['slug' => $s['slug']],
                [
                    'icon' => $s['icon'],
                    'title_ar' => $s['title_ar'],
                    'title_en' => $s['title_en'],
                    'description_ar' => $s['desc_ar'],
                    'description_en' => $s['desc_en'],
                    'image' => $imagePath,
                    'order' => $i,
                    'updated_at' => now(),
                ]
            );
        }

        // 6. Clients
        $clients = ['Dr. Sulaiman Al Habib', 'McDonald\'s', 'PepsiCo', 'STC', 'Leejam', 'Deemah', 'SRMG', 'Amlak', 'Flyadeal', 'Floward', 'Gulf Aluminum', 'SME Marketplace', 'Hataba'];
        foreach($clients as $i => $c) {
            $slug = \Illuminate\Support\Str::slug($c);
            $logoPath = $this->generatePlaceholderImage("models/clients/{$slug}.jpg", "client-{$slug}");
            DB::table('clients')->updateOrInsert(
                ['name_en' => $c],
                ['name_ar' => $c, 'logo' => $logoPath, 'order' => $i, 'updated_at' => now()]
            );
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
            DB::table('sections_config')->updateOrInsert(
                ['section_key' => $s['key']],
                ['name_en' => $s['name_en'], 'name_ar' => $s['name_ar'], 'order' => $i, 'is_visible' => true, 'updated_at' => now()]
            );
        }
    }
}
