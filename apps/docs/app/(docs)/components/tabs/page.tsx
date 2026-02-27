import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Bell, Heart, LayoutGrid, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fixedTabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FixedTabsExample() {
  return (
    <Tabs type="fixed" defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">상품 정보</TabsTrigger>
        <TabsTrigger value="reviews">리뷰</TabsTrigger>
        <TabsTrigger value="shipping">배송/교환</TabsTrigger>
      </TabsList>

      <TabsContent value="details">상품 상세 내용</TabsContent>
      <TabsContent value="reviews">리뷰 내용</TabsContent>
      <TabsContent value="shipping">배송/교환 안내</TabsContent>
    </Tabs>
  );
}`;

const scrollableTabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ScrollableTabsExample() {
  return (
    <Tabs type="scrollable" defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="fashion">패션</TabsTrigger>
        <TabsTrigger value="beauty">뷰티</TabsTrigger>
        <TabsTrigger value="living">리빙/가전</TabsTrigger>
        <TabsTrigger value="digital">디지털</TabsTrigger>
        <TabsTrigger value="food">식품</TabsTrigger>
        <TabsTrigger value="travel">여행/티켓</TabsTrigger>
      </TabsList>

      <TabsContent value="all">전체 콘텐츠</TabsContent>
      <TabsContent value="fashion">패션 콘텐츠</TabsContent>
      <TabsContent value="beauty">뷰티 콘텐츠</TabsContent>
      <TabsContent value="living">리빙/가전 콘텐츠</TabsContent>
      <TabsContent value="digital">디지털 콘텐츠</TabsContent>
      <TabsContent value="food">식품 콘텐츠</TabsContent>
      <TabsContent value="travel">여행/티켓 콘텐츠</TabsContent>
    </Tabs>
  );
}`;

const basicTabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BasicTabsExample() {
  return (
    <Tabs type="fixed" variant="basic" defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
        <TabsTrigger value="notification">알림</TabsTrigger>
      </TabsList>

      <TabsContent value="account">계정 설정 콘텐츠</TabsContent>
      <TabsContent value="password">비밀번호 설정 콘텐츠</TabsContent>
      <TabsContent value="notification">알림 설정 콘텐츠</TabsContent>
    </Tabs>
  );
}`;

const iconTabsCode = `import { Bell, LayoutGrid, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IconTabsExample() {
  return (
    <Tabs type="fixed" defaultValue="category">
      <TabsList>
        <TabsTrigger value="category">
          <LayoutGrid className="h-4 w-4" />
          카테고리
        </TabsTrigger>
        <TabsTrigger value="shipping">
          <Truck className="h-4 w-4" />
          배송
        </TabsTrigger>
        <TabsTrigger value="notice">
          <Bell className="h-4 w-4" />
          알림
        </TabsTrigger>
      </TabsList>
      <TabsContent value="category">카테고리 콘텐츠</TabsContent>
      <TabsContent value="shipping">배송 콘텐츠</TabsContent>
      <TabsContent value="notice">알림 콘텐츠</TabsContent>
    </Tabs>
  );
}`;

const badgeTabsCode = `import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BadgeTabsExample() {
  return (
    <Tabs type="scrollable" defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">
          전체
          <Badge size="sm" variant="outline">24</Badge>
        </TabsTrigger>
        <TabsTrigger value="favorite">
          <Heart className="h-4 w-4" />
          관심
          <Badge size="sm" variant="outline">5</Badge>
        </TabsTrigger>
        <TabsTrigger value="event">
          이벤트
          <Badge size="sm" variant="outline">NEW</Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">전체 콘텐츠</TabsContent>
      <TabsContent value="favorite">관심 콘텐츠</TabsContent>
      <TabsContent value="event">이벤트 콘텐츠</TabsContent>
    </Tabs>
  );
}`;

const disabledTabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DisabledTabsExample() {
  return (
    <Tabs type="fixed" defaultValue="enabled">
      <TabsList>
        <TabsTrigger value="enabled">활성 탭</TabsTrigger>
        <TabsTrigger value="disabled" disabled>비활성 탭</TabsTrigger>
        <TabsTrigger value="next">다음 탭</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled">활성 콘텐츠</TabsContent>
      <TabsContent value="disabled">비활성 콘텐츠</TabsContent>
      <TabsContent value="next">다음 콘텐츠</TabsContent>
    </Tabs>
  );
}`;

export default function TabsDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Tabs</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          콘텐츠 영역을 빠르게 전환하는 탭 컴포넌트입니다. 고정 분할형과 스크롤형을
          지원합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          탭은 keyboard navigation(좌/우, Home, End)과 tabpanel 연결을 지원해야
          합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Fixed Tabs</h2>
        <p className="text-body-sm text-muted-foreground">
          탭 수가 적고 정보 구조가 고정적일 때 사용합니다. 각 탭은 동일 너비로
          배치됩니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="details" type="fixed">
            <TabsList>
              <TabsTrigger value="details">상품 정보</TabsTrigger>
              <TabsTrigger value="reviews">리뷰</TabsTrigger>
              <TabsTrigger value="shipping">배송/교환</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                상품 상세 정보 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                리뷰 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="shipping">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                배송/교환 안내 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Fixed Tabs 예시" code={fixedTabsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Scrollable Tabs</h2>
        <p className="text-body-sm text-muted-foreground">
          탭 수가 많거나 라벨 길이가 긴 경우 사용합니다. 데스크톱에서는 드래그,
          모바일/태블릿에서는 스와이프로 탐색하며 좌우 페이드 힌트로 추가 탭 존재를
          안내합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="all" type="scrollable">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="fashion">패션</TabsTrigger>
              <TabsTrigger value="beauty">뷰티</TabsTrigger>
              <TabsTrigger value="living">리빙/가전</TabsTrigger>
              <TabsTrigger value="digital">디지털</TabsTrigger>
              <TabsTrigger value="food">식품</TabsTrigger>
              <TabsTrigger value="travel">여행/티켓</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                전체 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="fashion">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                패션 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="beauty">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                뷰티 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="living">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                리빙/가전 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="digital">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                디지털 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="food">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                식품 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="travel">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                여행/티켓 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Scrollable Tabs 예시" code={scrollableTabsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Basic Tabs</h2>
        <p className="text-body-sm text-muted-foreground">
          shadcn 스타일처럼 탭 전체를 컨테이너 안에서 전환할 때 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="account" type="fixed" variant="basic">
            <TabsList>
              <TabsTrigger value="account">계정</TabsTrigger>
              <TabsTrigger value="password">비밀번호</TabsTrigger>
              <TabsTrigger value="notification">알림</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                계정 설정 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                비밀번호 설정 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="notification">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                알림 설정 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Basic Tabs 예시" code={basicTabsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Icon + Label</h2>
        <p className="text-body-sm text-muted-foreground">
          탭 의미를 아이콘으로 빠르게 인지시켜야 할 때 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="category" type="fixed">
            <TabsList>
              <TabsTrigger value="category">
                <LayoutGrid className="h-4 w-4" />
                카테고리
              </TabsTrigger>
              <TabsTrigger value="shipping">
                <Truck className="h-4 w-4" />
                배송
              </TabsTrigger>
              <TabsTrigger value="notice">
                <Bell className="h-4 w-4" />
                알림
              </TabsTrigger>
            </TabsList>
            <TabsContent value="category">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                카테고리 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="shipping">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                배송 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="notice">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                알림 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Icon Tabs 예시" code={iconTabsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Badge Tabs</h2>
        <p className="text-body-sm text-muted-foreground">
          상태/카운트를 탭 라벨과 함께 보여줄 때 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="all" type="scrollable">
            <TabsList>
              <TabsTrigger value="all">
                전체
                <Badge size="sm" variant="outline">
                  24
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="favorite">
                <Heart className="h-4 w-4" />
                관심
                <Badge size="sm" variant="outline">
                  5
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="event">
                이벤트
                <Badge size="sm" variant="outline">
                  NEW
                </Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                전체 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="favorite">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                관심 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="event">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                이벤트 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Badge Tabs 예시" code={badgeTabsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Disabled Tab</h2>
        <p className="text-body-sm text-muted-foreground">
          아직 사용할 수 없는 항목은 disabled로 표시해 진입을 차단합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Tabs defaultValue="enabled" type="fixed">
            <TabsList>
              <TabsTrigger value="enabled">활성 탭</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                비활성 탭
              </TabsTrigger>
              <TabsTrigger value="next">다음 탭</TabsTrigger>
            </TabsList>
            <TabsContent value="enabled">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                활성 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="disabled">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                비활성 콘텐츠
              </div>
            </TabsContent>
            <TabsContent value="next">
              <div className="rounded-lg border border-border bg-background p-6 text-body-sm text-muted-foreground">
                다음 콘텐츠
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <CodeSnippet title="Disabled Tabs 예시" code={disabledTabsCode} copyable />
      </section>
    </div>
  );
}
