import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export const dynamic = "force-static";
import toolsData from "@/data/tools.json";
import articlesData from "@/data/articles.json";
import { allDevices, getAllCategories, getAllManufacturers, getAllUseCases, getAllTags } from "@/data/devices";
import { CATEGORY_LABELS, USECASE_LABELS } from "@/data/devices/types";
import { caseStudies, getAllIndustries, getAllTechnologies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastBuild = "2026-04-13";

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

  // Device database pages
  const devicePages = allDevices.map((d) => ({
    url: `${base}/tools/device-database/${d.id}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryPages = getAllCategories().map((c) => ({
    url: `${base}/tools/device-database/category/${c}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const manufacturerPages = getAllManufacturers().map((m) => ({
    url: `${base}/tools/device-database/manufacturer/${encodeURIComponent(m)}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const useCasePages = getAllUseCases().map((uc) => ({
    url: `${base}/tools/device-database/use-case/${uc}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tagPages = getAllTags().map((t) => ({
    url: `${base}/tools/device-database/tag/${encodeURIComponent(t)}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Case study pages
  const caseStudyPages = caseStudies.map((cs) => ({
    url: `${base}/tools/case-studies/${cs.id}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages = getAllIndustries().map((i) => ({
    url: `${base}/tools/case-studies/industry/${i}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const technologyPages = getAllTechnologies().map((t) => ({
    url: `${base}/tools/case-studies/technology/${encodeURIComponent(t)}`,
    lastModified: lastBuild,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: lastBuild, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/tools`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.8 },
    // New tool hub pages
    { url: `${base}/tools/device-database`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/case-studies`, lastModified: lastBuild, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/introduction-cost`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/sensor-guide`, lastModified: lastBuild, changeFrequency: "monthly", priority: 0.8 },
    ...tools,
    ...devicePages,
    ...categoryPages,
    ...manufacturerPages,
    ...useCasePages,
    ...tagPages,
    ...caseStudyPages,
    ...industryPages,
    ...technologyPages,
    ...articles,
    { url: `${base}/privacy`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
  ];
}
