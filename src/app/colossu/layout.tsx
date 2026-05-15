// Sprint 1 placeholder. Full sidebar + docs chrome lands in Sprint 3.

export default function ColossuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between border-b pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-semibold tracking-tight">Ladrillo</span>
          <span className="text-sm text-muted-foreground">
            Design System · Colossu
          </span>
        </div>
        <a
          className="text-sm text-muted-foreground hover:text-foreground"
          href="https://github.com/leandrobalbian-coder/COLOSSU-BRAND"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
