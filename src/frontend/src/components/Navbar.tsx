import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#download-docs" },
  { label: "Aadhaar & PAN", href: "#aadhaar-pan" },
  { label: "Finance & Bank", href: "#finance" },
  { label: "eSathi", href: "#esathi" },
  { label: "Earn Money 💰", href: "#earn-money" },
  { label: "My Wallet", href: "#wallet" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 w-full bg-black border-b border-border transition-shadow ${
        scrolled ? "shadow-md shadow-black/50" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-14 max-w-6xl mx-auto px-4">
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-lg text-green-400"
        >
          <span className="text-2xl">🏛️</span>
          <span>
            justdovinay<span className="text-red-500">.com</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-sm font-medium text-muted-foreground hover:text-green-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-border px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-green-400 border-b border-border last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
