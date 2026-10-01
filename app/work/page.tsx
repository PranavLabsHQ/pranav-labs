import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
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
        description="Current work is focused on building useful systems, internal tooling, and product foundations that can compound over time."
        eyebrow="Work"
        title="Software work with a product-company standard."
      />
      <FeaturedProjectsSection />
      <section className="bg-background pb-20 md:pb-32">
        <div className="container-wide rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal">
                Case-study system
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Pranav Labs documents serious work through challenge, research,
                architecture, engineering, results, and lessons.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/work/case-studies">
                View Case Studies
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
