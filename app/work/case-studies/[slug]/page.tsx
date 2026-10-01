import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return {};
  }

  return {
    title: study.title,
    description: study.summary,
    alternates: {
      canonical: `${siteConfig.url}/work/case-studies/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const studyIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length];

  return (
    <>
      <section className="border-b border-border bg-background py-16 md:py-24">
        <div className="container-wide">
          <Link
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/work/case-studies"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All case studies
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">
                  {study.order}
                </span>
                <Badge variant="outline">{study.kind}</Badge>
                <Badge>{study.stage}</Badge>
              </div>
              <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold tracking-[-0.035em] md:text-6xl">
                {study.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {study.summary}
              </p>
              {study.liveHref ? (
                <div className="mt-8">
                  <Button asChild>
                    <Link href={study.liveHref}>
                      Open interactive demo
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="border-l-2 border-primary/25 pl-5">
              <p className="text-sm font-semibold">Who it is for</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {study.audience}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-wide grid md:grid-cols-3">
          {[
            ["Before", study.before],
            ["Try it", study.action],
            ["Result", study.result],
          ].map(([label, copy], index) => (
            <div
              className={`py-8 md:px-8 md:py-10 ${
                index === 0 ? "md:pl-0" : "border-t border-border md:border-l md:border-t-0"
              }`}
              key={label}
            >
              <p className="text-sm font-semibold text-primary">{label}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <main className="bg-background py-20 md:py-28">
        <div className="container-wide grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
          <div className="space-y-20">
            <section>
              <p className="text-sm font-medium text-primary">The business problem</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em]">
                A workflow worth making visible.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
                {study.problem}
              </p>
              <div className="mt-8 border-l-2 border-primary pl-5">
                <p className="text-sm font-semibold">The proof moment</p>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  {study.wow}
                </p>
              </div>
            </section>

            <section>
              <p className="text-sm font-medium text-primary">60-second walkthrough</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em]">
                One path, start to finish.
              </h2>
              <ol className="mt-8 border-t border-border">
                {study.walkthrough.map((step, index) => (
                  <li
                    className="grid gap-3 border-b border-border py-5 sm:grid-cols-[3rem_1fr]"
                    key={step}
                  >
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-primary">Included</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                  Core demo scope
                </h2>
                <ul className="mt-6 space-y-4">
                  {study.features.map((feature) => (
                    <li className="flex gap-3 text-sm leading-6" key={feature}>
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Not in this build</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                  Deliberate boundaries
                </h2>
                <ul className="mt-6 space-y-4">
                  {study.excluded.map((feature) => (
                    <li
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                      key={feature}
                    >
                      <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <p className="text-sm font-medium text-primary">How it will be shown</p>
              <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
                {[
                  ["Sample data", study.sampleData],
                  ["Presentation", study.presentation],
                  ["Outreach", study.outreach],
                ].map(([label, copy]) => (
                  <div className="bg-card p-6" key={label}>
                    <h3 className="text-sm font-semibold">{label}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-border pt-6">
              <h2 className="text-sm font-semibold">Build profile</h2>
              <dl className="mt-5 space-y-5 text-sm">
                {[
                  ["Difficulty", study.difficulty],
                  ["Scope", study.scope],
                  ["Cost", study.cost],
                  ["Reuse", study.reusability],
                ].map(([term, detail]) => (
                  <div key={term}>
                    <dt className="text-xs text-muted-foreground">{term}</dt>
                    <dd className="mt-1 leading-6">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-sm font-semibold">Proposed stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <span
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs leading-5 text-muted-foreground">
                This page is a transparent build brief. It will gain a live demo
                link and measured evidence when the interactive system ships.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <section className="border-t border-border bg-card py-12 md:py-16">
        <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Next in the demo portfolio</p>
            <h2 className="mt-2 text-xl font-semibold">{nextStudy.title}</h2>
          </div>
          <Button asChild variant="secondary">
            <Link href={`/work/case-studies/${nextStudy.slug}`}>
              Read the brief
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
