"use client";

import * as React from "react";
import CodeSnippet from "../../_components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { DateRangePicker, defaultDateRangePresets } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const screenStructure = [
  "상단: 페이지 제목 + 핵심 액션(생성/내보내기)",
  "필터 영역: 검색/기간/상태/정렬 등 조회 조건",
  "결과 요약: 총 건수, 적용된 필터, 선택 상태",
  "본문: Table 또는 카드 리스트",
  "하단: Pagination + 페이지당 개수 + 보조 액션",
];

const filterRules = [
  "자주 쓰는 필터를 앞쪽에 배치하고, 저빈도 필터는 접기/상세 필터로 분리",
  "필터 적용/초기화 상태를 명확히 보여준다",
  "기간 필터는 `Date Range Picker`를 우선 사용",
  "모바일에서는 필터를 `Sheet`로 분리해 스크롤 충돌을 줄인다",
];

const tableRules = [
  "컬럼 제목은 의미 중심으로 짧게 작성하고 정렬 가능 여부를 구분한다",
  "행 액션은 항상 같은 위치에 두고 위험 액션은 분리한다",
  "빈 상태/로딩/에러 상태를 테이블 안쪽 또는 바로 아래에서 일관되게 표시한다",
  "선택 가능한 행은 체크박스 위치와 선택 개수 피드백을 일관되게 유지한다",
];

const loadingRules = [
  "초기 진입 로딩은 Skeleton으로 구조를 유지하고, 완료 후 실제 데이터를 치환한다.",
  "필터 재조회는 페이지 전체 스켈레톤 대신 버튼/툴바 인라인 로딩을 우선 사용한다.",
  "로딩 중에도 현재 필터/선택 정보는 유지해 사용자가 맥락을 잃지 않게 한다.",
];

const states = [
  {
    state: "Loading",
    pattern: "Skeleton row 5~10개 + 헤더 유지",
    note: "레이아웃 점프를 줄이기 위해 컬럼 폭 구조는 유지",
  },
  {
    state: "Empty",
    pattern: "Empty State + 원인(필터 결과 없음/초기 데이터 없음) + 다음 행동",
    note: "필터 결과 없음이면 '필터 초기화' CTA 우선",
  },
  {
    state: "Error",
    pattern: "Alert(inline) + 재시도 버튼",
    note: "표 전체를 숨기기보다 실패 지점을 설명",
  },
  {
    state: "Loaded",
    pattern: "Table + Pagination + 선택/배치 액션",
    note: "총 건수와 현재 범위(예: 1-20 / 248)를 함께 표기",
  },
  {
    state: "Refetching",
    pattern: "기존 테이블 유지 + 적용 버튼 loading",
    note: "전체 레이아웃을 비우지 말고 부분 업데이트로 처리",
  },
];

const reviewChecklist = [
  "필터 적용 후 결과 건수/상태가 즉시 갱신되는지",
  "로딩/빈 상태/에러 상태가 서로 다른 의미로 표현되는지",
  "테이블 헤더/행 높이/정렬 아이콘 위치가 일관적인지",
  "행 액션의 hover/focus/disabled 상태가 명확한지",
  "모바일에서 필터/테이블 스크롤 충돌이 없는지",
];

const filterBarCode = `import { Button } from "@/components/ui/button";
import { DateRangePicker, defaultDateRangePresets } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function OrdersFilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border p-4 lg:flex-row lg:items-end">
      <div className="grid flex-1 gap-3 md:grid-cols-3">
        <Input placeholder="주문번호/고객명 검색" />
        <Select defaultValue="all">
          <option value="all">전체 상태</option>
          <option value="paid">결제 완료</option>
          <option value="cancelled">취소</option>
        </Select>
        <DateRangePicker presets={defaultDateRangePresets} />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">초기화</Button>
        <Button variant="primary">적용</Button>
      </div>
    </div>
  );
}`;

