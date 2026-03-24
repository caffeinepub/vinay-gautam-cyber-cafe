import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, FileCheck } from "lucide-react";
import { motion } from "motion/react";
import { useAllSchemes } from "../hooks/useQueries";

const FALLBACK_SCHEMES = [
  {
    id: 1n,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description:
      "Direct income support of ₹6,000 per year to farmer families in three installments.",
    eligibility:
      "Small & marginal farmers owning cultivable land up to 2 hectares.",
    documentsRequired: [
      "Aadhaar Card",
      "Bank Passbook",
      "Land Records",
      "Mobile Number",
    ],
    officialLink: "https://pmkisan.gov.in",
  },
  {
    id: 2n,
    name: "PM Awas Yojana (Urban)",
    category: "Housing",
    description:
      "Affordable housing for urban poor — subsidy up to ₹2.67 lakh on home loans.",
    eligibility:
      "EWS, LIG & MIG households who don't own a pucca house anywhere in India.",
    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Bank Account",
      "Domicile Proof",
    ],
    officialLink: "https://pmaymis.gov.in",
  },
  {
    id: 3n,
    name: "Ayushman Bharat (PMJAY)",
    category: "Health",
    description:
      "Health insurance coverage of ₹5 lakh per family per year for secondary & tertiary care.",
    eligibility: "Economically vulnerable families as per SECC data 2011.",
    documentsRequired: [
      "Aadhaar Card",
      "Ration Card",
      "SECC Registered Mobile",
    ],
    officialLink: "https://pmjay.gov.in",
  },
  {
    id: 4n,
    name: "PMKVY – Skill India",
    category: "Skill Development",
    description:
      "Free short-term skill training and certification for unemployed youth.",
    eligibility:
      "Indian citizens between 15–45 years, school/college dropouts or graduates.",
    documentsRequired: [
      "Aadhaar Card",
      "Educational Certificates",
      "Bank Account",
      "Passport Photo",
    ],
    officialLink: "https://pmkvyofficial.org",
  },
  {
    id: 5n,
    name: "E-Shram Portal",
    category: "Labour",
    description:
      "National database of unorganised workers — register and get e-Shram card with ₹2 lakh accident insurance.",
    eligibility:
      "Unorganised sector workers aged 16–59 not registered with EPFO/ESIC.",
    documentsRequired: [
      "Aadhaar Card",
      "Mobile Linked to Aadhaar",
      "Bank Account",
    ],
    officialLink: "https://eshram.gov.in",
  },
  {
    id: 6n,
    name: "Jan Dhan Yojana",
    category: "Finance",
    description:
      "Zero-balance bank account with RuPay debit card and ₹1 lakh accident insurance.",
    eligibility: "Any Indian citizen above 10 years without a bank account.",
    documentsRequired: [
      "Aadhaar Card",
      "Voter ID or any ID proof",
      "Passport Photo",
    ],
    officialLink: "https://pmjdy.gov.in",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Agriculture: "bg-green-100 text-green-800",
  Housing: "bg-blue-100 text-blue-800",
  Health: "bg-red-100 text-red-800",
  "Skill Development": "bg-purple-100 text-purple-800",
  Labour: "bg-orange-100 text-orange-800",
  Finance: "bg-yellow-100 text-yellow-800",
};

export default function SchemesSection() {
  const { data: schemes, isLoading } = useAllSchemes();
  const displaySchemes =
    schemes && schemes.length > 0 ? schemes : FALLBACK_SCHEMES;

  return (
    <section id="schemes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Government Schemes
          </motion.h2>
          <p className="section-subheading">
            We help you apply for and avail all major Central & State Government
            schemes.
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="schemes.loading_state"
          >
            {["a", "b", "c", "d", "e", "f"].map((id) => (
              <Skeleton key={id} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySchemes.map((scheme, idx) => (
              <motion.div
                key={String(scheme.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col gap-4"
                data-ocid={`schemes.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-card-foreground leading-snug">
                    {scheme.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
                      CATEGORY_COLORS[scheme.category] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {scheme.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scheme.description}
                </p>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> Eligibility
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {scheme.eligibility}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Documents Required
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {scheme.documentsRequired.map((doc) => (
                      <Badge key={doc} variant="secondary" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-colors"
                  >
                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2" /> Official
                      Website
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
