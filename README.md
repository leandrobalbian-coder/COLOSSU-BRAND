# Ladrillo — Design System for Colossu

Ladrillo is the design system that gives [Colossu](https://spot2.mx) its
visual personality. It is a **token-only** layer on top of
[shadcn/ui](https://ui.shadcn.com): we do not fork or replace components — we
only define color, typography, spacing, radius and shadow tokens and wire them
through CSS variables.

- **Source of truth for design:** [Figma — BRANDING-COLOSSU](https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU)
- **Source of truth for code:** this repository
- **Docs site:** https://ladrillo.vercel.app *(deploys in Sprint 6)*

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 (CSS-first config)
- shadcn/ui — `base-nova` preset
- pnpm 9

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm sync-tokens  # regenerate tokens from Figma (Sprint 2+)
```

## Token hierarchy

Three strict layers — a component **never** references a primitive directly.

```
Primitives  →  Semantic        →  Component
grey.600    →  semantic.text   →  button.primary.bg
blue.600    →  semantic.primary
```

Files:

| Layer      | TypeScript                  | CSS variables prefix      |
| ---------- | --------------------------- | ------------------------- |
| Primitives | `src/tokens/primitives.ts`  | `--color-<hue>-<step>`    |
| Semantic   | `src/tokens/semantic.ts`    | `--color-<role>`          |
| Component  | `src/tokens/component.ts`   | `--<component>-<part>`    |

The semantic layer also maps onto shadcn's CSS variables (`--primary`,
`--destructive`, `--muted`, etc.), which is what gives shadcn components our
personality without touching their JSX.

## Roadmap (sprints)

| Sprint | Scope                                                          | Status |
| ------ | -------------------------------------------------------------- | ------ |
| 1      | Setup: scaffold, folder structure, repo wiring                 | ✅      |
| 2      | Extract Figma variables → 3-layer tokens + `tokens.css`        | ⏳      |
| 3      | Docs layout (sidebar) + Foundations pages (colors, typography) | ⏳      |
| 4      | Token pages + Components pages (live shadcn previews)          | ⏳      |
| 5      | Resources: for-devs, for-designers, `ai-context.md`            | ⏳      |
| 6      | shadcn registry + MCP + Vercel deploy + scheduled sync         | ⏳      |

## Repo layout

```
src/
  app/colossu/         # docs site routes
  components/ui/       # shadcn/ui (do not modify)
  components/docs/     # docs-site chrome (Sprint 3)
  components/examples/ # live component examples (Sprint 4)
  tokens/              # primitives.ts, semantic.ts, component.ts
  styles/tokens.css    # generated CSS variables
  lib/token-utils.ts
scripts/sync-figma-tokens.ts  # Figma → tokens (Sprint 2)
docs/                  # downloadable markdown for AI context
registry/registry.json # shadcn registry for MCP (Sprint 6)
reference/             # historical material (ds-raw, prior docs)
```

## Rules

1. **Do not modify shadcn components.** Only style via CSS variables.
2. **Strict 3-layer hierarchy.** Components never reference primitives.
3. **Tokens-first.** Add the token, then consume it.
4. **Every `.md` is downloadable.** AI tools should be able to ingest the system.
5. **The repo is the onboarding.** A new dev should be productive in 10 min.

## License

Internal — Spot2.
