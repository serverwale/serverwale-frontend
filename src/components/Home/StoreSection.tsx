import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../AnimateIn";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Star,
  Zap,
  Tag,
  Server,
  Cpu,
  Globe,
  Package,
} from "lucide-react";

const storeCategories = [
  {
    icon: <Server size={20} />,
    title: "Refurbished Servers",
    desc: "HP, Dell & Lenovo enterprise servers at 50-80% off with 1-year warranty.",
    tag: "BEST SELLER",
    link: "/shop/now?category=servers",
  },
  {
    icon: <Cpu size={20} />,
    title: "GPU Workstations",
    desc: "Ready-to-ship ProStation Systems™ GPU workstations for AI, VFX & rendering.",
    tag: "NEW ARRIVAL",
    link: "/shop/now?category=gpu-workstations",
  },
  {
    icon: <Globe size={20} />,
    title: "Networking Gear",
    desc: "Cisco, HP & Dell switches, routers & firewalls — tested & certified.",
    tag: "IN STOCK",
    link: "/shop/now?category=networking",
  },
  {
    icon: <Package size={20} />,
    title: "Storage & Accessories",
    desc: "NAS, RAID arrays, NVMe SSDs, RAM modules & enterprise accessories.",
    tag: "POPULAR",
    link: "/shop/now?category=storage",
  },
];

