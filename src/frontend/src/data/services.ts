export interface ServiceItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export const AID_BAR_SERVICES = [
  { name: "Aadhaar", icon: "🪪", href: "#aadhaar-pan" },
  { name: "PAN Card", icon: "💳", href: "#aadhaar-pan" },
  { name: "Voter Card", icon: "🗳️", href: "#apply-docs-earn" },
  { name: "Apply & Earn", icon: "🏆", href: "#apply-docs-earn" },
  { name: "Driving Licence", icon: "🚗", href: "#esathi" },
  { name: "Passport", icon: "📘", href: "#apply-docs-earn" },
  { name: "Caste Cert.", icon: "📜", href: "#esathi" },
  { name: "Birth Cert.", icon: "👶", href: "#esathi" },
  { name: "MSME/Udyam", icon: "🏭", href: "#apply-docs-earn" },
  { name: "Bank Account", icon: "🏦", href: "#finance" },
  { name: "PM Yojana", icon: "🇮🇳", href: "#apply-services" },
  { name: "Income Cert.", icon: "📋", href: "#esathi" },
  { name: "Domicile", icon: "🏠", href: "#esathi" },
  { name: "Marriage Cert.", icon: "💒", href: "#esathi" },
  { name: "Death Cert.", icon: "📄", href: "#esathi" },
  { name: "Ration Card", icon: "🌾", href: "#esathi" },
  { name: "Police Cert.", icon: "🚔", href: "#esathi" },
  { name: "eSathi", icon: "💻", href: "#esathi" },
];

export const DOWNLOAD_SERVICES: ServiceItem[] = [
  {
    name: "DigiLocker",
    url: "https://digilocker.gov.in",
    description: "Access all your govt documents digitally",
    icon: "📁",
  },
  {
    name: "UIDAI (Aadhaar)",
    url: "https://uidai.gov.in",
    description: "Download & update your Aadhaar card",
    icon: "🪪",
  },
  {
    name: "mParivahan",
    url: "https://mparivahan.in",
    description: "Vehicle RC, DL & traffic documents",
    icon: "🚗",
  },
  {
    name: "Income Tax (Form 16)",
    url: "https://www.incometax.gov.in",
    description: "Tax returns & Form 16 documents",
    icon: "💰",
  },
  {
    name: "EPFO (PF)",
    url: "https://www.epfindia.gov.in",
    description: "Provident fund statements & claims",
    icon: "🏦",
  },
  {
    name: "National Career Service",
    url: "https://www.ncs.gov.in",
    description: "Job portal & career resources",
    icon: "💼",
  },
  {
    name: "e-District UP",
    url: "https://edistrict.up.gov.in",
    description: "UP district services & certificates",
    icon: "📜",
  },
  {
    name: "eSathi UP",
    url: "https://esathi.up.gov.in",
    description: "All UP government services online",
    icon: "💻",
  },
];

export const GOVT_SCHEMES: ServiceItem[] = [
  {
    name: "PM Kisan",
    url: "https://pmkisan.gov.in",
    description: "Farmer income support ₹6000/year",
    icon: "🌾",
  },
  {
    name: "PMAY (Housing)",
    url: "https://pmaymis.gov.in",
    description: "Pradhan Mantri Awas Yojana",
    icon: "🏠",
  },
  {
    name: "Ayushman Bharat",
    url: "https://pmjay.gov.in",
    description: "Free health insurance up to ₹5 lakh",
    icon: "🏥",
  },
  {
    name: "PM SVANidhi",
    url: "https://pmsvanidhi.mohua.gov.in",
    description: "Micro-credit for street vendors",
    icon: "🛒",
  },
  {
    name: "MGNREGA",
    url: "https://nrega.nic.in",
    description: "100 days guaranteed employment",
    icon: "⛏️",
  },
  {
    name: "PM Ujjwala",
    url: "https://pmuy.gov.in",
    description: "Free LPG connection for BPL families",
    icon: "🔥",
  },
  {
    name: "PM Mudra",
    url: "https://www.mudra.org.in",
    description: "Business loans up to ₹10 lakh",
    icon: "💳",
  },
  {
    name: "Skill India",
    url: "https://www.skillindia.gov.in",
    description: "Free vocational training programs",
    icon: "🎓",
  },
  {
    name: "Jan Dhan Yojana",
    url: "https://pmjdy.gov.in",
    description: "Zero balance bank account",
    icon: "🏦",
  },
  {
    name: "PM Fasal Bima",
    url: "https://pmfby.gov.in",
    description: "Crop insurance for farmers",
    icon: "🌱",
  },
  {
    name: "Sukanya Samriddhi",
    url: "https://www.nsiindia.gov.in",
    description: "Savings scheme for girl child",
    icon: "👧",
  },
  {
    name: "PM Scholarship",
    url: "https://scholarships.gov.in",
    description: "Scholarships for students",
    icon: "📚",
  },
  {
    name: "CSC Portal",
    url: "https://www.csc.gov.in",
    description: "Common Service Centre services",
    icon: "🖥️",
  },
  {
    name: "UP Samajwadi Pension",
    url: "https://sspy-up.gov.in",
    description: "Old age & widow pension UP",
    icon: "👴",
  },
  {
    name: "Vridha Pension UP",
    url: "https://sspy-up.gov.in",
    description: "Old age pension scheme UP",
    icon: "👵",
  },
  {
    name: "NSP Scholarship",
    url: "https://scholarships.gov.in",
    description: "National scholarship portal",
    icon: "🎖️",
  },
];

