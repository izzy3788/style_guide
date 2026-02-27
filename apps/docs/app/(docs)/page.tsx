import Link from "next/link";

export default function DocsHome() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg">디자인 시스템 문서</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          일관된 제품 UI를 위한 Foundations와 Components를 정리합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>
      <div className="not-prose grid gap-6 sm:grid-cols-2">
        <Link
          className="rounded-xl border border-border p-6 transition hover:border-[color:var(--gray-300)] hover:bg-[color:var(--gray-50)]"
          href="/foundations/colors"
        >
          <div className="text-body-sm text-[color:var(--gray-900)]">Foundations</div>
          <div className="mt-2 text-body-sm text-muted-foreground">
            색상, 타이포그래피, 간격, 토큰 규칙.
          </div>
        </Link>
        <Link
          className="rounded-xl border border-border p-6 transition hover:border-[color:var(--gray-300)] hover:bg-[color:var(--gray-50)]"
          href="/components/button"
        >
          <div className="text-body-sm text-[color:var(--gray-900)]">Components</div>
          <div className="mt-2 text-body-sm text-muted-foreground">
            UI 컴포넌트와 사용 가이드.
          </div>
        </Link>
        <Link
          className="rounded-xl border border-border p-6 transition hover:border-[color:var(--gray-300)] hover:bg-[color:var(--gray-50)]"
          href="/components/badge"
        >
          <div className="text-body-sm text-[color:var(--gray-900)]">Badge</div>
          <div className="mt-2 text-body-sm text-muted-foreground">
            상태/카테고리 라벨 크기 가이드.
          </div>
        </Link>
      </div>
    </div>
  );
}
