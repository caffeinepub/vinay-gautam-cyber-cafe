import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAllNews } from "../hooks/useQueries";

const FALLBACK_NEWS = [
  {
    id: 1n,
    title: "PM Kisan 17th Installment Released – Check Your Status Now",
    content:
      "The government has released the 17th installment of PM Kisan Samman Nidhi. Over 9.4 crore farmers received ₹2,000 directly in their bank accounts. Beneficiaries can check status on pmkisan.gov.in. Bring your Aadhaar and bank passbook to our centre for any corrections or new registrations.",
    date: BigInt(Date.now() * 1_000_000),
    category: "Agriculture",
  },
  {
    id: 2n,
    title: "Aadhaar Free Update Window Extended till June 2025",
    content:
      "UIDAI has extended the free Aadhaar document update facility online until June 14, 2025. Citizens can update their name, address, date of birth, and gender free of cost on myAadhaar portal or at our Aadhaar-enabled centre. Charges of ₹50 apply at CSCs after the deadline.",
    date: BigInt((Date.now() - 3 * 86400000) * 1_000_000),
    category: "Aadhaar",
  },
  {
    id: 3n,
    title: "New PAN 2.0 Project: All Existing PAN Cards Remain Valid",
    content:
      "The Income Tax Department clarifies that all existing PAN cards continue to remain valid even after PAN 2.0 launch. PAN 2.0 will upgrade the system with a QR-code enabled card at no cost. No physical changes are required for existing holders. Contact us for any PAN-related queries or new applications.",
    date: BigInt((Date.now() - 7 * 86400000) * 1_000_000),
    category: "PAN",
  },
];

function formatDate(ns: bigint) {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Agriculture: "bg-green-100 text-green-800",
  Aadhaar: "bg-blue-100 text-blue-800",
  PAN: "bg-orange-100 text-orange-800",
};

export default function UpdatesSection() {
  const { data: news, isLoading } = useAllNews();
  const displayNews = news && news.length > 0 ? news : FALLBACK_NEWS;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="updates" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Latest Government Scheme Updates
          </motion.h2>
          <p className="section-subheading">
            Stay informed with the latest news on government schemes, deadlines,
            and policy updates.
          </p>
        </div>

        {isLoading ? (
          <div
            className="flex flex-col gap-4 max-w-3xl mx-auto"
            data-ocid="updates.loading_state"
          >
            {["a", "b", "c"].map((id) => (
              <Skeleton key={id} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {displayNews.map((item, idx) => {
              const key = String(item.id);
              const isOpen = expanded === key;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
                  data-ocid={`updates.item.${idx + 1}`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          CATEGORY_COLORS[item.category] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-card-foreground mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm text-muted-foreground leading-relaxed ${
                        isOpen ? "" : "line-clamp-2"
                      }`}
                    >
                      {item.content}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : key)}
                      className="mt-2 text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                      style={{ color: "oklch(0.52 0.14 145)" }}
                      data-ocid="updates.toggle"
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp className="w-4 h-4" /> Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" /> Read more
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
