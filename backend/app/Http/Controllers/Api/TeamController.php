<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;

class TeamController extends Controller
{
    public function index($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $team = TeamMember::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($m) use ($lang) {
                return [
                    'id' => $m->id,
                    'name' => $lang === 'ar' ? $m->name_ar : $m->name_en,
                    'position' => $lang === 'ar' ? $m->position_ar : $m->position_en,
                    'bio' => $lang === 'ar' ? $m->bio_ar : $m->bio_en,
                    'image' => $m->image,
                    'email' => $m->email,
                    'linkedin' => $m->linkedin,
                    'order' => $m->order,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $team,
        ]);
    }
}
