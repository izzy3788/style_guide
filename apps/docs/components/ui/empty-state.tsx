import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-3 py-6",
        md: "gap-4 py-10",
        lg: "gap-5 py-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type EmptyStateContextValue = {
  size: NonNullable<VariantProps<typeof emptyStateVariants>["size"]>;
};

const EmptyStateContext = React.createContext<EmptyStateContextValue | null>(null);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

export function EmptyState({
  className,
  size,
  children,
  ...props
}: EmptyStateProps) {
  const resolvedSize = size ?? "md";

  return (
    <EmptyStateContext.Provider value={{ size: resolvedSize }}>
      <div className={cn(emptyStateVariants({ size: resolvedSize }), className)} {...props}>
        {children}
      </div>
    </EmptyStateContext.Provider>
  );
}

export function EmptyStateIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const size = React.useContext(EmptyStateContext)?.size ?? "md";
  const sizeClass =
    size === "sm"
      ? "h-10 w-10"
      : size === "lg"
        ? "h-14 w-14"
        : "h-12 w-12";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-[color:var(--gray-00)] text-[color:var(--gray-700)]",
        sizeClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function EmptyStateHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function EmptyStateTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-title-sm text-[color:var(--gray-900)]", className)}
      {...props}
    />
  );
}

export function EmptyStateDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-md text-body-sm text-[color:var(--gray-700)] whitespace-normal break-keep",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}
