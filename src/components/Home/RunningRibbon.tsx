import React from "react";

const items = [
  "Serverwale� � India's Most Trusted Server Dealer",
  "Buy Refurbished HP ProLiant Servers Online",
  "Dell PowerEdge Enterprise Servers at 60-80% Off",
  "Lenovo ThinkSystem Rack Servers India",
  "ProStation Systems� � Custom GPU Workstations India",
  "AI & ML Workstations Built in India",
  "Enterprise Cloud & VPS Hosting India",
  "Data Center Infrastructure Solutions",
  "Server Rental Services Pan-India",
  "1-Year Warranty on All Refurbished Servers",
  "Same-Day Delivery in Delhi NCR",
  "IT Infrastructure Consulting & Support",
];

const RunningRibbon: React.FC = () => {
  return (
    <section className="w-full bg-white overflow-hidden border-y border-slate-200">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...items, ...items].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 text-[#0055E5] font-semibold text-sm sm:text-base"
            >
              <span className="w-2 h-2 rounded-full bg-[#0055E5] shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            width: max-content;
            animation: marquee 30s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default RunningRibbon;
