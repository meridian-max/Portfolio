import type { Metadata } from "next";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogPlaceholder } from "@/components/ui/blog-placeholder";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  const images = post.image
    ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : [];

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.authors,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.authors?.[0] || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <Script id="blog-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <article className="container py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg border border-border bg-muted">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover grayscale"
                  priority
                />
              ) : (
                <BlogPlaceholder title={post.title} />
              )}
            </div>
            <h1 className="mb-5 font-serif text-5xl font-semibold tracking-normal sm:text-6xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <time dateTime={post.date} className="text-muted-foreground">
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </time>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="rounded-md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
