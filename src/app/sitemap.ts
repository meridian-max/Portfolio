import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/mdx";
import { caseStudies } from "@/data/case-studies";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();
  const posts = await getBlogPosts();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: buildDate,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: buildDate,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: buildDate,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: buildDate,
    },
  ];

  const workUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified: buildDate,
  }));

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticUrls, ...workUrls, ...blogUrls];
}
