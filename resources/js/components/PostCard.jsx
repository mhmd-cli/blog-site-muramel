import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function PostCard({ post }) {
  // Safely extract data with fallbacks
  const category = post.category || { name: 'Uncategorized', slug: 'uncategorized' };
  const publishedDate = post.published_at || 'No date';
  const readTime = post.read_time || 1; // Default to 1 min
  const excerpt = post.excerpt || '';
  const imageUrl = post.image_url || null;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow group">
      <CardHeader className="p-0">
        <Link href={route('posts.show', { post: post.slug })}>
          <div className="h-48 bg-gray-100 relative overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title || 'Post image'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-post.jpg';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="pt-6 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Link href={route('category.show', { category: category.slug })}>
            <Badge 
              variant="secondary" 
              className="text-xs hover:bg-gray-200 transition-colors"
            >
              {category.name}
            </Badge>
          </Link>
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {publishedDate}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <ClockIcon className="mr-1 h-3 w-3" />
            {readTime} min read
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          <Link 
            href={route('posts.show', { post: post.slug })}
            className="hover:underline"
            preserveScroll
          >
            {post.title || 'Untitled Post'}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter>
        <Link
          href={route('posts.show', { post: post.slug })}
          className="text-primary font-medium hover:underline text-sm flex items-center"
          preserveScroll
        >
          Read more <span aria-hidden="true">→</span>
        </Link>
      </CardFooter>
    </Card>
  );
}