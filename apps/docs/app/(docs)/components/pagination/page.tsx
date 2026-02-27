"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const basicCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BasicPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;

const ellipsisCode = `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function EllipsisPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;

const dotCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export function DotPagination() {
  return (
    <Pagination>
      <PaginationContent className="justify-center gap-0">
        <PaginationItem>
          <PaginationLink href="#" type="dot" aria-label="1페이지">
            1페이지
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" type="dot" isActive aria-label="2페이지">
            2페이지
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" type="dot" aria-label="3페이지">
            3페이지
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" type="dot" aria-label="4페이지">
            4페이지
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;

const compactCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function CompactPagination() {
  return (
    <Pagination>
      <PaginationContent className="justify-center gap-2">
        <PaginationItem>
          <PaginationPrevious href="#" showLabel={false} />
        </PaginationItem>
        <PaginationItem className="px-1 text-caption text-[color:var(--gray-700)]">
          9 / 24 페이지
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" showLabel={false} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;

export default function PaginationDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Pagination</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          목록과 테이블에서 페이지 이동을 제공하는 내비게이션 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <CodeSnippet title="Pagination 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">긴 페이지 + 축약</h2>
        <p className="text-body-sm text-muted-foreground">
          페이지 수가 많을 때는 중간 번호를 축약 기호로 줄여 가독성을 유지합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    9
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <CodeSnippet title="Pagination 축약 예시" code={ellipsisCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">타입 (dot)</h2>
        <p className="text-body-sm text-muted-foreground">
          슬라이드/온보딩처럼 페이지 수가 적고 번호보다 위치 인지가 중요한 경우 dot 타입을
          사용할 수 있습니다. 본 예시는 PC 보조 인디케이터 기준 크기입니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Pagination>
              <PaginationContent className="justify-center gap-0">
                <PaginationItem>
                  <PaginationLink href="#" type="dot" aria-label="1페이지">
                    1페이지
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" type="dot" isActive aria-label="2페이지">
                    2페이지
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" type="dot" aria-label="3페이지">
                    3페이지
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" type="dot" aria-label="4페이지">
                    4페이지
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <CodeSnippet title="Pagination dot 타입 예시" code={dotCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Compact 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          좁은 영역에서는 이전/다음 버튼과 현재 페이지 정보만 표시해 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="bg-background px-4 py-3">
            <Pagination>
              <PaginationContent className="justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious href="#" showLabel={false} />
                </PaginationItem>
                <PaginationItem className="px-1 text-caption text-[color:var(--gray-700)]">
                  9 / 24 페이지
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" showLabel={false} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <CodeSnippet title="Pagination compact 예시" code={compactCode} copyable />
      </section>
    </div>
  );
}
