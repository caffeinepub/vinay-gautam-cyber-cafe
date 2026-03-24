import {
  Facebook,
  Instagram,
  MapPin,
  MonitorSmartphone,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Downloads", id: "downloads" },
  { label: "Apply Online", id: "apply" },
  { label: "Government Schemes", id: "schemes" },
  { label: "Latest Updates", id: "updates" },
  { label: "Book Appointment", id: "book" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  "Aadhaar Services",
  "PAN Card",
  "ITR Filing",
  "Voter ID",
  "Passport",
  "PM Kisan",
  "Ayushman Bharat",
  "E-Shram Card",
];

interface Props {
  onScrollTo: (id: string) => void;
}

export default function Footer({ onScrollTo }: Props) {
  return (
    <footer style={{ background: "#0B2A4A" }} className="text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <MonitorSmartphone className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-extrabold tracking-wide">
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
            <p className="text-white/60 text-sm leading-relaxed">
              Your trusted partner for all digital and government services in
              Greater Noida. Fast, reliable, and certified.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Facebook, href: "#", name: "facebook" },
                { Icon: Twitter, href: "#", name: "twitter" },
                { Icon: Instagram, href: "#", name: "instagram" },
                { Icon: Youtube, href: "#", name: "youtube" },
              ].map(({ Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onScrollTo(link.id)}
                    className="text-sm text-white/60 hover:text-white transition-colors text-left"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-white/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Bilaspur, Greater Noida, Gautam Buddh Nagar, UP – 201009
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4" />
                +91 83848 21357
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4" />
                Contact: 8384821357
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} Vinay Gautam Cyber Cafe. All Rights
            Reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
