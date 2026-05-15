import { CodeBlock } from "@/components/docs/code-block";
import { DownloadButton } from "@/components/docs/download-button";
import { PageHeader } from "@/components/docs/page-header";

export default function ForDevelopersPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Resources"
        title="For developers"
        description="Lo mínimo que un dev nuevo necesita para empezar a consumir Ladrillo en menos de 10 minutos."
      />

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Quick start</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Para un proyecto Next.js con shadcn ya configurado, dos pasos:
        </p>
        <ol className="mb-6 list-decimal space-y-2 pl-5 text-sm">
          <li>
            Descarga <code>tokens.css</code> o copialo desde este repo.
          </li>
          <li>
            Importarlo después de los estilos de Tailwind y shadcn.
          </li>
        </ol>
        <div className="mb-4 flex flex-wrap gap-2">
          <DownloadButton file="tokens.css" label="tokens.css" />
          <DownloadButton file="ai-context.md" label="ai-context.md" />
        </div>
        <CodeBlock
          language="bash"
          code={`# Option A — clone and import
git clone https://github.com/leandrobalbian-coder/COLOSSU-BRAND.git ladrillo
cp ladrillo/src/styles/tokens.css ./src/styles/

# Option B — fetch the latest from the deployed docs (Sprint 6+)
curl -o src/styles/tokens.css https://ladrillo.vercel.app/downloads/tokens.css`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Integration with Tailwind + shadcn</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Ladrillo NO incluye Tailwind config — sólo CSS variables. Tu
          <code> globals.css</code> queda así:
        </p>
        <CodeBlock
          language="css"
          code={`@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./tokens.css";   /* ← Ladrillo */

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* …shadcn's mapping. base-nova ships this out of the box. */
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Theme switching</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Platform (dark) y Reports (light) viven sobre los mismos nombres
          semánticos. Para cambiar de modo basta con un toggle en{" "}
          <code>&lt;html&gt;</code> (usamos <code>next-themes</code>):
        </p>
        <CodeBlock
          language="tsx"
          code={`// providers.tsx
"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Consuming tokens in code</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Tres formas equivalentes — el orden de preferencia es esta:
        </p>
        <ol className="mb-4 list-decimal space-y-2 pl-5 text-sm">
          <li>
            <strong>Tailwind utility</strong> (semantic) — &nbsp;
            <code>bg-primary text-foreground</code>. <em>Default.</em>
          </li>
          <li>
            <strong>CSS variable</strong> — <code>color: var(--primary)</code>.
            Cuando necesitas el valor en un estilo inline.
          </li>
          <li>
            <strong>Token import</strong> — <code>primitives.green[600]</code>.
            Sólo para SVG inline, generación de reports server-side, o cuando
            necesitas el hex puro.
          </li>
        </ol>
        <CodeBlock
          language="tsx"
          code={`// 1 — Tailwind utility (preferred)
<button className="bg-primary text-primary-foreground">CTA</button>

// 2 — CSS variable
<div style={{ background: "var(--primary)" }}>…</div>

// 3 — Token import (escape hatch)
import { primitives } from "@/tokens/primitives";
const hex = primitives.green[600]; // "#16A34A"`}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold">Conventions</h2>
        <ul className="space-y-3 text-sm">
          {[
            ["No hex literals.", "Si lo estás escribiendo en un componente, es un bug — usa el token."],
            ["No mezcles capas.", "Un componente nunca referencia un primitivo. Pasa siempre por la capa semántica."],
            ["Crea un token antes de hacerlo bonito.", "Si una pantalla necesita un color nuevo, agrega el token primero (a la capa que corresponda) y luego implementa la UI."],
            ["No modifiques shadcn/ui.", "Los archivos en src/components/ui/ vienen de shadcn — si los tocas, perderás el customization en el siguiente upgrade."],
            ["Growth Green es escaso.", "Una sola pieza primaria por pantalla. Si dos cosas pelean por ser el verde, una de las dos debe bajar a secondary."],
          ].map(([rule, hint]) => (
            <li key={rule} className="rounded-lg border bg-card p-4">
              <p className="font-semibold">{rule}</p>
              <p className="mt-1 text-muted-foreground">{hint}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">Working with the tokens directly</h2>
        <p className="mb-4 max-w-prose text-sm text-muted-foreground">
          Cada cambio a los TS files se propaga al CSS y a los <code>.md</code>{" "}
          descargables corriendo:
        </p>
        <CodeBlock language="bash" code={`pnpm sync-tokens`} />
        <p className="mt-3 max-w-prose text-sm text-muted-foreground">
          En Sprint 6 este comando va a leer directamente las Variables de
          Figma vía MCP. Mientras tanto, los <code>.ts</code> en{" "}
          <code>src/tokens/</code> son la fuente de verdad — y todo lo demás
          (CSS + docs) se reemite desde ahí.
        </p>
      </section>
    </article>
  );
}
