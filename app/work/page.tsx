import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaseStudyLedger } from "@/components/work/CaseStudyLedger";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore current Pranav Labs work across business software, automation infrastructure, and product foundations.",
  path: "/work",
  keywords: ["software case studies", "Pranav Labs work"],
});

export default function WorkPage() {
  const featuredStudies = caseStudies.filter((study) => study.featured);

  return (
    <>
      <PageHero
        description="Current work is focused on building useful systems, internal tooling, and product foundations that can compound over time."
        eyebrow="Work"
        title="Software work with a product-company standard."
      />
      <FeaturedProjectsSection />
      <section className="bg-background py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Demo portfolio</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
                Small systems that make the work visible.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Each demo starts with a real operating problem and ends with
                something a buyer can inspect, try, and discuss.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/work/case-studies">
                Explore all six demos
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CaseStudyLedger studies={featuredStudies} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
