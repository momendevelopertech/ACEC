<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'lang', 'title', 'subtitle', 'description',
        'stat1_number', 'stat1_label', 'stat2_number', 'stat2_label',
        'stat3_number', 'stat3_label', 'stat4_number', 'stat4_label',
        'cta1_text', 'cta1_link', 'cta2_text', 'cta2_link', 'image',
    ];
}
