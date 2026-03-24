import { Button } from "@/components/ui/button";
import { CalendarCheck, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onScrollTo: (id: string) => void;
}

export default function HeroSection({ onScrollTo }: Props) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/cyber-cafe-hero.dim_1400x600.jpg')",
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60" />

      {/* Orange accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "oklch(0.74 0.16 60)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-primary/60 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-12 md:px-16 md:py-16 shadow-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.74 0.16 60)" }}
          >
            Welcome to
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            Vinay Gautam{" "}
            <span style={{ color: "oklch(0.52 0.14 145)" }}>Cyber Cafe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/85 text-lg md:text-xl mb-8 font-medium"
          >
            Your Trusted Digital &amp; Government Services Partner
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => onScrollTo("services")}
              className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8"
              data-ocid="hero.primary_button"
            >
              Explore Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onScrollTo("book")}
              className="border-white text-white hover:bg-white/10 font-bold text-base px-8"
              data-ocid="hero.secondary_button"
            >
              <CalendarCheck className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => onScrollTo("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
