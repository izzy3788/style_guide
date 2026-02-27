"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-xs)] border border-[color:var(--gray-300)] bg-[color:var(--gray-00)] text-transparent transition-colors duration-200 peer-checked:border-[color:var(--selection-primary-border)] peer-checked:bg-[color:var(--selection-primary-bg)] peer-checked:text-[color:var(--selection-primary-fg)] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[color:var(--control-focus-ring)] peer-disabled:cursor-not-allowed peer-disabled:border-[color:var(--gray-200)] peer-disabled:bg-[color:var(--gray-100)] peer-disabled:text-[color:var(--gray-400)]",
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

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    return (
      <span
        className={cn(
          "relative inline-flex shrink-0",
          resolvedSize === "sm" && "h-4 w-4",
          resolvedSize === "md" && "h-5 w-5",
          resolvedSize === "lg" && "h-6 w-6",
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...props}
        />
        <span className={cn(checkboxVariants({ size: resolvedSize }), className)}>
          <Check
            className={cn(
              "transition-colors",
              resolvedSize === "sm" && "h-3 w-3",
              resolvedSize === "md" && "h-3.5 w-3.5",
              resolvedSize === "lg" && "h-4 w-4",
            )}
          />
        </span>
      </span>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
