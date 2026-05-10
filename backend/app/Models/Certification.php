<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name_ar', 'name_en', 'description_ar', 'description_en',
        'image', 'issuer_ar', 'issuer_en',
        'issue_date', 'expiry_date', 'order', 'is_active',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
