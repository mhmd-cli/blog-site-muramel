<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $posts = $category->posts()->with('category')->latest()->get();

        return Inertia::render('Categories/Show', [
            'category' => $category,
            'posts' => $posts,
        ]);
    }
}
