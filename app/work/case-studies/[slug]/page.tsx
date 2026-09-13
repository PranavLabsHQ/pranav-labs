import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { Timeline } from "@/components/shared/Timeline";
import { caseStudies } from "@/content/ecosystem";
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

  return (
    <>
      <PageHero
        description={study.summary}
        eyebrow={`Case study - ${study.status}`}
        title={study.title}
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide max-w-4xl space-y-8">
          <div className="flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <Timeline items={study.steps} />
        </div>
      </section>
    </>
  );
}
