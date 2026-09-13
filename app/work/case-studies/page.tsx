import type { Metadata } from "next";
import Link from "next/link";

import { ContentGrid } from "@/components/shared/ContentGrid";
import { PageHero } from "@/components/shared/PageHero";
import { caseStudies } from "@/content/ecosystem";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Reusable Pranav Labs case study system covering challenge, research, architecture, engineering, results, and lessons.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        description="A reusable system for documenting serious work: challenge, research, architecture, engineering, results, and lessons."
        eyebrow="Case Studies"
        title="How work becomes a system."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide">
          <ContentGrid
            items={caseStudies.map((study) => ({
              title: study.title,
              description: study.summary,
              href: `/work/case-studies/${study.slug}`,
              meta: study.status,
            }))}
          />
          <p className="mt-8 text-sm text-muted-foreground">
            <Link className="text-primary" href="/work">
              Return to work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
