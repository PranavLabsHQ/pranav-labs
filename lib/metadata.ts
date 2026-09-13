import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export const defaultKeywords = [
  "Pranav Labs",
  "software engineering",
  "AI products",
  "automation systems",
  "developer tools",
  "business software",
];

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const canonicalPath = path === "/" ? "" : path;
  const url = `${siteConfig.url}${canonicalPath}`;
  const imageTitle =
    title === siteConfig.name ? siteConfig.name : `${title} - ${siteConfig.name}`;
  const ogImage = `/api/og?title=${encodeURIComponent(imageTitle)}`;

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: imageTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: imageTitle,
      description,
      images: [ogImage],
    },
  };
}
