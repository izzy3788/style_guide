"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const radioItemVariants = cva(
  "cursor-pointer rounded-full border-[color:var(--gray-400)] text-[color:var(--selection-primary-border)] accent-[color:var(--selection-primary-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring-strong)] focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-[color:var(--gray-300)] disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement>;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <div className={cn("space-y-3", className)} role="radiogroup" {...props} />;
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof radioItemVariants> {}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, size, ...props }, ref) => (
    <input ref={ref} type="radio" className={cn(radioItemVariants({ size }), className)} {...props} />
  )
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioItemVariants };
