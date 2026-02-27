"use client";

import CodeSnippet from "../../_components/CodeSnippet";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const basicCode = `import { Skeleton } from "@/components/ui/skeleton";

export function BasicSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}`;

const shapesCode = `import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonShapes() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton shape="circle" className="h-12 w-12" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton shape="pill" className="h-8 w-20" />
    </div>
  );
}`;

const cardCode = `import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card variant="outlined" className="space-y-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex gap-2">
        <Skeleton shape="pill" className="h-8 w-20" />
        <Skeleton shape="pill" className="h-8 w-24" />
      </div>
    </Card>
  );
}`;

export default function SkeletonDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Skeleton</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          데이터 로딩 중 레이아웃 구조를 먼저 보여주는 플레이스홀더 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          텍스트, 제목, 요약 영역은 줄 단위 skeleton을 조합해서 표현합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <CodeSnippet title="Skeleton 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Shape</h2>
        <p className="text-body-sm text-muted-foreground">
          아바타/칩/문장 등 UI 구조에 맞춰 <code>rect</code>, <code>pill</code>,{" "}
          <code>circle</code>을 조합합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex items-center gap-4">
            <Skeleton shape="circle" className="h-12 w-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton shape="pill" className="h-8 w-20" />
          </div>
        </div>
        <CodeSnippet title="Skeleton Shape 예시" code={shapesCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">카드 로딩 예시</h2>
        <p className="text-body-sm text-muted-foreground">
          실제 카드 레이아웃 구조를 유지하면 로딩 완료 시 점프가 줄어듭니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Card variant="outlined" className="space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex gap-2">
              <Skeleton shape="pill" className="h-8 w-20" />
              <Skeleton shape="pill" className="h-8 w-24" />
            </div>
          </Card>
        </div>
        <CodeSnippet title="Skeleton 카드 예시" code={cardCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <p className="text-body-sm text-muted-foreground">
          로딩 중 레이아웃 점프를 줄이고 사용자가 화면 구조를 미리 이해할 수 있도록
          콘텐츠 형태에 맞춰 Skeleton을 배치합니다.
        </p>
      </section>
    </div>
  );
}
