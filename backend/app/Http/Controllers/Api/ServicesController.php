<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;

class ServicesController extends Controller
{
    public function index($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $services = Cache::remember("services.{$lang}", 3600, function () use ($lang) {
            return Service::where('is_active', true)->orderBy('order')->get()->map(function ($s) use ($lang) {
                return [
                    'id' => $s->id,
                    'slug' => $s->slug,
                    'icon' => $s->icon,
                    'title' => $lang === 'ar' ? $s->title_ar : $s->title_en,
                    'description' => $lang === 'ar' ? $s->description_ar : $s->description_en,
                    'image' => $s->image,
                    'is_featured' => $s->is_featured,
                ];
            });
        });

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    public function show($slug, $lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $data = Cache::remember("service.{$slug}.{$lang}", 3600, function () use ($slug, $lang) {
            $s = Service::where('slug', $slug)->where('is_active', true)->firstOrFail();

            return [
                'id' => $s->id,
                'slug' => $s->slug,
                'icon' => $s->icon,
                'title' => $lang === 'ar' ? $s->title_ar : $s->title_en,
                'description' => $lang === 'ar' ? $s->description_ar : $s->description_en,
                'content' => $lang === 'ar' ? $s->content_ar : $s->content_en,
                'image' => $s->image,
                'meta_title' => $lang === 'ar' ? $s->meta_title_ar : $s->meta_title_en,
                'meta_desc' => $lang === 'ar' ? $s->meta_desc_ar : $s->meta_desc_en,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