/* ── Card shared JSX helper ── */
const CategoryCard = ({ item }: { item: typeof storeCategories[0] }) => (
  <Link
    to={item.link}
    className="group bg-white border border-slate-200 rounded-xl p-3 sm:p-4 hover:border-[#0055E5] hover:shadow-[0_8px_24px_rgba(37,99,235,0.10)] transition-all duration-300 block h-full"
  >
    <div className="flex items-start justify-between mb-2 sm:mb-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 rounded-lg sm:rounded-xl flex items-center justify-center text-[#f59e09] group-hover:bg-[#f59e09] group-hover:text-white transition border border-slate-200 shrink-0">
        {item.icon}
      </div>
      <span className="text-[8px] sm:text-[9px] font-black bg-green-100 text-[#22c55e] border border-green-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none mt-0.5">
        {item.tag}
      </span>
    </div>
    <h4 className="font-black text-[#0F172A] text-[12px] sm:text-sm mb-1 leading-snug">{item.title}</h4>
    <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">{item.desc}</p>
    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-[#0055E5] text-[10px] sm:text-xs font-bold">
      Shop Now <ArrowRight size={10} />
    </div>
  </Link>
);

const StoreSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cardPaused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!cardPaused.current)
        setActiveCard(prev => (prev + 1) % storeCategories.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-slate-50 py-8 sm:py-9 lg:py-8 px-4 sm:px-6 font-sans border-t border-slate-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Label */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5">
          <div className="w-2.5 h-2.5 bg-[#5BAEFF] rounded-full" />
          <p className="text-[#5BAEFF] font-semibold uppercase tracking-wide text-[10px] sm:text-xs">
            Serverwale&#x2122; Online Store
          </p>
        </div>

        {/* Main Grid — single col on mobile, 2-col from lg */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* ── LEFT CONTENT ── */}
          <AnimateIn variant="fadeLeft" duration={700}>
            <div className="flex flex-col gap-4 sm:gap-5 min-w-0">

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-[#0F172A] leading-tight mb-2 sm:mb-3">
                  Buy <span className="text-[#0055E5]">Servers &amp; IT Hardware</span>{" "}
                  Online &#x2014; Instantly
                </h2>
                <p className="text-slate-600 text-[12px] sm:text-[13px] lg:text-base leading-relaxed">
                  Browse our curated online store for{" "}
                  <strong>in-stock refurbished servers</strong>,{" "}
                  <strong>ProStation Systems&#x2122; workstations</strong>, networking
                  equipment &amp; IT accessories. Every product is{" "}
                  <strong>priced transparently, quality-tested</strong>, and ships with warranty.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {[
                  { icon: <BadgeCheck size={13} />, text: "Genuine hardware" },
                  { icon: <Tag size={13} />, text: "Transparent pricing" },
                  { icon: <ShieldCheck size={13} />, text: "1-year warranty" },
                  { icon: <Truck size={13} />, text: "Pan-India delivery" },
                  { icon: <Zap size={13} />, text: "Same-day dispatch NCR" },
                  { icon: <Star size={13} />, text: "Rated 4.9/5" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 text-[11px] sm:text-sm min-w-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border border-blue-100 rounded-md flex items-center justify-center text-[#0055E5] shrink-0">
                      {b.icon}
                    </div>
                    <span className="truncate">{b.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "500+", label: "Products", cls: "bg-blue-50 border-blue-200", valCls: "text-[#0055E5]" },
                  { value: "50-80%", label: "Below Market", cls: "bg-orange-50 border-orange-200", valCls: "text-orange-600" },
                  { value: "1-Year", label: "Warranty", cls: "bg-blue-50 border-blue-200", valCls: "text-[#0055E5]" },
                ].map((s, i) => (
                  <div key={i} className={`border rounded-lg sm:rounded-xl p-2 sm:p-3 text-center shadow-sm ${s.cls}`}>
                    <div className={`text-sm sm:text-lg font-black ${s.valCls}`}>{s.value}</div>
                    <div className="text-slate-600 text-[9px] sm:text-[10px] mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <Link
                  to="/shop/now"
                  className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm transition-all duration-250 shadow-md hover:shadow-[0_4px_20px_-2px_rgba(34,197,94,0.45)] hover:-translate-y-0.5"
                >
                  <ShoppingBag size={14} />
                  Visit Our Store
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </AnimateIn>

          {/* ── RIGHT — MOBILE CAROUSEL (< md) ── */}
          <div className="md:hidden flex flex-col gap-3 min-w-0">
            <div
              className="overflow-hidden w-full"
              onMouseEnter={() => { cardPaused.current = true; }}
              onMouseLeave={() => { cardPaused.current = false; }}
              onTouchStart={() => { cardPaused.current = true; }}
              onTouchEnd={() => { setTimeout(() => { cardPaused.current = false; }, 1200); }}
            >
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeCard * 100}%)`, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              >
                {storeCategories.map((item, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <CategoryCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5">
              {storeCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveCard(i); cardPaused.current = true; setTimeout(() => { cardPaused.current = false; }, 3000); }}
                  className={`rounded-full transition-all duration-300 ${i === activeCard ? "w-5 h-1.5 bg-[#0055E5]" : "w-1.5 h-1.5 bg-slate-300"}`}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <Link
              to="/shop/now"
              className="flex items-center justify-between bg-[#0F172A] rounded-xl p-3 group hover:bg-[#1E293B] transition"
            >
              <div>
                <p className="text-white font-black text-sm">500+ Products Ready to Ship</p>
                <p className="text-slate-400 text-[10px] mt-0.5">Servers &#xB7; Workstations &#xB7; Networking &#xB7; Storage</p>
              </div>
              <div className="w-9 h-9 bg-[#0055E5] rounded-lg flex items-center justify-center group-hover:scale-110 transition shrink-0">
                <ArrowRight size={16} className="text-white" />
              </div>
            </Link>
          </div>

          {/* ── RIGHT — TABLET + DESKTOP GRID (md+) ── */}
          <div className="hidden md:flex md:flex-col md:gap-3 min-w-0">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {storeCategories.map((item, i) => (
                <AnimateIn key={i} variant="zoomInUp" delay={i * 90} duration={580}>
                  <CategoryCard item={item} />
                </AnimateIn>
              ))}
            </div>

            {/* Bottom CTA */}
            <AnimateIn variant="fadeUp" delay={380} duration={500}>
              <Link
                to="/shop/now"
                className="flex items-center justify-between bg-[#0F172A] rounded-xl p-4 group hover:bg-[#1E293B] transition"
              >
                <div>
                  <p className="text-[#f59e09] font-black text-sm">500+ Products Ready to Ship</p>
                  <p className="text-slate-400 text-xs mt-0.5">Servers &#xB7; Workstations &#xB7; Networking &#xB7; Storage</p>
                </div>
                <div className="w-10 h-10 bg-[#f59e09] rounded-xl flex items-center justify-center group-hover:scale-110 transition shrink-0">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </Link>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreSection;
