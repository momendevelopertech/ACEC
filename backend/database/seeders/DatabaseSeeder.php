<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AcecDatabaseSeeder::class,
            SettingsSeeder::class,
            ThemeSeeder::class,
            HeroSeeder::class,
            WhyUsSeeder::class,
            ServiceSeeder::class,
            ProjectSeeder::class,
            TeamMemberSeeder::class,
            CertificationSeeder::class,
            JobSeeder::class,
            BlogPostSeeder::class,
        ]);
    }
}
