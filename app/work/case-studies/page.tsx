import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
import { CaseStudyLedger } from "@/components/work/CaseStudyLedger";
import { caseStudies } from "@/content/case-studies";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Explore six focused Pranav Labs demos across websites, automation, AI systems, and business software.",
  path: "/work/case-studies",
  keywords: ["case studies", "software demos", "automation portfolio"],
});

export default function CaseStudiesPage() {
  const groups = [
    {
      title: "Building first",
      description:
        "The first proof layer: one operating-system demo and one measured website rebuild.",
      studies: caseStudies.filter((study) => study.stage === "Building first"),
    },
    {
      title: "Build next",
      description:
        "Deeper operational systems for field teams and document-heavy back offices.",
      studies: caseStudies.filter((study) => study.stage === "Build next"),
    },
    {
      title: "Build later",
      description:
        "Focused supporting proofs for sales workflows and reliable automation.",
      studies: caseStudies.filter((study) => study.stage === "Build later"),
    },
  ];

  return (
    <>
      <PageHero
        description="Six focused systems designed around recognisable business friction. The briefs are public now; interactive builds will replace plans as they ship."
        eyebrow="Work / Case studies"
        title="Evidence before claims."
      />
      <section className="border-b border-border bg-card py-10 md:py-14">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          {[
            ["Problem", "Start with repeated work that costs time, revenue, or trust."],
            ["Proof", "Show the workflow, the control points, and the evidence it produces."],
            ["Boundary", "State what the demo does not do and never manufacture results."],
          ].map(([title, copy]) => (
            <div className="border-l-2 border-primary/25 pl-5" key={title}>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-background py-20 md:py-28">
        <div className="container-wide space-y-20">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-8 grid gap-3 md:grid-cols-[15rem_1fr] md:items-start">
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                  {group.title}
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <CaseStudyLedger showProof studies={group.studies} />
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            <Link className="text-primary" href="/work">
              Return to work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
