import { ArrowRight, Plus } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { Button } from "@/components/ui/button";

export default function ButtonsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Components"
        title="Buttons"
        description="shadcn/ui Button con tokens Ladrillo. No tocamos el componente — sólo cambian las CSS variables que resuelven --primary, --secondary, --destructive, etc."
      />

      <p className="mb-8 max-w-prose text-sm text-muted-foreground">
        Importa siempre desde <code>@/components/ui/button</code>. Nunca
        sustituyas Tailwind utilities por colores hex.
      </p>

      <ComponentPreview
        title="Variants"
        description="default = Growth Green CTA. Reserva para la acción principal de la página."
        preview={
          <>
            <Button>Confirmar</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Eliminar</Button>
            <Button variant="link">Ver detalle</Button>
          </>
        }
        code={`<Button>Confirmar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Eliminar</Button>
<Button variant="link">Ver detalle</Button>`}
      />

      <ComponentPreview
        title="Sizes"
        description="xs · sm · default · lg. Para acciones inline en tablas usar xs/sm; default y lg para barras de acción primaria."
        preview={
          <>
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button>default</Button>
            <Button size="lg">lg</Button>
          </>
        }
        code={`<Button size="xs">xs</Button>
<Button size="sm">sm</Button>
<Button>default</Button>
<Button size="lg">lg</Button>`}
      />

      <ComponentPreview
        title="With icons"
        preview={
          <>
            <Button>
              <Plus />
              Crear espacio
            </Button>
            <Button variant="secondary">
              Siguiente
              <ArrowRight />
            </Button>
            <Button size="icon" aria-label="Add">
              <Plus />
            </Button>
          </>
        }
        code={`import { Plus, ArrowRight } from "lucide-react";

<Button>
  <Plus />
  Crear espacio
</Button>

<Button variant="secondary">
  Siguiente
  <ArrowRight />
</Button>

<Button size="icon" aria-label="Add">
  <Plus />
</Button>`}
      />

      <ComponentPreview
        title="States"
        preview={
          <>
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button aria-invalid>Aria invalid</Button>
          </>
        }
        code={`<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button aria-invalid>Aria invalid</Button>`}
      />
    </article>
  );
}
