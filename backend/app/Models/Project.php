<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use \App\Traits\HasImageCleanup;

    protected array $imageFields = ['image'];
    protected array $imageArrayFields = ['gallery'];

    protected $fillable = [
        'slug', 'title_ar', 'title_en',
        'description_ar', 'description_en', 'content_ar', 'content_en',
        'image', 'gallery', 'category',
        'location_ar', 'location_en', 'client_ar', 'client_en',
        'year', 'is_featured', 'order', 'is_active',
        'meta_title_ar', 'meta_title_en',
    ];

    protected $casts = [
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
        'year' => 'integer',
    ];
}
