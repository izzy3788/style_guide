"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-foreground placeholder:text-[color:var(--gray-500)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] disabled:placeholder:text-[color:var(--gray-400)] read-only:border-[color:var(--gray-200)] read-only:bg-[color:var(--gray-50)] read-only:text-[color:var(--gray-700)] read-only:cursor-default read-only:hover:border-[color:var(--gray-200)] read-only:focus-visible:ring-0 read-only:focus-visible:border-[color:var(--gray-200)] aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)] resize-y",
  {
    variants: {
      size: {
        sm: "min-h-20 px-3 py-2 text-caption",
        md: "min-h-24 px-3 py-2.5 text-body-sm",
        lg: "min-h-32 px-4 py-3 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
