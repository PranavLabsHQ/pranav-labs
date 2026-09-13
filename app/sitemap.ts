import type { MetadataRoute } from "next";

import { navigationItems, siteConfig } from "@/content/site";
import {
  blogPosts,
  caseStudies,
  docsSections,
  products,
} from "@/content/ecosystem";

const staticRoutes = [
  "/",
  "/privacy",
  "/terms",
  "/legal",
  "/legal/cookies",
  "/docs",
  "/roadmap",
  "/changelog",
  "/work/case-studies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...navigationItems.map((item) => item.href),
    ...docsSections.map((item) => `/docs/${item.slug}`),
    ...blogPosts.map((item) => `/blog/${item.slug}`),
    ...products.map((item) => `/products/${item.slug}`),
    ...caseStudies.map((item) => `/work/case-studies/${item.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
