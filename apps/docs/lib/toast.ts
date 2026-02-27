"use client";

export type ToastVariant = "default" | "info" | "success" | "warning" | "destructive";

export type ToastPayload = {
  title?: string;
  description?: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
};

export const TOAST_EVENT = "app-toast";

export function showToast(payload: string | ToastPayload) {
  const detail = typeof payload === "string" ? { message: payload } : payload;

  window.dispatchEvent(
    new CustomEvent<ToastPayload>(TOAST_EVENT, {
      detail,
    }),
  );
}
