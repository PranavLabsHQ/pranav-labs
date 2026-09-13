import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { articles } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing from Pranav Labs on software engineering, AI, automation, and product development.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        description="Notes on software engineering, AI systems, automation, product decisions, and building a company with technical depth."
        eyebrow="Blog"
        title="Writing that teaches, not filler."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Card className="h-full" key={article.title}>
              <CardHeader>
                <p className="text-sm font-medium text-primary">
                  {article.category} - {article.date}
                </p>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
