import { Button } from "@/components/ui/button";
import { Clock, Download, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const CONTACT_ITEMS = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Address",
    value:
      "Bilaspur, Greater Noida, Gautam Buddh Nagar, Uttar Pradesh – 201009",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 83848 21357",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "WhatsApp",
    value: "8384821357",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 4:00 PM",
  },
];

function InstallAppButton() {
  const handleInstall = () => {
    const win = window as unknown as {
      __pwaInstallPrompt?: { prompt: () => void };
    };
    if (win.__pwaInstallPrompt) {
      win.__pwaInstallPrompt.prompt();
    } else {
      alert(
        "To install the app:\n\n" +
          "Android (Chrome): Tap the menu (⋮) → 'Add to Home Screen' or look for the Install banner.\n\n" +
          "iPhone (Safari): Tap Share → 'Add to Home Screen'.\n\n" +
          "Computer (Chrome): Click the install icon (⊕) in the address bar.",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-6 p-5 rounded-2xl border border-border bg-card shadow-sm"
    >
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
        Download Our App
      </p>
      <p className="text-sm text-foreground mb-4">
        Install <strong>justdovinay.com</strong> on your phone and access all
        government services anytime, anywhere.
      </p>
      <Button
        onClick={handleInstall}
        className="w-full gap-2 font-bold text-base py-5"
        style={{ background: "oklch(0.52 0.14 145)", color: "#fff" }}
      >
        <Download className="w-5 h-5" />
        Download App
      </Button>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Works on Android, iPhone & Computer — no Play Store needed.
      </p>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Contact Us
          </motion.h2>
          <p className="section-subheading">
            Visit us in person or reach out — we're happy to help.
          </p>

          {/* Owner photo in big circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-8 mb-4"
          >
            <div
              className="rounded-full overflow-hidden border-4 shadow-lg"
              style={{
                width: 160,
                height: 160,
                borderColor: "oklch(0.52 0.14 145)",
              }}
            >
              <img
                src="/assets/uploads/img_20250924_091131-019d2019-dd09-703c-93d0-031663d7f545-1.png"
                alt="Vinay Gautam"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="mt-3 font-bold text-lg text-foreground">
              Vinay Gautam
            </p>
            <p className="text-sm text-muted-foreground">
              Owner of justdovinay.com
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info + Download button */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Download App Button */}
            <InstallAppButton />
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-card bg-card border border-border min-h-64 flex items-center justify-center"
          >
            <div
              className="w-full h-64 relative flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.26 0.075 242 / 0.1) 0%, oklch(0.52 0.14 145 / 0.1) 100%)",
              }}
            >
              <div className="text-center">
                <MapPin
                  className="w-12 h-12 mx-auto mb-3"
                  style={{ color: "oklch(0.52 0.14 145)" }}
                />
                <p className="font-bold text-foreground">
                  Vinay Gautam Cyber Cafe
                </p>
                <p className="text-sm text-muted-foreground">
                  Bilaspur, Greater Noida, Gautam Buddh Nagar
                </p>
                <a
                  href="https://maps.google.com/?q=Bilaspur+Greater+Noida+Gautam+Buddh+Nagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs font-semibold underline"
                  style={{ color: "oklch(0.52 0.14 145)" }}
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
