import type { MetadataRoute } from "next";
import { getAllSlugs, getPostContent } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fcopts.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const post = getPostContent(slug, "pt") ?? getPostContent(slug, "en");
    return {
      url: `${siteUrl}/blog/${slug}`,
      lastModified: post ? new Date(post.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/case/imidooh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case/ucopiloto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: `${siteUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/trabalhe-comigo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
