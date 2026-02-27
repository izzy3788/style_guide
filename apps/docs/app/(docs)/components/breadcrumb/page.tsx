"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const basicCode = `import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">컴포넌트</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbCurrent>Breadcrumb</BreadcrumbCurrent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

const deepCode = `import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DeepBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace">워크스페이스</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace/projects">프로젝트</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbCurrent>설정</BreadcrumbCurrent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

const compactCode = `import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CompactBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-caption">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbCurrent>주문 상세</BreadcrumbCurrent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

export default function BreadcrumbDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Breadcrumb</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          현재 위치와 상위 경로를 보여주는 내비게이션 패턴 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrent>Breadcrumb</BreadcrumbCurrent>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <CodeSnippet title="Breadcrumb 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">깊은 경로 + 축약</h2>
        <p className="text-body-sm text-muted-foreground">
          단계가 길어지면 중간 경로를 생략 기호로 축약할 수 있습니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/workspace">워크스페이스</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/workspace/projects">
                    프로젝트
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrent>설정</BreadcrumbCurrent>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <CodeSnippet title="Breadcrumb 축약 예시" code={deepCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Compact 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          모바일/좁은 카드 상단에서는 중간 경로를 생략하고, 대표 상위 경로와 현재 위치만
          표시합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList className="text-caption">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrent>주문 상세</BreadcrumbCurrent>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <CodeSnippet title="Breadcrumb compact 예시" code={compactCode} copyable />
      </section>
    </div>
  );
}
