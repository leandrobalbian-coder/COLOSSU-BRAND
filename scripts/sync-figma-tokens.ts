/**
 * sync-figma-tokens
 *
 * Re-emits the design-system artifacts from the TypeScript source of truth
 * in `src/tokens/*`:
 *   - src/styles/tokens.css           — CSS variables consumed by shadcn
 *   - docs/color-tokens.md            — color tokens reference
 *   - docs/typography-tokens.md       — typography tokens reference
 *   - docs/spacing-tokens.md          — spacing/radius/shadow reference
 *   - docs/component-usage.md         — quickstart for consuming tokens
 *   - docs/ai-context.md              — full design-system context for LLMs
 *   - public/downloads/*.md           — public mirror of each .md
 *
 * In Sprint 6 this will be wired up to read live values from the Figma MCP
 * server; for now the TS files ARE the source of truth (extracted by hand
 * from BRANDING-COLOSSU in Sprint 2) and this script generates everything
 * downstream from them.
 *
 * Run: `pnpm sync-tokens`
 */

import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  primitives,
  radius,
  shadow,
  space,
} from "../src/tokens/primitives.ts";
import { semantic } from "../src/tokens/semantic.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CSS_OUT = join(ROOT, "src/styles/tokens.css");
const DOCS_DIR = join(ROOT, "docs");
const PUBLIC_DIR = join(ROOT, "public/downloads");

const FIGMA_URL = "https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU";

type ColorScale = Record<string | number, string>;

function isScale(v: unknown): v is ColorScale {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function kebab(s: string) {
  return s
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/([a-z])(\d)/g, "$1-$2");
}

// ---------- tokens.css ----------

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
  return Object.entries(semantic[mode])
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

// ---------- markdown ----------

function colorTokensMd(): string {
  const lines: string[] = [
    "# Color tokens",
    "",
    `Source: [Figma — BRANDING-COLOSSU](${FIGMA_URL}).`,
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
      lines.push(`| \`--lad-${kebab(hue)}\` | \`${value}\` |`);
    } else if (isScale(value)) {
      for (const [step, hex] of Object.entries(value)) {
        lines.push(`| \`--lad-${kebab(hue)}-${step}\` | \`${hex}\` |`);
      }
    }
  }

  for (const mode of ["light", "dark"] as const) {
    lines.push("");
    lines.push(`## Semantic — ${mode === "light" ? "Light (Reports)" : "Dark (Platform UI)"}`);
    lines.push("");
    lines.push("| Token | Value |");
    lines.push("| --- | --- |");
    for (const [key, hex] of Object.entries(semantic[mode])) {
      lines.push(`| \`--${kebab(key)}\` | \`${hex}\` |`);
    }
  }
  return lines.join("\n") + "\n";
}

function typographyTokensMd(): string {
  const lines: string[] = [
    "# Typography tokens",
    "",
    `Source: [Figma — BRANDING-COLOSSU](${FIGMA_URL}).`,
    "",
    "Colossu uses **Geist** (sans) and **Geist Mono** as a single typographic system. Hierarchy comes from contrast of size, weight and color — never from mixing families.",
    "",
    "## Families",
    "",
    "| Token | Value | Usage |",
    "| --- | --- | --- |",
    `| \`fontFamily.sans\` | \`${fontFamily.sans}\` | Titles, UI, body text |`,
    `| \`fontFamily.mono\` | \`${fontFamily.mono}\` | Numbers, code, eyebrows, token names |`,
    "",
    "## Scale",
    "",
    "| Token | Value |",
    "| --- | --- |",
  ];
  for (const [key, value] of Object.entries(fontSize)) {
    lines.push(`| \`fontSize.${key}\` | \`${value}\` |`);
  }

  lines.push("");
  lines.push("## Weights");
  lines.push("");
  lines.push("| Token | Value |");
  lines.push("| --- | --- |");
  for (const [key, value] of Object.entries(fontWeight)) {
    lines.push(`| \`fontWeight.${key}\` | \`${value}\` |`);
  }

  lines.push("");
  lines.push("## Line height");
  lines.push("");
  lines.push("| Token | Value |");
  lines.push("| --- | --- |");
  for (const [key, value] of Object.entries(lineHeight)) {
    lines.push(`| \`lineHeight.${key}\` | \`${value}\` |`);
  }

  lines.push("");
  lines.push("## Letter spacing");
  lines.push("");
  lines.push("| Token | Value |");
  lines.push("| --- | --- |");
  for (const [key, value] of Object.entries(letterSpacing)) {
    lines.push(`| \`letterSpacing.${key}\` | \`${value}\` |`);
  }

  return lines.join("\n") + "\n";
}

