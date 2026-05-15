import { SidebarNav } from "@/components/docs/sidebar-nav";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { Separator } from "@/components/ui/separator";

export default function ColossuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-6">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight">
              Ladrillo
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs text-muted-foreground">
              Colossu Design System
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              href="https://www.figma.com/design/5xtvRE2XDDmTcuMZ7gz6iE/BRANDING-COLOSSU"
              target="_blank"
              rel="noreferrer"
            >
              Figma ↗
            </a>
            <a
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/leandrobalbian-coder/COLOSSU-BRAND"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-6 py-10">
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto lg:block">
          <SidebarNav />
        </aside>
        <main className="min-w-0 flex-1 pb-24">{children}</main>
      </div>
    </div>
  );
}
