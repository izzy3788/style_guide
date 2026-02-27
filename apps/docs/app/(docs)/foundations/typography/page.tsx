import CodeSnippet from "../../_components/CodeSnippet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TypographyItem = {
  name: string;
  className: string;
  scaleToken: string;
  sampleEn: string;
  sampleKo: string;
  usage: string[];
};

type TypographySection = {
  title: string;
  description: string;
  items: TypographyItem[];
};

const typeScale = [
  {
    name: "Title 1",
    token: "text-title-xl",
    mobile: "30px",
    desktop: "48px",
    weight: "600",
    lineHeight: "120%",
    tracking: "-0.01em",
  },
  {
    name: "Title 2",
    token: "text-title-lg",
    mobile: "26px",
    desktop: "36px",
    weight: "600",
    lineHeight: "120%",
    tracking: "-0.01em",
  },
  {
    name: "Title 3",
    token: "text-title-md",
    mobile: "20px",
    desktop: "24px",
    weight: "600",
    lineHeight: "130%",
    tracking: "-0.01em",
  },
  {
    name: "Title 4",
    token: "text-title-sm",
    mobile: "18px",
    desktop: "20px",
    weight: "600",
    lineHeight: "130%",
    tracking: "-0.01em",
  },
  {
    name: "Title 5",
    token: "text-title-xs",
    mobile: "16px",
    desktop: "16px",
    weight: "500",
    lineHeight: "150%",
    tracking: "-",
  },
  {
    name: "Body 1",
    token: "text-body-lg",
    mobile: "18px",
    desktop: "18px",
    weight: "500",
    lineHeight: "140%",
    tracking: "-",
  },
  {
    name: "Body 2",
    token: "text-body-md",
    mobile: "16px",
    desktop: "16px",
    weight: "400",
    lineHeight: "150%",
    tracking: "-",
  },
  {
    name: "Body 3",
    token: "text-body-sm",
    mobile: "14px",
    desktop: "14px",
    weight: "400",
    lineHeight: "150%",
    tracking: "-",
  },
  {
    name: "Caption 1",
    token: "text-caption-lg",
    mobile: "13px",
    desktop: "13px",
    weight: "400",
    lineHeight: "140%",
    tracking: "-",
  },
  {
    name: "Caption 2",
    token: "text-caption",
    mobile: "12px",
    desktop: "12px",
    weight: "400",
    lineHeight: "140%",
    tracking: "-",
  },
] as const;

const typographySections: TypographySection[] = [
  {
    title: "헤딩",
    description: "페이지/섹션/카드 제목의 위계를 정리합니다.",
    items: [
      {
        name: "H1",
        className: "text-title-xl",
        scaleToken: "text-title-xl",
        sampleEn: "Design system foundations.",
        sampleKo: "디자인 시스템의 기반을 정의합니다.",
        usage: ["페이지 제목. 화면당 1회 사용합니다."],
      },
      {
        name: "H2",
        className: "text-title-lg",
        scaleToken: "text-title-lg",
        sampleEn: "Typography scale and rhythm.",
        sampleKo: "타이포그래피 스케일과 리듬.",
        usage: ["섹션 제목에 사용합니다."],
      },
      {
        name: "H3",
        className: "text-title-md",
        scaleToken: "text-title-md",
        sampleEn: "Structure and hierarchy.",
        sampleKo: "구조와 위계를 구성합니다.",
        usage: ["카드 제목이나 서브 섹션에 사용합니다."],
      },
      {
        name: "H4",
        className: "text-title-sm",
        scaleToken: "text-title-sm",
        sampleEn: "Secondary heading level.",
        sampleKo: "보조 섹션 제목에 사용합니다.",
        usage: ["카드 내부 소제목이나 보조 헤딩에 사용합니다."],
      },
      {
        name: "H5",
        className: "text-title-xs text-foreground",
        scaleToken: "text-title-xs",
        sampleEn: "Compact title style for table headers and labels.",
        sampleKo: "테이블 헤더/라벨에 사용하는 컴팩트 타이틀 스타일입니다.",
        usage: ["테이블 헤더, 강조 라벨, 짧은 메타 헤더에 사용합니다."],
      },
    ],
  },
  {
    title: "본문",
    description: "본문과 설명 텍스트에 사용합니다.",
    items: [
      {
        name: "Body 1",
        className: "text-body-lg text-foreground",
        scaleToken: "text-body-lg",
        sampleEn: "Primary body text for emphasized reading.",
        sampleKo: "강조가 필요한 본문 텍스트에 사용합니다.",
        usage: ["강조 본문 또는 중요한 설명에 사용합니다."],
      },
      {
        name: "Body 2",
        className: "text-body-md text-foreground",
        scaleToken: "text-body-md",
        sampleEn: "Clear body copy for reading and scanning.",
        sampleKo: "읽기와 스캐닝을 위한 본문 텍스트입니다.",
        usage: ["문서 기본 본문 스타일입니다."],
      },
      {
        name: "Body 3",
        className: "text-body-sm text-muted-foreground",
        scaleToken: "text-body-sm",
        sampleEn: "De-emphasized helper text.",
        sampleKo: "강조를 낮춘 도움말 텍스트.",
        usage: ["보조 설명이나 인라인 힌트에 사용합니다."],
      },
    ],
  },
  {
    title: "메타",
    description: "메타 정보와 짧은 보조 텍스트에 사용합니다.",
    items: [
      {
        name: "Caption 1",
        className: "text-caption-lg text-[color:var(--gray-700)]",
        scaleToken: "text-caption-lg",
        sampleEn: "Supporting details and metadata.",
        sampleKo: "보조 정보와 메타데이터.",
        usage: ["라벨, 보조 텍스트, 타임스탬프에 사용합니다."],
      },
      {
        name: "Caption 2",
        className: "text-caption text-[color:var(--gray-600)]",
        scaleToken: "text-caption",
        sampleEn: "Caption or microcopy.",
        sampleKo: "캡션이나 미세 텍스트.",
        usage: ["차트 라벨이나 작은 주석에 사용합니다."],
      },
    ],
  },
];

