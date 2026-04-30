import { HomePage } from "@/components/sections/home-page";
import { getBlogPosts } from "@/lib/mdx";

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 2).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    image: post.image ?? null,
    tags: post.tags ?? [],
  }));

  return <HomePage latestPosts={latestPosts} />;
}
