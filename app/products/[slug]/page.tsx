import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/content/ecosystem";
import { siteConfig } from "@/content/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHero
        description={product.description}
        eyebrow={`${product.eyebrow} - ${product.status}`}
        title={product.name}
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide space-y-16">
          <div className="grid gap-5 md:grid-cols-2">
            {product.features.map((feature) => (
              <Card key={feature}>
                <CardHeader>
                  <CardTitle>{feature}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="space-y-8">
            <SectionHeader
              description="Screenshots will land as the product interface becomes public. The layout is ready for real product media."
              eyebrow="Screenshots"
              title="Product surface"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {product.screenshots.map((shot) => (
                <div
                  className="aspect-[4/3] rounded-xl border border-border bg-secondary/40 p-5 shadow-sm"
                  key={shot}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {shot}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <SectionHeader
                description="The public direction without pretending the product is already finished."
                eyebrow="Roadmap"
                title="What ships next"
              />
              <ol className="grid gap-3">
                {product.roadmap.map((item, index) => (
                  <li
                    className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                    key={item}
                  >
                    {String(index + 1).padStart(2, "0")} {item}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-5">
              <SectionHeader
                description="A release-history slot is available before the first public launch."
                eyebrow="Changelog"
                title="Product updates"
              />
              <ul className="grid gap-3">
                {product.changelog.map((item) => (
                  <li
                    className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-5">
            <SectionHeader
              description="Straight answers for early product readers."
              eyebrow="FAQ"
              title="Product questions"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {product.faq.map((item) => (
                <div
                  className="rounded-xl border border-border bg-card p-6 shadow-sm"
                  key={item.question}
                >
                  <h2 className="text-lg font-semibold">{item.question}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
