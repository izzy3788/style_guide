"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const basicCode = `import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">도움말 열기</Button>
      </PopoverTrigger>
      <PopoverContent size="md" textWrap="keep">
        <div className="space-y-2">
          <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
            공유 설정 안내
          </p>
          <p className="text-sm text-foreground whitespace-normal break-words">
            링크를 가진 사용자만 접근할 수 있도록 권한을 제한할 수 있습니다.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

const formCode = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function FilterPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">필터</Button>
      </PopoverTrigger>
      <PopoverContent align="end" size="md">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
              담당자 필터
            </p>
            <p className="text-sm text-foreground whitespace-normal break-words">
              이름 또는 이메일로 검색합니다.
            </p>
          </div>
          <Input placeholder="예: yuna@company.com" />
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="outline">취소</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button>적용</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

const largeCode = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">검색 설정</Button>
      </PopoverTrigger>
      <PopoverContent align="end" size="lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
              검색 범위 설정
            </p>
            <p className="text-sm text-foreground whitespace-normal break-words">
              긴 한국어 안내 문장도 너무 좁아지지 않도록 기본 폭을 넓게 유지하고,
              필요한 옵션만 선택해서 검색 결과 범위를 줄일 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="시작일" />
            <Input placeholder="종료일" />
          </div>
          <Input placeholder="담당자 이메일 또는 키워드" />
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="outline">닫기</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button>적용</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

export default function PopoverDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Popover</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          트리거 근처에 짧은 설명, 설정, 보조 입력 UI를 띄우는 레이어 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          `Tooltip`보다 많은 정보를 담고, `Dialog`보다 가벼운 상호작용에 사용합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">도움말 열기</Button>
            </PopoverTrigger>
            <PopoverContent size="md" textWrap="keep">
              <div className="space-y-2">
                <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
                  공유 설정 안내
                </p>
                <p className="text-sm text-foreground whitespace-normal break-words">
                  링크를 가진 사용자만 접근할 수 있도록 권한을 제한할 수 있습니다.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CodeSnippet title="Popover 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">짧은 폼</h2>
        <p className="text-body-sm text-muted-foreground">
          필터/옵션처럼 문맥이 유지되어야 하는 짧은 입력은 Popover에 배치할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">필터</Button>
              </PopoverTrigger>
              <PopoverContent align="end" size="md">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
                      담당자 필터
                    </p>
                    <p className="text-sm text-foreground whitespace-normal break-words">
                      이름 또는 이메일로 검색합니다.
                    </p>
                  </div>
                  <Input placeholder="예: yuna@company.com" />
                  <div className="flex justify-end gap-2">
                    <PopoverClose asChild>
                      <Button variant="outline">
                        취소
                      </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                      <Button>적용</Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <CodeSnippet title="Popover 폼 예시" code={formCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">폭 사이즈 (lg)</h2>
        <p className="text-body-sm text-muted-foreground">
          입력 필드와 안내 문장이 함께 들어가는 경우 <code>size=&quot;lg&quot;</code>를 사용해
          가독성을 확보합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="flex justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">검색 설정</Button>
              </PopoverTrigger>
              <PopoverContent align="end" size="lg">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-body-sm font-medium text-[color:var(--gray-900)]">
                      검색 범위 설정
                    </p>
                    <p className="text-sm text-foreground whitespace-normal break-words">
                      긴 한국어 안내 문장도 너무 좁아지지 않도록 기본 폭을 넓게
                      유지하고, 필요한 옵션만 선택해서 검색 결과 범위를 줄일 수
                      있습니다.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="시작일" />
                    <Input placeholder="종료일" />
                  </div>
                  <Input placeholder="담당자 이메일 또는 키워드" />
                  <div className="flex justify-end gap-2">
                    <PopoverClose asChild>
                      <Button variant="outline">
                        닫기
                      </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                      <Button>적용</Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <CodeSnippet title="Popover lg 예시" code={largeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <p className="text-body-sm text-muted-foreground">
          읽기 전용 보조 설명은{" "}
          <Link className="underline" href="/components/tooltip">
            Tooltip
          </Link>
          , 목록 액션 선택은{" "}
          <Link className="underline" href="/components/dropdown-menu">
            Dropdown Menu
          </Link>
          , 중요한 확인/입력은{" "}
          <Link className="underline" href="/components/dialog">
            Dialog
          </Link>
          를 사용합니다.
        </p>
      </section>
    </div>
  );
}
