import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Pranav Labs plans to publish useful, documented, and maintained developer tools.",
};

const openSourcePrinciples = [
  "Solve one clear problem.",
  "Document setup, usage, and trade-offs.",
  "Maintain the project after publishing.",
  "Teach something useful to other engineers.",
];

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        description="Open source is part of the company direction. Projects will be small, useful, documented, and maintained."
        eyebrow="Open Source"
        title="Useful developer tools, shared with care."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
              Public work should be worth studying.
            </h2>
          </div>
          <div className="grid gap-4">
            {openSourcePrinciples.map((principle) => (
              <div
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                key={principle}
              >
                <p className="text-lg font-medium">{principle}</p>
              </div>
            ))}
            <Button asChild className="mt-4 w-fit" variant="secondary">
              <Link href="https://github.com">
                View GitHub
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
