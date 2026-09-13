import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { openSourceProjects } from "@/content/ecosystem";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Pranav Labs open-source plans for PL UI, PL Icons, PL CLI, Starter Kit, and SaaS Boilerplate.",
};

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        description="Open source is part of the company direction. Projects will be small, useful, documented, and maintained before they are promoted."
        eyebrow="Open Source"
        title="Useful developer tools, shared with care."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-5 md:grid-cols-2">
          {openSourceProjects.map((project) => {
            const Icon = project.icon;

            return (
              <Card key={project.slug}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={project.githubHref}>GitHub placeholder</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={project.docsHref}>Docs placeholder</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="container-wide mt-10">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            href="/docs/open-source"
          >
            Read the open-source standards
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
