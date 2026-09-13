import type { Metadata } from "next";

import { ContentGrid } from "@/components/shared/ContentGrid";
import { PageHero } from "@/components/shared/PageHero";
import { docsSections } from "@/content/ecosystem";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Pranav Labs documentation for brand, engineering, products, APIs, architecture, blog, and contributing.",
};

export default function DocsPage() {
  return (
    <>
      <PageHero
        description="A public operating manual for the company: brand, engineering standards, product direction, API thinking, architecture, and contribution rules."
        eyebrow="Docs"
        title="The Pranav Labs operating system."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide">
          <ContentGrid
            items={docsSections.map((section) => ({
              title: section.title,
              description: section.description,
              href: `/docs/${section.slug}`,
              icon: section.icon,
            }))}
          />
        </div>
      </section>
    </>
  );
}
