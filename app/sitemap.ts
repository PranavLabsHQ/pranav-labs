import type { MetadataRoute } from "next";

import { navigationItems, siteConfig } from "@/content/site";

const staticRoutes = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...navigationItems.map((item) => item.href)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
