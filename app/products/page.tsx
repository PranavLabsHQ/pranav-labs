import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/content/ecosystem";
import { featuredProjects } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

const productProjects = products.flatMap((product) => {
  const project = featuredProjects.find(
    (featuredProject) => featuredProject.title === product.name,
  );

  return project ? [{ ...project, href: `/products/${product.slug}` }] : [];
});

export const metadata = createPageMetadata({
  title: "Products",
  description:
    "The product direction for Pranav Labs, including BuildNest and Aaspas.",
  path: "/products",
  keywords: ["BuildNest", "Aaspas", "software products"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        description="Pranav Labs is building reusable software alongside client systems. The first product tracks are prepared for public updates, changelogs, and roadmap work."
        eyebrow="Products"
        title="Products are the long-term destination."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide space-y-10">
          <div className="grid auto-rows-fr gap-6 lg:grid-cols-2 lg:gap-8">
            {productProjects.map((project) => (
              <Card
                className="featured-work-card flex h-full flex-col overflow-hidden border-neutral-200 bg-white"
                key={project.title}
              >
                <div
                  aria-label={`${project.title} project image placeholder`}
                  className="relative aspect-video overflow-hidden border-b border-neutral-200 bg-neutral-100"
                  role="img"
                >
                  <Badge
                    className="project-status-badge absolute left-4 top-4"
                    variant="outline"
                  >
                    {project.status}
                  </Badge>
                  <span
                    aria-hidden="true"
                    className="absolute left-[18%] top-[26%] h-[48%] w-[34%] border border-neutral-300 bg-white/60"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-[19%] top-[29%] aspect-square h-[42%] rounded-full border border-neutral-300"
                  />
                </div>

                <CardHeader className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                  <p className="text-xs font-medium uppercase text-neutral-500">
                    {project.type}
                  </p>
                  <CardTitle className="text-2xl text-neutral-950">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-600">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex items-end justify-between gap-4 p-6 pt-0 md:p-7 md:pt-0">
                  <ul
                    aria-label="Technology stack"
                    className="flex flex-wrap gap-2"
                  >
                    {project.stack.map((item) => (
                      <li
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary"
                    href={project.href}
                  >
                    View project
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            href="/roadmap"
          >
            View public roadmap
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
