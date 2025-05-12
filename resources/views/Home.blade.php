<!-- resources/views/home.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold text-center mb-6">Welcome to Our Blog</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Display some featured posts or content here -->
            @foreach($posts as $post)
                <div class="card">
                    <div class="card-header">
                        <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->title }}" class="w-full h-48 object-cover">
                    </div>
                    <div class="card-body">
                        <h2 class="text-xl font-semibold">{{ $post->title }}</h2>
                        <p>{{ $post->excerpt }}</p>
                        <a href="{{ route('posts.show', $post->slug) }}" class="text-blue-600 hover:text-blue-800">Read more</a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
