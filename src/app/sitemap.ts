import type { MetadataRoute } from "next";

const BASE = "https://ac-ec.com.sa";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ar", "en"];

  const staticPages = [
    "", "about", "services", "projects", "blog",
    "contact", "team", "clients", "certifications", "career", "profile",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
