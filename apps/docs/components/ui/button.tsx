import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border-0 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--action-primary-bg)] !text-[color:var(--action-primary-fg)] shadow [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color:var(--action-primary-bg-hover)] active:!bg-[color:var(--action-primary-bg-pressed)]",
        default:
          "bg-[color:var(--action-primary-bg)] !text-[color:var(--action-primary-fg)] shadow [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color:var(--action-primary-bg-hover)] active:!bg-[color:var(--action-primary-bg-pressed)]",
        secondary:
          "bg-[color:var(--action-secondary-bg)] !text-[color:var(--action-secondary-fg)] shadow-sm [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color:var(--action-secondary-bg-hover)] [@media(hover:hover)_and_(pointer:fine)]:hover:!text-[color:var(--action-secondary-fg)] active:!bg-[color:var(--action-secondary-bg-pressed)] active:!text-[color:var(--action-secondary-fg)]",
        destructive:
          "bg-[color:var(--destructive)] !text-[color:var(--destructive-foreground)] shadow-sm [@media(hover:hover)_and_(pointer:fine)]:hover:[box-shadow:inset_0_0_0_9999px_rgb(0_0_0_/_0.08)] active:![box-shadow:inset_0_0_0_9999px_rgb(0_0_0_/_0.16)]",
        outline:
          "border border-[color:var(--border)] bg-transparent text-[color:var(--foreground)] shadow-sm [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color:var(--gray-50)] active:!bg-[color:var(--gray-100)]",
        ghost:
          "bg-transparent text-[color:var(--foreground)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-transparent active:!bg-[color:var(--gray-100)]",
        link:
          "bg-transparent !h-auto !px-0 !py-0 text-[color:var(--link-default)] underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[color:var(--link-hover)] [@media(hover:hover)_and_(pointer:fine)]:hover:underline active:!text-[color:var(--action-primary-bg-pressed)]",
      },
      size: {
        xl: "h-12 rounded-md px-4 text-body-md",
        lg: "h-10 rounded-md px-4 text-body-sm",
        default: "h-9 px-4 py-2 text-body-sm",
        sm: "h-8 rounded-md px-2 text-caption",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingLabel?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingLabel = "Loading",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        <span className={cn("inline-flex items-center gap-2", loading && "opacity-0")}>
          {children}
        </span>
        {loading ? (
          <span className="pointer-events-none absolute inset-0 inline-flex items-center justify-center">
            <span
              aria-hidden="true"
              className="h-4 w-4 shrink-0 rounded-full border-2 border-current border-t-transparent"
              style={{ animation: "sg-spin 0.8s linear infinite" }}
            />
            <span className="sr-only">{loadingLabel}</span>
          </span>
        ) : null}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
