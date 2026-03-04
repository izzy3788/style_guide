import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DOCS_APP_DIR = path.resolve("app", "(docs)");
const PAGE_FILE_NAME = "page.tsx";

const REQUIRED_RULES = [
  {
    label: "page spacing wrapper (`space-y-12`)",
    test: (source) => /space-y-12/.test(source),
  },
  {
    label: "header wrapper (`<header className=\"not-prose\"`)",
    test: (source) => /<header\s+className=["'`]not-prose["'`]/.test(source),
  },
  {
    label: "page title style (`text-title-lg`)",
    test: (source) => /text-title-lg/.test(source),
  },
  {
    label: "page description style (`mt-2 text-body-sm text-muted-foreground`)",
    test: (source) =>
      /mt-2\s+text-body-sm\s+text-muted-foreground/.test(source) ||
      /text-body-sm\s+text-muted-foreground\s+mt-2/.test(source),
  },
  {
    label: "header divider (`mt-6 mb-10 border-b border-border`)",
    test: (source) => /mt-6\s+mb-10\s+border-b\s+border-border/.test(source),
  },
];

const FORBIDDEN_RULES = [
  {
    label: "bordered wrapper directly around `<Table>`",
    test: (source) =>
      /<div[^>]*className=["'`][^"'`]*border[^"'`]*["'`][^>]*>\s*<Table\b/.test(source),
  },
];

async function collectPageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await collectPageFiles(fullPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile() && entry.name === PAGE_FILE_NAME) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const pageFiles = await collectPageFiles(DOCS_APP_DIR);
  const failures = [];

  for (const filePath of pageFiles) {
    const source = await readFile(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    const missingRules = REQUIRED_RULES.filter((rule) => !rule.test(source));
    const forbiddenRules = FORBIDDEN_RULES.filter((rule) => rule.test(source));

    if (missingRules.length > 0 || forbiddenRules.length > 0) {
      failures.push({
        file: relativePath,
        missingRules: missingRules.map((rule) => rule.label),
        forbiddenRules: forbiddenRules.map((rule) => rule.label),
      });
    }
  }

  if (failures.length === 0) {
    console.log(`Style guide check passed for ${pageFiles.length} docs pages.`);
    return;
  }

  console.error("Style guide check failed. Rule violations:\n");
  for (const failure of failures) {
    console.error(`- ${failure.file}`);
    for (const missingRule of failure.missingRules) {
      console.error(`  - ${missingRule}`);
    }
    for (const forbiddenRule of failure.forbiddenRules) {
      console.error(`  - forbidden: ${forbiddenRule}`);
    }
  }

  process.exitCode = 1;
}

main().catch((error) => {
  console.error("Failed to run style guide check:", error);
  process.exit(1);
});
