<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use \App\Traits\HasImageCleanup;

    protected array $imageFields = ['logo'];

    protected $fillable = [
        'name_ar', 'name_en', 'logo', 'website',
        'order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
