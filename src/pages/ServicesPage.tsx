import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import PricingRequestModal from "../components/PricingRequestModal";
import {
  ChevronRight, ArrowRight, CheckCircle,
  Network, Cloud, Monitor, Cpu, Settings, Server,
  BadgeCheck, ShieldCheck, Clock, Award, Users, TrendingUp,
  Headphones, Zap, ChevronDown, ChevronUp, Mail,
  Layers, Activity, RefreshCw, BarChart2, Globe, HardDrive, Wrench, Rocket
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SERVICES } from "../constants";
import { Service } from "../types";

/* ── Icon map ── */
const ICON_MAP: Record<string, React.FC<any>> = {
  Network, Cloud, Monitor, Cpu, Settings, Server,
  Globe, HardDrive, Layers, Activity, BarChart2, Wrench, Rocket,
};
const getServiceIcon = (name: string): React.FC<any> => ICON_MAP[name] || Server;

/* ── Per-service stats ── */
const SERVICE_STATS: Record<string, { value: string; label: string }[]> = {
  "it-consulting":   [{ value: "200+",  label: "Networks Designed"  }, { value: "40%",   label: "Cost Reduction"    }, { value: "99.9%", label: "Uptime Delivered"  }],
  "cloud-solutions": [{ value: "45%",   label: "Cloud Cost Savings" }, { value: "99.99%",label: "Uptime SLA"        }, { value: "2×",    label: "Faster Deployments"}],
  "rendering-infra": [{ value: "60%",   label: "Render Time Saved"  }, { value: "4K+",   label: "Resolution Ready"  }, { value: "10×",   label: "GPU Throughput"    }],
  "hpc-solutions":   [{ value: "3×",    label: "Compute Speedup"    }, { value: "100+",  label: "HPC Builds Done"   }, { value: "99.5%", label: "System Uptime"      }],
  "tailored-tech":   [{ value: "500+",  label: "Custom Builds"      }, { value: "72hr",  label: "Avg Deployment"    }, { value: "100%",  label: "Satisfaction Rate"  }],
  "cloud-rental":    [{ value: "60%",   label: "CapEx Saved"        }, { value: "48hr",  label: "Setup Time"        }, { value: "99.9%", label: "Rental Uptime SLA"  }],
};

/* ── Per-service "Why Choose Us" ── */
const SERVICE_WHY: Record<string, string[]> = {
  "it-consulting":   ["Enterprise network architecture specialists", "Risk-free infrastructure assessments", "Business-aligned IT roadmaps", "Dedicated technical POC assigned"],
  "cloud-solutions": ["Multi-cloud & hybrid cloud experts", "Zero-trust security implementation", "99.99% uptime SLAs guaranteed", "Automated compliance & audit dashboards"],
  "rendering-infra": ["GPU-optimized infrastructure builds", "High-speed NVMe + SAN storage arrays", "Remote render workflow specialists", "Creative studio-ready environments"],
  "hpc-solutions":   ["Custom compute cluster design", "Advanced cooling & power management", "AI/ML workload optimization", "Full-rack deployment with support"],
  "tailored-tech":   ["100% custom hardware + software design", "Workflow-specific system integrations", "Lifecycle management & AMC plans", "Dedicated post-deployment support"],
  "cloud-rental":    ["No long-term capital commitment", "Enterprise-grade rented hardware", "24×7 monitoring & maintenance", "Scale up or down as business demands"],
};

/* ── Static FAQs ── */
const SERVICE_FAQS = [
  {
    q: "What types of IT services does Serverwale offer?",
    a: "Serverwale offers a comprehensive suite of enterprise IT services — including Network & IT Consulting, Cloud Solutions & Security, GPU Rendering Infrastructure, Custom HPC / Server Solutions, Tailored Technology Solutions, and Cloud & Infrastructure Rental. Each service is engineered for businesses of all sizes, from startups to large enterprises across India.",
  },
  {
    q: "Do you provide on-site installation and setup support?",
    a: "Yes. For clients in Delhi NCR, we provide on-site deployment teams for rack mounting, cabling, OS installation, BIOS configuration, and network integration. For pan-India clients, we offer remote setup assistance and coordinate with authorized local partners for physical installation.",
  },
  {
    q: "Can Serverwale customize solutions for our specific business needs?",
    a: "Absolutely. Customization is at the core of everything we do. Whether it's a server configured for your specific workload, a cloud architecture aligned to your compliance requirements, or a bespoke HPC cluster for AI/ML research — solutions are designed from scratch around your objectives.",
  },
  {
    q: "What is the typical turnaround time for service deployment?",
    a: "Standard service deployments — cloud setup, network configuration, server delivery — are completed within 48–72 hours for Delhi NCR clients. Complex multi-site or custom HPC builds are scoped individually with clear milestones and regular progress updates.",
  },
  {
    q: "Do you offer Annual Maintenance Contracts (AMC) and ongoing support?",
    a: "Yes. Serverwale offers flexible AMC plans covering preventive maintenance, priority support, hardware replacements, and scheduled health checks. Our 24×7 support team is available for critical issue resolution via phone, WhatsApp, and remote access.",
  },
];

