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
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const workUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: study.featured ? 0.8 : 0.64,
  }));

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.64,
  }));

  return [...staticUrls, ...workUrls, ...blogUrls];
}
