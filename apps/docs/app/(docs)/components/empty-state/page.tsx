"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import { FolderSearch, Lock, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

const basicCode = `import { FolderSearch } from "lucide-react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function SearchEmptyState() {
  return (
    <EmptyState>
      <EmptyStateIcon className="h-9 w-9">
        <FolderSearch className="h-4 w-4" />
      </EmptyStateIcon>
      <EmptyStateHeader>
        <EmptyStateTitle>검색 결과가 없습니다</EmptyStateTitle>
        <EmptyStateDescription>
          다른 키워드로 검색하거나 필터 조건을 초기화한 뒤 다시 시도해 주세요.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
  );
}`;

const actionCode = `import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function FirstProjectEmptyState() {
  return (
    <EmptyState size="lg" className="my-8">
      <EmptyStateIcon className="h-9 w-9">
        <Sparkles className="h-4 w-4" />
      </EmptyStateIcon>
      <EmptyStateHeader>
        <EmptyStateTitle>첫 프로젝트를 만들어 보세요</EmptyStateTitle>
        <EmptyStateDescription>
          프로젝트를 만들면 멤버를 초대하고, 작업 보드를 생성하고, 권한을 설정할 수 있습니다.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateActions>
        <Button>프로젝트 만들기</Button>
        <Button variant="outline">가이드 보기</Button>
      </EmptyStateActions>
    </EmptyState>
  );
}`;

const compactCode = `import { Lock } from "lucide-react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";

export function PermissionEmptyState() {
  return (
    <EmptyState size="sm">
      <EmptyStateIcon className="h-9 w-9">
        <Lock className="h-4 w-4" />
      </EmptyStateIcon>
      <EmptyStateHeader>
        <EmptyStateTitle className="text-body-sm">접근 권한이 없습니다</EmptyStateTitle>
        <EmptyStateDescription className="text-caption">
          관리자에게 권한 요청이 필요합니다.
        </EmptyStateDescription>
      </EmptyStateHeader>
    </EmptyState>
  );
}`;

export default function EmptyStateDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Empty State</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          데이터 없음, 검색 결과 없음, 초기 상태를 안내하는 패턴 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">검색 결과 없음</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="rounded-lg border border-border bg-background px-6">
            <EmptyState>
              <EmptyStateIcon className="h-9 w-9">
                <FolderSearch className="h-4 w-4" />
              </EmptyStateIcon>
              <EmptyStateHeader>
                <EmptyStateTitle>검색 결과가 없습니다</EmptyStateTitle>
                <EmptyStateDescription>
                  다른 키워드로 검색하거나 필터 조건을 초기화한 뒤 다시 시도해 주세요.
                </EmptyStateDescription>
              </EmptyStateHeader>
            </EmptyState>
          </div>
        </div>
        <CodeSnippet title="Empty State 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">초기 생성 + 액션</h2>
        <p className="text-body-sm text-muted-foreground">
          첫 진입 상태에서는 다음 행동을 바로 선택할 수 있도록 액션 버튼을 함께
          제공합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="rounded-lg border border-border bg-background px-6">
            <EmptyState size="lg" className="my-8">
              <EmptyStateIcon className="h-9 w-9">
                <Sparkles className="h-4 w-4" />
              </EmptyStateIcon>
              <EmptyStateHeader>
                <EmptyStateTitle>첫 프로젝트를 만들어 보세요</EmptyStateTitle>
                <EmptyStateDescription>
                  프로젝트를 만들면 멤버를 초대하고, 작업 보드를 생성하고, 권한을
                  설정할 수 있습니다.
                </EmptyStateDescription>
              </EmptyStateHeader>
              <EmptyStateActions>
                <Button>프로젝트 만들기</Button>
                <Button variant="outline">가이드 보기</Button>
              </EmptyStateActions>
            </EmptyState>
          </div>
        </div>
        <CodeSnippet title="Empty State 액션 예시" code={actionCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Compact 상태</h2>
        <p className="text-body-sm text-muted-foreground">
          카드 내부처럼 공간이 좁은 경우 <code>size=&quot;sm&quot;</code>으로 축약해 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <EmptyState size="sm">
            <EmptyStateIcon className="h-9 w-9">
              <Lock className="h-4 w-4" />
            </EmptyStateIcon>
            <EmptyStateHeader>
              <EmptyStateTitle className="text-body-sm">
                접근 권한이 없습니다
              </EmptyStateTitle>
              <EmptyStateDescription className="text-caption">
                관리자에게 권한 요청이 필요합니다.
              </EmptyStateDescription>
            </EmptyStateHeader>
          </EmptyState>
        </div>
        <CodeSnippet title="Empty State compact 예시" code={compactCode} copyable />
      </section>
    </div>
  );
}
