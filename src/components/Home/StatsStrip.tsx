import React, { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

const STATS: Stat[] = [
  {
    value: "7",
    suffix: "+ Yrs",
    label: "Infrastructure Experience",
    sublabel: "Serving enterprise clients since 2014",
    color: "text-[#F59E0B]",
  },
  {
    value: "100",
    suffix: "+",
    label: "Enterprise Clients",
    sublabel: "From startups to Fortune 500",
    color: "text-[#0055E5]",
  },
  {
    value: "1000",
    suffix: "+",
    label: "Servers Delivered",
    sublabel: "HP · Dell · Lenovo · GPU systems",
    color: "text-[#7C3AED]",
  },
  {
    value: "3",
    suffix: "+",
    label: "Countries Served",
    sublabel: "India · UAE · UK · SEA & more",
    color: "text-[#41a650]",
  },
];

const StatsStrip: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-y border-white/5 py-5 sm:py-4 px-5 font-sans overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Label */}
        <div className="text-center mb-3 sm:mb-6">
          <p className="text-white font-semibold uppercase tracking-widest text-[9px] sm:text-[10px]">
            Our Infrastructure Expertise
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-0.5 sm:gap-1 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-none ${s.color}`}>
                {s.value}
                <span className="text-base sm:text-2xl lg:text-3xl font-black">{s.suffix}</span>
              </div>
              <div className="text-white font-bold text-[11px] sm:text-sm mt-0.5 sm:mt-1">{s.label}</div>
              <div className="text-white/35 text-[9px] sm:text-xs leading-tight hidden sm:block">{s.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Separator line on desktop */}
        <div className="hidden lg:flex absolute top-[50%] left-[24%] right-0 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div className="w-px h-12 -mt-6 bg-white/8" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsStrip;
