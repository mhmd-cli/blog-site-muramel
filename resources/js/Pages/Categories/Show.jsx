import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout'; // or your actual layout path
import PostCard from '@/components/PostCard'; // optional component

export default function Show({ category, posts }) {
  return (
    <>
      <Head title={`Posts in ${category.name}`} />
      <Layout>
        <div className="py-10 px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Category: {category.name}</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-muted-foreground">No posts found in this category.</p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
// Note: The above code assumes you have a PostCard component to display individual posts.