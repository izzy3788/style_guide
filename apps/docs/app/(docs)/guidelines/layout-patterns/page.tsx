import CodeSnippet from "../../_components/CodeSnippet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

const fixedSidebarCode = `export function FixedSidebarLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border bg-card p-4">
        <div className="text-body-sm font-semibold">프로젝트 메뉴</div>
      </aside>

      <main className="pl-60">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
          <h1 className="text-title-md">대시보드</h1>
        </header>

        <div className="space-y-6 p-6">
          <section className="rounded-xl border border-border p-6">콘텐츠 영역</section>
        </div>
      </main>
    </div>
  );
}`;

const collapsibleSidebarCode = `"use client";

export function CollapsibleSidebarLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <button onClick={() => setOpen(true)} className="rounded-md border border-border px-3 py-1 text-body-sm lg:hidden">
          메뉴
        </button>
        <div className="text-body-sm font-semibold">주문 관리</div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-border p-4 lg:block">사이드 메뉴</aside>
        <main className="min-w-0 flex-1 p-6">콘텐츠</main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-scrim-40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card p-6">모바일 메뉴</aside>
        </div>
      ) : null}
    </div>
  );
}`;

const headerTabsCode = `export function HeaderWithSubnavLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <h1 className="text-title-sm">팀 설정</h1>
          <div className="text-body-sm text-muted-foreground">액션 버튼 영역</div>
        </div>
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-2 px-6">
          <button className="rounded-md bg-muted px-3 py-1 text-body-sm">일반</button>
          <button className="rounded-md px-3 py-1 text-body-sm text-muted-foreground">멤버</button>
          <button className="rounded-md px-3 py-1 text-body-sm text-muted-foreground">권한</button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <section className="rounded-xl border border-border p-6">콘텐츠 영역</section>
      </main>
    </div>
  );
}`;

const checklist = [
  "헤더 높이와 사이드바 너비를 페이지마다 바꾸지 않는다.",
  "주요 액션은 헤더 우측 또는 콘텐츠 상단 중 한 위치로 고정한다.",
  "모바일에서는 사이드 메뉴를 Sheet/Drawer로 전환하고 배경 스크림을 제공한다.",
  "페이지 이동 시 콘텐츠 래퍼 폭(`max-w-*`)과 좌우 패딩을 일관되게 유지한다.",
];

function PatternCard({
  title,
  description,
  preview,
  code,
}: {
  title: string;
  description: string;
  preview: ReactNode;
  code: string;
}) {
  return (
    <Card variant="outlined" padding="md" className="not-prose">
      <CardHeader className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {preview}
        <CodeSnippet title="기본 코드" code={code} copyable />
      </CardContent>
    </Card>
  );
}

export default function LayoutPatternsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">레이아웃 구성</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          사이드 메뉴와 헤더를 조합해 실제 제품 화면에 바로 적용할 수 있는 레이아웃 패턴을 정리합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">언제 쓰나</h2>
        <ul className="list-disc space-y-2 pl-5 text-body-sm text-muted-foreground">
          <li>페이지 간 공통 네비게이션이 필요한 관리형 화면</li>
          <li>상단에서 검색/필터/주요 액션을 반복 제공해야 하는 화면</li>
          <li>데스크톱과 모바일에서 네비게이션 전략을 분리해야 하는 화면</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">조합 A: 고정 사이드 메뉴 + 페이지 헤더</h2>
        <PatternCard
          title="Admin 기본형"
          description="메뉴를 고정하고 헤더를 상단에 유지해, 화면 전환이 잦은 백오피스에서 탐색 비용을 줄입니다."
          preview={
            <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--gray-00)]">
              <div className="grid min-h-[220px] grid-cols-[160px_1fr]">
                <aside className="border-r border-border bg-[color:var(--gray-50)] p-4 text-caption text-muted-foreground">사이드 메뉴</aside>
                <div className="flex flex-col">
                  <div className="h-12 border-b border-border px-4 py-3 text-caption text-muted-foreground">페이지 헤더 (sticky)</div>
                  <div className="flex-1 p-4">
                    <div className="rounded-lg border border-border p-4 text-body-sm text-muted-foreground">콘텐츠 영역</div>
                  </div>
                </div>
              </div>
            </div>
          }
          code={fixedSidebarCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">조합 B: 접이식 사이드 메뉴 + 스티키 헤더</h2>
        <PatternCard
          title="Responsive 운영형"
          description="데스크톱은 고정 사이드바, 모바일은 Drawer로 전환해 동일한 정보 구조를 유지합니다."
          preview={
            <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--gray-00)]">
              <div className="h-12 border-b border-border px-4 py-3 text-caption text-muted-foreground">스티키 헤더 + 모바일 메뉴 버튼</div>
              <div className="grid min-h-[200px] grid-cols-[160px_1fr]">
                <aside className="border-r border-border bg-[color:var(--gray-50)] p-4 text-caption text-muted-foreground">데스크톱 사이드 메뉴</aside>
                <div className="p-4">
                  <div className="rounded-lg border border-border p-4 text-body-sm text-muted-foreground">콘텐츠 영역</div>
                  <div className="mt-3 rounded-lg border border-dashed border-border p-3 text-caption text-muted-foreground">모바일: Drawer + Scrim</div>
                </div>
              </div>
            </div>
          }
          code={collapsibleSidebarCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">조합 C: 상단 헤더 + 보조 내비 탭</h2>
        <PatternCard
          title="Settings 상세형"
          description="사이드 메뉴 없이 헤더 아래 탭을 두어 세부 영역을 분리합니다. 팀 설정/조직 관리에 적합합니다."
          preview={
            <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--gray-00)]">
              <div className="h-12 border-b border-border px-4 py-3 text-caption text-muted-foreground">메인 헤더</div>
              <div className="flex h-10 items-center gap-2 border-b border-border px-4 text-caption text-muted-foreground">
                <span className="rounded-md bg-muted px-2 py-1 text-[color:var(--gray-900)]">일반</span>
                <span className="px-2 py-1">멤버</span>
                <span className="px-2 py-1">권한</span>
              </div>
              <div className="p-4">
                <div className="rounded-lg border border-border p-4 text-body-sm text-muted-foreground">콘텐츠 영역</div>
              </div>
            </div>
          }
          code={headerTabsCode}
        />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">실행 체크리스트</h2>
        <Separator />
        <ul className="list-disc space-y-2 pl-5 text-body-sm text-muted-foreground">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
