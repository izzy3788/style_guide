"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type ComboboxOption = {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
};

const comboboxTriggerVariants = cva(
  "relative w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-left text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] read-only:border-[color:var(--gray-200)] read-only:bg-[color:var(--gray-50)] read-only:text-[color:var(--gray-700)] read-only:cursor-default aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)]",
  {
    variants: {
      size: {
        sm: "h-8 pl-3 pr-8 text-caption",
        md: "h-9 pl-3 pr-8 text-body-sm",
        lg: "h-10 pl-4 pr-9 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const comboboxLayerVariants = cva(
  "absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] shadow-md",
  {
    variants: {
      size: {
        sm: "max-h-64",
        md: "max-h-72",
        lg: "max-h-80",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const comboboxSearchVariants = cva(
  "w-full border-b border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-foreground placeholder:text-[color:var(--gray-500)] focus-visible:outline-none",
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

const comboboxItemVariants = cva(
  "relative flex w-full items-center text-left font-normal text-[color:var(--gray-800)] transition-colors disabled:pointer-events-none disabled:opacity-60",
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

const comboboxItemTypographyBySize = {
  sm: { fontSize: "12px", lineHeight: "140%", fontWeight: 400 },
  md: { fontSize: "14px", lineHeight: "150%", fontWeight: 400 },
  lg: { fontSize: "14px", lineHeight: "150%", fontWeight: 400 },
} as const;

export interface ComboboxProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "size" | "value" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof comboboxTriggerVariants> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  name?: string;
  readOnly?: boolean;
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      className,
      size,
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "선택하세요",
      searchPlaceholder = "검색...",
      emptyText = "검색 결과가 없습니다.",
      disabled,
      readOnly,
      name,
      id,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");

    const isControlled = value !== undefined;
    const selectedValue = isControlled ? String(value ?? "") : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);
    const resolvedSize = size ?? "md";
    const searchable = !disabled && !readOnly;

    const filteredOptions = React.useMemo(() => {
      const keyword = query.trim().toLowerCase();
      if (!keyword) return options;
      return options.filter((option) => {
        const haystack = [
          option.label,
          option.value,
          ...(option.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(keyword);
      });
    }, [options, query]);

    React.useEffect(() => {
      if (!open) return;
      setHighlightedIndex((prev) => {
        const enabled = filteredOptions.filter((option) => !option.disabled);
        if (!enabled.length) return -1;
        if (prev >= 0) return Math.min(prev, enabled.length - 1);
        const selectedIdx = enabled.findIndex((option) => option.value === selectedValue);
        return selectedIdx >= 0 ? selectedIdx : 0;
      });
    }, [open, filteredOptions, selectedValue]);

    React.useEffect(() => {
      if (!open) return;

      const onPointerDown = (event: MouseEvent) => {
        const target = event.target as Node;
        if (rootRef.current?.contains(target)) return;
        setOpen(false);
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };

      document.addEventListener("mousedown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    React.useEffect(() => {
      if (!open) return;
      searchRef.current?.focus();
      searchRef.current?.select();
    }, [open]);

    React.useEffect(() => {
      if (highlightedIndex < 0) return;
      itemRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }, [highlightedIndex]);

    const enabledOptions = filteredOptions.filter((option) => !option.disabled);

    const commitValue = (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
      setOpen(false);
      setQuery("");
    };

    const openList = () => {
      if (!searchable) return;
      setOpen(true);
    };

    return (
      <div className="relative w-full" ref={rootRef}>
        {name ? <input name={name} type="hidden" value={selectedValue} /> : null}
        <button
          ref={ref}
          id={id}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={() => {
            if (!searchable) return;
            setOpen((prev) => !prev);
          }}
          onKeyDown={(event) => {
            if (!searchable) return;
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openList();
            }
          }}
          className={cn(comboboxTriggerVariants({ size: resolvedSize }), className)}
          {...props}
        >
          <span
            className={cn(
              "block truncate pr-2",
              selectedOption ? "text-foreground" : "text-[color:var(--gray-500)]"
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--gray-500)] transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open ? (
          <div className={cn(comboboxLayerVariants({ size: resolvedSize }))}>
            <div className="relative">
              <Search
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--gray-500)]",
                  resolvedSize === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
                )}
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (!enabledOptions.length) return;
                    setHighlightedIndex((prev) =>
                      prev < enabledOptions.length - 1 ? prev + 1 : 0
                    );
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (!enabledOptions.length) return;
                    setHighlightedIndex((prev) =>
                      prev > 0 ? prev - 1 : enabledOptions.length - 1
                    );
                  } else if (event.key === "Enter") {
                    if (highlightedIndex < 0) return;
                    event.preventDefault();
                    const option = enabledOptions[highlightedIndex];
                    if (option) commitValue(option.value);
                  } else if (event.key === "Escape") {
                    event.preventDefault();
                    setOpen(false);
                  }
                }}
                className={cn(comboboxSearchVariants({ size: resolvedSize }))}
                placeholder={searchPlaceholder}
                type="text"
              />
            </div>

            <div className="max-h-56 overflow-auto py-1">
              {filteredOptions.length ? (
                filteredOptions.map((option) => {
                  const enabledIndex = enabledOptions.findIndex(
                    (enabled) => enabled.value === option.value
                  );
                  const highlighted =
                    !option.disabled && enabledIndex >= 0 && enabledIndex === highlightedIndex;
                  const selected = option.value === selectedValue;

                  return (
                    <button
                      key={option.value}
                      ref={(node) => {
                        if (enabledIndex >= 0) itemRefs.current[enabledIndex] = node;
                      }}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={option.disabled}
                      className={cn(
                        comboboxItemVariants({ size: resolvedSize }),
                        highlighted && "bg-muted-30 text-[color:var(--gray-900)]",
                        selected && !highlighted && "bg-[color:var(--gray-50)]"
                      )}
                      style={comboboxItemTypographyBySize[resolvedSize]}
                      onMouseEnter={() => {
                        if (enabledIndex >= 0) setHighlightedIndex(enabledIndex);
                      }}
                      onClick={() => {
                        if (option.disabled) return;
                        commitValue(option.value);
                      }}
                    >
                      <span className="truncate pr-7">{option.label}</span>
                      {selected ? (
                        <Check
                          aria-hidden="true"
                          className="absolute right-3 h-4 w-4 text-[color:var(--gray-700)]"
                        />
                      ) : null}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-3 text-body-sm text-muted-foreground">{emptyText}</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

Combobox.displayName = "Combobox";

export { Combobox, comboboxTriggerVariants };