/* ── Global stats bar ── */
const GLOBAL_STATS = [
  { icon: Users,       value: "100+",     label: "Enterprise Clients"  },
  { icon: Award,       value: "7+ Yrs",  label: "Industry Experience" },
  { icon: Clock,       value: "24×7",     label: "Expert Support"      },
  { icon: ShieldCheck, value: "ISO 27001", label: "Certified Security" },
  { icon: TrendingUp,  value: "Pan-India", label: "Service Coverage"   },
];

const ServicesPage: React.FC = () => {
  const { category }   = useParams<{ category?: string }>();
  const firstService   = SERVICES[0];
  const [activeService, setActiveService] = useState<Service>(firstService);
  const [showPricing,   setShowPricing]   = useState(false);
  const [openFaq,       setOpenFaq]       = useState<number | null>(null);

  useEffect(() => {
    if (category) {
      const found = SERVICES.find(s => s.id === category);
      setActiveService(found ?? firstService);
    } else {
      setActiveService(firstService);
    }
  }, [category]);

  useSEO({
    title: `${activeService.title} | Enterprise IT Services India | Serverwale™`,
    description: `${activeService.shortDescription} Serverwale delivers certified enterprise IT solutions — refurbished servers, cloud infrastructure, GPU workstations & HPC clusters across India.`,
    keywords: `IT services india, enterprise IT solutions india, cloud solutions india, HPC servers india, GPU workstations india, network consulting india`,
    canonical: `https://serverwale.com/services/${activeService.id}`,
  });

  const ActiveIcon = getServiceIcon(activeService.icon);
  const stats      = SERVICE_STATS[activeService.id] ?? SERVICE_STATS["tailored-tech"];
  const whyUs      = SERVICE_WHY[activeService.id]   ?? SERVICE_WHY["tailored-tech"];

  return (
    <div className="bg-white font-sans overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Services</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 w-fit">
            <Zap size={12} /> ENTERPRISE IT SERVICES · PAN-INDIA
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            End-to-End IT Services{" "}
            <span className="text-[#5BAEFF]">
              Built for Enterprises
            </span>
          </h1>
          <p className="max-w-2xl text-blue-200 text-sm sm:text-base font-medium leading-relaxed mb-6 border-l-2 border-blue-500 pl-4">
            From <strong className="text-white">refurbished servers</strong> and <strong className="text-white">cloud infrastructure</strong> to <strong className="text-white">GPU render farms</strong> and <strong className="text-white">custom HPC clusters</strong> — Serverwale powers enterprises across India.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowPricing(true)}
              className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25">
              Request Pricing <ArrowRight size={16} />
            </button>
            <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              <FaWhatsapp size={16} /> WhatsApp Expert
            </a>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="bg-[#0F172A] border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto snap-x hide-scrollbar divide-x divide-blue-900/30">
            {GLOBAL_STATS.map((s, i) => (
              <div key={i} className="snap-start flex items-center gap-3 px-4 md:px-6 py-4 min-w-fit">
                <s.icon size={17} className="text-blue-400 shrink-0" />
                <div>
                  <div className="text-white font-black text-sm md:text-base leading-tight">{s.value}</div>
                  <div className="text-slate-400 text-[10px] md:text-xs whitespace-nowrap">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE: Category Pills ══ */}
      <div className="lg:hidden px-4 pt-5 pb-1 overflow-x-auto">
        <div className="flex gap-2 min-w-max snap-x snap-mandatory">
          {SERVICES.map(s => {
            const Icon = getServiceIcon(s.icon);
            return (
              <button key={s.id} onClick={() => setActiveService(s)}
                className={`snap-start flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border transition whitespace-nowrap
                  ${activeService.id === s.id
                    ? "bg-[#0F172A] text-white border-[#08152E]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#0055E5]/40"
                  }`}>
                <Icon size={11} /> {s.title.replace("&", "").split(" ").slice(0, 2).join(" ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ MOBILE: Active Service Quick Stats ══ */}
      <div className="lg:hidden px-4 pt-4 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#0F172A] text-white rounded-xl p-3 text-center">
              <div className="font-black text-base text-blue-300 leading-tight">{s.value}</div>
              <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MAIN LAYOUT ══ */}
      <section className="py-8 md:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 px-4 md:px-6">

          {/* ── DESKTOP SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col col-span-4 gap-6">
            {/* Service Nav */}
            <div className="bg-[#EDF4FF] border border-[#C8DCFF] rounded-2xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Our Services</h3>
              <div className="space-y-1.5">
                {SERVICES.map(s => {
                  const Icon = getServiceIcon(s.icon);
                  return (
                    <button key={s.id} onClick={() => setActiveService(s)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all
                        ${activeService.id === s.id
                          ? "bg-[#0F172A] text-white shadow-md"
                          : "bg-white text-slate-700 hover:bg-[#EDF4FF] hover:text-[#08152E]"
                        }`}>
                      <span className="flex items-center gap-2.5 text-left">
                        <Icon size={14} className={activeService.id === s.id ? "text-blue-300" : "text-blue-500"} />
                        {s.title}
                      </span>
                      <ChevronRight size={13} className="shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#04194A] p-6 rounded-2xl text-white">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-5">Proven Impact</h4>
              <div className="space-y-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-2xl font-black text-white">{s.value}</span>
                    <span className="text-blue-200 text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <BadgeCheck size={26} className="mb-3 text-blue-100" />
              <h4 className="font-black text-lg mb-1">Get a Free Quote</h4>
              <p className="text-blue-100 text-sm mb-4">Custom pricing within 2 hours.</p>
              <button onClick={() => setShowPricing(true)}
                className="w-full bg-white text-[#0055E5] py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 hover:bg-blue-50 transition">
                Request Pricing <ArrowRight size={15} />
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="col-span-12 lg:col-span-8 space-y-8 md:space-y-10">

            {/* Service: Image (mobile-first) + Text */}
            <div>
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-5 md:mb-0 md:float-right md:w-[48%] md:ml-7 md:mb-5">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  className="w-full h-[200px] sm:h-[240px] md:h-[280px] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Title + description */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-xl border border-blue-100 shrink-0">
                  <ActiveIcon className="text-[#0055E5]" size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#08152E] leading-tight">{activeService.title}</h2>
              </div>
              <p className="text-slate-700 font-semibold leading-relaxed text-sm md:text-base mb-2">
                {activeService.shortDescription}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {activeService.longDescription}
              </p>

              {/* Why Serverwale — mobile inline card */}
              <div className="md:hidden bg-gradient-to-br from-[#0F172A] to-[#04194A] p-4 rounded-2xl text-white mb-2" style={{ clear: "both" }}>
                <h5 className="font-black text-xs mb-3 flex items-center gap-2">
                  <ShieldCheck size={13} className="text-blue-300" /> Why Serverwale
                </h5>
                <div className="grid grid-cols-2 gap-y-2">
                  {whyUs.map((w, i) => (
                    <div key={i} className="flex gap-1.5 items-start text-[11px] text-slate-200">
                      <CheckCircle size={10} className="text-blue-400 mt-0.5 shrink-0" /> {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div style={{ clear: "both" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
                <h3 className="text-lg md:text-xl font-black text-[#08152E]">Key Benefits</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.benefits.map((b, i) => {
                  const icons = [ShieldCheck, TrendingUp, RefreshCw, Zap, Activity, Globe, Layers, BarChart2];
                  const BIcon = icons[i % icons.length];
                  return (
                    <div key={b} className="flex items-start gap-3 p-4 bg-[#EDF4FF] border border-[#C8DCFF] rounded-xl hover:border-[#0055E5]/40 hover:shadow-sm transition-all group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-[#0044BB] transition-colors shrink-0">
                        <BIcon className="text-[#0055E5] group-hover:text-white transition-colors" size={14} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm leading-snug pt-0.5">{b}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust badges — horizontal scroll on mobile */}
            <div className="-mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 md:grid md:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Secure by Design",   sub: "Zero-trust architecture"  },
                  { icon: Zap,         label: "Ultra-Low Latency",  sub: "Sub-ms response times"    },
                  { icon: Globe,       label: "Pan-India Coverage", sub: "Delhi to every city"      },
                ].map((f, i) => (
                  <div key={i} className="flex-shrink-0 w-36 md:w-auto flex flex-col items-center text-center p-4 bg-[#EDF4FF] border border-[#C8DCFF] rounded-2xl">
                    <f.icon size={24} className="text-blue-500 mb-2" />
                    <h4 className="text-xs font-black text-[#08152E] leading-tight mb-1">{f.label}</h4>
                    <p className="text-[10px] text-slate-400 leading-snug">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid CTA */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#04194A] to-[#0b3a8a] rounded-2xl p-5 md:p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(37,99,235,0.15),transparent_60%)]" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1.5">Get A Custom Quote</div>
                  <h4 className="text-lg md:text-2xl font-black leading-tight">Ready to Deploy {activeService.title.split(" ").slice(0, 3).join(" ")}?</h4>
                  <p className="text-blue-200 text-xs md:text-sm mt-1.5">We'll deliver a tailored proposal in 2 hours.</p>
                </div>
                <button onClick={() => setShowPricing(true)}
                  className="bg-white text-[#08152E] px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-blue-50 transition shadow-lg whitespace-nowrap self-start md:self-auto">
                  Get Free Quote <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14">
        <div className="border-t border-slate-100 pt-10 md:pt-12">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-xl md:text-2xl font-black text-[#08152E]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {SERVICE_FAQS.map((f, i) => (
              <div key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200
                  ${openFaq === i ? "border-blue-400 shadow-md shadow-blue-100 md:col-span-2" : "border-slate-200 hover:border-[#0055E5]/30"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full px-4 py-3.5 md:px-5 md:py-4 flex justify-between items-center text-left font-bold text-sm gap-3 transition-colors
                    ${openFaq === i ? "bg-[#0F172A] text-white" : "bg-white text-slate-800 hover:bg-[#EDF4FF]"}`}>
                  <span className="flex items-center gap-2.5">
                    <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black
                      ${openFaq === i ? "bg-[#0055E5] text-white" : "bg-blue-100 text-[#0055E5]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                  {openFaq === i
                    ? <ChevronUp size={17} className="shrink-0 text-blue-300" />
                    : <ChevronDown size={17} className="shrink-0 text-slate-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 py-4 md:px-5 border-t border-blue-100 bg-blue-50/30">
                    <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-[#0F172A] py-8 md:py-12 border-t border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 md:mb-5">
            <Headphones size={12} /> SPEAK WITH AN EXPERT TODAY
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 leading-tight">
            Power Your Business with<br className="hidden md:block" />{" "}
            <span className="text-[#5BAEFF]">Enterprise IT</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-7">
            Join <strong className="text-slate-300">500+ enterprises</strong> across India who trust Serverwale for mission-critical IT services and <strong className="text-slate-300">round-the-clock expert support</strong>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={() => setShowPricing(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-500/25">
              Request Free Quote <ArrowRight size={16} />
            </button>
            <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all">
              <FaWhatsapp size={17} /> WhatsApp Expert
            </a>
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all">
              <Mail size={16} /> Contact Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            {[
              { icon: ShieldCheck, text: "ISO 27001 Certified"    },
              { icon: BadgeCheck,  text: "PCI-DSS Compliant"      },
              { icon: Clock,       text: "24×7 Dedicated Support" },
              { icon: Award,       text: "500+ Happy Clients"     },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <b.icon size={13} className="text-blue-400" /> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE STICKY CTA BAR ══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-4 py-3 flex gap-3">
        <button onClick={() => setShowPricing(true)}
          className="flex-1 bg-[#0F172A] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all">
          Request Pricing <ArrowRight size={15} />
        </button>
        <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all">
          <FaWhatsapp size={16} /> WhatsApp
        </a>
      </div>

      <PricingRequestModal isOpen={showPricing} onClose={() => setShowPricing(false)} />

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default ServicesPage;
