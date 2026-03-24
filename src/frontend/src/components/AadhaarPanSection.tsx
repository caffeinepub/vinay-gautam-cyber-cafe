import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownToLine,
  BadgeCheck,
  CreditCard,
  FilePen,
  FileSearch,
  FileText,
  Fingerprint,
  KeyRound,
  Link2,
  Lock,
  MapPin,
  Phone,
  Printer,
  RefreshCw,
  ScanEye,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

const AADHAAR_SERVICES = [
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "New Aadhaar Enrollment",
    desc: "Register for your first Aadhaar card with biometric & document verification.",
  },
  {
    icon: <FilePen className="w-6 h-6" />,
    title: "Aadhaar Update",
    desc: "Update Name, Date of Birth, Address, Mobile Number, or Email on your Aadhaar.",
  },
  {
    icon: <ArrowDownToLine className="w-6 h-6" />,
    title: "Aadhaar Download (e-Aadhaar)",
    desc: "Download your official e-Aadhaar PDF directly from UIDAI portal.",
  },
  {
    icon: <Printer className="w-6 h-6" />,
    title: "Aadhaar PVC Card Print",
    desc: "Order a durable PVC Aadhaar card with QR code — wallet-friendly and official.",
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "Aadhaar Linking",
    desc: "Link Aadhaar with your Bank Account, Mobile Number, or LPG connection.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Aadhaar Lock / Unlock",
    desc: "Secure your biometrics by locking or unlocking Aadhaar authentication.",
  },
  {
    icon: <KeyRound className="w-6 h-6" />,
    title: "Aadhaar OTP Verification",
    desc: "Complete Aadhaar-based OTP verification for banking, SIM, and government portals.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Address Update via Document",
    desc: "Update your residential address using supported proof-of-address documents.",
  },
];

const PAN_SERVICES = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "New PAN Card (Form 49A)",
    desc: "Apply for a new PAN card online with instant e-KYC through NSDL / UTI portal.",
  },
  {
    icon: <FilePen className="w-6 h-6" />,
    title: "PAN Card Correction / Update",
    desc: "Correct your Name, Date of Birth, Father's Name, or signature on your PAN.",
  },
  {
    icon: <Printer className="w-6 h-6" />,
    title: "PAN Card Reprint / Duplicate",
    desc: "Request a reprint of your existing PAN card if lost, damaged, or faded.",
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "PAN–Aadhaar Linking",
    desc: "Link your PAN card with Aadhaar as mandated by Income Tax Department.",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "PAN Verification",
    desc: "Instantly verify PAN card status and authenticity through official portals.",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Minor to Major PAN Update",
    desc: "Update PAN details when a minor card holder turns 18 years of age.",
  },
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: "Lost PAN Card Reprint",
    desc: "Get a duplicate PAN card reprinted if your original is lost or stolen.",
  },
  {
    icon: <ScanEye className="w-6 h-6" />,
    title: "Online PAN Status Check",
    desc: "Track your PAN application status and expected delivery date online.",
  },
];

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  stripeColor: string;
  iconBg: string;
  idx: number;
}

function ServiceCard({
  icon,
  title,
  desc,
  stripeColor,
  iconBg,
  idx,
}: ServiceCardProps) {
  const handleGetItDone = () => {
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04 }}
      className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group flex flex-col"
      data-ocid={`aadhaar-pan.item.${idx + 1}`}
    >
      <div className="h-1.5 w-full" style={{ background: stripeColor }} />
      <div className="p-5 flex flex-col flex-1">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 text-white shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <h3 className="font-bold text-sm text-card-foreground mb-1.5 group-hover:text-accent transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
          {desc}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleGetItDone}
          className="w-full text-xs font-semibold border-current hover:bg-accent hover:text-white hover:border-accent transition-colors"
          style={{ color: stripeColor, borderColor: stripeColor }}
          data-ocid={`aadhaar-pan.button.${idx + 1}`}
        >
          Get This Done
        </Button>
      </div>
    </motion.div>
  );
}

