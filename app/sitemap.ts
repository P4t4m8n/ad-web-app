import { MetadataRoute } from "next";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: baseUrl + "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",

      priority: 1,
    },
    {
      url: baseUrl + "/about",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",

      priority: 1,
    },
    {
      url: baseUrl + "/accessibility",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },

    {
      url: baseUrl + "/explain/volunteers",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",

      priority: 0.8,
    },
    {
      url: baseUrl + "/explain/students",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",

      priority: 0.8,
    },
    {
      url: baseUrl + "/faq/volunteers",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",

      priority: 0.8,
    },
    {
      url: baseUrl + "/faq/students",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",

      priority: 0.8,
    },
  ];
}
