import { Skeleton } from "@/components/ui/skeleton";
import {
  Banknote,
  CreditCard,
  ExternalLink,
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
import { motion } from "motion/react";
import type { ServiceCategory } from "../backend.d";
import { useAllServices } from "../hooks/useQueries";

const STRIPE_COLORS: Record<string, string> = {
  aadhaar: "oklch(0.52 0.14 145)",
  pan: "oklch(0.74 0.16 60)",
  government: "oklch(0.26 0.075 242)",
  digital: "oklch(0.55 0.18 270)",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Fingerprint: <Fingerprint className="w-7 h-7" />,
  CreditCard: <CreditCard className="w-7 h-7" />,
  FileText: <FileText className="w-7 h-7" />,
  Users: <Users className="w-7 h-7" />,
  Home: <Home className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
  HeartPulse: <HeartPulse className="w-7 h-7" />,
  Tractor: <Tractor className="w-7 h-7" />,
  Globe: <Globe className="w-7 h-7" />,
  Printer: <Printer className="w-7 h-7" />,
  ScanLine: <ScanLine className="w-7 h-7" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7" />,
  Stamp: <Stamp className="w-7 h-7" />,
  Banknote: <Banknote className="w-7 h-7" />,
  Store: <Store className="w-7 h-7" />,
};

type FallbackService = {
  id: bigint;
  title: string;
  description: string;
  iconName: string;
  category: string;
  officialLink?: string;
};

const FALLBACK_SERVICES: FallbackService[] = [
  {
    id: 1n,
    title: "Aadhaar Services",
    description:
      "New enrollment, update address, mobile & biometric corrections.",
    iconName: "Fingerprint",
    category: "aadhaar",
    officialLink: "https://myaadhaar.uidai.gov.in",
  },
  {
    id: 2n,
    title: "PAN Card",
    description:
      "Apply for new PAN, corrections, reprint, and linking with Aadhaar.",
    iconName: "CreditCard",
    category: "pan",
    officialLink:
      "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
  },
  {
    id: 3n,
    title: "Income Tax Return",
    description: "File ITR-1 to ITR-4, e-verify, and track refund status.",
    iconName: "FileText",
    category: "government",
    officialLink: "https://www.incometax.gov.in",
  },
  {
    id: 4n,
    title: "Voter ID (EPIC)",
    description: "New voter registration, address change, and corrections.",
    iconName: "Users",
    category: "government",
    officialLink: "https://voterportal.eci.gov.in",
  },
  {
    id: 5n,
    title: "Passport Services",
    description: "Online application, Tatkal passport, and renewals.",
    iconName: "Globe",
    category: "government",
    officialLink: "https://passportindia.gov.in",
  },
  {
    id: 6n,
    title: "PM Awas Yojana",
    description:
      "Apply for housing scheme, status check, and document submission.",
    iconName: "Home",
    category: "government",
    officialLink: "https://pmaymis.gov.in",
  },
  {
    id: 7n,
    title: "PM Kisan Samman",
    description: "Registration, beneficiary status, and installment tracking.",
    iconName: "Tractor",
    category: "government",
    officialLink: "https://pmkisan.gov.in",
  },
  {
    id: 8n,
    title: "Ayushman Bharat",
    description:
      "Health card generation, hospital empanelment, and claim status.",
    iconName: "HeartPulse",
    category: "government",
    officialLink: "https://pmjay.gov.in",
  },
  {
    id: 9n,
    title: "PMKVY Skill Training",
    description: "Register for skill development courses under PMKVY.",
    iconName: "GraduationCap",
    category: "government",
    officialLink: "https://pmkvyofficial.org",
  },
  {
    id: 10n,
    title: "Print & Scan",
    description: "High-quality printing, scanning, and lamination services.",
    iconName: "Printer",
    category: "digital",
  },
  {
    id: 11n,
    title: "Digital Signature",
    description: "Class 2 & 3 DSC issuance for GST, MCA, and tender filings.",
    iconName: "ShieldCheck",
    category: "digital",
  },
  {
    id: 12n,
    title: "e-KYC / NSDL",
    description: "e-KYC verification for PAN, Aadhaar, and bank KYC processes.",
    iconName: "ScanLine",
    category: "aadhaar",
  },
  {
    id: 13n,
    title: "Driving Licence",
    description: "Apply, renew, or update your driving licence via Parivahan.",
    iconName: "Globe",
    category: "government",
    officialLink: "https://parivahan.gov.in",
  },
  {
    id: 14n,
    title: "Caste Certificate",
    description: "Apply for caste certificate through e-District UP portal.",
    iconName: "FileText",
    category: "government",
    officialLink: "https://edistrict.up.gov.in",
  },
  {
    id: 15n,
    title: "Birth Certificate",
    description: "Apply and download birth certificate from CRS portal.",
    iconName: "Stamp",
    category: "government",
    officialLink: "https://crsorgi.gov.in",
  },
  {
    id: 16n,
    title: "MSME / Udyam Certificate",
    description: "Register your enterprise and download Udyam certificate.",
    iconName: "Store",
    category: "digital",
    officialLink: "https://udyamregistration.gov.in",
  },
  {
    id: 17n,
    title: "Bank Account (Jan Dhan)",
    description: "Open a zero-balance Jan Dhan savings account.",
    iconName: "Banknote",
    category: "government",
    officialLink: "https://pmjdy.gov.in",
  },
];

export default function ServicesSection() {
  const { data: services, isLoading } = useAllServices();
  const displayServices =
    services && services.length > 0
      ? (services as unknown as FallbackService[])
      : FALLBACK_SERVICES;

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Key Services We Offer
          </motion.h2>
          <p className="section-subheading">
            From Aadhaar to PAN, government schemes to digital printing — all
            under one roof.
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="services.loading_state"
          >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => (
              <Skeleton key={id} className="h-44 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((svc, idx) => {
              const cat = String(svc.category) as ServiceCategory | string;
              const stripe = STRIPE_COLORS[cat] ?? STRIPE_COLORS.digital;
              const icon = ICON_MAP[svc.iconName] ?? (
                <Globe className="w-7 h-7" />
              );
              const officialLink = (svc as FallbackService).officialLink;
              return (
                <motion.div
                  key={String(svc.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group flex flex-col"
                  data-ocid={`services.item.${idx + 1}`}
                >
                  <div
                    className="h-1.5 w-full"
                    style={{ background: stripe }}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white"
                      style={{ background: stripe }}
                    >
                      {icon}
                    </div>
                    <h3 className="font-bold text-base text-card-foreground mb-1 group-hover:text-accent transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {svc.description}
                    </p>
                    {officialLink && (
                      <a
                        href={officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: stripe }}
                        data-ocid={`services.link.${idx + 1}`}
                      >
                        <ExternalLink className="w-3 h-3" /> Visit Portal
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
