// Helpers for working with design tokens at runtime.
// Implementation lands in Sprint 2.

export function cssVar(name: string): string {
  return `var(--${name})`;
}