export const AADHAAR_SERVICES: ServiceItem[] = [
  {
    name: "Update Aadhaar",
    url: "https://uidai.gov.in",
    description: "Update name, address, DOB, mobile",
  },
  {
    name: "Download Aadhaar",
    url: "https://uidai.gov.in",
    description: "Download e-Aadhaar PDF",
  },
  {
    name: "Link Mobile",
    url: "https://uidai.gov.in",
    description: "Link mobile number to Aadhaar",
  },
  {
    name: "Check Aadhaar Status",
    url: "https://uidai.gov.in",
    description: "Track enrolment status",
  },
  {
    name: "Order Aadhaar Reprint",
    url: "https://uidai.gov.in",
    description: "Get physical Aadhaar card",
  },
  {
    name: "Biometric Lock/Unlock",
    url: "https://uidai.gov.in",
    description: "Lock biometric data",
  },
  {
    name: "Virtual ID Generate",
    url: "https://uidai.gov.in",
    description: "Generate 16-digit virtual ID",
  },
  {
    name: "OTP Verification",
    url: "https://uidai.gov.in",
    description: "Verify Aadhaar via OTP",
  },
  {
    name: "Aadhaar Authentication",
    url: "https://uidai.gov.in",
    description: "Authenticate identity",
  },
  {
    name: "mAadhaar App",
    url: "https://uidai.gov.in",
    description: "Mobile Aadhaar app",
  },
  {
    name: "SSUP Portal",
    url: "https://uidai.gov.in",
    description: "Self-service update portal",
  },
  {
    name: "Enrolment Centre",
    url: "https://uidai.gov.in",
    description: "Find nearest enrolment centre",
  },
  {
    name: "Grievance",
    url: "https://uidai.gov.in",
    description: "Lodge Aadhaar complaint",
  },
  {
    name: "Aadhaar for Child",
    url: "https://uidai.gov.in",
    description: "Baal Aadhaar for children",
  },
  {
    name: "Email Verify",
    url: "https://uidai.gov.in",
    description: "Verify email in Aadhaar",
  },
  {
    name: "Aadhaar PVC Card",
    url: "https://uidai.gov.in",
    description: "Order PVC Aadhaar card",
  },
];

