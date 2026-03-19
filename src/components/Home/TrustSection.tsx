import React from "react";
import AnimateIn from "../AnimateIn";
import yatra from "../../assets/images/hp.png";
import hestabit from "../../assets/images/Dell-Logo.png";
import rudra from "../../assets/images/samsung.png";
import iskon from "../../assets/images/lenovo.png";
import convergent from "../../assets/images/convergent.png";

import { ShieldCheck, Award, Clock, Users } from "lucide-react";

const brandLogos = [
  { src: iskon,      alt: "Lenovo ThinkSystem Server Dealer India",     label: "Lenovo Partner"  },
  { src: yatra,      alt: "HP ProLiant Certified Server Dealer India",  label: "HP Authorized"   },
  { src: convergent, alt: "Convergent Technology Partner Serverwale",   label: "Tech Partner"    },
  { src: rudra,      alt: "Samsung Storage Solutions Partner India",    label: "Samsung Partner" },
  { src: hestabit,   alt: "Dell PowerEdge Server Dealer India",         label: "Dell Partner"    },
];

const TRUST_STATS = [
  { icon: Users, value: "100+", label: "Enterprise Clients" },
  { icon: Award, value: "7+ Yrs", label: "Industry Experience" },
  { icon: ShieldCheck, value: "3-Yr", label: "Hardware Warranty" },
  { icon: Clock, value: "24×7", label: "Expert Support" },
];

const TrustSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-8 sm:py-10 px-4 md:px-6 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <AnimateIn variant="fadeUp">
        <div className="text-center mb-4 sm:mb-6 max-w-3xl mx-auto">

          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <div className="w-2 h-2 bg-[#0055E5] rounded-full" />

            <p className="text-[#0055E5] font-semibold tracking-widest uppercase text-[9px] sm:text-xs">
              Certified Brand Partnerships
            </p>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#0F172A] mb-2 sm:mb-4 leading-tight">
            Authorised Dealer of the World's{" "}
            <span className="text-[#5BAEFF]">
              Most Trusted Server Brands
            </span>
          </h2>

          <p className="text-slate-600 text-[12px] sm:text-sm leading-relaxed">
            Authorised reseller & certified partner for{" "}
            <strong className="text-[#0F172A]">HP, Dell, Lenovo & Samsung</strong> — every server is quality-tested and warranty-backed at{" "}
            <strong className="text-[#0F172A]">60–80% below retail price</strong>.
          </p>
        </div>
        </AnimateIn>

        {/* Cert Badges */}
        <AnimateIn variant="fadeUp" delay={100}>
        <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-5">
          {[
            { emoji: "🏅", label: "ISO 9001 Certified" },
            { emoji: "🤝", label: "HP Authorized Dealer" },
            { emoji: "🤝", label: "Dell Certified Partner" },
            { emoji: "🤝", label: "Lenovo Business Partner" },
            { emoji: "☁️", label: "Microsoft Cloud Partner" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 bg-white border border-blue-100 text-[#003080] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
            >
              <span>{badge.emoji}</span>
              {badge.label}
            </span>
          ))}
        </div>
        </AnimateIn>

        {/* Brand logos */}

<div className="grid grid-cols-5 gap-2 sm:gap-6 md:gap-8 mb-4 sm:mb-4">

  {brandLogos.map((brand, i) => (
    <AnimateIn key={i} variant="zoomIn" delay={i * 80} duration={500}>
    <div
      className="
        group flex flex-col items-center justify-center gap-1.5
        h-auto
        bg-white rounded-lg sm:rounded-xl
        border border-slate-200
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.05]
        hover:shadow-[0_8px_24px_rgba(2,6,23,0.10)]
        hover:border-[#0055E5]/30
        py-3 px-2
      "
    >
      <img
        src={brand.src}
        alt={brand.alt}
        loading="lazy"
        className="w-full max-h-8 sm:max-h-10 object-contain"
      />
      <span className="text-[8px] sm:text-[9px] font-semibold text-slate-400 group-hover:text-blue-500 transition-colors tracking-wide text-center leading-tight">
        {brand.label}
      </span>
    </div>
    </AnimateIn>
  ))}

</div>

        {/* TRUST STATS */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">

          {TRUST_STATS.map(({ icon: Icon, value, label }, i) => (
            <AnimateIn key={label} variant="zoomInUp" delay={i * 100} duration={550}>
            <div
              className="flex flex-col items-center gap-1 bg-white sm:bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl py-2.5 sm:py-4 px-2"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0055E5]" />

              <span className="text-[#0F172A] font-black text-sm sm:text-lg leading-tight">
                {value}
              </span>

              <span className="text-slate-500 text-[10px] sm:text-xs text-center leading-tight">
                {label}
              </span>
            </div>
            </AnimateIn>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TrustSection;