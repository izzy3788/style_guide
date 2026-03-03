"use client";

import { useState } from "react";
import DocsSidebar, {
  DOCS_SIDEBAR_COLLAPSE_ENABLED,
} from "@/components/docs/docs-sidebar";
import { cn } from "@/lib/utils";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isCollapsed = DOCS_SIDEBAR_COLLAPSE_ENABLED ? collapsed : false;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="flex w-full">
        <DocsSidebar
          collapsed={isCollapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
          enableCollapse={DOCS_SIDEBAR_COLLAPSE_ENABLED}
        />

        <main
          className={cn(
            "flex min-h-screen min-w-0 flex-1 transition-[padding] duration-200",
            isCollapsed ? "pl-[136px]" : "pl-[304px]"
          )}
        >
          <div className="mx-auto w-full max-w-[920px] px-8 py-10">
            <article className="docs-content prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none space-y-12">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
