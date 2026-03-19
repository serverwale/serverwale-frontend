import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Server, Cpu, Shield, Zap, Globe, HardDrive, ChevronRight } from "lucide-react";

/* ─── Floating Cloud SVG ─────────────────────────────── */
const CloudSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 120" className={className} fill="currentColor">
    <ellipse cx="100" cy="90" rx="90" ry="28" opacity="0.15" />
    <path d="M155 75 C155 55 140 42 122 42 C118 28 106 18 90 18 C70 18 54 33 54 52 C54 53 54 54 54 55 C40 57 30 68 30 82 C30 97 43 108 58 108 L148 108 C163 108 175 97 175 83 C175 72 166 63 155 75 Z" />
  </svg>
);

/* ─── Animated Particles ─────────────────────────────── */
const Particle = ({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) => (
  <div
    className="absolute bottom-0 rounded-full bg-blue-400/20"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      animation: `floatUp ${duration}s ${delay}s infinite linear`,
    }}
  />
);

/* ─── Cloud Service Card ─────────────────────────────── */
const ServiceCard = ({
  icon: Icon, title, desc, price
}: {
  icon: React.ElementType; title: string; desc: string; price: string
}) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 group">
    <div className="w-12 h-12 bg-[#0055E5]/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0044BB]/30 transition-colors">
      <Icon size={22} className="text-[#0055E5]" />
    </div>
    <h3 className="font-bold text-white text-sm mb-1.5">{title}</h3>
    <p className="text-slate-400 text-xs leading-relaxed mb-3">{desc}</p>
    <span className="text-[#0055E5] font-bold text-xs">{price}</span>
  </div>
);

/* ─── MAIN PAGE ──────────────────────────────────────── */
const CloudPage: React.FC = () => {
  const [dots, setDots] = useState(".");

  /* Animated "..." loader */
  useEffect(() => {
    const t = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 500);
    return () => clearInterval(t);
  }, []);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    x: Math.random() * 100,
    size: 6 + Math.random() * 14,
  }));

  const cloudServices = [
    { icon: Server,    title: "Cloud VPS",          desc: "KVM-based virtual servers with full root access, SSD storage & high-speed network.", price: "From ₹2,499/mo" },
    { icon: Cpu,       title: "GPU Cloud",           desc: "NVIDIA GPU instances for AI/ML training, rendering, and deep learning workloads.",    price: "From ₹8,999/mo" },
    { icon: Globe,     title: "Managed Hosting",     desc: "Fully managed web & app hosting with 99.9% uptime SLA and 24/7 support.",            price: "From ₹1,299/mo" },
    { icon: HardDrive, title: "Cloud Storage",       desc: "S3-compatible object storage for backups, media, and large-scale data.",              price: "From ₹499/mo"   },
    { icon: Shield,    title: "Cloud Firewall",      desc: "DDoS protection, WAF, and enterprise-grade network security for all instances.",     price: "Included Free"  },
    { icon: Zap,       title: "Bare Metal Cloud",    desc: "Dedicated physical servers in our DC with cloud-like billing — no sharing.",          price: "From ₹12,999/mo"},
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans relative overflow-hidden">

      {/* ── Keyframe Styles ──────────────────────────── */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes cloudDrift1 {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(30px); }
        }
        @keyframes cloudDrift2 {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(-25px); }
        }
        @keyframes cloudDrift3 {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33%       { transform: translateX(20px) translateY(-10px); }
          66%       { transform: translateX(-15px) translateY(8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3); }
          50%       { box-shadow: 0 0 50px rgba(37,99,235,0.7); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Background radial glow ───────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(37,99,235,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(37,99,235,0.12),transparent_50%)]" />

      {/* ── Floating particles ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ── Animated clouds in background ───────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <CloudSVG className="absolute top-20 left-[-5%] w-72 text-blue-500/10" style={{ animation: "cloudDrift1 14s ease-in-out infinite" } as React.CSSProperties} />
        <CloudSVG className="absolute top-40 right-[-8%] w-96 text-blue-400/8"  style={{ animation: "cloudDrift2 18s ease-in-out infinite" } as React.CSSProperties} />
        <CloudSVG className="absolute bottom-40 left-[10%] w-56 text-indigo-500/10" style={{ animation: "cloudDrift3 22s ease-in-out infinite" } as React.CSSProperties} />
        <CloudSVG className="absolute bottom-20 right-[5%] w-64 text-blue-300/8"  style={{ animation: "cloudDrift1 16s ease-in-out infinite 3s" } as React.CSSProperties} />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Hero Section — standard left-aligned layout ── */}
        <section className="min-h-[340px] md:min-h-[440px] flex flex-col justify-center pt-24 pb-10 md:pt-28 md:pb-12 px-4">
          <div className="max-w-7xl mx-auto w-full">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <ChevronRight size={12} />
              <span className="text-blue-400">Cloud Services</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              LAUNCHING SOON &middot; ENTERPRISE CLOUD
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl text-white">
              Serverwale™{" "}
              <span className="text-[#5BAEFF]">
                Cloud Platform
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-5 border-l-2 border-blue-500 pl-4 font-medium">
              Enterprise-grade VPS, GPU cloud, bare metal &amp; managed hosting &mdash;{" "}
              <strong className="text-white">all under one roof. Portal being built{dots}</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/918595242521?text=Hi%20Serverwale!%20I%20am%20interested%20in%20your%20Cloud%20Services.%20Please%20share%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z"/>
                </svg>
                Talk to Us on WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm"
              >
                <Home size={15} />
                Back to Home
              </Link>
            </div>

          </div>
        </section>

        {/* ── Cloud Services Preview ────────────────── */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
              What's Coming on Cloud
            </h2>
            <p className="text-slate-500 text-sm">
              Here's a preview of what Serverwale™ Cloud will offer — contact us to pre-book!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cloudServices.map(svc => (
              <ServiceCard key={svc.title} {...svc} />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-10 text-center bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">
              Currently available via direct order —
            </p>
            <p className="text-white font-semibold text-sm mb-4">
              Contact us on WhatsApp to get Cloud VPS, GPU instances & bare metal servers right now!
            </p>
            <a
              href="https://wa.me/918595242521?text=Hi%20Serverwale!%20I%20want%20to%20order%20Cloud%20Services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z"/>
              </svg>
              Order Now via WhatsApp
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CloudPage;
