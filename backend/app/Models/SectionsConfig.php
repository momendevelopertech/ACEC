<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionsConfig extends Model
{
    protected $fillable = [
        'section_key', 'name_ar', 'name_en',
        'is_visible', 'order', 'custom_settings',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'order' => 'integer',
        'custom_settings' => 'array',
    ];

    protected $table = 'sections_config';
}
