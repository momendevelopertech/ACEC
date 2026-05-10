<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogPostSeeder extends Seeder
{
    public function run(): void
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
                'content_en' => '<p>Safety engineering is one of the most important aspects in the design and implementation of industrial projects. It includes the design of alarm and fire suppression systems, risk assessment, and emergency planning.</p><p>In Saudi Arabia, relevant authorities such as Civil Defense and MODON require integrated safety systems in all industrial facilities.</p>',
                'category' => 'safety',
                'tags' => json_encode(['safety', 'industrial', 'compliance']),
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'slug' => 'modon-requirements-guide',
                'title_ar' => 'دليل اشتراطات مدن للمصانع الجديدة',
                'title_en' => 'MODON Requirements Guide for New Factories',
                'excerpt_ar' => 'كل ما تحتاج معرفته عن اشتراطات الهيئة السعودية للمدن الصناعية.',
                'excerpt_en' => 'Everything you need to know about Saudi Authority for Industrial Cities requirements.',
                'content_ar' => '<p>تضع الهيئة السعودية للمدن الصناعية ومناطق التقنية (مدن) مجموعة من الاشتراطات والمعايير التي يجب الالتزام بها عند تصميم وبناء المصانع الجديدة.</p><p>تشمل هذه الاشتراطات المخططات التنظيمية وأنظمة السلامة والتهوية والإضاءة الصناعية ومتطلبات الترخيص.</p>',
                'content_en' => '<p>The Saudi Authority for Industrial Cities and Technology Zones (MODON) sets a range of requirements and standards that must be complied with when designing and building new factories.</p><p>These requirements include layout plans, safety systems, ventilation, industrial lighting, and licensing requirements.</p>',
                'category' => 'compliance',
                'tags' => json_encode(['MODON', 'factory', 'compliance']),
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'slug' => 'future-engineering-saudi',
                'title_ar' => 'مستقبل الهندسة في رؤية 2030',
                'title_en' => 'The Future of Engineering in Vision 2030',
                'excerpt_ar' => 'كيف تساهم الهندسة في تحقيق أهداف رؤية المملكة 2030.',
                'excerpt_en' => 'How engineering contributes to achieving Saudi Vision 2030 goals.',
                'content_ar' => '<p>تعد الهندسة ركيزة أساسية في تحقيق أهداف رؤية المملكة العربية السعودية 2030. من خلال المشاريع الكبرى والتطوير العمراني والصناعي، يلعب المهندسون دوراً محورياً في بناء مستقبل أفضل.</p>',
                'content_en' => '<p>Engineering is a fundamental pillar in achieving the goals of Saudi Vision 2030. Through major projects and urban and industrial development, engineers play a pivotal role in building a better future.</p>',
                'category' => 'general',
                'tags' => json_encode(['vision2030', 'future', 'engineering']),
                'is_published' => true,
                'published_at' => now(),
            ],
        ];

        foreach ($posts as $post) {
            DB::table('blog_posts')->insert(array_merge($post, [
                'meta_title_ar' => $post['title_ar'] . ' | مدونة الميثاق العربي',
                'meta_title_en' => $post['title_en'] . ' | ACEC Blog',
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
