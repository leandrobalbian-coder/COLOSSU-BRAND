import { CodeBlock } from "@/components/docs/code-block";

type Props = {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
};

export function ComponentPreview({ title, description, preview, code }: Props) {
  return (
    <section className="mb-10">
      <header className="mb-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-3">
        <div className="flex min-h-[120px] flex-wrap items-center gap-3 rounded-lg border bg-card p-6">
          {preview}
        </div>
        <CodeBlock code={code} />
      </div>
    </section>
  );
}
