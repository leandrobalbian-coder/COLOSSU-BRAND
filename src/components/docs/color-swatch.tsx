"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  hex: string;
  cssVar: string;
  description?: string;
};

export function ColorSwatch({ name, hex, cssVar, description }: Props) {
  const [copied, setCopied] = useState<"hex" | "var" | null>(null);

  function copy(value: string, label: "hex" | "var") {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1200);
    });
  }

  return (
    <div
      className={cn(
        "group relative flex items-stretch gap-3 rounded-lg border bg-card p-3 transition-colors",
      )}
    >
      <div
        aria-hidden
        className="size-16 shrink-0 rounded-md shadow-sm ring-1 ring-foreground/15"
        style={{ background: hex }}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="truncate text-sm font-semibold">{name}</p>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <button
            type="button"
            onClick={() => copy(hex, "hex")}
            className="font-mono uppercase tracking-wide transition-colors hover:text-foreground"
            title="Copy hex"
          >
            {hex}
            {copied === "hex" ? (
              <Check className="ml-1 inline size-3 text-[color:var(--success)]" />
            ) : (
              <Copy className="ml-1 inline size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
          <span className="text-muted-foreground/60">·</span>
          <button
            type="button"
            onClick={() => copy(`var(${cssVar})`, "var")}
            className="font-mono transition-colors hover:text-foreground"
            title="Copy CSS variable"
          >
            {cssVar}
            {copied === "var" ? (
              <Check className="ml-1 inline size-3 text-[color:var(--success)]" />
            ) : (
              <Copy className="ml-1 inline size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
