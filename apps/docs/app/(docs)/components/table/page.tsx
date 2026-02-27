"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const basicCode = `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BasicTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>프로젝트</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead className="text-right">업데이트</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-[color:var(--gray-900)]">
            결제 리뉴얼
          </TableCell>
          <TableCell>진행 중</TableCell>
          <TableCell>김유나</TableCell>
          <TableCell className="text-right">2시간 전</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-[color:var(--gray-900)]">
            온보딩 개선
          </TableCell>
          <TableCell>검토 대기</TableCell>
          <TableCell>이민준</TableCell>
          <TableCell className="text-right">어제</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`;

const statesCode = `import { Search } from "lucide-react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableStates() {
  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-14" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>검색 결과</TableHead>
            <TableHead>설명</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="py-6">
              <EmptyState size="sm">
                <EmptyStateIcon>
                  <Search className="h-4 w-4" />
                </EmptyStateIcon>
                <EmptyStateHeader>
                  <EmptyStateTitle className="text-body-sm">결과가 없습니다</EmptyStateTitle>
                  <EmptyStateDescription className="text-caption">
                    필터를 조정하거나 검색어를 변경해보세요.
                  </EmptyStateDescription>
                </EmptyStateHeader>
              </EmptyState>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}`;

const mobileCode = `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MobileScrollableTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[140px]">이름</TableHead>
          <TableHead className="min-w-[140px]">이메일</TableHead>
          <TableHead className="min-w-[120px]">부서</TableHead>
          <TableHead className="min-w-[120px]">역할</TableHead>
          <TableHead className="min-w-[120px] text-right">최근 로그인</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-[color:var(--gray-900)]">김유나</TableCell>
          <TableCell>yuna@company.com</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell className="text-right">오늘 10:24</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`;

export default function TableDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Table</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          구조화된 데이터 목록을 표시하는 표 컴포넌트입니다. 헤더/행/셀 구조와
          가로 스크롤 래퍼를 함께 제공합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          헤더는 `TableHeader`, 데이터 영역은 `TableBody`로 분리하고, 숫자/시간처럼
          비교가 필요한 열은 우측 정렬을 사용합니다.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>프로젝트</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>담당자</TableHead>
              <TableHead className="text-right">업데이트</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-[color:var(--gray-900)]">
                결제 리뉴얼
              </TableCell>
              <TableCell>진행 중</TableCell>
              <TableCell>김유나</TableCell>
              <TableCell className="text-right">2시간 전</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-[color:var(--gray-900)]">
                온보딩 개선
              </TableCell>
              <TableCell>검토 대기</TableCell>
              <TableCell>이민준</TableCell>
              <TableCell className="text-right">어제</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-[color:var(--gray-900)]">
                관리자 권한 정리
              </TableCell>
              <TableCell>완료</TableCell>
              <TableCell>박가은</TableCell>
              <TableCell className="text-right">3일 전</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CodeSnippet title="Table 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          로딩 중에는 행 단위 `Skeleton`, 결과 없음 상태는 표 내부 `colSpan` 셀에
          `Empty State`를 배치합니다.
        </p>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>검색 결과</TableHead>
                <TableHead>설명</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="py-6" colSpan={2}>
                  <EmptyState size="sm">
                    <EmptyStateIcon>
                      <Search className="h-4 w-4" />
                    </EmptyStateIcon>
                    <EmptyStateHeader>
                      <EmptyStateTitle className="text-body-sm">
                        결과가 없습니다
                      </EmptyStateTitle>
                      <EmptyStateDescription className="text-caption">
                        필터를 조정하거나 검색어를 변경해보세요.
                      </EmptyStateDescription>
                    </EmptyStateHeader>
                  </EmptyState>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <CodeSnippet title="Table 상태 패턴 예시" code={statesCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">모바일 가이드</h2>
        <p className="text-body-sm text-muted-foreground">
          `Table` 컴포넌트는 내부에서 가로 스크롤 래퍼를 제공하므로, 모바일에서는
          열을 억지로 줄이기보다 최소 폭(`min-w-*`)을 지정해 가독성을 유지합니다.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">이름</TableHead>
              <TableHead className="min-w-[140px]">이메일</TableHead>
              <TableHead className="min-w-[120px]">부서</TableHead>
              <TableHead className="min-w-[120px]">역할</TableHead>
              <TableHead className="min-w-[120px] text-right">
                최근 로그인
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-[color:var(--gray-900)]">
                김유나
              </TableCell>
              <TableCell>yuna@company.com</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Designer</TableCell>
              <TableCell className="text-right">오늘 10:24</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-[color:var(--gray-900)]">
                이민준
              </TableCell>
              <TableCell>minjun@company.com</TableCell>
              <TableCell>Frontend</TableCell>
              <TableCell>Engineer</TableCell>
              <TableCell className="text-right">어제 18:03</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>모바일에서는 열 삭제보다 우선 `min-w-*` + 가로 스크롤을 사용합니다.</li>
          <li>핵심 비교 열(금액, 날짜, 상태)은 유지하고 보조 열을 뒤로 배치합니다.</li>
          <li>행 액션이 많으면 인라인 버튼 대신 `Sheet` 또는 상세 화면으로 분리합니다.</li>
        </ul>
        <CodeSnippet title="모바일 가로 스크롤 Table 예시" code={mobileCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">사용 기준</h2>
        <p className="text-body-sm text-muted-foreground">
          표는 비교 가능한 구조화 데이터에 사용합니다. 카드형 목록이 더 읽기 쉬운
          모바일 화면에서는 `Table`을 직접 노출하기보다 요약 카드 + 상세 화면
          패턴을 고려합니다. 빈 상태는{" "}
          <Link className="underline" href="/components/empty-state">
            Empty State
          </Link>
          , 페이지 이동은{" "}
          <Link className="underline" href="/components/pagination">
            Pagination
          </Link>
          과 함께 조합합니다.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            필터 열기 (Sheet)
          </Button>
          <Button size="sm">행 추가</Button>
        </div>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          열 제목은 `th`로 제공하고, 숫자/시간 열은 정렬 규칙을 일관되게 유지해야
          합니다. 정렬 가능한 표를 추가할 때는 정렬 상태를 텍스트/아이콘으로 함께
          표시합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
