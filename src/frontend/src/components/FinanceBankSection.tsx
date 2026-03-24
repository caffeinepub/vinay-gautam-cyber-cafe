import { ExternalLink } from "lucide-react";

const loanApps = [
  {
    name: "PhonePe Loan",
    desc: "Instant personal loans via PhonePe app",
    url: "https://www.phonepe.com/",
    logo: "📱",
  },
  {
    name: "Google Pay Loan",
    desc: "Personal loans powered by Google Pay",
    url: "https://pay.google.com/",
    logo: "💳",
  },
  {
    name: "Paytm Loan",
    desc: "Quick personal & business loans on Paytm",
    url: "https://paytm.com/",
    logo: "🏦",
  },
  {
    name: "KreditBee",
    desc: "Fast personal loans up to ₹4 lakh",
    url: "https://www.kreditbee.in/",
    logo: "💰",
  },
  {
    name: "MoneyTap",
    desc: "Credit line & instant loans",
    url: "https://www.moneytap.com/",
    logo: "🪙",
  },
  {
    name: "Navi Loan",
    desc: "Low-interest instant personal loans",
    url: "https://navi.com/",
    logo: "📊",
  },
  {
    name: "CASHe",
    desc: "Short-term salary-based loans",
    url: "https://www.cashe.co.in/",
    logo: "💵",
  },
  {
    name: "EarlySalary",
    desc: "Salary advance & personal loans",
    url: "https://www.earlysalary.com/",
    logo: "📆",
  },
  {
    name: "Bajaj Finserv",
    desc: "Personal, home & business loans",
    url: "https://www.bajajfinserv.in/",
    logo: "🏢",
  },
  {
    name: "HDFC Bank Loan",
    desc: "Instant HDFC personal loan online",
    url: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    logo: "🏛️",
  },
  {
    name: "SBI Personal Loan",
    desc: "SBI instant personal loan apply online",
    url: "https://sbi.co.in/web/personal-banking/loans/personal-loans",
    logo: "🇮🇳",
  },
  {
    name: "ICICI Bank Loan",
    desc: "ICICI personal & home loans",
    url: "https://www.icicibank.com/personal-banking/loans/personal-loan",
    logo: "🔵",
  },
];

const savingsApps = [
  {
    name: "SBI Zero Balance",
    desc: "SBI Basic Savings Bank Deposit Account",
    url: "https://sbi.co.in/web/personal-banking/accounts/savings-account/basic-savings-bank-deposit-account",
    logo: "🇮🇳",
  },
  {
    name: "PMJDY Account",
    desc: "Pradhan Mantri Jan Dhan Yojana - free zero balance account",
    url: "https://pmjdy.gov.in/",
    logo: "🏛️",
  },
  {
    name: "Paytm Payments Bank",
    desc: "Free zero balance savings account",
    url: "https://bank.paytm.com/",
    logo: "💙",
  },
  {
    name: "FINO Payments Bank",
    desc: "Zero balance account with doorstep banking",
    url: "https://www.finobank.com/",
    logo: "🟢",
  },
  {
    name: "Airtel Payments Bank",
    desc: "Zero balance digital savings account",
    url: "https://www.airtel.in/bank/",
    logo: "📡",
  },
  {
    name: "India Post Payments Bank",
    desc: "IPPB zero balance savings account",
    url: "https://www.ippbonline.com/",
    logo: "📬",
  },
  {
    name: "Jio Payments Bank",
    desc: "Zero balance digital account by Jio",
    url: "https://www.jiopayments.com/",
    logo: "📶",
  },
  {
    name: "Fi Money",
    desc: "Smart zero balance account with savings goals",
    url: "https://fi.money/",
    logo: "💚",
  },
  {
    name: "Jupiter Money",
    desc: "Modern zero balance savings account",
    url: "https://jupiter.money/",
    logo: "🪐",
  },
  {
    name: "Niyo Global",
    desc: "Zero balance account with forex benefits",
    url: "https://www.goniyo.com/",
    logo: "🌏",
  },
  {
    name: "HDFC BSBD Account",
    desc: "HDFC Basic Savings Bank Deposit - zero balance",
    url: "https://www.hdfcbank.com/personal/save/accounts/savings-accounts/basic-savings-bank-deposit-account",
    logo: "🏦",
  },
  {
    name: "Kotak 811 Account",
    desc: "Kotak zero balance digital savings account",
    url: "https://www.kotak.com/811",
    logo: "🟠",
  },
];

function ServiceCard({
  name,
  desc,
  url,
  logo,
}: {
  name: string;
  desc: string;
  url: string;
  logo: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 rounded-lg border-2 border-green-400 bg-green-50 p-4 shadow-sm hover:bg-green-100 hover:shadow-md transition-all group"
    >
      <span className="text-3xl mt-0.5">{logo}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-bold text-green-800 text-sm leading-tight">
            {name}
          </span>
          <ExternalLink className="h-3 w-3 text-green-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-xs text-green-700 mt-0.5 leading-snug">{desc}</p>
      </div>
    </a>
  );
}

export default function FinanceBankSection() {
  return (
    <section id="finance-bank" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Big outer box */}
        <div className="rounded-2xl border-4 border-green-500 bg-green-50 shadow-xl p-6 md:p-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-800 uppercase tracking-wide">
              🏦 Finance &amp; Bank Accounts Section
            </h2>
            <p className="text-green-700 mt-2 text-sm md:text-base">
              Apply for loans and open zero balance savings accounts through
              official websites and apps
            </p>
          </div>

          {/* Loan Apps */}
          <div className="mb-10">
            <h3 className="text-lg md:text-xl font-bold text-green-900 mb-4 border-b-2 border-green-400 pb-2">
              💰 Popular Loan Apps &amp; Websites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {loanApps.map((app) => (
                <ServiceCard key={app.name} {...app} />
              ))}
            </div>
          </div>

          {/* Savings / Zero Balance Accounts */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-green-900 mb-4 border-b-2 border-green-400 pb-2">
              🏛️ Popular Savings &amp; Zero Balance Accounts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {savingsApps.map((app) => (
                <ServiceCard key={app.name} {...app} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
