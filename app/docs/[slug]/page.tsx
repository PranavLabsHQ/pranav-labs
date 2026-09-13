import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { docsSections } from "@/content/ecosystem";

type DocsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docsSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: DocsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = docsSections.find((item) => item.slug === slug);

  if (!section) {
    return {};
  }

  return {
    title: `${section.title} Docs`,
    description: section.description,
  };
}

export default async function DocsDetailPage({ params }: DocsDetailPageProps) {
  const { slug } = await params;
  const section = docsSections.find((item) => item.slug === slug);

  if (!section) {
    notFound();
  }

  return (
    <>
      <PageHero
        description={section.description}
        eyebrow="Docs"
        title={section.title}
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide max-w-3xl space-y-10">
          {section.sections.map((entry) => (
            <article className="space-y-4" key={entry.title}>
              <h2 className="text-2xl font-semibold tracking-normal">
                {entry.title}
              </h2>
              <div className="space-y-4">
                {entry.body.map((paragraph) => (
                  <p
                    className="text-base leading-8 text-muted-foreground"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
