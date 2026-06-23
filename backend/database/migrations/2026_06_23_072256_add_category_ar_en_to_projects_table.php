<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('category_ar')->nullable()->after('category');
            $table->string('category_en')->nullable()->after('category_ar');
        });

        DB::table('projects')->whereNotNull('category')->update([
            'category_ar' => DB::raw('category'),
            'category_en' => DB::raw('category'),
        ]);
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['category_ar', 'category_en']);
        });
    }
};
