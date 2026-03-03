"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const sizeSpecs = {
  xlarge: {
    size: "xl",
    label: "Xlarge",
    height: "48px",
    padding: "좌우 16px",
    text: "16px",
    usage: "강조 CTA",
  },
  large: {
    size: "lg",
    label: "Large",
    height: "40px",
    padding: "좌우 16px",
    text: "14px",
    usage: "기본 CTA",
  },
  medium: {
    size: "default",
    label: "Medium",
    height: "36px",
    padding: "좌우 16px",
    text: "14px",
    usage: "일반 버튼",
  },
  small: {
    size: "sm",
    label: "Small",
    height: "32px",
    padding: "좌우 8px",
    text: "12px",
    usage: "보조 액션",
  },
  icon: {
    size: "icon",
    label: "Icon",
    height: "36px",
    padding: "정사각",
    text: "아이콘 16px",
    usage: "툴바/액션",
  },
} as const;

type SizeKey = keyof typeof sizeSpecs;

const variantCode = `import { Button } from "@/components/ui/button";

export function ButtonVariants() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}`;

const sizeCode = `import { Button } from "@/components/ui/button";

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xl">Xlarge</Button>
      <Button size="lg">Large</Button>
      <Button>Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="icon" aria-label="Add item">+</Button>
      <Button size="icon" className="rounded-full" aria-label="Close">×</Button>
    </div>
  );
}`;

const statesCode = `import { Button } from "@/components/ui/button";

export function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="primary">Primary</Button>
      <Button className="hover:bg-primary-90">Hover</Button>
      <Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        Focus
      </Button>
      <Button className="bg-primary-700">Active</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}`;

const loadingCode = `import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="primary" loading>
        저장
      </Button>
      <Button variant="secondary" loading>
        불러오기
      </Button>
    </div>
  );
}`;

const usageCode = `import { Button } from "@/components/ui/button";

export function ButtonUsage() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary">Save changes</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="destructive">Delete</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Preview</Button>
        <Button variant="link">View history</Button>
      </div>
    </div>
  );
}`;

