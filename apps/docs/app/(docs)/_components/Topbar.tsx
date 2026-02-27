"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-border bg-[color:var(--gray-50)] backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open navigation"
            className="rounded-md border border-border p-2 text-[color:var(--gray-700)] transition hover:bg-[color:var(--gray-100)] lg:hidden"
            onClick={() => setOpen(true)}
            type="button"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
          <Link className="text-body-sm font-semibold text-[color:var(--gray-900)]" href="/">
            Design System Docs
          </Link>
        </div>
        <div className="text-caption text-[color:var(--gray-500)]">Internal Docs</div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-scrim-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-[color:var(--gray-50)] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-body-sm font-semibold text-[color:var(--gray-900)]">
                Navigation
              </span>
              <button
                className="rounded-md border border-border px-2 py-1 text-caption text-muted-foreground"
                onClick={() => setOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
