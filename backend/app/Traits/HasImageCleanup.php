<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasImageCleanup
{
    public static function bootHasImageCleanup(): void
    {
        static::deleting(function ($model) {
            $fields = $model->imageFields ?? [];
            foreach ($fields as $field) {
                $value = $model->{$field} ?? null;
                if ($value) {
                    Storage::disk('public')->delete($value);
                }
            }

            $arrayFields = $model->imageArrayFields ?? [];
            foreach ($arrayFields as $field) {
                $values = $model->{$field} ?? [];
                if (is_array($values)) {
                    foreach ($values as $value) {
                        Storage::disk('public')->delete($value);
                    }
                }
            }
        });
    }
}
