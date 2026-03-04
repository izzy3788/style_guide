"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import DocsSidebar, {
  DOCS_SIDEBAR_COLLAPSE_ENABLED,
} from "@/components/docs/docs-sidebar";
import DocsNav from "@/components/docs/docs-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const isCollapsed = DOCS_SIDEBAR_COLLAPSE_ENABLED ? collapsed : false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="fixed inset-x-0 top-0 z-40 flex items-center gap-3 border-b border-border bg-background px-4 py-2 lg:hidden">
        <button
          type="button"
          aria-label="메뉴 열기"
          className="rounded-md border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="text-body-sm font-semibold text-foreground">Style Guide</div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" desktopWidth={320} className="lg:hidden">
          <div className="flex h-full flex-col">
            <div className="border-b border-border">
              <div className="flex h-[60px] items-center px-4">
                <div className="text-body-sm font-semibold text-foreground">Style Guide</div>
              </div>
              <div className="px-4 pb-4">
                <Input
                  aria-label="문서 검색"
                  value={mobileQuery}
                  onChange={(event) => setMobileQuery(event.target.value)}
                  onClear={() => setMobileQuery("")}
                  clearable
                  placeholder="컴포넌트/가이드 검색"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 [scrollbar-gutter:auto]">
              <DocsNav query={mobileQuery} onItemSelect={() => setMobileOpen(false)} />
            </div>
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-[color:var(--gray-50)] px-3 py-2">
                <Avatar size="sm">
                  <AvatarFallback>IZ</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-body-sm text-[color:var(--gray-900)]">Izzy Kim</div>
                  <div className="truncate text-caption text-muted-foreground">Design System Team</div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex w-full">
        <DocsSidebar
          className="hidden lg:flex"
          collapsed={isCollapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
          enableCollapse={DOCS_SIDEBAR_COLLAPSE_ENABLED}
        />

        <main
          className={cn(
            "flex min-h-screen min-w-0 flex-1 pt-[72px] transition-[padding] duration-200 lg:pt-0",
            isCollapsed ? "lg:pl-[136px]" : "lg:pl-[304px]"
          )}
        >
          <div className="mx-auto w-full max-w-[920px] px-8 pb-10 pt-6 md:pt-10">
            <article className="docs-content prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none space-y-12">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
