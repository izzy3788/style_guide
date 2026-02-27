"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-foreground placeholder:text-[color:var(--gray-500)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] disabled:placeholder:text-[color:var(--gray-400)] read-only:border-[color:var(--gray-200)] read-only:bg-[color:var(--gray-50)] read-only:text-[color:var(--gray-700)] read-only:cursor-default read-only:hover:border-[color:var(--gray-200)] read-only:focus-visible:ring-0 read-only:focus-visible:border-[color:var(--gray-200)] aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)]",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-9 px-3 text-body-sm",
        lg: "h-10 px-4 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
