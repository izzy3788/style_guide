"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TOAST_EVENT, type ToastPayload, type ToastVariant } from "@/lib/toast";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
};

const TOAST_DURATION_MS = 1800;
const TOAST_MAX_ITEMS = 4;

const toastVariants = cva(
  "pointer-events-auto min-w-[260px] rounded-lg border px-3 py-2 shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-[color:var(--gray-900)] bg-[color:var(--gray-1000)] text-[color:var(--gray-00)]",
        info: "border-info-25 bg-info-10 text-[color:var(--gray-900)]",
        success:
          "border-success-25 bg-success-10 text-[color:var(--gray-900)]",
        warning:
          "border-warning-30 bg-warning-10 text-[color:var(--gray-900)]",
        destructive:
          "border-error-25 bg-error-10 text-[color:var(--gray-900)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconByVariant = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  destructive: CircleX,
} as const;

const toastTitleColorByVariant = {
  default: "text-[color:var(--gray-00)]",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-error",
} as const;

const toastDescriptionColorByVariant = {
  default: "text-[color:var(--gray-400)]",
  info: "text-[color:var(--gray-800)]",
  success: "text-[color:var(--gray-800)]",
  warning: "text-[color:var(--gray-800)]",
  destructive: "text-[color:var(--gray-800)]",
} as const;

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>;
      const payload = customEvent.detail ?? {};
      const title = payload.title ?? payload.message;

      if (!title) return;

      const id = Date.now() + Math.floor(Math.random() * 1000);
      const duration = payload.duration ?? TOAST_DURATION_MS;
      const variant = payload.variant ?? "default";

      setToasts((prev) => {
        const next = [
          ...prev,
          {
            id,
            title,
            description: payload.description,
            variant,
            duration,
          },
        ];
        return next.slice(-TOAST_MAX_ITEMS);
      });

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(toastVariants({ variant: toast.variant }))}
          role="status"
          aria-live="polite"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = iconByVariant[toast.variant];
                return (
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      toastTitleColorByVariant[toast.variant],
                    )}
                    aria-hidden="true"
                  />
                );
              })()}
              <p
                className={cn(
                  "text-body-sm font-medium",
                  toastTitleColorByVariant[toast.variant],
                )}
              >
                {toast.title}
              </p>
            </div>
            {toast.description ? (
              <p
                className={cn(
                  "pl-6 text-caption",
                  toastDescriptionColorByVariant[toast.variant],
                )}
              >
                {toast.description}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
