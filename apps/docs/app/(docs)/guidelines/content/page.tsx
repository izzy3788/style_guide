const buttonRules = [
  "동사 + 목적어로 시작한다 (예: 프로젝트 만들기, 초대 보내기).",
  "OK/Cancel 대신 구체적인 행동을 쓴다.",
  "한 화면에 Primary CTA는 1개만 둔다.",
  "비가역 행동은 강도 높은 동사를 사용한다 (예: 삭제, 해지).",
];

const errorRules = [
  "원인 + 해결을 한 문장에 담는다.",
  "사용자 탓으로 느껴지는 표현을 피한다.",
  "오류 코드/기술 용어는 숨기고 필요한 경우만 보여준다.",
];

const emptyRules = [
  "현재 상태 + 다음 행동을 함께 제시한다.",
  "짧은 안내 후 즉시 실행 가능한 CTA를 붙인다.",
  "처음 사용자 기준으로 설명한다.",
];

const buttonDos = [
  { do: "프로젝트 만들기", dont: "OK" },
  { do: "초대 보내기", dont: "확인" },
  { do: "변경사항 저장", dont: "저장" },
  { do: "구독 해지", dont: "취소" },
];

const errorDos = [
  {
    do: "요청이 실패했어요. 네트워크를 확인한 뒤 다시 시도해주세요.",
    dont: "알 수 없는 오류가 발생했습니다.",
  },
  {
    do: "이메일 형식이 올바르지 않습니다. example@domain.com처럼 입력해주세요.",
    dont: "유효하지 않은 입력입니다.",
  },
  {
    do: "권한이 없어요. 관리자에게 접근 권한을 요청하세요.",
    dont: "접근 불가",
  },
];

const emptyDos = [
  {
    do: "아직 프로젝트가 없습니다. 첫 프로젝트를 만들어 보세요.",
    dont: "데이터가 없습니다.",
  },
  {
    do: "활성 멤버가 없어요. 팀원을 초대해 시작하세요.",
    dont: "목록이 비어 있습니다.",
  },
  {
    do: "이번 주 리포트가 없습니다. 리포트를 생성해 보세요.",
    dont: "결과 없음",
  },
];

function Rules({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border p-6">
      <h3 className="text-title-sm text-[color:var(--gray-900)]">{title}</h3>
      <ul className="mt-3 list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function DoDontTable({
  rows,
}: {
  rows: { do: string; dont: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-2 border-b border-border bg-muted px-4 py-3 text-caption uppercase tracking-wide text-muted-foreground">
        <div>권장</div>
        <div>비권장</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.do} className="grid grid-cols-2 gap-6 px-4 py-3">
            <div className="text-body-sm text-[color:var(--gray-900)]">{row.do}</div>
            <div className="text-body-sm text-muted-foreground">{row.dont}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentGuidelinesPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">
          콘텐츠 가이드
        </h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          SaaS 제품에서 빠르게 이해되는 마이크로카피 규칙을 정리합니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">
            버튼 문구
          </h2>
          <p className="text-body-sm text-muted-foreground">
            사용자가 무엇을 하는지 바로 이해할 수 있는 버튼 문구를 사용합니다.
          </p>
        </div>
        <Rules title="규칙" items={buttonRules} />
        <DoDontTable rows={buttonDos} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">
            에러 메시지
          </h2>
          <p className="text-body-sm text-muted-foreground">
            원인과 해결을 함께 제공해 사용자가 다음 행동을 알 수 있게 합니다.
          </p>
        </div>
        <Rules title="규칙" items={errorRules} />
        <DoDontTable rows={errorDos} />
      </section>

      <section className="not-prose space-y-6">
        <div className="space-y-2">
          <h2 className="text-title-md text-[color:var(--gray-900)]">
            빈 상태
          </h2>
          <p className="text-body-sm text-muted-foreground">
            빈 상태는 다음 행동을 유도하는 안내로 바꿉니다.
          </p>
        </div>
        <Rules title="규칙" items={emptyRules} />
        <DoDontTable rows={emptyDos} />
      </section>
    </div>
  );
}
