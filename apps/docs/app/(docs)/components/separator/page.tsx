import CodeSnippet from "../../_components/CodeSnippet";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const basicCode = `import { Separator } from "@/components/ui/separator";

export function BasicSeparator() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-body-sm text-[color:var(--gray-900)]">계정 설정</p>
      <p className="mt-1 text-caption text-muted-foreground">
        프로필, 보안, 알림 설정을 관리합니다.
      </p>
      <Separator className="my-4" />
      <p className="text-body-sm text-muted-foreground">
        구분선은 서로 다른 정보 그룹 사이에만 사용합니다.
      </p>
    </div>
  );
}`;

const verticalCode = `import { Separator } from "@/components/ui/separator";

export function VerticalSeparator() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
      <span className="text-body-sm text-[color:var(--gray-900)]">전체</span>
      <Separator className="h-4 w-px shrink-0" />
      <span className="text-body-sm text-muted-foreground">진행 중 12</span>
      <Separator className="h-4 w-px shrink-0" />
      <span className="text-body-sm text-muted-foreground">완료 8</span>
    </div>
  );
}`;

export default function SeparatorDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Separator</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          정보 그룹 사이를 시각적으로 구분하는 구분선 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          카드/패널 안에서 서로 다른 정보 블록을 나눌 때 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Card variant="outlined" className="space-y-0">
            <p className="text-body-sm text-[color:var(--gray-900)]">계정 설정</p>
            <p className="mt-1 text-caption text-muted-foreground">
              프로필, 보안, 알림 설정을 관리합니다.
            </p>
            <Separator className="my-4" />
            <p className="text-body-sm text-muted-foreground">
              구분선은 서로 다른 정보 그룹 사이에만 사용합니다.
            </p>
          </Card>
        </div>
        <CodeSnippet title="Separator 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">세로 구분선</h2>
        <p className="text-body-sm text-muted-foreground">
          현재 컴포넌트는 기본 가로 구분선이며, 세로 구분선은{" "}
          <code>className</code>으로 높이와 너비를 조정해 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
            <span className="text-body-sm text-[color:var(--gray-900)]">전체</span>
            <Separator className="h-4 w-px shrink-0" />
            <span className="text-body-sm text-muted-foreground">진행 중 12</span>
            <Separator className="h-4 w-px shrink-0" />
            <span className="text-body-sm text-muted-foreground">완료 8</span>
          </div>
        </div>
        <CodeSnippet title="세로 Separator 예시" code={verticalCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>정보 그룹이 명확히 달라질 때만 사용합니다.</li>
          <li>단순 간격 조절 목적이면 Separator 대신 spacing을 사용합니다.</li>
          <li>세로 구분선은 짧은 메타 정보에서만 제한적으로 사용합니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          장식용 구분선은 시각적 구분 용도로만 사용하고, 의미 전달은 제목/레이블
          텍스트로 제공합니다.
        </p>
      </section>
    </div>
  );
}
