<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

trait GeneratesPlaceholderImages
{
    private function generatePlaceholderImage(string $path, string $seed, int $width = 400, int $height = 300): string
    {
        $fullPath = storage_path("app/public/{$path}");

        $dir = dirname($fullPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        if (file_exists($fullPath)) {
            return $path;
        }

        $ext = pathinfo($fullPath, PATHINFO_EXTENSION);

        try {
            if ($ext === 'svg') {
                $this->createSvgPlaceholder($fullPath, $seed);
            } else {
                $url = "https://picsum.photos/seed/{$seed}/{$width}/{$height}";
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 10,
                        'user_agent' => 'ACEC-Seeder/1.0',
                    ],
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]);

                $imageData = @file_get_contents($url, false, $context);

                if ($imageData !== false) {
                    file_put_contents($fullPath, $imageData);
                } else {
                    $this->createSvgPlaceholder($fullPath, $seed);
                }
            }
        } catch (\Exception) {
            $this->createSvgPlaceholder($fullPath, $seed);
        }

        return $path;
    }

    private function createSvgPlaceholder(string $fullPath, string $label): void
    {
        $dir = dirname($fullPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $colors = ['#474A4D', '#6B695A', '#4A4D50', '#5A5C5E', '#3D4043'];
        $color = $colors[crc32($label) % count($colors)];

        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="{$color}"/>
  <g fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 180c-33 0-60 27-60 60v30h120v-30c0-33-27-60-60-60z"/>
    <circle cx="150" cy="120" r="45"/>
  </g>
</svg>
SVG;
        file_put_contents($fullPath, $svg);
    }
}
