<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function show(Post $post)
    {
        if (!$post->isPublished()) {
            abort(404);
        }

        $post->increment('views');

        return Inertia::render('Posts/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'body' => $post->body,
                'slug' => $post->slug,
                'image_url' => $post->image_url,
                'category' => $post->category ? [
                    'name' => $post->category->name,
                    'slug' => $post->category->slug,
                ] : null,
                'published_at' => optional($post->published_at)->format('F j, Y'),
                'read_time' => $post->read_time,
                'previous_post' => $post->getPreviousPost() ? [
                    'title' => $post->getPreviousPost()->title,
                    'slug' => $post->getPreviousPost()->slug,
                ] : null,
                'next_post' => $post->getNextPost() ? [
                    'title' => $post->getNextPost()->title,
                    'slug' => $post->getNextPost()->slug,
                ] : null,
            ],
            'auth' => [
                'user' => auth()->user() ? [
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                ] : null,
            ],
        ]);
    }
}
