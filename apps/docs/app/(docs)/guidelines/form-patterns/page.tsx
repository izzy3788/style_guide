"use client";

import * as React from "react";
import CodeSnippet from "../../_components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { DateRangePicker, defaultDateRangePresets } from "@/components/ui/date-range-picker";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formStructure = [
  "상단: 화면 제목 + 설명 + 저장/취소 액션",
  "본문: 섹션 단위로 그룹화 (기본 정보 / 옵션 / 알림 등)",
  "필드: `FieldRoot` + `FieldLabel` + `FieldControl` + helper/error 조합",
  "하단: primary 1개 + secondary 액션(취소/닫기)",
];

const validationRules = [
  "필수값 누락은 제출 시점에 우선 표시하고, 수정 후에는 즉시 해소되도록 한다.",
  "형식 오류는 입력 중 또는 blur 시점에 빠르게 알려준다 (예: 이메일 형식).",
  "오류 문구는 원인 + 해결 행동을 함께 제공한다.",
  "에러 색상만 사용하지 말고 텍스트/아이콘으로 상태를 함께 전달한다.",
];

const fieldSelectionRules = [
  { input: "짧은 자유 입력", component: "Input" },
  { input: "긴 설명/메모", component: "Textarea" },
  { input: "옵션 적고 검색 불필요", component: "Select" },
  { input: "옵션 많고 검색 필요", component: "Combobox" },
  { input: "단일 날짜", component: "Date Picker" },
  { input: "기간(시작/종료)", component: "Date Range Picker" },
];

const stateChecklist = [
  "기본값/placeholder가 의미 있는지 확인",
  "readOnly와 disabled를 구분해 사용",
  "오류 상태에서 helper 대신 error를 우선 노출",
  "로딩 중에는 제출 버튼 중복 클릭 방지",
  "저장 성공/실패 피드백(Toast 또는 Alert) 제공",
];

const loadingRules = [
  "제출 시작 시 primary 버튼을 loading + disabled로 전환한다.",
  "사용자가 맥락을 잃지 않도록 버튼 라벨(예: 저장)을 유지한 채 진행 상태를 함께 표시한다.",
  "요청이 끝나면 success/error 피드백을 제공하고 버튼 상태를 즉시 복원한다.",
];

const formFlowSteps = [
  {
    title: "1. 입력",
    description: "필수/선택 필드를 구분해 스캔 가능하게 배치하고 기본값을 제공한다.",
  },
  {
    title: "2. 검증",
    description: "오류가 발생한 필드로 사용자가 바로 이동할 수 있게 메시지를 인접 배치한다.",
  },
  {
    title: "3. 제출",
    description: "저장 버튼 라벨은 유지하고 loading 스피너로 진행 상태를 표시한다.",
  },
  {
    title: "4. 결과 피드백",
    description: "성공 시 다음 행동을, 실패 시 재시도 방법을 안내한다.",
  },
];

