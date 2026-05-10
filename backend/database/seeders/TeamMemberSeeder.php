<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('team_members')->truncate();

        $members = [
            [
                'name_ar' => 'م. أحمد الخالدي',
                'name_en' => 'Eng. Ahmed Al-Khaldi',
                'position_ar' => 'المدير العام',
                'position_en' => 'General Manager',
                'bio_ar' => 'خبرة تزيد عن 20 عاماً في مجال الاستشارات الهندسية وإدارة المشاريع الكبرى في المملكة العربية السعودية.',
                'bio_en' => 'Over 20 years of experience in engineering consulting and major project management in Saudi Arabia.',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. محمد العتيبي',
                'name_en' => 'Eng. Mohammed Al-Otaibi',
                'position_ar' => 'مدير قسم السلامة',
                'position_en' => 'Safety Department Manager',
                'bio_ar' => 'متخصص في هندسة السلامة وأنظمة الحماية من الحريق مع خبرة واسعة في اشتراطات الدفاع المدني.',
                'bio_en' => 'Specialized in safety engineering and fire protection systems with extensive experience in civil defense requirements.',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. سارة الشمري',
                'name_en' => 'Eng. Sarah Al-Shamari',
                'position_ar' => 'مديرة التصميم الداخلي',
                'position_en' => 'Interior Design Manager',
                'bio_ar' => 'مصممة داخلية متخصصة تجمع بين الجماليات العصرية والوظيفية العملية في مختلف المشاريع.',
                'bio_en' => 'Specialized interior designer combining modern aesthetics with practical functionality across various projects.',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. خالد الدوسري',
                'name_en' => 'Eng. Khaled Al-Dosari',
                'position_ar' => 'رئيس قسم الإشراف',
                'position_en' => 'Head of Supervision',
                'bio_ar' => 'مهندس مشرف معتمد بخبرة تزيد عن 15 عاماً في إشراف المشاريع الحكومية والخاصة.',
                'bio_en' => 'Certified supervising engineer with over 15 years of experience supervising government and private projects.',
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            DB::table('team_members')->insert(array_merge($member, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
