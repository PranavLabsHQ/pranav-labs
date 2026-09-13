import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { MarketingAnalytics } from "@/components/analytics/MarketingAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/content/site";
import { defaultKeywords } from "@/lib/metadata";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pranav Labs - Software built to last",
    template: "%s - Pranav Labs",
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: [
      { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/brand/pranav-labs-mark.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/brand/pranav-labs-app-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Pranav Labs - Software built to last",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og/pranav-labs-og.svg",
        width: 1200,
        height: 630,
        alt: "Pranav Labs - Software built to last",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Labs - Software built to last",
    description: siteConfig.description,
    images: ["/og/pranav-labs-og.svg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/pranav-labs-app-icon.png`,
    email: siteConfig.email,
    description: siteConfig.description,
    sameAs: ["https://github.com/PranavLabsHQ"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} min-h-screen font-sans antialiased`}>
        <ThemeProvider>
          <a
            className="skip-link rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-md transition-transform"
            href="#main-content"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <MarketingAnalytics />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
