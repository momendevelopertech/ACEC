<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key', 'value', 'group', 'type',
    ];

    public function getValueAttribute(): mixed
    {
        if ($this->type === 'json') {
            return json_decode($this->attributes['value'], true);
        }

        if ($this->type === 'boolean') {
            return (bool) $this->attributes['value'];
        }

        if ($this->type === 'integer') {
            return (int) $this->attributes['value'];
        }

        return $this->attributes['value'];
    }
}
