import { PageHeader } from "@/components/docs/page-header";
import { Badge } from "@/components/ui/badge";

type Entry = {
  sprint: number;
  title: string;
  date: string;
  highlights: string[];
  status: "done" | "in-progress" | "next";
};

const entries: Entry[] = [
  {
    sprint: 6,
    title: "Registry, MCP, deploy",
    date: "—",
    status: "next",
    highlights: [
      "shadcn registry + MCP server so v0 / Cursor / Claude Code can consume Ladrillo natively.",
      "Vercel deploy at ladrillo.vercel.app.",
      "GitHub Action to re-sync tokens from Figma on a weekly schedule.",
    ],
  },
  {
    sprint: 5,
    title: "Resources",
    date: "2026-05-15",
    status: "done",
    highlights: [
      "For developers page with quickstart, Tailwind/shadcn integration and conventions.",
      "For designers page with the Figma source-of-truth link and a contribution workflow.",
      "ai-context.md generated automatically — a single self-contained markdown for LLMs.",
      "DownloadButton wiring exposing every doc under /downloads/*.md.",
    ],
  },
  {
    sprint: 4,
    title: "Tokens pages + Components",
    date: "2026-05-15",
    status: "done",
    highlights: [
      "Three Tokens routes (Primitives / Semantic / Component) with click-to-copy.",
      "Four Components routes: Buttons, Inputs, Cards, Badges — shadcn live previews + snippets.",
      "Spacing, Radius and Shadows foundations rounded out.",
    ],
  },
  {
    sprint: 3,
    title: "Docs site layout + Foundations",
    date: "2026-05-15",
    status: "done",
    highlights: [
      "Sticky header with Figma + GitHub links and a theme toggle (Platform / Reports).",
      "Sidebar with the full route map and active-link highlighting.",
      "Colors page with brand triad, primitives, live semantic block and the three-layer hierarchy strip.",
      "Typography page rendering the Geist scale with real fontSize / fontWeight / letterSpacing tokens.",
    ],
  },
  {
    sprint: 2,
    title: "Tokens extracted from Figma",
    date: "2026-05-15",
    status: "done",
    highlights: [
      "Three-layer token system grounded in the BRANDING-COLOSSU brand book.",
      "Deep Navy #0B1F33, Growth Green #16A34A, Charcoal #1F2933 + supporting palette.",
      "Auto-generated tokens.css with full :root + .dark wiring for shadcn.",
      "sync-figma-tokens script that re-emits CSS and docs from src/tokens/*.",
    ],
  },
  {
    sprint: 1,
    title: "Setup base",
    date: "2026-05-15",
    status: "done",
    highlights: [
      "Next.js 16 + React 19 + TS + Tailwind 4 scaffold.",
      "shadcn/ui initialized with the base-nova preset.",
      "Folder structure, repo wired up to github.com/leandrobalbian-coder/COLOSSU-BRAND.",
    ],
  },
];

const statusVariant: Record<Entry["status"], { label: string; variant: "default" | "secondary" | "outline" }> = {
  done: { label: "Done", variant: "secondary" },
  "in-progress": { label: "In progress", variant: "default" },
  next: { label: "Next", variant: "outline" },
};

export default function ChangelogPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Resources"
        title="Changelog"
        description="Ladrillo se entrega por sprints. Cada sprint cierra con commit + push al repo y deja la página correspondiente lista en este sitio."
      />

      <ol className="relative space-y-6 border-l-2 border-border pl-6">
        {entries.map((entry) => {
          const status = statusVariant[entry.status];
          return (
            <li key={entry.sprint} className="relative">
              <span
                aria-hidden
                className="absolute -left-[33px] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background"
              />
              <div className="rounded-xl border bg-card p-5">
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    Sprint {entry.sprint}
                  </p>
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <p className="ml-auto font-mono text-xs text-muted-foreground">
                    {entry.date}
                  </p>
                </div>
                <h2 className="text-lg font-semibold">{entry.title}</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