export default function AadhaarPanSection() {
  const aadhaarGreen = "oklch(0.52 0.14 145)";
  const panOrange = "oklch(0.74 0.16 60)";

  return (
    <section id="aadhaar-pan" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden mb-12 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.26 0.075 242) 0%, oklch(0.2 0.06 242) 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
            style={{ background: aadhaarGreen }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full opacity-10"
            style={{ background: panOrange }}
          />

          <div
            className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl shrink-0"
            style={{ background: "oklch(1 0 0 / 0.08)" }}
          >
            <Fingerprint className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-2">
              <Badge
                className="text-xs font-bold px-3 py-1"
                style={{ background: aadhaarGreen, color: "white" }}
              >
                Aadhaar Certified
              </Badge>
              <Badge
                className="text-xs font-bold px-3 py-1"
                style={{ background: panOrange, color: "white" }}
              >
                PAN Services
              </Badge>
              <Badge
                className="text-xs font-bold px-3 py-1 animate-pulse"
                style={{ background: "oklch(0.55 0.18 30)", color: "white" }}
              >
                ✓ Same Day Delivery
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              Aadhaar & PAN Card Services
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              All work done{" "}
              <span className="text-yellow-300 font-semibold">same day</span> —
              no waiting, no middlemen. Authorised Enrollment Centre by UIDAI &
              NSDL.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              onClick={() => {
                const el = document.getElementById("book");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-bold px-6 py-2.5 text-sm"
              style={{ background: panOrange, color: "white" }}
              data-ocid="aadhaar-pan.primary_button"
            >
              Book Appointment
            </Button>
          </div>
        </motion.div>

        {/* Section Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Aadhaar & PAN Services
          </motion.h2>
          <p className="section-subheading">
            Complete end-to-end assistance for all UIDAI and Income Tax
            Department services.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="aadhaar">
          <TabsList
            className="flex w-full md:w-auto mx-auto mb-8 rounded-xl p-1 gap-1"
            style={{ background: "oklch(0.96 0.01 242)" }}
            data-ocid="aadhaar-pan.tab"
          >
            <TabsTrigger
              value="aadhaar"
              className="flex-1 md:flex-none rounded-lg px-6 py-2.5 text-sm font-bold data-[state=active]:text-white transition-colors"
              style={{}}
              data-ocid="aadhaar-pan.tab"
            >
              <Fingerprint className="w-4 h-4 mr-2 inline" />
              Aadhaar Services
            </TabsTrigger>
            <TabsTrigger
              value="pan"
              className="flex-1 md:flex-none rounded-lg px-6 py-2.5 text-sm font-bold data-[state=active]:text-white transition-colors"
              data-ocid="aadhaar-pan.tab"
            >
              <CreditCard className="w-4 h-4 mr-2 inline" />
              PAN Card Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aadhaar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {AADHAAR_SERVICES.map((svc, idx) => (
                <ServiceCard
                  key={svc.title}
                  icon={svc.icon}
                  title={svc.title}
                  desc={svc.desc}
                  stripeColor={aadhaarGreen}
                  iconBg={aadhaarGreen}
                  idx={idx}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  className="w-4 h-4"
                  style={{ color: aadhaarGreen }}
                />
                UIDAI Authorised Operator
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" style={{ color: aadhaarGreen }} />
                Aadhaar Helpline: 1947
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" style={{ color: aadhaarGreen }} />
                Bring original ID + address proof
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pan">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {PAN_SERVICES.map((svc, idx) => (
                <ServiceCard
                  key={svc.title}
                  icon={svc.icon}
                  title={svc.title}
                  desc={svc.desc}
                  stripeColor={panOrange}
                  iconBg={panOrange}
                  idx={idx}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" style={{ color: panOrange }} />
                NSDL / UTI Authorised Agent
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" style={{ color: panOrange }} />
                PAN Helpline: 020-27218080
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" style={{ color: panOrange }} />
                Bring Aadhaar + Photo + Proof
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
