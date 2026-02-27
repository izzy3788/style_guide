"use client";

import * as React from "react";
import Link from "next/link";

import CodeSnippet from "../../_components/CodeSnippet";
import { Command, type CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const commandItems: CommandItem[] = [
  { group: "탐색", value: "dashboard", label: "대시보드로 이동" },
  { group: "탐색", value: "projects", label: "프로젝트 목록" },
  { group: "탐색", value: "members", label: "멤버 관리" },
  { group: "작업", value: "new-project", label: "새 프로젝트 생성" },
  { group: "작업", value: "invite", label: "멤버 초대" },
  { group: "작업", value: "billing", label: "결제 설정" },
];

const emptyStateItems: CommandItem[] = [
  { value: "design-system", label: "Design System", keywords: ["디자인", "시스템"] },
  { value: "frontend-platform", label: "Frontend Platform", keywords: ["프론트"] },
  { value: "ops", label: "Ops", keywords: ["infra", "devops"] },
];

const basicCode = `import * as React from "react";
import { Command } from "@/components/ui/command";

const items = [
  { group: "탐색", value: "dashboard", label: "대시보드로 이동" },
  { group: "작업", value: "new-project", label: "새 프로젝트 생성" },
];

export function BasicCommand() {
  const [value, setValue] = React.useState("dashboard");

  return (
    <Command
      items={items}
      value={value}
      onValueChange={setValue}
      onSelectItem={(item) => console.log(item.value)}
      placeholder="검색 또는 명령 입력..."
    />
  );
}`;

const emptyCode = `import { Command } from "@/components/ui/command";

const items = [
  { value: "design-system", label: "Design System", keywords: ["디자인"] },
  { value: "frontend-platform", label: "Frontend Platform", keywords: ["프론트"] },
];

export function EmptyStateCommand() {
  return (
    <Command
      items={items}
      placeholder="팀 검색"
      emptyText="일치하는 명령/결과가 없습니다."
    />
  );
}`;

const dialogCode = `import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Command } from "@/components/ui/command";

export function CommandPaletteDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">명령 팔레트 열기</Button>
      </DialogTrigger>
        <DialogContent size="lg" className="p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>명령 팔레트</DialogTitle>
        </DialogHeader>
        <Command
          className="rounded-lg"
          items={items}
          onSelectItem={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}`;

export default function CommandDocsPage() {
  const [selected, setSelected] = React.useState("dashboard");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Command</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          검색 기반 명령/이동 리스트 컴포넌트입니다. 전역 검색, 빠른 이동, 작업 실행
          UI에 사용합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          입력값으로 필터링하고 방향키로 항목을 이동한 뒤 `Enter`로 선택할 수 있습니다.
        </p>
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-muted-30 p-6">
          <Command
            items={commandItems}
            value={selected}
            onValueChange={setSelected}
            onSelectItem={(item) => setSelected(item.value)}
            placeholder="페이지 이동 또는 작업 검색..."
          />
        </div>
        <CodeSnippet title="Command 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">검색 / 빈 상태</h2>
        <p className="text-body-sm text-muted-foreground">
          키워드 검색 결과가 없으면 빈 상태 메시지를 표시합니다.
        </p>
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-muted-30 p-6">
          <Command
            items={emptyStateItems}
            placeholder="팀 검색"
            emptyText="일치하는 명령/결과가 없습니다."
          />
        </div>
        <CodeSnippet title="검색/빈 상태 예시" code={emptyCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Dialog 조합 (명령 팔레트)</h2>
        <p className="text-body-sm text-muted-foreground">
          전역 명령 팔레트는 `Dialog` 안에 배치하는 패턴을 권장합니다. 선택 시 닫히도록
          처리합니다.
        </p>
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-muted-30 p-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">명령 팔레트 열기</Button>
            </DialogTrigger>
            <DialogContent size="lg" className="p-0">
              <DialogHeader className="sr-only">
                <DialogTitle>명령 팔레트</DialogTitle>
                <DialogDescription>빠른 이동/작업 실행</DialogDescription>
              </DialogHeader>
              <Command
                className="rounded-lg"
                items={commandItems}
                onSelectItem={() => setOpen(false)}
                placeholder="명령 검색..."
              />
            </DialogContent>
          </Dialog>
        </div>
        <CodeSnippet title="Dialog 조합 예시" code={dialogCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>
            `Combobox`는 &quot;값 선택&quot;, `Command`는 &quot;검색 + 이동/실행&quot;에 사용합니다.
          </li>
          <li>전역 명령 팔레트는 `Dialog`, 페이지 내부 검색 패널은 단독 `Command`를 권장합니다.</li>
          <li>모바일에서 명령 수가 많으면 `Sheet` 조합으로 확장할 수 있습니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          키보드 이동(`Arrow Up/Down`, `Enter`)을 지원해야 하며, 전역 명령 팔레트는
          `Dialog`로 감싸 포커스 이동/복귀를 보장하는 것을 권장합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>초기 포커스가 검색 input으로 이동하는지 확인합니다.</li>
          <li>`Arrow Up/Down` 이동 후 `Enter` 선택 동작을 확인합니다.</li>
          <li>`Esc`로 닫힌 뒤 Trigger로 포커스가 복귀하는지 확인합니다.</li>
          <li>스크린리더에서 그룹/옵션 읽기 순서가 자연스러운지 수동 점검합니다.</li>
        </ul>
      </section>
    </div>
  );
}
