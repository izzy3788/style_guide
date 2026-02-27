"use client";

import * as React from "react";
import Link from "next/link";

import CodeSnippet from "../../_components/CodeSnippet";
import {
  DateRangePicker,
  defaultDateRangePresets,
  type DateRangePickerValue,
} from "@/components/ui/date-range-picker";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const basicCode = `import * as React from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function BasicDateRangePicker() {
  const [range, setRange] = React.useState({
    from: "2026-02-24",
    to: "2026-02-28",
  });

  return (
    <DateRangePicker
      value={range}
      onValueChange={setRange}
      placeholder="기간을 선택하세요"
    />
  );
}`;

const fieldCode = `import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="md">
        <FieldLabel>조회 기간</FieldLabel>
        <FieldControl>
          <DateRangePicker
            defaultValue={{ from: "2026-02-01", to: "2026-02-07" }}
          />
        </FieldControl>
        <FieldHelper>기간 필터/리포트 조회에 사용합니다.</FieldHelper>
      </FieldRoot>

      <FieldRoot size="md" error>
        <FieldLabel>오류 상태</FieldLabel>
        <FieldControl>
          <DateRangePicker placeholder="기간을 선택하세요" />
        </FieldControl>
        <FieldError>조회 기간을 선택해주세요.</FieldError>
      </FieldRoot>
    </div>
  );
}`;

const stateCode = `import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerStates() {
  return (
    <div className="space-y-3">
      <DateRangePicker
        defaultValue={{ from: "2026-02-24", to: "2026-02-28" }}
        readOnly
      />
      <DateRangePicker
        defaultValue={{ from: "2026-02-24", to: "2026-02-28" }}
        disabled
      />
    </div>
  );
}`;

const presetsCode = `import { DateRangePicker, defaultDateRangePresets } from "@/components/ui/date-range-picker";

export function DateRangePickerWithPresets() {
  return (
    <DateRangePicker
      presets={defaultDateRangePresets}
      placeholder="기간을 선택하세요"
    />
  );
}`;

export default function DateRangePickerDocsPage() {
  const [range, setRange] = React.useState<DateRangePickerValue>({
    from: "2026-02-24",
    to: "2026-02-28",
  });

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Date Range Picker</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          시작일과 종료일을 한 번에 선택하는 기간 선택 컴포넌트입니다. 필터, 리포트,
          정산 기간 입력에 사용합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          시작일을 선택한 뒤 종료일을 선택하면 범위가 확정됩니다. 범위가 이미 선택된
          상태에서 다시 날짜를 누르면 새 시작일 선택으로 다시 시작합니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DateRangePicker value={range} onValueChange={setRange} />
        </div>
        <CodeSnippet title="Date Range Picker 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Field 조합</h2>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="md">
              <FieldLabel>조회 기간</FieldLabel>
              <FieldControl>
                <DateRangePicker defaultValue={{ from: "2026-02-01", to: "2026-02-07" }} />
              </FieldControl>
              <FieldHelper>기간 필터/리포트 조회에 사용합니다.</FieldHelper>
            </FieldRoot>

            <FieldRoot size="md" error>
              <FieldLabel>오류 상태</FieldLabel>
              <FieldControl>
                <DateRangePicker placeholder="기간을 선택하세요" />
              </FieldControl>
              <FieldError>조회 기간을 선택해주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 조합 예시" code={fieldCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">프리셋</h2>
        <p className="text-body-sm text-muted-foreground">
          필터 화면에서는 `presets`로 빠른 기간 선택 버튼(예: 오늘/이번 주/이번 달/지난 7일)을
          함께 제공할 수 있습니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DateRangePicker
            defaultValue={{ from: "2026-02-24", to: "2026-02-28" }}
            presets={defaultDateRangePresets}
          />
        </div>
        <CodeSnippet title="프리셋 예시" code={presetsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          `readOnly`는 값을 보여주되 캘린더를 열지 않고, `disabled`는 상호작용을
          비활성화합니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <DateRangePicker defaultValue={{ from: "2026-02-24", to: "2026-02-28" }} readOnly />
            <DateRangePicker defaultValue={{ from: "2026-02-24", to: "2026-02-28" }} disabled />
          </div>
        </div>
        <CodeSnippet title="상태 예시" code={stateCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>단일 날짜 선택에는 `Date Picker`를, 시작/종료 범위 선택에는 `Date Range Picker`를 사용합니다.</li>
          <li>필터 화면에서는 `presets`를 사용해 기본 기간(오늘/이번 주/이번 달/지난 7일)을 함께 제공할 수 있습니다.</li>
          <li>복잡한 기간 선택 UX가 필요하면 이후 `Sheet` 또는 듀얼 캘린더 레이아웃으로 확장합니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          `Field`와 함께 사용할 때 label/helper/error를 연결해 상태를 텍스트로
          제공해야 합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
