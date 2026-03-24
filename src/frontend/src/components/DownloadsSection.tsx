import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  FileText,
  Fingerprint,
  Globe,
  IdCard,
  ShieldCheck,
  Stamp,
  Star,
  Stethoscope,
} from "lucide-react";
import { motion } from "motion/react";

const DOWNLOADS = [
  {
    icon: <Fingerprint className="w-7 h-7" />,
    title: "Aadhaar Card Download",
    description: "Download e-Aadhaar in PDF format using Enrolment ID or VID.",
    link: "https://myaadhaar.uidai.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <IdCard className="w-7 h-7" />,
    title: "PAN Card Download",
    description: "Download your PAN card in ePAN PDF format from NSDL portal.",
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Voter ID Card (EPIC)",
    description: "Download e-EPIC (digital Voter ID) from Election Commission.",
    link: "https://voterportal.eci.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "Driving Licence",
    description:
      "Download your Driving Licence certificate via Parivahan portal.",
    link: "https://parivahan.gov.in/parivahan/en/content/driving-licence-0",
    color: "oklch(0.55 0.18 270)",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Passport",
    description:
      "Track application and access passport services at Passport Seva.",
    link: "https://passportindia.gov.in",
    color: "oklch(0.60 0.16 30)",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Caste Certificate (UP)",
    description: "Download caste certificate issued via e-District UP portal.",
    link: "https://edistrict.up.gov.in",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <Stamp className="w-7 h-7" />,
    title: "Birth Certificate",
    description: "Access and download your birth certificate from CRS portal.",
    link: "https://crsorgi.gov.in",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <Stethoscope className="w-7 h-7" />,
    title: "MSME / Udyam Certificate",
    description: "Download Udyam Registration certificate for your enterprise.",
    link: "https://udyamregistration.gov.in",
    color: "oklch(0.26 0.075 242)",
  },
];

export default function DownloadsSection() {
  return (
    <section id="downloads" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "oklch(0.52 0.14 145 / 0.12)",
              color: "oklch(0.42 0.14 145)",
            }}
          >
            <Download className="w-3.5 h-3.5" /> Instant Downloads
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Download Your Documents
          </motion.h2>
          <p className="section-subheading">
            Get instant access to official portals for all your document
            downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DOWNLOADS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group flex flex-col"
              data-ocid={`downloads.item.${idx + 1}`}
            >
              <div
                className="h-1.5 w-full"
                style={{ background: item.color }}
              />
              <div className="p-5 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white flex-shrink-0"
                  style={{ background: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-card-foreground mb-1 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                  data-ocid={`downloads.primary_button.${idx + 1}`}
                >
                  <Button
                    size="sm"
                    className="w-full font-semibold text-white"
                    style={{ background: item.color }}
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    Download Now
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
