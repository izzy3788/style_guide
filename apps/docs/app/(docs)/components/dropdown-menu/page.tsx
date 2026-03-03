"use client";

import * as React from "react";
import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const basicCode = `import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BasicDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="더보기" size="icon" variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>작업 메뉴</DropdownMenuLabel>
        <DropdownMenuItem>편집</DropdownMenuItem>
        <DropdownMenuItem>복제</DropdownMenuItem>
        <DropdownMenuItem>공유</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

const stateCode = `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function DropdownMenuStates() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">상태 예시</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>기본 항목</DropdownMenuItem>
        <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem danger>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

const checkboxCode = `import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">표시 옵션</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          상태 바
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          액티비티 바
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

export default function DropdownMenuDocsPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Dropdown Menu</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          컨텍스트 액션이나 보조 작업을 펼쳐 보여주는 메뉴 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="더보기" size="icon" variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업 메뉴</DropdownMenuLabel>
              <DropdownMenuItem>편집</DropdownMenuItem>
              <DropdownMenuItem>복제</DropdownMenuItem>
              <DropdownMenuItem>공유</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CodeSnippet title="Dropdown Menu 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          기본, 비활성, 파괴적 액션(danger) 상태를 제공합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">상태 예시</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>기본 항목</DropdownMenuItem>
              <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem danger>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CodeSnippet title="Dropdown Menu 상태 예시" code={stateCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">체크 항목</h2>
        <p className="text-body-sm text-muted-foreground">
          설정처럼 On/Off 가능한 항목은 체크 메뉴로 표현할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">표시 옵션</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                상태 바
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                액티비티 바
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CodeSnippet title="Dropdown Menu 체크 항목 예시" code={checkboxCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          메뉴 트리거는 버튼으로 제공하고, 메뉴 항목은 명확한 텍스트를 사용해야
          합니다. 모바일에서는 항목 수가 많거나 탭 영역이 좁아지기 쉬우므로
          `Dropdown Menu`보다{" "}
          <Link className="underline" href="/components/sheet">
            Sheet
          </Link>
          를 우선 사용합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>Trigger에서 `Enter/Space`로 메뉴를 열 수 있어야 합니다.</li>
          <li>열린 메뉴에서 `Arrow Up/Down`으로 항목 이동이 가능해야 합니다.</li>
          <li>`Esc`로 닫히고 포커스가 Trigger로 돌아와야 합니다.</li>
        </ul>
      </section>
    </div>
  );
}
