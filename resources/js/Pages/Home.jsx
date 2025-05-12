import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

export default function Home() {
  const page = usePage();
  // console.log("Page props:", page.props);

  const { posts = [], categories = [], authUser = null } = page.props || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />

      <main className="flex-1 container py-12">
        {/* Latest Posts */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
            <Link
              href="/blog"
              className="text-primary font-medium hover:underline flex items-center"
            >
              View all posts
            </Link>
          </div>

          {/* Edit here */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-12 w-12 text-muted-foreground"
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
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.category?.name && (
                      <Badge variant="secondary">{post.category.name}</Badge>
                    )}
                    <div className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <CardTitle className="mb-2 line-clamp-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>

                  <p className="text-muted-foreground text-sm line-clamp-3 mt-auto">
                    {(post.excerpt || post.content || "")
                      .substring(0, 120) + "..."}
                  </p>
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-primary font-medium hover:underline"
                  >
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>


        {/* edit here */}

        {/* Categories */}
        <section className="py-8">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <Badge variant="outline" className="text-sm py-1 px-3 hover:bg-accent">
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
