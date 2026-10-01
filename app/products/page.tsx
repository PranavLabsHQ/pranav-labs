import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContentGrid } from "@/components/shared/ContentGrid";
import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { products } from "@/content/ecosystem";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Products",
  description:
    "The product direction for Pranav Labs, including BuildNest and Aaspas.",
  path: "/products",
  keywords: ["BuildNest", "Aaspas", "software products"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        description="Pranav Labs is building reusable software alongside client systems. The first product tracks are prepared for public updates, changelogs, and roadmap work."
        eyebrow="Products"
        title="Products are the long-term destination."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide space-y-10">
          <ContentGrid
            items={products.map((product) => ({
              title: product.name,
              description: product.description,
              href: `/products/${product.slug}`,
              meta: product.status,
            }))}
          />
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            href="/roadmap"
          >
            View public roadmap
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
