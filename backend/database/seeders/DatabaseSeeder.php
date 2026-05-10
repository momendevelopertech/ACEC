<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ThemeSeeder::class,
            ServiceSeeder::class,
            SettingsSeeder::class,
            HeroSeeder::class,
            WhyUsSeeder::class,
            ProjectSeeder::class,
            TeamMemberSeeder::class,
            BlogPostSeeder::class,
            CertificationSeeder::class,
            JobSeeder::class,
        ]);
    }
}