const tableStateCode = `function OrdersTableSection({
  status,
}: {
  status: "loading" | "empty" | "error" | "loaded" | "refetching";
}) {
  if (status === "loading") {
    return <div className="rounded-xl border border-border p-4">Skeleton rows...</div>;
  }

  if (status === "error") {
    return <div className="rounded-xl border border-border p-4">Alert + 재시도 버튼</div>;
  }

  if (status === "empty") {
    return <div className="rounded-xl border border-border p-6">Empty State + 필터 초기화</div>;
  }

  if (status === "refetching") {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-border">Table (기존 데이터 유지)</div>
        <div className="text-body-sm text-muted-foreground">적용 버튼만 loading 처리</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border">Table</div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-body-sm text-muted-foreground">1-20 / 248</div>
        <div>Pagination</div>
      </div>
    </div>
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

function StateTable({
  rows,
}: {
  rows: { state: string; pattern: string; note: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-1 gap-0 border-b border-border bg-muted text-caption uppercase tracking-wide text-muted-foreground md:grid-cols-[120px_1fr_1fr]">
        <div className="px-4 py-3">상태</div>
        <div className="px-4 py-3 md:border-l md:border-border">표현 패턴</div>
        <div className="px-4 py-3 md:border-l md:border-border">노트</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.state} className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr]">
            <div className="px-4 py-3 text-body-sm text-[color:var(--gray-900)]">{row.state}</div>
            <div className="px-4 py-3 text-body-sm text-muted-foreground md:border-l md:border-border">
              {row.pattern}
            </div>
            <div className="px-4 py-3 text-body-sm text-muted-foreground md:border-l md:border-border">
              {row.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutBlocks() {
  const blocks = [
    { label: "Header", tone: "bg-[color:var(--gray-50)]" },
    { label: "Filters", tone: "bg-[color:var(--primary-50)]" },
    { label: "Summary", tone: "bg-[color:var(--gray-50)]" },
    { label: "Table/List", tone: "bg-[color:var(--gray-00)]" },
    { label: "Pagination", tone: "bg-[color:var(--gray-50)]" },
  ];

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="space-y-3">
        {blocks.map((block) => (
          <div
            key={block.label}
            className={`rounded-lg border border-border px-4 py-3 text-body-sm text-[color:var(--gray-800)] ${block.tone}`}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterBarPreview() {
  const [keyword, setKeyword] = React.useState("");
  const [range, setRange] = React.useState({ from: "2026-02-16", to: "2026-02-25" });
  const [dirty, setDirty] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);

  return (
    <div className="rounded-xl border border-border bg-[color:var(--gray-00)] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="grid flex-1 gap-3 md:grid-cols-3">
          <Input
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setDirty(true);
            }}
            placeholder="주문번호/고객명 검색"
          />
          <Select
            defaultValue="all"
            onChange={() => {
              setDirty(true);
            }}
          >
            <option value="all">전체 상태</option>
            <option value="paid">결제 완료</option>
            <option value="cancelled">취소</option>
          </Select>
          <DateRangePicker
            value={range}
            onValueChange={(next) => {
              setRange({
                from: next.from ?? "",
                to: next.to ?? "",
              });
              setDirty(true);
            }}
            presets={defaultDateRangePresets}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={isApplying}
            onClick={() => {
              setKeyword("");
              setRange({ from: "", to: "" });
              setDirty(false);
            }}
          >
            초기화
          </Button>
          <Button variant="secondary" disabled={!dirty || isApplying}>
            저장된 필터
          </Button>
          <Button
            variant="primary"
            disabled={isApplying}
            onClick={async () => {
              setIsApplying(true);
              await new Promise((resolve) => window.setTimeout(resolve, 800));
              setIsApplying(false);
              setDirty(false);
            }}
          >
            {isApplying ? "적용 중..." : "적용"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TableToolbarPreview() {
  return (
    <div className="rounded-xl border border-border bg-[color:var(--gray-00)] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-body-sm text-muted-foreground">총 248건 · 선택 3건</div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm">
            CSV 내보내기
          </Button>
          <Button variant="outline" size="sm">
            선택 해제
          </Button>
          <Button variant="secondary" size="sm">
            상태 변경
          </Button>
          <Button variant="destructive" size="sm">
            삭제
          </Button>
        </div>
      </div>
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

export default function DataScreenPatternsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">데이터 화면 패턴 (초안)</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          `Table + filters + pagination + empty/loading` 조합을 일관되게 구성하기 위한 기본 패턴을 정리합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">화면 기본 구조</h2>
          <p className="text-body-sm text-muted-foreground">
            데이터 화면은 조회 조건, 결과, 상태 피드백이 한 흐름으로 이어져야 합니다.
          </p>
        </div>
        <BulletCard title="레이아웃 구성" items={screenStructure} />
        <LayoutBlocks />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">필터 영역 패턴</h2>
          <p className="text-body-sm text-muted-foreground">
            사용 빈도와 화면 폭에 따라 필터를 1차/상세로 나누고, 적용 상태를 명확히 표시합니다.
          </p>
        </div>
        <BulletCard title="필터 규칙" items={filterRules} />
        <ExampleCard
          title="필터 바 조합 예시"
          description="검색 + 상태 + 기간 + 적용/초기화 버튼의 기본 조합입니다. 기간 필터는 `Date Range Picker`를 사용합니다."
          code={filterBarCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">라이브 조합 QA 프리뷰</h2>
          <p className="text-body-sm text-muted-foreground">
            실제 컴포넌트 조합으로 간격/계층/버튼 역할을 확인하는 샘플입니다. `secondary`는 보조 CTA(tonal), 라인 버튼은 `outline`으로 사용합니다.
          </p>
        </div>
        <FilterBarPreview />
        <TableToolbarPreview />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">테이블/목록 패턴</h2>
          <p className="text-body-sm text-muted-foreground">
            `Table`, `Dropdown Menu`, `Pagination` 조합 시 액션 위치와 상태 표현 규칙을 고정합니다.
          </p>
        </div>
        <BulletCard title="테이블 규칙" items={tableRules} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">로딩 패턴</h2>
          <p className="text-body-sm text-muted-foreground">
            초기 로딩과 재조회 로딩을 분리하면 화면 점프를 줄이고 상태 의미를 명확히 전달할 수 있습니다.
          </p>
        </div>
        <BulletCard title="로딩 규칙" items={loadingRules} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">상태별 표현</h2>
          <p className="text-body-sm text-muted-foreground">
            로딩/빈 상태/오류는 서로 다른 의미를 전달해야 하며, 레이아웃 구조는 최대한 유지합니다.
          </p>
        </div>
        <StateTable rows={states} />
        <ExampleCard
          title="로딩/빈 상태/에러 분기 예시"
          description="상태별 의미를 분리하되 컨테이너 구조는 최대한 유지하는 패턴입니다."
          code={tableStateCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">QA 체크리스트</h2>
          <p className="text-body-sm text-muted-foreground">
            데이터 화면 리뷰에서는 API 성공 케이스뿐 아니라 상태 전환과 반응 속도 체감을 함께 확인합니다.
          </p>
        </div>
        <BulletCard title="데이터 화면 QA 항목" items={reviewChecklist} />
      </section>
    </div>
  );
}
