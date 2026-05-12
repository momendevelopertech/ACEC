<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Theme::all(),
        ]);
    }

    public function active()
    {
        $theme = Theme::where('is_active', true)->first();

        if (!$theme) {
            $theme = Theme::first();
        }

        if (!$theme) {
            return response()->json([
                'success' => false,
                'message' => 'No theme configured',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $theme,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'slug' => 'required|string|max:255|unique:themes,slug',
            'colors' => 'nullable|array',
            'typography' => 'nullable|array',
            'layout' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if (($data['is_active'] ?? false)) {
            Theme::query()->update(['is_active' => false]);
        }

        $theme = Theme::create($data);

        return response()->json([
            'success' => true,
            'data' => $theme,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $theme = Theme::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:themes,slug,' . $id,
            'colors' => 'nullable|array',
            'typography' => 'nullable|array',
            'layout' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if (($data['is_active'] ?? false)) {
            Theme::query()->update(['is_active' => false]);
        }

        $theme->update($data);

        return response()->json([
            'success' => true,
            'data' => $theme,
        ]);
    }

    public function activate($id)
    {
        Theme::query()->update(['is_active' => false]);
        $theme = Theme::findOrFail($id);
        $theme->update(['is_active' => true]);

        return response()->json([
            'success' => true,
            'data' => $theme,
        ]);
    }

    public function destroy($id)
    {
        $theme = Theme::findOrFail($id);
        $theme->delete();

        return response()->json([
            'success' => true,
            'message' => 'Theme deleted',
        ]);
    }
}
