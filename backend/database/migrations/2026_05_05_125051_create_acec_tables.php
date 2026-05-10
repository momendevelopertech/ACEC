<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->nullable();
            $table->string('type')->default('text');
            $table->timestamps();
        });

        // 2. Themes
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(false);
            $table->json('colors')->nullable();
            $table->json('typography')->nullable();
            $table->json('layout')->nullable();
            $table->timestamps();
        });

        // 3. Services
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->longText('content_ar')->nullable();
            $table->longText('content_en')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->text('meta_desc_ar')->nullable();
            $table->text('meta_desc_en')->nullable();
            $table->timestamps();
        });

        // 4. Projects
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->longText('content_ar')->nullable();
            $table->longText('content_en')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->string('category')->nullable();
            $table->string('location_ar')->nullable();
            $table->string('location_en')->nullable();
            $table->string('client_ar')->nullable();
            $table->string('client_en')->nullable();
            $table->integer('year')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->timestamps();
        });

        // 5. Team Members
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('position_ar')->nullable();
            $table->string('position_en')->nullable();
            $table->text('bio_ar')->nullable();
            $table->text('bio_en')->nullable();
            $table->string('image')->nullable();
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. Clients
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('logo')->nullable();
            $table->string('website')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Blog Posts
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('excerpt_ar')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->longText('content_ar')->nullable();
            $table->longText('content_en')->nullable();
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->text('meta_desc_ar')->nullable();
            $table->text('meta_desc_en')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();
        });

        // 8. Certifications
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->string('image')->nullable();
            $table->string('issuer_ar')->nullable();
            $table->string('issuer_en')->nullable();
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 9. Jobs
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->text('requirements_ar')->nullable();
            $table->text('requirements_en')->nullable();
            $table->string('location_ar')->nullable();
            $table->string('location_en')->nullable();
            $table->string('type')->nullable();
            $table->string('salary_range')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        // 10. Messages
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('service_type')->nullable();
            $table->boolean('is_read')->default(false);
            $table->boolean('is_replied')->default(false);
            $table->text('reply_text')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
        });

        // 11. Page Views
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->string('lang')->nullable();
            $table->string('ip_hash')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });

        // 12. Hero Sections
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('lang');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('stat1_number')->nullable();
            $table->string('stat1_label')->nullable();
            $table->string('stat2_number')->nullable();
            $table->string('stat2_label')->nullable();
            $table->string('stat3_number')->nullable();
            $table->string('stat3_label')->nullable();
            $table->string('stat4_number')->nullable();
            $table->string('stat4_label')->nullable();
            $table->string('cta1_text')->nullable();
            $table->string('cta1_link')->nullable();
            $table->string('cta2_text')->nullable();
            $table->string('cta2_link')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // 13. Why Us
        Schema::create('why_us_items', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->nullable();
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 14. Sections Config
        Schema::create('sections_config', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->integer('order')->default(0);
            $table->json('custom_settings')->nullable();
            $table->timestamps();
        });
        
        // Ensure Users table has role and avatar
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role')->default('user')->after('password');
                $table->string('avatar')->nullable()->after('role');
                $table->timestamp('last_login_at')->nullable()->after('remember_token');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections_config');
        Schema::dropIfExists('why_us_items');
        Schema::dropIfExists('hero_sections');
        Schema::dropIfExists('page_views');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('job_postings');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('services');
        Schema::dropIfExists('themes');
        Schema::dropIfExists('settings');
        
        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn(['role', 'avatar', 'last_login_at']);
            });
        }
    }
};
