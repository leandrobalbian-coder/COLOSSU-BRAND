import { ColorSwatch } from "@/components/docs/color-swatch";
import { PageHeader } from "@/components/docs/page-header";
import { primitives } from "@/tokens/primitives";
import { semantic } from "@/tokens/semantic";

type ScaleKey = Exclude<keyof typeof primitives, "white" | "black">;
const scales: ScaleKey[] = ["navy", "green", "slate", "red", "amber"];

const semanticDescriptions: Partial<Record<keyof typeof semantic.light, string>> = {
  background: "Page canvas",
  surface: "Subtle background tint",
  card: "Card / popover surfaces",
  foreground: "Default text",
  foregroundMuted: "Secondary text, metadata",
  foregroundSubtle: "Tertiary, captions",
  primary: "Brand action — Growth Green",
  primaryHover: "Primary hover state",
  secondary: "Secondary surface",
  muted: "Muted surface for de-emphasis",
  accent: "Accent surface for hover/selected",
  border: "Borders & dividers",
  input: "Form control surfaces",
  ring: "Focus ring",
  destructive: "Errors, destructive actions",
  success: "Success states",
  warning: "Warning states",
};

export default function ColorsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        description="Dos modos, una identidad: Platform (dark) en pantalla, Reports (light) en papel. Cada color es un token con tres capas: primitivo → semántico → componente."
        figmaNodeId="35:3239"
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Brand</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          La paleta tonal de Colossu son tres colores. Todo lo demás compone
          alrededor de estos.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ColorSwatch
            name="Deep Navy"
            description="Base institucional — confianza, autoridad"
            hex={primitives.navy[900]}
            cssVar="--lad-navy-900"
          />
          <ColorSwatch
            name="Growth Green"
            description="Acento principal — acción, éxito, crecimiento"
            hex={primitives.green[600]}
            cssVar="--lad-green-600"
          />
          <ColorSwatch
            name="Charcoal"
            description="Superficies UI — sidebars, cards, fondos secundarios"
            hex={primitives.navy[800]}
            cssVar="--lad-navy-800"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Primitives</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          La paleta cruda. Componentes <strong>no</strong> deben referenciar
          estos directamente; consúmelos a través de la capa semántica.
        </p>
        <div className="flex flex-col gap-8">
          {scales.map((hue) => {
            const scale = primitives[hue] as Record<string, string>;
            return (
              <div key={hue}>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {hue}
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {Object.entries(scale).map(([step, hex]) => (
                    <ColorSwatch
                      key={step}
                      name={`${hue} / ${step}`}
                      hex={hex}
                      cssVar={`--lad-${hue}-${step}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Semantic — current theme</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Estos tokens cambian con el tema activo. shadcn los consume
          directamente (<code>--primary</code>, <code>--background</code>, …) —
          por eso los componentes heredan la personalidad sin tocar el JSX.
          Cambia el toggle del header para verlos mutar.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(semantic.light).map(([key]) => {
            // Resolved via CSS var so it reflects the live theme.
            const cssVar = `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/([a-z])(\d)/g, "$1-$2")}`;
            return (
              <ColorSwatch
                key={key}
                name={key}
                description={semanticDescriptions[key as keyof typeof semantic.light]}
                hex={`var(${cssVar})`}
                cssVar={cssVar}
              />
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Hierarchy</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Trazabilidad de un solo color a través de las tres capas.
        </p>
        <div className="grid grid-cols-1 gap-4 rounded-xl border bg-card p-6 lg:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              1 · Primitive
            </p>
            <p className="mt-2 text-sm font-medium">--lad-green-600</p>
            <div
              className="mt-2 h-10 rounded-md"
              style={{ background: primitives.green[600] }}
            />
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              #16A34A
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              2 · Semantic
            </p>
            <p className="mt-2 text-sm font-medium">--primary</p>
            <div className="mt-2 h-10 rounded-md bg-primary" />
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              → var(--lad-green-600)
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              3 · Component
            </p>
            <p className="mt-2 text-sm font-medium">button.primary.bg</p>
            <div className="mt-2 flex h-10 items-center justify-center rounded-md bg-primary px-3 font-medium text-primary-foreground">
              Primary CTA
            </div>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              → var(--primary)
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
