# Ladrillo — Downloadable docs

Each file in this folder is the **markdown source** that backs a `/colossu/*`
page on the docs site and is exposed at `/downloads/<name>.md` so it can be
fed to AI tools (Claude, GPT, Cursor, v0) as context.

Files are emitted by `scripts/sync-figma-tokens.ts` — do not edit manually.

| File                  | Status   | Source                              |
| --------------------- | -------- | ----------------------------------- |
| color-tokens.md       | Sprint 2 | Figma variables → src/tokens        |
| typography-tokens.md  | Sprint 2 | Figma text styles                   |
| spacing-tokens.md     | Sprint 2 | Figma spacing scale                 |
| component-usage.md    | Sprint 4 | src/components/ui + examples        |
| ai-context.md         | Sprint 5 | All of the above, flattened for LLMs |
