import { Button } from "@/components/ui/button";
import { Menu, MonitorSmartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Downloads", id: "downloads" },
  { label: "Apply Online", id: "apply" },
  { label: "Aadhaar & PAN", id: "aadhaar-pan" },
  { label: "eSathi UP", id: "esathi" },
  { label: "Finance & Bank", id: "finance-bank" },
  { label: "Schemes", id: "schemes" },
  { label: "Updates", id: "updates" },
  { label: "Contact", id: "contact" },
];

interface Props {
  onGoAdmin: () => void;
  onScrollTo: (id: string) => void;
}

export default function Navbar({ onGoAdmin, onScrollTo }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    onScrollTo(id);
    setMobileOpen(false);
    setActive(id);
  };

  return (
    <header
      className={`sticky top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2" data-ocid="nav.link">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <MonitorSmartphone className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-extrabold text-primary tracking-wide">
              VINAY GAUTAM
            </span>
            <span
              className="block text-xs font-bold"
              style={{ color: "oklch(0.52 0.14 145)" }}
            >
              CYBER CAFE
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`nav-link text-xs px-2.5 py-2 ${
                active === link.id ? "active" : ""
              } ${
                link.id === "esathi"
                  ? "text-orange-600 font-bold"
                  : link.id === "finance-bank"
                    ? "text-green-700 font-bold"
                    : ""
              }`}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => handleNav("book")}
            className="bg-accent text-white hover:bg-accent/90 font-semibold"
            data-ocid="nav.primary_button"
          >
            Book Appointment
          </Button>
          <button
            type="button"
            onClick={onGoAdmin}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Admin
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-left py-2 text-sm font-medium ${
                active === link.id
                  ? "text-accent"
                  : link.id === "esathi"
                    ? "text-orange-600 font-bold"
                    : link.id === "finance-bank"
                      ? "text-green-700 font-bold"
                      : "text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            onClick={() => handleNav("book")}
            className="bg-accent text-white font-semibold mt-1"
          >
            Book Appointment
          </Button>
          <button
            type="button"
            onClick={onGoAdmin}
            className="text-xs text-muted-foreground text-left"
          >
            Admin Panel
          </button>
        </div>
      )}
    </header>
  );
}
