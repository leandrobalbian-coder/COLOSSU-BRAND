/**
 * sync-figma-tokens
 *
 * Re-emits the CSS variables in `src/styles/tokens.css` and the markdown in
 * `docs/color-tokens.md` from the TypeScript source of truth in `src/tokens/*`.
 *
 * In Sprint 6 this will be wired up to read live values from the Figma MCP server
 * via the official MCP client (`@modelcontextprotocol/sdk`); for now the TS files
 * ARE the source of truth (extracted by hand from BRANDING-COLOSSU in Sprint 2)
 * and this script generates everything downstream from them.
 *
 * Run: `pnpm sync-tokens`
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { primitives, radius, shadow } from "../src/tokens/primitives.ts";
import { semantic } from "../src/tokens/semantic.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CSS_OUT = join(ROOT, "src/styles/tokens.css");
const DOCS_OUT = join(ROOT, "docs/color-tokens.md");

type ColorScale = Record<string | number, string>;

function isScale(v: unknown): v is ColorScale {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function kebab(s: string) {
  return s
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/([a-z])(\d)/g, "$1-$2");
}

function emitPrimitivesCss(): string {
  const lines: string[] = ["  /* === Primitives === */"];
  for (const [hue, value] of Object.entries(primitives)) {
    if (typeof value === "string") {
      lines.push(`  --lad-${kebab(hue)}: ${value};`);
    } else if (isScale(value)) {
      for (const [step, hex] of Object.entries(value)) {
        lines.push(`  --lad-${kebab(hue)}-${step}: ${hex};`);
      }
    }
  }
  return lines.join("\n");
}

function emitSemanticCss(mode: keyof typeof semantic): string {
  const map = semantic[mode];
  return Object.entries(map)
    .map(([key, hex]) => `  --${kebab(key)}: ${hex};`)
    .join("\n");
}

function emitTokensCss(): string {
  return `/* AUTO-GENERATED — do not edit. Run \`pnpm sync-tokens\`. */
/* Source of truth: Figma file BRANDING-COLOSSU (5xtvRE2XDDmTcuMZ7gz6iE). */

:root {
${emitPrimitivesCss()}

  --radius: ${radius.lg};
  --lad-shadow-sm: ${shadow.sm};
  --lad-shadow-md: ${shadow.md};
  --lad-shadow-lg: ${shadow.lg};
  --lad-shadow-accent: ${shadow.accent};

  /* === Semantic — light (Reports) === */
${emitSemanticCss("light")}
}

/* === Semantic — dark (Platform) === */
.dark {
${emitSemanticCss("dark")}
}
`;
}

function emitColorMarkdown(): string {
  const sections: string[] = [
    "# Color tokens",
    "",
    "Source: [Figma — BRANDING-COLOSSU](https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU).",
    "",
    "Three layers. A component never references a primitive directly — it consumes a semantic token, which is themed at runtime via `:root` and `.dark`.",
    "",
    "## Primitives",
    "",
    "| Token | Value |",
    "| --- | --- |",
  ];
  for (const [hue, value] of Object.entries(primitives)) {
    if (typeof value === "string") {
      sections.push(`| \`--lad-${kebab(hue)}\` | \`${value}\` |`);
    } else if (isScale(value)) {
      for (const [step, hex] of Object.entries(value)) {
        sections.push(`| \`--lad-${kebab(hue)}-${step}\` | \`${hex}\` |`);
      }
    }
  }

  for (const mode of ["light", "dark"] as const) {
    sections.push("");
    sections.push(`## Semantic — ${mode === "light" ? "Light (Reports)" : "Dark (Platform UI)"}`);
    sections.push("");
    sections.push("| Token | Value |");
    sections.push("| --- | --- |");
    for (const [key, hex] of Object.entries(semantic[mode])) {
      sections.push(`| \`--${kebab(key)}\` | \`${hex}\` |`);
    }
  }
  return sections.join("\n") + "\n";
}

function main() {
  mkdirSync(dirname(CSS_OUT), { recursive: true });
  mkdirSync(dirname(DOCS_OUT), { recursive: true });
  writeFileSync(CSS_OUT, emitTokensCss());
  writeFileSync(DOCS_OUT, emitColorMarkdown());
  console.log(`✓ wrote ${CSS_OUT}`);
  console.log(`✓ wrote ${DOCS_OUT}`);
}

main();
