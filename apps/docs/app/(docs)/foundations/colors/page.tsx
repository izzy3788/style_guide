"use client";

import CodeSnippet from "../../_components/CodeSnippet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

const tokenGroups = {
  surfaces: [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--popover",
    "--popover-foreground",
  ],
  borders: ["--border", "--input", "--ring"],
  brand: ["--primary", "--primary-foreground"],
  semantic: ["--destructive", "--destructive-foreground"],
} as const;

type TokenValueMap = Record<string, string>;

const grayScale = [
  { name: "Gray 00", token: "gray-00", value: "#FFFFFF" },
  { name: "Gray 50", token: "gray-50", value: "#FAFAFA" },
  { name: "Gray 100", token: "gray-100", value: "#F4F5F7" },
  { name: "Gray 200", token: "gray-200", value: "#ECEEF1" },
  { name: "Gray 300", token: "gray-300", value: "#D9DEE5" },
  { name: "Gray 400", token: "gray-400", value: "#BFC6D0" },
  { name: "Gray 500", token: "gray-500", value: "#98A2B3" },
  { name: "Gray 600", token: "gray-600", value: "#65758B" },
  { name: "Gray 700", token: "gray-700", value: "#5E6A7D" },
  { name: "Gray 800", token: "gray-800", value: "#4A5565" },
  { name: "Gray 900", token: "gray-900", value: "#3A4150" },
  { name: "Gray 950", token: "gray-950", value: "#2B2F3A" },
  { name: "Gray 1000", token: "gray-1000", value: "#1F232B" },
];

const primaryScale = [
  { name: "Primary 50", token: "primary-50", value: "#ECF0FF" },
  { name: "Primary 100", token: "primary-100", value: "#D7DDFD" },
  { name: "Primary 200", token: "primary-200", value: "#BDC3FF" },
  { name: "Primary 300", token: "primary-300", value: "#7887FD" },
  { name: "Primary 400", token: "primary-400", value: "#556AFB" },
  { name: "Primary 500", token: "primary-500", value: "#2B4DF7" },
  { name: "Primary 600", token: "primary-600", value: "#2644EB" },
  { name: "Primary 700", token: "primary-700", value: "#1738DE" },
  { name: "Primary 800", token: "primary-800", value: "#012BD3" },
  { name: "Primary 900", token: "primary-900", value: "#000AC3" },
];

const secondaryScale = [
  { name: "Secondary 50", token: "secondary-50", value: "#F5F9FF" },
  { name: "Secondary 100", token: "secondary-100", value: "#E5F1FF" },
  { name: "Secondary 200", token: "secondary-200", value: "#B3D5FF" },
  { name: "Secondary 300", token: "secondary-300", value: "#80BAFF" },
  { name: "Secondary 400", token: "secondary-400", value: "#57A3FF" },
  { name: "Secondary 500", token: "secondary-500", value: "#3390FF" },
  { name: "Secondary 600", token: "secondary-600", value: "#2885F3" },
  { name: "Secondary 700", token: "secondary-700", value: "#327CEB" },
  { name: "Secondary 800", token: "secondary-800", value: "#316AD8" },
  { name: "Secondary 900", token: "secondary-900", value: "#2D4AB9" },
];

const systemColors = [
  { name: "Error / Destructive", token: "error", value: "#D32F2F", usage: "오류, 삭제, 필수" },
  { name: "Warning", token: "warning", value: "#F9A825", usage: "주의, 경고" },
  { name: "Success", token: "success", value: "#4CAF50", usage: "성공, 완료" },
  { name: "Info", token: "info", value: "#0091EA", usage: "정보, 안내" },
];

const figmaPrimitiveColorExamples = [
  { figma: "Color/Primitive/Gray/50", code: "--gray-50", note: "중립 스케일" },
  { figma: "Color/Primitive/Gray/900", code: "--gray-900", note: "헤딩/강한 텍스트" },
  { figma: "Color/Primitive/Primary/500", code: "--primary-500", note: "브랜드 기준값" },
  { figma: "Color/Primitive/Primary/600", code: "--primary-600", note: "hover" },
  { figma: "Color/Primitive/Secondary/500", code: "--secondary-500", note: "포커스/링크 축" },
  { figma: "Color/Primitive/Semantic/Error", code: "--color-error", note: "오류/삭제 의미" },
  { figma: "Color/Primitive/Semantic/Warning", code: "--color-warning", note: "주의" },
  { figma: "Color/Primitive/Semantic/Success", code: "--color-success", note: "성공" },
  { figma: "Color/Primitive/Semantic/Info", code: "--color-info", note: "안내" },
] as const;

