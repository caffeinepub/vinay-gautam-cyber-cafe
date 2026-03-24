import {
  Banknote,
  CreditCard,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  Printer,
  ScanLine,
  ShieldCheck,
  Stamp,
  Store,
  Tractor,
  Users,
} from "lucide-react";

const ALL_SERVICES = [
  {
    title: "Aadhaar",
    icon: <Fingerprint className="w-6 h-6" />,
    link: "https://myaadhaar.uidai.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    title: "PAN Card",
    icon: <CreditCard className="w-6 h-6" />,
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    color: "oklch(0.74 0.16 60)",
  },
  {
    title: "Income Tax",
    icon: <FileText className="w-6 h-6" />,
    link: "https://www.incometax.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    title: "Voter ID",
    icon: <Users className="w-6 h-6" />,
    link: "https://voterportal.eci.gov.in",
    color: "oklch(0.55 0.18 270)",
  },
  {
    title: "Passport",
    icon: <Globe className="w-6 h-6" />,
    link: "https://passportindia.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    title: "PM Awas",
    icon: <Home className="w-6 h-6" />,
    link: "https://pmaymis.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    title: "PM Kisan",
    icon: <Tractor className="w-6 h-6" />,
    link: "https://pmkisan.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    title: "Ayushman",
    icon: <HeartPulse className="w-6 h-6" />,
    link: "https://pmjay.gov.in",
    color: "oklch(0.55 0.18 270)",
  },
  {
    title: "PMKVY",
    icon: <GraduationCap className="w-6 h-6" />,
    link: "https://pmkvyofficial.org",
    color: "oklch(0.26 0.075 242)",
  },
  {
    title: "Print & Scan",
    icon: <Printer className="w-6 h-6" />,
    link: "#services",
    color: "oklch(0.55 0.18 270)",
  },
  {
    title: "Digital Sign",
    icon: <ShieldCheck className="w-6 h-6" />,
    link: "#services",
    color: "oklch(0.74 0.16 60)",
  },
  {
    title: "e-KYC",
    icon: <ScanLine className="w-6 h-6" />,
    link: "#services",
    color: "oklch(0.52 0.14 145)",
  },
  {
    title: "Driving Lic.",
    icon: <Globe className="w-6 h-6" />,
    link: "https://parivahan.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    title: "Caste Cert.",
    icon: <FileText className="w-6 h-6" />,
    link: "https://edistrict.up.gov.in",
    color: "oklch(0.74 0.16 60)",
  },
  {
    title: "Birth Cert.",
    icon: <Stamp className="w-6 h-6" />,
    link: "https://crsorgi.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    title: "MSME/Udyam",
    icon: <Store className="w-6 h-6" />,
    link: "https://udyamregistration.gov.in",
    color: "oklch(0.55 0.18 270)",
  },
  {
    title: "Jan Dhan",
    icon: <Banknote className="w-6 h-6" />,
    link: "https://pmjdy.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
];

export default function ServicesAidBar() {
  return (
    <div
      className="w-full bg-white border-b shadow-sm"
      data-ocid="services_aid_bar"
    >
      {/* Label */}
      <div
        className="text-center py-1.5 text-xs font-bold tracking-widest uppercase text-white"
        style={{ background: "oklch(0.26 0.075 242)" }}
      >
        Quick Access — All Government &amp; Digital Services
      </div>

      {/* Scrollable icon strip */}
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-0 min-w-max">
          {ALL_SERVICES.map((svc) => (
            <a
              key={svc.title}
              href={svc.link}
              target={svc.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 px-4 py-3 min-w-[80px] hover:bg-muted transition-colors border-r last:border-r-0 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform"
                style={{ background: svc.color }}
              >
                {svc.icon}
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
                {svc.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
