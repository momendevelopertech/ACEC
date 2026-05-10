<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index($lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $posts = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($post) use ($lang) {
                return [
                    'id' => $post->id,
                    'slug' => $post->slug,
                    'title' => $lang === 'ar' ? $post->title_ar : $post->title_en,
                    'excerpt' => $lang === 'ar' ? $post->excerpt_ar : $post->excerpt_en,
                    'image' => $post->image,
                    'category' => $post->category,
                    'published_at' => $post->published_at,
                    'views' => $post->views,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }

    public function show($slug, $lang)
    {
        $lang = in_array($lang, ['ar', 'en']) ? $lang : 'ar';

        $post = BlogPost::where('slug', $slug)->where('is_published', true)->firstOrFail();
        $post->increment('views');

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $post->id,
                'slug' => $post->slug,
                'title' => $lang === 'ar' ? $post->title_ar : $post->title_en,
                'excerpt' => $lang === 'ar' ? $post->excerpt_ar : $post->excerpt_en,
                'content' => $lang === 'ar' ? $post->content_ar : $post->content_en,
                'image' => $post->image,
                'category' => $post->category,
                'tags' => $post->tags,
                'published_at' => $post->published_at,
                'views' => $post->views,
                'meta_title' => $lang === 'ar' ? $post->meta_title_ar : $post->meta_title_en,
                'meta_desc' => $lang === 'ar' ? $post->meta_desc_ar : $post->meta_desc_en,
            ],
        ]);
    }
}
