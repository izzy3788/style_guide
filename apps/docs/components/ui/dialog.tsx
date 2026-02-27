"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  setTriggerElement: (element: HTMLElement | null) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

const dialogVariants = cva(
  "relative z-10 w-full rounded-lg bg-background shadow-lg",
  {
    variants: {
      size: {
        sm: "max-w-[22rem] p-5",
        md: "max-w-[28rem] p-6",
        lg: "max-w-[36rem] p-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type BodyStyleSnapshot = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflowX: string;
  overflowY: string;
};

type BodyScrollLockState = {
  lockCount: number;
  scrollX: number;
  scrollY: number;
  snapshot: BodyStyleSnapshot | null;
};

const bodyScrollLockState: BodyScrollLockState = {
  lockCount: 0,
  scrollX: 0,
  scrollY: 0,
  snapshot: null,
};

function lockBodyScroll() {
  if (typeof window === "undefined") return;

  const body = document.body;

  if (bodyScrollLockState.lockCount === 0) {
    bodyScrollLockState.scrollX = window.scrollX;
    bodyScrollLockState.scrollY = window.scrollY;
    bodyScrollLockState.snapshot = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflowX: body.style.overflowX,
      overflowY: body.style.overflowY,
    };

    body.style.position = "fixed";
    body.style.top = `-${bodyScrollLockState.scrollY}px`;
    body.style.left = `-${bodyScrollLockState.scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflowX = "hidden";
    body.style.overflowY = "scroll";
  }

  bodyScrollLockState.lockCount += 1;
}

function unlockBodyScroll() {
  if (typeof window === "undefined") return;
  if (bodyScrollLockState.lockCount === 0) return;

  bodyScrollLockState.lockCount -= 1;
  if (bodyScrollLockState.lockCount > 0) return;

  const body = document.body;
  const snapshot = bodyScrollLockState.snapshot;
  if (snapshot) {
    body.style.position = snapshot.position;
    body.style.top = snapshot.top;
    body.style.left = snapshot.left;
    body.style.right = snapshot.right;
    body.style.width = snapshot.width;
    body.style.overflowX = snapshot.overflowX;
    body.style.overflowY = snapshot.overflowY;
    window.scrollTo(bodyScrollLockState.scrollX, bodyScrollLockState.scrollY);
  }

  bodyScrollLockState.snapshot = null;
  bodyScrollLockState.scrollX = 0;
  bodyScrollLockState.scrollY = 0;
}

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

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const isControlled = typeof open === "boolean";
  const value = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const setTriggerElement = React.useCallback((element: HTMLElement | null) => {
    triggerRef.current = element;
  }, []);

  return (
    <DialogContext.Provider value={{ open: value, setOpen, triggerRef, setTriggerElement }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild = false,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) return children;

  const onClick = composeClickHandlers(
    children.props.onClick as React.MouseEventHandler | undefined,
    (event) => {
      ctx.setTriggerElement(event.currentTarget as HTMLElement);
      ctx.setOpen(true);
    },
  );

  if (asChild) {
    return React.cloneElement(children, { onClick });
  }

  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function DialogClose({
  asChild = false,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) return children;

  const onClick = composeClickHandlers(
    children.props.onClick as React.MouseEventHandler | undefined,
    () => ctx.setOpen(false),
  );

  if (asChild) {
    return React.cloneElement(children, { onClick });
  }

  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}

type DialogContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogVariants> & {
    children: React.ReactNode;
  };

export function DialogContent({
  size,
  className,
  children,
  ...props
}: DialogContentProps) {
  const ctx = React.useContext(DialogContext);
  const open = ctx?.open ?? false;
  const setOpen = ctx?.setOpen;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    restoreFocusRef.current =
      (document.activeElement as HTMLElement | null) ?? ctx?.triggerRef.current ?? null;

    const raf = window.requestAnimationFrame(() => {
      const root = contentRef.current;
      if (!root) return;

      const focusable = root.querySelectorAll<HTMLElement>(
        [
          'button:not([disabled])',
          'a[href]',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(","),
      );

      const first = Array.from(focusable).find(
        (node) => !node.hasAttribute("data-dialog-overlay"),
      );

      (first ?? root).focus();
    });

    return () => window.cancelAnimationFrame(raf);
  }, [open, ctx]);

  React.useEffect(() => {
    if (!open || !setOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  React.useEffect(() => {
    if (!open) return;

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
      const nextFocusTarget = ctx?.triggerRef.current ?? restoreFocusRef.current;
      if (nextFocusTarget && document.contains(nextFocusTarget)) {
        window.requestAnimationFrame(() => nextFocusTarget.focus());
      }
    };
  }, [open, ctx]);

  if (!ctx || !open || !setOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        data-dialog-overlay
        className="absolute inset-0 bg-gray-1000-40"
        onClick={() => setOpen(false)}
      />
      <div
        ref={contentRef}
        aria-modal="true"
        className={cn(dialogVariants({ size }), className)}
        role="dialog"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;

          const root = contentRef.current;
          if (!root) return;

          const focusable = Array.from(
            root.querySelectorAll<HTMLElement>(
              [
                'button:not([disabled])',
                'a[href]',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])',
              ].join(","),
            ),
          );

          if (!focusable.length) {
            event.preventDefault();
            root.focus();
            return;
          }

          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement as HTMLElement | null;

          if (event.shiftKey) {
            if (active === first || active === root) {
              event.preventDefault();
              last.focus();
            }
            return;
          }

          if (active === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-title-sm text-[color:var(--gray-900)]", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-body-sm text-muted-foreground", className)} {...props} />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-2", className)}
      {...props}
    />
  );
}
