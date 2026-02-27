import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  base: "inline-flex items-center rounded-full border border-border bg-muted text-foreground leading-none",
  outline: "bg-transparent",
  size: {
    sm: "px-2 py-0.5 text-caption",
    md: "px-2.5 py-1 text-caption",
    lg: "px-3 py-1 text-body-sm",
  },
};

export function Badge({
  className,
  variant = "base",
  size = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeVariants.size;
}) {
  return (
    <div
      className={cn(
        badgeVariants.base,
        badgeVariants[variant],
        badgeVariants.size[size],
        className
      )}
      {...props}
    />
  );
}
