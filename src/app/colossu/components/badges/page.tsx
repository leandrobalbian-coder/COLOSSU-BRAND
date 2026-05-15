import { AlertTriangle, Check, TrendingUp, X } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { Badge } from "@/components/ui/badge";

export default function BadgesPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Components"
        title="Badges"
        description="Indicadores de estado, contadores y etiquetas. shadcn provee 6 variantes; las mapeamos directo a los semánticos de Ladrillo."
      />

      <ComponentPreview
        title="Variants"
        preview={
          <>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="link">Link</Badge>
          </>
        }
        code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="link">Link</Badge>`}
      />

      <ComponentPreview
        title="With icon"
        description="Acompañar con un icono Lucide refuerza el estado. Mantener una sola fila de texto."
        preview={
          <>
            <Badge>
              <Check />
              Pagado
            </Badge>
            <Badge variant="secondary">
              <TrendingUp />
              Crecimiento
            </Badge>
            <Badge variant="destructive">
              <X />
              Cancelado
            </Badge>
            <Badge variant="outline">
              <AlertTriangle />
              Revisar
            </Badge>
          </>
        }
        code={`import { Check, TrendingUp, X, AlertTriangle } from "lucide-react";

<Badge><Check />Pagado</Badge>
<Badge variant="secondary"><TrendingUp />Crecimiento</Badge>
<Badge variant="destructive"><X />Cancelado</Badge>
<Badge variant="outline"><AlertTriangle />Revisar</Badge>`}
      />

      <ComponentPreview
        title="As numeric counter"
        preview={
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
              Mensajes
              <Badge>4</Badge>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
              Errores
              <Badge variant="destructive">12</Badge>
            </span>
          </div>
        }
        code={`<span className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
  Mensajes
  <Badge>4</Badge>
</span>`}
      />
    </article>
  );
}
