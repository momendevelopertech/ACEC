<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'icon', 'title_ar', 'title_en',
        'description_ar', 'description_en', 'content_ar', 'content_en',
        'image', 'is_featured', 'order', 'is_active',
        'meta_title_ar', 'meta_title_en', 'meta_desc_ar', 'meta_desc_en',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
