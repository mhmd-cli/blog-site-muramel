import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PostsIndex({ posts, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Blog Posts" />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Latest Posts</h1>
          <p className="text-gray-600">Discover our latest articles and tutorials</p>
        </div>

        <div className="mb-6 max-w-md">
          <Input 
            type="search" 
            placeholder="Search posts..." 
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination links={posts.links} className="mt-8" />
      </div>
      {/* Example of how to use these in your React component */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {popularPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular This Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Regular posts list */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.data.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination links={posts.links} className="mt-8" />
      </section>
          </AuthenticatedLayout>
  );
}