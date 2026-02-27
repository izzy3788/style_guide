import { cn } from "@/lib/utils";

type BlockProps = {
  className?: string;
  children: React.ReactNode;
};

export function Block({ className, children }: BlockProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
