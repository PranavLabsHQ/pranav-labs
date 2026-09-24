import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featuredProjects } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjectsSection() {
  return (
    <section
      aria-label="Featured work"
      className="border-t border-neutral-100 bg-neutral-50 py-20 md:py-28"
    >
      <div className="container-wide flex flex-col gap-10 md:gap-14">
        <SectionHeader
          className="featured-work-heading mx-auto text-center"
          description="Current work is focused on client delivery systems, internal infrastructure, and product foundations."
          eyebrow="Featured work"
          title="Early systems built with product discipline."
        />
        <div className="grid auto-rows-fr gap-6 lg:grid-cols-3 lg:gap-8">
          {featuredProjects.map((project) => (
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
                  className="absolute right-[19%] top-[29%] h-[42%] aspect-square rounded-full border border-neutral-300"
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
                <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                  {project.stack.map((item) => (
                    <li
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <span
                  aria-disabled="true"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary"
                >
                  View project
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
