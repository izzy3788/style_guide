"use client";

import * as React from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DateRangePickerValue = {
  from?: string;
  to?: string;
};

type DateRangePickerPreset = {
  label: string;
  value: DateRangePickerValue | (() => DateRangePickerValue);
};

const dateRangePickerTriggerVariants = cva(
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
  },
);

const calendarNavButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] text-[color:var(--gray-700)] transition-colors enabled:hover:bg-muted-30 active:bg-muted-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--control-focus-ring-strong)]",
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

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfWeek(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() - next.getDay());
  return next;
}

function endOfWeek(date: Date) {
  const start = startOfWeek(date);
  return addDays(start, 6);
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

function formatMonthTitle(date: Date, locale = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(date);
}

function formatShortLabel(date: Date, locale = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function normalizeRange(value?: DateRangePickerValue | null) {
  return {
    from: value?.from ?? "",
    to: value?.to ?? "",
  };
}

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

export interface DateRangePickerProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "size" | "value" | "defaultValue" | "onChange" | "type"
    >,
    VariantProps<typeof dateRangePickerTriggerVariants> {
  value?: DateRangePickerValue;
  defaultValue?: DateRangePickerValue;
  onValueChange?: (value: DateRangePickerValue) => void;
  placeholder?: string;
  startName?: string;
  endName?: string;
  readOnly?: boolean;
  locale?: string;
  presets?: DateRangePickerPreset[];
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      className,
      size,
      value,
      defaultValue,
      onValueChange,
      placeholder = "기간을 선택하세요",
      startName,
      endName,
      disabled,
      readOnly,
      locale = "ko-KR",
      presets,
      id,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<DateRangePickerValue>(
      () => normalizeRange(defaultValue),
    );
    const [open, setOpen] = React.useState(false);
    const selectedValue = normalizeRange(isControlled ? value : internalValue);
    const fromDate = parseIsoDate(selectedValue.from);
    const toDate = parseIsoDate(selectedValue.to);
    const today = new Date();
    const [isDesktopCalendar, setIsDesktopCalendar] = React.useState(false);
    const [visibleMonth, setVisibleMonth] = React.useState<Date>(
      () => startOfMonth(fromDate ?? today),
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
      const nextFromDate = parseIsoDate(selectedValue.from);
      if (nextFromDate) setVisibleMonth(startOfMonth(nextFromDate));
    }, [selectedValue.from]);

    const days = React.useMemo(() => buildMonthGrid(visibleMonth), [visibleMonth]);
    const resolvedSize = size ?? "md";
    const navButtonSizeClass = "h-8 w-8";
    const weekdayCellClass =
      "h-7 w-full text-caption leading-none lg:h-8 lg:text-body-sm";
    const dayButtonSizeClass =
      "h-[30px] w-[30px] justify-self-center text-[13px] leading-[140%] lg:h-[34px] lg:w-[34px] lg:text-body-md";
    const dayButtonTypographyStyle = isDesktopCalendar
      ? ({ fontSize: "14px", lineHeight: "150%", fontWeight: 400 } as const)
      : ({ fontSize: "13px", lineHeight: "100%", fontWeight: 400 } as const);

    const commitValue = (next: DateRangePickerValue) => {
      const normalized = normalizeRange(next);
      if (!isControlled) setInternalValue(normalized);
      onValueChange?.(normalized);
    };

    const applyRange = (next: DateRangePickerValue) => {
      commitValue(next);
      const nextFrom = parseIsoDate(next.from);
      if (nextFrom) setVisibleMonth(startOfMonth(nextFrom));
      setOpen(false);
    };

    const handleSelectDay = (day: Date) => {
      const iso = toIsoDate(day);

      if (!fromDate || (fromDate && toDate)) {
        commitValue({ from: iso, to: "" });
        return;
      }

      if (sameDay(day, fromDate)) {
        commitValue({ from: iso, to: iso });
        setOpen(false);
        return;
      }

      if (day < fromDate) {
        commitValue({ from: iso, to: selectedValue.from });
      } else {
        commitValue({ from: selectedValue.from, to: iso });
      }
      setOpen(false);
    };

    const hasRange = Boolean(fromDate && toDate);
    const triggerLabel = fromDate
      ? hasRange
        ? `${formatShortLabel(fromDate, locale)} - ${formatShortLabel(toDate!, locale)}`
        : `${formatShortLabel(fromDate, locale)} - 종료일 선택`
      : placeholder;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {startName ? (
            <input name={startName} type="hidden" value={selectedValue.from} />
          ) : null}
          {endName ? (
            <input name={endName} type="hidden" value={selectedValue.to} />
          ) : null}
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
              className={cn(dateRangePickerTriggerVariants({ size: resolvedSize }), className)}
              {...props}
            >
              <Calendar
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--gray-500)]",
                  resolvedSize === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
                )}
              />
              <span
                className={cn(
                  "block truncate pr-2",
                  disabled
                    ? "text-[color:var(--gray-400)]"
                    : readOnly
                      ? "text-[color:var(--gray-700)]"
                      : fromDate
                        ? "text-foreground"
                        : "text-[color:var(--gray-500)]",
                )}
              >
                {triggerLabel}
              </span>
              {!readOnly ? (
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--gray-500)] transition-transform",
                    open && "rotate-180",
                  )}
                />
              ) : null}
            </button>
          </PopoverTrigger>

          {open && !disabled && !readOnly ? (
            <PopoverContent
              align="start"
              className="w-[228px] min-w-0 p-2 lg:w-[264px] lg:p-3"
              size="sm"
              role="dialog"
            >
              <div className="space-y-2 lg:space-y-3">
                {presets?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="inline-flex h-7 items-center rounded-md border border-[color:var(--gray-200)] bg-[color:var(--gray-00)] px-2 text-caption text-[color:var(--gray-700)] transition-colors enabled:hover:bg-muted-30 active:bg-muted-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--control-focus-ring-strong)]"
                        onClick={() => {
                          const resolved =
                            typeof preset.value === "function" ? preset.value() : preset.value;
                          applyRange(resolved);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                ) : null}

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

                <div className="grid grid-cols-[repeat(7,30px)] justify-center gap-0 lg:grid-cols-[repeat(7,34px)] lg:gap-0">
                  {weekdayLabels.map((label) => (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center justify-center text-center align-middle !text-[color:var(--gray-600)]",
                        weekdayCellClass,
                      )}
                    >
                      {label}
                    </div>
                  ))}

                  {days.map((day) => {
                    const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
                    const isToday = sameDay(day, today);
                    const isStart = sameDay(day, fromDate);
                    const isEnd = sameDay(day, toDate);
                    const isSelected = isStart || isEnd;
                    const isSingleDayRange = Boolean(isStart && isEnd);
                    const isRangeMiddle =
                      Boolean(fromDate && toDate) && day > fromDate! && day < toDate!;
                    const showRangeTrack = isRangeMiddle || (isSelected && !isSingleDayRange);

                    return (
                      <div
                        key={toIsoDate(day)}
                        className="relative flex h-[30px] w-[30px] items-center justify-center lg:h-[34px] lg:w-[34px]"
                      >
                        {showRangeTrack ? (
                          <div
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-y-0 bg-[color:var(--selection-primary-bg-subtle)]",
                              isRangeMiddle && "inset-x-0",
                              isStart && !isSingleDayRange && "left-1/2 right-0",
                              isEnd && !isSingleDayRange && "left-0 right-1/2",
                            )}
                          />
                        ) : null}
                        <button
                          type="button"
                          disabled={!inCurrentMonth}
                          onClick={() => {
                            if (!inCurrentMonth) return;
                            handleSelectDay(day);
                          }}
                          className={cn(
                            "relative z-10 inline-flex items-center justify-center rounded-md p-0 text-center font-normal leading-none align-middle transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--control-focus-ring-strong)] disabled:pointer-events-none disabled:opacity-40",
                            !isSelected &&
                              !isRangeMiddle &&
                              "text-[color:var(--gray-800)] enabled:hover:bg-muted-30 active:bg-muted-30",
                            isSelected &&
                              "bg-[color:var(--selection-primary-bg)] !text-[color:var(--selection-primary-fg)] hover:bg-[color:var(--selection-primary-bg-hover)] active:bg-[color:var(--selection-primary-bg-pressed)]",
                            isRangeMiddle &&
                              !isSelected &&
                              "text-[color:var(--gray-900)] hover:bg-[color:var(--selection-primary-bg-soft)] active:bg-[color:var(--selection-primary-bg-soft)]",
                            isToday && !isSelected && "ring-1 ring-[color:var(--gray-300)]",
                            dayButtonSizeClass,
                          )}
                          style={dayButtonTypographyStyle}
                          aria-pressed={isSelected || isRangeMiddle}
                        >
                          {day.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-md bg-muted-30 px-2 py-1.5 text-caption text-[color:var(--gray-700)] lg:text-body-xs">
                  {fromDate && toDate
                    ? `${formatShortLabel(fromDate, locale)} - ${formatShortLabel(toDate, locale)}`
                    : fromDate
                      ? "종료일을 선택하세요."
                      : "시작일을 선택하세요."}
                </div>
              </div>
            </PopoverContent>
          ) : null}
        </div>
      </Popover>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

function todayRange() {
  const now = new Date();
  return { from: toIsoDate(now), to: toIsoDate(now) };
}

function thisWeekRange() {
  const now = new Date();
  return { from: toIsoDate(startOfWeek(now)), to: toIsoDate(endOfWeek(now)) };
}

function thisMonthRange() {
  const now = new Date();
  return { from: toIsoDate(startOfMonth(now)), to: toIsoDate(endOfMonth(now)) };
}

function last7DaysRange() {
  const now = new Date();
  return { from: toIsoDate(addDays(now, -6)), to: toIsoDate(now) };
}

const defaultDateRangePresets: DateRangePickerPreset[] = [
  { label: "오늘", value: todayRange },
  { label: "이번 주", value: thisWeekRange },
  { label: "이번 달", value: thisMonthRange },
  { label: "지난 7일", value: last7DaysRange },
];

export {
  DateRangePicker,
  type DateRangePickerValue,
  type DateRangePickerPreset,
  dateRangePickerTriggerVariants,
  defaultDateRangePresets,
};
