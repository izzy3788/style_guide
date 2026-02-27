"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchRootVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-start rounded-full border-2 border-transparent p-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-[44px]",
        lg: "h-7 w-12",
      },
      appearance: {
        default:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-[color:var(--gray-300)]",
        line:
          "border-0 bg-transparent data-[state=checked]:bg-transparent data-[state=unchecked]:bg-transparent",
        bubble:
          "border-0 overflow-visible data-[state=checked]:bg-primary-100 data-[state=unchecked]:bg-[color:var(--gray-300)]",
      },
    },
    compoundVariants: [
      { size: "sm", appearance: "line", className: "w-10" },
      { size: "md", appearance: "line", className: "w-[52px]" },
      { size: "lg", appearance: "line", className: "w-[58px]" },
    ],
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  }
);

const switchTrackVariants = cva(
  "pointer-events-none absolute inset-y-0 left-0 right-0 m-auto rounded-full transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
      appearance: {
        default: "hidden",
        line: "block data-[state=checked]:bg-primary-200 data-[state=unchecked]:bg-[color:var(--gray-300)]",
        bubble: "hidden",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full ring-0 transition-transform duration-200 ease-in-out data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      appearance: {
        default: "bg-background",
        line: "bg-[color:var(--gray-00)] data-[state=checked]:bg-primary",
        bubble:
          "border border-transparent bg-[color:var(--gray-00)] data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      },
    },
    compoundVariants: [
      { size: "sm", appearance: "default", className: "h-4 w-4 data-[state=checked]:translate-x-4" },
      { size: "md", appearance: "default", className: "h-5 w-5 data-[state=checked]:translate-x-5" },
      { size: "lg", appearance: "default", className: "h-6 w-6 data-[state=checked]:translate-x-5" },
      { size: "sm", appearance: "line", className: "h-5 w-5 data-[state=checked]:translate-x-4" },
      { size: "md", appearance: "line", className: "h-6 w-6 data-[state=checked]:translate-x-6" },
      { size: "lg", appearance: "line", className: "h-7 w-7 data-[state=checked]:translate-x-[26px]" },
    ],
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchRootVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      appearance = "default",
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      onClick,
      disabled,
      readOnly,
      name,
      value = "on",
      required,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md";
    const isControlled = checkedProp !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      Boolean(defaultChecked)
    );
    const checked = isControlled ? Boolean(checkedProp) : uncontrolledChecked;
    const state = checked ? "checked" : "unchecked";
    const bubbleRootSizeClass =
      resolvedSize === "sm"
        ? "!h-3 !w-[32px]"
        : resolvedSize === "lg"
          ? "!h-5 !w-[48px]"
          : "!h-4 !w-[42px]";
    const bubbleThumbSizeClass =
      resolvedSize === "sm"
        ? "h-5 w-5 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-18px)]"
        : resolvedSize === "lg"
          ? "h-7 w-7 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-26px)]"
          : "h-6 w-6 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-22px)]";
    const lineThumbSizeClass =
      resolvedSize === "sm"
        ? "h-5 w-5 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-18px)]"
        : resolvedSize === "lg"
          ? "h-7 w-7 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-26px)]"
          : "h-6 w-6 data-[state=unchecked]:left-[-2px] data-[state=checked]:left-[calc(100%-22px)]";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled || readOnly) return;

      const next = !checked;
      if (!isControlled) setUncontrolledChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          data-state={state}
          disabled={disabled}
          className={cn(
            switchRootVariants({ size: resolvedSize, appearance }),
            appearance === "bubble" && bubbleRootSizeClass,
            className
          )}
          onClick={handleClick}
          {...props}
        >
          <span
            aria-hidden="true"
            data-state={state}
            className={cn(switchTrackVariants({ size, appearance }))}
          />
          {appearance === "bubble" ? (
            <span
              data-state={state}
              className={cn(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full border border-transparent bg-[color:var(--gray-00)] transition-[left,background-color,border-color,box-shadow] duration-200",
                "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
                bubbleThumbSizeClass,
                disabled && "!border-transparent !bg-[color:var(--gray-400)]",
                disabled
                  ? "shadow-none"
                  : "shadow-[0_2px_8px_rgba(31,35,43,0.16)]"
              )}
            />
          ) : appearance === "line" ? (
            <span
              data-state={state}
              className={cn(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-[color:var(--gray-00)] transition-[left,background-color,box-shadow] duration-200",
                "data-[state=checked]:bg-primary",
                lineThumbSizeClass,
                disabled && "!bg-[color:var(--gray-400)]",
                disabled
                  ? "shadow-none"
                  : "shadow-[0_2px_8px_rgba(31,35,43,0.16)]"
              )}
            />
          ) : (
            <span
              data-state={state}
              className={cn(
                switchThumbVariants({ size: resolvedSize, appearance }),
                disabled
                  ? "shadow-none"
                  : "shadow-[0_2px_8px_rgba(31,35,43,0.16)]"
              )}
            />
          )}
        </button>
        {name ? (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={disabled}
            readOnly
            hidden
          />
        ) : null}
      </>
    );
  }
);
Switch.displayName = "Switch";

export { Switch, switchRootVariants, switchThumbVariants };
