import { DownloadButton } from "@/components/docs/download-button";
import { Badge } from "@/components/ui/badge";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  figmaNodeId?: string;
  /** When set, renders a download button for the corresponding /downloads/<file>. */
  download?: { file: string; label?: string };
};

export function PageHeader({
  eyebrow,
  title,
  description,
  figmaNodeId,
  download,
}: Props) {
  const figmaUrl = figmaNodeId
    ? `https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU?node-id=${figmaNodeId.replace(":", "-")}`
    : null;

  return (
    <header className="mb-10 flex flex-col gap-3 border-b pb-8">
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {figmaUrl ? (
            <a
              href={figmaUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Badge variant="outline" className="font-mono">
                Figma · {figmaNodeId} ↗
              </Badge>
            </a>
          ) : null}
          {download ? (
            <DownloadButton file={download.file} label={download.label} />
          ) : null}
        </div>
      </div>
      {description ? (
        <p className="max-w-prose text-base text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
