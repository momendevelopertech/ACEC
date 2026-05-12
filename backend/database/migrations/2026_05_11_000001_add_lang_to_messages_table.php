<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('messages', 'lang')) {
            Schema::table('messages', function (Blueprint $table) {
                $table->string('lang', 2)->default('ar')->after('service_type');
                $table->index('is_read');
                $table->index('created_at');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('messages', 'lang')) {
            Schema::table('messages', function (Blueprint $table) {
                $table->dropColumn('lang');
                $table->dropIndex(['is_read']);
                $table->dropIndex(['created_at']);
            });
        }
    }
};
