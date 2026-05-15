import { ArrowUpRight } from "lucide-react";

import { DownloadButton } from "@/components/docs/download-button";
import { PageHeader } from "@/components/docs/page-header";

const FIGMA_URL =
  "https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU";

export default function ForDesignersPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Resources"
        title="For designers"
        description="Cómo trabajar con Ladrillo desde Figma — desde consumir los tokens existentes hasta proponer uno nuevo."
      />

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Source of truth</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          El archivo Figma es la única fuente de verdad para tokens. El repo
          de código se actualiza a partir de él, nunca al revés.
        </p>
        <a
          href={FIGMA_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Figma · 5xtvRE2XDDmTcuMZ7gz6iE
            </p>
            <p className="mt-1 text-base font-semibold">BRANDING-COLOSSU</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Brand book completo: paleta, tipografía, escala, mocks de
              dashboard y reportes.
            </p>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground" />
        </a>
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Consumir tokens en Figma</h2>
        <ol className="space-y-3 pl-5 text-sm">
          <li className="list-decimal">
            <strong>Variables &gt; Collections.</strong> Las colecciones{" "}
            <em>Primitives</em> y <em>Semantic</em> están publicadas en el
            archivo BRANDING-COLOSSU. Asegúrate de tener acceso de lectura.
          </li>
          <li className="list-decimal">
            <strong>Pin las variables.</strong> En tu archivo de proyecto,
            abre Variables y pin la library. Vas a poder asignar
            <code> color/primary</code>, <code>color/background</code>,
            <code> radius/lg</code>, etc., desde el inspector.
          </li>
          <li className="list-decimal">
            <strong>Mode = Platform o Reports.</strong> El archivo tiene dos
            modos en Variables. Cambiar el modo de un frame muta toda su
            paleta — igual que el toggle del docs site.
          </li>
          <li className="list-decimal">
            <strong>Nunca pegues hex.</strong> Si necesitas un color que no
            existe como variable, ese es un signal de que falta un token —
            propónlo (siguiente sección) antes de seguir.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Proponer un nuevo token</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Sigue el flujo abajo. Un token nuevo es siempre una decisión de
          sistema, no de pantalla.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              step: "01",
              title: "Identifica la capa",
              body: "¿Es un color crudo nuevo (primitive), un nuevo role como `info` (semantic), o un contrato específico de un componente?",
            },
            {
              step: "02",
              title: "Demuestra el uso",
              body: "Aplica el token en mocks reales del producto. Si sólo aparece una vez, probablemente no necesita ser token todavía.",
            },
            {
              step: "03",
              title: "Verifica contraste",
              body: "AA mínimo (4.5:1 para body, 3:1 para large). Si falla en cualquiera de los dos modos, ajusta el valor antes de proponer.",
            },
            {
              step: "04",
              title: "Abre un PR (o ping a un dev)",
              body: "El cambio se hace en src/tokens/*.ts. Después corre pnpm sync-tokens para regenerar todo lo demás.",
            },
          ].map((card) => (
            <div key={card.step} className="rounded-xl border bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {card.step}
              </p>
              <p className="mt-2 text-base font-semibold">{card.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Cheat sheet</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Descárgalo y pégalo en cualquier conversación con devs o con una IA —
          es exactamente lo que necesitan para generar pantallas con la
          identidad de Colossu.
        </p>
        <div className="flex flex-wrap gap-2">
          <DownloadButton file="ai-context.md" label="ai-context.md (full system)" />
          <DownloadButton file="color-tokens.md" label="color-tokens.md" />
          <DownloadButton file="typography-tokens.md" label="typography-tokens.md" />
          <DownloadButton file="spacing-tokens.md" label="spacing-tokens.md" />
        </div>
      </section>
    </article>
  );
}
