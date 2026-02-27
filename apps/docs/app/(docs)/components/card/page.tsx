import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardThumbnail,
  CardRoot,
  CardTitle,
} from "@/components/ui/media-card";
import { PreviewFrame } from "@/components/docs/PreviewFrame";

const cardCode = `import {
  CardContent,
  CardDescription,
  CardFooter,
  CardThumbnail,
  CardRoot,
  CardTitle,
} from "@/components/ui/media-card";

export function CardSample() {
  return (
    <CardRoot variant="elevated" orientation="vertical">
      <CardThumbnail aspect="16/9" />
      <CardContent>
        <CardTitle>Starter Plan</CardTitle>
        <CardDescription>팀용 기본 플랜</CardDescription>
        <p className="text-title-md text-foreground">$29</p>
        <p className="text-body-sm text-muted-foreground">월 기준, 최대 10명</p>
        <CardFooter>
          <Button>시작하기</Button>
        </CardFooter>
      </CardContent>
    </CardRoot>
  );
}`;

export default function CardDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-foreground">Card</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          카드 레이아웃과 콘텐츠 묶음 가이드입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-foreground">Card 디자인 원칙</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>Default Card에는 border를 사용하지 않습니다.</li>
          <li>구분은 elevation(그림자)으로 처리합니다.</li>
          <li>shadow는 매우 옅은 수준(shadow-sm 이하)만 사용합니다.</li>
          <li>페이지 배경이 gray 계열이어도 Default Card는 white 배경을 사용합니다.</li>
          <li>radius는 14px(rounded-xl), 기본 padding은 24px(p-6)입니다.</li>
          <li>transition-shadow를 적용합니다.</li>
          <li>텍스트는 반드시 foreground 토큰을 사용합니다.</li>
        </ul>
        <p className="text-body-sm text-muted-foreground">
          카드 전체가 클릭 가능할 때는 버튼/링크 요소를 사용하고, focus 상태가
          표시되도록 합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>

      <section className="not-prose space-y-4">
        <h2 className="text-title-md text-foreground">Variant</h2>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">Default</h3>
        <PreviewFrame>
          <div className="w-[360px]">
            <CardRoot>
              <CardContent>
                <CardTitle>Default</CardTitle>
                <CardDescription>white 배경 + border 없음</CardDescription>
                <p className="text-body-sm text-muted-foreground">표준 카드 스타일</p>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">Elevated</h3>
        <PreviewFrame>
          <div className="w-[360px]">
            <CardRoot variant="elevated">
              <CardContent>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>white 배경 + shadow-sm</CardDescription>
                <p className="text-body-sm text-muted-foreground">강조가 필요한 카드</p>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">Outlined</h3>
        <PreviewFrame>
          <div className="w-[360px]">
            <CardRoot variant="outlined">
              <CardContent>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>white 배경 + gray-200</CardDescription>
                <p className="text-body-sm text-muted-foreground">경계만 강조</p>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">
          Vertical (이미지 포함)
        </h3>
        <PreviewFrame>
          <div className="w-[360px]">
            <CardRoot variant="elevated" orientation="vertical">
              <CardThumbnail src="/img/01.png" alt="Workspace" aspect="16/9" />
              <CardContent>
                <CardTitle>Starter Plan</CardTitle>
                <CardDescription clamp>
                  팀 협업을 위한 기본 플랜입니다. 기본 저장소와 리뷰 기능을 포함합니다.
                </CardDescription>
                <CardFooter>
                  <Button>시작하기</Button>
                </CardFooter>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">
          Horizontal (썸네일 포함)
        </h3>
        <PreviewFrame>
          <div className="w-[520px]">
            <CardRoot variant="outlined" orientation="horizontal">
              <CardThumbnail src="/img/01.png" alt="Dashboard" />
              <CardContent>
                <CardTitle>Weekly Report</CardTitle>
                <CardDescription clamp>
                  이번 주 진행 상황을 요약한 리포트입니다. 핵심 성과와 리스크를
                  한눈에 확인하세요.
                </CardDescription>
                <CardFooter>
                  <Button variant="outline">상세보기</Button>
                </CardFooter>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-4">
        <h3 className="text-title-sm text-foreground">Media 없음</h3>
        <PreviewFrame>
          <div className="w-[360px]">
            <CardRoot variant="default">
              <CardThumbnail aspect="4/3" />
              <CardContent>
                <CardTitle>Notice</CardTitle>
                <CardDescription clamp>
                  이미지가 없는 카드도 동일한 패딩과 타이포 기준을 유지합니다.
                </CardDescription>
                <CardFooter>
                  <Button>확인</Button>
                </CardFooter>
              </CardContent>
            </CardRoot>
          </div>
        </PreviewFrame>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-foreground">사용 코드</h2>
        <CodeSnippet title="Card 사용 예시" code={cardCode} copyable />
      </section>

      <section className="not-prose space-y-4">
        <h2 className="text-title-md text-foreground">Do / Don&apos;t</h2>
        <div className="rounded-lg border border-border bg-[color:var(--gray-50)] p-6">
          <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
            Do
          </div>
          <ul className="mt-2 list-disc space-y-3 pl-4 text-body-sm text-[color:var(--gray-700)]">
            <li>카드 내부 여백을 유지합니다.</li>
            <li>제목-본문 간 계층을 분명히 둡니다.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-[color:var(--gray-50)] p-6">
          <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
            Don&apos;t
          </div>
          <ul className="mt-2 list-disc space-y-3 pl-4 text-body-sm text-[color:var(--gray-700)]">
            <li>카드 안에 또 다른 카드를 중첩하지 않습니다.</li>
            <li>카드에 임의 margin을 적용하지 않습니다.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
