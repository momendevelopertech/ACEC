<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamMemberSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        DB::table('team_members')->truncate();

        $members = [
            [
                'name_ar' => 'م. ماجد الذييب',
                'name_en' => 'Eng. Majed Al-Thuaiyb',
                'position_ar' => 'المالك والمدير العام',
                'position_en' => 'Founder & General Manager',
                'bio_ar' => 'مؤسس المكتب ومالكه، يتمتع بخبرة واسعة في مجال الاستشارات الهندسية وهندسة السلامة. يقود فريقاً من المهندسين المتخصصين لتحقيق أعلى معايير الجودة والاحترافية في جميع المشاريع.',
                'bio_en' => 'Founder and owner of the firm with extensive experience in engineering consultancy and safety engineering. Leads a team of specialized engineers to achieve the highest standards of quality and professionalism across all projects.',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. عبد الله القحطاني',
                'name_en' => 'Eng. Abdullah Al-Qahtani',
                'position_ar' => 'مدير قسم التصميم',
                'position_en' => 'Design Department Manager',
                'bio_ar' => 'متخصص في التصميم المعماري والهندسي مع خبرة تزيد عن 15 عاماً في المشاريع السكنية والتجارية والصناعية.',
                'bio_en' => 'Specialized in architectural and engineering design with over 15 years of experience in residential, commercial, and industrial projects.',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name_ar' => 'م. فيصل الحربي',
                'name_en' => 'Eng. Faisal Al-Harbi',
                'position_ar' => 'مدير قسم السلامة والحماية من الحريق',
                'position_en' => 'Fire Protection & Safety Manager',
                'bio_ar' => 'خبير في أنظمة السلامة والحماية من الحريق ومعتمد من الدفاع المدني، مع خبرة في تطبيق الكود السعودي ومعايير NFPA.',
                'bio_en' => 'Expert in fire protection and safety systems, accredited by the Civil Defense, with experience in applying SBC and NFPA standards.',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            $slug = \Illuminate\Support\Str::slug($member['name_en']);
            $imagePath = $this->generatePlaceholderImage("models/team-members/{$slug}.svg", "team-{$slug}", 300, 300);
            DB::table('team_members')->insert(array_merge($member, [
                'image' => $imagePath,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
