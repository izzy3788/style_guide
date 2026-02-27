"use client";

import CodeSnippet from "../../_components/CodeSnippet";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const destructiveCode = `import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 데이터는 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">취소</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">삭제</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

const standardCode = `import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function PublishAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>게시하기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>변경 사항을 게시할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            게시 후에는 모든 사용자에게 즉시 반영됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">취소</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>게시</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

export default function AlertDialogDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Alert Dialog</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          되돌릴 수 없는 작업이나 중요한 결정을 확인할 때 사용하는 모달입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Destructive 확인</h2>
        <p className="text-body-sm text-muted-foreground">
          파괴적 액션은 설명 문구를 명확히 제공하고 우측 액션 버튼에{" "}
          <code>destructive</code> 스타일을 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete project</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>프로젝트를 삭제할까요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    삭제된 데이터는 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="outline">취소</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant="destructive">삭제</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <CodeSnippet title="Alert Dialog Destructive 예시" code={destructiveCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">일반 확인</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>게시하기</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>변경 사항을 게시할까요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    게시 후에는 모든 사용자에게 즉시 반영됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="outline">취소</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button>게시</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <CodeSnippet title="Alert Dialog 기본 예시" code={standardCode} copyable />
      </section>
    </div>
  );
}
