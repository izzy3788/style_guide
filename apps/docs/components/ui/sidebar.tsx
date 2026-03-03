"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const SidebarContext = React.createContext<{ open: boolean }>({ open: true });

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContext.Provider value={{ open: true }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn(
        "flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-background",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-6", className)}>{children}</div>
  );
}

export function SidebarContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto [scrollbar-gutter:stable] px-3 pb-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarFooter({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-border p-3", className)}>{children}</div>;
}

export function SidebarGroup({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function SidebarGroupLabel({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 text-caption uppercase tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarGroupContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}

export function SidebarMenu({
  className,
  children,
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)}>{children}</ul>;
}

export function SidebarMenuItem({
  className,
  children,
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("list-none", className)}>{children}</li>;
}

export function SidebarMenuButton({
  className,
  isActive,
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  asChild?: boolean;
}) {
  const classes = cn(
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
    isActive
      ? "bg-muted font-medium text-foreground"
      : "text-foreground-80 hover:bg-muted-60 hover:text-foreground",
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}

export function SidebarInset({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1", className)}>{children}</div>;
}