const figmaSemanticColorMappings = [
  { figma: "Color/Background/Default", code: "--color-bg-default", primitive: "gray-50", usage: "페이지 기본 배경" },
  { figma: "Color/Background/Surface", code: "--color-bg-surface", primitive: "gray-100", usage: "subtle surface / section bg" },
  { figma: "Color/Background/Card", code: "--color-bg-card", primitive: "gray-00", usage: "card / popover surface" },
  { figma: "Color/Border/Default", code: "--color-border-default", primitive: "gray-200", usage: "기본 보더/디바이더" },
  { figma: "Color/Border/Strong", code: "--color-border-strong", primitive: "gray-300", usage: "강조 보더" },
  { figma: "Color/Text/Muted", code: "--color-text-muted", primitive: "gray-600", usage: "보조 텍스트" },
  { figma: "Color/Text/Primary", code: "--color-text-primary", primitive: "gray-800", usage: "본문 기본" },
  { figma: "Color/Text/Heading", code: "--color-text-heading", primitive: "gray-900", usage: "헤딩/강조 텍스트" },
  { figma: "Color/Text/Disabled", code: "--color-text-disabled", primitive: "gray-400", usage: "비활성 텍스트/placeholder" },
  { figma: "Color/Link/Default", code: "--color-link-default", primitive: "secondary-600", usage: "기본 링크" },
  { figma: "Color/Link/Hover", code: "--color-link-hover", primitive: "secondary-700", usage: "링크 hover" },
  { figma: "Color/Focus/Ring", code: "--color-focus-ring", primitive: "primary-500", usage: "포커스 ring" },
  { figma: "Color/Action/Primary/Bg", code: "--color-action-primary-bg", primitive: "primary-500", usage: "Primary button bg" },
  { figma: "Color/Action/Primary/Bg-Hover", code: "--color-action-primary-bg-hover", primitive: "primary-600", usage: "Primary hover" },
  { figma: "Color/Action/Primary/Bg-Pressed", code: "--color-action-primary-bg-pressed", primitive: "primary-700", usage: "Primary pressed" },
  { figma: "Color/Action/Primary/Text", code: "--color-action-primary-fg", primitive: "on-primary-500", usage: "Primary on-color text" },
  { figma: "Color/Action/Secondary/Bg", code: "--color-action-secondary-bg", primitive: "primary-50", usage: "Secondary tonal bg" },
  { figma: "Color/Action/Secondary/Bg-Hover", code: "--color-action-secondary-bg-hover", primitive: "primary-100", usage: "Secondary tonal hover" },
  { figma: "Color/Action/Secondary/Bg-Pressed", code: "--color-action-secondary-bg-pressed", primitive: "primary-200", usage: "Secondary tonal pressed" },
  { figma: "Color/Action/Secondary/Text", code: "--color-action-secondary-fg", primitive: "primary-500", usage: "Secondary tonal text" },
  { figma: "Color/Action/Destructive/Bg", code: "--color-action-destructive-bg", primitive: "error", usage: "Destructive button bg" },
  { figma: "Color/Action/Destructive/Text", code: "--color-action-destructive-fg", primitive: "on-destructive-500", usage: "Destructive on-color text" },
  { figma: "Color/Status/Error/Text", code: "--color-status-error-text", primitive: "error", usage: "오류 텍스트/아이콘" },
  { figma: "Color/Status/Error/Border", code: "--color-status-error-border", primitive: "error", usage: "오류 보더" },
  { figma: "Color/Status/Error/Bg-Subtle", code: "--color-status-error-bg-subtle", primitive: "error-10", usage: "연한 오류 배경" },
  { figma: "Color/Status/Success/Bg-Subtle", code: "--color-status-success-bg-subtle", primitive: "success-10", usage: "성공 상태 배경" },
  { figma: "Color/Status/Warning/Bg-Subtle", code: "--color-status-warning-bg-subtle", primitive: "warning-10", usage: "경고 상태 배경" },
  { figma: "Color/Status/Info/Bg-Subtle", code: "--color-status-info-bg-subtle", primitive: "info-10", usage: "안내 상태 배경" },
] as const;

