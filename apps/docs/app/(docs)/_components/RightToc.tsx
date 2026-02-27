"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "");
}

export default function RightToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = document.querySelector(".docs-content");
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll("h2, h3")
    ) as HTMLElement[];

    const tocItems: TocItem[] = headings.map((heading) => {
      const level: TocItem["level"] = heading.tagName === "H2" ? 2 : 3;
      let id = heading.id;
      if (!id) {
        id = slugify(heading.textContent || "section");
        heading.id = id;
      }
      return { id, text: heading.textContent || "", level };
    });

    const frame = window.requestAnimationFrame(() => {
      setItems(tocItems);
      setActiveId(tocItems[0]?.id ?? null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!items.length) return;

    const onScroll = () => {
      const offset = 80;
      let currentId = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          currentId = item.id;
        }
      }
      if (currentId) setActiveId(currentId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const toc = useMemo(() => items, [items]);

  if (!toc.length) return null;

  return (
    <div className="space-y-3 text-body-sm">
      <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
        On this page
      </div>
      <nav className="space-y-2">
        {toc.map((item) => (
          <a
            key={item.id}
            className={
              "block text-body-sm transition " +
              (item.level === 3 ? "pl-3" : "") +
              (activeId === item.id
                ? " text-[color:var(--gray-900)]"
                : " text-muted-foreground hover:text-[color:var(--gray-900)]")
            }
            href={`#${item.id}`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
