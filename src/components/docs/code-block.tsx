"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  code: string;
  language?: string;
  className?: string;
};

export function CodeBlock({ code, language = "tsx", className }: Props) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg border bg-card p-4 font-mono text-xs leading-relaxed">
        <code className="text-foreground/90">{code}</code>
      </pre>
      <div className="absolute right-3 top-3 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border bg-background p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </button>
      </div>
    </div>
  );
}
