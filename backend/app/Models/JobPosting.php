<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'title_ar', 'title_en', 'description_ar', 'description_en',
        'requirements_ar', 'requirements_en',
        'location_ar', 'location_en', 'type', 'salary_range',
        'is_active', 'expires_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'expires_at' => 'datetime',
    ];
}
