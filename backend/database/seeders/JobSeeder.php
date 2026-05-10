<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('job_postings')->truncate();

        $jobs = [
            [
                'title_ar' => 'مهندس مدني أول',
                'title_en' => 'Senior Civil Engineer',
                'description_ar' => 'نبحث عن مهندس مدني ذو خبرة لا تقل عن 8 سنوات في مجال التصميم والإشراف على المشاريع الإنشائية.',
                'description_en' => 'We are looking for a civil engineer with at least 8 years of experience in design and supervision of construction projects.',
                'requirements_ar' => 'بكالوريوس هندسة مدنية، خبرة 8+ سنوات، إتقان AutoCAD وRevit، عضوية الهيئة السعودية للمهندسين.',
                'requirements_en' => 'Bachelor in Civil Engineering, 8+ years experience, proficiency in AutoCAD and Revit, SCE membership.',
                'location_ar' => 'الرياض، السعودية',
                'location_en' => 'Riyadh, Saudi Arabia',
                'type' => 'full-time',
                'is_active' => true,
            ],
            [
                'title_ar' => 'مهندس سلامة',
                'title_en' => 'Safety Engineer',
                'description_ar' => 'مطلوب مهندس سلامة متخصص في تصميم أنظمة الحماية من الحريق والسلامة الصناعية.',
                'description_en' => 'Safety engineer specialized in fire protection and industrial safety systems design required.',
                'requirements_ar' => 'بكالوريوس هندسة، خبرة 5+ سنوات في هندسة السلامة، معرفة بأنظمة NFPA وSBC.',
                'requirements_en' => 'Engineering degree, 5+ years in safety engineering, knowledge of NFPA and SBC systems.',
                'location_ar' => 'الرياض، السعودية',
                'location_en' => 'Riyadh, Saudi Arabia',
                'type' => 'full-time',
                'is_active' => true,
            ],
            [
                'title_ar' => 'مصمم داخلي',
                'title_en' => 'Interior Designer',
                'description_ar' => 'نبحث عن مصمم داخلي مبدع لتصميم المساحات التجارية والسكنية.',
                'description_en' => 'We are looking for a creative interior designer to design commercial and residential spaces.',
                'requirements_ar' => 'بكالوريوس تصميم داخلي، خبرة 3+ سنوات، إتقان 3D Max أو SketchUp.',
                'requirements_en' => 'Interior Design degree, 3+ years experience, proficiency in 3D Max or SketchUp.',
                'location_ar' => 'جدة، السعودية',
                'location_en' => 'Jeddah, Saudi Arabia',
                'type' => 'full-time',
                'is_active' => true,
            ],
        ];

        foreach ($jobs as $job) {
            DB::table('job_postings')->insert(array_merge($job, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
