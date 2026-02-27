import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldHintRow,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const basicCode = `import {
  FieldControl,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function BasicField() {
  return (
    <FieldRoot required>
      <FieldLabel>이메일</FieldLabel>
      <FieldControl>
        <Input placeholder="name@company.com" size="md" />
      </FieldControl>
      <FieldHelper>업무용 이메일을 입력해주세요.</FieldHelper>
    </FieldRoot>
  );
}`;

const statesCode = `import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FieldStates() {
  return (
    <div className="space-y-4">
      <FieldRoot>
        <FieldLabel>기본 상태</FieldLabel>
        <FieldControl>
          <Input placeholder="입력" size="md" />
        </FieldControl>
        <FieldHelper>도움말 텍스트</FieldHelper>
      </FieldRoot>

      <FieldRoot error>
        <FieldLabel>오류 상태</FieldLabel>
        <FieldControl>
          <Input defaultValue="wrong-format" size="md" />
        </FieldControl>
        <FieldError>올바른 이메일 형식이 아닙니다.</FieldError>
      </FieldRoot>

      <FieldRoot disabled>
        <FieldLabel>비활성 상태</FieldLabel>
        <FieldControl>
          <Input defaultValue="team-alpha" size="md" />
        </FieldControl>
        <FieldHelper>현재 플랜에서는 수정할 수 없습니다.</FieldHelper>
      </FieldRoot>
    </div>
  );
}`;

const patternsCode = `import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldControl,
  FieldHelper,
  FieldHintRow,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function FieldPatterns() {
  return (
    <div className="space-y-4">
      <FieldRoot size="lg">
        <FieldLabel>문의 내용</FieldLabel>
        <FieldControl>
          <Textarea
            size="lg"
            placeholder="문의 내용을 입력해주세요."
            defaultValue=""
          />
        </FieldControl>
        <FieldHintRow>
          <FieldHelper className="mt-0">최대 300자까지 입력할 수 있습니다.</FieldHelper>
          <span className="text-caption text-[color:var(--gray-500)]">0 / 300</span>
        </FieldHintRow>
      </FieldRoot>

      <FieldRoot size="sm">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox size="sm" />
          </FieldControl>
          <FieldLabel className="mb-0 text-caption-lg">
            약관에 동의합니다.
          </FieldLabel>
        </div>
        <FieldHelper className="mt-1 pl-6">필수 항목입니다.</FieldHelper>
      </FieldRoot>
    </div>
  );
}`;

export default function FieldDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Field</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          폼 컨트롤의 라벨, 도움말, 오류 메시지, 접근성 연결을 일관되게 묶는
          필드 래퍼 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">기본 사용</h2>
        <p className="text-body-sm text-muted-foreground">
          `FieldRoot`가 공통 상태(`required`, `disabled`, `error`)와 ID를 관리하고,
          `FieldControl`이 실제 입력 컨트롤에 aria 속성을 연결합니다.
        </p>
        <p className="text-body-sm text-muted-foreground">
          Field 래퍼 자체는 반경을 갖지 않으며, 내부 컨트롤(Input/Textarea/Select)은
          `rounded-lg`(10px, Radius/LG)를 기본으로 사용합니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md">
            <FieldRoot required>
              <FieldLabel>이메일</FieldLabel>
              <FieldControl>
                <Input placeholder="name@company.com" size="md" />
              </FieldControl>
              <FieldHelper>업무용 이메일을 입력해주세요.</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 기본 예시" code={basicCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          `FieldRoot`의 상태는 내부 컨트롤과 메시지 스타일/aria 연결에 함께
          반영됩니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md space-y-4">
            <FieldRoot>
              <FieldLabel>기본 상태</FieldLabel>
              <FieldControl>
                <Input placeholder="입력" size="md" />
              </FieldControl>
              <FieldHelper>도움말 텍스트</FieldHelper>
            </FieldRoot>

            <FieldRoot error>
              <FieldLabel>오류 상태</FieldLabel>
              <FieldControl>
                <Input defaultValue="wrong-format" size="md" />
              </FieldControl>
              <FieldError>올바른 이메일 형식이 아닙니다.</FieldError>
            </FieldRoot>

            <FieldRoot disabled>
              <FieldLabel>비활성 상태</FieldLabel>
              <FieldControl>
                <Input defaultValue="team-alpha" size="md" />
              </FieldControl>
              <FieldHelper>현재 플랜에서는 수정할 수 없습니다.</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 상태 예시" code={statesCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          텍스트 입력 외에도 `Textarea`와 보조 힌트 행, 체크박스 라벨 패턴에도
          같은 구조를 사용할 수 있습니다.
        </p>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md space-y-4">
            <FieldRoot size="lg">
              <FieldLabel>문의 내용</FieldLabel>
              <FieldControl>
                <Textarea
                  size="lg"
                  placeholder="문의 내용을 입력해주세요."
                  defaultValue=""
                />
              </FieldControl>
              <FieldHintRow>
                <FieldHelper className="mt-0">
                  최대 300자까지 입력할 수 있습니다.
                </FieldHelper>
                <span className="text-caption text-[color:var(--gray-500)]">
                  0 / 300
                </span>
              </FieldHintRow>
            </FieldRoot>

            <FieldRoot size="sm">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox size="sm" />
                </FieldControl>
                <FieldLabel className="mb-0 text-caption-lg">
                  약관에 동의합니다.
                </FieldLabel>
              </div>
              <FieldHelper className="mt-1 pl-6">필수 항목입니다.</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Field 패턴 예시" code={patternsCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          라벨은 컨트롤과 연결되어야 하고, 도움말/오류 메시지는
          `aria-describedby`로 연결되어야 합니다. `FieldControl`은 이 연결을
          자동으로 처리합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
