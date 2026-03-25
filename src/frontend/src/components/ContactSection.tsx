import { Download, MapPin, Phone } from "lucide-react";

interface Props {
  onInstall: () => void;
  canInstall: boolean;
}

export default function ContactSection({ onInstall, canInstall }: Props) {
  return (
    <section id="contact" className="py-14 px-4 bg-green-700 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">📞 Contact Us</h2>
        <div className="flex flex-col items-center gap-4">
          {/* Owner photo */}
          <div className="w-36 h-36 rounded-full border-4 border-yellow-300 overflow-hidden shadow-xl">
            <img
              src="/assets/img_20250924_091131-019d2019-dd09-703c-93d0-031663d7f545.png"
              alt="Vinay Gautam"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='144' height='144' viewBox='0 0 144 144'%3E%3Crect width='144' height='144' fill='%2316a34a'/%3E%3Ctext x='72' y='85' font-size='60' text-anchor='middle' fill='white'%3E👤%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold">Vinay Gautam</h3>
            <p className="text-green-200 font-medium">
              Owner of justdovinay.com
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-yellow-300" />
              <span>Bilaspur, Greater Noida, Gautam Buddh Nagar</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-yellow-300" />
              <a
                href="tel:8384821357"
                className="font-bold text-lg hover:text-yellow-300 transition-colors"
              >
                8384821357
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={canInstall ? onInstall : undefined}
            data-ocid="contact.primary_button"
            className="mt-2 flex items-center gap-2 bg-green-500 hover:bg-green-400 border-2 border-white text-white font-bold px-8 py-3 rounded-full transition-colors text-base shadow-lg"
          >
            <Download className="h-5 w-5" />
            {canInstall ? "Install justdovinay App" : "Download App"}
          </button>
          {!canInstall && (
            <p className="text-xs text-green-200 max-w-xs">
              To install: Open in Chrome on Android → tap menu → "Add to Home
              Screen". On iPhone: tap Share → "Add to Home Screen".
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
