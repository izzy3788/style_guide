import CodeSnippet from "../../_components/CodeSnippet";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const badgeSizes = [
  {
    label: "Small",
    size: "sm" as const,
    padding: "좌우 8px",
    text: "12px",
    usage: "좁은 공간",
  },
  {
    label: "Medium",
    size: "md" as const,
    padding: "좌우 10px",
    text: "12px",
    usage: "기본",
  },
  {
    label: "Large",
    size: "lg" as const,
    padding: "좌우 12px",
    text: "14px",
    usage: "강조",
  },
];

const badgeCode = `import { Badge } from "@/components/ui/badge";

export function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">미리보기</Badge>
      <Badge>미리보기</Badge>
      <Badge size="lg">미리보기</Badge>
    </div>
  );
}`;

export default function BadgeDocsPage() {
  return (
    <div className="space-y-12">
      <header className="not-prose">
        <h1 className="text-title-lg text-[color:var(--gray-900)]">
          Badge
        </h1>
        <p className="mt-2 text-body-sm text-muted-foreground">
          상태, 카테고리, 수량 등 짧은 정보를 강조하는 컴포넌트입니다.
        </p>
        <div className="mt-6 mb-10 border-b border-border" />
      </header>

      <section className="not-prose space-y-6">
        <h2 className="text-title-md text-[color:var(--gray-900)]">
          크기
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Padding</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Usage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {badgeSizes.map((item) => (
                <TableRow key={item.size}>
                <TableCell className="text-body-sm text-[color:var(--gray-900)]">
                  {item.label}
                </TableCell>
                <TableCell>
                  <Badge size={item.size}>미리보기</Badge>
                </TableCell>
                <TableCell>{item.padding}</TableCell>
                <TableCell>{item.text}</TableCell>
                <TableCell>{item.usage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CodeSnippet title="사용 예시" code={badgeCode} copyable />
      </section>
    </div>
  );
}
