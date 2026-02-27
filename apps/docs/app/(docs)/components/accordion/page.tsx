"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const singleCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function BasicAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
        <AccordionContent>
          결제 완료 후 영업일 기준 1~3일 내 출고되며, 지역에 따라 배송일이 달라질 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>교환/반품이 가능한가요?</AccordionTrigger>
        <AccordionContent>
          상품 수령 후 7일 이내 접수 가능하며, 사용 흔적이 있는 경우 제한될 수 있습니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

const multipleCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MultipleAccordion() {
  return (
    <Accordion type="multiple" defaultValue={["design"]}>
      <AccordionItem value="design">
        <AccordionTrigger>디자인 시스템 원칙</AccordionTrigger>
        <AccordionContent>
          토큰 기반 색상/간격 사용, 컴포넌트 재사용성, 접근성 우선 설계를 원칙으로 합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="content">
        <AccordionTrigger>콘텐츠 작성 가이드</AccordionTrigger>
        <AccordionContent>
          제목은 명확하게, 본문은 짧은 문장 단위로 구성하고 CTA 문구는 행동 중심으로 작성합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="a11y">
        <AccordionTrigger>접근성 체크 포인트</AccordionTrigger>
        <AccordionContent>
          키보드 탐색, 포커스 표시, 대비, 스크린리더 라벨을 기본 점검 항목으로 유지합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

const disabledCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DisabledAccordionItem() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="active">
        <AccordionTrigger>활성 섹션</AccordionTrigger>
        <AccordionContent>현재 공개된 설정입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>비활성 섹션</AccordionTrigger>
        <AccordionContent>아직 제공되지 않는 기능입니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

export default function AccordionDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Accordion</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          긴 콘텐츠를 섹션 단위로 접고 펼쳐 정보 밀도를 관리하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용 (Single)</h2>
        <p className="text-body-sm text-muted-foreground">
          FAQ처럼 한 번에 하나만 열어도 충분한 경우 <code>type=&quot;single&quot;</code>을
          사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Accordion type="single" collapsible defaultValue="item-1" className="bg-background">
            <AccordionItem value="item-1">
              <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
              <AccordionContent>
                결제 완료 후 영업일 기준 1~3일 내 출고되며, 지역에 따라 배송일이
                달라질 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>교환/반품이 가능한가요?</AccordionTrigger>
              <AccordionContent>
                상품 수령 후 7일 이내 접수 가능하며, 사용 흔적이 있는 경우 제한될 수
                있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeSnippet title="Accordion 기본 예시" code={singleCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">여러 섹션 열기 (Multiple)</h2>
        <p className="text-body-sm text-muted-foreground">
          정책/가이드 문서처럼 여러 섹션을 동시에 비교해야 하면{" "}
          <code>type=&quot;multiple&quot;</code>을 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Accordion type="multiple" defaultValue={["design"]} className="bg-background">
            <AccordionItem value="design">
              <AccordionTrigger>디자인 시스템 원칙</AccordionTrigger>
              <AccordionContent>
                토큰 기반 색상/간격 사용, 컴포넌트 재사용성, 접근성 우선 설계를
                원칙으로 합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content">
              <AccordionTrigger>콘텐츠 작성 가이드</AccordionTrigger>
              <AccordionContent>
                제목은 명확하게, 본문은 짧은 문장 단위로 구성하고 CTA 문구는 행동
                중심으로 작성합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a11y">
              <AccordionTrigger>접근성 체크 포인트</AccordionTrigger>
              <AccordionContent>
                키보드 탐색, 포커스 표시, 대비, 스크린리더 라벨을 기본 점검 항목으로
                유지합니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeSnippet title="Accordion Multiple 예시" code={multipleCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">비활성 항목</h2>
        <p className="text-body-sm text-muted-foreground">
          아직 공개되지 않은 섹션은 <code>disabled</code>로 표시해 탐색 흐름을 유지할 수
          있습니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <Accordion type="single" collapsible className="bg-background">
            <AccordionItem value="active">
              <AccordionTrigger>활성 섹션</AccordionTrigger>
              <AccordionContent>현재 공개된 설정입니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="disabled" disabled>
              <AccordionTrigger>비활성 섹션</AccordionTrigger>
              <AccordionContent>아직 제공되지 않는 기능입니다.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeSnippet title="Accordion Disabled 예시" code={disabledCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Accordion Trigger는 버튼 역할을 가지며 펼침 상태를 <code>aria-expanded</code>로
          전달해야 합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
