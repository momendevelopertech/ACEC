<?php

namespace Database\Seeders;

use App\Traits\GeneratesPlaceholderImages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificationSeeder extends Seeder
{
    use GeneratesPlaceholderImages;

    public function run(): void
    {
        DB::table('certifications')->truncate();

        $certs = [
            [
                'name_ar' => 'عضوية الهيئة السعودية للمهندسين',
                'name_en' => 'Saudi Council of Engineers Membership',
                'description_ar' => 'عضوية معتمدة من الهيئة السعودية للمهندسين لجميع المهندسين العاملين لدينا.',
                'description_en' => 'Accredited membership from the Saudi Council of Engineers for all our working engineers.',
                'issuer_ar' => 'الهيئة السعودية للمهندسين',
                'issuer_en' => 'Saudi Council of Engineers',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name_ar' => 'شهادة السلامة من الدفاع المدني',
                'name_en' => 'Civil Defense Safety Certificate',
                'description_ar' => 'شهادة معتمدة من المديرية العامة للدفاع المدني لتصميم أنظمة السلامة.',
                'description_en' => 'Accredited certificate from the General Directorate of Civil Defense for safety systems design.',
                'issuer_ar' => 'المديرية العامة للدفاع المدني',
                'issuer_en' => 'General Directorate of Civil Defense',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name_ar' => 'شهادة ISO 9001 للجودة',
                'name_en' => 'ISO 9001 Quality Certification',
                'description_ar' => 'نظام إدارة جودة معتمد وفقاً للمعايير الدولية.',
                'description_en' => 'Certified quality management system according to international standards.',
                'issuer_ar' => 'الهيئة الدولية للمعايير',
                'issuer_en' => 'International Organization for Standardization',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($certs as $cert) {
            $slug = \Illuminate\Support\Str::slug($cert['name_en']);
            $imagePath = $this->generatePlaceholderImage("models/certifications/{$slug}.jpg", "cert-{$slug}");
            DB::table('certifications')->insert(array_merge($cert, [
                'image' => $imagePath,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
