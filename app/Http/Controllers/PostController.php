<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $featuredPosts = Post::featured()
            ->published()
            ->with('category')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'image_url' => $post->image ? asset('storage/post-images/' . $post->image) : null,
                    'category' => [
                        'name' => $post->category->name,
                        'slug' => $post->category->slug
                    ],
                    'published_at' => $post->published_at->format('M d, Y'),
                    'read_time' => $post->read_time,
                ];
            });

        $popularPosts = Post::popular(7) // Last 7 days
            ->published()
            ->with('category')
            ->take(5)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'image_url' => $post->image ? asset('storage/post-images/' . $post->image) : null,
                    'views' => $post->views,
                    'category' => [
                        'name' => $post->category->name,
                        'slug' => $post->category->slug
                    ],
                    'published_at' => $post->published_at->format('M d, Y'),
                    'read_time' => $post->read_time,
                ];
            });

        return Inertia::render('Posts/Index', [
            'featuredPosts' => $featuredPosts,
            'popularPosts' => $popularPosts,
            'posts' => Post::published()
                ->with('category')
                ->latest('published_at')
                ->paginate(10)
                ->through(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'image_url' => $post->image ? asset('storage/post-images/' . $post->image) : null,
                    'category' => [
                        'name' => $post->category->name,
                        'slug' => $post->category->slug
                    ],
                    'published_at' => $post->published_at->format('M d, Y'),
                    'read_time' => $post->read_time,
                ])
        ]);
    }

    public function show(Post $post)
    {
        // Increment view count
        $post->increment('views');

        return Inertia::render('Posts/Show', [
            'post' => [
                'title' => $post->title,
                'body' => $post->body,
                'slug' => $post->slug,
                'image_url' => $post->image ? asset('storage/post-images/' . $post->image) : null,
                'category' => $post->category ? [
                    'name' => $post->category->name,
                    'slug' => $post->category->slug
                ] : null,
                'published_at' => optional($post->published_at)->format('F j, Y'),
                'read_time' => $post->read_time,
                'previous_post' => optional($post->getPreviousPost())->only(['title', 'slug']),
                'next_post' => optional($post->getNextPost())->only(['title', 'slug']),
            ]
        ]);
    }

    public function byCategory(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => [
                'name' => $category->name,
                'slug' => $category->slug
            ],
            'posts' => $category->posts()
                ->published()
                ->latest('published_at')
                ->paginate(10)
                ->through(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'image_url' => $post->image ? asset('storage/post-images/' . $post->image) : null,
                    'published_at' => $post->published_at->format('M d, Y'),
                    'read_time' => $post->read_time,
                ])
        ]);
    }
}
