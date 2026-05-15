import { Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  /** File under `public/downloads/`, e.g. "ai-context.md". */
  file: string;
  /** Visible label. Defaults to the file name. */
  label?: string;
  className?: string;
};

export function DownloadButton({ file, label, className }: Props) {
  return (
    <a
      href={`/downloads/${file}`}
      download
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), className)}
    >
      <Download />
      {label ?? file}
    </a>
  );
}
