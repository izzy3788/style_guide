import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const inputCode = `import { Input } from "@/components/ui/input";
import {
  FieldControl,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

export function InputField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="sm">
        <FieldLabel>Small</FieldLabel>
        <FieldControl>
          <Input placeholder="입력" size="sm" />
        </FieldControl>
        <FieldHelper>라벨 12px · 도움말 12px</FieldHelper>
      </FieldRoot>
      <FieldRoot size="md">
        <FieldLabel>Medium</FieldLabel>
        <FieldControl>
          <Input placeholder="입력" size="md" />
        </FieldControl>
        <FieldHelper>라벨 13px · 도움말 12px</FieldHelper>
      </FieldRoot>
      <FieldRoot size="lg">
        <FieldLabel>Large</FieldLabel>
        <FieldControl>
          <Input placeholder="입력" size="lg" />
        </FieldControl>
        <FieldHelper>라벨 14px · 도움말 12px</FieldHelper>
      </FieldRoot>
    </div>
  );
}`;

const INPUT_SIZES = [
  { key: "sm", label: "Small", height: 32, px: 12, text: 12 },
  { key: "md", label: "Medium", height: 36, px: 12, text: 14 },
  { key: "lg", label: "Large", height: 40, px: 16, text: 14 },
] as const;

export default function InputDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Input</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          입력 필드 패턴과 사용 가이드입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          입력 컨트롤은 label 연결, focus-visible 상태, 오류 메시지 연결을
          확인해야 합니다. 자세한 기준은
          {" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>

      <section className="not-prose space-y-4">
        <h2 className="text-title-md text-[color:var(--gray-900)]">디자인 규칙</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>Size는 sm/md/lg만 사용합니다. (32 / 36 / 40px)</li>
          <li>좌우 패딩: sm=12px, md=12px, lg=16px</li>
          <li>Radius는 rounded-lg(10px)를 사용합니다.</li>
          <li>Hover는 gray-300, Focus는 primary-500 + ring primary-100</li>
          <li>Disabled는 gray-50 배경 + gray-400 텍스트</li>
          <li>ReadOnly는 gray-50 배경을 유지하고 hover/focus 반응을 최소화합니다.</li>
          <li>Error는 system red border + ring을 사용합니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <div className="max-w-lg mx-auto rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md space-y-4">
            <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
              Size별 라벨/도움말
            </div>
            <FieldRoot size="sm">
              <FieldLabel>Small</FieldLabel>
              <FieldControl>
                <Input placeholder="입력" size="sm" />
              </FieldControl>
              <FieldHelper>라벨 12px · 도움말 12px</FieldHelper>
            </FieldRoot>
            <FieldRoot size="md">
              <FieldLabel>Medium</FieldLabel>
              <FieldControl>
                <Input placeholder="입력" size="md" />
              </FieldControl>
              <FieldHelper>라벨 13px · 도움말 12px</FieldHelper>
            </FieldRoot>
            <FieldRoot size="lg">
              <FieldLabel>Large</FieldLabel>
              <FieldControl>
                <Input placeholder="입력" size="lg" />
              </FieldControl>
              <FieldHelper>라벨 14px · 도움말 12px</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={inputCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <p className="text-body-sm text-muted-foreground">
          기본 높이는 36px(`h-9`)입니다. Small은 32px, Large는 40px을
          사용합니다.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Padding</TableHead>
              <TableHead>Text</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INPUT_SIZES.map((item) => (
              <TableRow key={item.label}>
                <TableCell className="text-body-sm text-[color:var(--gray-900)]">
                  {item.label}
                </TableCell>
                <TableCell>
                  <FieldRoot size={item.key}>
                    <FieldControl>
                      <Input
                        aria-label={`${item.label} input`}
                        className="w-80"
                        placeholder="입력"
                        size={item.key}
                      />
                    </FieldControl>
                  </FieldRoot>
                </TableCell>
                <TableCell>{item.height}px</TableCell>
                <TableCell>
                  좌우 {item.px}px
                </TableCell>
                <TableCell>{item.text}px</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <div className="max-w-lg mx-auto rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md space-y-4">
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                Default
              </div>
              <FieldRoot size="md">
                <FieldControl>
                  <Input placeholder="입력" size="md" />
                </FieldControl>
              </FieldRoot>
            </div>
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                Hover (border gray-300)
              </div>
              <FieldRoot size="md">
                <FieldControl>
                  <Input
                    placeholder="입력"
                    size="md"
                    className="border-[color:var(--gray-300)]"
                  />
                </FieldControl>
              </FieldRoot>
            </div>
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                Focus (border primary-500, ring primary-100)
              </div>
              <FieldRoot size="md">
                <FieldControl>
                  <Input
                    placeholder="입력"
                    size="md"
                    className="border-[color:var(--primary-500)] ring-2 ring-[color:var(--primary-100)]"
                  />
                </FieldControl>
              </FieldRoot>
            </div>
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                Disabled
              </div>
              <FieldRoot size="md" disabled>
                <FieldControl>
                  <Input placeholder="입력" size="md" />
                </FieldControl>
              </FieldRoot>
            </div>
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                ReadOnly
              </div>
              <FieldRoot size="md">
                <FieldControl>
                  <Input
                    defaultValue="team-alpha@company.com"
                    readOnly
                    size="md"
                  />
                </FieldControl>
              </FieldRoot>
            </div>
            <div className="space-y-2">
              <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
                Error
              </div>
              <FieldRoot size="md" error>
                <FieldControl>
                  <Input placeholder="입력" size="md" />
                </FieldControl>
                <FieldError>올바른 이메일 형식이 아닙니다.</FieldError>
              </FieldRoot>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
