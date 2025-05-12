import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Show({ post, auth }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <AuthenticatedLayout user={auth?.user || null}>
      <Head title={post.title} />
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <Link
          href={route('posts.index')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to all posts
        </Link>

        {post.category && (
          <div className="mb-6">
            <Link href={route('category.show', { category: post.category.slug })}>
              <Badge variant="outline" className="hover:bg-gray-100">
                {post.category.name}
              </Badge>
            </Link>
          </div>
        )}

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="p-0">
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 sm:h-96 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-post.jpg';
                }}
              />
            ) : (
              <div className="h-64 bg-muted flex justify-center items-center text-muted-foreground">
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
          </CardHeader>

          <CardContent className="pt-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {post.published_at}
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {post.read_time} min read
              </span>
            </div>
            <div className="prose max-w-none">{post.body}</div>
          </CardContent>

          <CardFooter className="flex justify-between pt-6 border-t">
            {post.previous_post && (
              <Link
                href={route('posts.show', { post: post.previous_post.slug })}
                className="text-sm text-primary hover:underline flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                {post.previous_post.title}
              </Link>
            )}
            {post.next_post && (
              <Link
                href={route('posts.show', { post: post.next_post.slug })}
                className="text-sm text-primary hover:underline flex items-center ml-auto"
              >
                {post.next_post.title}
                <ArrowLeftIcon className="h-4 w-4 ml-1 transform rotate-180" />
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
