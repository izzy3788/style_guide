"use client";

import * as React from "react";

import {
  Switch,
  switchRootVariants as toggleTrackVariants,
  switchThumbVariants as toggleThumbVariants,
  type SwitchProps as ToggleProps,
} from "@/components/ui/switch";

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
  return <Switch ref={ref} {...props} />;
});
Toggle.displayName = "Toggle";

export { Toggle, toggleTrackVariants, toggleThumbVariants };
export type { ToggleProps };
