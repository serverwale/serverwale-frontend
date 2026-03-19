import React, { useState, useEffect, useRef } from "react";
import AnimateIn from "../AnimateIn";
import { useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Server, ChevronRight } from "lucide-react";

const WA_NUM = "919999656064";
const WA_MSG = encodeURIComponent("Hi! I'd like to talk to a server expert about my infrastructure requirements.");

const ACTIONS = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#0055E5]" />,
    accent: "bg-[#0055E5]/10 border-blue-500/20",
    iconBg: "bg-[#0055E5]/15",
    label: "Talk to a Server Expert",
    sub: "WhatsApp response in under 2 mins",
    cta: "Chat Now",
    ctaClass: "bg-[#0055E5] hover:bg-[#0044BB] text-white",
    dotActive: "bg-[#0055E5]",
    action: "wa",
  },
  {
    icon: <FileText className="w-5 h-5 text-slate-400" />,
    accent: "bg-[#7C3AED]/10 border-[#7C3AED]/10",
    iconBg: "bg-[#7C3AED]/15",
    label: "Get a Custom Quote",
    sub: "Tell us specs — get price in 30 mins",
    cta: "Request Quote",
    ctaClass: "bg-[#7C3AED] hover:bg-white/20 border border-white/20 text-white",
    dotActive: "bg-[#7C3AED]",
    action: "contact",
  },
  {
    icon: <Server className="w-5 h-5 text-[#F59E0B]" />,
    accent: "bg-[#F59E0B]/10 border-[#F59E0B]/20",
    iconBg: "bg-[#F59E0B]/15",
    label: "Browse 500+ Servers In Stock",
    sub: "HP · Dell · Lenovo · GPU systems",
    cta: "View Catalogue",
    ctaClass: "bg-[#F59E0B] hover:bg-[#F59E0B] text-white",
    dotActive: "bg-[#F59E0B]",
    action: "product",
  },
];

const TOTAL = ACTIONS.length;

const QuickCTA: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const handleAction = (action: string) => {
    if (action === "wa") window.open(`https://wa.me/${WA_NUM}?text=${WA_MSG}`, "_blank");
    else if (action === "contact") navigate("/contact");
    else if (action === "product") navigate("/product");
  };

  // Auto-slide (mobile only — desktop grid doesn't need it but state is harmless)
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((p) => (p + 1) % TOTAL);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-white/5 py-4 sm:py-5 px-4 font-sans" style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── DESKTOP (md+): 3-column grid ── */}
        <AnimateIn variant="fadeUp">
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          {ACTIONS.map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${a.accent} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.iconBg}`}>
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-snug">{a.label}</p>
                <p className="text-white/50 text-[10px] leading-tight mt-0.5">{a.sub}</p>
              </div>
              <button
                onClick={() => handleAction(a.action)}
                className={`shrink-0 text-[11px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200 ${a.ctaClass}`}
              >
                {a.cta} <ChevronRight size={11} />
              </button>
            </div>
          ))}
        </div>
        </AnimateIn>

        {/* ── MOBILE (<md): full-width auto-sliding carousel ── */}
        <div
          className="md:hidden"
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { setTimeout(() => { pausedRef.current = false; }, 1500); }}
        >
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {ACTIONS.map((a, i) => (
                <div
                  key={i}
                  className={`min-w-full flex items-center gap-3 border px-4 py-4 ${a.accent}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.iconBg}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm leading-snug">{a.label}</p>
                    <p className="text-white/50 text-[10px] leading-tight mt-0.5">{a.sub}</p>
                  </div>
                  <button
                    onClick={() => handleAction(a.action)}
                    className={`shrink-0 text-[11px] font-black px-3 py-2 rounded-lg flex items-center gap-1 ${a.ctaClass}`}
                  >
                    {a.cta} <ChevronRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-2.5">
            {ACTIONS.map((a, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); pausedRef.current = false; }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-5 ${a.dotActive}` : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default QuickCTA;
