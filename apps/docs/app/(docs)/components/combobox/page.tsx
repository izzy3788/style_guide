"use client";

import * as React from "react";
import Link from "next/link";

import CodeSnippet from "../../_components/CodeSnippet";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const teamOptions: ComboboxOption[] = [
  { value: "design", label: "Design", keywords: ["디자인", "ui", "ux"] },
  { value: "frontend", label: "Frontend", keywords: ["프론트", "react"] },
  { value: "backend", label: "Backend", keywords: ["서버", "api"] },
  { value: "product", label: "Product", keywords: ["pm", "기획"] },
  { value: "marketing", label: "Marketing", keywords: ["마케팅"] },
];

const cityOptions: ComboboxOption[] = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "incheon", label: "인천" },
  { value: "daejeon", label: "대전" },
];

const basicCode = `import { Combobox } from "@/components/ui/combobox";

const teamOptions = [
  { value: "design", label: "Design", keywords: ["디자인", "ui", "ux"] },
  { value: "frontend", label: "Frontend", keywords: ["프론트", "react"] },
  { value: "backend", label: "Backend", keywords: ["서버", "api"] },
  { value: "product", label: "Product", keywords: ["pm", "기획"] },
];

export function BasicCombobox() {
  const [value, setValue] = React.useState("frontend");

  return (
    <Combobox
      options={teamOptions}
      value={value}
      onValueChange={setValue}
      placeholder="팀을 선택하세요"
      searchPlaceholder="팀 검색"
    />
  );
}`;

const searchCode = `import { Combobox } from "@/components/ui/combobox";

const cityOptions = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
];

export function SearchableCombobox() {
  return (
    <Combobox
      options={cityOptions}
      placeholder="도시를 선택하세요"
      searchPlaceholder="도시 검색"
      emptyText="일치하는 도시가 없습니다."
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
import { Combobox } from "@/components/ui/combobox";

const teamOptions = [
  { value: "design", label: "Design" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
];

export function ComboboxField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="md">
        <FieldLabel>담당 팀</FieldLabel>
        <FieldControl>
          <Combobox
            options={teamOptions}
            defaultValue="design"
            placeholder="팀을 선택하세요"
            searchPlaceholder="팀 검색"
          />
        </FieldControl>
        <FieldHelper>검색 가능한 선택 UI가 필요한 경우 사용합니다.</FieldHelper>
      </FieldRoot>

      <FieldRoot size="md" error>
        <FieldLabel>오류 상태</FieldLabel>
        <FieldControl>
          <Combobox options={teamOptions} placeholder="팀을 선택하세요" />
        </FieldControl>
        <FieldError>담당 팀을 선택해주세요.</FieldError>
      </FieldRoot>
    </div>
  );
}`;

export default function ComboboxDocsPage() {
  const [team, setTeam] = React.useState("frontend");

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Combobox</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          검색 가능한 단일 선택 컴포넌트입니다. 옵션 수가 많거나 라벨 검색이 필요한
          경우 `Select` 대신 사용합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          트리거를 누르면 검색 입력과 옵션 목록이 열리고, 키워드로 필터링할 수
          있습니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <Combobox
            options={teamOptions}
            value={team}
            onValueChange={setTeam}
            placeholder="팀을 선택하세요"
            searchPlaceholder="팀 검색"
          />
        </div>
        <CodeSnippet title="Combobox 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">검색 / 빈 상태</h2>
        <p className="text-body-sm text-muted-foreground">
          검색 결과가 없는 경우 빈 상태 메시지를 표시합니다. 모바일에서도 탭 영역을
          유지하기 위해 옵션 행 높이는 `Select`와 같은 규칙을 사용합니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <Combobox
            options={cityOptions}
            placeholder="도시를 선택하세요"
            searchPlaceholder="도시 검색"
            emptyText="일치하는 도시가 없습니다."
          />
        </div>
        <CodeSnippet title="검색/빈 상태 예시" code={searchCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Field 조합</h2>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="md">
              <FieldLabel>담당 팀</FieldLabel>
              <FieldControl>
                <Combobox
                  options={teamOptions}
                  defaultValue="design"
                  placeholder="팀을 선택하세요"
                  searchPlaceholder="팀 검색"
                />
              </FieldControl>
              <FieldHelper>검색 가능한 선택 UI가 필요한 경우 사용합니다.</FieldHelper>
            </FieldRoot>

            <FieldRoot size="md" error>
              <FieldLabel>오류 상태</FieldLabel>
              <FieldControl>
                <Combobox options={teamOptions} placeholder="팀을 선택하세요" />
              </FieldControl>
              <FieldError>담당 팀을 선택해주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 조합 예시" code={fieldCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>옵션이 적고 검색이 필요 없으면 `Select`를 우선 사용합니다.</li>
          <li>옵션 수가 많거나 라벨 검색이 필요하면 `Combobox`를 사용합니다.</li>
          <li>모바일에서 옵션 수가 매우 많으면 `Sheet` 기반 선택 화면으로 확장할 수 있습니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          `Field`와 함께 사용할 때 label, helper, error 텍스트를 연결해 상태를
          텍스트로 전달해야 합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
