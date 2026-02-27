import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import { Toggle } from "@/components/ui/toggle";
import { FieldControl, FieldLabel, FieldRoot } from "@/components/ui/field";

const toggleCode = `import { Toggle } from "@/components/ui/toggle";
import { FieldControl, FieldLabel, FieldRoot } from "@/components/ui/field";

export function ToggleField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="md">
        <div className="flex items-center justify-between gap-3">
          <FieldLabel className="mb-0" htmlFor="toggle-marketing">
            마케팅 알림
          </FieldLabel>
          <FieldControl>
            <Toggle id="toggle-marketing" defaultChecked size="md" />
          </FieldControl>
        </div>
      </FieldRoot>

      <FieldRoot size="md" disabled>
        <div className="flex items-center justify-between gap-3">
          <FieldLabel className="mb-0" htmlFor="toggle-disabled">
            비활성화 상태
          </FieldLabel>
          <FieldControl>
            <Toggle id="toggle-disabled" checked={false} disabled size="md" />
          </FieldControl>
        </div>
      </FieldRoot>
    </div>
  );
}`;

const toggleStateCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleStates() {
  return (
    <div className="space-y-3">
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-foreground">비활성</span>
        <Toggle checked={false} readOnly size="md" />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-foreground">활성</span>
        <Toggle defaultChecked readOnly size="md" />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-muted-foreground">비활성화</span>
        <Toggle checked={false} disabled size="md" />
      </label>
    </div>
  );
}`;

const toggleSizeCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleSizes() {
  return (
    <div className="space-y-3">
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-foreground">Small</span>
        <Toggle defaultChecked size="sm" />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-foreground">Medium</span>
        <Toggle defaultChecked size="md" />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-body-sm text-foreground">Large</span>
        <Toggle defaultChecked size="lg" />
      </label>
    </div>
  );
}`;

const toggleAppearanceCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleAppearances() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Default</span>
        <Toggle appearance="default" size="md" />
        <Toggle defaultChecked appearance="default" size="md" />
        <Toggle checked={false} disabled appearance="default" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Line</span>
        <Toggle appearance="line" size="md" />
        <Toggle defaultChecked appearance="line" size="md" />
        <Toggle checked={false} disabled appearance="line" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Bubble</span>
        <Toggle appearance="bubble" size="md" />
        <Toggle defaultChecked appearance="bubble" size="md" />
        <Toggle checked={false} disabled appearance="bubble" size="md" />
      </div>
    </div>
  );
}`;

const toggleAppearanceSizeCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleAppearanceSizes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Line / Small</span>
        <Toggle appearance="line" size="sm" />
        <Toggle defaultChecked appearance="line" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Line / Medium</span>
        <Toggle appearance="line" size="md" />
        <Toggle defaultChecked appearance="line" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Line / Large</span>
        <Toggle appearance="line" size="lg" />
        <Toggle defaultChecked appearance="line" size="lg" />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <span className="w-20 text-body-sm text-muted-foreground">Bubble / Small</span>
        <Toggle appearance="bubble" size="sm" />
        <Toggle defaultChecked appearance="bubble" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Bubble / Medium</span>
        <Toggle appearance="bubble" size="md" />
        <Toggle defaultChecked appearance="bubble" size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-body-sm text-muted-foreground">Bubble / Large</span>
        <Toggle appearance="bubble" size="lg" />
        <Toggle defaultChecked appearance="bubble" size="lg" />
      </div>
    </div>
  );
}`;

export default function ToggleDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Toggle</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          설정의 On/Off 상태를 즉시 전환할 때 사용하는 토글 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="md">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel className="mb-0" htmlFor="toggle-marketing-preview">
                  마케팅 알림
                </FieldLabel>
                <FieldControl>
                  <Toggle id="toggle-marketing-preview" defaultChecked size="md" />
                </FieldControl>
              </div>
            </FieldRoot>

            <FieldRoot size="md" disabled>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel className="mb-0" htmlFor="toggle-disabled-preview">
                  비활성화 상태
                </FieldLabel>
                <FieldControl>
                  <Toggle id="toggle-disabled-preview" checked={false} disabled size="md" />
                </FieldControl>
              </div>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Toggle 사용 예시" code={toggleCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          비활성, 활성, 비활성화 상태를 한눈에 확인할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-foreground">비활성</span>
              <Toggle checked={false} readOnly size="md" />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-foreground">활성</span>
              <Toggle defaultChecked readOnly size="md" />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-muted-foreground">비활성화</span>
              <Toggle checked={false} disabled size="md" />
            </label>
          </div>
        </div>
        <CodeSnippet title="Toggle 상태 예시" code={toggleStateCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <p className="text-body-sm text-muted-foreground">
          Toggle은 `sm`, `md`, `lg` 크기를 지원합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-foreground">Small</span>
              <Toggle defaultChecked size="sm" />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-foreground">Medium</span>
              <Toggle defaultChecked size="md" />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-body-sm text-foreground">Large</span>
              <Toggle defaultChecked size="lg" />
            </label>
          </div>
        </div>
        <CodeSnippet title="Toggle 크기 예시" code={toggleSizeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">형태</h2>
        <p className="text-body-sm text-muted-foreground">
          스크린별 밀도와 시각 톤에 맞춰 `default`, `line`, `bubble` 형태를 사용할 수 있습니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-20 text-body-sm text-muted-foreground">Default</span>
              <Toggle appearance="default" size="md" />
              <Toggle defaultChecked appearance="default" size="md" />
              <Toggle checked={false} disabled appearance="default" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-body-sm text-muted-foreground">Line</span>
              <Toggle appearance="line" size="md" />
              <Toggle defaultChecked appearance="line" size="md" />
              <Toggle checked={false} disabled appearance="line" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-body-sm text-muted-foreground">Bubble</span>
              <Toggle appearance="bubble" size="md" />
              <Toggle defaultChecked appearance="bubble" size="md" />
              <Toggle checked={false} disabled appearance="bubble" size="md" />
            </div>
          </div>
        </div>
        <CodeSnippet title="Toggle 형태 예시" code={toggleAppearanceCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Line/Bubble 크기별</h2>
        <p className="text-body-sm text-muted-foreground">
          `line`, `bubble` 형태도 `sm`, `md`, `lg`를 모두 지원합니다.
        </p>
        <div className="rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-28 text-body-sm text-muted-foreground">Line / Small</span>
              <Toggle appearance="line" size="sm" />
              <Toggle defaultChecked appearance="line" size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-28 text-body-sm text-muted-foreground">Line / Medium</span>
              <Toggle appearance="line" size="md" />
              <Toggle defaultChecked appearance="line" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-28 text-body-sm text-muted-foreground">Line / Large</span>
              <Toggle appearance="line" size="lg" />
              <Toggle defaultChecked appearance="line" size="lg" />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="w-28 text-body-sm text-muted-foreground">Bubble / Small</span>
              <Toggle appearance="bubble" size="sm" />
              <Toggle defaultChecked appearance="bubble" size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-28 text-body-sm text-muted-foreground">Bubble / Medium</span>
              <Toggle appearance="bubble" size="md" />
              <Toggle defaultChecked appearance="bubble" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-28 text-body-sm text-muted-foreground">Bubble / Large</span>
              <Toggle appearance="bubble" size="lg" />
              <Toggle defaultChecked appearance="bubble" size="lg" />
            </div>
          </div>
        </div>
        <CodeSnippet title="Toggle 형태+크기 예시" code={toggleAppearanceSizeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Toggle은 현재 상태(On/Off)가 명확히 전달되어야 하며, label과 함께
          사용해야 합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>
    </div>
  );
}
