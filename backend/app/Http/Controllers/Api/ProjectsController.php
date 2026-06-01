<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Support\Facades\Cache;

class ProjectsController extends Controller
{
    public function index($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $projects = Cache::remember("projects.{$lang}", 3600, function () use ($lang) {
            return Project::where('is_active', true)->orderBy('order')->get()->map(function ($p) use ($lang) {
                return [
                    'id' => $p->id,
                    'slug' => $p->slug,
                    'title' => $lang === 'ar' ? $p->title_ar : $p->title_en,
                    'description' => $lang === 'ar' ? $p->description_ar : $p->description_en,
                    'image' => $p->image,
                    'category' => $p->category,
                    'year' => $p->year,
                    'is_featured' => $p->is_featured,
                    'location' => $lang === 'ar' ? $p->location_ar : $p->location_en,
                    'client' => $lang === 'ar' ? $p->client_ar : $p->client_en,
                ];
            })->values()->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    public function show($slug, $lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $data = Cache::remember("project.{$slug}.{$lang}", 3600, function () use ($slug, $lang) {
            $p = Project::where('slug', $slug)->where('is_active', true)->firstOrFail();

            return [
                'id' => $p->id,
                'slug' => $p->slug,
                'title' => $lang === 'ar' ? $p->title_ar : $p->title_en,
                'description' => $lang === 'ar' ? $p->description_ar : $p->description_en,
                'content' => $lang === 'ar' ? $p->content_ar : $p->content_en,
                'image' => $p->image,
                'gallery' => $p->gallery,
                'category' => $p->category,
                'year' => $p->year,
                'location' => $lang === 'ar' ? $p->location_ar : $p->location_en,
                'client' => $lang === 'ar' ? $p->client_ar : $p->client_en,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
