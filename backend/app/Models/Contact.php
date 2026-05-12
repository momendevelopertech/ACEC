<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'messages';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'service_type',
        'lang',
        'is_read',
        'is_replied',
        'reply_text',
        'replied_at',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'is_replied' => 'boolean',
        'replied_at' => 'datetime',
    ];
}
