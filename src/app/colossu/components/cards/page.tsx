import { ArrowUpRight, TrendingUp } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { PageHeader } from "@/components/docs/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardsPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Components"
        title="Cards"
        description="Card es la superficie estructural por excelencia. Carga el token --card y --card-foreground, así muta sola entre Platform (Charcoal) y Reports (white)."
      />

      <ComponentPreview
        title="Default"
        preview={
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Visitas del mes</CardTitle>
              <CardDescription>Últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12,438</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                +8.4% vs período anterior
              </p>
            </CardFooter>
          </Card>
        }
        code={`<Card>
  <CardHeader>
    <CardTitle>Visitas del mes</CardTitle>
    <CardDescription>Últimos 30 días</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">12,438</p>
  </CardContent>
  <CardFooter>
    <p className="text-xs text-muted-foreground">
      +8.4% vs período anterior
    </p>
  </CardFooter>
</Card>`}
      />

      <ComponentPreview
        title="Stat card with action"
        description="Patrón observado en el dashboard del brand book. Métrica + delta + acción de drill-down."
        preview={
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                MRR
              </CardTitle>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Open">
                  <ArrowUpRight />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex items-baseline gap-3">
              <p className="text-3xl font-bold">$84.2k</p>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="size-3" />
                +12%
              </Badge>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">Q1 · 2026</p>
            </CardFooter>
          </Card>
        }
        code={`<Card>
  <CardHeader>
    <CardTitle className="text-sm font-medium text-muted-foreground">
      MRR
    </CardTitle>
    <CardAction>
      <Button variant="ghost" size="icon-sm" aria-label="Open">
        <ArrowUpRight />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent className="flex items-baseline gap-3">
    <p className="text-3xl font-bold">$84.2k</p>
    <Badge variant="secondary"><TrendingUp className="size-3" />+12%</Badge>
  </CardContent>
  <CardFooter>
    <p className="text-xs text-muted-foreground">Q1 · 2026</p>
  </CardFooter>
</Card>`}
      />

      <ComponentPreview
        title="Elevated CTA"
        description="Para destacar acciones críticas — la sombra accent (Growth Green) sale solo aquí."
        preview={
          <Card
            className="w-full max-w-md border-primary/40"
            style={{ boxShadow: "var(--lad-shadow-accent)" }}
          >
            <CardHeader>
              <CardTitle>Activa tu cuenta premium</CardTitle>
              <CardDescription>
                Acceso a métricas avanzadas, exports ilimitados y reportes
                programados.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Activar ahora</Button>
            </CardFooter>
          </Card>
        }
        code={`<Card
  className="border-primary/40"
  style={{ boxShadow: "var(--lad-shadow-accent)" }}
>
  <CardHeader>
    <CardTitle>Activa tu cuenta premium</CardTitle>
    <CardDescription>…</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button>Activar ahora</Button>
  </CardFooter>
</Card>`}
      />
    </article>
  );
}