function spacingTokensMd(): string {
  const lines: string[] = [
    "# Spacing, radius & shadows",
    "",
    `Source: [Figma — BRANDING-COLOSSU](${FIGMA_URL}).`,
    "",
    "## Spacing (4px base)",
    "",
    "| Token | Value |",
    "| --- | --- |",
  ];
  for (const [key, value] of Object.entries(space)) {
    lines.push(`| \`space.${key}\` | \`${value}\` |`);
  }

  lines.push("");
  lines.push("## Radius");
  lines.push("");
  lines.push("| Token | Value | Usage |");
  lines.push("| --- | --- | --- |");
  const radiusUsage: Record<string, string> = {
    none: "Tables, full-bleed dividers",
    sm: "Inline badges, chips, status pills",
    md: "Secondary surfaces, nested cards",
    lg: "Default card / container radius",
    xl: "Hero modules, marketing surfaces",
    full: "Avatars, dots, fully rounded pills",
  };
  for (const [key, value] of Object.entries(radius)) {
    lines.push(`| \`radius.${key}\` | \`${value}\` | ${radiusUsage[key] ?? ""} |`);
  }

  lines.push("");
  lines.push("## Shadows");
  lines.push("");
  lines.push("| Token | Value | Usage |");
  lines.push("| --- | --- | --- |");
  const shadowUsage: Record<string, string> = {
    sm: "Avatars, chips, floating dots",
    md: "Card default — on-canvas surfaces",
    lg: "Modals, popovers, dropdown menus",
    accent: "Primary CTAs only — Growth Green halo",
    insetTop: "Pressed/recessed surfaces, focused inputs",
  };
  for (const [key, value] of Object.entries(shadow)) {
    lines.push(`| \`shadow.${key}\` | \`${value}\` | ${shadowUsage[key] ?? ""} |`);
  }

  return lines.join("\n") + "\n";
}

function componentUsageMd(): string {
  return `# Component usage

Ladrillo ships no UI components of its own — it ships the **CSS variables** that
[shadcn/ui](https://ui.shadcn.com) already consumes (\`--background\`,
\`--primary\`, \`--card\`, etc.). Importing the Ladrillo \`tokens.css\` is enough
to give every shadcn component Colossu's personality.

## Quick start

\`\`\`bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm sync-tokens  # regenerate tokens from src/tokens/*
\`\`\`

## Wiring tokens into an existing app

1. Copy \`src/styles/tokens.css\` (or fetch the latest from
   \`https://ladrillo.vercel.app/downloads/tokens.css\` once Sprint 6 ships).
2. Import it from your root CSS file:

\`\`\`css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./tokens.css";   /* ← adds Ladrillo */
\`\`\`

3. Make sure your \`@theme inline\` block maps Tailwind's color utilities to
   the shadcn names (\`--color-primary: var(--primary)\`, etc.). This is the
   default setup of \`base-nova\` and most current shadcn templates.
4. Set \`class="dark"\` on \`<html>\` for Platform mode, omit for Reports mode.

## Conventions

- **Strict three-layer hierarchy.** Primitive → Semantic → Component.
  A component never references \`--lad-green-600\` directly; it consumes
  \`--primary\` instead.
- **Tokens-first.** Add the token, then write the component that consumes it.
- **No hex literals.** Use Tailwind utilities (\`bg-primary\`,
  \`text-foreground\`) or \`var(--name)\` — never \`#16A34A\` inline.
- **Use Growth Green sparingly.** It is the brand accent. One per screen,
  reserved for the primary action / canonical metric.
- **Don't modify components in \`src/components/ui/\`.** They come from
  shadcn — re-running \`npx shadcn@latest add\` must not destroy local
  customizations.

## When you need a new token

1. Decide which layer it belongs to. If it's brand-level, it's a primitive.
   If it's a new role (e.g. \`info\`), it's a semantic. If it's a one-off
   component contract, it's a component-level token.
2. Add it to the matching file in \`src/tokens/\`.
3. Run \`pnpm sync-tokens\` to regenerate \`tokens.css\` and all docs.
4. Open a PR with the Figma link to the source.
`;
}

