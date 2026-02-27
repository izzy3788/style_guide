"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const basicCode = `import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>팀에 초대할까요?</DialogTitle>
          <DialogDescription>
            이 작업은 즉시 적용되며 이후에 멤버 권한을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>초대하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export default function DialogDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Dialog</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          중요한 결정, 확인, 짧은 입력을 위한 모달 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 구조</h2>
        <p className="text-body-sm text-muted-foreground">
          Title, Description, Footer(취소/확인) 순서를 유지하고, 확인 버튼은 항상
          마지막에 배치합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent size="md">
                <DialogHeader>
                  <DialogTitle>팀에 초대할까요?</DialogTitle>
                  <DialogDescription>
                    이 작업은 즉시 적용되며 이후에 멤버 권한을 수정할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">취소</Button>
                  </DialogClose>
                  <Button>초대하기</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">폭 표준</h2>
        <p className="text-body-sm text-muted-foreground">
          콘텐츠 밀도에 따라 크기를 선택합니다. 기본값은 <code>md</code>입니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex flex-wrap justify-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Open sm
                </Button>
              </DialogTrigger>
              <DialogContent size="sm">
                <DialogHeader>
                  <DialogTitle>Small Dialog</DialogTitle>
                  <DialogDescription>
                    간단한 확인이나 짧은 안내 메시지에 사용합니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">닫기</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Open md
                </Button>
              </DialogTrigger>
              <DialogContent size="md">
                <DialogHeader>
                  <DialogTitle>Medium Dialog</DialogTitle>
                  <DialogDescription>
                    기본 폼 확인, 설정 변경 확인에 사용합니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">닫기</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Open lg
                </Button>
              </DialogTrigger>
              <DialogContent size="lg">
                <DialogHeader>
                  <DialogTitle>Large Dialog</DialogTitle>
                  <DialogDescription>
                    다중 필드 입력처럼 콘텐츠가 많은 경우에 사용합니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">닫기</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>
            <code>sm</code>: <code>max-w-[22rem] + p-5</code> (짧은 확인)
          </li>
          <li>
            <code>md</code>: <code>max-w-[28rem] + p-6</code> (기본)
          </li>
          <li>
            <code>lg</code>: <code>max-w-[36rem] + p-8</code> (콘텐츠 많음)
          </li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          ESC와 오버레이 클릭으로 닫히며, 다이얼로그가 열리면 배경 스크롤을
          잠급니다. 삭제/영구 변경 확인은{" "}
          <Link className="underline" href="/components/alert-dialog">
            Alert Dialog
          </Link>
          를 사용합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
