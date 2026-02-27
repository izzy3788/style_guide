"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type PreviewFrameProps = React.HTMLAttributes<HTMLDivElement>;

export function PreviewFrame({ className, ...props }: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "min-h-[260px] overflow-hidden rounded-xl border border-border bg-muted-30 p-6 flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
}
