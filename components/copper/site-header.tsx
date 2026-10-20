import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const links = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus", short: "Plus" },
  { href: "#privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-32 sm:w-44" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <nav
            aria-label="Main"
            className="flex gap-3 text-sm font-medium sm:gap-6"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary"
              >
                {link.short ? (
                  <>
                    <span className="sm:hidden">{link.short}</span>
                    <span className="hidden sm:inline">{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </a>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
