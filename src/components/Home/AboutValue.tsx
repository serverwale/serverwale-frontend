import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimateIn from "../AnimateIn";
import {
  Server,
  Cpu,
  HardDrive,
  Building2,
  MapPin,
  Award,
  ShieldCheck,
  Zap,
  Package,
} from "lucide-react";

import top from "../../assets/images/about1.png";
import bottom from "../../assets/images/about.png";
import bottom2 from "../../assets/images/about2.png";

const BRANDS = [
  {
    icon: <Server className="w-4 h-4 text-[#f59e09]" />,
    name: "HP ProLiant Servers",
    sub: "DL380, DL360, ML series",
  },
  {
    icon: <Server className="w-4 h-4 text-[#f59e09]" />,
    name: "Dell PowerEdge Servers",
    sub: "R740, R640, T640 series",
  },
  {
    icon: <Server className="w-4 h-4 text-[#f59e09]" />,
    name: "Lenovo ThinkSystem",
    sub: "SR650, SR630 rack servers",
  },
  {
    icon: <Cpu className="w-4 h-4 text-[#f59e09]" />,
    name: "GPU Servers India",
    sub: "NVIDIA A100, RTX A6000",
  },
  {
    icon: <HardDrive className="w-4 h-4 text-[#f59e09]" />,
    name: "Storage Servers",
    sub: "NAS, SAN solutions",
  },
  {
    icon: <Building2 className="w-4 h-4 text-[#f59e09]" />,
    name: "AI Workstations",
    sub: "ML, Deep Learning ready",
  },
];

const CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
];

const AboutValue: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <AnimateIn variant="fadeUp">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
          <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[9px] sm:text-xs">
            India's Trusted IT Infrastructure Partner Since 2017
          </p>
        </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="flex flex-col">

            {/* Heading */}
            <AnimateIn variant="fadeUp" delay={60}>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-3 sm:mb-5">
              India's #1 Certified{" "}
              <span className="text-[#5BAEFF]">
                Refurbished Server & Workstation Partner
              </span>
            </h2>
            </AnimateIn>

            {/* Mobile images */}
            <div className="lg:hidden mb-4">
              <ImagesBlock />
            </div>

            {/* Para */}
            <AnimateIn variant="fadeUp" delay={120}>
            <p className="text-[13px] sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
              Headquartered at <strong>Nehru Place, New Delhi</strong>, we specialise in{" "}
              <Link to="/product" className="font-bold text-[#003EA3] hover:text-[#0055E5] transition-colors">HP ProLiant</Link>,{" "}
              <Link to="/product" className="font-bold text-[#003EA3] hover:text-[#0055E5] transition-colors">Dell PowerEdge</Link> &{" "}
              <Link to="/product" className="font-bold text-[#003EA3] hover:text-[#0055E5] transition-colors">Lenovo ThinkSystem</Link>{" "}
              servers quality-tested, <strong>60-80% below market price</strong>, backed by a{" "}
              <strong>1-year warranty</strong>. Also home to{" "}
              <Link to="/product" className="font-bold text-[#003EA3] hover:text-[#0055E5] transition-colors">ProStation Systems</Link>{" "}
              India's own{" "}
              <Link to="/services/hpc-solutions" className="font-bold text-[#003EA3] hover:text-[#0055E5] transition-colors">GPU workstation</Link>{" "}
              brand for AI/ML, 3D &amp; VFX. Your one-stop IT infrastructure partner.
            </p>
            </AnimateIn>

            {/* Brands */}
            <AnimateIn variant="fadeUp" delay={180}>
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#0055E5]" />
              Server Brands We Specialise In
            </h3>

{/* Brands grid */}
<div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
  {BRANDS.map((b) => (
    <Link
      key={b.name}
      to="/product"
      className="group flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 hover:border-[#0055E5]/60 hover:bg-blue-50/40 transition-all duration-200"
    >
      
      {/* Icon */}
      <div className="flex items-center justify-center w-7 h-7 bg-white rounded-md text-[#f59e0b] transition-all duration-300 group-hover:bg-[#f59e0b]">
        <span className="group-hover:text-white [&>svg]:transition-colors [&>svg]:group-hover:text-white">
          {b.icon}
        </span>
      </div>

      {/* Text */}
      <div>
        <p className="text-gray-900 font-semibold text-[11px] sm:text-sm leading-tight">
          {b.name}
        </p>
        <p className="text-gray-400 text-[9px] sm:text-xs">
          {b.sub}
        </p>
      </div>

    </Link>
  ))}
</div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[
                { icon: <ShieldCheck className="w-3 h-3" />, label: "1-Year Warranty" },
                { icon: <Zap className="w-3 h-3" />, label: "Same-Day Delivery" },
                { icon: <Package className="w-3 h-3" />, label: "5000+ Servers Delivered" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-1 bg-[#5BAEFF]/10 text-[#0055e5] border border-[#5BAEFF]/25 text-[9px] sm:text-xs px-2.5 py-1 rounded-full"
                >
                  <span className="text-[#0055e5]">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
            </AnimateIn>

            {/* Location */}
            <AnimateIn variant="fadeUp" delay={260}>
            <div className="bg-[#f59e09]/10  border border-[#f59e09] rounded-lg p-3 sm:p-5 mb-4">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#f59e09]" />
                Pan-India Server Supply
              </h4>

              <p className="text-gray-600 text-[12px] sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                We supply <strong>servers in Delhi NCR</strong>, Mumbai,
                Bangalore, Hyderabad, Chennai, Pune & all major cities.{" "}
                <strong>Same-day delivery</strong> available in metro areas.
              </p>

              <div className="flex flex-wrap gap-1">
                {CITIES.map((city) => (
                  <span
                    key={city}
                    className="bg-[#f59e09]/5 px-2 py-0.5 rounded-full text-[10px] text-[#f59e09] border border-[#f59e09]"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
            </AnimateIn>

            {/* Button */}
            <AnimateIn variant="zoomIn" delay={340}>
            <button
              onClick={() => navigate("/about")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-[#22c55e] text-white font-bold text-xs sm:text-sm rounded-full shadow hover:shadow-[#0055E5]/30 hover:scale-[1.03] transition-all duration-250 w-fit"
            >
              More About Us
            </button>
            </AnimateIn>

          </div>

          {/* Desktop images */}
          <AnimateIn variant="fadeRight" delay={200} duration={800}>
          <div className="hidden lg:block mt-8">
            <ImagesBlock />
          </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};

export default AboutValue;

/* IMAGE BLOCK */

const ImagesBlock = () => (
  <div className="flex flex-col gap-3 sm:gap-6">

    <div className="relative rounded-2xl overflow-hidden shadow-xl">
      <img
        src={top}
        alt="HP Dell server dealers in Delhi India"
        className="w-full object-cover aspect-[4/3]"
      />

      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md shadow">
        <div className="flex items-center gap-1">
          <Award className="w-3 h-3 text-[#0055E5]" />
          <span className="text-[10px] font-semibold text-gray-800">
            Authorized Server Dealer
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 sm:gap-5">

      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={bottom}
          alt="Refurbished enterprise servers India"
          className="w-full object-cover aspect-square"
        />

        <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded-md shadow">
          <span className="text-[10px] font-semibold text-gray-800">
            500+ Clients
          </span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={bottom2}
          alt="Rack servers and GPU workstations"
          className="w-full object-cover aspect-square"
        />

        <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded-md shadow">
          <span className="text-[10px] font-semibold text-gray-800">
            5000+ Delivered
          </span>
        </div>
      </div>

    </div>

  </div>
);