export default function ButtonDocsPage() {
  const previewBySize = (sizeKey: SizeKey) => {
    const spec = sizeSpecs[sizeKey];
    if (sizeKey === "icon") {
      return (
        <Button size="icon" aria-label="Add item">
          +
        </Button>
      );
    }
    return (
      <Button size={spec.size}>
        미리보기
      </Button>
    );
  };

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">
          Button
        </h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          버튼은 primary(브랜드)와 중립/semantic 토큰을 사용해 행동의 일관성을
          유지합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Variant (의미)
        </h2>
        <p className="text-body-sm text-muted-foreground">
          `primary`는 핵심 CTA(solid), `secondary`는 보조 CTA(tonal)로 사용합니다.
          `outline`은 라인 버튼 역할로 고정합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          `destructive`는 Button 전용 색이 아니라 Foundations의 Semantic color token
          (`--destructive`, `--destructive-foreground`)을 참조하는 variant입니다.
          보조 액션은 `outline`, `ghost`, `link`를 사용합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          마이그레이션 가이드: 기존에 라인 버튼 용도로 `secondary`를 사용한 화면은 스모크 테스트 후
          `outline`으로 점진적으로 치환합니다. (`variant` 문자열/API는 그대로 유지)
        </p>
        <div className="space-y-3">
          <div>
            <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-[color:var(--gray-500)]">
              핵심 CTA (Primary / Secondary / Destructive)
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
          <div>
            <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-[color:var(--gray-500)]">
              보조 액션 (Outline / Ghost / Link)
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={variantCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Size (물리)
        </h2>
        <p className="text-body-sm text-muted-foreground">
          패딩은 크기에 따라 달라집니다. GDS 기준으로 Xlarge/Medium 계열은 좌우
          16px, Small 계열은 좌우 8px을 사용합니다. 현재 컴포넌트는
          Xlarge/Large/Medium/Small만 제공합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          Tiny는 최소 터치 영역 이슈로 제공하지 않습니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          풀 너비 버튼을 쓸 때는 좌우 마진을 16으로 고정합니다. 키패드와 결합된
          풀 너비 버튼은 좌우 마진을 0으로 사용합니다.
        </p>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>`w-full`은 단일 주요 CTA 패턴에서 기본으로 사용합니다.</li>
          <li>복수 버튼 행에서는 `flex`/`grid`로 비율을 명시합니다. (예: 50/50, 30/70)</li>
          <li>분할 비율은 액션 우선순위에 맞춰 결정하고, 바텀시트/키패드 패턴은 별도 예외로 운용합니다.</li>
        </ul>
        <p className="text-body-sm text-muted-foreground">
          텍스트는 최소 2자 이상을 권장합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          `icon`은 36x36 정사각 규격(`h-9 w-9 p-0`, 아이콘 16px)이며 기본 radius는 `rounded-md`입니다.
          원형 아이콘 버튼이 필요하면 `className=&quot;rounded-full&quot;`로 shape만 변경합니다.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Padding</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-body-sm text-[color:var(--gray-900)]">Xlarge</TableCell>
              <TableCell>{previewBySize("xlarge")}</TableCell>
              <TableCell>{sizeSpecs.xlarge.height}</TableCell>
              <TableCell>{sizeSpecs.xlarge.padding}</TableCell>
              <TableCell>{sizeSpecs.xlarge.text}</TableCell>
              <TableCell>{sizeSpecs.xlarge.usage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-body-sm text-[color:var(--gray-900)]">Large</TableCell>
              <TableCell>{previewBySize("large")}</TableCell>
              <TableCell>{sizeSpecs.large.height}</TableCell>
              <TableCell>{sizeSpecs.large.padding}</TableCell>
              <TableCell>{sizeSpecs.large.text}</TableCell>
              <TableCell>{sizeSpecs.large.usage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-body-sm text-[color:var(--gray-900)]">Medium</TableCell>
              <TableCell>{previewBySize("medium")}</TableCell>
              <TableCell>{sizeSpecs.medium.height}</TableCell>
              <TableCell>{sizeSpecs.medium.padding}</TableCell>
              <TableCell>{sizeSpecs.medium.text}</TableCell>
              <TableCell>{sizeSpecs.medium.usage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-body-sm text-[color:var(--gray-900)]">Small</TableCell>
              <TableCell>{previewBySize("small")}</TableCell>
              <TableCell>{sizeSpecs.small.height}</TableCell>
              <TableCell>{sizeSpecs.small.padding}</TableCell>
              <TableCell>{sizeSpecs.small.text}</TableCell>
              <TableCell>{sizeSpecs.small.usage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-body-sm text-[color:var(--gray-900)]">Icon</TableCell>
              <TableCell>{previewBySize("icon")}</TableCell>
              <TableCell>{sizeSpecs.icon.height}</TableCell>
              <TableCell>{sizeSpecs.icon.padding}</TableCell>
              <TableCell>{sizeSpecs.icon.text}</TableCell>
              <TableCell>{sizeSpecs.icon.usage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted-30 p-4">
          <Button size="icon" aria-label="Add item">+</Button>
          <Button size="icon" className="rounded-full" aria-label="Close">
            ×
          </Button>
          <span className="text-body-sm text-muted-foreground">
            Icon shape 예시: 기본(square-ish radius) / circle(`rounded-full`)
          </span>
        </div>
        <CodeSnippet title="사용 예시" code={sizeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          State (상태)
        </h2>
        <p className="text-body-sm text-muted-foreground">
          공통 상태는 default / hover / focus / active(pressed) / disabled / loading을 기준으로 확인합니다.
          Focus는 ring으로 접근성을 확보합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          Hover는 데스크톱의 hover 가능한 포인터 환경(`@media (hover:hover) and (pointer:fine)`)에서만
          적용합니다. 모바일/태블릿에서는 pressed(active)가 핵심 피드백입니다.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Default</Button>
          <Button className="hover:bg-primary-90">Hover</Button>
          <Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Focus
          </Button>
          <Button className="bg-primary-700">Active</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="space-y-2 rounded-xl border border-border bg-muted-30 p-4">
          <div className="text-caption font-semibold uppercase tracking-wide text-[color:var(--gray-500)]">
            Loading
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" loading>저장</Button>
            <Button variant="secondary" loading>불러오기</Button>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-body-sm text-muted-foreground">
            <li>`loading`을 사용하면 버튼이 자동으로 비활성화되어 중복 요청을 막습니다.</li>
            <li>기본 라벨을 유지한 채 로딩 모션만 표시해 버튼 폭을 고정합니다.</li>
            <li>로딩 텍스트가 더 길어지는 경우에도 라벨 치환 대신 스피너만 노출합니다.</li>
          </ul>
        </div>
        <CodeSnippet title="사용 예시" code={statesCode} copyable />
        <CodeSnippet title="Loading 상태 예시" code={loadingCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <p className="text-body-sm text-muted-foreground">
          기본 폼 툴바 조합입니다. 강한 CTA는 1개만 두고, 추가 강조 액션은 `secondary`로
          계층을 분리합니다. 파괴적 행동은 `destructive`를 사용하고 Semantic color
          token을 참조합니다.
        </p>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">Save changes</Button>
            <Button variant="secondary">Save draft</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost">Preview</Button>
            <Button variant="link">View history</Button>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={usageCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          버튼에는 포커스 링을 유지하고, 아이콘 버튼은 aria-label을 제공해야
          합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
