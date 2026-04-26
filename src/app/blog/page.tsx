import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPlaceholder } from "@/components/ui/blog-placeholder";
import { getBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Two source-backed notes derived from Meridian Works public products and repos.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container py-20">
      <div className="mb-14 max-w-3xl">
        <Badge variant="secondary" className="mb-4 rounded-md">
          Notes
        </Badge>
        <h1 className="font-serif text-5xl font-semibold tracking-normal sm:text-6xl">
          Notes pulled directly from the public products on this site.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          These posts stay close to what the team has actually published: live surfaces, repos,
          README claims, and product behavior visible in public.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden shadow-none transition-colors hover:bg-accent/50">
              <div className="relative aspect-[16/9] border-b border-border bg-muted">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                ) : (
                  <BlogPlaceholder title={post.title} />
                )}
              </div>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
