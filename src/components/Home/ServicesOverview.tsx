import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "../../constants";
import CanvasBg from "../CanvasBg";
import AnimateIn from "../AnimateIn";

const ServicesOverview: React.FC = () => {
  return (
    <section
      className="relative w-full font-sans py-8 sm:py-10 lg:py-8 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}
      id="services"
    >
      <CanvasBg variant="blue" count={65} />
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-20">

        {/* ── Header ── */}
        <AnimateIn variant="fadeUp">
        <div className="mb-6 sm:mb-8 text-white max-w-5xl">
          <h2 className="text-[#5BAEFF] font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2 sm:mb-3">
            Our Expertise
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-tight">
            Enterprise-Grade Infrastructure{" "}
            <span className="text-[#5BAEFF]">Built to Scale Your Business</span>
          </h3>
          <p className="text-slate-300 mt-2 sm:mt-3 text-sm leading-relaxed max-w-3xl">
            From <strong className="text-white">refurbished servers to cloud & GPU workstations</strong> —
            designed, deployed & supported end-to-end. Your team focuses on growth; we handle the infrastructure.
          </p>
        </div>
        </AnimateIn>

        {/* ── Services Cards ──
            Mobile  : horizontal swipe (flex + overflow-x-auto), no buttons
            Desktop : fixed grid, full width, no scroll at all
        ── */}
        <div
          className="
            flex gap-5 overflow-x-auto hide-scrollbar touch-pan-x pb-4
            lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0 lg:gap-4
          "
        >
          {SERVICES.map((service, idx) => (
            <AnimateIn key={service.id} variant="fadeUp" delay={idx * 90} duration={600}>
            <div
              className="min-w-[260px] sm:min-w-[290px] lg:min-w-0 flex-shrink-0 lg:flex-shrink"
            >
              <Link to={`/services/${service.id}`} className="block group h-full hover:-translate-y-1 transition-transform duration-250">
                <div className="flex flex-col h-full">

                  {/* Image */}
                  <div className="w-full h-[170px] sm:h-[200px] lg:h-[180px] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h4 className="text-white text-sm font-bold mb-1.5 leading-snug">
                      {service.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[#F59E0B] font-semibold text-xs group-hover:gap-2.5 transition-all">
                      Explore <ArrowUpRight size={13} />
                    </span>
                  </div>

                </div>
              </Link>
            </div>
            </AnimateIn>
          ))}
        </div>

        {/* ── Footer: View All link only ── */}
        <AnimateIn variant="fadeUp" delay={200}>
        <div className="mt-5 sm:mt-6 flex justify-end">
          <Link
            to="/services"
            className="inline-flex  text-white items-center gap-2 text-[#60] font-bold text-xs sm:text-sm hover:gap-4 hover:text-white transition-all"
          >
            View All Services <ArrowRight size={14} />
          </Link>
        </div>
        </AnimateIn>

      </div>
    </section>
  );
};

export default ServicesOverview;
