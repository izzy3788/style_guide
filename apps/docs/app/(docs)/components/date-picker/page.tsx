"use client";

import * as React from "react";
import Link from "next/link";

import CodeSnippet from "../../_components/CodeSnippet";
import { DatePicker } from "@/components/ui/date-picker";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const basicCode = `import * as React from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function BasicDatePicker() {
  const [date, setDate] = React.useState("2026-02-24");

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      placeholder="날짜를 선택하세요"
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
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="md">
        <FieldLabel>마감일</FieldLabel>
        <FieldControl>
          <DatePicker defaultValue="2026-02-28" />
        </FieldControl>
        <FieldHelper>단일 날짜 선택에 사용합니다.</FieldHelper>
      </FieldRoot>

      <FieldRoot size="md" error>
        <FieldLabel>오류 상태</FieldLabel>
        <FieldControl>
          <DatePicker placeholder="날짜를 선택하세요" />
        </FieldControl>
        <FieldError>마감일을 선택해주세요.</FieldError>
      </FieldRoot>
    </div>
  );
}`;

const stateCode = `import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerStates() {
  return (
    <div className="space-y-3">
      <DatePicker defaultValue="2026-02-24" readOnly />
      <DatePicker defaultValue="2026-02-24" disabled />
    </div>
  );
}`;

export default function DatePickerDocsPage() {
  const [date, setDate] = React.useState("2026-02-24");

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Date Picker</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          단일 날짜 선택 컴포넌트입니다. `Popover` 위에 캘린더 UI를 띄워 날짜를
          선택합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          트리거 버튼을 누르면 월 단위 캘린더가 열리고, 날짜를 선택하면 값이
          반영됩니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DatePicker value={date} onValueChange={setDate} />
        </div>
        <CodeSnippet title="Date Picker 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Field 조합</h2>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="md">
              <FieldLabel>마감일</FieldLabel>
              <FieldControl>
                <DatePicker defaultValue="2026-02-28" />
              </FieldControl>
              <FieldHelper>단일 날짜 선택에 사용합니다.</FieldHelper>
            </FieldRoot>

            <FieldRoot size="md" error>
              <FieldLabel>오류 상태</FieldLabel>
              <FieldControl>
                <DatePicker placeholder="날짜를 선택하세요" />
              </FieldControl>
              <FieldError>마감일을 선택해주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 조합 예시" code={fieldCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          `readOnly`는 값을 보여주되 캘린더를 열지 않고, `disabled`는 상호작용을
          비활성화합니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <DatePicker defaultValue="2026-02-24" readOnly />
            <DatePicker defaultValue="2026-02-24" disabled />
          </div>
        </div>
        <CodeSnippet title="상태 예시" code={stateCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>단일 날짜 선택에는 `Date Picker`를 사용합니다.</li>
          <li>기간 선택은 이후 `Date Range Picker` 또는 2개 필드 조합으로 확장합니다.</li>
          <li>모바일에서 입력 흐름이 길어지면 `Sheet` 기반 날짜 선택 화면으로 확장할 수 있습니다.</li>
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
