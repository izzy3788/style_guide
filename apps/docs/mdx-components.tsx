import * as React from "react";

import { cn } from "@/lib/utils";

type WithClassName = { className?: string };

export function useMDXComponents(
  components: Record<string, React.ComponentType<Record<string, unknown>>>
) {
  return {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & WithClassName) => (
      <h1 className={cn("text-title-xl", className)} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & WithClassName) => (
      <h2 className={cn("text-title-lg", className)} {...props} />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & WithClassName) => (
      <h3 className={cn("text-title-md", className)} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement> & WithClassName) => (
      <p className={cn("text-body-md", className)} {...props} />
    ),
    small: ({ className, ...props }: React.HTMLAttributes<HTMLElement> & WithClassName) => (
      <small className={cn("text-caption", className)} {...props} />
    ),
    ...components,
  };
}
