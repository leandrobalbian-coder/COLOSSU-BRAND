import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function InputsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Components"
        title="Inputs"
        description="Controles de formulario shadcn cableados a los tokens Ladrillo. El focus ring siempre es Growth Green (--ring)."
      />

      <ComponentPreview
        title="Text input + label"
        preview={
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="company">Nombre de la empresa</Label>
            <Input id="company" placeholder="Acme, Inc." />
          </div>
        }
        code={`<div className="flex flex-col gap-2">
  <Label htmlFor="company">Nombre de la empresa</Label>
  <Input id="company" placeholder="Acme, Inc." />
</div>`}
      />

      <ComponentPreview
        title="Textarea"
        preview={
          <div className="flex w-full max-w-md flex-col gap-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" placeholder="Comentarios sobre el espacio…" />
          </div>
        }
        code={`<Label htmlFor="notes">Notas</Label>
<Textarea id="notes" placeholder="Comentarios sobre el espacio…" />`}
      />

      <ComponentPreview
        title="Select"
        preview={
          <div className="flex w-full max-w-xs flex-col gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Select>
              <SelectTrigger id="city">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cdmx">CDMX</SelectItem>
                <SelectItem value="gdl">Guadalajara</SelectItem>
                <SelectItem value="mty">Monterrey</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona una ciudad" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="cdmx">CDMX</SelectItem>
    <SelectItem value="gdl">Guadalajara</SelectItem>
    <SelectItem value="mty">Monterrey</SelectItem>
  </SelectContent>
</Select>`}
      />

      <ComponentPreview
        title="Checkbox + Switch"
        preview={
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" defaultChecked />
              <Label htmlFor="terms" className="font-normal">
                Acepto los términos
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications" className="font-normal">
                Recibir notificaciones
              </Label>
            </div>
          </div>
        }
        code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Acepto los términos</Label>
</div>

<div className="flex items-center gap-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Recibir notificaciones</Label>
</div>`}
      />

      <ComponentPreview
        title="Invalid state"
        description="Marca el control con aria-invalid; el ring switchea a destructive automáticamente."
        preview={
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="no es un email"
              aria-invalid
            />
            <p className="text-xs text-[color:var(--destructive)]">
              Formato inválido
            </p>
          </div>
        }
        code={`<Input aria-invalid defaultValue="no es un email" />`}
      />
    </article>
  );
}
