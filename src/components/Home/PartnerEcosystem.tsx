import React from "react";
import AnimateIn from "../AnimateIn";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Globe, Building2, ArrowRight,
  CheckCircle, Users, Award, Headphones, Zap,
} from "lucide-react";
import map from "../../assets/images/mapImg.png";
import yatra from "../../assets/images/yatra.png";
import hestabit from "../../assets/images/hestabit.png";
import rudra from "../../assets/images/Rudra.png";
import iskon from "../../assets/images/iskon.png";
import indowings from "../../assets/images/indowings-removebg-preview.png";
import convergent from "../../assets/images/convergent.png";

/* -- Client logo list (duplicated for infinite marquee) -- */
const brandLogos = [
  { src: yatra,    alt: "Yatra-Enterprise IT Client Serverwale"           },
  { src: hestabit, alt: "Hestabit Technology-Serverwale Partner"          },
  { src: rudra,    alt: "Rudra-Enterprise-Server Infrastructure Client"   },
  { src: iskon,    alt: "ISKON-Enterprise Hardware Partner"               },
  { src: indowings,alt: "Indowings-Technology  IT Solutions Partner"       },
  { src: convergent,alt:"Convergent-Cloud & Server Solutions Partner"     },
];

/* -- Who trusts us -- */
const CLIENT_TYPES = [
  { icon: Building2, label: "Enterprises & MNCs"  },
  { icon: Zap,       label: "Funded Startups"      },
  { icon: Globe,     label: "VFX & Media Studios"  },
  { icon: Users,     label: "Government & PSUs"    },
];

/* -- Location data -- */
const LOCATIONS = [
  {
    icon: MapPin,
    flag: "IND",
    country: "India HQ",
    desc: "Nehru Place, New Delhi , Mumbai , Bangalore , Pan-India Delivery",
    highlight: true,
  },
  {
    icon: Globe,
    flag: "UAE",
    country: "Dubai, UAE",
    desc: "Enterprise cloud & hardware supply for GCC-region clients",
    highlight: false,
  },
  {
    icon: Building2,
    flag: "CAN",
    country: "Canada",
    desc: "North America infrastructure region remote deployments",
    highlight: false,
  },
];

/* -- Trust points -- */
const TRUST_POINTS = [
  { icon: Award,      text: "Certified authorised dealer HP, Dell, Lenovo" },
  { icon: CheckCircle,text: "Quality-tested & warranty-backed hardware"       },
  { icon: Headphones, text: "24/7 dedicated support & AMC coverage"          },
];

