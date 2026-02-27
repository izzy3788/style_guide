import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";

import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Select } from "@/components/ui/select";

const selectCode = `import {
  FieldControl,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";
import { Select } from "@/components/ui/select";

export function SelectField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="sm">
        <FieldLabel>Small</FieldLabel>
        <FieldControl>
          <Select defaultValue="" size="sm">
            <option value="starter">Starter</option>
            <option value="team">Team</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </FieldControl>
        <FieldHelper>높이 32px</FieldHelper>
      </FieldRoot>

      <FieldRoot size="md">
        <FieldLabel>Medium</FieldLabel>
        <FieldControl>
          <Select defaultValue="team" size="md">
            <option value="starter">Starter</option>
            <option value="team">Team</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </FieldControl>
        <FieldHelper>기본 높이 36px</FieldHelper>
      </FieldRoot>

      <FieldRoot size="lg">
        <FieldLabel>Large</FieldLabel>
        <FieldControl>
          <Select defaultValue="enterprise" size="lg">
            <option value="starter">Starter</option>
            <option value="team">Team</option>
            <option value="enterprise">Enterprise</option>
          </Select>
        </FieldControl>
        <FieldHelper>높이 40px</FieldHelper>
      </FieldRoot>
    </div>
  );
}`;

export default function SelectDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Select</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          단일 옵션 선택을 위한 드롭다운 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="sm">
              <FieldLabel>Small</FieldLabel>
              <FieldControl>
                <Select defaultValue="" size="sm">
                  <option value="starter">Starter</option>
                  <option value="team">Team</option>
                  <option value="enterprise">Enterprise</option>
                </Select>
              </FieldControl>
              <FieldHelper>높이 32px</FieldHelper>
            </FieldRoot>

            <FieldRoot size="md">
              <FieldLabel>Medium</FieldLabel>
              <FieldControl>
                <Select defaultValue="team" size="md">
                  <option value="starter">Starter</option>
                  <option value="team">Team</option>
                  <option value="enterprise">Enterprise</option>
                </Select>
              </FieldControl>
              <FieldHelper>기본 높이 36px</FieldHelper>
            </FieldRoot>

            <FieldRoot size="lg">
              <FieldLabel>Large</FieldLabel>
              <FieldControl>
                <Select defaultValue="enterprise" size="lg">
                  <option value="starter">Starter</option>
                  <option value="team">Team</option>
                  <option value="enterprise">Enterprise</option>
                </Select>
              </FieldControl>
              <FieldHelper>높이 40px</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={selectCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <FieldRoot size="md" disabled>
              <FieldLabel>Disabled</FieldLabel>
              <FieldControl>
                <Select defaultValue="starter" size="md">
                  <option value="starter">Starter</option>
                  <option value="team">Team</option>
                </Select>
              </FieldControl>
              <FieldHelper>선택할 수 없는 상태</FieldHelper>
            </FieldRoot>

            <FieldRoot size="md" error>
              <FieldLabel>오류 상태</FieldLabel>
              <FieldControl>
                <Select defaultValue="" size="md">
                  <option value="starter">Starter</option>
                  <option value="team">Team</option>
                </Select>
              </FieldControl>
              <FieldError>플랜을 선택해주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Select는 반드시 label과 연결하고 오류 상태를 텍스트로 함께 제공해야
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
