import { GOVT_SCHEMES } from "@/data/services";
import { ExternalLink } from "lucide-react";

export default function GovtSchemesSection() {
  return (
    <section id="apply-services" className="py-12 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-heading">🇮🇳 Apply for Government Services</h2>
          <p className="section-subheading">
            Apply for PM Yojanas, scholarships, pensions & more
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {GOVT_SCHEMES.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`govt_schemes.item.${i + 1}`}
              className="service-card flex flex-col items-center text-center gap-2 group"
            >
              <div className="text-3xl">{s.icon}</div>
              <div className="font-semibold text-sm text-foreground group-hover:text-primary">
                {s.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {s.description}
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
