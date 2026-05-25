<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Projects — commonly queried filters
        Schema::table('projects', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
            $table->index('category');
            $table->index('is_featured');
        });

        // Services
        Schema::table('services', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        // Blog posts
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->index(['is_published', 'published_at']);
        });

        // Team members
        Schema::table('team_members', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        // Clients
        Schema::table('clients', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        // Certifications
        Schema::table('certifications', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        // Job postings
        Schema::table('job_postings', function (Blueprint $table) {
            $table->index(['is_active']);
        });

        // Why us items
        Schema::table('why_us_items', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        // Hero sections
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->index('lang');
        });

        // Page views — commonly queried for stats
        Schema::table('page_views', function (Blueprint $table) {
            $table->index(['page', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
            $table->dropIndex(['category']);
            $table->dropIndex(['is_featured']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropIndex(['is_published', 'published_at']);
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('clients', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('job_postings', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
        });

        Schema::table('why_us_items', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropIndex(['lang']);
        });

        Schema::table('page_views', function (Blueprint $table) {
            $table->dropIndex(['page', 'created_at']);
        });
    }
};
