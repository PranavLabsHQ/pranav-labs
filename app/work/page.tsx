import type { Metadata } from "next";

import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore current Pranav Labs work across business software, automation infrastructure, and product foundations.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        description="Current work is focused on building useful systems, internal tooling, and product foundations that can compound over time."
        eyebrow="Work"
        title="Software work with a product-company standard."
      />
      <FeaturedProjectsSection />
      <CtaSection />
    </>
  );
}
