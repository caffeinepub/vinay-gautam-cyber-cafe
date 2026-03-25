import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ServiceCard {
  key: string;
  icon: string;
  name: string;
  nameHindi: string;
  description: string;
  portalName: string;
  url: string;
  buttonLabel: string;
}

const MAIN_SERVICES: ServiceCard[] = [
  {
    key: "voter-id",
    icon: "🗳️",
    name: "Voter ID Card",
    nameHindi: "मतदाता पहचान पत्र",
    description:
      "ECI ke official portal par naya Voter ID card ke liye apply karein ya existing card update karein.",
    portalName: "voters.eci.gov.in",
    url: "https://voters.eci.gov.in",
    buttonLabel: "Apply on ECI Portal",
  },
  {
    key: "passport",
    icon: "📘",
    name: "Passport Application",
    nameHindi: "पासपोर्ट आवेदन",
    description:
      "Naya passport apply karein ya purana renew karein official Passport Seva portal ke through.",
    portalName: "passportindia.gov.in",
    url: "https://passportindia.gov.in",
    buttonLabel: "Apply on Passport Seva",
  },
  {
    key: "udyam",
    icon: "🏭",
    name: "Udyam / MSME Certificate",
    nameHindi: "उद्यम प्रमाण पत्र",
    description:
      "Apna business register karein aur Udyam Certificate prapt karein MSME official portal se.",
    portalName: "udyamregistration.gov.in",
    url: "https://udyamregistration.gov.in",
    buttonLabel: "Apply on Udyam Portal",
  },
];

const MORE_SERVICES: ServiceCard[] = [
  {
    key: "pan-nsdl",
    icon: "💳",
    name: "PAN Card (NSDL)",
    nameHindi: "पैन कार्ड",
    description: "NSDL official portal se apply karein",
    portalName: "onlineservices.nsdl.com",
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    buttonLabel: "Apply on NSDL",
  },
  {
    key: "aadhaar",
    icon: "🪪",
    name: "Aadhaar Card",
    nameHindi: "आधार कार्ड",
    description: "Update or download Aadhaar",
    portalName: "uidai.gov.in",
    url: "https://uidai.gov.in",
    buttonLabel: "Go to UIDAI",
  },
  {
    key: "driving-licence",
    icon: "🚗",
    name: "Driving Licence",
    nameHindi: "ड्राइविंग लाइसेंस",
    description: "Apply or renew DL online",
    portalName: "sarathi.parivahan.gov.in",
    url: "https://sarathi.parivahan.gov.in",
    buttonLabel: "Apply on Sarathi",
  },
  {
    key: "ration-card",
    icon: "🌾",
    name: "Ration Card",
    nameHindi: "राशन कार्ड",
    description: "Apply for new ration card",
    portalName: "fcs.up.gov.in",
    url: "https://fcs.up.gov.in",
    buttonLabel: "Apply Now",
  },
  {
    key: "caste-certificate",
    icon: "📜",
    name: "Caste Certificate",
    nameHindi: "जाति प्रमाण पत्र",
    description: "SC/ST/OBC certificate via eSathi",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
    buttonLabel: "Apply on eSathi",
  },
  {
    key: "birth-certificate",
    icon: "👶",
    name: "Birth Certificate",
    nameHindi: "जन्म प्रमाण पत्र",
    description: "Official birth document",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
    buttonLabel: "Apply on eSathi",
  },
  {
    key: "income-certificate",
    icon: "💰",
    name: "Income Certificate",
    nameHindi: "आय प्रमाण पत्र",
    description: "Annual income certificate",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
    buttonLabel: "Apply on eSathi",
  },
  {
    key: "itr-filing",
    icon: "📊",
    name: "ITR Filing",
    nameHindi: "आयकर रिटर्न",
    description: "Income tax return filing",
    portalName: "incometax.gov.in",
    url: "https://www.incometax.gov.in",
    buttonLabel: "File ITR",
  },
];

export default function DocumentApplyEarnSection() {
  const handleServiceClick = (officialUrl: string) => {
    window.open(officialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="apply-docs" className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            📋 Sarkari Documents ke liye Apply Karein
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seedha official government portals par apply karein — koi agent
            nahi, koi extra charge nahi.
          </p>
        </div>

        {/* Top 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MAIN_SERVICES.map((svc) => (
            <div
              key={svc.key}
              data-ocid={`apply.${svc.key}.card`}
              className="bg-card rounded-2xl shadow-lg border-2 border-orange-400 hover:border-orange-500 transition-all duration-200 hover:shadow-xl p-6 flex flex-col gap-4"
            >
              <div className="text-center">
                <span className="text-6xl block mb-3">{svc.icon}</span>
                <h3 className="text-xl font-extrabold text-foreground mb-1">
                  {svc.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {svc.nameHindi}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {svc.description}
                </p>
                <Badge className="bg-blue-900 text-white border-0 text-xs">
                  {svc.portalName}
                </Badge>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  data-ocid={`apply.${svc.key}.primary_button`}
                  onClick={() => handleServiceClick(svc.url)}
                  className="w-full bg-[#138808] hover:bg-green-800 text-white font-bold text-base py-5 rounded-xl shadow-md"
                >
                  {svc.buttonLabel} ↗
                </Button>
                <a
                  href={svc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 text-sm text-blue-700 hover:text-blue-900 font-medium py-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Official Website: {svc.portalName}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More Services Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span>🌟</span> Aur Sarkari Services — Official Portals
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MORE_SERVICES.map((svc) => (
              <div
                key={svc.key}
                data-ocid={`apply.more.${svc.key}.card`}
                className="bg-card rounded-xl shadow-md border border-orange-200 hover:border-orange-500 hover:shadow-lg transition-all duration-200 p-4 flex flex-col gap-3"
              >
                <div className="text-center">
                  <span className="text-3xl block mb-1">{svc.icon}</span>
                  <h4 className="font-bold text-foreground text-sm">
                    {svc.name}
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    {svc.description}
                  </p>
                  <p className="text-blue-700 text-xs mt-1 truncate">
                    {svc.portalName}
                  </p>
                </div>
                <Button
                  data-ocid={`apply.more.${svc.key}.primary_button`}
                  size="sm"
                  onClick={() => handleServiceClick(svc.url)}
                  className="w-full bg-[#138808] hover:bg-green-800 text-white font-semibold text-xs py-2"
                >
                  {svc.buttonLabel} ↗
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="text-center mt-8 py-4 px-6 bg-blue-900 border border-blue-800 rounded-xl">
          <p className="text-sm text-white font-medium">
            ℹ️ Saare links seedha official government websites par kholte hain —
            100% safe & authentic.
          </p>
        </div>
      </div>
    </section>
  );
}
