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

        try {
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

        $firstChar = mb_substr($label, 0, 1);
        $colors = ['1a1a2e', '16213e', '0f3460', '533483', '2d4059', '222831', '30475e', '3a0088'];
        $color = $colors[crc32($label) % count($colors)];

        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#{$color}"/>
  <text x="200" y="150" font-family="Arial" font-size="80" fill="white" text-anchor="middle" dominant-baseline="central">{$firstChar}</text>
</svg>
SVG;
        file_put_contents($fullPath, $svg);
    }
}
