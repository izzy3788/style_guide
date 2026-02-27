import CodeSnippet from "../../_components/CodeSnippet";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldLabel, FieldRoot } from "@/components/ui/field";

const radioGroupCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldLabel, FieldRoot } from "@/components/ui/field";

export function RadioGroupField() {
  return (
    <div className="space-y-4">
      <FieldRoot size="md">
        <FieldLabel>배송 속도</FieldLabel>
        <RadioGroup aria-label="배송 속도">
          <label className="flex items-center gap-2">
            <RadioGroupItem defaultChecked name="shipping-speed" size="md" value="normal" />
            <span className="text-body-sm text-foreground">일반 배송 (2-3일)</span>
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem name="shipping-speed" size="md" value="express" />
            <span className="text-body-sm text-foreground">빠른 배송 (당일/익일)</span>
          </label>
        </RadioGroup>
      </FieldRoot>

      <FieldRoot size="md" disabled>
        <FieldLabel>비활성화 그룹</FieldLabel>
        <RadioGroup aria-label="비활성화 그룹">
          <label className="flex items-center gap-2">
            <RadioGroupItem defaultChecked disabled name="disabled-radio" value="a" />
            <span className="text-body-sm text-muted-foreground">옵션 A</span>
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem disabled name="disabled-radio" value="b" />
            <span className="text-body-sm text-muted-foreground">옵션 B</span>
          </label>
        </RadioGroup>
      </FieldRoot>
    </div>
  );
}`;

const radioStateCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupStates() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-caption-md text-muted-foreground">선택 / 미선택</p>
        <RadioGroup aria-label="라디오 상태 - 기본">
          <label className="flex items-center gap-2">
            <RadioGroupItem defaultChecked name="radio-state-default" size="md" value="checked" />
            <span className="text-body-sm text-foreground">선택됨</span>
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem name="radio-state-default" size="md" value="unchecked" />
            <span className="text-body-sm text-foreground">미선택</span>
          </label>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-caption-md text-muted-foreground">비활성화</p>
        <RadioGroup aria-label="라디오 상태 - 비활성화">
          <label className="flex items-center gap-2">
            <RadioGroupItem defaultChecked disabled name="radio-state-disabled" size="md" value="checked" />
            <span className="text-body-sm text-muted-foreground">선택됨 (Disabled)</span>
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem disabled name="radio-state-disabled" size="md" value="unchecked" />
            <span className="text-body-sm text-muted-foreground">미선택 (Disabled)</span>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}`;

const radioSizeCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupSizes() {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        <RadioGroupItem defaultChecked name="radio-size" size="sm" value="small" />
        <span className="text-body-sm text-foreground">Small (16px)</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem defaultChecked name="radio-size-md" size="md" value="medium" />
        <span className="text-body-sm text-foreground">Medium (20px)</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem defaultChecked name="radio-size-lg" size="lg" value="large" />
        <span className="text-body-sm text-foreground">Large (24px)</span>
      </label>
    </div>
  );
}`;

const radioHorizontalCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupHorizontal() {
  return (
    <RadioGroup aria-label="정렬 방식" className="flex flex-wrap items-center gap-4 space-y-0">
      <label className="inline-flex items-center gap-2">
        <RadioGroupItem defaultChecked name="radio-horizontal" size="md" value="latest" />
        <span className="text-body-sm text-foreground">최신순</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <RadioGroupItem name="radio-horizontal" size="md" value="popular" />
        <span className="text-body-sm text-foreground">인기순</span>
      </label>
      <label className="inline-flex items-center gap-2">
        <RadioGroupItem name="radio-horizontal" size="md" value="review" />
        <span className="text-body-sm text-foreground">리뷰순</span>
      </label>
    </RadioGroup>
  );
}`;

const radioCardCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupCards() {
  return (
    <RadioGroup aria-label="결제 수단" className="space-y-2">
      <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
        <RadioGroupItem defaultChecked name="radio-card" size="md" value="card" className="mt-0.5" />
        <span className="space-y-0.5">
          <span className="block text-body-sm text-foreground">신용/체크카드</span>
          <span className="block text-caption-md text-muted-foreground">가장 일반적인 결제 방식</span>
        </span>
      </label>
      <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
        <RadioGroupItem name="radio-card" size="md" value="bank" className="mt-0.5" />
        <span className="space-y-0.5">
          <span className="block text-body-sm text-foreground">계좌이체</span>
          <span className="block text-caption-md text-muted-foreground">수수료 없이 바로 이체</span>
        </span>
      </label>
      <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
        <RadioGroupItem name="radio-card" size="md" value="mobile" className="mt-0.5" />
        <span className="space-y-0.5">
          <span className="block text-body-sm text-foreground">휴대폰 결제</span>
          <span className="block text-caption-md text-muted-foreground">통신요금 합산 청구</span>
        </span>
      </label>
    </RadioGroup>
  );
}`;

export default function RadioGroupDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">Radio Group</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          여러 옵션 중 하나만 선택해야 할 때 사용하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">접근성 노트</h2>
        <p className="text-body-sm text-muted-foreground">
          Radio Group은 그룹 레이블과 각 항목 label을 명확히 제공해야 합니다.
          모바일/고밀도 화면에서는 라디오 원형 본체만 누르게 하지 말고, 현재
          예시처럼 항목 전체 라벨 영역을 클릭 가능하게 유지합니다. 자세한 기준은{" "}
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
            <FieldRoot size="md">
              <FieldLabel>배송 속도</FieldLabel>
              <RadioGroup aria-label="배송 속도">
                <label className="flex items-center gap-2">
                  <RadioGroupItem defaultChecked name="shipping-speed" size="md" value="normal" />
                  <span className="text-body-sm text-foreground">일반 배송 (2-3일)</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem name="shipping-speed" size="md" value="express" />
                  <span className="text-body-sm text-foreground">빠른 배송 (당일/익일)</span>
                </label>
              </RadioGroup>
            </FieldRoot>

            <FieldRoot size="md" disabled>
              <FieldLabel>비활성화 그룹</FieldLabel>
              <RadioGroup aria-label="비활성화 그룹">
                <label className="flex items-center gap-2">
                  <RadioGroupItem defaultChecked disabled name="disabled-radio" value="a" />
                  <span className="text-body-sm text-muted-foreground">옵션 A</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem disabled name="disabled-radio" value="b" />
                  <span className="text-body-sm text-muted-foreground">옵션 B</span>
                </label>
              </RadioGroup>
            </FieldRoot>
          </div>
        </div>
        <CodeSnippet title="Radio Group 사용 예시" code={radioGroupCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">상태</h2>
        <p className="text-body-sm text-muted-foreground">
          Radio Group에서 자주 사용하는 선택/미선택, 비활성화 상태를 확인할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-caption-md text-muted-foreground">선택 / 미선택</p>
              <RadioGroup aria-label="라디오 상태 - 기본">
                <label className="flex items-center gap-2">
                  <RadioGroupItem
                    defaultChecked
                    name="radio-state-default"
                    size="md"
                    value="checked"
                  />
                  <span className="text-body-sm text-foreground">선택됨</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem name="radio-state-default" size="md" value="unchecked" />
                  <span className="text-body-sm text-foreground">미선택</span>
                </label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <p className="text-caption-md text-muted-foreground">비활성화</p>
              <RadioGroup aria-label="라디오 상태 - 비활성화">
                <label className="flex items-center gap-2">
                  <RadioGroupItem
                    defaultChecked
                    disabled
                    name="radio-state-disabled"
                    size="md"
                    value="checked"
                  />
                  <span className="text-body-sm text-muted-foreground">선택됨 (Disabled)</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem disabled name="radio-state-disabled" size="md" value="unchecked" />
                  <span className="text-body-sm text-muted-foreground">미선택 (Disabled)</span>
                </label>
              </RadioGroup>
            </div>
          </div>
        </div>
        <CodeSnippet title="Radio Group 상태 예시" code={radioStateCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">크기</h2>
        <p className="text-body-sm text-muted-foreground">
          Radio는 `sm`(16px), `md`(20px), `lg`(24px) 크기를 지원합니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <RadioGroupItem defaultChecked name="radio-size" size="sm" value="small" />
              <span className="text-body-sm text-foreground">Small (16px)</span>
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem defaultChecked name="radio-size-md" size="md" value="medium" />
              <span className="text-body-sm text-foreground">Medium (20px)</span>
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem defaultChecked name="radio-size-lg" size="lg" value="large" />
              <span className="text-body-sm text-foreground">Large (24px)</span>
            </label>
          </div>
        </div>
        <CodeSnippet title="Radio Group 크기 예시" code={radioSizeCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">가로 정렬형</h2>
        <p className="text-body-sm text-muted-foreground">
          짧은 옵션 목록은 가로 배치로 밀도 있게 구성할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <RadioGroup aria-label="정렬 방식" className="flex flex-wrap items-center gap-4 space-y-0">
            <label className="inline-flex items-center gap-2">
              <RadioGroupItem defaultChecked name="radio-horizontal" size="md" value="latest" />
              <span className="text-body-sm text-foreground">최신순</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <RadioGroupItem name="radio-horizontal" size="md" value="popular" />
              <span className="text-body-sm text-foreground">인기순</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <RadioGroupItem name="radio-horizontal" size="md" value="review" />
              <span className="text-body-sm text-foreground">리뷰순</span>
            </label>
          </RadioGroup>
        </div>
        <CodeSnippet title="Radio Group 가로 정렬 예시" code={radioHorizontalCode} copyable />
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">카드형</h2>
        <p className="text-body-sm text-muted-foreground">
          설명 텍스트가 필요한 옵션은 카드형 레이아웃으로 확장할 수 있습니다.
        </p>
        <div className="max-w-lg rounded-xl border border-border bg-muted-30 p-6">
          <RadioGroup aria-label="결제 수단" className="space-y-2">
            <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
              <RadioGroupItem
                defaultChecked
                name="radio-card"
                size="md"
                value="card"
                className="mt-0.5"
              />
              <span className="space-y-0.5">
                <span className="block text-body-sm text-foreground">신용/체크카드</span>
                <span className="block text-caption-md text-muted-foreground">
                  가장 일반적인 결제 방식
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
              <RadioGroupItem name="radio-card" size="md" value="bank" className="mt-0.5" />
              <span className="space-y-0.5">
                <span className="block text-body-sm text-foreground">계좌이체</span>
                <span className="block text-caption-md text-muted-foreground">
                  수수료 없이 바로 이체
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors has-[:checked]:border-[color:var(--primary-500)] has-[:checked]:bg-[color:var(--primary-50)]">
              <RadioGroupItem name="radio-card" size="md" value="mobile" className="mt-0.5" />
              <span className="space-y-0.5">
                <span className="block text-body-sm text-foreground">휴대폰 결제</span>
                <span className="block text-caption-md text-muted-foreground">
                  통신요금 합산 청구
                </span>
              </span>
            </label>
          </RadioGroup>
        </div>
        <CodeSnippet title="Radio Group 카드형 예시" code={radioCardCode} copyable />
      </section>
    </div>
  );
}
