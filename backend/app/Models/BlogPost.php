<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPost extends Model
{
    use \App\Traits\HasImageCleanup;

    protected array $imageFields = ['image'];

    protected $fillable = [
        'slug', 'title_ar', 'title_en',
        'excerpt_ar', 'excerpt_en', 'content_ar', 'content_en',
        'image', 'category', 'tags', 'author_id',
        'is_published', 'published_at',
        'meta_title_ar', 'meta_title_en', 'meta_desc_ar', 'meta_desc_en',
        'views',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
