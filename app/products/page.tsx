import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { roadmapItems } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The product direction for Pranav Labs, from engineering studio to product company.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        description="The long-term direction is reusable software: AI assistants, workflow platforms, developer utilities, and business operating systems."
        eyebrow="Products"
        title="Products are the long-term destination."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-5 md:grid-cols-2">
          {roadmapItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                key={item.title}
              >
                <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
                <h2 className="mt-5 text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
