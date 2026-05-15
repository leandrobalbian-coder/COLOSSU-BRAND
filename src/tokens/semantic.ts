// Layer 2: semantic tokens — what each color means.
// Two modes:
//   • `light` → Reports / print. White base + Deep Navy text.
//   • `dark`  → Platform UI (the live Colossu app). Deep Navy base + Growth Green accent.
//
// Both modes share the same primary (Growth Green #16A34A) because it represents the brand
// regardless of surface.

import { primitives } from "./primitives";

const { navy, green, slate, red, amber, white, black } = primitives;

const light = {
  // Surfaces
  background: white,
  surface: slate[50],
  card: white,
  popover: white,

  // Text
  foreground: navy[900], // Deep Navy reads as near-black on white per the brand book
  foregroundMuted: slate[500],
  foregroundSubtle: slate[400],

  // Brand
  primary: green[600],
  primaryForeground: white,
  primaryHover: green[700],

  // Roles
  secondary: slate[100],
  secondaryForeground: navy[900],
  muted: slate[100],
  mutedForeground: slate[500],
  accent: slate[100],
  accentForeground: navy[900],

  // Borders & inputs
  border: slate[200],
  input: slate[200],
  ring: green[600],

  // Status
  destructive: red[600],
  destructiveForeground: white,
  success: green[600],
  successForeground: white,
  warning: amber[500],
  warningForeground: navy[900],

  // Sidebar (matches shadcn's --sidebar-* family)
  sidebar: white,
  sidebarForeground: navy[900],
  sidebarPrimary: green[600],
  sidebarPrimaryForeground: white,
  sidebarAccent: slate[100],
  sidebarAccentForeground: navy[900],
  sidebarBorder: slate[200],
  sidebarRing: green[600],

  // Chart palette (dashboard-first product)
  chart1: green[600],
  chart2: slate[400],
  chart3: slate[600],
  chart4: amber[500],
  chart5: red[600],
} as const;

const dark = {
  // Surfaces — Platform UI
  background: navy[900],
  surface: navy[800],
  card: navy[800],
  popover: navy[800],

  // Text
  foreground: white,
  foregroundMuted: slate[400],
  foregroundSubtle: slate[600],

  // Brand
  primary: green[600],
  primaryForeground: white,
  primaryHover: green[500],

  // Roles
  secondary: navy[800],
  secondaryForeground: white,
  muted: navy[800],
  mutedForeground: slate[400],
  accent: navy[800],
  accentForeground: white,

  // Borders & inputs (rgba whites in Figma — we materialize them as the surface color)
  border: slate[800],
  input: slate[800],
  ring: green[600],

  // Status
  destructive: red[700],
  destructiveForeground: white,
  success: green[500],
  successForeground: navy[900],
  warning: amber[500],
  warningForeground: navy[900],

  // Sidebar — Charcoal canvas per the brand book ("Sidebars, Bordes, Fondos Secundarios").
  sidebar: navy[800],
  sidebarForeground: white,
  sidebarPrimary: green[600],
  sidebarPrimaryForeground: white,
  sidebarAccent: slate[800],
  sidebarAccentForeground: white,
  sidebarBorder: slate[800],
  sidebarRing: green[600],

  // Chart palette
  chart1: green[500],
  chart2: slate[300],
  chart3: slate[500],
  chart4: amber[500],
  chart5: red[500],
} as const;

export const semantic = { light, dark } as const;

export type SemanticTokens = typeof light;
export type SemanticMode = keyof typeof semantic;

// Silence "unused" warnings for any primitives not directly referenced above —
// they exist for layer-3 component tokens and for the `tokens.css` generator.
void [navy, slate, green, red, amber, white, black];
