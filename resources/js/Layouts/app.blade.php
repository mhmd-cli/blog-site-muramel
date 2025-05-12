<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $post->title ?? 'Post' }}</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="font-sans antialiased bg-gray-100 text-gray-900">
    <div class="container mx-auto px-4">
        @yield('content')
    </div>
</body>
</html>
