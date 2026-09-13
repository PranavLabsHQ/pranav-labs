import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ContentGridItem = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
  icon?: LucideIcon;
};

type ContentGridProps = {
  items: ContentGridItem[];
};

export function ContentGrid({ items }: ContentGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                {Icon ? (
                  <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                ) : null}
                {item.meta ? (
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {item.meta}
                  </p>
                ) : null}
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        );

        return item.href ? (
          <Link href={item.href} key={item.title}>
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </div>
  );
}
