<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name_ar', 'name_en', 'position_ar', 'position_en',
        'bio_ar', 'bio_en', 'image', 'email', 'linkedin',
        'order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
