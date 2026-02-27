"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  openValues: string[];
  toggleValue: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

type AccordionItemContextValue = {
  value: string;
  open: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(
  null,
);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function toArray(value: AccordionProps["value"] | AccordionProps["defaultValue"]) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export function Accordion({
  className,
  type = "single",
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    toArray(defaultValue),
  );
  const isControlled = value !== undefined;
  const openValues = isControlled ? toArray(value) : internalValue;

  const toggleValue = React.useCallback(
    (nextValue: string) => {
      const currentlyOpen = openValues.includes(nextValue);
      let nextOpenValues: string[];

      if (type === "single") {
        if (currentlyOpen) {
          nextOpenValues = collapsible ? [] : [nextValue];
        } else {
          nextOpenValues = [nextValue];
        }
      } else {
        nextOpenValues = currentlyOpen
          ? openValues.filter((v) => v !== nextValue)
          : [...openValues, nextValue];
      }

      if (!isControlled) {
        setInternalValue(nextOpenValues);
      }

      onValueChange?.(type === "single" ? (nextOpenValues[0] ?? "") : nextOpenValues);
    },
    [collapsible, isControlled, onValueChange, openValues, type],
  );

  return (
    <AccordionContext.Provider value={{ type, openValues, toggleValue }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export function AccordionItem({
  className,
  value,
  disabled = false,
  children,
  ...props
}: AccordionItemProps) {
  const ctx = React.useContext(AccordionContext);
  const open = ctx?.openValues.includes(value) ?? false;

  return (
    <AccordionItemContext.Provider value={{ value, open }}>
      <div
        data-disabled={disabled ? "" : undefined}
        data-state={open ? "open" : "closed"}
        className={cn(
          "border-b border-border last:border-b-0",
          "data-[disabled]:opacity-60",
          className,
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(
            child as React.ReactElement<{ disabled?: boolean }>,
            { disabled },
          );
        })}
      </div>
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function AccordionTrigger({
  className,
  children,
  disabled,
  onClick,
  ...props
}: AccordionTriggerProps) {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);
  if (!accordion || !item) return null;

  const contentId = `accordion-content-${item.value}`;
  const triggerId = `accordion-trigger-${item.value}`;

  return (
    <h3 className="flex">
      <button
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={item.open}
        type="button"
        disabled={disabled}
        className={cn(
          "group flex w-full items-center justify-between gap-3 py-4 text-left text-body-sm font-medium text-[color:var(--gray-900)] transition-colors",
          "enabled:hover:text-[color:var(--gray-1000)] disabled:cursor-not-allowed",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || disabled) return;
          accordion.toggleValue(item.value);
        }}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground",
            item.open && "rotate-180",
          )}
        />
      </button>
    </h3>
  );
}

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const item = React.useContext(AccordionItemContext);
  if (!item) return null;

  const contentId = `accordion-content-${item.value}`;
  const triggerId = `accordion-trigger-${item.value}`;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!item.open}
      data-state={item.open ? "open" : "closed"}
      className={cn("pb-4", className)}
      {...props}
    >
      <div className="text-body-sm text-[color:var(--gray-700)]">{children}</div>
    </div>
  );
}
