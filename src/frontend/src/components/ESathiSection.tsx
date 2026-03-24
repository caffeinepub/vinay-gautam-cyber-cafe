import { Button } from "@/components/ui/button";
import {
  Award,
  Baby,
  Briefcase,
  Building2,
  ExternalLink,
  FileCheck,
  FileText,
  Fingerprint,
  Globe,
  Heart,
  Home,
  Landmark,
  ScrollText,
  ShieldCheck,
  Tractor,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const ESATHI_SERVICES = [
  {
    id: 1,
    name: "Jati Praman Patra",
    hindi: "जाति प्रमाण पत्र",
    description: "Apply for Caste Certificate (SC/ST/OBC) for UP residents.",
    icon: <FileCheck className="w-6 h-6" />,
    link: "https://esathi.up.gov.in/citizenmgt/services/casteService.do",
  },
  {
    id: 2,
    name: "Aay Praman Patra",
    hindi: "आय प्रमाण पत्र",
    description:
      "Apply for Income Certificate required for government schemes.",
    icon: <FileText className="w-6 h-6" />,
    link: "https://esathi.up.gov.in/citizenmgt/services/incomeService.do",
  },
  {
    id: 3,
    name: "Niwas Praman Patra",
    hindi: "निवास प्रमाण पत्र",
    description: "Domicile Certificate for UP residents — apply online.",
    icon: <Home className="w-6 h-6" />,
    link: "https://esathi.up.gov.in/citizenmgt/services/domicileService.do",
  },
  {
    id: 4,
    name: "Janm Praman Patra",
    hindi: "जन्म प्रमाण पत्र",
    description: "Apply for Birth Certificate from your local authority.",
    icon: <Baby className="w-6 h-6" />,
    link: "https://esathi.up.gov.in",
  },
  {
    id: 5,
    name: "Mrityu Praman Patra",
    hindi: "मृत्यु प्रमाण पत्र",
    description: "Apply for Death Certificate through the eSathi portal.",
    icon: <ScrollText className="w-6 h-6" />,
    link: "https://esathi.up.gov.in",
  },
  {
    id: 6,
    name: "Vridha Pension",
    hindi: "वृद्धावस्था पेंशन",
    description: "Old Age Pension scheme — apply and check status online.",
    icon: <Users className="w-6 h-6" />,
    link: "https://sspy-up.gov.in",
  },
  {
    id: 7,
    name: "Vidhwa Pension",
    hindi: "विधवा पेंशन",
    description: "Widow Pension scheme for women — apply via eSathi.",
    icon: <Heart className="w-6 h-6" />,
    link: "https://sspy-up.gov.in",
  },
  {
    id: 8,
    name: "Viklang Pension",
    hindi: "दिव्यांग पेंशन",
    description: "Disability Pension for physically challenged citizens of UP.",
    icon: <ShieldCheck className="w-6 h-6" />,
    link: "https://sspy-up.gov.in",
  },
  {
    id: 9,
    name: "Handicapped Certificate",
    hindi: "दिव्यांग प्रमाण पत्र",
    description: "Apply for Disability/Handicapped certificate for benefits.",
    icon: <Award className="w-6 h-6" />,
    link: "https://esathi.up.gov.in",
  },
  {
    id: 10,
    name: "Khatauni Nakal",
    hindi: "खतौनी नकल",
    description: "Download land record (Khatauni) copy from Bhulekh UP portal.",
    icon: <Tractor className="w-6 h-6" />,
    link: "https://upbhulekh.gov.in",
  },
  {
    id: 11,
    name: "Rozgar Registration",
    hindi: "रोजगार पंजीकरण",
    description: "Employment registration for job seekers at Sewayojan portal.",
    icon: <Briefcase className="w-6 h-6" />,
    link: "https://sewayojan.up.nic.in",
  },
  {
    id: 12,
    name: "Vivah Panjikaran",
    hindi: "विवाह पंजीकरण",
    description: "Register your marriage and get Marriage Certificate online.",
    icon: <Globe className="w-6 h-6" />,
    link: "https://igrsup.gov.in",
  },
  {
    id: 13,
    name: "Sampatti Panjikaran",
    hindi: "संपत्ति पंजीकरण",
    description:
      "Property registration and stamp duty calculation via IGRS UP.",
    icon: <Building2 className="w-6 h-6" />,
    link: "https://igrsup.gov.in",
  },
  {
    id: 14,
    name: "Jeevan Praman Patra",
    hindi: "जीवन प्रमाण पत्र",
    description: "Digital Life Certificate for pensioners — submit online.",
    icon: <Fingerprint className="w-6 h-6" />,
    link: "https://jeevanpramaan.gov.in",
  },
  {
    id: 15,
    name: "Ration Card",
    hindi: "राशन कार्ड",
    description: "Apply for new ration card or make corrections via FCS UP.",
    icon: <Landmark className="w-6 h-6" />,
    link: "https://fcs.up.gov.in",
  },
  {
    id: 16,
    name: "Haisiyat Praman Patra",
    hindi: "हैसियत प्रमाण पत्र",
    description:
      "Property/Financial status certificate for tenders and schemes.",
    icon: <FileCheck className="w-6 h-6" />,
    link: "https://esathi.up.gov.in",
  },
];

export default function ESathiSection() {
  return (
    <section
      id="esathi"
      className="py-20 bg-gradient-to-b from-orange-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <img
              src="https://esathi.up.gov.in/citizenmgt/resources/images/esathiLogo.png"
              alt="eSathi UP"
              className="h-5"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            UP Government Portal
          </div>
          <h2 className="section-heading">eSathi UP Services</h2>
          <p className="section-subheading">
            All Uttar Pradesh government services available on the official
            eSathi portal — apply directly with official links.
          </p>
          <a
            href="https://esathi.up.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open eSathi Portal
          </a>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ESATHI_SERVICES.map((svc, idx) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
              data-ocid={`esathi.item.${idx + 1}`}
            >
              <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600" />
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground leading-tight">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-orange-600 font-medium">
                      {svc.hindi}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {svc.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-auto"
                >
                  <a href={svc.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    Apply Now
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-6 bg-orange-600 rounded-2xl text-white"
        >
          <h3 className="text-xl font-bold mb-2">
            Need Help with eSathi Services?
          </h3>
          <p className="text-orange-100 text-sm mb-4">
            Contact Vinay Gautam at our center — we assist with all eSathi UP
            applications and documents.
          </p>
          <a
            href="tel:8384821357"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-2.5 rounded-full hover:bg-orange-50 transition-colors"
          >
            Call: 8384821357
          </a>
        </motion.div>
      </div>
    </section>
  );
}