const PartnerEcosystem: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-8 font-sans border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -- HEADER -- */}
        <AnimateIn variant="fadeUp">
        <div className="text-center mb-5 sm:mb-7 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
            <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
              Client Ecosystem & Global Presence
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] mb-3 sm:mb-4 leading-tight">
            Trusted by{" "}
            <span className="text-[#5BAEFF]">500+ Enterprises</span>{" "}
            Across India &amp; Beyond
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            From <strong className="text-[#0F172A]">funded startups & Fortune 500s</strong> to{" "}
            <strong className="text-[#0F172A]">VFX studios, government bodies & research institutes</strong>  powering India's most demanding IT environments.
          </p>
        </div>
        </AnimateIn>

        {/* -- WHO WE SERVE pill row -- */}
        <AnimateIn variant="fadeUp" delay={100}>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-5">
          {CLIENT_TYPES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 bg[#5BAEFF]/15 border border-[#0055E5] hover:bg-blue-50/50 text-slate-700 font-semibold text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors cursor-default"
            >
              <Icon size={12} className="text-[#0055E5]" />
              {label}
            </div>
          ))}
        </div>
        </AnimateIn>

        {/* -- CLIENT LOGO MARQUEE -- */}
        <AnimateIn variant="fadeUp" delay={160}>
        <div className="relative overflow-hidden mb-6 sm:mb-8">
          <style>{`
            @keyframes brandScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div
            className="flex items-center gap-6 sm:gap-10 w-max"
            style={{ animation: "brandScroll 28s linear infinite" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div
                key={i}
                className="
                  group flex-shrink-0 flex items-center justify-center
                  w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20
                  bg-white rounded-xl border border-slate-200
                  hover:border-[#0055E5]/30 hover:shadow-[0_8px_24px_rgba(2,6,23,0.10)]
                  hover:-translate-y-1 hover:scale-[1.05]
                  transition-all duration-300
                "
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-w-[76%] max-h-[65%] object-contain transition-all duration-300 group-hover:opacity-90"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
        </AnimateIn>

        {/* -- DIVIDER -- */}
        <div className="border-t border-slate-100 mb-6 sm:mb-6" />

        {/* -- GLOBAL PRESENCE � 2-col -- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT � Text + locations + trust + CTA */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
              <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
                Global Presence
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] mb-3 sm:mb-4 leading-tight">
              Pan-India Delivery.{" "}
              <span className="text-[#5BAEFF]">Global Reach.</span>
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
              Headquartered at <strong className="text-[#0F172A]">Nehru Place, New Delhi</strong> India's largest IT hardware market 
              with active clients across <strong className="text-[#0F172A]">6+ countries</strong>.
              We ship <strong className="text-[#0F172A]">certified refurbished servers</strong> pan-India with{" "}
              <strong className="text-[#0F172A]">same-day delivery in metro cities</strong> and
              support global deployments via remote onboarding.
            </p>

            {/* Location cards */}
            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
              {LOCATIONS.map(({ icon: Icon, flag, country, desc, highlight }, li) => (
                <AnimateIn key={country} variant="fadeLeft" delay={li * 100} duration={600}>
                <div
                  className={`flex items-start gap-3 sm:gap-4 rounded-xl p-3 sm:p-4 border transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-default
                    ${highlight
                      ? "bg-[#f0f6ff] border-[#0055E5]/30 hover:border-[#0055E5]"
                      : "bg-slate-50 border-slate-100 hover:border-slate-300"
                    }`}
                >
                  <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-base
                    ${highlight ? "bg-[#0055E5]/15 text-[#0055E5]" : "bg-slate-100 text-slate-500"}`}>
                    <span className="text-lg leading-none">{flag}</span>
                  </div>
                  <div>
                    <p className={`font-bold text-xs sm:text-sm ${highlight ? "text-[#0F172A]" : "text-slate-700"}`}>
                      {country}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>
                  </div>
                  {highlight && (
                    <div className="ml-auto shrink-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#0055E5] bg-[#0055E5]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        HQ
                      </span>
                    </div>
                  )}
                </div>
                </AnimateIn>
              ))}
            </div>

            {/* Trust points */}
            <AnimateIn variant="fadeUp" delay={200}>
            <div className="space-y-2 mb-4 sm:mb-5">
              {TRUST_POINTS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={14} className="text-[#0055E5] shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">{text}</span>
                </div>
              ))}
            </div>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn variant="zoomIn" delay={300}>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-[#22c55e] text-white font-bold px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl text-sm transition-all duration-250 hover:scale-[1.02] hover:shadow-[0_4px_20px_-2px_rgba(37,99,235,0.4)]"
            >
              Connect With Our Team <ArrowRight size={15} />
            </button>
            </AnimateIn>
          </div>

          {/* RIGHT � Map (desktop only) */}
          <AnimateIn variant="fadeRight" delay={200} duration={800}>
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Glow */}
            <div className="absolute w-[70%] h-[70%] rounded-full bg-[#0055E5]/20 blur-3xl z-0" />

            <div className="relative z-10 w-full max-w-lg">
              <img
                src={map}
                alt="Serverwale Global Infrastructure Presence � India UAE Canada"
                className="w-full transition-all duration-500 hover:scale-[1.03] drop-shadow-[0_0_30px_rgba(37,99,235,0.55)] drop-shadow-[0_0_70px_rgba(37,99,235,0.30)]"
              />

              {/* Client bubbles */}
              {[
                { top: "30%", left: "38%", img: "https://randomuser.me/api/portraits/men/12.jpg"  },
                { top: "35%", left: "55%", img: "https://randomuser.me/api/portraits/women/44.jpg"},
                { top: "45%", left: "74%", img: "https://randomuser.me/api/portraits/men/22.jpg"  },
                { top: "50%", left: "9%",  img: "https://randomuser.me/api/portraits/women/18.jpg"},
                { top: "58%", left: "48%", img: "https://randomuser.me/api/portraits/men/55.jpg"  },
              ].map((b, i) => (
                <div
                  key={i}
                  className="absolute w-10 h-10 rounded-full border-2 border-[#0055E5] overflow-hidden shadow-lg shadow-blue-300/30"
                  style={{ top: b.top, left: b.left }}
                >
                  <img src={b.img} alt="Client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          </AnimateIn>

        </div>

      </div>
    </section>
  );
};

export default PartnerEcosystem;
