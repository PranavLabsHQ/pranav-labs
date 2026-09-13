import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featuredProjects } from "@/content/site";

export function FeaturedProjectsSection() {
  return (
    <section className="border-y border-border bg-card py-20 md:py-32">
      <div className="container-wide space-y-12">
        <SectionHeader
          description="Current work is focused on building a foundation for client delivery, internal systems, and future products."
          eyebrow="Featured work"
          title="Early systems with a product-company mindset."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeIn delay={index * 0.04} key={project.title}>
              <Card className="h-full bg-background">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-primary">
                      {project.type}
                    </p>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
