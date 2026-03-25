import { ESATHI_SERVICES } from "@/data/services";
import { ExternalLink } from "lucide-react";

interface Props {
  onBook: (service: string) => void;
}

export default function ESathiSection({ onBook }: Props) {
  return (
    <section id="esathi" className="py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-heading">💻 eSathi Platform Services</h2>
          <p className="section-subheading">
            All UP government services via the official eSathi portal
          </p>
          <a
            href="https://esathi.up.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm text-primary font-medium hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open eSathi Portal
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ESATHI_SERVICES.map((s, i) => (
            <div
              key={s.name}
              data-ocid={`esathi.item.${i + 1}`}
              className="service-card flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                <div className="font-semibold text-sm text-foreground">
                  {s.name}
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex-1">
                {s.description}
              </div>
              <div className="flex gap-2 mt-auto pt-1">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> Apply
                </a>
                <button
                  type="button"
                  onClick={() => onBook(s.name)}
                  data-ocid={`esathi.primary_button.${i + 1}`}
                  className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Get This Done
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
