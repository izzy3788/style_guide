import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = path.resolve(".");
const SCAN_DIRS = [
  path.resolve("app"),
  path.resolve("components"),
];
const TARGET_EXTENSIONS = new Set([".ts", ".tsx"]);
const IGNORE_DIRS = new Set([".next", "node_modules"]);

const CONDITIONAL_TEXT_PATTERN = /\{[\s\S]{0,300}?\?[\s\S]{0,80}?["'`][^"'`]*?(중\.{0,3}|loading)[^"'`]*?["'`][\s\S]{0,80}?:[\s\S]{0,120}?["'`][^"'`]*?["'`][\s\S]{0,120}?\}/i;
const BUTTON_BLOCK_PATTERN = /<Button\b[\s\S]*?<\/Button>/g;
const TEMPLATE_LITERAL_PATTERN = /`[\s\S]*?`/g;

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

async function main() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    files.push(...(await collectFiles(dir)));
  }

  const failures = [];

  for (const filePath of files) {
    const source = await readFile(filePath, "utf8");
    const sourceWithoutTemplateLiterals = source.replace(
      TEMPLATE_LITERAL_PATTERN,
      (literal) => "`" + " ".repeat(Math.max(0, literal.length - 2)) + "`"
    );
    const matches = sourceWithoutTemplateLiterals.matchAll(BUTTON_BLOCK_PATTERN);

    for (const match of matches) {
      const block = match[0];
      const startIndex = match.index ?? 0;

      if (!CONDITIONAL_TEXT_PATTERN.test(block)) {
        continue;
      }

      failures.push({
        file: path.relative(ROOT_DIR, filePath),
        line: getLineNumber(source, startIndex),
      });
    }
  }

  if (failures.length === 0) {
    console.log("Button loading pattern check passed.");
    return;
  }

  console.error("Button loading pattern check failed.");
  console.error("Use `loading` prop and keep the original button label; do not swap to loading text with ternary inside <Button>.");
  console.error("");

  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line}`);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error("Failed to run button loading pattern check:", error);
  process.exit(1);
});
