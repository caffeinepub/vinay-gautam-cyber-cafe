const AFFILIATE_PROGRAMS = [
  {
    emoji: "🛒",
    name: "Amazon Associates",
    commission: "Up to 10%",
    desc: "Earn on every product sold via your link on India's largest marketplace.",
    url: "https://affiliate-program.amazon.in/",
  },
  {
    emoji: "🛍️",
    name: "Flipkart Affiliate",
    commission: "Up to 12%",
    desc: "Promote Flipkart products and earn on each successful sale.",
    url: "https://affiliate.flipkart.com/",
  },
  {
    emoji: "👗",
    name: "Meesho Affiliate",
    commission: "₹100+ per referral",
    desc: "Refer sellers & buyers on Meesho and earn attractive cashback.",
    url: "https://www.meesho.com/",
  },
  {
    emoji: "🌐",
    name: "Hostinger Affiliate",
    commission: "Up to 60% per sale",
    desc: "High-converting hosting brand — one of the best affiliate programs.",
    url: "https://www.hostinger.in/affiliates",
  },
  {
    emoji: "🔑",
    name: "GoDaddy Affiliate",
    commission: "Up to 100% first month",
    desc: "Promote domains & hosting and earn huge commission on first orders.",
    url: "https://in.godaddy.com/affiliate-programs",
  },
  {
    emoji: "🤝",
    name: "ShareASale",
    commission: "Varies by merchant",
    desc: "Huge network of 4,000+ merchants across all categories.",
    url: "https://www.shareasale.com/info/affiliates.cfm",
  },
  {
    emoji: "📦",
    name: "BigRock Affiliate",
    commission: "Up to ₹10,000/sale",
    desc: "Earn big commissions promoting domains and web hosting in India.",
    url: "https://www.bigrock.in/affiliates",
  },
  {
    emoji: "🏪",
    name: "ResellerClub Affiliate",
    commission: "Up to ₹5,000/sale",
    desc: "India's leading web-hosting reseller platform with generous payouts.",
    url: "https://resellerclub.com/affiliate-program",
  },
  {
    emoji: "🔗",
    name: "Cuelinks",
    commission: "Up to 30%",
    desc: "India's #1 content monetization network — auto-link all your content.",
    url: "https://www.cuelinks.com/",
  },
  {
    emoji: "📊",
    name: "iCubesWire",
    commission: "Varies by offer",
    desc: "Performance marketing platform with 1,000+ top Indian brand offers.",
    url: "https://www.icubeswire.com/",
  },
  {
    emoji: "🏆",
    name: "VCommission",
    commission: "India's top network",
    desc: "India's largest affiliate network with 20,000+ affiliates & top brands.",
    url: "https://www.vcommission.com/",
  },
  {
    emoji: "💡",
    name: "Admitad India",
    commission: "Varies by program",
    desc: "Global network with 1,800+ advertisers including top Indian brands.",
    url: "https://www.admitad.com/en/",
  },
];

export default function AffiliateSection() {
  return (
    <section id="earn-money" className="py-10 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        {/* Outer box */}
        <div className="border-4 border-amber-700 rounded-2xl bg-card p-6 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">
              💰 Affiliate Marketing — Earn Money From Home
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Join these programs and earn commission. Website owner earns
              commission when you sign up through these links.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AFFILIATE_PROGRAMS.map((p, i) => (
              <div
                key={p.name}
                data-ocid={`affiliate.item.${i + 1}`}
                className="bg-muted border border-amber-800/60 rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md hover:border-amber-500 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{p.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground text-sm leading-tight">
                      {p.name}
                    </p>
                    <span className="inline-block mt-0.5 text-xs font-semibold bg-amber-900/60 text-amber-400 px-2 py-0.5 rounded-full">
                      {p.commission}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex-1">{p.desc}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`affiliate.primary_button.${i + 1}`}
                  className="mt-1 block text-center text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white py-1.5 rounded-lg transition-colors"
                >
                  Join Now →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-amber-950/50 border border-amber-800 p-4 text-center">
            <p className="text-amber-400 text-sm font-medium">
              💼 <strong>How to claim commission:</strong> After joining,
              companies send payment to your registered bank account or UPI.
              Share your account number or UPI ID with the affiliate platform
              during registration to receive commissions directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
