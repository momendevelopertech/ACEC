<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PageView;

class TrackingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string|max:200',
            'lang' => 'nullable|in:ar,en',
        ]);

        PageView::create([
            'page' => $validated['page'],
            'lang' => $validated['lang'] ?? 'ar',
            'ip_hash' => hash('sha256', $request->ip()),
            'user_agent' => substr($request->userAgent() ?? '', 0, 200),
        ]);

        return response()->json(['success' => true]);
    }
}
