import type { MetadataRoute } from "next";
import { registry } from "@/lib/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/components`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...registry.map((entry) => ({
      url: `${SITE_URL}/components/${entry.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
