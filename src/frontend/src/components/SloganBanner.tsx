import { motion } from "motion/react";

export default function SloganBanner() {
  return (
    <div
      className="w-full text-white text-center py-2 px-4"
      style={{ background: "oklch(0.52 0.14 145)" }}
      data-ocid="slogan_banner"
    >
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs sm:text-sm font-bold tracking-wide"
      >
        🇮🇳 <span className="font-extrabold">justdovinay.com</span> &mdash; Aapki
        Har Sarkari Zaroorat, Ek Hi Jagah &bull; Your One-Stop Portal for All
        Government Services
      </motion.p>
    </div>
  );
}
