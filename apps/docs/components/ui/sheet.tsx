"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function composeClickHandlers(
  original?: React.MouseEventHandler,
  next?: React.MouseEventHandler,
) {
  return (event: React.MouseEvent) => {
    original?.(event);
    if (event.defaultPrevented) return;
    next?.(event);
  };
}

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const value = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetContext.Provider value={{ open: value, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) return children;
  const props = {
    onClick: composeClickHandlers(
      children.props.onClick as React.MouseEventHandler | undefined,
      () => ctx.setOpen(true)
    ),
  };
  return asChild
    ? React.cloneElement(children, props)
    : React.cloneElement(children, props);
}

export function SheetClose({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) return children;
  const props = {
    onClick: composeClickHandlers(
      children.props.onClick as React.MouseEventHandler | undefined,
      () => ctx.setOpen(false)
    ),
  };
  return asChild
    ? React.cloneElement(children, props)
    : React.cloneElement(children, props);
}

export function SheetContent({
  side = "left",
  desktopWidth = 260,
  className,
  children,
}: {
  side?: "left" | "right";
  desktopWidth?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(SheetContext);
  const open = ctx?.open ?? false;
  const setOpen = ctx?.setOpen;
  const [useDesktopSide, setUseDesktopSide] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Use viewport width only: mobile/tablet full-width, desktop(lg+) side width.
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setUseDesktopSide(media.matches);
    sync();

    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!open || !setOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!ctx || !open || !setOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-scrim-30"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 h-full bg-background shadow-lg",
          side === "left" ? "left-0" : "right-0",
          className
        )}
        style={{ width: useDesktopSide ? `${desktopWidth}px` : "100%" }}
      >
        {children}
      </div>
    </div>
  );
}
