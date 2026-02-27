import * as React from "react";
import Link from "next/link";
import { ChevronRight, Ellipsis } from "lucide-react";

import { cn } from "@/lib/utils";

export function Breadcrumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export function BreadcrumbList({
  className,
  ...props
}: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-body-sm text-[color:var(--gray-700)]",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[color:var(--gray-700)] no-underline transition-colors hover:text-[color:var(--gray-900)]",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbCurrent({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-[color:var(--gray-900)]", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      aria-hidden="true"
      className={cn("inline-flex items-center text-[color:var(--gray-500)]", className)}
      {...props}
    >
      {children ?? <ChevronRight className="h-3.5 w-3.5 [stroke-width:1.25]" />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md text-[color:var(--gray-500)]",
        className,
      )}
      {...props}
    >
      <Ellipsis className="h-4 w-4" />
    </span>
  );
}
