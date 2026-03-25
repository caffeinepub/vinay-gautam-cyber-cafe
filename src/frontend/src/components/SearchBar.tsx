import { ALL_SEARCHABLE } from "@/data/services";
import { ExternalLink, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 1
      ? ALL_SEARCHABLE.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            (s.description ?? "").toLowerCase().includes(query.toLowerCase()) ||
            s.category.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 8)
      : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-full bg-red-600 py-2 px-4">
      <div ref={ref} className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow">
          <Search className="h-4 w-4 text-red-600 shrink-0" />
          <input
            data-ocid="search.search_input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search services... (e.g. Aadhaar, Passport, Loan)"
            className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {open && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
            {results.map((item) => (
              <a
                key={`${item.category}-${item.name}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 border-b border-border last:border-0"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.category} · {item.description}
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        )}
        {open && query.trim().length > 1 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              No services found for "{query}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
