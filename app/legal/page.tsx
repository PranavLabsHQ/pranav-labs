import { ContentGrid } from "@/components/shared/ContentGrid";
import { PageHero } from "@/components/shared/PageHero";
import { legalPages } from "@/content/ecosystem";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Legal",
  description:
    "Legal and privacy documents for the Pranav Labs website and future product surfaces.",
  path: "/legal",
  keywords: ["Pranav Labs legal", "privacy", "terms"],
});

export default function LegalPage() {
  return (
    <>
      <PageHero
        description="Plain-language policies for the current website and the future software surfaces Pranav Labs will operate."
        eyebrow="Legal"
        title="Clear policies, kept visible."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide">
          <ContentGrid
            items={legalPages.map((page) => ({
              title: page.title,
              description: page.description,
              href: page.slug === "cookies" ? "/legal/cookies" : `/${page.slug}`,
              icon: page.icon,
            }))}
          />
        </div>
      </section>
    </>
  );
}
