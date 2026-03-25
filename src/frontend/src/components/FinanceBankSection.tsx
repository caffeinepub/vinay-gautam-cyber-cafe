import { BANK_ACCOUNTS, LOAN_APPS } from "@/data/services";
import { ExternalLink } from "lucide-react";

export default function FinanceBankSection() {
  return (
    <section id="finance" className="py-12 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="border-4 border-green-500 rounded-2xl p-6 md:p-8 bg-white">
          <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 text-center mb-2">
            💰 Finance & Bank Accounts Section
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Popular loan apps and zero-balance savings accounts — all official
            links
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2">
              🏦 Popular Loan Apps & Websites
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {LOAN_APPS.map((s, i) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`loans.item.${i + 1}`}
                  className="green-card flex flex-col gap-1 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-sm text-green-900 group-hover:text-green-700">
                      {s.name}
                    </span>
                  </div>
                  <div className="text-xs text-green-700">{s.description}</div>
                  <ExternalLink className="h-3 w-3 text-green-500 mt-1" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-800 mb-4 border-b-2 border-green-200 pb-2">
              🏧 Zero Balance & Savings Accounts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {BANK_ACCOUNTS.map((s, i) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`banks.item.${i + 1}`}
                  className="green-card flex flex-col gap-1 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-sm text-green-900 group-hover:text-green-700">
                      {s.name}
                    </span>
                  </div>
                  <div className="text-xs text-green-700">{s.description}</div>
                  <ExternalLink className="h-3 w-3 text-green-500 mt-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
