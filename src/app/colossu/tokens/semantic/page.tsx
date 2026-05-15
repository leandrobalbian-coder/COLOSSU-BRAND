import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { semantic } from "@/tokens/semantic";

function kebab(s: string) {
  return s
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/([a-z])(\d)/g, "$1-$2");
}

const groups: Array<{
  title: string;
  keys: (keyof typeof semantic.light)[];
  note?: string;
}> = [
  {
    title: "Surfaces",
    keys: ["background", "surface", "card", "popover"],
  },
  {
    title: "Text",
    keys: ["foreground", "foregroundMuted", "foregroundSubtle"],
  },
  {
    title: "Brand",
    keys: ["primary", "primaryForeground", "primaryHover"],
    note: "Growth Green is the only brand accent. Use sparingly — primary CTA, success states, key metrics.",
  },
  {
    title: "Roles",
    keys: [
      "secondary",
      "secondaryForeground",
      "muted",
      "mutedForeground",
      "accent",
      "accentForeground",
    ],
  },
  {
    title: "Borders & inputs",
    keys: ["border", "input", "ring"],
  },
  {
    title: "Status",
    keys: [
      "destructive",
      "destructiveForeground",
      "success",
      "successForeground",
      "warning",
      "warningForeground",
    ],
  },
  {
    title: "Sidebar",
    keys: [
      "sidebar",
      "sidebarForeground",
      "sidebarPrimary",
      "sidebarPrimaryForeground",
      "sidebarAccent",
      "sidebarAccentForeground",
      "sidebarBorder",
      "sidebarRing",
    ],
  },
  {
    title: "Chart",
    keys: ["chart1", "chart2", "chart3", "chart4", "chart5"],
    note: "Five-color palette for the dashboard charts. Position 1 is the primary metric.",
  },
];

export default function SemanticTokensPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Tokens · Layer 2"
        title="Semantic"
        description="Lo que cada color significa. Cambia con el tema activo (Platform / Reports). shadcn consume estos nombres directamente — por eso los componentes heredan el branding sin tocar el JSX."
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">How to consume</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Usa Tailwind utilities o variables CSS — nunca un hex literal.
        </p>
        <CodeBlock
          language="tsx"
          code={`<div className="bg-card text-foreground">
  <p className="text-muted-foreground">Vista general</p>
  <button className="bg-primary text-primary-foreground">CTA</button>
</div>

// or via CSS var:
//   color: var(--foreground);
//   background: var(--primary);`}
        />
      </section>

      <section className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold">{group.title}</h2>
              {group.note ? (
                <p className="hidden max-w-md text-xs text-muted-foreground sm:block">
                  {group.note}
                </p>
              ) : null}
            </div>
            <div className="overflow-hidden rounded-lg border bg-card">
              {group.keys.map((key, i) => {
                const cssVar = `--${kebab(key)}`;
                return (
                  <div
                    key={key}
                    className={`flex flex-wrap items-center gap-4 px-4 py-3 ${
                      i < group.keys.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="size-10 rounded-md ring-1 ring-foreground/15"
                      style={{ background: `var(${cssVar})` }}
                    />
                    <span className="w-40 font-mono text-xs">{cssVar}</span>
                    <span className="flex-1 font-mono text-xs text-muted-foreground">
                      light: {semantic.light[key]}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      dark: {semantic.dark[key]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
