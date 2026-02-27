import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="pagination"
      className={cn("w-full", className)}
      role="navigation"
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center", className)} {...props} />;
}

export interface PaginationLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className" | "type"> {
  className?: string;
  isActive?: boolean;
  size?: "default" | "icon";
  type?: "number" | "dot";
}

export function PaginationLink({
  className,
  isActive = false,
  size = "icon",
  type = "number",
  children,
  ...props
}: PaginationLinkProps) {
  if (type === "dot") {
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          "enabled:hover:bg-muted",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 rounded-full bg-[color:var(--gray-300)] transition-colors",
            isActive && "bg-[color:var(--gray-900)]"
          )}
        />
        {children ? <span className="sr-only">{children}</span> : null}
      </Link>
    );
  }

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size: size === "icon" ? "icon" : "default",
        }),
        size === "icon"
          ? "h-9 w-9 text-body-sm"
          : "h-9 min-w-9 px-3 text-body-sm",
        isActive &&
          "border-[color:var(--gray-300)] bg-[color:var(--gray-00)] text-[color:var(--gray-900)] shadow-none",
        !isActive && "text-[color:var(--gray-700)]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function PaginationPrevious({
  showLabel = true,
  className,
  ...props
}: Omit<PaginationLinkProps, "children"> & { showLabel?: boolean }) {
  return (
    <PaginationLink
      aria-label="이전 페이지"
      className={cn(showLabel ? "w-auto gap-1 px-2.5" : "h-9 w-9 px-0", className)}
      size="default"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      {showLabel ? <span>이전</span> : <span className="sr-only">이전 페이지</span>}
    </PaginationLink>
  );
}

export function PaginationNext({
  showLabel = true,
  className,
  ...props
}: Omit<PaginationLinkProps, "children"> & { showLabel?: boolean }) {
  return (
    <PaginationLink
      aria-label="다음 페이지"
      className={cn(showLabel ? "w-auto gap-1 px-2.5" : "h-9 w-9 px-0", className)}
      size="default"
      {...props}
    >
      {showLabel ? <span>다음</span> : <span className="sr-only">다음 페이지</span>}
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--gray-500)]",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">더 많은 페이지</span>
    </span>
  );
}
