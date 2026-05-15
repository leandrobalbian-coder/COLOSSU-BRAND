import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { component } from "@/tokens/component";

type ComponentKey = keyof typeof component;
const groupOrder: ComponentKey[] = ["button", "card", "input", "badge"];

function flatten(obj: Record<string, unknown>, prefix: string[] = []): Array<{ path: string; value: string }> {
  const out: Array<{ path: string; value: string }> = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      out.push({ path: [...prefix, key].join("."), value });
    } else if (value && typeof value === "object") {
      out.push(...flatten(value as Record<string, unknown>, [...prefix, key]));
    }
  }
  return out;
}

export default function ComponentTokensPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Tokens · Layer 3"
        title="Component"
        description="Tokens por componente. Existen sólo cuando un componente necesita un contrato propio (ej. una sombra accent o una variante destructiva). Nunca referencian primitivos — siempre suben por la capa semántica."
      />

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">When to add one</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Sí</strong> · cuando dos
            componentes con la misma jerarquía necesitan resolver el mismo
            color (ej. <code>button.primary.bg</code> y
            <code> badge.primary.bg</code> apuntan a <code>--primary</code>,
            pero un futuro <em>premium CTA</em> pediría su propio token).
          </li>
          <li>
            <strong className="text-foreground">No</strong> · cuando un
            componente sólo consume un semántico tal cual. En ese caso
            referencía el semántico directamente en el JSX.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">How to consume</h2>
        <CodeBlock
          language="tsx"
          code={`import { component } from "@/tokens/component";

<button style={{
  background: component.button.primary.bg,
  color: component.button.primary.fg,
}}>
  Submit
</button>

// Each value is already a var() reference, so the cascade does the rest.`}
        />
      </section>

      <section className="flex flex-col gap-10">
        {groupOrder.map((key) => {
          const flat = flatten(component[key] as Record<string, unknown>, [key]);
          return (
            <div key={key}>
              <h2 className="mb-3 text-lg font-semibold capitalize">{key}</h2>
              <div className="overflow-hidden rounded-lg border bg-card">
                {flat.map((row, i) => (
                  <div
                    key={row.path}
                    className={`flex flex-wrap items-center gap-4 px-4 py-3 ${
                      i < flat.length - 1 ? "border-b" : ""
                    }`}
                  >
                    {row.value.startsWith("var(") ? (
                      <span
                        aria-hidden
                        className="size-10 rounded-md ring-1 ring-foreground/15"
                        style={{ background: row.value }}
                      />
                    ) : null}
                    <span className="w-56 font-mono text-xs">{row.path}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
