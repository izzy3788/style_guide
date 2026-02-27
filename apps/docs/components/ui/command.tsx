"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type CommandItem = {
  value: string;
  label: string;
  group?: string;
  keywords?: string[];
  disabled?: boolean;
};

const commandRootVariants = cva(
  "w-full overflow-hidden rounded-xl border border-border bg-[color:var(--gray-00)] shadow-sm",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const commandInputVariants = cva(
  "w-full border-b border-border bg-[color:var(--gray-00)] text-foreground placeholder:text-[color:var(--gray-500)] focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "h-8 pl-8 pr-3 text-caption",
        md: "h-9 pl-9 pr-3 text-body-sm",
        lg: "h-10 pl-10 pr-4 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const commandListVariants = cva("", {
  variants: {
    size: {
      sm: "max-h-56",
      md: "max-h-64",
      lg: "max-h-72",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const commandItemVariants = cva(
  "relative flex w-full items-center text-left text-[color:var(--gray-800)] transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-9 px-3 text-body-sm",
        lg: "h-10 px-4 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const commandItemTypographyBySize = {
  sm: { fontSize: "12px", lineHeight: "140%", fontWeight: 400 },
  md: { fontSize: "14px", lineHeight: "150%", fontWeight: 400 },
  lg: { fontSize: "14px", lineHeight: "150%", fontWeight: 400 },
} as const;

export interface CommandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof commandRootVariants> {
  items: CommandItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelectItem?: (item: CommandItem) => void;
  placeholder?: string;
  emptyText?: string;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      size,
      items,
      value,
      defaultValue,
      onValueChange,
      onSelectItem,
      placeholder = "검색 또는 명령 입력...",
      emptyText = "검색 결과가 없습니다.",
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const baseId = React.useId().replace(/:/g, "");
    const inputId = `${baseId}-input`;
    const listboxId = `${baseId}-listbox`;
    const emptyId = `${baseId}-empty`;
    const [query, setQuery] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? String(value ?? "") : internalValue;
    const resolvedSize = size ?? "md";

    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    const filteredItems = React.useMemo(() => {
      const keyword = query.trim().toLowerCase();
      if (!keyword) return items;
      return items.filter((item) =>
        [item.label, item.value, item.group ?? "", ...(item.keywords ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      );
    }, [items, query]);

    const enabledItems = React.useMemo(
      () => filteredItems.filter((item) => !item.disabled),
      [filteredItems]
    );

    React.useEffect(() => {
      setActiveIndex((prev) => {
        if (!enabledItems.length) return -1;
        if (prev >= 0) return Math.min(prev, enabledItems.length - 1);
        const selectedIndex = enabledItems.findIndex((item) => item.value === selectedValue);
        return selectedIndex >= 0 ? selectedIndex : 0;
      });
    }, [enabledItems, selectedValue]);

    React.useEffect(() => {
      if (activeIndex < 0) return;
      itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const selectItem = (item: CommandItem) => {
      if (item.disabled) return;
      if (!isControlled) setInternalValue(item.value);
      onValueChange?.(item.value);
      onSelectItem?.(item);
    };

    const grouped = React.useMemo(() => {
      const map = new Map<string, CommandItem[]>();
      for (const item of filteredItems) {
        const key = item.group ?? "";
        const bucket = map.get(key);
        if (bucket) bucket.push(item);
        else map.set(key, [item]);
      }
      return Array.from(map.entries());
    }, [filteredItems]);

    const activeItem = activeIndex >= 0 ? enabledItems[activeIndex] : null;
    const activeDescendantId = activeItem ? `${baseId}-option-${activeItem.value}` : undefined;

    return (
      <div
        ref={rootRef}
        className={cn(commandRootVariants({ size: resolvedSize }), className)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!enabledItems.length) return;
            setActiveIndex((prev) => (prev < enabledItems.length - 1 ? prev + 1 : 0));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!enabledItems.length) return;
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : enabledItems.length - 1));
          } else if (event.key === "Enter") {
            if (activeIndex < 0) return;
            event.preventDefault();
            const item = enabledItems[activeIndex];
            if (item) selectItem(item);
          } else if (event.key === "Home") {
            if (!enabledItems.length) return;
            event.preventDefault();
            setActiveIndex(0);
          } else if (event.key === "End") {
            if (!enabledItems.length) return;
            event.preventDefault();
            setActiveIndex(enabledItems.length - 1);
          }
        }}
        {...props}
      >
        <div className="relative">
          <Search
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--gray-500)]",
              resolvedSize === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
            )}
          />
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={cn(commandInputVariants({ size: resolvedSize }))}
            placeholder={placeholder}
            aria-label={placeholder}
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded="true"
            aria-activedescendant={activeDescendantId}
            aria-describedby={!filteredItems.length ? emptyId : undefined}
          />
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={inputId}
          className={cn("overflow-auto py-1", commandListVariants({ size: resolvedSize }))}
        >
          {filteredItems.length ? (
            grouped.map(([group, groupItems], groupIndex) => (
              <div
                key={group || `group-${groupIndex}`}
                className="py-1"
                role={group ? "group" : undefined}
                aria-labelledby={group ? `${baseId}-group-${groupIndex}` : undefined}
              >
                {group ? (
                  <div
                    id={`${baseId}-group-${groupIndex}`}
                    className="px-3 py-1 text-caption text-[color:var(--gray-500)]"
                  >
                    {group}
                  </div>
                ) : null}
                <div>
                  {groupItems.map((item) => {
                    const enabledIndex = enabledItems.findIndex(
                      (enabled) => enabled.value === item.value
                    );
                    const highlighted =
                      !item.disabled && enabledIndex >= 0 && enabledIndex === activeIndex;
                    const selected = item.value === selectedValue;

                    return (
                      <button
                        key={item.value}
                        id={`${baseId}-option-${item.value}`}
                        type="button"
                        ref={(node) => {
                          if (enabledIndex >= 0) itemRefs.current[enabledIndex] = node;
                        }}
                        role="option"
                        aria-selected={selected}
                        aria-disabled={item.disabled || undefined}
                        disabled={item.disabled}
                        tabIndex={-1}
                        className={cn(
                          commandItemVariants({ size: resolvedSize }),
                          highlighted && "bg-muted-30 text-[color:var(--gray-900)]",
                          selected && !highlighted && "bg-[color:var(--gray-50)]"
                        )}
                        style={commandItemTypographyBySize[resolvedSize]}
                        onMouseEnter={() => {
                          if (enabledIndex >= 0) setActiveIndex(enabledIndex);
                        }}
                        onClick={() => selectItem(item)}
                      >
                        <span className="truncate pr-2">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
                {groupIndex < grouped.length - 1 ? (
                  <div className="mt-1 border-t border-border" />
                ) : null}
              </div>
            ))
          ) : (
            <div
              id={emptyId}
              role="status"
              aria-live="polite"
              className="px-3 py-3 text-body-sm text-muted-foreground"
            >
              {emptyText}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Command.displayName = "Command";

export { Command, commandRootVariants };
