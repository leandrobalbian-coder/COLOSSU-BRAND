// Raw palette extracted from Figma — BRANDING-COLOSSU (5xtvRE2XDDmTcuMZ7gz6iE).
// Source frames: 30:1461 "ColorSystem · Paleta Dual-Tone", 35:3239 "Arquitectura de Color: Sistema Híbrido".
//
// Layer 1: primitives — color/shape values with no meaning.
// Components should NEVER reference these directly; consume them through `semantic.ts`.

export const primitives = {
  // === Brand ===
  // Deep Navy is the institutional base. Charcoal is the structural surface that gives
  // depth without competing with content. Growth Green is the single accent that signals
  // action, success and metrics.
  navy: {
    900: "#0B1F33", // Deep Navy — brand base
    800: "#1F2933", // Charcoal — UI surface
  },
  green: {
    50: "#F0FDF4",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A", // Growth Green — brand accent
    700: "#15803D",
    800: "#166534",
  },

  // === Neutral scale (Tailwind slate) ===
  // The brand book uses the Tailwind slate ramp for text hierarchy and surfaces in light mode.
  slate: {
    50: "#F8FAFC",
    100: "#F1F5F9", // Slate Grey — surface for Reports / light mode
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8", // typography Secondary (subtítulos)
    500: "#64748B",
    600: "#475569", // typography Tertiary (metadata)
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  // === Status ===
  red: {
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    900: "#7F1D1D",
  },
  amber: {
    500: "#F59E0B",
    600: "#D97706",
  },

  // === Pure ===
  white: "#FFFFFF",
  black: "#000000",
} as const;

export type Primitives = typeof primitives;

// === Typography primitives ===
export const fontFamily = {
  sans: "var(--font-sans)", // Geist Sans
  mono: "var(--font-mono)", // Geist Mono
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Scale observed across the brand book (hero down to caption).
export const fontSize = {
  hero: "3.875rem", // 62px — h1 hero ("Paleta Dual-Tone")
  display: "3.5rem", // 56px — chapter title
  h1: "2.5rem", // 40px — card hero ("Deep Navy")
  h2: "2rem", // 32px
  h3: "1.5rem", // 24px
  h4: "1.25rem", // 20px
  bodyLg: "1.125rem", // 18px — lead paragraph
  body: "1rem", // 16px
  bodySm: "0.875rem", // 14px
  caption: "0.75rem", // 12px — mono uppercase labels
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const letterSpacing = {
  tighter: "-0.02em",
  tight: "-0.01em",
  normal: "0",
  wide: "0.05em",
  wider: "0.2em", // mono uppercase eyebrow labels
} as const;

// === Space (4px base, observed gaps & padding in the brand book) ===
export const space = {
  0: "0",
  1: "0.25rem", // 4
  2: "0.5rem", // 8
  3: "0.75rem", // 12
  4: "1rem", // 16
  5: "1.25rem", // 20
  6: "1.5rem", // 24
  8: "2rem", // 32
  10: "2.5rem", // 40
  12: "3rem", // 48
  16: "4rem", // 64
} as const;

// === Radius (observed on the canvas) ===
export const radius = {
  none: "0",
  sm: "0.25rem", // 4 — small chips/badges
  md: "0.5rem", // 8 — secondary surfaces
  lg: "0.625rem", // 10 — card / container default
  xl: "0.875rem", // 14
  full: "9999px", // pill
} as const;

// === Shadow (observed: card lift, accent glow, inset highlights) ===
export const shadow = {
  sm: "0 2px 6px 0 rgba(0,0,0,0.20)",
  md: "0 4px 16px 0 rgba(0,0,0,0.20)",
  lg: "0 8px 24px 0 rgba(0,0,0,0.25)",
  accent: "0 8px 24px 0 rgba(22,163,74,0.25)", // Growth Green glow on primary CTAs
  insetTop: "inset 0 2px 8px 0 rgba(0,0,0,0.30)",
} as const;