const formPatternCode = `import * as React from "react";
import { Button } from "@/components/ui/button";
import { DateRangePicker, defaultDateRangePresets } from "@/components/ui/date-range-picker";
import {
  FieldControl,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ReportFilterForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FieldRoot size="md">
          <FieldLabel>리포트 이름</FieldLabel>
          <FieldControl>
            <Input placeholder="예: 주간 매출 리포트" />
          </FieldControl>
          <FieldHelper>저장 후 목록에서 식별할 이름입니다.</FieldHelper>
        </FieldRoot>

        <FieldRoot size="md">
          <FieldLabel>조회 기간</FieldLabel>
          <FieldControl>
            <DateRangePicker
              defaultValue={{ from: "2026-02-01", to: "2026-02-07" }}
              presets={defaultDateRangePresets}
            />
          </FieldControl>
          <FieldHelper>기간 필터는 Date Range Picker를 우선 사용합니다.</FieldHelper>
        </FieldRoot>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline">취소</Button>
        <Button variant="secondary">초안 저장</Button>
        <Button variant="primary" loading={isSubmitting}>저장</Button>
      </div>
    </form>
  );
}`;

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-title-sm text-[color:var(--gray-900)]">{title}</h3>
      <ul className="mt-3 list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MappingTable({
  rows,
}: {
  rows: { input: string; component: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-2 border-b border-border bg-muted px-4 py-3 text-caption uppercase tracking-wide text-muted-foreground">
        <div>입력 유형</div>
        <div>권장 컴포넌트</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={`${row.input}-${row.component}`} className="grid grid-cols-2 gap-6 px-4 py-3">
            <div className="text-body-sm text-[color:var(--gray-900)]">{row.input}</div>
            <div className="text-body-sm text-muted-foreground">{row.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowCards({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {steps.map((step) => (
        <div key={step.title} className="rounded-xl border border-border p-5">
          <h3 className="text-title-sm text-[color:var(--gray-900)]">{step.title}</h3>
          <p className="mt-2 text-body-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

function ExampleCard({
  title,
  description,
  code,
}: {
  title: string;
  description: string;
  code: string;
}) {
  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-title-sm text-[color:var(--gray-900)]">{title}</h3>
      <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <CodeSnippet title={title} code={code} copyable />
      </div>
    </div>
  );
}

function FormPatternPreview() {
  const [name, setName] = React.useState("");
  const [range, setRange] = React.useState({ from: "2026-02-16", to: "2026-02-25" });
  const [showError, setShowError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <div className="rounded-xl border border-border bg-[color:var(--gray-00)] p-6">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldRoot size="md" error={showError && !name.trim()}>
            <FieldLabel>리포트 이름</FieldLabel>
            <FieldControl>
              <Input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (showError && event.target.value.trim()) setShowError(false);
                }}
                placeholder="예: 주간 매출 리포트"
              />
            </FieldControl>
            {showError && !name.trim() ? (
              <FieldError>리포트 이름을 입력해주세요.</FieldError>
            ) : (
              <FieldHelper>저장 후 목록에서 식별할 이름입니다.</FieldHelper>
            )}
          </FieldRoot>

          <FieldRoot size="md">
            <FieldLabel>조회 기간</FieldLabel>
            <FieldControl>
              <DateRangePicker
                value={range}
                onValueChange={(next) =>
                  setRange({ from: next.from ?? "", to: next.to ?? "" })
                }
                presets={defaultDateRangePresets}
              />
            </FieldControl>
            <FieldHelper>기간 필터는 Date Range Picker를 우선 사용합니다.</FieldHelper>
          </FieldRoot>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline">취소</Button>
          <Button variant="secondary">초안 저장</Button>
          <Button
            variant="primary"
            loading={isSubmitting}
            onClick={async () => {
              if (!name.trim()) {
                setShowError(true);
                return;
              }
              setIsSubmitting(true);
              await new Promise((resolve) => window.setTimeout(resolve, 800));
              setIsSubmitting(false);
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FormPatternsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">폼 패턴 (초안)</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          `Field + Input/Select/DatePicker` 계열 컴포넌트를 조합할 때의 기본 구조와 검증/피드백 패턴을 정리합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">기본 구조</h2>
          <p className="text-body-sm text-muted-foreground">
            폼은 입력 필드 나열이 아니라, 사용자가 완료까지 도달하는 흐름으로 설계합니다.
          </p>
        </div>
        <BulletCard title="레이아웃 구성" items={formStructure} />
        <FlowCards steps={formFlowSteps} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">입력 유형별 컴포넌트 선택</h2>
          <p className="text-body-sm text-muted-foreground">
            컴포넌트 선택 기준을 통일하면 화면 간 학습 비용을 줄일 수 있습니다.
          </p>
        </div>
        <MappingTable rows={fieldSelectionRules} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">검증/오류 표시 규칙</h2>
          <p className="text-body-sm text-muted-foreground">
            검증 타이밍과 메시지 톤이 일관되어야 사용자가 수정 방법을 빠르게 이해합니다.
          </p>
        </div>
        <BulletCard title="검증 규칙" items={validationRules} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">제출/로딩 패턴</h2>
          <p className="text-body-sm text-muted-foreground">
            제출 중 상태를 버튼에 직접 표시해 중복 클릭을 방지하고, 요청 진행 상황을 명확히 전달합니다.
          </p>
        </div>
        <BulletCard title="로딩 규칙" items={loadingRules} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">조합 예시 (실무형)</h2>
          <p className="text-body-sm text-muted-foreground">
            필드/기간 선택/버튼 계층을 함께 배치한 기본 폼 패턴입니다.
          </p>
        </div>
        <ExampleCard
          title="리포트 생성/필터 폼"
          description="`outline`(취소) / `secondary`(초안 저장) / `primary`(저장) 계층을 같이 사용합니다."
          code={formPatternCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">라이브 조합 QA 프리뷰</h2>
          <p className="text-body-sm text-muted-foreground">
            실제 컴포넌트 조합으로 필드 상태(error/helper), 기간 선택, 버튼 계층(Outline/Secondary/Primary)을 함께 확인하는 샘플입니다.
          </p>
        </div>
        <FormPatternPreview />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">QA 체크리스트</h2>
          <p className="text-body-sm text-muted-foreground">
            폼 화면 리뷰 시 기능보다 먼저 상태 전환과 피드백이 자연스러운지 확인합니다.
          </p>
        </div>
        <BulletCard title="폼 QA 항목" items={stateChecklist} />
      </section>
    </div>
  );
}
