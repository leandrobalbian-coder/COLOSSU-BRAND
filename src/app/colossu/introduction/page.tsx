export default function IntroductionPage() {
  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      <h1>Ladrillo</h1>
      <p className="text-lg text-muted-foreground">
        Ladrillo is the design system for{" "}
        <strong>Colossu</strong> (Spot2.mx). It sits on top of{" "}
        <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
          shadcn/ui
        </a>{" "}
        and only contributes a visual personality layer: color tokens,
        typography, spacing and shadows wired through CSS variables.
      </p>

      <h2>Sprints</h2>
      <ol>
        <li>
          <strong>Sprint 1 — Setup base.</strong> Next.js + shadcn scaffold,
          folder structure, repo wiring.{" "}
          <em className="text-emerald-600">done</em>
        </li>
        <li>
          <strong>Sprint 2 — Tokens.</strong> Extract Figma variables → 3-layer
          token files + <code>tokens.css</code>.
        </li>
        <li>
          <strong>Sprint 3 — Docs layout + Foundations.</strong> Sidebar, Colors
          page (swatches, contrast checker), Typography.
        </li>
        <li>
          <strong>Sprint 4 — Tokens + Components pages.</strong> Live previews
          of shadcn components with our tokens applied.
        </li>
        <li>
          <strong>Sprint 5 — Resources.</strong> For-developers,
          for-designers, <code>ai-context.md</code>.
        </li>
        <li>
          <strong>Sprint 6 — Registry, MCP, deploy.</strong> shadcn registry,
          Vercel deploy, scheduled Figma sync.
        </li>
      </ol>

      <h2>Sources of truth</h2>
      <ul>
        <li>
          Design:{" "}
          <a
            href="https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU"
            target="_blank"
            rel="noreferrer"
          >
            Figma — BRANDING-COLOSSU
          </a>
        </li>
        <li>
          Code:{" "}
          <a
            href="https://github.com/leandrobalbian-coder/COLOSSU-BRAND"
            target="_blank"
            rel="noreferrer"
          >
            github.com/leandrobalbian-coder/COLOSSU-BRAND
          </a>
        </li>
      </ul>
    </article>
  );
}
