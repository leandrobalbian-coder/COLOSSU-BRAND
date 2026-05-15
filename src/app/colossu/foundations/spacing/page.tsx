import { PageHeader } from "@/components/docs/page-header";
import { space } from "@/tokens/primitives";

export default function SpacingPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="Escala basada en 4px. Todos los gaps, paddings y márgenes en la UI deben encajar en esta escala — incluso los layouts densos del dashboard."
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Scale</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Diez pasos, de 0 a 64px. Tokens auto-mapeados a las utilities de
          Tailwind (<code>p-4</code>, <code>gap-6</code>…).
        </p>
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg border bg-card p-4">
          {(Object.entries(space) as [string, string][]).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-4 rounded-md px-3 py-2 transition-colors hover:bg-muted/40"
            >
              <span className="w-16 font-mono text-xs text-muted-foreground">
                space.{key}
              </span>
              <span className="w-16 font-mono text-xs text-muted-foreground">
                {value}
              </span>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: value, maxWidth: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Usage</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Reglas observadas en el brand book de Colossu.
        </p>
        <ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {[
            ["space.2 (8px)", "Gap dentro de un grupo (icono + label, chip + dot)."],
            ["space.4 (16px)", "Padding default de cards densos."],
            ["space.6 (24px)", "Gap entre filas en tablas y listas."],
            ["space.8 (32px)", "Padding de cards grandes y módulos del dashboard."],
            ["space.12 (48px)", "Separación entre secciones dentro de una página."],
            ["space.16 (64px)", "Gutter horizontal en layouts amplios."],
          ].map(([token, hint]) => (
            <li key={token} className="rounded-lg border bg-card p-4">
              <p className="font-mono text-xs text-muted-foreground">{token}</p>
              <p className="mt-1">{hint}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
