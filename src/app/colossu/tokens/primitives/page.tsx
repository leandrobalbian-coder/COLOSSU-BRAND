import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { primitives } from "@/tokens/primitives";

type ScaleKey = Exclude<keyof typeof primitives, "white" | "black">;
const scales: ScaleKey[] = ["navy", "green", "slate", "red", "amber"];

export default function PrimitivesPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Tokens · Layer 1"
        title="Primitives"
        description="La paleta cruda. Los primitivos viven en :root y no cambian con el tema. Nunca consumas un primitivo desde un componente — pasa siempre por un semántico."
        download={{ file: "color-tokens.md", label: "color-tokens.md" }}
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Where they live</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Definidos en TypeScript (<code>src/tokens/primitives.ts</code>) y
          emitidos como CSS vars en <code>src/styles/tokens.css</code>. Para
          regenerar desde Figma corre <code>pnpm sync-tokens</code>.
        </p>
        <CodeBlock
          language="ts"
          code={`import { primitives } from "@/tokens/primitives";

primitives.navy[900]    // "#0B1F33"
primitives.green[600]   // "#16A34A"

// In CSS:
//   color: var(--lad-navy-900);
//   background: var(--lad-green-600);`}
        />
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">All tokens</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Cada token expone una variable <code>--lad-&lt;hue&gt;-&lt;step&gt;</code>.
        </p>
        <div className="flex flex-col gap-8">
          {scales.map((hue) => {
            const scale = primitives[hue] as Record<string, string>;
            return (
              <div key={hue}>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {hue}
                </h3>
                <div className="overflow-hidden rounded-lg border bg-card">
                  {Object.entries(scale).map(([step, hex], i, arr) => (
                    <div
                      key={step}
                      className={`flex items-center gap-4 px-4 py-3 ${
                        i < arr.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className="size-10 rounded-md ring-1 ring-foreground/15"
                        style={{ background: hex }}
                      />
                      <span className="w-40 font-mono text-xs">
                        --lad-{hue}-{step}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              pure
            </h3>
            <div className="overflow-hidden rounded-lg border bg-card">
              {(["white", "black"] as const).map((key, i, arr) => (
                <div
                  key={key}
                  className={`flex items-center gap-4 px-4 py-3 ${
                    i < arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="size-10 rounded-md ring-1 ring-foreground/15"
                    style={{ background: primitives[key] }}
                  />
                  <span className="w-40 font-mono text-xs">--lad-{key}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {primitives[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