export const PAN_SERVICES: ServiceItem[] = [
  {
    name: "Apply New PAN",
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    description: "Apply new PAN via NSDL official portal",
  },
  {
    name: "Download PAN",
    url: "https://www.incometax.gov.in",
    description: "Download e-PAN PDF",
  },
  {
    name: "PAN Corrections",
    url: "https://www.incometax.gov.in",
    description: "Correct name, DOB, address",
  },
  {
    name: "Link Aadhaar-PAN",
    url: "https://www.incometax.gov.in",
    description: "Link Aadhaar with PAN",
  },
  {
    name: "Check PAN Status",
    url: "https://www.incometax.gov.in",
    description: "Track PAN application",
  },
  {
    name: "Reprint PAN Card",
    url: "https://www.incometax.gov.in",
    description: "Get duplicate PAN",
  },
  {
    name: "Verify PAN",
    url: "https://www.incometax.gov.in",
    description: "Verify PAN details",
  },
  {
    name: "PAN for NRI",
    url: "https://www.incometax.gov.in",
    description: "PAN for non-residents",
  },
  {
    name: "Surrender PAN",
    url: "https://www.incometax.gov.in",
    description: "Surrender duplicate PAN",
  },
  {
    name: "PAN Grievance",
    url: "https://www.incometax.gov.in",
    description: "Lodge PAN complaint",
  },
  {
    name: "Instant PAN (eKYC)",
    url: "https://www.incometax.gov.in",
    description: "Instant PAN via Aadhaar",
  },
  {
    name: "PAN for Minor",
    url: "https://www.incometax.gov.in",
    description: "PAN card for children",
  },
  {
    name: "ITR Filing",
    url: "https://www.incometax.gov.in",
    description: "File income tax return",
  },
  {
    name: "Form 16 Download",
    url: "https://www.incometax.gov.in",
    description: "Download salary TDS form",
  },
  {
    name: "26AS Statement",
    url: "https://www.incometax.gov.in",
    description: "Tax credit statement",
  },
  {
    name: "Update Address PAN",
    url: "https://www.incometax.gov.in",
    description: "Update address in PAN",
  },
];

export const ESATHI_SERVICES: ServiceItem[] = [
  {
    name: "Caste Certificate",
    url: "https://esathi.up.gov.in",
    description: "SC/ST/OBC caste certificate",
    icon: "📜",
  },
  {
    name: "Domicile Certificate",
    url: "https://esathi.up.gov.in",
    description: "UP resident certificate",
    icon: "🏠",
  },
  {
    name: "Income Certificate",
    url: "https://esathi.up.gov.in",
    description: "Annual income certificate",
    icon: "💰",
  },
  {
    name: "Birth Certificate",
    url: "https://esathi.up.gov.in",
    description: "Official birth document",
    icon: "👶",
  },
  {
    name: "Death Certificate",
    url: "https://esathi.up.gov.in",
    description: "Official death document",
    icon: "📄",
  },
  {
    name: "Marriage Certificate",
    url: "https://esathi.up.gov.in",
    description: "Marriage registration",
    icon: "💒",
  },
  {
    name: "Character Certificate",
    url: "https://esathi.up.gov.in",
    description: "Good conduct certificate",
    icon: "✅",
  },
  {
    name: "Ration Card",
    url: "https://esathi.up.gov.in",
    description: "New/update ration card",
    icon: "🌾",
  },
  {
    name: "Voter ID",
    url: "https://esathi.up.gov.in",
    description: "Voter card registration",
    icon: "🗳️",
  },
  {
    name: "Disability Certificate",
    url: "https://esathi.up.gov.in",
    description: "Divyang certificate",
    icon: "♿",
  },
  {
    name: "OBC Certificate",
    url: "https://esathi.up.gov.in",
    description: "Other backward class cert.",
    icon: "📋",
  },
  {
    name: "EWS Certificate",
    url: "https://esathi.up.gov.in",
    description: "Economically weaker section",
    icon: "📑",
  },
  {
    name: "Scholarship",
    url: "https://esathi.up.gov.in",
    description: "UP scholarship application",
    icon: "🎓",
  },
  {
    name: "Pension Registration",
    url: "https://esathi.up.gov.in",
    description: "Old age/widow pension",
    icon: "👴",
  },
  {
    name: "Land Records",
    url: "https://esathi.up.gov.in",
    description: "Khatoni/Bhumi records",
    icon: "🗺️",
  },
  {
    name: "Police Clearance",
    url: "https://esathi.up.gov.in",
    description: "Police clearance certificate",
    icon: "🚔",
  },
];

