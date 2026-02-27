"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Menu, Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const basicCode = `import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="메뉴 열기">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" desktopWidth={280} className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-title-sm text-[color:var(--gray-900)]">워크스페이스</p>
              <p className="text-caption text-muted-foreground">모바일/태블릿 전체 폭 메뉴</p>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="메뉴 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <Separator />
          <nav className="space-y-1">
            <a className="block rounded-md px-3 py-2 text-body-sm hover:bg-muted" href="#">
              대시보드
            </a>
            <a className="block rounded-md px-3 py-2 text-body-sm hover:bg-muted" href="#">
              프로젝트
            </a>
            <a className="block rounded-md px-3 py-2 text-body-sm hover:bg-muted" href="#">
              팀 설정
            </a>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}`;

const sideCode = `import { Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SideVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Left Sheet</Button>
        </SheetTrigger>
        <SheetContent side="left" desktopWidth={280} className="p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-title-sm text-[color:var(--gray-900)]">탐색 메뉴</p>
              <p className="mt-1 text-caption text-muted-foreground">
                모바일/태블릿 full, 웹에서는 left side
              </p>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="패널 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings2 className="mr-1 h-4 w-4" />
            Right Sheet
          </Button>
        </SheetTrigger>
        <SheetContent side="right" desktopWidth={320} className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-title-sm text-[color:var(--gray-900)]">필터 설정</p>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="패널 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <Separator className="my-3" />
          <div className="space-y-3 text-body-sm text-muted-foreground">
            <p>상태, 담당자, 기간 필터를 여기에서 구성합니다.</p>
            <Button className="w-full">적용</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}`;

export default function SheetDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Sheet</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          모바일/태블릿에서는 전체 폭 패널, 웹에서는 사이드 패널로 사용하는
          드로어 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          모바일/태블릿에서는 full-width로 열고, 웹에서는 side 패널 폭을 유지합니다.
          full-width 패턴에서는 헤더 타이틀과 명시적인 닫기 버튼을 함께 제공합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto flex max-w-md justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="메뉴 열기">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" desktopWidth={280} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-title-sm text-[color:var(--gray-900)]">
                        워크스페이스
                      </p>
                      <p className="text-caption text-muted-foreground">
                        모바일/태블릿 전체 폭 메뉴
                      </p>
                    </div>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        aria-label="메뉴 닫기"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  <Separator />
                  <nav className="space-y-1">
                    <a
                      className="block rounded-md px-3 py-2 text-body-sm text-[color:var(--gray-900)] hover:bg-muted"
                      href="#"
                    >
                      대시보드
                    </a>
                    <a
                      className="block rounded-md px-3 py-2 text-body-sm text-[color:var(--gray-900)] hover:bg-muted"
                      href="#"
                    >
                      프로젝트
                    </a>
                    <a
                      className="block rounded-md px-3 py-2 text-body-sm text-[color:var(--gray-900)] hover:bg-muted"
                      href="#"
                    >
                      팀 설정
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <CodeSnippet title="Sheet 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Side 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          모바일/태블릿에서는 full-width가 기본이며, 웹에서는 내비게이션은 왼쪽,
          필터/설정은 오른쪽 side Sheet를 주로 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex flex-wrap justify-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Left Sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="left" desktopWidth={280} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-title-sm text-[color:var(--gray-900)]">
                      탐색 메뉴
                    </p>
                    <p className="mt-1 text-caption text-muted-foreground">
                      모바일/태블릿 full, 웹 left side
                    </p>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      aria-label="패널 닫기"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-1 h-4 w-4" />
                  Right Sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="right" desktopWidth={320} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-title-sm text-[color:var(--gray-900)]">
                    필터 설정
                  </p>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      aria-label="패널 닫기"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
                <Separator className="my-3" />
                <div className="space-y-3 text-body-sm text-muted-foreground">
                  <p>상태, 담당자, 기간 필터를 여기에서 구성합니다.</p>
                  <Button className="w-full">적용</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <CodeSnippet title="Sheet side 예시" code={sideCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>모바일/태블릿에서는 full-width Sheet를 기본 패턴으로 사용합니다.</li>
          <li>웹(데스크톱)에서는 side Sheet(좌/우 고정 폭)를 기본으로 사용합니다.</li>
          <li>닫기 버튼은 full-width 패턴에서 표시하고, 웹 side 패턴에서는 보통 생략합니다.</li>
          <li>짧은 확인/결정은 `Dialog`, 파괴적 확인은 `Alert Dialog`를 사용합니다.</li>
          <li>좁은 화면에서는 `Dropdown Menu`보다 `Sheet`가 더 읽기 쉽고 탭하기 쉽습니다.</li>
          <li>웹 side Sheet 폭은 콘텐츠 밀도에 따라 260~320px 범위에서 유지합니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          현재 `Sheet`는 오버레이 클릭과 `ESC`로 닫을 수 있습니다. full-width
          패턴(모바일/태블릿)에서는 헤더 타이틀과 명시적인 닫기 버튼(`SheetClose`)을
          패널 내부에 함께 제공하는 것을 권장하며, 웹 side 패턴에서는 필요 시에만
          추가합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
