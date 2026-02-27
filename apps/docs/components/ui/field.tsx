"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type FieldContextValue = {
  size: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  baseId: string;
  helperId: string;
  errorId: string;
  hasHelper: boolean;
  hasError: boolean;
  setHasHelper: (value: boolean) => void;
  setHasError: (value: boolean) => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

const fieldRootVariants = cva("flex flex-col", {
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
});

export interface FieldRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldRootVariants> {
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  id?: string;
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(
  (
    {
      className,
      size = "md",
      required,
      disabled,
      readOnly,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md";
    const reactId = React.useId();
    const baseId = id ?? `field-${reactId}`;
    const helperId = `${baseId}-help`;
    const errorId = `${baseId}-error`;
    const [hasHelper, setHasHelper] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    return (
      <FieldContext.Provider
        value={{
          size: resolvedSize,
          required,
          disabled,
          readOnly,
          error,
          baseId,
          helperId,
          errorId,
          hasHelper,
          hasError,
          setHasHelper,
          setHasError,
        }}
      >
        <div
          ref={ref}
          className={cn(fieldRootVariants({ size: resolvedSize }), className)}
          {...props}
        />
      </FieldContext.Provider>
    );
  }
);
FieldRoot.displayName = "FieldRoot";

const fieldLabelVariants = cva("text-foreground", {
  variants: {
    size: {
      sm: "text-caption-lg mb-2",
      md: "text-body-sm mb-2",
      lg: "text-body-sm mb-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof fieldLabelVariants> {}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(FieldContext);
    const size = context?.size ?? "md";
    const required = context?.required;
    return (
      <label
        ref={ref}
        className={cn(fieldLabelVariants({ size }), className)}
        htmlFor={props.htmlFor ?? context?.baseId}
        {...props}
      >
        {children}
        {required ? (
          <span className="ml-1 text-[color:var(--color-error)]">*</span>
        ) : null}
      </label>
    );
  }
);
FieldLabel.displayName = "FieldLabel";

export interface FieldControlProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children: React.ReactElement;
}

type FieldControlChildProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
};

const FieldControl = React.forwardRef<HTMLElement, FieldControlProps>(
  ({ className, children, ...props }, ref) => {
    void ref;
    const context = React.useContext(FieldContext);
    const describedByIds = [
      context?.hasHelper ? context.helperId : null,
      context?.hasError ? context.errorId : null,
    ]
      .filter(Boolean)
      .join(" ");
    const child = children as React.ReactElement<FieldControlChildProps>;
    const childProps = child.props;
    const externalDescribedBy = (props["aria-describedby"] ??
      childProps["aria-describedby"]) as string | undefined;
    const mergedDescribedBy =
      describedByIds && externalDescribedBy
        ? `${describedByIds} ${externalDescribedBy}`
        : describedByIds || externalDescribedBy;

    return React.cloneElement(child, {
      ...childProps,
      ...props,
      className: cn(className, childProps.className),
      id: props.id ?? childProps.id ?? context?.baseId,
      "aria-describedby": mergedDescribedBy,
      "aria-invalid": context?.error ? "true" : props["aria-invalid"],
      disabled: context?.disabled ?? childProps.disabled,
      readOnly: context?.readOnly ?? childProps.readOnly,
      required: context?.required ?? childProps.required,
    });
  }
);
FieldControl.displayName = "FieldControl";

const fieldHelperVariants = cva("text-[color:var(--gray-600)] text-caption", {
  variants: {
    size: {
      sm: "mt-1",
      md: "mt-1",
      lg: "mt-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FieldHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldHelperVariants> {}

const FieldHelper = React.forwardRef<HTMLParagraphElement, FieldHelperProps>(
  ({ className, style, ...props }, ref) => {
    const context = React.useContext(FieldContext);
    const size = context?.size ?? "md";
    const helperColor = context?.error ? "var(--color-error)" : "var(--gray-600)";

    React.useEffect(() => {
      context?.setHasHelper(true);
      return () => context?.setHasHelper(false);
    }, [context]);

    return (
      <p
        ref={ref}
        id={props.id ?? context?.helperId}
        className={cn(fieldHelperVariants({ size }), className)}
        style={{ color: helperColor, ...style }}
        {...props}
      />
    );
  }
);
FieldHelper.displayName = "FieldHelper";

const fieldErrorVariants = cva("text-[color:var(--color-error)] text-caption", {
  variants: {
    size: {
      sm: "mt-1",
      md: "mt-1",
      lg: "mt-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldErrorVariants> {}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, style, ...props }, ref) => {
    const context = React.useContext(FieldContext);
    const size = context?.size ?? "md";

    React.useEffect(() => {
      context?.setHasError(true);
      return () => context?.setHasError(false);
    }, [context]);

    return (
      <p
        ref={ref}
        id={props.id ?? context?.errorId}
        className={cn(fieldErrorVariants({ size }), className)}
        aria-live="polite"
        style={{ color: "var(--color-error)", ...style }}
        {...props}
      />
    );
  }
);
FieldError.displayName = "FieldError";

const fieldHintRowVariants = cva(
  "mt-1 flex items-center justify-between text-caption",
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

export interface FieldHintRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldHintRowVariants> {}

const FieldHintRow = React.forwardRef<HTMLDivElement, FieldHintRowProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(FieldContext);
    const size = context?.size ?? "md";
    return (
      <div
        ref={ref}
        className={cn(fieldHintRowVariants({ size }), className)}
        {...props}
      />
    );
  }
);
FieldHintRow.displayName = "FieldHintRow";

export {
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldHelper,
  FieldError,
  FieldHintRow,
};
