<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $fillable = [
        'name', 'name_ar', 'slug', 'is_active',
        'colors', 'typography', 'layout',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'colors' => 'array',
        'typography' => 'array',
        'layout' => 'array',
    ];
}
