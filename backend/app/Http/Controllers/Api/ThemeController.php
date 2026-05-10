<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theme;

class ThemeController extends Controller
{
    public function index()
    {
        $theme = Theme::where('is_active', true)->first();

        if (!$theme) {
            $theme = Theme::first();
        }

        if (!$theme) {
            return response()->json([
                'success' => false,
                'message' => 'No theme configured',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $theme,
            'css_variables' => $this->toCssVariables($theme),
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

    private function toCssVariables(Theme $theme): array
    {
        $colors = $theme->colors ?? [];
        $typography = $theme->typography ?? [];
        $layout = $theme->layout ?? [];

        return [
            '--color-primary' => $colors['primary'] ?? '#1a3c5e',
            '--color-secondary' => $colors['secondary'] ?? '#c9a84c',
            '--color-background' => $colors['background'] ?? '#ffffff',
            '--color-surface' => $colors['surface'] ?? '#f0f4f8',
            '--color-text' => $colors['text'] ?? '#1a1a2e',
            '--color-text-muted' => $colors['text_muted'] ?? '#6b7280',
            '--color-header-bg' => $colors['header_bg'] ?? '#1a3c5e',
            '--color-footer-bg' => $colors['footer_bg'] ?? '#1a1a2e',
            '--color-button-primary' => $colors['button_primary'] ?? '#c9a84c',
            '--color-button-secondary' => $colors['button_secondary'] ?? '#1a3c5e',
            '--color-border' => $colors['border'] ?? '#e5e7eb',
            '--color-card-bg' => $colors['card_bg'] ?? '#ffffff',
            '--font-ar' => $typography['font_ar'] ?? 'Cairo',
            '--font-en' => $typography['font_en'] ?? 'Inter',
            '--border-radius' => $layout['border_radius'] ?? 'md',
        ];
    }
}
