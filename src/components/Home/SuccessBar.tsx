import React, { useState, useRef, useEffect } from "react";
import AnimateIn from "../AnimateIn";
import { TrendingDown, Zap, Shield } from "lucide-react";

const STORIES = [
  {
    icon: <TrendingDown className="w-5 h-5 text-orange-400" />,
    bg: "bg-orange-500/10 border-orange-500/20",
    industry: "Fintech · Mumbai",
    headline: "70% infrastructure cost reduction",
    desc: "Replaced ₹40L new server budget with refurbished Dell PowerEdge stack — zero performance compromise.",
  },
  {
    icon: <Zap className="w-5 h-5 text-green-400" />,
    bg: "bg-green-500/10 border-green-200/20",
    industry: "VFX Studio · Delhi",
    headline: "3× faster rendering after upgrade",
    desc: "ProStation Systems™ GPU workstations cut Cinema 4D render times by 68% vs old hardware.",
  },
  {
    icon: <Shield className="w-5 h-5 text-[#0055E5]" />,
    bg: "bg-[#0055E5]/10 border-blue-200/20",
    industry: "Hospital IT · Bangalore",
    headline: "Zero downtime in 2 years",
    desc: "72-point certified HP ProLiant servers powering PACS imaging — uptime SLA maintained since day one.",
  },
];

const SuccessBar: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);
  const storyPaused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!storyPaused.current)
        setActiveStory(prev => (prev + 1) % STORIES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#0F172A] border-y border-white/5 py-7 px-4 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateIn variant="fadeUp">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full" />
            <span className="text-orange-400 font-semibold uppercase tracking-widest text-[10px]">
              Enterprise Success Stories
            </span>
          </div>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-white/30 text-[10px]">Real clients · Real results</span>
        </div>
        </AnimateIn>

        {/* Story cards — MOBILE CAROUSEL */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden w-full"
            onMouseEnter={() => { storyPaused.current = true; }}
            onMouseLeave={() => { storyPaused.current = false; }}
            onTouchStart={() => { storyPaused.current = true; }}
            onTouchEnd={() => { setTimeout(() => { storyPaused.current = false; }, 1200); }}
          >
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeStory * 100}%)`, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            >
              {STORIES.map((s, i) => (
                <div key={i} className="w-full flex-shrink-0 px-0.5">
                  <div className={`flex flex-col gap-2 border rounded-xl p-4 ${s.bg}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        {s.icon}
                      </div>
                      <span className="text-white/40 text-[10px] font-semibold">{s.industry}</span>
                    </div>
                    <p className="text-white font-black text-sm leading-tight">{s.headline}</p>
                    <p className="text-white/50 text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveStory(i); storyPaused.current = true; setTimeout(() => { storyPaused.current = false; }, 3000); }}
                className={`rounded-full transition-all duration-300 ${i === activeStory ? "w-5 h-1.5 bg-orange-400" : "w-1.5 h-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Story cards — DESKTOP GRID */}
        <div className="hidden sm:grid grid-cols-3 gap-3">
          {STORIES.map((s, i) => (
            <AnimateIn key={i} variant="zoomInUp" delay={i * 100} duration={580}>
            <div
              className={`flex flex-col gap-2 border rounded-xl p-4 ${s.bg} transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-white/40 text-[10px] font-semibold">{s.industry}</span>
              </div>
              <p className="text-white font-black text-sm leading-tight">{s.headline}</p>
              <p className="text-white/50 text-[11px] leading-relaxed">{s.desc}</p>
            </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessBar;
