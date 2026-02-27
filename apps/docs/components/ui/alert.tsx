import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva("relative w-full rounded-lg border px-4 py-3", {
  variants: {
    variant: {
      default:
        "border-[color:var(--gray-300)] bg-[color:var(--gray-00)] text-[color:var(--gray-900)]",
      info: "border-info-25 bg-info-10 text-[color:var(--gray-900)]",
      success:
        "border-success-25 bg-success-10 text-[color:var(--gray-900)]",
      warning:
        "border-warning-30 bg-warning-10 text-[color:var(--gray-900)]",
      destructive:
        "border-error-25 bg-error-10 text-[color:var(--gray-900)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTitleVariants = cva("text-body-sm font-medium", {
  variants: {
    variant: {
      default: "text-[color:var(--gray-900)]",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertDescriptionVariants = cva("mt-1 text-caption", {
  variants: {
    variant: {
      default: "text-[color:var(--gray-700)]",
      info: "text-[color:var(--gray-800)]",
      success: "text-[color:var(--gray-800)]",
      warning: "text-[color:var(--gray-800)]",
      destructive: "text-[color:var(--gray-800)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;
const AlertVariantContext = React.createContext<AlertVariant>("default");

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const resolvedVariant = variant ?? "default";

  return (
    <AlertVariantContext.Provider value={resolvedVariant}>
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant: resolvedVariant }), className)}
        {...props}
      />
    </AlertVariantContext.Provider>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AlertVariantContext);
  return (
    <h5
      ref={ref}
      className={cn(alertTitleVariants({ variant }), className)}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AlertVariantContext);
  return (
    <p
      ref={ref}
      className={cn(alertDescriptionVariants({ variant }), className)}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
