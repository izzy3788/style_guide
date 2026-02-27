import CodeSnippet from "../../_components/CodeSnippet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const spacingScale = [
  { px: 2, rem: "0.125rem", token: "0.5", className: "p-0.5" },
  { px: 4, rem: "0.25rem", token: "1", className: "p-1" },
  { px: 6, rem: "0.375rem", token: "1.5", className: "p-1.5" },
  { px: 8, rem: "0.5rem", token: "2", className: "p-2" },
  { px: 10, rem: "0.625rem", token: "2.5", className: "p-2.5" },
  { px: 12, rem: "0.75rem", token: "3", className: "p-3" },
  { px: 16, rem: "1rem", token: "4", className: "p-4" },
  { px: 20, rem: "1.25rem", token: "5", className: "p-5" },
  { px: 24, rem: "1.5rem", token: "6", className: "p-6" },
  { px: 28, rem: "1.75rem", token: "7", className: "p-7" },
  { px: 32, rem: "2rem", token: "8", className: "p-8" },
  { px: 40, rem: "2.5rem", token: "10", className: "p-10" },
  { px: 48, rem: "3rem", token: "12", className: "p-12" },
  { px: 64, rem: "4rem", token: "16", className: "p-16" },
];

const figmaSpacingVariables = spacingScale.map((item) => ({
  ...item,
  figmaName: `Space/${item.px}`,
}));

const radiusScale = [
  {
    name: "xs",
    px: 4,
    source: "calc(var(--radius) - 6px)",
    cssToken: "--radius-xs",
    usage: "Checkbox 전용",
  },
  {
    name: "sm",
    px: 6,
    source: "calc(var(--radius) - 4px)",
    cssToken: "--radius-sm",
    usage: "작은 칩/세부 요소",
  },
  {
    name: "md",
    px: 8,
    source: "calc(var(--radius) - 2px)",
    cssToken: "--radius-md",
    usage: "버튼 기본 (rounded-md)",
  },
  {
    name: "lg",
    px: 10,
    source: "var(--radius)",
    cssToken: "--radius-lg",
    usage: "필드(Input/Textarea/Select/Dialog)",
  },
  {
    name: "xl",
    px: 14,
    source: "calc(var(--radius) + 4px)",
    cssToken: "--radius-xl",
    usage: "카드/대형 패널",
  },
  {
    name: "2xl",
    px: 18,
    source: "calc(var(--radius) + 8px)",
    cssToken: "--radius-2xl",
    usage: "대형 패널",
  },
] as const;

export default function SpacingPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg">간격</h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          8px 기반의 고정 스페이싱 스케일과 사용 규칙입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Spacing Scale
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>허용된 스케일</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-body-sm text-muted-foreground">
              아래 값만 사용합니다. 임의 값(`mt-[18px]`)은 금지합니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>px</TableHead>
                  <TableHead>rem</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Tailwind 예시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spacingScale.map((item) => (
                  <TableRow key={item.px}>
                    <TableCell className="text-body-sm">
                      {item.px}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {item.rem}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {item.token}
                    </TableCell>
                    <TableCell className="font-mono text-caption">
                      {item.className}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Usage Rules
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>기본 규칙</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li>페이지 수준 수직 간격: 48px (`space-y-12`).</li>
              <li>섹션 간격: 24px (`space-y-6`).</li>
              <li>카드 패딩: 24px (`p-6`).</li>
              <li>카드 내부 간격: 12px 또는 16px (`gap-3`, `gap-4`).</li>
              <li>인라인 간격: 8px (`gap-2`).</li>
              <li>반드시 스케일 안에서 가장 가까운 값을 선택합니다.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Figma Variables Naming (Spacing / Radius)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Spacing 변수 네이밍</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-body-sm text-muted-foreground">
              Figma에서는 Tailwind token(`2`, `6`, `12`)보다 실제 px 중심 이름(
              <code>Space/8</code>, <code>Space/24</code>)이 더 빠르게 찾기 쉽습니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Figma Variable</TableHead>
                  <TableHead>px</TableHead>
                  <TableHead>Tailwind Token</TableHead>
                  <TableHead>Tailwind 예시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {figmaSpacingVariables.map((item) => (
                  <TableRow key={item.px}>
                    <TableCell className="font-mono text-caption">
                      {item.figmaName}
                    </TableCell>
                    <TableCell className="text-body-sm">{item.px}</TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {item.token}
                    </TableCell>
                    <TableCell className="font-mono text-caption">
                      {item.className}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radius 변수 네이밍</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-body-sm text-muted-foreground">
              반경은 코드의 <code>--radius</code> 기반 계산값을 그대로 Figma Variables로 옮깁니다.
              먼저 <code>Radius/Base = 10</code>을 만들고, 파생값을 고정 px로 생성합니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Figma Variable</TableHead>
                  <TableHead>px</TableHead>
                  <TableHead>Code Token</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-caption">Radius/Base</TableCell>
                  <TableCell className="text-body-sm">10</TableCell>
                  <TableCell className="font-mono text-caption text-muted-foreground">
                    --radius
                  </TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">base</TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">
                    디자인 시스템 기준 반경
                  </TableCell>
                </TableRow>
                {radiusScale.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-mono text-caption">
                      {`Radius/${item.name.toUpperCase()}`}
                    </TableCell>
                    <TableCell className="text-body-sm">{item.px}</TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {item.cssToken}
                    </TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {item.source}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {item.usage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>컴포넌트 반경 운영 규칙</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li>Button: `rounded-md`(Radius/MD, 8px)를 기본으로 사용합니다.</li>
              <li>Field 계열(Input/Textarea/Select/Dialog): `rounded-lg`(Radius/LG, 10px)를 사용합니다.</li>
              <li>Card: `rounded-xl`(Radius/XL, 14px)을 사용합니다.</li>
              <li>Checkbox: 예외적으로 `rounded-[var(--radius-xs)]`(Radius/XS, 4px)를 사용합니다.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Examples
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>페이지/섹션 간격</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeSnippet
                code={`<article className="space-y-12">
  <section className="space-y-6">...</section>
  <section className="space-y-6">...</section>
</article>`}
              />
              <p className="text-caption text-[color:var(--gray-500)]">
                문서 전체 흐름은 48px, 섹션 내부는 24px로 유지합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>카드/인라인 간격</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeSnippet
                code={`<div className="rounded-xl border p-6">
  <div className="flex items-center gap-2">
    <span>Label</span>
    <span>Value</span>
  </div>
  <div className="mt-3 grid gap-3">...</div>
</div>`}
              />
              <p className="text-caption text-[color:var(--gray-500)]">
                카드 패딩은 24px, 인라인 요소는 8px 간격을 기준으로 합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
