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
import { Textarea } from "@/components/ui/textarea";
import {
  FieldControl,
  FieldError,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

const textareaCode = `import { Textarea } from "@/components/ui/textarea";
import {
  FieldControl,
  FieldHelper,
  FieldLabel,
  FieldRoot,
} from "@/components/ui/field";

export function TextareaField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="sm">
        <FieldLabel>Small</FieldLabel>
        <FieldControl>
          <Textarea
            placeholder="요약을 입력하세요"
            size="sm"
            style={{ minHeight: "80px" }}
          />
        </FieldControl>
        <FieldHelper>짧은 메모</FieldHelper>
      </FieldRoot>
      <FieldRoot size="md">
        <FieldLabel>Medium</FieldLabel>
        <FieldControl>
          <Textarea
            placeholder="상세 설명을 입력하세요"
            size="md"
            style={{ minHeight: "96px" }}
          />
        </FieldControl>
        <FieldHelper>기본 권장 크기</FieldHelper>
      </FieldRoot>
      <FieldRoot size="lg">
        <FieldLabel>Large</FieldLabel>
        <FieldControl>
          <Textarea
            placeholder="긴 내용을 입력하세요"
            size="lg"
            style={{ minHeight: "128px" }}
          />
        </FieldControl>
        <FieldHelper>긴 텍스트 작성</FieldHelper>
      </FieldRoot>
    </div>
  );
}`;

const TEXTAREA_SIZES = [
  { key: "sm", label: "Small", minHeight: 80, px: 12, py: 8, text: 12 },
  { key: "md", label: "Medium", minHeight: 96, px: 12, py: 10, text: 14 },
  { key: "lg", label: "Large", minHeight: 128, px: 16, py: 12, text: 14 },
] as const;

export default function TextareaDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Textarea</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          여러 줄 입력을 위한 필드입니다. Input과 같은 색상/상태 규칙을 사용합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Textarea도 label 연결, focus-visible 상태, 오류 메시지 연결을 확인해야
          합니다. 자세한 기준은{" "}
          <Link className="underline" href="/guidelines/accessibility">
            접근성 가이드
          </Link>
          를 참고합니다.
        </p>
      </section>

      <section className="not-prose space-y-4">
        <h2 className="text-title-md text-[color:var(--gray-900)]">디자인 규칙</h2>
        <ul className="space-y-2 text-body-sm text-muted-foreground">
          <li>Size는 sm/md/lg만 사용합니다.</li>
          <li>기본 상태 토큰은 Input과 동일합니다.</li>
          <li>사용자는 높이를 조정할 수 있도록 `resize-y`를 사용합니다.</li>
          <li>단문 입력에는 Input, 장문 입력에는 Textarea를 사용합니다.</li>
        </ul>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">예시</h2>
        <div className="max-w-lg mx-auto rounded-xl border border-border bg-muted-30 p-6">
          <div className="mx-auto max-w-md space-y-4">
            <FieldRoot size="sm">
              <FieldLabel>Small</FieldLabel>
              <FieldControl>
                <Textarea
                  placeholder="요약을 입력하세요"
                  size="sm"
                  style={{ minHeight: `${TEXTAREA_SIZES[0].minHeight}px` }}
                />
              </FieldControl>
              <FieldHelper>짧은 메모</FieldHelper>
            </FieldRoot>
            <FieldRoot size="md">
              <FieldLabel>Medium</FieldLabel>
              <FieldControl>
                <Textarea
                  placeholder="상세 설명을 입력하세요"
                  size="md"
                  style={{ minHeight: `${TEXTAREA_SIZES[1].minHeight}px` }}
                />
              </FieldControl>
              <FieldHelper>기본 권장 크기</FieldHelper>
            </FieldRoot>
            <FieldRoot size="lg">
              <FieldLabel>Large</FieldLabel>
              <FieldControl>
                <Textarea
                  placeholder="긴 내용을 입력하세요"
                  size="lg"
                  style={{ minHeight: `${TEXTAREA_SIZES[2].minHeight}px` }}
                />
              </FieldControl>
              <FieldHelper>긴 텍스트 작성</FieldHelper>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="사용 예시" code={textareaCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Min Height</TableHead>
              <TableHead>Padding</TableHead>
              <TableHead>Text</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEXTAREA_SIZES.map((item) => (
              <TableRow key={item.label}>
                <TableCell className="text-body-sm text-[color:var(--gray-900)]">
                  {item.label}
                </TableCell>
                <TableCell>
                  <FieldRoot size={item.key}>
                    <FieldControl>
                      <Textarea
                        aria-label={`${item.label} textarea`}
                        className="w-80"
                        placeholder="내용을 입력하세요"
                        size={item.key}
                        style={{ minHeight: `${item.minHeight}px` }}
                      />
                    </FieldControl>
                  </FieldRoot>
                </TableCell>
                <TableCell>{item.minHeight}px</TableCell>
                <TableCell>
                  좌우 {item.px}px / 상하 {item.py}px
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
            <FieldRoot size="md">
              <FieldLabel>Default</FieldLabel>
              <FieldControl>
                <Textarea placeholder="내용을 입력하세요" size="md" />
              </FieldControl>
            </FieldRoot>
            <FieldRoot size="md" disabled>
              <FieldLabel>Disabled</FieldLabel>
              <FieldControl>
                <Textarea placeholder="비활성화 상태" size="md" />
              </FieldControl>
            </FieldRoot>
            <FieldRoot size="md" readOnly>
              <FieldLabel>Read-only</FieldLabel>
              <FieldControl>
                <Textarea size="md" value="읽기 전용 텍스트입니다." />
              </FieldControl>
            </FieldRoot>
            <FieldRoot size="md" error>
              <FieldLabel>Error</FieldLabel>
              <FieldControl>
                <Textarea placeholder="오류 상태" size="md" />
              </FieldControl>
              <FieldError>필수 항목을 입력해 주세요.</FieldError>
            </FieldRoot>
          </div>
        </div>
      </section>
    </div>
  );
}
