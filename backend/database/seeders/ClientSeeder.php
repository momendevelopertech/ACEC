<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['file' => 'aj - asudi.jpg',              'en' => 'Aj Asudi',              'ar' => 'عاج السودي'],
            ['file' => 'al forsan.jpg',               'en' => 'Al Forsan',             'ar' => 'آل فرسان'],
            ['file' => 'alfaisal.jpg',                'en' => 'Alfaisal',              'ar' => 'الفيصل'],
            ['file' => 'alfanar.jpg',                 'en' => 'Alfanar',               'ar' => 'الفنار'],
            ['file' => 'Americana_Group.jpg',         'en' => 'Americana Group',       'ar' => 'مجموعة أمريكانا'],
            ['file' => 'amlak.jpg',                   'en' => 'Amlak',                 'ar' => 'أملاك'],
            ['file' => 'deemah.jpg',                  'en' => 'Deemah',                'ar' => 'ديمة'],
            ['file' => 'diriyah.jpg',                 'en' => 'Diriyah',               'ar' => 'الدرعية'],
            ['file' => 'downtown.png',                'en' => 'Downtown',              'ar' => 'داون تاون'],
            ['file' => 'flyadeal.jpg',                'en' => 'Flyadeal',              'ar' => 'فلاي أديل'],
            ['file' => 'hardees.jpg',                 'en' => "Hardee's",              'ar' => 'هارديز'],
            ['file' => 'hataba.jpg',                  'en' => 'Hataba',                'ar' => 'حتابة'],
            ['file' => 'KFC.jpg',                     'en' => 'KFC',                   'ar' => 'كنتاكي'],
            ['file' => 'Khatib And Alami.png',        'en' => 'Khatib And Alami',      'ar' => 'خطيب وعلمي'],
            ['file' => 'king saud.jpg',               'en' => 'King Saud University',  'ar' => 'جامعة الملك سعود'],
            ['file' => 'kudu.jpg',                    'en' => 'Kudu',                  'ar' => 'كودو'],
            ['file' => 'leejam.jpg',                  'en' => 'Leejam',                'ar' => 'ليجام'],
            ['file' => "McDonald's.jpg",              'en' => "McDonald's",            'ar' => 'ماكدونالدز'],
            ['file' => 'mechinal.jpg',                'en' => 'Mechinal',              'ar' => 'ميكانيكال'],
            ['file' => 'PepsiCo.jpg',                 'en' => 'PepsiCo',               'ar' => 'بيبسيكو'],
            ['file' => 'riyadh chamber.jpg',          'en' => 'Riyadh Chamber',        'ar' => 'غرفة الرياض'],
            ['file' => 'roshn.jpg',                   'en' => 'Roshn',                 'ar' => 'روشن'],
            ['file' => 'sabil.jpg',                   'en' => 'Sabil',                 'ar' => 'سبيل'],
            ['file' => 'Saudi_Electric_Company.jpg',  'en' => 'Saudi Electric Company','ar' => 'الشركة السعودية للكهرباء'],
            ['file' => 'srmg.jpg',                    'en' => 'SRMG',                  'ar' => 'مجموعة SRMG الإعلامية'],
            ['file' => 'stc.jpg',                     'en' => 'STC',                   'ar' => 'الاتصالات السعودية'],
            ['file' => 'sulaiman.jpg',                'en' => 'Sulaiman Al Habib',     'ar' => 'سليمان الحبيب'],
        ];

        $diskPath = storage_path('app/public/models/clients');

        foreach ($clients as $i => $client) {
            $imagePath = "models/clients/{$client['file']}";
            $fullPath = "{$diskPath}/{$client['file']}";

            if (!file_exists($fullPath)) {
                $this->command->warn("Image not found: {$client['file']} — skipping");
                continue;
            }

            DB::table('clients')->updateOrInsert(
                ['name_en' => $client['en']],
                [
                    'name_ar'   => $client['ar'],
                    'logo'      => $imagePath,
                    'website'   => null,
                    'order'     => $i,
                    'is_active' => true,
                    'updated_at' => now(),
                ]
            );
        }

        $this->command->info('Clients seeded successfully.');
    }
}
