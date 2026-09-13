import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-7 items-center rounded-full border px-3 text-xs font-medium leading-none tracking-[0.01em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/[0.08] text-primary",
        secondary:
          "border-border bg-secondary text-secondary-foreground",
        outline:
          "border-border bg-background/80 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
