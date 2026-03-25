import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Gift, Trophy, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface ServiceCard {
  key: string;
  icon: string;
  name: string;
  description: string;
  portalName: string;
  url: string;
}

const MAIN_SERVICES: ServiceCard[] = [
  {
    key: "voter-id",
    icon: "🗳️",
    name: "Voter ID Card",
    description:
      "Register as a voter or apply for new Voter ID card. Essential for voting in all elections.",
    portalName: "voters.eci.gov.in",
    url: "https://voters.eci.gov.in",
  },
  {
    key: "passport",
    icon: "📘",
    name: "Passport Apply",
    description:
      "Apply for new passport or renew existing passport through official Passport Seva portal.",
    portalName: "passportindia.gov.in",
    url: "https://passportindia.gov.in",
  },
  {
    key: "pan-nsdl",
    icon: "💳",
    name: "PAN Card via NSDL",
    description:
      "Apply new PAN via NSDL official portal. Fast processing and reliable service.",
    portalName: "NSDL Official Portal",
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
  },
];

const MORE_SERVICES: ServiceCard[] = [
  {
    key: "aadhaar",
    icon: "🪪",
    name: "Aadhaar Card",
    description: "Update or download Aadhaar",
    portalName: "uidai.gov.in",
    url: "https://uidai.gov.in",
  },
  {
    key: "driving-licence",
    icon: "🚗",
    name: "Driving Licence",
    description: "Apply or renew driving licence",
    portalName: "sarathi.parivahan.gov.in",
    url: "https://sarathi.parivahan.gov.in",
  },
  {
    key: "ration-card",
    icon: "🌾",
    name: "Ration Card",
    description: "Apply for new ration card",
    portalName: "fcs.up.gov.in",
    url: "https://fcs.up.gov.in",
  },
  {
    key: "caste-certificate",
    icon: "📜",
    name: "Caste Certificate",
    description: "SC/ST/OBC certificate",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
  },
  {
    key: "birth-certificate",
    icon: "👶",
    name: "Birth Certificate",
    description: "Official birth document",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
  },
  {
    key: "income-certificate",
    icon: "💰",
    name: "Income Certificate",
    description: "Annual income certificate",
    portalName: "esathi.up.gov.in",
    url: "https://esathi.up.gov.in",
  },
  {
    key: "msme-udyam",
    icon: "🏭",
    name: "MSME / Udyam",
    description: "Business registration",
    portalName: "udyamregistration.gov.in",
    url: "https://udyamregistration.gov.in",
  },
  {
    key: "itr-filing",
    icon: "📊",
    name: "ITR Filing",
    description: "Income tax return filing",
    portalName: "incometax.gov.in",
    url: "https://www.incometax.gov.in",
  },
];

export default function DocumentApplyEarnSection() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const handleServiceClick = async (
    serviceKey: string,
    officialUrl: string,
  ) => {
    window.open(officialUrl, "_blank");
    if (!isLoggedIn || !actor) {
      toast.info("Service apply karo — owner ko ₹10 cashback milega!");
      return;
    }
    try {
      const actorAny = actor as any;
      const earned = await actorAny.recordServiceLinkClick(serviceKey);
      if (Number(earned) > 0) {
        toast.success("₹10 cashback owner ke wallet mein add ho gaya! 🎉");
        queryClient.invalidateQueries({ queryKey: ["wallet"] });
      } else {
        toast.info("Is service ka cashback pehle hi mil chuka hai.");
      }
    } catch (_e) {
      // silently fail
    }
  };

  return (
    <section id="apply-docs-earn" className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="h-8 w-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-foreground">
              Apply Documents & Owner Earns Cashback
            </h2>
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Koi bhi link click kare —{" "}
            <span className="font-bold text-green-400">
              ₹10 seedha owner ke wallet mein jata hai!
            </span>
          </p>
        </div>

        {/* Earn Banner */}
        <div
          data-ocid="earn.panel"
          className="rounded-2xl p-6 mb-10 text-center shadow-lg"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #f97316, #ef4444)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Gift className="h-7 w-7 text-white" />
            <h3 className="text-2xl font-extrabold text-white">
              🎁 Har Service Apply par ₹10 Owner Wallet Mein!
            </h3>
            <Gift className="h-7 w-7 text-white" />
          </div>
          <p className="text-white/95 text-base max-w-xl mx-auto font-medium">
            Neeche kisi bhi service link par click karein — har click par ₹10
            seedha website owner ke wallet mein jata hai!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Wallet className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-sm">
              {isLoggedIn
                ? "✅ Service click karein — owner ko cashback milega!"
                : "⚠️ Koi bhi service link click kare — owner ko ₹10 milenge"}
            </span>
          </div>
        </div>

        {/* Main 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MAIN_SERVICES.map((svc) => (
            <div
              key={svc.key}
              data-ocid={`earn.${svc.key}.card`}
              className="bg-card rounded-2xl shadow-lg border-2 border-amber-800/60 hover:border-amber-500 transition-all duration-200 hover:shadow-xl p-6 flex flex-col gap-4"
            >
              <div className="text-center">
                <span className="text-6xl block mb-3">{svc.icon}</span>
                <h3 className="text-xl font-extrabold text-foreground mb-2">
                  {svc.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {svc.description}
                </p>
                <Badge className="bg-blue-900/60 text-blue-300 border border-blue-700 text-xs">
                  {svc.portalName}
                </Badge>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  data-ocid={`earn.${svc.key}.primary_button`}
                  onClick={() => handleServiceClick(svc.key, svc.url)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base py-5 rounded-xl shadow-md"
                >
                  Apply Now — Owner Earns ₹10 🎁
                </Button>
                <a
                  href={svc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium py-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Official Site ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More Services Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span>🌟</span> More Services — Click & Owner Earns ₹10 Each
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MORE_SERVICES.map((svc) => (
              <div
                key={svc.key}
                data-ocid={`earn.more.${svc.key}.card`}
                className="bg-card rounded-xl shadow-md border border-amber-900/50 hover:border-green-500 hover:shadow-lg transition-all duration-200 p-4 flex flex-col gap-3"
              >
                <div className="text-center">
                  <span className="text-3xl block mb-1">{svc.icon}</span>
                  <h4 className="font-bold text-foreground text-sm">
                    {svc.name}
                  </h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    {svc.description}
                  </p>
                </div>
                <Button
                  data-ocid={`earn.more.${svc.key}.primary_button`}
                  size="sm"
                  onClick={() => handleServiceClick(svc.key, svc.url)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2"
                >
                  Apply & Owner Earns ₹10
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8 py-4 px-6 bg-amber-950/40 border border-amber-800 rounded-xl">
          <p className="text-sm text-amber-400 font-medium">
            ℹ️ Har unique visitor ki service click par ₹10 seedha website owner
            ke wallet mein credit hota hai!
          </p>
        </div>
      </div>
    </section>
  );
}
