"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };
type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    title: "Inicio",
    items: [{ label: "Introduction", href: "/colossu/introduction" }],
  },
  {
    title: "Foundations",
    items: [
      { label: "Colors", href: "/colossu/foundations/colors" },
      { label: "Typography", href: "/colossu/foundations/typography" },
      { label: "Spacing", href: "/colossu/foundations/spacing" },
      { label: "Radius", href: "/colossu/foundations/radius" },
      { label: "Shadows", href: "/colossu/foundations/shadows" },
    ],
  },
  {
    title: "Tokens",
    items: [
      { label: "Primitives", href: "/colossu/tokens/primitives" },
      { label: "Semantic", href: "/colossu/tokens/semantic" },
      { label: "Component", href: "/colossu/tokens/component" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Buttons", href: "/colossu/components/buttons" },
      { label: "Inputs", href: "/colossu/components/inputs" },
      { label: "Cards", href: "/colossu/components/cards" },
      { label: "Badges", href: "/colossu/components/badges" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "For developers", href: "/colossu/resources/for-developers" },
      { label: "For designers", href: "/colossu/resources/for-designers" },
      { label: "Changelog", href: "/colossu/resources/changelog" },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {section.title}
          </p>
          <ul className="flex flex-col">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-8 items-center rounded-md px-2 transition-colors",
                      active
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
