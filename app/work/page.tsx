import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore current Pranav Labs work across business software, automation infrastructure, and product foundations.",
  path: "/work",
  keywords: ["software case studies", "Pranav Labs work"],
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        description="We build practical software around real operational needs, with the care and structure required for it to last."
        eyebrow="Work"
        title="Software work with a product-company standard."
      />
      <FeaturedProjectsSection />
      <CtaSection />
    </>
  );
}
