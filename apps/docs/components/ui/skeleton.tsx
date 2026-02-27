import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse bg-[color:var(--gray-200)]",
  {
    variants: {
      shape: {
        rect: "rounded-md",
        pill: "rounded-full",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "rect",
    },
  },
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({ className, shape, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ shape }), className)} {...props} />;
}
