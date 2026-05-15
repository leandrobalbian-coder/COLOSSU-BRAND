// Layer 3: component tokens — where in the UI each semantic value is consumed.
//
// Components NEVER reference primitives directly: they reference semantic tokens, and
// component tokens may compose those semantics into a per-component contract.
//
// This layer is intentionally small in Sprint 2 — most shadcn components consume the
// semantic CSS variables (`--primary`, `--card`, etc.) directly and we don't need a
// component-level alias for them. Add entries here only when a component needs a
// dedicated token (e.g. a custom CTA gradient, a stat-card hover state).

import { semantic } from "./semantic";

// Component-level tokens read the *active mode* via CSS variables, not by picking a
// branch of `semantic` at build time. Reference the semantic role name; the CSS layer
// resolves it at runtime.
const ref = (role: keyof typeof semantic.light) => `var(--${kebab(role)})`;

function kebab(camel: string) {
  return camel
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/([a-z])(\d)/g, "$1-$2");
}

export const component = {
  button: {
    primary: {
      bg: ref("primary"),
      bgHover: ref("primaryHover"),
      fg: ref("primaryForeground"),
      ring: ref("ring"),
    },
    secondary: {
      bg: ref("secondary"),
      fg: ref("secondaryForeground"),
    },
    destructive: {
      bg: ref("destructive"),
      fg: ref("destructiveForeground"),
    },
  },
  card: {
    bg: ref("card"),
    fg: ref("foreground"),
    border: ref("border"),
  },
  input: {
    bg: ref("input"),
    fg: ref("foreground"),
    placeholder: ref("foregroundMuted"),
    border: ref("border"),
    ring: ref("ring"),
  },
  badge: {
    default: { bg: ref("muted"), fg: ref("foreground") },
    primary: { bg: ref("primary"), fg: ref("primaryForeground") },
    success: { bg: ref("success"), fg: ref("successForeground") },
    warning: { bg: ref("warning"), fg: ref("warningForeground") },
    destructive: { bg: ref("destructive"), fg: ref("destructiveForeground") },
  },
} as const;

export type ComponentTokens = typeof component;
