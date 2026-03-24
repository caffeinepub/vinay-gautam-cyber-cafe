import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ALL_SEARCHABLE = [
  // eSathi services
  {
    title: "Jati Praman Patra (Caste Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in/citizenmgt/services/casteService.do",
    tag: "eSathi UP",
  },
  {
    title: "Aay Praman Patra (Income Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in/citizenmgt/services/incomeService.do",
    tag: "eSathi UP",
  },
  {
    title: "Niwas Praman Patra (Domicile Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in/citizenmgt/services/domicileService.do",
    tag: "eSathi UP",
  },
  {
    title: "Janm Praman Patra (Birth Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Mrityu Praman Patra (Death Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Vridha Pension (Old Age Pension)",
    section: "esathi",
    link: "https://sspy-up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Vidhwa Pension (Widow Pension)",
    section: "esathi",
    link: "https://sspy-up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Viklang Pension (Disability Pension)",
    section: "esathi",
    link: "https://sspy-up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Handicapped Certificate",
    section: "esathi",
    link: "https://esathi.up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Khatauni Nakal (Land Records)",
    section: "esathi",
    link: "https://upbhulekh.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Rozgar Registration (Employment)",
    section: "esathi",
    link: "https://sewayojan.up.nic.in",
    tag: "eSathi UP",
  },
  {
    title: "Vivah Panjikaran (Marriage Certificate)",
    section: "esathi",
    link: "https://igrsup.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Sampatti Panjikaran (Property Registration)",
    section: "esathi",
    link: "https://igrsup.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Jeevan Praman Patra (Life Certificate)",
    section: "esathi",
    link: "https://jeevanpramaan.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Ration Card",
    section: "esathi",
    link: "https://fcs.up.gov.in",
    tag: "eSathi UP",
  },
  {
    title: "Haisiyat Praman Patra (Property Certificate)",
    section: "esathi",
    link: "https://esathi.up.gov.in",
    tag: "eSathi UP",
  },
  // Main services
  {
    title: "Aadhaar Card Services",
    section: "aadhaar-pan",
    link: "https://myaadhaar.uidai.gov.in",
    tag: "Aadhaar",
  },
  {
    title: "PAN Card Apply / Correction",
    section: "aadhaar-pan",
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    tag: "PAN Card",
  },
  {
    title: "Income Tax Return (ITR)",
    section: "services",
    link: "https://www.incometax.gov.in",
    tag: "Tax",
  },
  {
    title: "Voter ID / EPIC Card",
    section: "services",
    link: "https://voterportal.eci.gov.in",
    tag: "Voter ID",
  },
  {
    title: "Passport Apply / Renew",
    section: "services",
    link: "https://passportindia.gov.in",
    tag: "Passport",
  },
  {
    title: "PM Awas Yojana (Housing Scheme)",
    section: "schemes",
    link: "https://pmaymis.gov.in",
    tag: "Scheme",
  },
  {
    title: "PM Kisan Samman Nidhi",
    section: "schemes",
    link: "https://pmkisan.gov.in",
    tag: "Scheme",
  },
  {
    title: "Ayushman Bharat (PMJAY)",
    section: "schemes",
    link: "https://pmjay.gov.in",
    tag: "Health",
  },
  {
    title: "PMKVY Skill Training",
    section: "schemes",
    link: "https://pmkvyofficial.org",
    tag: "Skill",
  },
  {
    title: "E-Shram Portal",
    section: "schemes",
    link: "https://eshram.gov.in",
    tag: "Labour",
  },
  {
    title: "Jan Dhan Yojana (Zero Balance Account)",
    section: "schemes",
    link: "https://pmjdy.gov.in",
    tag: "Finance",
  },
  {
    title: "Driving Licence (Parivahan)",
    section: "services",
    link: "https://parivahan.gov.in",
    tag: "DL",
  },
  {
    title: "MSME / Udyam Registration",
    section: "services",
    link: "https://udyamregistration.gov.in",
    tag: "MSME",
  },
  {
    title: "e-KYC / NSDL Verification",
    section: "services",
    link: "#services",
    tag: "KYC",
  },
  {
    title: "Digital Signature Certificate",
    section: "services",
    link: "#services",
    tag: "DSC",
  },
  {
    title: "Print & Scan Services",
    section: "services",
    link: "#services",
    tag: "Print",
  },
];

const TAG_COLORS: Record<string, string> = {
  "eSathi UP": "bg-orange-100 text-orange-700",
  Aadhaar: "bg-green-100 text-green-700",
  "PAN Card": "bg-yellow-100 text-yellow-700",
  Tax: "bg-blue-100 text-blue-700",
  "Voter ID": "bg-purple-100 text-purple-700",
  Passport: "bg-indigo-100 text-indigo-700",
  Scheme: "bg-teal-100 text-teal-700",
  Health: "bg-red-100 text-red-700",
  Skill: "bg-pink-100 text-pink-700",
  Labour: "bg-orange-100 text-orange-700",
  Finance: "bg-emerald-100 text-emerald-700",
  DL: "bg-cyan-100 text-cyan-700",
  MSME: "bg-violet-100 text-violet-700",
  KYC: "bg-gray-100 text-gray-700",
  DSC: "bg-slate-100 text-slate-700",
  Print: "bg-zinc-100 text-zinc-700",
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof ALL_SEARCHABLE>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = ALL_SEARCHABLE.filter(
      (s) =>
        s.title.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q),
    ).slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (item: (typeof ALL_SEARCHABLE)[0]) => {
    setQuery("");
    setOpen(false);
    if (item.link.startsWith("http")) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else {
      const el = document.getElementById(item.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-white border-b py-2 px-4"
      data-ocid="search_bar"
    >
      <div className="container mx-auto max-w-2xl relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any service... (Aadhaar, Caste Certificate, Passport, Pension...)"
            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-xl z-[200] overflow-hidden">
            {results.map((item, idx) => (
              <button
                type="button"
                key={`${item.title}-${idx}`}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition-colors border-b last:border-b-0 text-left gap-3"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium truncate">
                    {item.title}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${TAG_COLORS[item.tag] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {item.tag}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
