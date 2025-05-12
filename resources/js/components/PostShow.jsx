import React from "react";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component exists
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@/components/icons"; // Assuming icons exist
import Navbar from "@/components/Navbar";  // Assuming Navbar component exists
import Footer from "@/components/Footer";  // Assuming Footer component exists

export default function PostShow({ post }) {
  return (
    <>
      {/* Include your Navbar here */}
      <Navbar />

      <article className="max-w-3xl mx-auto py-8">
        {/* Back to Posts */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to all posts
        </Link>

        {/* Category Badge */}
        <div className="mb-6">
          <Badge variant="outline">{post.category}</Badge>
        </div>

        {/* Post Title */}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        {/* Post Metadata (Date & Read Time) */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          <span className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {post.published_at}
          </span>
          <span className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {post.read_time} min read
          </span>
        </div>

        {/* Post Image */}
        {post.image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-post.jpg';
              }}
            />
          </div>
        )}

        {/* Post Content (Body) */}
        <div 
          className="prose max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Previous/Next Post Links */}
        {(post.previous_post || post.next_post) && (
          <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.previous_post && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Previous Post</p>
                <Link 
                  href={`/posts/${post.previous_post.slug}`} 
                  className="font-medium hover:underline"
                >
                  {post.previous_post.title}
                </Link>
              </div>
            )}
            
            {post.next_post && (
              <div className="md:text-right">
                <p className="text-sm text-gray-500 mb-2">Next Post</p>
                <Link 
                  href={`/posts/${post.next_post.slug}`} 
                  className="font-medium hover:underline"
                >
                  {post.next_post.title}
                </Link>
              </div>
            )}
          </div>
        )}
      </article>

      {/* Include your Footer here */}
      <Footer />
    </>
  );
}