function UsageCallout({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-[color:var(--gray-50)] p-6">
      <div className="text-caption uppercase tracking-wide text-[color:var(--gray-600)]">
        사용 규칙
      </div>
      <ul className="mt-2 list-disc space-y-3 pl-4 text-body-sm text-[color:var(--gray-700)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul> 
    </div>
  );
}

function TypographyItemRow({ item }: { item: TypographyItem }) {
  const scale = typeScale.find((scaleItem) => scaleItem.token === item.scaleToken);

  return (
    <div className="rounded-xl border border-border p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-body-sm text-[color:var(--gray-900)]">{item.name}</div>
          <div className="mt-1 font-mono text-caption text-muted-foreground">
            {item.className}
          </div>
        </div>
        <div className="text-caption text-[color:var(--gray-600)]">{item.usage[0]}</div>
      </div>
      <div className="mt-4 space-y-3">
        <p className={item.className}>{item.sampleEn}</p>
        <p className={item.className}>{item.sampleKo}</p>
      </div>
      {scale ? (
        <div className="mt-4 grid gap-2 rounded-lg border border-border bg-[color:var(--gray-50)] p-4 md:grid-cols-4">
          <div>
            <div className="text-caption text-[color:var(--gray-600)]">Name</div>
            <div className="text-body-sm text-[color:var(--gray-900)]">{scale.name}</div>
          </div>
          <div>
            <div className="text-caption text-[color:var(--gray-600)]">Weight</div>
            <div className="text-body-sm text-[color:var(--gray-900)]">{scale.weight}</div>
          </div>
          <div>
            <div className="text-caption text-[color:var(--gray-600)]">Mobile</div>
            <div className="text-body-sm text-[color:var(--gray-900)]">{scale.mobile}</div>
          </div>
          <div>
            <div className="text-caption text-[color:var(--gray-600)]">Desktop</div>
            <div className="text-body-sm text-[color:var(--gray-900)]">{scale.desktop}</div>
          </div>
        </div>
      ) : null}
      <div className="mt-4">
        <CodeSnippet code={`className=\"${item.className}\"`} />
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg">타이포그래피</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          일관된 UI 문구를 위한 승인된 타입 스타일과 사용 규칙입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          타이포그래피 규칙
        </h2>
        <UsageCallout
          items={[
            "H1은 페이지당 1회 사용하며 핵심 맥락을 정의합니다.",
            "H2는 주요 섹션, H3는 카드/서브 섹션에 사용합니다.",
            "본문은 text-body-md를 기본으로 합니다.",
            "테이블 헤더/라벨 강조는 text-title-xs를 사용합니다.",
            "보조 텍스트는 text-body-sm + muted 컬러를 사용합니다.",
            "캡션/메타는 text-caption으로 통일합니다.",
            "한 블록에서 폰트 웨이트를 과도하게 섞지 않습니다.",
          ]}
        />
        <p className="text-caption text-[color:var(--gray-600)]">
          헤딩은 작은 사이즈에서도 선명하도록 tracking-tight를 유지합니다.
        </p>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">Type Scale</h2>
        <p className="text-body-sm text-muted-foreground">
          모바일 기준을 기본으로 하고, md 이상에서 타이틀 계열이 확장됩니다.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Desktop</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Line Height</TableHead>
              <TableHead>Tracking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeScale.map((item) => (
              <TableRow key={item.token}>
                <TableCell className="text-body-sm text-[color:var(--gray-900)]">
                  {item.name}
                </TableCell>
                <TableCell className="text-caption text-muted-foreground">
                  {item.token}
                </TableCell>
                <TableCell className="text-body-sm text-muted-foreground">
                  {item.mobile}
                </TableCell>
                <TableCell className="text-body-sm text-muted-foreground">
                  {item.desktop}
                </TableCell>
                <TableCell className="text-body-sm text-muted-foreground">
                  {item.weight}
                </TableCell>
                <TableCell className="text-body-sm text-muted-foreground">
                  {item.lineHeight}
                </TableCell>
                <TableCell className="text-body-sm text-muted-foreground">
                  {item.tracking}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {typographySections.map((section) => (
        <section key={section.title} className="not-prose space-y-6">
          <div className="space-y-2">
            <h2 className="text-title-md text-[color:var(--gray-900)]">
              {section.title}
            </h2>
            <p className="text-body-sm text-muted-foreground">{section.description}</p>
          </div>
          <div className="grid gap-4">
            {section.items.map((item) => (
              <TypographyItemRow key={item.name} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
