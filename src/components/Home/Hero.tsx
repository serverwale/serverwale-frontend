import React, { useEffect, useState } from "react";
import {
  ArrowRight, ChevronRight, ShieldCheck, Users,
  Package, Globe, Zap, Award, IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import server3 from "../../assets/images/hero1 (1).png";
import server from "../../assets/images/hero1 (2).png";
import server4 from "../../assets/images/hero1 (3).png";

interface Slide {
  badge: string;
  badgeIcon: React.ReactNode;
  title1: string;
  title2: string;
  desc: React.ReactNode;
  image: string;
  cta1: string;
  cta2: string;
}

const slides: Slide[] = [
  {
    badge: "India's #1 Refurbished Server Dealer — Since 2017",
    badgeIcon: <Award className="w-3.5 h-3.5" />,
    title1: "Buy Certified Refurbished Servers &",
    title2: "Enterprise IT Infrastructure at 60–80% Off",
    desc: (
      <>
        <strong className="text-white">HP ProLiant, Dell PowerEdge &amp; Lenovo ThinkSystem</strong> servers —
        rigorously <strong className="text-white">72-point tested</strong>, backed by{" "}
        <strong className="text-white">1-year warranty</strong>, shipped pan-India.
        Trusted by <strong className="text-white">500+ businesses</strong> from startups to Fortune 500.
      </>
    ),
    image: server3,
    cta1: "Browse All Products",
    cta2: "Talk to Expert",
  },
  {
    badge: "Authorised HP, Dell & Lenovo Dealers — Nehru Place, Delhi",
    badgeIcon: <ShieldCheck className="w-3.5 h-3.5" />,
    title1: "Premium HP ProLiant &",
    title2: "Dell PowerEdge Servers — Configured for You",
    desc: (
      <>
        Custom-configured <strong className="text-white">enterprise rack servers, tower servers &amp; blade systems</strong>{" "}
        for data centers, SMBs &amp; startups.{" "}
        <strong className="text-white">Same-day dispatch in Delhi NCR</strong>.
        Save <strong className="text-white">60–80% vs new hardware</strong> — zero compromise on performance.
      </>
    ),
    image: server,
    cta1: "See Server Catalogue",
    cta2: "Get Custom Quote",
  },
  {
    badge: "ProStation Systems™ GPU Workstations — India's Own Brand",
    badgeIcon: <Zap className="w-3.5 h-3.5" />,
    title1: "ProStation Systems™ GPU Workstations &",
    title2: "AI Servers Built for High-Performance Computing",
    desc: (
      <>
        <strong className="text-white">Custom GPU workstations</strong> for{" "}
        <strong className="text-white">AI/ML, 3D rendering, VFX &amp; deep learning</strong> — engineered in India.
        Components sourced from international markets, assembled &amp; QC-tested at{" "}
        <strong className="text-white">Nehru Place, New Delhi</strong>.
        Built to your exact specs.
      </>
    ),
    image: server4,
    cta1: "Explore ProStation Systems™",
    cta2: "Build Custom System",
  },
];

const STATS = [
  { value: "100+",    label: "Enterprises Served",  icon: Users    },
  { value: "1000+", label: "Servers Delivered",   icon: Package  },
  { value: "3+",     label: "Countries Reached",   icon: Globe    },
];

const WA_NUM = "919999656064";

const Hero: React.FC<{ setCurrentPage?: (p: string) => void }> = () => {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 300);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative min-h-[68vh] md:min-h-[72vh] flex items-center pt-16 overflow-hidden bg-[#0F172A] font-sans">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-[0.18] transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A]/96 to-[#1E293B]/88" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(37,99,235,0.12),transparent_60%)]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className={`space-y-4 sm:space-y-5 max-w-xl transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#003080]/15 text-[#0055E5] px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-[#003080]/40">
              {slide.badgeIcon}
              {slide.badge}
            </div>

            {/* Heading */}
                   <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-50 leading-tight">
              {slide.title1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5BAEFF] via-[#8ac8ff] to-slate-200">
                {slide.title2}
              </span>
            </h1>

            {/* Credibility proof line */}
            <p className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B]">
              <span className="w-4 h-px bg-[#F59E0B]/25" />
              Trusted by 500+ Enterprises Across India &amp; 30+ Countries
              <span className="w-4 h-px bg-[#F59E0B]/25" />
            </p>

            {/* Description with bold keywords */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {slide.desc}
            </p>

            {/* Trust badge chips */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/25 text-[#7C3AED]">
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                7+ Years Experience
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0055E5]/10 border border-blue-500/25 text-blue-300">
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                100+ Enterprise Clients
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B]">
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Up to 80% Cost Savings
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => navigate("/product")}
                className="bg-[#0055E5] hover:bg-[#0044BB] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-black
                           hover:shadow-0 10px 25px rgba(37,99,235,0.25)]
                           flex items-center justify-center gap-2 transition-all duration-250 hover:-translate-y-0.5"
              >
                {slide.cta1} <ChevronRight size={15} />
              </button>
              <a
                href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent("Hi, I want to discuss enterprise infrastructure and server solutions.")}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#41a650] border border-[#41a650]/25 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold
                           hover:bg-[#56db6a] hover:border-[#56db6a] hover:text-white
                           flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaWhatsapp size={15} /> {slide.cta2}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-black text-[#0055E5]">
                    <Icon className="w-4 h-4" />
                    {value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Slide dots */}
            <div className="flex gap-1.5 pt-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[#0055E5]" : "w-2 bg-white/25"}`}
                />
              ))}
            </div>

            {/* Mobile image */}
            <div className="block lg:hidden mt-4">
              <ImageCard image={slide.image} />
            </div>
          </div>

          {/* ── RIGHT IMAGE (desktop) ── */}
          <div className="hidden lg:block">
            <ImageCard image={slide.image} large />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40 animate-bounce">
        <span className="text-[9px] font-bold uppercase tracking-widest">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;

/* ── Image card ── */
const ImageCard = ({ large = false, image }: { large?: boolean; image: string }) => (
  <div className="relative flex justify-center items-center">
    <div
      className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-60"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.45), rgba(37,99,235,0.25), transparent 70%)" }}
    />
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        animation: "heroFloat 6s ease-in-out infinite",
        boxShadow: "0 40px 80px rgba(15,23,42,0.85), 0 20px 40px rgba(30,58,138,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      <img
        src={image}
        alt="Enterprise Dell HP Lenovo servers for sale in India"
        className={`w-full object-cover transition-transform duration-700 hover:scale-[1.03] ${large ? "h-[460px]" : "h-[240px]"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 bg-[#0F172A]/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/20 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1E293B] rounded-full flex items-center justify-center shrink-0">
            <ArrowRight size={15} />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">Refurbished Servers India</div>
            <div className="text-white/70 text-[10px] sm:text-xs">HP ProLiant · Dell PowerEdge · Lenovo ThinkSystem</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
