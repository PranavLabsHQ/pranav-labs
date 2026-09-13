import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/content/site";

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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Pranav Labs - Software built to last",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/brand/pranav-labs-app-icon.png",
        width: 512,
        height: 512,
        alt: "Pranav Labs brand mark",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary",
    title: "Pranav Labs - Software built to last",
    description: siteConfig.description,
    images: ["/brand/pranav-labs-app-icon.png"],
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
    sameAs: ["https://github.com/ItzPranav61"],
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
