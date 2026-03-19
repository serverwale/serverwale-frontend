import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, Clock, Globe, TrendingDown,
  BadgeCheck, Wrench, ChevronRight,
} from "lucide-react";
import AnimateIn from "../AnimateIn";

const REASONS = [
  {
    icon: BadgeCheck,
    iconColor: "text-[#0055E5]",
    iconBg: "bg-[#D3E8FF] border-[#B3D5FF]",
    dotActive: "bg-[#0055E5]",
    title: "Certified Refurbished Hardware",
    desc: "Every server passes a 72-point QC checklist tested for stability, memory integrity, and performance before it ships.",
  },
  {
    icon: TrendingDown,
    iconColor: "text-[#D97706]",
    iconBg: "bg-[#FEF3C7] border-[#FDE68A]",
    dotActive: "bg-[#F59E0B]",
    title: "60-80% Below New Retail Price",
    desc: "Same HP, Dell & Lenovo quality at a fraction of the cost. Save lakhs on infrastructure without sacrificing performance.",
    highlighted: true,
  },
  {
    icon: ShieldCheck,
    iconColor: "text-[#DC2626]",
    iconBg: "bg-[#FEE2E2] border-[#FECACA]",
    dotActive: "bg-[#DC2626]",
    title: "1-Year Warranty on All Hardware",
    desc: "Full replacement warranty included. No hidden charges, no fine print just reliable coverage on every server we sell.",
  },
  {
    icon: Clock,
    iconColor: "text-[#64748B]",
    iconBg: "bg-[#F1F5F9] border-[#E2E8F0]",
    dotActive: "bg-slate-400",
    title: "24/7 Expert Support",
    desc: "Dedicated infrastructure engineers available round the clock for troubleshooting, config advice, and escalations.",
  },
  {
    icon: Globe,
    iconColor: "text-[#6366F1]",
    iconBg: "bg-[#EEF2FF] border-[#DDD6FE]",
    dotActive: "bg-[#6366F1]",
    title: "Pan-India & Global Delivery",
    desc: "Same-day dispatch in Delhi NCR. Fast shipping to all major Indian cities and 30+ countries worldwide.",
  },
  {
    icon: Wrench,
    iconColor: "text-[#0369A1]",
    iconBg: "bg-[#CFFAFE] border-[#A5F3FC]",
    dotActive: "bg-[#0EA5E9]",
    title: "10+ Years IT Infrastructure Expertise",
    desc: "From startups to Fortune 500 , we've deployed thousands of servers across banking, healthcare, VFX, and cloud industries.",
  },
];

const TOTAL = REASONS.length;

const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((p) => (p + 1) % TOTAL);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-8 sm:py-14 px-4 font-sans border-b border-slate-100 overflow-hidden bg-[#F8FAFC]">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <AnimateIn variant="fadeUp">
        <div className="text-center mb-6 sm:mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
            <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
              Why 500+ Enterprises Choose Us
            </p>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#0F172A] leading-tight mb-2 sm:mb-3">
            The Serverwale Advantage —{" "}
            <span className="text-[#5BAEFF]">
              Built to Scale Your Business
            </span>
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-sm leading-relaxed">
            Not just hardware — a complete infrastructure partnership that saves money,
            reduces risk, and grows with your business.
          </p>
        </div>
        </AnimateIn>

        {/* ── DESKTOP (sm+): 3-column grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimateIn key={i} variant="zoomInUp" delay={i * 90} duration={600}>
              <div
                className={`group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-250 hover:-translate-y-1 relative overflow-hidden
                  ${r.highlighted
                    ? "bg-[#FFF8E1] border-2 border-[#F59E0B]/40 hover:border-[#F59E0B]/70 hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]"
                    : "bg-white border border-[#E2E8F0] hover:border-[#0055E5]/40 hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
                  }`}
              >
                {r.highlighted && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-[#F59E0B] text-white px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-250 group-hover:scale-110 ${r.iconBg}`}>
                  <Icon className={`w-5 h-5 ${r.iconColor}`} />
                </div>
                <div>
                  <h3 className={`font-bold text-sm sm:text-base leading-snug mb-1.5 ${r.highlighted ? "text-[#D97706]" : "text-[#0F172A]"}`}>
                    {r.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">{r.desc}</p>
                </div>
              </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* ── MOBILE (<sm): full-width auto-sliding carousel ── */}
        <div
          className="sm:hidden"
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { setTimeout(() => { pausedRef.current = false; }, 1500); }}
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {REASONS.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    className={`min-w-full flex flex-col gap-3 rounded-2xl p-4 relative overflow-hidden
                      ${r.highlighted
                        ? "bg-[#FFF8E1] border-2 border-[#F59E0B]/40"
                        : "bg-white border border-[#E2E8F0]"
                      }`}
                  >
                    {r.highlighted && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-black uppercase tracking-widest bg-[#F59E0B] text-white px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${r.iconBg}`}>
                      <Icon className={`w-5 h-5 ${r.iconColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm leading-snug mb-1 ${r.highlighted ? "text-[#D97706]" : "text-[#0F172A]"}`}>
                        {r.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                    </div>
                    <p className="text-slate-300 text-[9px] font-semibold mt-auto">
                      {i + 1} / {TOTAL}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {REASONS.map((r, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); pausedRef.current = false; }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-5 ${r.dotActive}` : "w-1.5 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/about")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#E2E8F0] text-slate-600 hover:text-[#0055E5] hover:border-[#0055E5]/40 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 bg-white"
          >
            Our Story <ChevronRight size={13} />
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-[0_4px_16px_rgba(34,197,94,0.35)] transition-all duration-200"
          >
            Get a Quote <ChevronRight size={13} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
