"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const basicCode = `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BasicAlert() {
  return (
    <Alert>
      <AlertTitle>연결 상태를 확인해 주세요.</AlertTitle>
      <AlertDescription>
        네트워크가 불안정하면 저장 작업이 지연될 수 있습니다.
      </AlertDescription>
    </Alert>
  );
}`;

const variantsCode = `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertVariants() {
  return (
    <div className="space-y-3">
      <Alert variant="info">
        <AlertTitle>정보</AlertTitle>
        <AlertDescription>새로운 업데이트가 배포되었습니다.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>완료</AlertTitle>
        <AlertDescription>설정이 정상적으로 저장되었습니다.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>주의</AlertTitle>
        <AlertDescription>만료일이 3일 남았습니다.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>요청을 처리하지 못했습니다.</AlertDescription>
      </Alert>
    </div>
  );
}`;

export default function AlertDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Alert</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          화면 안에 고정 배치되어 중요한 상태를 안내하는 메시지 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Alert>
            <AlertTitle>연결 상태를 확인해 주세요.</AlertTitle>
            <AlertDescription>
              네트워크가 불안정하면 저장 작업이 지연될 수 있습니다.
            </AlertDescription>
          </Alert>
        </div>
        <CodeSnippet title="Alert 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태 Variant</h2>
        <p className="text-body-sm text-muted-foreground">
          상황에 따라 <code>info</code>, <code>success</code>, <code>warning</code>,{" "}
          <code>destructive</code>를 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <Alert variant="info">
              <AlertTitle>정보</AlertTitle>
              <AlertDescription>새로운 업데이트가 배포되었습니다.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>완료</AlertTitle>
              <AlertDescription>설정이 정상적으로 저장되었습니다.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>주의</AlertTitle>
              <AlertDescription>만료일이 3일 남았습니다.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>요청을 처리하지 못했습니다.</AlertDescription>
            </Alert>
          </div>
        </div>
        <CodeSnippet title="Alert Variant 예시" code={variantsCode} copyable />
      </section>
    </div>
  );
}
