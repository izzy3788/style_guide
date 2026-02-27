"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonGroupVariants = cva("inline-flex w-fit", {
  variants: {
    orientation: {
      horizontal:
        "flex-row [&>*]:rounded-none [&>*:not(:first-child)]:-ml-px [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
      vertical:
        "flex-col [&>*]:rounded-none [&>*:not(:first-child)]:-mt-px [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      role="group"
      {...props}
    />
  );
}

const buttonGroupSeparatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "my-1 w-px self-stretch",
      vertical: "mx-1 h-px w-auto",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface ButtonGroupSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupSeparatorVariants> {}

function ButtonGroupSeparator({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(buttonGroupSeparatorVariants({ orientation }), className)}
      role="separator"
      {...props}
    />
  );
}

const buttonGroupTextVariants = cva(
  "inline-flex items-center justify-center truncate border border-border bg-muted text-body-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-8 w-16 px-2 text-caption",
        md: "h-9 w-20 px-3 text-body-sm",
        lg: "h-10 w-24 px-4 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ButtonGroupTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof buttonGroupTextVariants> {
  asChild?: boolean;
}

function ButtonGroupText({
  className,
  size,
  asChild = false,
  ...props
}: ButtonGroupTextProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(buttonGroupTextVariants({ size }), className)} {...props} />;
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
