"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";

const basicCode = `import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";

export function BasicToast() {
  return (
    <Button
      onClick={() =>
        showToast({
          title: "저장 완료",
          description: "변경 사항이 반영되었습니다.",
        })
      }
      variant="outline"
    >
      Show toast
    </Button>
  );
}`;

const variantsCode = `import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";

export function ToastVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => showToast({ variant: "info", title: "알림", description: "신규 공지가 등록되었습니다." })}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => showToast({ variant: "success", title: "완료", description: "파일 업로드가 완료되었습니다." })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => showToast({ variant: "warning", title: "주의", description: "세션 만료가 5분 남았습니다." })}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => showToast({ variant: "destructive", title: "오류", description: "요청 처리에 실패했습니다." })}
      >
        Destructive
      </Button>
    </div>
  );
}`;

export default function ToastDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Toast</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          작업 결과를 짧게 안내하는 비차단 피드백 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          <code>showToast</code>를 호출하면 우측 상단에 토스트가 표시됩니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Button
            variant="outline"
            onClick={() =>
              showToast({
                title: "저장 완료",
                description: "변경 사항이 반영되었습니다.",
              })
            }
          >
            Show toast
          </Button>
        </div>
        <CodeSnippet title="Toast 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태 Variant</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: "info",
                  title: "알림",
                  description: "신규 공지가 등록되었습니다.",
                })
              }
            >
              Info
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: "success",
                  title: "완료",
                  description: "파일 업로드가 완료되었습니다.",
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: "warning",
                  title: "주의",
                  description: "세션 만료가 5분 남았습니다.",
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({
                  variant: "destructive",
                  title: "오류",
                  description: "요청 처리에 실패했습니다.",
                })
              }
            >
              Destructive
            </Button>
          </div>
        </div>
        <CodeSnippet title="Toast Variant 예시" code={variantsCode} copyable />
      </section>
    </div>
  );
}
