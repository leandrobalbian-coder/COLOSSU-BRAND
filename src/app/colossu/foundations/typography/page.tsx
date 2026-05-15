import { PageHeader } from "@/components/docs/page-header";
import { fontSize, fontWeight, letterSpacing } from "@/tokens/primitives";

type TypeRow = {
  token: keyof typeof fontSize;
  label: string;
  weight: keyof typeof fontWeight;
  tracking?: keyof typeof letterSpacing;
  sample: string;
};

const scale: TypeRow[] = [
  { token: "hero", label: "Hero", weight: "bold", tracking: "tight", sample: "Paleta Dual-Tone" },
  { token: "display", label: "Display", weight: "bold", tracking: "tight", sample: "Arquitectura de Color" },
  { token: "h1", label: "H1", weight: "bold", sample: "Resumen Financiero Q1" },
  { token: "h2", label: "H2", weight: "bold", sample: "Sistema Híbrido" },
  { token: "h3", label: "H3", weight: "semibold", sample: "Jerarquía Visual" },
  { token: "h4", label: "H4", weight: "semibold", sample: "Vista general de rendimiento" },
  { token: "bodyLg", label: "Body large", weight: "regular", sample: "Eliminamos el ruido visual. Una paleta binaria: seguridad y crecimiento." },
  { token: "body", label: "Body", weight: "regular", sample: "Usamos Geist Sans como familia tipográfica principal." },
  { token: "bodySm", label: "Body small", weight: "regular", sample: "Última actualización: Hoy" },
  { token: "caption", label: "Caption", weight: "semibold", tracking: "wider", sample: "04 — SISTEMA DE COLOR" },
];

const weightMeta: Record<keyof typeof fontWeight, { label: string; usage: string }> = {
  regular: { label: "Regular", usage: "Body text, descriptions" },
  medium: { label: "Medium", usage: "UI labels, secondary text" },
  semibold: { label: "Semibold", usage: "Headings, badges, eyebrows" },
  bold: { label: "Bold", usage: "Hero titles, emphasis" },
};

export default function TypographyPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Una sola familia tipográfica: Geist. La jerarquía se establece por contraste de tamaño, peso y color — no por mezcla de fuentes. Geist Mono se reserva para datos técnicos, métricas y eyebrow labels."
        figmaNodeId="35:3105"
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Families</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Geist es la fuente de Vercel — neutral, dense en pantalla, y diseñada
          para data-heavy UI. Llega con Next.js, no requiere instalación extra.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              --font-sans
            </p>
            <p className="mt-2 font-sans text-3xl font-semibold">Geist Sans</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Titles, UI, body text
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              --font-mono
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold">Geist Mono</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Numbers, code, eyebrows, token names
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Scale</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Diez pasos del hero (62px) al caption (12px). Todos los tokens
          referencian rem para escalar con la preferencia de tamaño del usuario.
        </p>
        <div className="flex flex-col gap-3">
          {scale.map((row) => (
            <div
              key={row.token}
              className="flex flex-col gap-4 rounded-lg border bg-card p-5"
            >
              <p
                className="break-words"
                style={{
                  fontSize: fontSize[row.token],
                  fontWeight: fontWeight[row.weight],
                  letterSpacing: row.tracking ? letterSpacing[row.tracking] : undefined,
                  lineHeight: 1.15,
                }}
              >
                {row.sample}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t pt-3 text-xs">
                <span className="font-medium">{row.label}</span>
                <span className="font-mono text-muted-foreground">
                  fontSize.{row.token}
                </span>
                <span className="font-mono text-muted-foreground">
                  {fontSize[row.token]}
                </span>
                <span className="font-mono text-muted-foreground">
                  {fontWeight[row.weight]} · {weightMeta[row.weight].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Weights</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Cuatro pesos cubren la jerarquía. Resistir la tentación de mezclar
          más — la jerarquía debe nacer del contraste, no de la variedad.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(fontWeight) as (keyof typeof fontWeight)[]).map((w) => (
            <div key={w} className="rounded-lg border bg-card p-5">
              <p
                className="text-2xl"
                style={{ fontWeight: fontWeight[w] }}
              >
                Aa
              </p>
              <p className="mt-3 text-sm font-medium">{weightMeta[w].label}</p>
              <p className="font-mono text-xs text-muted-foreground">
                fontWeight.{w} · {fontWeight[w]}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {weightMeta[w].usage}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
