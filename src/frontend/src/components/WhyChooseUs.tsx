import { LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Fast & Efficient",
    desc: "Most services are completed within minutes. No long queues, no waiting — we value your time.",
    color: "oklch(0.74 0.16 60)",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Trusted & Certified",
    desc: "Authorised service provider for Aadhaar, PAN, and multiple government portals. 100% data privacy.",
    color: "oklch(0.52 0.14 145)",
  },
  {
    icon: <LayoutGrid className="w-8 h-8" />,
    title: "All Services Under One Roof",
    desc: "From digital printing to ITR filing to government scheme registration — everything in one place.",
    color: "oklch(0.26 0.075 242)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Why Choose Us?
          </motion.h2>
          <p className="section-subheading">
            Thousands of satisfied customers trust Vinay Gautam Cyber Cafe for
            their digital needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {FEATURES.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="bg-card rounded-2xl p-8 shadow-card text-center hover:shadow-card-hover transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5"
                style={{ background: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card border-l-4"
          style={{ borderLeftColor: "oklch(0.52 0.14 145)" }}
        >
          <div
            className="text-5xl font-serif leading-none mb-2"
            style={{ color: "oklch(0.52 0.14 145)" }}
          >
            &ldquo;
          </div>
          <p className="text-foreground text-base italic leading-relaxed mb-4">
            Vinay bhai ne humara PAN card correction aur Aadhaar update ek hi
            din mein kar diya. Bahut fast aur bharosemand service hai. Poora
            gaon yahan aata hai!
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
              RS
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                Ramesh Sharma
              </p>
              <p className="text-xs text-muted-foreground">
                Local Resident, Satisfied Customer
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
