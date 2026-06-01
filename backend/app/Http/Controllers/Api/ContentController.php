<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Models\Client;
use App\Models\Certification;
use App\Models\JobPosting;
use App\Models\WhyUsItem;
use Illuminate\Support\Facades\Cache;

class ContentController extends Controller
{
    public function index($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $data = Cache::remember("content.index.{$lang}", 3600, function () use ($lang) {
            return [
                'hero' => HeroSection::where('lang', $lang)->first()?->toArray(),
                'clients' => Client::where('is_active', true)->orderBy('order')->get()->toArray(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function hero($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $data = Cache::remember("hero.{$lang}", 3600, function () use ($lang) {
            return HeroSection::where('lang', $lang)->first()?->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function clients()
    {
        $data = Cache::remember("clients.all", 3600, function () {
            return Client::where('is_active', true)->orderBy('order')->get()->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function certifications($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $certs = Cache::remember("certifications.{$lang}", 3600, function () use ($lang) {
            return Certification::where('is_active', true)
                ->orderBy('order')
                ->get()
                ->map(function ($c) use ($lang) {
                    return [
                        'id' => $c->id,
                        'name' => $lang === 'ar' ? $c->name_ar : $c->name_en,
                        'description' => $lang === 'ar' ? $c->description_ar : $c->description_en,
                        'issuer' => $lang === 'ar' ? $c->issuer_ar : $c->issuer_en,
                        'image' => $c->image,
                        'issue_date' => $c->issue_date,
                        'expiry_date' => $c->expiry_date,
                        'order' => $c->order,
                    ];
                })->values()->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $certs,
        ]);
    }

    public function jobs($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $jobs = Cache::remember("jobs.{$lang}", 3600, function () use ($lang) {
            return JobPosting::where('is_active', true)
                ->get()
                ->map(function ($j) use ($lang) {
                    return [
                        'id' => $j->id,
                        'title' => $lang === 'ar' ? $j->title_ar : $j->title_en,
                        'description' => $lang === 'ar' ? $j->description_ar : $j->description_en,
                        'requirements' => $lang === 'ar' ? $j->requirements_ar : $j->requirements_en,
                        'location' => $lang === 'ar' ? $j->location_ar : $j->location_en,
                        'type' => $j->type,
                        'salary_range' => $j->salary_range,
                        'is_active' => $j->is_active,
                    ];
                })->values()->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $jobs,
        ]);
    }

    public function whyUs($lang)
    {
        $data = Cache::remember("whyus.{$lang}", 3600, function () {
            return WhyUsItem::where('is_active', true)->orderBy('order')->get()->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
