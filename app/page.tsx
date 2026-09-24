import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologyStackSection } from "@/components/sections/TechnologyStackSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Software built to last",
  description:
    "Pranav Labs builds AI products, automation systems, developer tools, business software, and future software infrastructure.",
  path: "/",
  keywords: ["Pranav Labs", "AI products", "automation systems"],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <PrinciplesSection />
      <ProcessSection />
      <TechnologyStackSection />
      <CtaSection />
    </>
  );
}
