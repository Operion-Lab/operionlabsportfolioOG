import type { MetadataRoute } from "next";

import { navItems, siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...navItems.map((item) => item.href), "/about", "/get-quote"];

  return routes.map((route) => ({
    changeFrequency: route === "/" ? "weekly" : "monthly",
    lastModified: new Date(),
    priority: route === "/" ? 1 : 0.8,
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
  }));
}
