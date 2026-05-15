import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { DownloadButton } from "@/components/docs/download-button";
import { PageHeader } from "@/components/docs/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sprints = [
  { n: 1, title: "Setup base", body: "Next.js + shadcn scaffold, folder structure, repo wiring.", status: "done" },
  { n: 2, title: "Tokens", body: "Three-layer tokens extracted from BRANDING-COLOSSU + tokens.css.", status: "done" },
  { n: 3, title: "Docs layout + Foundations", body: "Sidebar, Colors page (swatches + hierarchy), Typography.", status: "done" },
  { n: 4, title: "Tokens pages + Components", body: "Live previews of shadcn components with Ladrillo tokens applied.", status: "done" },
  { n: 5, title: "Resources", body: "For-developers, for-designers, ai-context.md, changelog.", status: "done" },
  { n: 6, title: "Registry, MCP, deploy", body: "shadcn registry + MCP + Vercel deploy + scheduled Figma sync.", status: "next" },
] as const;

export default function IntroductionPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Welcome"
        title="Ladrillo"
        description="El sistema de diseño de Colossu (Spot2). Vive sobre shadcn/ui y sólo aporta la personalidad visual: tokens de color, tipografía Geist, spacing y sombras — todo cableado vía variables CSS."
      />

      <section className="mb-12 rounded-xl border border-primary/30 bg-card p-6">
        <div className="flex items-start gap-4">
          <Sparkles className="size-5 shrink-0 text-primary" aria-hidden />
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Use with AI
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              Un archivo, todo el sistema
            </h2>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              <code>ai-context.md</code> es un snapshot plano de Ladrillo —
              paleta, tipografía, reglas y ejemplos. Pásalo como system
              prompt o adjúntalo a Cursor / Claude / v0 / GPT para que
              generen pantallas consistentes con la identidad de Colossu.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DownloadButton file="ai-context.md" label="ai-context.md" />
              <DownloadButton file="tokens.css" label="tokens.css" />
              <Link
                href="/colossu/resources/for-developers"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Quick start
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Roadmap</h2>
        <p className="mb-5 max-w-prose text-sm text-muted-foreground">
          Ladrillo se entrega por sprints. Detalle completo en{" "}
          <Link
            href="/colossu/resources/changelog"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Changelog
          </Link>
          .
        </p>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sprints.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-1 rounded-lg border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  Sprint {s.n}
                </span>
                <Badge
                  variant={s.status === "done" ? "secondary" : "outline"}
                >
                  {s.status === "done" ? "Done" : "Next"}
                </Badge>
              </div>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-semibold">Sources of truth</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href="https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU"
              target="_blank"
              rel="noreferrer"
            >
              Figma — BRANDING-COLOSSU ↗
            </a>
            <span className="text-muted-foreground"> · brand book (canónico)</span>
          </li>
          <li>
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href="https://github.com/leandrobalbian-coder/COLOSSU-BRAND"
              target="_blank"
              rel="noreferrer"
            >
              github.com/leandrobalbian-coder/COLOSSU-BRAND ↗
            </a>
            <span className="text-muted-foreground"> · este repo</span>
          </li>
        </ul>
      </section>
    </article>
  );
}
