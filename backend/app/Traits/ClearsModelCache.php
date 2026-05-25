<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait ClearsModelCache
{
    protected static function bootClearsModelCache(): void
    {
        static::saved(function () {
            Cache::flush();
        });

        static::deleted(function () {
            Cache::flush();
        });
    }
}
