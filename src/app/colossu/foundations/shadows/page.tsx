import { PageHeader } from "@/components/docs/page-header";
import { shadow } from "@/tokens/primitives";

const usage: Record<keyof typeof shadow, string> = {
  sm: "Avatars, small chips, floating dots",
  md: "Card default — surfaces on top of the page canvas",
  lg: "Elevated surfaces — modals, popovers, dropdown menus",
  accent: "Primary CTAs only — the Growth Green glow signals the canonical action",
  insetTop: "Pressed states, inputs on focus, recessed surfaces",
};

const tokens = Object.entries(shadow) as [keyof typeof shadow, string][];

export default function ShadowsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Shadows"
        description="Cinco tokens de elevación. La sombra accent es especial — sólo se usa en el CTA primario para que el verde se proyecte como halo."
      />

      <section>
        <h2 className="mb-1 text-xl font-semibold">Tokens</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Cada token vive como variable CSS (<code>--lad-shadow-*</code>) y se
          consume directo desde estilos o vía <code>boxShadow</code>.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tokens.map(([key, value]) => (
            <div
              key={key}
              className="rounded-xl bg-background p-8"
              style={{ background: "var(--background)" }}
            >
              <div
                className="flex h-32 items-center justify-center rounded-lg bg-card text-sm font-semibold"
                style={{ boxShadow: value }}
              >
                shadow.{key}
              </div>
              <div className="mt-4">
                <p className="font-mono text-xs text-muted-foreground">
                  --lad-shadow-{key}
                </p>
                <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground/80">
                  {value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {usage[key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