function aiContextMd(): string {
  return `# Ladrillo Design System — AI Context

> This file is a flat, self-contained snapshot of the Colossu (Spot2) design
> system. Paste it as system prompt or attach it when asking an LLM (Claude,
> GPT, Cursor, v0) to generate interfaces consistent with Colossu.
>
> Source of truth: ${FIGMA_URL}

## About Colossu

Colossu is a Spot2 product. The brand is built around two ideas — **Security**
(Deep Navy) and **Growth** (Green) — and resolves into two interfaces:

- **Platform UI** — the live app. Dark mode. Deep Navy base, Charcoal surfaces,
  Growth Green accent. Built for prolonged use.
- **Reports** — printed and PDF reports. Light mode. White base, Slate
  surfaces, Deep Navy text, Growth Green accent.

Both modes share the **same semantic token names**, so any component built
against the tokens flips automatically by toggling \`class="dark"\` on \`<html>\`.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 (CSS-first config)
- shadcn/ui — \`base-nova\` preset
- Tokens delivered as CSS variables; the source of truth lives in
  \`src/tokens/*.ts\` and is mirrored into \`src/styles/tokens.css\`.

## Hard rules

1. **Never modify shadcn components.** Only style via CSS variables.
2. **Strict three-layer hierarchy.** Primitive → Semantic → Component.
   A component never references a primitive directly.
3. **Tokens-first.** Add the token, then write the component that consumes it.
4. **No hex literals in product code.** Use Tailwind utilities
   (\`bg-primary\`, \`text-foreground\`) or \`var(--name)\` — never \`#16A34A\`.
5. **Growth Green is scarce.** One per screen. Reserve it for the primary CTA
   or the canonical metric of the view.

## Brand palette

- **Deep Navy** \`#0B1F33\` — institutional base (security, authority)
- **Growth Green** \`#16A34A\` — brand accent (action, success, growth)
- **Charcoal** \`#1F2933\` — UI surface (sidebars, cards, secondary fills)

## Color tokens

${colorTokensMd().split("\n").slice(2).join("\n")}

## Typography

Colossu uses **Geist** (sans) and **Geist Mono**. The hierarchy is established
by contrast (size, weight, color) — never by mixing typeface families.

${typographyTokensMd().split("\n").slice(2).join("\n")}

## Spacing, radius & shadows

${spacingTokensMd().split("\n").slice(2).join("\n")}

## Component usage

${componentUsageMd().split("\n").slice(2).join("\n")}

## Example: a primary CTA card

\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function PremiumCard() {
  return (
    <Card
      className="border-primary/40"
      style={{ boxShadow: "var(--lad-shadow-accent)" }}
    >
      <CardHeader>
        <CardTitle>Activa tu cuenta premium</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Acceso a métricas avanzadas y reportes programados.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Activar ahora</Button>
      </CardFooter>
    </Card>
  );
}
\`\`\`

This component renders correctly in both Platform (dark) and Reports (light)
modes because every value resolves through a semantic CSS variable.
`;
}

// ---------- output ----------

function main() {
  mkdirSync(dirname(CSS_OUT), { recursive: true });
  mkdirSync(DOCS_DIR, { recursive: true });
  mkdirSync(PUBLIC_DIR, { recursive: true });

  // CSS
  writeFileSync(CSS_OUT, emitTokensCss());

  // Markdown
  const files: Array<[string, string]> = [
    ["color-tokens.md", colorTokensMd()],
    ["typography-tokens.md", typographyTokensMd()],
    ["spacing-tokens.md", spacingTokensMd()],
    ["component-usage.md", componentUsageMd()],
    ["ai-context.md", aiContextMd()],
  ];
  for (const [name, body] of files) {
    writeFileSync(join(DOCS_DIR, name), body);
  }

  // Public mirror — copies all .md from docs/ into public/downloads/ so the
  // docs site can offer one-click downloads.
  for (const f of readdirSync(DOCS_DIR)) {
    if (f.endsWith(".md") && f !== "README.md") {
      copyFileSync(join(DOCS_DIR, f), join(PUBLIC_DIR, f));
    }
  }

  // Also expose tokens.css for downstream apps that want to copy/paste the
  // variables into their own globals.
  copyFileSync(CSS_OUT, join(PUBLIC_DIR, "tokens.css"));

  console.log("✓ wrote src/styles/tokens.css");
  console.log("✓ wrote docs/{color,typography,spacing}-tokens.md");
  console.log("✓ wrote docs/component-usage.md");
  console.log("✓ wrote docs/ai-context.md");
  console.log("✓ mirrored to public/downloads/");
}

main();
