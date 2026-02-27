"use client";

import CodeSnippet from "../../_components/CodeSnippet";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const basicCode = `import { ScrollArea } from "@/components/ui/scroll-area";

export function BasicScrollArea() {
  return (
    <ScrollArea className="h-48 bg-gray-00 p-4">
      <div className="space-y-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="rounded-md border border-border bg-muted-40 px-3 py-2">
            <p className="text-body-sm text-[color:var(--gray-900)]">
              활동 로그 #{index + 1}
            </p>
            <p className="text-caption text-muted-foreground">
              최근 변경 내역을 시간순으로 표시합니다.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`;

const panelCode = `import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ScrollableFilterPanel() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-gray-00 p-4">
      <div className="flex items-center justify-between">
        <p className="text-title-sm text-[color:var(--gray-900)]">필터</p>
        <Badge size="sm">12개</Badge>
      </div>

      <ScrollArea className="h-64 bg-gray-00 p-3">
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <p className="text-body-sm text-[color:var(--gray-900)]">
                필터 그룹 {index + 1}
              </p>
              <p className="text-caption text-muted-foreground">
                옵션 설명 텍스트가 길어질 수 있습니다.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}`;

const tableCode = `import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ScrollableTableWrap() {
  return (
    <ScrollArea className="w-full">
      <Table className="min-w-[720px]">
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>역할</TableHead>
            <TableHead className="text-right">최근 로그인</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-[color:var(--gray-900)]">김유나</TableCell>
            <TableCell>yuna@company.com</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell className="text-right">오늘 10:24</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}`;

export default function ScrollAreaDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">ScrollArea</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          패널/리스트/표 영역에 독립적인 스크롤 컨테이너를 만드는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          고정 높이 영역에 긴 콘텐츠를 넣을 때 내부 스크롤 컨테이너로 사용합니다.
        </p>
        <ScrollArea className="h-48 bg-gray-00 p-4">
          <div className="space-y-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="rounded-md border border-border bg-muted-40 px-3 py-2"
              >
                <p className="text-body-sm text-[color:var(--gray-900)]">
                  활동 로그 #{index + 1}
                </p>
                <p className="text-caption text-muted-foreground">
                  최근 변경 내역을 시간순으로 표시합니다.
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <CodeSnippet title="ScrollArea 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">패널 내부 스크롤</h2>
        <p className="text-body-sm text-muted-foreground">
          `Sheet`나 필터 패널처럼 헤더/푸터를 유지하고 내용만 스크롤해야 할 때
          ScrollArea를 내부 콘텐츠 영역에 배치합니다.
        </p>
        <div className="space-y-4 rounded-lg border border-border bg-gray-00 p-4">
          <div className="flex items-center justify-between">
            <p className="text-title-sm text-[color:var(--gray-900)]">필터</p>
            <Badge size="sm">12개</Badge>
          </div>

          <ScrollArea className="h-64 bg-gray-00 p-3">
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-body-sm text-[color:var(--gray-900)]">
                    필터 그룹 {index + 1}
                  </p>
                  <p className="text-caption text-muted-foreground">
                    옵션 설명 텍스트가 길어질 수 있습니다.
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <CodeSnippet title="패널 내부 ScrollArea 예시" code={panelCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">테이블 가로 스크롤</h2>
        <p className="text-body-sm text-muted-foreground">
          좁은 화면에서는 `ScrollArea`로 테이블을 감싸고, 테이블에는 최소 너비를
          지정해 열이 무너지지 않도록 유지합니다.
        </p>
        <div>
          <ScrollArea className="w-full">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead className="text-right">최근 로그인</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-[color:var(--gray-900)]">김유나</TableCell>
                  <TableCell>yuna@company.com</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Designer</TableCell>
                  <TableCell className="text-right">오늘 10:24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-[color:var(--gray-900)]">이민준</TableCell>
                  <TableCell>minjun@company.com</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>Frontend</TableCell>
                  <TableCell className="text-right">어제 18:42</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <CodeSnippet title="테이블 ScrollArea 래퍼 예시" code={tableCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>스크롤이 필요한 영역만 분리하고 페이지 전체 스크롤과 중첩을 최소화합니다.</li>
          <li>`Sheet`/패널에서는 헤더·액션 영역을 고정하고 본문만 ScrollArea로 감쌉니다.</li>
          <li>테이블은 `ScrollArea + min-w-*` 조합으로 모바일 가로 스크롤을 처리합니다.</li>
        </ul>
      </section>
    </div>
  );
}
