"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/lib/utils";

type CardContextValue = {
  orientation: "vertical" | "horizontal";
  align: "start" | "center";
};

const CardContext = React.createContext<CardContextValue | null>(null);

const cardRootVariants = cva(
  "rounded-xl overflow-hidden bg-[color:var(--gray-00)] transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "shadow-none border-0",
      elevated: "shadow border-0 hover:shadow",
        outlined: "shadow-none border border-[color:var(--gray-200)]",
        subtle: "bg-[color:var(--gray-50)] shadow-none border-0",
      },
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "vertical",
    },
  }
);

export interface CardRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardRootVariants> {
  align?: "start" | "center";
  asChild?: boolean;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      className,
      variant,
      orientation = "vertical",
      align = "start",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const resolvedOrientation = orientation ?? "vertical";
    const Comp = asChild ? Slot : "div";
    return (
      <CardContext.Provider
        value={{
          orientation: resolvedOrientation,
          align,
        }}
      >
        <Comp
          ref={ref}
          className={cn(
            cardRootVariants({ variant, orientation: resolvedOrientation }),
            className
          )}
          {...props}
        />
      </CardContext.Provider>
    );
  }
);
CardRoot.displayName = "CardRoot";

const cardThumbnailVariants = cva("relative shrink-0 overflow-hidden", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "w-[160px] aspect-[4/3]",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface CardThumbnailProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardThumbnailVariants> {
  src?: string;
  alt?: string;
  aspect?: "16/9" | "4/3" | "square";
}

const CardThumbnail = React.forwardRef<HTMLDivElement, CardThumbnailProps>(
  ({ className, src, alt = "", aspect = "16/9", ...props }, ref) => {
    const context = React.useContext(CardContext);
    const orientation = context?.orientation ?? "vertical";
    const imageSrc = src ?? "";
    const hasImage = imageSrc.length > 0;
    const verticalAspect =
      aspect === "square"
        ? "aspect-square"
        : aspect === "4/3"
          ? "aspect-[4/3]"
          : "aspect-[16/9]";
    return (
      <div
        ref={ref}
        className={cn(
          cardThumbnailVariants({ orientation }),
          orientation === "vertical" && verticalAspect,
          !hasImage && "bg-[color:var(--gray-200)]",
          className
        )}
        {...props}
      >
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(min-width: 768px) 160px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" aria-hidden="true" />
        )}
      </div>
    );
  }
);
CardThumbnail.displayName = "CardThumbnail";

const cardContentVariants = cva("p-6 flex flex-col gap-2 min-w-0", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "flex-1",
    },
    align: {
      start: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    align: "start",
  },
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          cardContentVariants({
            orientation: context?.orientation ?? "vertical",
            align: context?.align ?? "start",
          }),
          className
        )}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-title-sm text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  clamp?: boolean;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, clamp = false, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-body-sm text-muted-foreground",
        clamp && "line-clamp-2",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const cardFooterVariants = cva("mt-4 flex items-center gap-2", {
  variants: {
    align: {
      start: "justify-start",
      center: "justify-center",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          cardFooterVariants({ align: context?.align ?? "start" }),
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

export {
  CardRoot,
  CardThumbnail,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
};
