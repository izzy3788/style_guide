"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  baseId: string;
  type: "fixed" | "scrollable";
  variant: "line" | "basic";
  size: "sm" | "md";
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function normalizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function tabId(baseId: string, value: string) {
  return `${baseId}-tab-${normalizeId(value)}`;
}

function panelId(baseId: string, value: string) {
  return `${baseId}-panel-${normalizeId(value)}`;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  type?: "fixed" | "scrollable";
  variant?: "line" | "basic";
  size?: "sm" | "md";
  value?: string;
}

export function Tabs({
  className,
  defaultValue,
  onValueChange,
  type = "fixed",
  variant = "line",
  size = "md",
  value,
  ...props
}: TabsProps) {
  const generatedId = React.useId().replace(/:/g, "");
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider
      value={{
        baseId: generatedId,
        type,
        variant,
        size,
        value: selectedValue,
        setValue,
      }}
    >
      <div className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  );
}

const tabsListWrapperVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        line: "border-b border-border bg-background",
        basic: "inline-flex w-fit bg-[color:var(--gray-200)]",
      },
      size: {
        sm: "",
        md: "",
      },
    },
    compoundVariants: [
      {
        variant: "basic",
        size: "sm",
        className: "rounded-md p-1",
      },
      {
        variant: "basic",
        size: "md",
        className: "rounded-lg p-1",
      },
    ],
    defaultVariants: {
      variant: "line",
      size: "md",
    },
  }
);

const tabsListViewportVariants = cva("w-full", {
  variants: {
    tabType: {
      fixed: "flex items-stretch",
      scrollable:
        "flex items-stretch gap-2 overflow-x-auto whitespace-nowrap touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    },
  },
  defaultVariants: {
    tabType: "fixed",
  },
});

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListWrapperVariants> {
  tabType?: "fixed" | "scrollable";
}

export function TabsList({
  className,
  tabType,
  children,
  size,
  ...props
}: TabsListProps) {
  const context = React.useContext(TabsContext);
  const resolvedType = tabType ?? context?.type ?? "fixed";
  const resolvedVariant = context?.variant ?? "line";
  const resolvedSize = size ?? context?.size ?? "md";
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = React.useState(false);
  const [showRightFade, setShowRightFade] = React.useState(false);
  const dragStateRef = React.useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const updateScrollHints = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el || resolvedType !== "scrollable") {
      setShowLeftFade(false);
      setShowRightFade(false);
      return;
    }

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (maxScrollLeft <= 1) {
      setShowLeftFade(false);
      setShowRightFade(false);
      return;
    }

    setShowLeftFade(el.scrollLeft > 2);
    setShowRightFade(el.scrollLeft < maxScrollLeft - 2);
  }, [resolvedType]);

  React.useEffect(() => {
    updateScrollHints();
    const el = viewportRef.current;
    if (!el || resolvedType !== "scrollable") return;

    const onScroll = () => updateScrollHints();
    el.addEventListener("scroll", onScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateScrollHints());
      ro.observe(el);
      if (el.firstElementChild instanceof HTMLElement) {
        ro.observe(el.firstElementChild);
      }
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro?.disconnect();
    };
  }, [resolvedType, updateScrollHints]);

  const overlayFromClass =
    resolvedVariant === "basic" ? "from-muted" : "from-background";

  return (
    <div
      className={cn(
        "relative",
        tabsListWrapperVariants({ variant: resolvedVariant, size: resolvedSize }),
        className
      )}
    >
      <div
        ref={viewportRef}
        className={cn(
          tabsListViewportVariants({ tabType: resolvedType }),
          resolvedType === "scrollable" &&
            "cursor-grab select-none active:cursor-grabbing"
        )}
        onClickCapture={(event) => {
          if (!dragStateRef.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          dragStateRef.current.moved = false;
        }}
        onKeyDown={(event) => {
          const container = event.currentTarget;
          const tabs = Array.from(
            container.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
          );
          if (!tabs.length) return;

          const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
          if (currentIndex < 0) return;

          const moveFocus = (nextIndex: number) => {
            const nextTab = tabs[nextIndex];
            nextTab?.focus();
            nextTab?.click();
            nextTab?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "nearest",
            });
          };

          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveFocus((currentIndex + 1) % tabs.length);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveFocus((currentIndex - 1 + tabs.length) % tabs.length);
          } else if (event.key === "Home") {
            event.preventDefault();
            moveFocus(0);
          } else if (event.key === "End") {
            event.preventDefault();
            moveFocus(tabs.length - 1);
          }
        }}
        onPointerDown={(event) => {
          if (resolvedType !== "scrollable") return;
          if (event.pointerType !== "mouse") return;
          if (event.button !== 0) return;

          const el = viewportRef.current;
          if (!el) return;
          if (el.scrollWidth <= el.clientWidth) return;

          dragStateRef.current = {
            active: true,
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: el.scrollLeft,
            moved: false,
          };

          (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const el = viewportRef.current;
          const drag = dragStateRef.current;
          if (!el || !drag.active) return;
          if (drag.pointerId !== event.pointerId) return;

          const deltaX = event.clientX - drag.startX;
          if (Math.abs(deltaX) > 4) {
            drag.moved = true;
          }

          el.scrollLeft = drag.startScrollLeft - deltaX;
          updateScrollHints();
        }}
        onPointerUp={(event) => {
          const drag = dragStateRef.current;
          if (drag.pointerId !== event.pointerId) return;
          drag.active = false;
        }}
        onPointerCancel={(event) => {
          const drag = dragStateRef.current;
          if (drag.pointerId !== event.pointerId) return;
          drag.active = false;
        }}
        role="tablist"
        {...props}
      >
        {children}
      </div>

      {resolvedType === "scrollable" && showLeftFade ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent",
            overlayFromClass
          )}
        />
      ) : null}
      {resolvedType === "scrollable" && showRightFade ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent",
            overlayFromClass
          )}
        />
      ) : null}
    </div>
  );
}

const tabsTriggerVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:text-[color:var(--gray-400)]",
  {
    variants: {
      variant: {
        line: "border-b-2",
        basic: "border border-transparent",
      },
      size: {
        sm: "px-2 text-[14px] leading-[150%]",
        md: "px-4 text-body-sm",
      },
      active: {
        false: "text-muted-foreground enabled:hover:text-foreground",
        true: "",
      },
      tabType: {
        fixed: "min-w-0",
        scrollable: "shrink-0",
      },
    },
    compoundVariants: [
      {
        variant: "line",
        tabType: "fixed",
        className: "flex-1",
      },
      {
        variant: "line",
        size: "sm",
        className: "h-10",
      },
      {
        variant: "line",
        size: "md",
        className: "h-12",
      },
      {
        variant: "basic",
        size: "sm",
        className: "h-8 rounded-md",
      },
      {
        variant: "basic",
        size: "md",
        className: "h-10 rounded-md",
      },
      {
        variant: "line",
        active: false,
        className: "border-transparent",
      },
      {
        variant: "line",
        active: true,
        className:
          "border-[color:var(--selection-primary-border)] text-[color:var(--action-secondary-fg)]",
      },
      {
        variant: "basic",
        active: true,
        className:
          "bg-background text-foreground shadow-[0_2px_6px_rgba(15,23,42,0.12)]",
      },
    ],
    defaultVariants: {
      variant: "line",
      size: "md",
      active: false,
      tabType: "fixed",
    },
  }
);

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

export function TabsTrigger({
  className,
  tabType,
  size,
  value,
  onClick,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) return null;

  const selected = context.value === value;
  const resolvedType = tabType ?? context.type;
  const resolvedVariant = context.variant;
  const resolvedSize = size ?? context.size;

  return (
    <button
      aria-controls={panelId(context.baseId, value)}
      aria-selected={selected}
      className={cn(
        tabsTriggerVariants({
          active: selected,
          tabType: resolvedType,
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        className
      )}
      id={tabId(context.baseId, value)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        context.setValue(value);
      }}
      role="tab"
      tabIndex={selected ? 0 : -1}
      type="button"
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  className,
  value,
  ...props
}: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) return null;

  const selected = context.value === value;

  return (
    <div
      aria-labelledby={tabId(context.baseId, value)}
      className={cn("pt-6", !selected && "hidden", className)}
      id={panelId(context.baseId, value)}
      role="tabpanel"
      tabIndex={0}
      {...props}
    />
  );
}
