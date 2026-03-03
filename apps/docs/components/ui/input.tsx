"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-foreground placeholder:text-[color:var(--gray-500)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] disabled:placeholder:text-[color:var(--gray-400)] read-only:border-[color:var(--gray-200)] read-only:bg-[color:var(--gray-50)] read-only:text-[color:var(--gray-700)] read-only:cursor-default read-only:hover:border-[color:var(--gray-200)] read-only:focus-visible:ring-0 read-only:focus-visible:border-[color:var(--gray-200)] aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)]",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      type,
      clearable,
      onClear,
      onChange,
      onFocus,
      onBlur,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue != null ? String(defaultValue) : ""
    );
    const [isFocused, setIsFocused] = React.useState(false);

    const currentValue = isControlled
      ? value != null
        ? String(value)
        : ""
      : uncontrolledValue;
    const resolvedType = type ?? "text";
    const clearableByType = ["text", "search", "email", "url", "tel"].includes(
      resolvedType
    );
    const shouldEnableClear =
      (clearable ?? clearableByType) && !props.disabled && !props.readOnly;
    const showClear = shouldEnableClear && isFocused && currentValue.length > 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }
      onChange?.(event);
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
        if (innerRef.current) {
          innerRef.current.value = "";
        }
      }
      onClear?.();
      innerRef.current?.focus();
    };

    if (!shouldEnableClear) {
      return (
        <input
          type={type}
          className={cn(inputVariants({ size }), className)}
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      );
    }

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(inputVariants({ size }), "pr-10", className)}
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          value={isControlled ? value : uncontrolledValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {showClear ? (
          <button
            type="button"
            aria-label="입력값 지우기"
            className="absolute right-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--gray-400)] text-[color:var(--gray-00)] transition hover:bg-[color:var(--gray-500)]"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
          >
            <X className="h-2.5 w-2.5" />
          </button>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
