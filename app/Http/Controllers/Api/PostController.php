<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            ['id' => 1, 'title' => 'First Post', 'content' => 'Content of first post'],
            ['id' => 2, 'title' => 'Second Post', 'content' => 'Content of second post'],
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'id' => $id,
            'title' => "Post {$id}",
            'content' => "Content of post {$id}",
        ]);
    }
}
