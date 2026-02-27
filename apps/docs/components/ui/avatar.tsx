"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type AvatarStatus = "idle" | "loaded" | "error";

type AvatarContextValue = {
  status: AvatarStatus;
  setStatus: (status: AvatarStatus) => void;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function getFallbackCharacter(children: React.ReactNode) {
  const values = React.Children.toArray(children);
  if (
    values.length > 0 &&
    values.every(
      (value) => typeof value === "string" || typeof value === "number",
    )
  ) {
    const text = values.join("").trim();
    const normalized = text.replace(/\s+/g, "");
    return Array.from(normalized)[0] ?? "";
  }

  return children;
}

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[color:var(--gray-100)] text-[color:var(--gray-700)] select-none",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-caption",
        md: "h-10 w-10 text-body-sm",
        lg: "h-12 w-12 text-body-sm",
        xl: "h-16 w-16 text-title-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

export function Avatar({ className, size, children, ...props }: AvatarProps) {
  const [status, setStatus] = React.useState<AvatarStatus>("idle");

  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <div className={cn(avatarVariants({ size }), className)} {...props}>
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> & { alt: string }
>(({ className, onLoad, onError, ...props }, ref) => {
  const ctx = React.useContext(AvatarContext);
  const { alt, ...rest } = props;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      className={cn(
        "h-full w-full object-cover",
        ctx?.status === "loaded" ? "block" : "hidden",
        className,
      )}
      onLoad={(event) => {
        ctx?.setStatus("loaded");
        onLoad?.(event);
      }}
      onError={(event) => {
        ctx?.setStatus("error");
        onError?.(event);
      }}
      {...rest}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AvatarContext);
  const showFallback = !ctx || ctx.status !== "loaded";
  const fallbackContent = getFallbackCharacter(children);

  return (
    <span
      ref={ref}
      aria-hidden={!showFallback}
      className={cn(
        "flex h-full w-full items-center justify-center bg-[color:var(--gray-100)] font-medium uppercase",
        showFallback ? "flex" : "hidden",
        className,
      )}
      {...props}
    >
      {fallbackContent}
    </span>
  );
});
AvatarFallback.displayName = "AvatarFallback";
