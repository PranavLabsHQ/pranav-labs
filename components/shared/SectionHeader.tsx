import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl space-y-5", className)}>
      <Badge variant="outline">{eyebrow}</Badge>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-normal text-foreground md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