export const LOAN_APPS: ServiceItem[] = [
  {
    name: "PhonePe",
    url: "https://www.phonepe.com",
    description: "Instant personal loans",
    icon: "📱",
  },
  {
    name: "Google Pay",
    url: "https://pay.google.com",
    description: "Easy loans via Google",
    icon: "💳",
  },
  {
    name: "Paytm",
    url: "https://paytm.com",
    description: "Paytm personal loans",
    icon: "💰",
  },
  {
    name: "KreditBee",
    url: "https://kreditbee.in",
    description: "Quick personal loans",
    icon: "🐝",
  },
  {
    name: "Navi",
    url: "https://navi.com",
    description: "Home, personal & health loans",
    icon: "🏠",
  },
  {
    name: "Bajaj Finserv",
    url: "https://www.bajajfinserv.in",
    description: "Consumer & business loans",
    icon: "🏦",
  },
  {
    name: "SBI Loans",
    url: "https://sbi.co.in",
    description: "Government bank loans",
    icon: "🇮🇳",
  },
  {
    name: "HDFC Bank",
    url: "https://www.hdfcbank.com",
    description: "Personal & home loans",
    icon: "🔵",
  },
  {
    name: "ICICI Bank",
    url: "https://www.icicibank.com",
    description: "All types of loans",
    icon: "🟠",
  },
  {
    name: "MoneyTap",
    url: "https://www.moneytap.com",
    description: "Credit line up to ₹5 lakh",
    icon: "💵",
  },
  {
    name: "CASHe",
    url: "https://www.cashe.co.in",
    description: "Salary advance loans",
    icon: "💸",
  },
  {
    name: "IndiaLends",
    url: "https://www.indialends.com",
    description: "Compare & apply loans",
    icon: "📊",
  },
];

export const BANK_ACCOUNTS: ServiceItem[] = [
  {
    name: "PMJDY",
    url: "https://pmjdy.gov.in",
    description: "PM Jan Dhan — zero balance",
    icon: "🇮🇳",
  },
  {
    name: "Paytm Payments Bank",
    url: "https://www.paytmbank.com",
    description: "Zero balance digital bank",
    icon: "💱",
  },
  {
    name: "Kotak 811",
    url: "https://www.kotak.com",
    description: "Free zero balance account",
    icon: "🔴",
  },
  {
    name: "Fi Money",
    url: "https://fi.money",
    description: "Smart salary account",
    icon: "💚",
  },
  {
    name: "Airtel Payments Bank",
    url: "https://www.airtel.in/bank",
    description: "Zero balance savings",
    icon: "📡",
  },
  {
    name: "India Post Payments",
    url: "https://www.ippbonline.com",
    description: "Post office bank account",
    icon: "📮",
  },
  {
    name: "Jio Payments Bank",
    url: "https://www.jiopayments.com",
    description: "Jio zero balance account",
    icon: "📶",
  },
  {
    name: "IDFC FIRST Bank",
    url: "https://www.idfcfirstbank.com",
    description: "Zero balance savings",
    icon: "🔷",
  },
  {
    name: "Fino Payments Bank",
    url: "https://www.finobank.com",
    description: "Easy savings account",
    icon: "💎",
  },
  {
    name: "Jupiter",
    url: "https://jupiter.money",
    description: "Modern salary account",
    icon: "🌟",
  },
  {
    name: "Niyo",
    url: "https://www.goniyo.com",
    description: "Zero forex savings",
    icon: "✈️",
  },
  {
    name: "SBI Basic Account",
    url: "https://sbi.co.in",
    description: "Basic savings account",
    icon: "🏛️",
  },
];

export const APPLY_EARN_SERVICES: ServiceItem[] = [
  {
    name: "Voter ID Card",
    url: "https://voters.eci.gov.in",
    description: "Apply for Voter ID via Election Commission",
    icon: "🗳️",
  },
  {
    name: "Passport Apply",
    url: "https://passportindia.gov.in",
    description: "Apply/renew passport via Passport Seva",
    icon: "📘",
  },
  {
    name: "PAN Card via NSDL",
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    description: "Apply new PAN via NSDL official portal",
    icon: "💳",
  },
];

export const ALL_SEARCHABLE = [
  ...DOWNLOAD_SERVICES.map((s) => ({ ...s, category: "Download Documents" })),
  ...GOVT_SCHEMES.map((s) => ({ ...s, category: "Government Schemes" })),
  ...AADHAAR_SERVICES.map((s) => ({ ...s, category: "Aadhaar Services" })),
  ...PAN_SERVICES.map((s) => ({ ...s, category: "PAN Card Services" })),
  ...ESATHI_SERVICES.map((s) => ({ ...s, category: "eSathi Services" })),
  ...LOAN_APPS.map((s) => ({ ...s, category: "Loan Apps" })),
  ...BANK_ACCOUNTS.map((s) => ({ ...s, category: "Bank Accounts" })),
  ...APPLY_EARN_SERVICES.map((s) => ({ ...s, category: "Apply & Earn" })),
];
