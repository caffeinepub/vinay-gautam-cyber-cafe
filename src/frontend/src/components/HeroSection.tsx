import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star } from "lucide-react";

const BADGES = [
  { icon: CheckCircle, text: "Official Links Only" },
  { icon: Star, text: "Trusted Service" },
  { icon: Clock, text: "Fast Processing" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-14 md:py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Badge className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full border-0">
            <Clock className="h-3.5 w-3.5 mr-1" /> Same Day Delivery Available
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">
          justdovinay<span className="text-yellow-300">.com</span>
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-6 max-w-2xl mx-auto">
          Your One-Stop Portal for All Government Services — Bilaspur, Greater
          Noida
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {BADGES.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-1.5 bg-white/20 rounded-full px-4 py-1.5"
            >
              <b.icon className="h-4 w-4" />
              <span>{b.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#download-docs"
            className="bg-white text-green-700 font-bold px-6 py-2.5 rounded-full hover:bg-green-50 transition-colors text-sm"
          >
            📁 Download Documents
          </a>
          <a
            href="#apply-services"
            className="bg-yellow-400 text-yellow-900 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-300 transition-colors text-sm"
          >
            📋 Apply for Schemes
          </a>
          <a
            href="#esathi"
            className="bg-green-900/60 text-white font-bold px-6 py-2.5 rounded-full hover:bg-green-900/80 transition-colors text-sm"
          >
            💻 eSathi Services
          </a>
        </div>
      </div>
    </section>
  );
}
