<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;

use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;


// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'posts' => Post::with('category')->latest()->take(5)->get(),
//         'categories' => Category::all(),
//         'authUser' => auth()->user(),
//     ]);
// });

Route::get('/', function () {
    $data = [
        'posts' => Post::with('category')->latest()->take(5)->get()->toArray(),
        'categories' => Category::all()->toArray(),
        'authUser' => auth()->user() ? auth()->user()->toArray() : null,
    ];

    \Log::info('Home page data:', $data);

    return Inertia::render('Home', [
        'posts' => Post::with('category')->latest()->take(5)->get()->toArray(),
        'categories' => Category::all()->toArray(),
        'authUser' => auth()->user() ? auth()->user()->toArray() : null,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Posts
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

// Categories
Route::get('/category/{category:slug}', [CategoryController::class, 'show'])->name('category.show');

require __DIR__.'/auth.php';
