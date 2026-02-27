"use client";

import DocsNav from "./docs-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function DocsSidebar() {
  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-[240px] border-r border-border bg-background">
      <SidebarHeader className="px-6 py-6">
        <div className="text-body-sm font-semibold text-foreground">Style Guide</div>
      </SidebarHeader>
      <SidebarContent className="px-6 pb-6">
        <DocsNav />
      </SidebarContent>
    </Sidebar>
  );
}
