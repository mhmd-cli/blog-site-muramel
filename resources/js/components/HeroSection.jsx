import React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Our Blog
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover insightful articles, tutorials, and industry updates. 
              Stay informed with the latest trends and knowledge.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/blog">
              <Button size="lg">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button variant="outline" size="lg">
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
