import React from "react";
import { Head, Link } from "@inertiajs/react";
import PostCard from "@/Components/PostCard";
import Pagination from "@/Components/Pagination";

export default function CategoryShow({ category, posts }) {
  return (
    <>
      <Head title={`Posts in ${category}`} />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Posts in {category}</h1>
          <Link href="/" className="text-primary hover:underline">
            &larr; Back to all posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination links={posts.links} />
      </div>
    </>
  );
}