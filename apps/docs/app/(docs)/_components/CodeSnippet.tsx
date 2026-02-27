"use client";

import { Block } from "@/components/docs/block";
import { showToast } from "@/lib/toast";

type CodeSnippetProps = {
  title?: string;
  code: string;
  copyable?: boolean;
};

export default function CodeSnippet({
  title,
  code,
  copyable = false,
}: CodeSnippetProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("코드가 복사되었습니다.");
    } catch {
      showToast("복사에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-2">
      {title ? (
        <div className="text-caption uppercase tracking-wide text-[color:var(--gray-500)]">
          {title}
        </div>
      ) : null}
      <Block className="max-w-full p-0">
        <div className="relative min-w-0 max-w-full overflow-x-auto">
          {copyable ? (
            <button
              className="absolute right-3 top-3 rounded-md bg-[color:var(--gray-00)] px-2 py-1 text-caption text-muted-foreground transition hover:bg-[color:var(--gray-50)]"
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
          ) : null}
          <pre className="max-w-full p-4 font-mono text-caption text-[color:var(--gray-700)]">
            <code>{code}</code>
          </pre>
        </div>
      </Block>
    </div>
  );
}
