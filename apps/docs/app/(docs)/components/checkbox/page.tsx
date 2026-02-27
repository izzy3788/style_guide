import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldControl,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const checkboxCode = `import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldControl,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

export function CheckboxField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="sm">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-event" size="sm" defaultChecked />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-event">
            이벤트 알림 수신
          </FieldLabel>
        </div>
      </FieldRoot>

      <FieldRoot size="md">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-privacy" size="md" />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-privacy">
            개인정보 처리방침 동의
          </FieldLabel>
        </div>
      </FieldRoot>

      <FieldRoot size="md" disabled>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-disabled" size="md" />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-disabled">
            비활성화 상태
          </FieldLabel>
        </div>
      </FieldRoot>

      <FieldRoot size="md" error>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-required" size="md" />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-required">
            필수 약관 동의
          </FieldLabel>
        </div>
        <FieldError>필수 항목에 동의해 주세요.</FieldError>
      </FieldRoot>
    </div>
  );
}`;

const checkboxSizeCode = `import { Checkbox } from "@/components/ui/checkbox";
import { FieldControl, FieldLabel, FieldRoot } from "@/components/ui/field";

export function CheckboxSizes() {
  return (
    <div className="space-y-3">
      <FieldRoot size="sm">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-sm" size="sm" defaultChecked />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-sm">Small (16px)</FieldLabel>
        </div>
      </FieldRoot>
      <FieldRoot size="md">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-md" size="md" defaultChecked />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-md">Medium (20px)</FieldLabel>
        </div>
      </FieldRoot>
      <FieldRoot size="lg">
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox id="checkbox-lg" size="lg" defaultChecked />
          </FieldControl>
          <FieldLabel className="mb-0" htmlFor="checkbox-lg">Large (24px)</FieldLabel>
        </div>
      </FieldRoot>
    </div>
  );
}`;

export default function CheckboxDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Checkbox</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          복수 선택이나 동의 항목을 표현할 때 사용하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Checkbox는 명확한 label 연결과 focus-visible 상태를 제공해야 합니다.
          모바일/고밀도 레이아웃에서는 체크박스 본체만 누르게 하지 말고,
          라벨 텍스트까지 함께 클릭 가능하도록 구성합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="sm">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-event" size="sm" defaultChecked />
                </FieldControl>
                <div className="space-y-1">
                  <FieldLabel className="mb-0" htmlFor="checkbox-event">
                    이벤트 알림 수신
                  </FieldLabel>
                </div>
              </div>
            </FieldRoot>

            <FieldRoot size="md">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-privacy" size="md" />
                </FieldControl>
                <div className="space-y-1">
                  <FieldLabel className="mb-0" htmlFor="checkbox-privacy">
                    개인정보 처리방침 동의
                  </FieldLabel>
                </div>
              </div>
            </FieldRoot>

            <FieldRoot size="md" disabled>
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-disabled" size="md" />
                </FieldControl>
                <FieldLabel className="mb-0" htmlFor="checkbox-disabled">
                  비활성화 상태
                </FieldLabel>
              </div>
            </FieldRoot>

            <FieldRoot size="md" error>
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-required" size="md" />
                </FieldControl>
                <FieldLabel className="mb-0" htmlFor="checkbox-required">
                  필수 약관 동의
                </FieldLabel>
              </div>
              <FieldError>필수 항목에 동의해 주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Checkbox 사용 예시" code={checkboxCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <p className="text-body-sm text-muted-foreground">
          Checkbox는 `sm`(16px), `md`(20px), `lg`(24px) 크기를 지원합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <FieldRoot size="sm">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-size-sm" size="sm" defaultChecked />
                </FieldControl>
                <FieldLabel className="mb-0" htmlFor="checkbox-size-sm">
                  Small (16px)
                </FieldLabel>
              </div>
            </FieldRoot>
            <FieldRoot size="md">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-size-md" size="md" defaultChecked />
                </FieldControl>
                <FieldLabel className="mb-0" htmlFor="checkbox-size-md">
                  Medium (20px)
                </FieldLabel>
              </div>
            </FieldRoot>
            <FieldRoot size="lg">
              <div className="flex items-center gap-2">
                <FieldControl>
                  <Checkbox id="checkbox-size-lg" size="lg" defaultChecked />
                </FieldControl>
                <FieldLabel className="mb-0" htmlFor="checkbox-size-lg">
                  Large (24px)
                </FieldLabel>
              </div>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Checkbox 크기 예시" code={checkboxSizeCode} copyable />
      </section>
    </div>
  );
}
