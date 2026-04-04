import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export const dynamic = "force-static";
import toolsData from "@/data/tools.json";
import articlesData from "@/data/articles.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastBuild = "2026-04-05";

  const tools = toolsData.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articles = articlesData.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: lastBuild, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/tools`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.8 },
    ...tools,
    ...articles,
    { url: `${base}/privacy`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
  ];
}
