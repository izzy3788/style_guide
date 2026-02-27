"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;
  const contentId = React.useId().replace(/:/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (!resolvedOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [resolvedOpen, setOpen]);

  return (
    <PopoverContext.Provider value={{ open: resolvedOpen, setOpen, contentId }}>
      <div ref={rootRef} className="relative inline-flex">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  asChild = false,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) return null;

  const triggerProps = {
    type: "button" as const,
    "aria-expanded": ctx.open,
    "aria-controls": ctx.contentId,
    onClick: () => ctx.setOpen(!ctx.open),
  };

  if (asChild) {
    return <Slot {...triggerProps}>{children}</Slot>;
  }

  return (
    <button
      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-body-sm shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      {...triggerProps}
    >
      {children}
    </button>
  );
}

export function PopoverClose({
  asChild = false,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) return children;

  const onClick: React.MouseEventHandler = (event) => {
    children.props.onClick?.(event);
    if (event.defaultPrevented) return;
    ctx.setOpen(false);
  };

  if (asChild) {
    return React.cloneElement(children, { onClick });
  }

  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  size = "md",
  textWrap = "normal",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  size?: "sm" | "md" | "lg";
  textWrap?: "normal" | "keep";
}) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx || !ctx.open) return null;

  const sideClasses = {
    top: "bottom-full mb-2",
    right: "left-full ml-2 top-0",
    bottom: "top-full mt-2",
    left: "right-full mr-2 top-0",
  } as const;

  const alignClasses = {
    top: {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    },
    bottom: {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    },
    left: {
      start: "top-0",
      center: "top-1/2 -translate-y-1/2",
      end: "bottom-0",
    },
    right: {
      start: "top-0",
      center: "top-1/2 -translate-y-1/2",
      end: "bottom-0",
    },
  } as const;

  const style =
    side === "top" || side === "bottom"
      ? { marginTop: side === "bottom" ? sideOffset : undefined, marginBottom: side === "top" ? sideOffset : undefined }
      : { marginLeft: side === "right" ? sideOffset : undefined, marginRight: side === "left" ? sideOffset : undefined };

  const sizeClasses = {
    sm: "w-72 min-w-72 max-w-sm",
    md: "w-96 min-w-[18rem] max-w-md",
    lg: "w-[32rem] min-w-[18rem] max-w-xl",
  } as const;

  const textWrapClasses = {
    normal: "whitespace-normal break-words hyphens-none leading-relaxed [word-break:normal]",
    keep: "whitespace-normal break-keep hyphens-none leading-relaxed [word-break:keep-all]",
  } as const;

  return (
    <div
      id={ctx.contentId}
      role="dialog"
      className={cn(
        "absolute z-50 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md",
        "[overflow-wrap:normal] [writing-mode:horizontal-tb] [text-orientation:mixed]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        sideClasses[side],
        alignClasses[side][align],
        sizeClasses[size],
        textWrapClasses[textWrap],
        className,
      )}
      data-state="open"
      {...props}
      style={{ ...style, ...props.style }}
    >
      {children}
    </div>
  );
}
