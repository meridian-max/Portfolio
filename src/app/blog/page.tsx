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
    "Engineering and product notes from GreedUp — written from the products we have shipped.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <section className="studio-section section-wash section-wash-emerald">
        <div className="container relative py-16 text-center">
          <div aria-hidden="true" className="dot-matrix animate-drift absolute left-4 top-12 h-24 w-24 opacity-50" />
          <p className="section-kicker">From the studio</p>
          <h1 className="outline-heading mx-auto mt-5 max-w-5xl text-6xl font-black uppercase leading-none sm:text-7xl">
            Notes
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            Written from the products themselves: what worked, what did not, and the patterns
            that held up while shipping for founders.
          </p>
          <p className="marginalia mt-4">↳ field notes, not opinion pieces</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="container grid gap-6 py-16 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-[16/9] border-b-2 border-border bg-muted">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="image-duotone object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <BlogPlaceholder title={post.title} />
                  )}
                </div>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted-foreground">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
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
      </section>
    </div>
  );
}
