"use client";

import { Blocks, ChevronDown, LayoutGrid, NotebookText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { docsNav, type NavSection } from "./nav";

function NavSectionList({
  section,
  pathname,
  open,
  onToggle,
}: {
  section: NavSection;
  pathname: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-0">
        <button
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-md px-3 py-1 text-left text-body-sm uppercase tracking-widest text-[color:var(--gray-1000)] transition-colors hover:bg-muted-60 hover:text-[color:var(--gray-1000)]"
          onClick={onToggle}
          type="button"
        >
          <span>{section.title}</span>
          <ChevronDown
            className={cn(
              "h-[13.5px] w-[13.5px] transition-transform",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </SidebarGroupLabel>
      <SidebarGroupContent className={cn(!open && "hidden")}>
        <SidebarMenu className="space-y-1">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton isActive={isActive} asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "no-underline text-body-sm text-foreground-80",
                      "hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    )}
                  >
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const collapsedSectionIcons = {
  FOUNDATIONS: LayoutGrid,
  COMPONENTS: Blocks,
  GUIDELINES: NotebookText,
} as const;

function CollapsedNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="문서 사이드 내비게이션" className="space-y-2">
      {docsNav.map((section) => {
        const firstItem = section.items[0];
        const Icon = collapsedSectionIcons[section.title as keyof typeof collapsedSectionIcons] ?? LayoutGrid;
        const isActive = section.items.some((item) => pathname === item.href);

        return (
          <SidebarMenu key={section.title} className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton isActive={isActive} asChild>
                <Link
                  href={firstItem.href}
                  title={section.title}
                  aria-label={section.title}
                  className="flex justify-center"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        );
      })}
    </nav>
  );
}

export default function DocsNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    return docsNav.reduce<Record<string, boolean>>((acc, section, index) => {
      const hasActiveItem = section.items.some((item) => item.href === pathname);
      acc[section.title] = hasActiveItem || index === 0;
      return acc;
    }, {});
  });

  if (collapsed) {
    return <CollapsedNav pathname={pathname} />;
  }

  return (
    <nav aria-label="문서 사이드 내비게이션" className="space-y-6">
      {docsNav.map((section) => (
        <NavSectionList
          key={section.title}
          section={section}
          pathname={pathname}
          open={openSections[section.title] ?? section.items.some((item) => item.href === pathname)}
          onToggle={() =>
            setOpenSections((prev) => ({
              ...prev,
              [section.title]: !prev[section.title],
            }))
          }
        />
      ))}
    </nav>
  );
}
