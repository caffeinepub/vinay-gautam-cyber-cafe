import { AID_BAR_SERVICES } from "@/data/services";

export default function ServicesAidBar() {
  return (
    <div className="w-full bg-green-50 border-b border-green-200 py-2">
      <div
        className="flex gap-3 overflow-x-auto px-4 pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {AID_BAR_SERVICES.map((s) => (
          <a
            key={s.name}
            href={s.href}
            data-ocid="services_aid.link"
            className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-white border-2 border-green-300 rounded-full flex items-center justify-center text-lg shadow-sm">
              {s.icon}
            </div>
            <span className="text-[10px] font-medium text-green-800 text-center leading-tight whitespace-nowrap">
              {s.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