function readTokenValues(tokens: string[]) {
  const styles = getComputedStyle(document.documentElement);
  const values: TokenValueMap = {};

  tokens.forEach((token) => {
    values[token] = styles.getPropertyValue(token).trim();
  });

  return values;
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          {title}
        </h2>
        {description ? (
          <p className="text-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function UsageCallout({ items }: { items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-[color:var(--gray-50)] p-6">
      <div className="text-caption font-semibold uppercase tracking-wide text-[color:var(--gray-500)]">
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

function TokenTable({
  tokens,
  values,
}: {
  tokens: string[];
  values: TokenValueMap;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-[120px] text-right">Preview</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => {
          const value = values[token];
          const isSet = Boolean(value);
          return (
            <TableRow key={token}>
              <TableCell className="font-mono text-caption">{token}</TableCell>
              <TableCell className="text-caption text-muted-foreground">
                {isSet ? value : "(not set)"}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className="inline-block h-6 w-6 rounded-md border border-border"
                  style={{ backgroundColor: isSet ? value : "transparent" }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function ColorsPage() {
  const tokens = useMemo(
    () => [
      ...tokenGroups.surfaces,
      ...tokenGroups.borders,
      ...tokenGroups.brand,
      ...tokenGroups.semantic,
    ],
    []
  );
  const [values, setValues] = useState<TokenValueMap>({});

  useEffect(() => {
    setValues(readTokenValues(tokens));
  }, [tokens]);

  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">
          색상
        </h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          표면, 브랜드, 상태 표현을 위한 컬러 토큰 체계입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Neutral Gray System
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>그레이 스케일</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[120px] text-right">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grayScale.map((row) => (
                  <TableRow key={row.token}>
                    <TableCell className="text-body-sm font-semibold">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-caption text-muted-foreground">
                      {row.token}
                    </TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className="inline-block h-6 w-6 rounded-md border border-border"
                        style={{ backgroundColor: row.value }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>사용 규칙</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li>페이지 배경: gray-50 / gray-100</li>
              <li>보더/디바이더: gray-200 / gray-300</li>
              <li>비활성/플레이스홀더: gray-400 / gray-500</li>
              <li>보조 텍스트: gray-600</li>
              <li>본문 텍스트: gray-700 / gray-800</li>
              <li>헤딩: gray-900 / gray-950</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          Figma Color Variables Naming (권장)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>구조 원칙</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li><strong>Primitive Color</strong>와 <strong>Semantic Color</strong>를 분리합니다.</li>
              <li>Primitive Color는 색 자체(Gray/Primary/Secondary/Semantic), Semantic Color는 UI 의미(Background/Text/Action 등)입니다.</li>
              <li>Figma 화면 작업에서는 Semantic Color를 우선 사용하고, 상세 조정/확장은 Primitive Color를 참조합니다.</li>
            </ul>
            <div className="rounded-lg border border-border bg-[color:var(--gray-00)] p-4">
              <div className="text-caption font-semibold uppercase tracking-wide text-[color:var(--gray-500)]">
                Layer Mapping Example
              </div>
              <pre className="mt-3 whitespace-pre-wrap text-body-sm text-[color:var(--gray-800)]">
{`Primitive Color (Gray/900)
        ↓
Semantic Color (Color/Text/Heading)
        ↓
Component (Page Title text color)`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primitive Color 예시 (Figma → Code)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Figma Variable</TableHead>
                  <TableHead>Code Token</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {figmaPrimitiveColorExamples.map((row) => (
                  <TableRow key={row.figma}>
                    <TableCell className="font-mono text-caption">{row.figma}</TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.code}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Semantic Color 예시 (Figma → Code)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-body-sm text-muted-foreground">
              아래 표는 이번 프로젝트에서 우선 쓰는 1차 세트입니다. 먼저 이 세트만 만들어도
              컴포넌트/화면 디테일 작업을 시작할 수 있습니다.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Figma Variable</TableHead>
                  <TableHead>Code Alias</TableHead>
                  <TableHead>Primitive Source</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {figmaSemanticColorMappings.map((row) => (
                  <TableRow key={row.figma}>
                    <TableCell className="font-mono text-caption">{row.figma}</TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.code}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {row.primitive}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {row.usage}
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
          Brand Colors
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Primary (Brand Blue)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[120px] text-right">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {primaryScale.map((row) => (
                  <TableRow key={row.token}>
                    <TableCell className="text-body-sm font-semibold">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-caption text-muted-foreground">
                      {row.token}
                    </TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className="inline-block h-6 w-6 rounded-md border border-border"
                        style={{ backgroundColor: row.value }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Secondary (Sub Blue)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[120px] text-right">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {secondaryScale.map((row) => (
                  <TableRow key={row.token}>
                    <TableCell className="text-body-sm font-semibold">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-caption text-muted-foreground">
                      {row.token}
                    </TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className="inline-block h-6 w-6 rounded-md border border-border"
                        style={{ backgroundColor: row.value }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usage Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li>Primary는 메인 액션과 브랜드 강조에 사용합니다.</li>
              <li>Secondary는 링크와 정보 상태에 사용합니다.</li>
              <li>포커스 링은 Primary 계열 semantic token(`ring`)을 사용합니다.</li>
              <li>Secondary 버튼은 Secondary scale이 아니라 Primary tint 기반 tonal 버튼을 사용합니다.</li>
            </ul>
            <div className="mt-4">
              <CodeSnippet
                title="Tailwind 예시"
                code={`<button className="bg-primary-500 text-white hover:bg-primary-600">Primary CTA</button>
<a className="text-secondary-600 hover:text-secondary-700">Secondary Link</a>
<div className="focus-visible:ring-2 focus-visible:ring-ring" />`}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          System Colors (Semantic)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>정의</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[120px] text-right">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemColors.map((row) => (
                  <TableRow key={row.token}>
                    <TableCell className="text-body-sm font-semibold">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-caption text-muted-foreground">
                      {row.token}
                    </TableCell>
                    <TableCell className="text-body-sm text-muted-foreground">
                      {row.usage}
                    </TableCell>
                    <TableCell className="font-mono text-caption text-muted-foreground">
                      {row.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className="inline-block h-6 w-6 rounded-md border border-border"
                        style={{ backgroundColor: row.value }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>사용 규칙</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3 pl-5 text-body-sm text-[color:var(--gray-700)]">
              <li>System Color는 배경 전체를 채우는 용도로 사용하지 않습니다.</li>
              <li>사용 범위: 텍스트, 아이콘, 좌측 보더/악센트, 소프트 배경(8~12%).</li>
              <li>Primary/Secondary 일반 버튼 색으로 직접 확장하지 않습니다.</li>
              <li>`destructive` Button variant처럼 semantic 의미가 있는 컴포넌트는 이 토큰을 참조해 구현합니다.</li>
              <li>Red는 destructive/error에서만 사용합니다.</li>
              <li>Yellow는 행동을 막지 않는 경고에만 사용합니다.</li>
              <li>컬러 배경 위 텍스트는 white 또는 gray-900만 사용합니다.</li>
              <li>색상만으로 의미를 전달하지 않습니다(텍스트 병기).</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Component 예시</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="rounded-md bg-error-10 px-4 py-3 text-error">
                Error Alert: bg-error-10 + text-error
              </div>
              <div className="rounded-md bg-success-10 px-4 py-3 text-success">
                Success Toast: bg-success-10 + text-success
              </div>
              <div className="rounded-md bg-warning-10 px-4 py-3 text-warning">
                Warning Banner: bg-warning-10 + text-warning
              </div>
              <div className="text-info">
                Info Message: text-info
              </div>
            </div>
            <CodeSnippet
              title="Tailwind 예시"
              code={`<div className=\"bg-error-10 text-error\">Error Alert</div>
<div className=\"bg-success-10 text-success\">Success Toast</div>
<div className=\"bg-warning-10 text-warning\">Warning Banner</div>
<div className=\"text-info\">Info Message</div>`}
            />
          </CardContent>
        </Card>
      </section>

      <div className="not-prose">
      <div className="not-prose">
        <Card>
        <CardHeader>
          <CardTitle>색상 사용 원칙</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-3 pl-5">
            <li>기본 표면은 중립색을 유지하고, 배경에 브랜드 컬러를 쓰지 않습니다.</li>
            <li>foreground와 표면을 항상 짝지어 대비를 확보합니다.</li>
            <li>브랜드 컬러는 CTA와 강조에만 사용합니다.</li>
            <li>상태색은 상태가 있을 때만 사용합니다.</li>
          </ul>
        </CardContent>
        </Card>
      </div>
      </div>

      <Section
        title="표면 & 텍스트"
        description="페이지와 컨테이너 표면에 쓰는 기본 조합입니다."
      >
        <div className="not-prose space-y-6">
          <UsageCallout
          items={[
            "페이지 배경에는 background/foreground를 사용합니다.",
            "카드/팝오버에는 card, popover 토큰을 사용합니다.",
            "표면 토큰과 대응하는 foreground를 항상 함께 사용합니다.",
          ]}
          />
          <TokenTable tokens={[...tokenGroups.surfaces]} values={values} />
          <CodeSnippet
            title="예시"
            code={`<div className="bg-background text-foreground">
  <div className="rounded-lg bg-card text-card-foreground">Card</div>
  <div className="rounded-lg bg-popover text-popover-foreground">Popover</div>
</div>`}
          />
        </div>
      </Section>

      <div className="not-prose">
        <Separator />
      </div>
      <Section
        title="보더 & 포커스"
        description="구분선, 입력 컨트롤, 포커스 표시를 위한 토큰입니다."
      >
        <div className="not-prose space-y-6">
          <UsageCallout
          items={[
            "border는 구분선과 약한 외곽선에 사용합니다.",
            "input은 입력 컨트롤 테두리에 사용합니다.",
            "ring은 포커스 전용이며 상시 표시하지 않습니다.",
          ]}
          />
          <TokenTable tokens={[...tokenGroups.borders]} values={values} />
          <CodeSnippet
            title="예시"
            code={`<div className="rounded-lg border border-border p-4">
  <input className="w-full rounded-md border border-input px-3 py-2" />
  <button className="mt-3 focus-visible:ring-2 focus-visible:ring-ring">
    포커스 확인
  </button>
</div>`}
          />
        </div>
      </Section>

      <div className="not-prose">
        <Separator />
      </div>
      <Section
        title="브랜드"
        description="브랜드 표현을 위한 primary 토큰입니다."
      >
        <div className="not-prose space-y-6">
          <UsageCallout
          items={[
            "브랜드 컬러는 토큰 중심으로 관리하고 컴포넌트는 이를 참조합니다.",
            "브랜드 컬러는 Primary 1개만 사용합니다.",
            "Primary 기본값은 #2B4DF7 입니다.",
            "Hover/Active는 primary/90, primary/80처럼 불투명도로 처리합니다.",
            "Secondary/Accent는 레거시 토큰으로 신규 사용을 중단합니다.",
          ]}
          />
          <TokenTable tokens={[...tokenGroups.brand]} values={values} />
          <CodeSnippet
            title="토큰 참조 예시"
            code={`<button className="bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
  Primary Action
</button>`}
          />
        </div>
      </Section>

      <div className="not-prose">
        <Separator />
      </div>
      <Section
        title="상태(semantic)"
        description="중요한 피드백이나 파괴적 행동에만 사용하는 semantic token입니다."
      >
        <div className="not-prose space-y-6">
          <UsageCallout
          items={[
            "Destructive는 위험/삭제/돌이킬 수 없는 액션에만 사용합니다.",
            "상태색을 중립 UI 장식에 사용하지 않습니다.",
            "컴포넌트 구현(Button destructive variant 등)은 semantic token을 참조해 일관성을 유지합니다.",
            "Button 상세 상태/variant 예시는 Components > Button 문서에서 관리합니다.",
          ]}
          />
          <TokenTable tokens={[...tokenGroups.semantic]} values={values} />
          <CodeSnippet
            title="토큰 참조 예시 (Button destructive variant)"
            code={`<button className="bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)]">
  삭제
</button>`}
          />
        </div>
      </Section>
    </div>
  );
}
