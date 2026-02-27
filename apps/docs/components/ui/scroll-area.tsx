import * as React from "react";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 overflow-auto", className)}
    {...props}
  />
));
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
