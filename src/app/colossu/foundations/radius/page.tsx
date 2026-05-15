import { PageHeader } from "@/components/docs/page-header";
import { radius } from "@/tokens/primitives";

const usage: Record<keyof typeof radius, string> = {
  none: "Tables, full-bleed dividers",
  sm: "Inline badges, chips, status pills",
  md: "Secondary surfaces, nested cards",
  lg: "Default card / container radius (10px — observed across the brand book)",
  xl: "Hero modules, marketing surfaces",
  full: "Avatars, dots, fully rounded pills",
};

export default function RadiusPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="El brand book de Colossu redondea todo con 10px de default. Eso vive en --radius, y las clases rounded-sm / rounded-md / rounded-lg de Tailwind se derivan automáticamente."
      />

      <section>
        <h2 className="mb-1 text-xl font-semibold">Tokens</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Cada paso tiene un caso de uso recomendado. Mezclar más de dos
          radios en una misma vista rompe la jerarquía visual.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(radius) as [keyof typeof radius, string][]).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-3 rounded-lg border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-muted-foreground">
                    radius.{key}
                  </p>
                  <p className="font-mono text-xs">{value}</p>
                </div>
                <div
                  className="h-20 w-full bg-primary/15 ring-1 ring-primary/30"
                  style={{ borderRadius: value }}
                />
                <p className="text-xs text-muted-foreground">{usage[key]}</p>
              </div>
            ),
          )}
        </div>
      </section>
    </article>
  );
}
