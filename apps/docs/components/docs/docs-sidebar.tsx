"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DocsNav from "./docs-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function DocsSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <Sidebar
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-border bg-background transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <SidebarHeader
        className={cn(
          "flex items-center border-b border-border py-4",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        <Link
          href="/"
          className={cn(
            "text-body-sm font-semibold text-foreground no-underline",
            collapsed && "sr-only"
          )}
        >
          Style Guide
        </Link>
        <button
          type="button"
          aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
          className="rounded-md border border-border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={onToggle}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </SidebarHeader>
      <SidebarContent className={cn(collapsed ? "px-2 pb-4 pt-3" : "px-4 pb-4 pt-4")}>
        <DocsNav collapsed={collapsed} />
      </SidebarContent>
      <SidebarFooter className={cn("bg-background", collapsed ? "px-2 py-3" : "px-3 py-3")}>
        <div className={cn("flex items-center gap-3 rounded-lg border border-border bg-[color:var(--gray-50)]", collapsed ? "justify-center p-2" : "px-3 py-2")}>
          <Avatar size="sm">
            <AvatarFallback>IZ</AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-body-sm text-[color:var(--gray-900)]">Izzy Kim</div>
              <div className="truncate text-caption text-muted-foreground">Design System Team</div>
            </div>
          ) : null}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
