type Props = {
  title: string;
  sprint: number;
  description?: string;
};

export function ComingSoon({ title, sprint, description }: Props) {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center gap-3 rounded-xl border border-dashed bg-card/50 p-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Coming in Sprint {sprint}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description ? (
        <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
