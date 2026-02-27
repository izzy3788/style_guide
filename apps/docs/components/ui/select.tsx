"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-left text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)]",
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

const selectLayerVariants = cva(
  "absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] py-1 shadow-md",
  {
    variants: {
      size: {
        sm: "max-h-44",
        md: "max-h-56",
        lg: "max-h-64",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const selectItemVariants = cva(
  "flex w-full items-center px-3 text-left font-normal text-[color:var(--gray-800)] transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 text-caption",
        md: "h-9 text-body-sm",
        lg: "h-10 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

function readOptions(children: React.ReactNode): SelectOption[] {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => {
      const option = child as React.ReactElement<{
        value?: string;
        disabled?: boolean;
        children?: React.ReactNode;
      }>;
      const label = React.Children.toArray(option.props.children).join("");
      return {
        value: String(option.props.value ?? ""),
        label,
        disabled: option.props.disabled,
      };
    });
}

export interface SelectProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "size" | "onChange" | "value" | "defaultValue" | "name"
    >,
    VariantProps<typeof selectTriggerVariants> {
  children?: React.ReactNode;
  defaultValue?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      size,
      children,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder = "옵션을 선택하세요",
      disabled,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const options = React.useMemo(() => readOptions(children), [children]);
    const initialValue =
      defaultValue !== undefined ? String(defaultValue) : options[0]?.value ?? "";
    const [internalValue, setInternalValue] = React.useState(initialValue);
    const [open, setOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement>(null);

    const isControlled = value !== undefined;
    const selectedValue = isControlled ? String(value ?? "") : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);

    React.useEffect(() => {
      const handleOutside = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);

    const handleSelect = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      if (onChange) {
        const event = {
          target: { value: nextValue, name },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }

      setOpen(false);
    };

    return (
      <div className="relative w-full" ref={rootRef}>
        <input name={name} type="hidden" value={selectedValue} />
        <button
          ref={ref}
          id={id}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(selectTriggerVariants({ size }), className)}
          disabled={disabled}
          onBlur={onBlur}
          onClick={() => setOpen((prev) => !prev)}
          onFocus={onFocus}
          type="button"
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
          <div className={cn(selectLayerVariants({ size }))} role="listbox">
            <div className="overflow-y-auto">
              {options.map((option) => {
                const selected = option.value === selectedValue;
                return (
                  <button
                    key={`${option.value}-${option.label}`}
                    className={cn(
                      selectItemVariants({ size }),
                      selected
                        ? "bg-[color:var(--gray-100)]"
                        : "enabled:hover:bg-[color:var(--gray-50)]"
                    )}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select, selectTriggerVariants };
