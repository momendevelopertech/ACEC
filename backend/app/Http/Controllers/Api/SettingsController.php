<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\SectionsConfig;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->mapWithKeys(function ($setting) {
            return [$setting->key => $setting->value];
        });

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    public function sections($lang)
    {
        $sections = SectionsConfig::where('is_visible', true)
            ->orderBy('order')
            ->get()
            ->map(function ($section) use ($lang) {
                return [
                    'key' => $section->section_key,
                    'name' => $lang === 'ar' ? $section->name_ar : $section->name_en,
                    'order' => $section->order,
                    'settings' => $section->custom_settings,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $sections,
        ]);
    }
}
