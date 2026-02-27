const checklist = [
  "Focus visible 스타일은 모든 인터랙티브 요소에 필수.",
  "아이콘 버튼은 aria-label로 의미를 제공.",
  "Dialog/Dropdown은 포커스 트랩과 ESC 닫힘 확인.",
  "색상만으로 상태를 전달하지 않기 (텍스트/아이콘 보강).",
  "명도 대비는 최소 4.5:1 이상 확보.",
];

const shadcnNotes = [
  "Button, Input 등 기본 컴포넌트는 focus-visible 링을 유지한다.",
  "aria-pressed, aria-expanded 같은 상태 속성은 정확히 반영한다.",
  "아이콘 단독 버튼은 반드시 aria-label 또는 sr-only 텍스트 제공.",
];

const overlayChecklist = {
  tooltip: [
    "Trigger는 버튼/링크처럼 포커스 가능한 요소를 사용한다.",
    "hover뿐 아니라 키보드 focus에서도 Tooltip이 노출된다.",
    "핵심 정보는 Tooltip에만 두지 않고 본문에도 제공한다.",
  ],
  dropdown: [
    "Trigger에서 Enter/Space로 메뉴를 열 수 있다.",
    "열린 뒤 ArrowUp/ArrowDown으로 항목 이동이 가능하다.",
    "Esc로 닫히고, 닫힌 뒤 포커스가 Trigger로 복귀한다.",
  ],
  command: [
    "검색 input에 초기 포커스가 이동한다.",
    "ArrowUp/ArrowDown + Enter로 선택이 가능하다.",
    "Dialog 조합 시 Tab/Shift+Tab 순환과 Esc 닫힘이 동작한다.",
  ],
};

export default function AccessibilityGuidelinesPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">
          접근성 가이드
        </h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          shadcn 기본 접근성 규칙을 유지하면서 팀 룰을 일관되게 적용합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          체크리스트
        </h2>
        <div className="rounded-xl border border-border p-6">
          <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          shadcn 사용 노트
        </h2>
        <div className="rounded-xl border border-border p-6">
          <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
            {shadcnNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Overlay 컴포넌트 점검표
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border p-6">
            <h3 className="text-title-sm text-[color:var(--gray-900)]">Tooltip</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-body-sm text-[color:var(--gray-700)]">
              {overlayChecklist.tooltip.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h3 className="text-title-sm text-[color:var(--gray-900)]">Dropdown Menu</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-body-sm text-[color:var(--gray-700)]">
              {overlayChecklist.dropdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h3 className="text-title-sm text-[color:var(--gray-900)]">Command (Dialog)</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-body-sm text-[color:var(--gray-700)]">
              {overlayChecklist.command.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
