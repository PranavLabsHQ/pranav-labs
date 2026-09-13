import { Badge } from "@/components/ui/badge";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="aurora-surface border-b border-border py-16 md:py-24">
      <div className="container-wide max-w-4xl space-y-6">
        <Badge variant="outline">{eyebrow}</Badge>
        <h1 className="text-balance text-4xl font-bold tracking-[-0.025em] md:text-6xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground md:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
