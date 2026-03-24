import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  ExternalLink,
  FileCheck,
  FileText,
  Flame,
  Globe,
  Heart,
  Home,
  Leaf,
  ShieldCheck,
  Smartphone,
  Store,
  Tractor,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const APPLY_SERVICES = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Apply for New PAN Card",
    description: "Submit Form 49A for a fresh PAN card issuance online.",
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "PAN Card Correction",
    description: "Update name, DOB, or address on your existing PAN card.",
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Open Savings Account (Jan Dhan)",
    description: "Open a zero-balance bank account under PM Jan Dhan Yojana.",
    link: "https://pmjdy.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <Tractor className="w-6 h-6" />,
    title: "PM Kisan Samman Nidhi",
    description: "Register farmers for ₹6,000/year direct income support.",
    link: "https://pmkisan.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "PM Awas Yojana",
    description: "Apply for affordable housing under the rural/urban scheme.",
    link: "https://pmaymis.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Ayushman Bharat (PMJAY)",
    description: "Get ₹5 lakh health insurance cover for your family.",
    link: "https://pmjay.gov.in",
    color: "oklch(0.60 0.16 30)",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "E-Shram Card",
    description: "Register as unorganised worker for social security benefits.",
    link: "https://eshram.gov.in",
    color: "oklch(0.55 0.18 270)",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "PMKVY Skill Training",
    description: "Enroll in free skill development courses under PMKVY.",
    link: "https://pmkvyofficial.org",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <Store className="w-6 h-6" />,
    title: "PM SVANidhi (Street Vendor)",
    description: "Micro-credit loans for street vendors to grow business.",
    link: "https://pmsvanidhi.mohua.gov.in",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "PM Mudra Yojana",
    description: "Collateral-free loans up to ₹10 lakh for small businesses.",
    link: "https://www.mudra.org.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "PM Ujjwala Yojana",
    description: "Free LPG connection for BPL women under this scheme.",
    link: "https://pmuy.gov.in",
    color: "oklch(0.60 0.16 30)",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sukanya Samriddhi Yojana",
    description: "Savings scheme for the girl child with high interest rate.",
    link: "https://www.nsiindia.gov.in",
    color: "oklch(0.55 0.18 270)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Voter Registration (New)",
    description:
      "Register as a new voter online on the Election Commission portal.",
    link: "https://voterportal.eci.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "DigiLocker (Document Storage)",
    description:
      "Store and access your official documents digitally via DigiLocker.",
    link: "https://digilocker.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "GST Registration",
    description: "Register your business on the GST portal for tax compliance.",
    link: "https://www.gst.gov.in",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Income Tax Return (ITR)",
    description:
      "File your annual Income Tax Return on the official IT portal.",
    link: "https://www.incometax.gov.in",
    color: "oklch(0.60 0.16 30)",
  },
];

export default function ApplyOnlineSection() {
  return (
    <section id="apply" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "oklch(0.26 0.075 242 / 0.12)",
              color: "oklch(0.26 0.075 242)",
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" /> Official Portals
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Apply for Government Services
          </motion.h2>
          <p className="section-subheading">
            Apply online through official portals — we help you with every step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {APPLY_SERVICES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group flex flex-col"
              data-ocid={`apply.item.${idx + 1}`}
            >
              <div
                className="h-1.5 w-full"
                style={{ background: item.color }}
              />
              <div className="p-5 flex flex-col flex-1">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 text-white flex-shrink-0"
                  style={{ background: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-card-foreground mb-1 group-hover:text-accent transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                  data-ocid={`apply.primary_button.${idx + 1}`}
                >
                  <Button
                    size="sm"
                    className="w-full font-semibold text-white text-xs"
                    style={{ background: item.color }}
                  >
                    <ExternalLink className="w-3 h-3 mr-1.5" />
                    Apply Now
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
