# Component usage

Ladrillo ships no UI components of its own — it ships the **CSS variables** that
[shadcn/ui](https://ui.shadcn.com) already consumes (`--background`,
`--primary`, `--card`, etc.). Importing the Ladrillo `tokens.css` is enough
to give every shadcn component Colossu's personality.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm sync-tokens  # regenerate tokens from src/tokens/*
```

## Wiring tokens into an existing app

1. Copy `src/styles/tokens.css` (or fetch the latest from
   `https://ladrillo.vercel.app/downloads/tokens.css` once Sprint 6 ships).
2. Import it from your root CSS file:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./tokens.css";   /* ← adds Ladrillo */
```

3. Make sure your `@theme inline` block maps Tailwind's color utilities to
   the shadcn names (`--color-primary: var(--primary)`, etc.). This is the
   default setup of `base-nova` and most current shadcn templates.
4. Set `class="dark"` on `<html>` for Platform mode, omit for Reports mode.

## Conventions

- **Strict three-layer hierarchy.** Primitive → Semantic → Component.
  A component never references `--lad-green-600` directly; it consumes
  `--primary` instead.
- **Tokens-first.** Add the token, then write the component that consumes it.
- **No hex literals.** Use Tailwind utilities (`bg-primary`,
  `text-foreground`) or `var(--name)` — never `#16A34A` inline.
- **Use Growth Green sparingly.** It is the brand accent. One per screen,
  reserved for the primary action / canonical metric.
- **Don't modify components in `src/components/ui/`.** They come from
  shadcn — re-running `npx shadcn@latest add` must not destroy local
  customizations.

## When you need a new token

1. Decide which layer it belongs to. If it's brand-level, it's a primitive.
   If it's a new role (e.g. `info`), it's a semantic. If it's a one-off
   component contract, it's a component-level token.
2. Add it to the matching file in `src/tokens/`.
3. Run `pnpm sync-tokens` to regenerate `tokens.css` and all docs.
4. Open a PR with the Figma link to the source.
