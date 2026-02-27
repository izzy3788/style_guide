"use client";

import * as React from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const datePickerTriggerVariants = cva(
  "relative w-full rounded-lg border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-left text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--control-focus-ring)] focus-visible:border-[color:var(--control-focus-border)] enabled:hover:border-[color:var(--gray-300)] disabled:cursor-not-allowed disabled:bg-[color:var(--gray-50)] disabled:text-[color:var(--gray-400)] read-only:border-[color:var(--gray-200)] read-only:bg-[color:var(--gray-50)] read-only:text-[color:var(--gray-700)] read-only:cursor-default aria-[invalid=true]:border-[color:var(--color-error)] aria-[invalid=true]:focus-visible:ring-error-20 aria-[invalid=true]:focus-visible:border-[color:var(--color-error)]",
  {
    variants: {
      size: {
        sm: "h-8 pl-8 pr-8 text-caption",
        md: "h-9 pl-9 pr-8 text-body-sm",
        lg: "h-10 pl-10 pr-9 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const calendarNavButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-[color:var(--gray-700)] transition-colors enabled:hover:bg-muted-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--control-focus-ring-strong)]",
  {
    variants: {},
  }
);

const dayButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-0 text-center font-normal leading-none align-middle transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--control-focus-ring-strong)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      selected: {
        false: "text-[color:var(--gray-800)] enabled:hover:bg-muted-30",
        true: "bg-[color:var(--selection-primary-bg)] !text-[color:var(--selection-primary-fg)]",
      },
      muted: {
        false: "",
        true: "text-[color:var(--gray-400)]",
      },
      today: {
        false: "",
        true: "ring-1 ring-[color:var(--gray-300)]",
      },
    },
    compoundVariants: [
      {
        selected: true,
        today: true,
        className: "ring-0",
      },
      {
        selected: true,
        muted: true,
        className: "!text-[color:var(--selection-primary-fg)]",
      },
    ],
    defaultVariants: {
      selected: false,
      muted: false,
      today: false,
    },
  }
);

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function parseIsoDate(value?: string | null) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  if (
    date.getFullYear() !== Number(y) ||
    date.getMonth() !== Number(m) - 1 ||
    date.getDate() !== Number(d)
  ) {
    return null;
  }
  return date;
}

function sameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function buildMonthGrid(month: Date) {
  const firstDay = startOfMonth(month);
  const startWeekday = firstDay.getDay();
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - startWeekday);

  return Array.from({ length: 42 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function formatLabel(date: Date, locale = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatMonthTitle(date: Date, locale = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(date);
}

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

export interface DatePickerProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "size" | "value" | "defaultValue" | "onChange" | "type"
    >,
    VariantProps<typeof datePickerTriggerVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  readOnly?: boolean;
  locale?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      size,
      value,
      defaultValue,
      onValueChange,
      placeholder = "날짜를 선택하세요",
      name,
      disabled,
      readOnly,
      locale = "ko-KR",
      id,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const [open, setOpen] = React.useState(false);
    const selectedValue = isControlled ? String(value ?? "") : internalValue;
    const selectedDate = parseIsoDate(selectedValue);
    const today = new Date();
    const [isDesktopCalendar, setIsDesktopCalendar] = React.useState(false);
    const [visibleMonth, setVisibleMonth] = React.useState<Date>(
      () => selectedDate ?? startOfMonth(today)
    );

    React.useEffect(() => {
      if (typeof window === "undefined") return;
      const media = window.matchMedia("(min-width: 1024px)");
      const sync = () => setIsDesktopCalendar(media.matches);
      sync();
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }, []);

    React.useEffect(() => {
      const nextSelectedDate = parseIsoDate(selectedValue);
      if (nextSelectedDate) {
        setVisibleMonth(startOfMonth(nextSelectedDate));
      }
    }, [selectedValue]);

    const days = React.useMemo(() => buildMonthGrid(visibleMonth), [visibleMonth]);
    const resolvedSize = size ?? "md";
    // Calendar popup sizing is based on viewport, not trigger size.
    const navButtonSizeClass = "h-8 w-8";
    const weekdayCellClass =
      "h-7 w-full text-caption leading-none lg:h-8 lg:text-body-sm";
    const dayButtonSizeClass =
      "h-[28px] w-[28px] justify-self-center text-[13px] leading-[140%] lg:h-8 lg:w-8 lg:text-body-md";
    const dayButtonTypographyStyle = isDesktopCalendar
      ? ({ fontSize: "16px", lineHeight: "150%", fontWeight: 400 } as const)
      : ({ fontSize: "13px", lineHeight: "100%", fontWeight: 400 } as const);

    const commitValue = (nextDate: Date) => {
      const iso = toIsoDate(nextDate);
      if (!isControlled) setInternalValue(iso);
      onValueChange?.(iso);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {name ? <input name={name} type="hidden" value={selectedValue} /> : null}
          <PopoverTrigger asChild>
            <button
              ref={ref}
              id={id}
              type="button"
              disabled={disabled}
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={(event) => {
                if (readOnly) {
                  event.preventDefault();
                  return;
                }
                props.onClick?.(event);
              }}
              className={cn(datePickerTriggerVariants({ size: resolvedSize }), className)}
              {...props}
            >
              <Calendar
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--gray-500)]",
                  resolvedSize === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
                )}
              />
              <span
                className={cn(
                  "block truncate pr-2",
                  selectedDate ? "text-foreground" : "text-[color:var(--gray-500)]"
                )}
              >
                {selectedDate ? formatLabel(selectedDate, locale) : placeholder}
              </span>
              {!readOnly ? (
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--gray-500)] transition-transform",
                    open && "rotate-180"
                  )}
                />
              ) : null}
            </button>
          </PopoverTrigger>

          {open && !disabled && !readOnly ? (
            <PopoverContent
              align="start"
              className="w-[214px] min-w-0 p-2 lg:w-[298px] lg:p-3"
              size="sm"
              role="dialog"
            >
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between gap-1 lg:gap-2">
                  <button
                    type="button"
                    className={cn(calendarNavButtonVariants(), navButtonSizeClass)}
                    onClick={() => setVisibleMonth((prev) => addMonths(prev, -1))}
                    aria-label="이전 달"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="text-body-sm text-[color:var(--gray-900)]">
                    {formatMonthTitle(visibleMonth, locale)}
                  </p>
                  <button
                    type="button"
                    className={cn(calendarNavButtonVariants(), navButtonSizeClass)}
                    onClick={() => setVisibleMonth((prev) => addMonths(prev, 1))}
                    aria-label="다음 달"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-[repeat(7,28px)] justify-center gap-0 lg:grid-cols-7 lg:gap-2">
                  {weekdayLabels.map((label) => (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center justify-center text-center align-middle !text-[color:var(--gray-600)]",
                        weekdayCellClass
                      )}
                    >
                      {label}
                    </div>
                  ))}

                  {days.map((day) => {
                    const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
                    const isSelected = sameDay(day, selectedDate);
                    const isToday = sameDay(day, today);

                    return (
                      <button
                        key={toIsoDate(day)}
                        type="button"
                        disabled={!inCurrentMonth}
                        className={cn(
                          dayButtonVariants({
                            selected: isSelected,
                            muted: !inCurrentMonth,
                            today: isToday,
                          }),
                          dayButtonSizeClass
                        )}
                        style={dayButtonTypographyStyle}
                        onClick={() => {
                          if (!inCurrentMonth) return;
                          commitValue(day);
                        }}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          ) : null}
        </div>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker, datePickerTriggerVariants };
