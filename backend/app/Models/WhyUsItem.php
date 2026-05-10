<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhyUsItem extends Model
{
    protected $fillable = [
        'icon', 'title_ar', 'title_en',
        'description_ar', 'description_en',
        'order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
