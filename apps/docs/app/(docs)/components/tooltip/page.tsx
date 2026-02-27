"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const basicCode = `import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BasicTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="top">저장하면 즉시 반영됩니다.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;

const sideCode = `import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipSides() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}`;

const iconCode = `import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function IconTooltip() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            aria-label="도움말"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground focus-visible:bg-muted"
          >
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          아이콘은 hover 또는 focus에서 노출됩니다.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;

export default function TooltipDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Tooltip</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          짧은 보조 설명을 hover/focus에 노출하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent side="top">저장하면 즉시 반영됩니다.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CodeSnippet title="Tooltip 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">방향</h2>
        <p className="text-body-sm text-muted-foreground">
          콘텐츠 밀도에 맞춰 `top/right/bottom/left` 방향을 선택할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <TooltipProvider>
            <div className="grid grid-cols-2 gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">top</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">right</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">bottom</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">left</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <CodeSnippet title="Tooltip 방향 예시" code={sideCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">아이콘 버튼</h2>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  aria-label="도움말"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground focus-visible:bg-muted"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                아이콘은 hover 또는 focus에서 노출됩니다.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CodeSnippet title="아이콘 Tooltip 예시" code={iconCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Tooltip은 보조 설명 용도로만 사용하고, 핵심 정보는 본문에 직접 제공해야
          합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>Trigger는 hover뿐 아니라 keyboard focus에서도 Tooltip을 노출해야 합니다.</li>
          <li>아이콘 전용 Trigger는 `aria-label`을 반드시 제공합니다.</li>
          <li>모바일에서는 Tooltip 의존을 줄이고 필요한 정보는 본문에 우선 배치합니다.</li>
        </ul>
      </section>
    </div>
  );
}
