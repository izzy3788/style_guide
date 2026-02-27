import Link from "next/link";
import { Bold, Italic, Plus, Underline } from "lucide-react";

import CodeSnippet from "../../_components/CodeSnippet";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

const basicCode = `import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function BasicButtonGroup() {
  return (
    <ButtonGroup>
      <Button variant="outline">일간</Button>
      <Button variant="outline">주간</Button>
      <Button variant="outline">월간</Button>
      <Button variant="outline" size="icon" aria-label="추가">
        <Plus className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
}`;

const separatorCode = `import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

export function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="굵게">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="기울임">
        <Italic className="h-4 w-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon" aria-label="밑줄">
        <Underline className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
}`;

const textCode = `import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";

export function ButtonGroupWithText() {
  return (
    <ButtonGroup>
      <ButtonGroupText size="md">보기</ButtonGroupText>
      <Button variant="outline" className="w-20 justify-center">카드</Button>
      <Button variant="outline" className="w-20 justify-center">리스트</Button>
    </ButtonGroup>
  );
}`;

const verticalCode = `import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function VerticalButtonGroup() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">계정 설정</Button>
      <Button variant="outline">알림 설정</Button>
      <Button variant="outline">권한 관리</Button>
    </ButtonGroup>
  );
}`;

export default function ButtonGroupDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Button Group</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          여러 버튼을 하나의 묶음으로 정렬해 연관된 액션을 표현합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 그룹</h2>
        <p className="text-body-sm text-muted-foreground">
          동일한 위계의 액션을 수평으로 묶어 배치할 때 사용합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          기본은 라벨 길이에 따른 가변폭을 유지하고, 정렬 균형이 중요한 케이스에서만
          고정폭(`w-*`)을 적용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <ButtonGroup>
            <Button variant="outline">일간</Button>
            <Button variant="outline">주간</Button>
            <Button variant="outline">월간</Button>
            <Button variant="outline" size="icon" aria-label="추가">
              <Plus className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
        <CodeSnippet title="Button Group 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Separator</h2>
        <p className="text-body-sm text-muted-foreground">
          의미적으로 다른 액션 묶음은 `ButtonGroupSeparator`로 시각적으로 구분합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="굵게">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="기울임">
              <Italic className="h-4 w-4" />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon" aria-label="밑줄">
              <Underline className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
        <CodeSnippet title="Separator 예시" code={separatorCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Text Slot</h2>
        <p className="text-body-sm text-muted-foreground">
          버튼 앞에 고정 라벨을 함께 배치할 때 `ButtonGroupText`를 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <ButtonGroup>
            <ButtonGroupText size="md">보기</ButtonGroupText>
            <Button variant="outline" className="w-20 justify-center">
              카드
            </Button>
            <Button variant="outline" className="w-20 justify-center">
              리스트
            </Button>
          </ButtonGroup>
        </div>
        <CodeSnippet title="Text Slot 예시" code={textCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Vertical</h2>
        <p className="text-body-sm text-muted-foreground">
          세로 메뉴형 액션 묶음은 `orientation=&quot;vertical&quot;`을 사용합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <ButtonGroup orientation="vertical">
            <Button variant="outline">계정 설정</Button>
            <Button variant="outline">알림 설정</Button>
            <Button variant="outline">권한 관리</Button>
          </ButtonGroup>
        </div>
        <CodeSnippet title="Vertical 예시" code={verticalCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Button Group은 관련 액션의 시각적 그룹입니다. 실제 상태 선택 컴포넌트가
          필요하면 `Tabs`/`Radio Group`을 사용하고, 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
