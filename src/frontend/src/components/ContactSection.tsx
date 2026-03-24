import { Clock, MapPin, Phone } from "lucide-react";
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
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
