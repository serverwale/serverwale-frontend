import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import { industryContent, categories, industryIcons } from "../constants";
import {
  Briefcase, ArrowRight, CheckCircle, Star,
  ChevronRight, MessageSquare, X, ChevronDown, ChevronUp,
  Phone, Mail, Users, Award, Clock, Headphones, TrendingUp,
  BadgeCheck, ShieldCheck, Zap
} from "lucide-react";

const SolutionPage: React.FC = () => {
  const [params] = useSearchParams();
  const industryParam = params.get("industry") || "finance";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showConsult, setShowConsult] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", state: "", email: "" });

  const activeIndustry = useMemo(
    () => industryContent[industryParam] || industryContent.finance,
    [industryParam]
  );

  const ActiveIcon = industryIcons[industryParam] || Briefcase;

  useSEO({
    title: `${activeIndustry?.title || "Enterprise Solutions"} | Industry IT Infrastructure | Serverwale™`,
    description: `Serverwale delivers enterprise IT infrastructure solutions for ${industryParam} industry — refurbished servers, cloud solutions, GPU workstations & data center hardware with pan-India support.`,
    keywords: `enterprise IT solutions india, ${industryParam} IT infrastructure, server solutions ${industryParam} india, data center solutions india, ${industryParam} cloud solutions`,
    canonical: `https://serverwale.com/enterprise-solution?industry=${industryParam}`,
  });

  const submitConsultation = async () => {
    setSubmitting(true);
    try {
      await fetch("http://localhost:5000/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Thanks for showing interest. Our team will reach you shortly.");
      setShowConsult(false);
      setForm({ name: "", phone: "", state: "", email: "" });
    } catch {
      alert("Failed to submit. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const globalStats = [
    { icon: Users, value: "100+", label: "Enterprise Clients" },
    { icon: Award, value: "99.99%", label: "Uptime SLA" },
    { icon: Clock, value: "24×7", label: "Expert Support" },
    { icon: ShieldCheck, value: "ISO 27001", label: "Certified Security" },
    { icon: TrendingUp, value: "7+ Yrs", label: "Industry Experience" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden font-sans">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 h-full flex flex-col justify-center pt-24 pb-10 md:pt-28 md:pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-5 font-medium uppercase tracking-widest">
            <span>Serverwale</span>
            <ChevronRight size={12} />
            <span>Enterprise Solutions</span>
            <ChevronRight size={12} />
            <span className="text-blue-400">{activeIndustry.title?.split(" ")[0]}</span>
          </div>

          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
            <Zap size={12} />
            ENTERPRISE-GRADE INFRASTRUCTURE
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            Industry-Specific IT Solutions{" "}
            <span className="text-transparent bg-clip-text bg-[#5BAEFF]">
              Built to Perform
            </span>
          </h1>

          {activeIndustry.tagline && (
            <p className="max-w-2xl text-blue-200 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6 border-l-2 border-blue-500 pl-4">
              {activeIndustry.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setShowConsult(true)}
              className="inline-flex items-center gap-2 bg-[#f59e09] hover:bg-[#0044BB] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25"
            >
              Get Free Consultation <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              <Phone size={16} /> Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global Trust Stats Bar ── */}
      <div className="bg-[#0F172A] border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto snap-x hide-scrollbar divide-x divide-blue-900/30">
            {globalStats.map((s, i) => (
              <div key={i} className="snap-start flex items-center gap-3 px-6 py-4 min-w-fit">
                <s.icon size={18} className="text-blue-400 shrink-0" />
                <div>
                  <div className="text-white font-black text-base leading-tight">{s.value}</div>
                  <div className="text-slate-400 text-xs whitespace-nowrap">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Category Pills ── */}
      <div className="md:hidden px-4 pt-4 overflow-x-auto">
        <div className="flex gap-2.5 min-w-max pb-2 snap-x snap-mandatory">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/enterprise-solution?industry=${cat.key}`}
              className={`snap-start px-4 py-2 rounded-full text-xs font-bold border transition whitespace-nowrap
                ${industryParam === cat.key
                  ? "bg-[#0F172A] text-white border-[#08152E]"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-[#EDF4FF] hover:border-[#08152E]/30"
                }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 px-4 md:px-6">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden md:flex flex-col col-span-4 gap-6">

            {/* Category Nav */}
            <div className="bg-[#EDF4FF] p-6 rounded-2xl border border-[#C8DCFF]">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Solution Categories</h3>
              {categories.map((cat) => {
                const CatIcon = industryIcons[cat.key] || Briefcase;
                return (
                  <Link
                    key={cat.key}
                    to={`/enterprise-solution?industry=${cat.key}`}
                    className={`flex items-center justify-between px-4 py-3 mb-1.5 rounded-xl font-semibold text-sm transition-all
                      ${industryParam === cat.key
                        ? "bg-[#0F172A] text-white shadow-md"
                        : "bg-white text-slate-700 hover:bg-[#EDF4FF] hover:text-[#08152E]"
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <CatIcon size={15} className={industryParam === cat.key ? "text-blue-300" : "text-blue-500"} />
                      {cat.name}
                    </span>
                    <ChevronRight size={14} />
                  </Link>
                );
              })}
            </div>

            {/* Industry-Specific Stats */}
            {activeIndustry.stats && (
              <div className="bg-gradient-to-br from-[#0F172A] to-[#04194A] p-6 rounded-2xl text-white">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-5">Proven Impact</h4>
                <div className="space-y-4">
                  {activeIndustry.stats.map((s: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <span className="text-2xl font-black text-white">{s.value}</span>
                      <span className="text-blue-200 text-sm">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog CTA */}
            <div className="bg-white border border-[#C8DCFF] p-6 rounded-2xl">
              <h4 className="font-bold text-[#08152E] mb-2">Explore Case Studies</h4>
              <p className="text-slate-500 text-sm mb-4">Real-world deployments and success stories from {activeIndustry.blogTag}.</p>
              <Link
                to="/blog"
                className="w-full bg-[#EDF4FF] hover:bg-[#EDF4FF] border border-[#C8DCFF] text-[#08152E] py-2.5 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition"
              >
                <MessageSquare size={15} /> View Industry Blog
              </Link>
            </div>

            {/* Consult CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <BadgeCheck size={28} className="mb-3 text-blue-100" />
              <h4 className="font-black text-lg mb-1">Free Architecture Review</h4>
              <p className="text-blue-100 text-sm mb-4">Our infrastructure architects will design your roadmap — at no cost.</p>
              <button
                onClick={() => setShowConsult(true)}
                className="w-full bg-white text-[#0055E5] py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 hover:bg-blue-50 transition"
              >
                Book Free Consultation <ArrowRight size={15} />
              </button>
            </div>
          </aside>

          {/* ── Main Right Column ── */}
          <div className="col-span-12 md:col-span-8 space-y-10 md:space-y-14">

            {/* ── Industry Overview Block ── */}
            <div>
              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <ActiveIcon className="text-[#0055E5]" size={22} />
                    </div>
                    <h2 className="text-2xl font-black text-[#08152E]">{activeIndustry.title}</h2>
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">{activeIndustry.description}</p>
                  <p className="text-slate-600 mt-3 leading-relaxed text-sm">{activeIndustry.long}</p>
                </div>

                <div className="relative">
                  <img
                    src={activeIndustry.image}
                    className="rounded-2xl h-[360px] w-full object-cover shadow-lg"
                    alt={activeIndustry.title}
                    loading="lazy"
                  />
                  {/* Why Choose Us overlay */}
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#0F172A] to-[#04194A] p-5 rounded-2xl text-white max-w-xs shadow-2xl">
                    <h3 className="font-black text-sm mb-3 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-blue-300" /> Why Serverwale
                    </h3>
                    {activeIndustry.chooseUs.map((c: string, i: number) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-slate-200 mb-1.5">
                        <CheckCircle size={11} className="text-blue-400 mt-0.5 shrink-0" /> {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <ActiveIcon className="text-[#0055E5]" size={20} />
                  </div>
                  <h2 className="text-xl font-black text-[#08152E]">{activeIndustry.title}</h2>
                </div>

                <div className="relative">
                  <img
                    src={activeIndustry.image}
                    className="rounded-2xl h-[220px] w-full object-cover shadow-md"
                    alt={activeIndustry.title}
                    loading="lazy"
                  />
                </div>

                {/* Stats - mobile */}
                {activeIndustry.stats && (
                  <div className="grid grid-cols-3 gap-3">
                    {activeIndustry.stats.map((s: any, i: number) => (
                      <div key={i} className="bg-[#0F172A] text-white p-3 rounded-xl text-center">
                        <div className="font-black text-lg text-blue-300">{s.value}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-slate-700 text-sm font-medium leading-relaxed">{activeIndustry.description}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{activeIndustry.long}</p>

                {/* Mobile CTAs */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowConsult(true)}
                    className="bg-[#0F172A] text-white py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2"
                  >
                    Consult Now <ArrowRight size={14} />
                  </button>
                  <Link
                    to="/blog"
                    className="bg-[#EDF4FF] border border-[#C8DCFF] text-[#08152E] py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2"
                  >
                    <MessageSquare size={14} /> Blog
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Key Capabilities Grid ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
                <h3 className="text-xl font-black text-[#08152E]">Key Capabilities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeIndustry.points.map((p: any, i: number) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 p-4 bg-[#EDF4FF] border border-[#C8DCFF] rounded-xl hover:border-[#0055E5]/40 hover:shadow-sm transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-[#0044BB] transition-colors shrink-0">
                        <Icon className="text-[#0055E5] group-hover:text-white transition-colors" size={16} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm leading-snug pt-0.5">{p.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Industry Results / Reviews ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
                <h3 className="text-xl font-black text-[#08152E]">Proven Results</h3>
              </div>

              {/* Desktop */}
              <div className="hidden md:grid md:grid-cols-3 gap-4">
                {activeIndustry.reviews.map((r: string, i: number) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-[#0F172A] to-[#04194A] text-white p-5 rounded-2xl shadow-md shadow-blue-900/20 flex flex-col"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed flex-1">{r}</p>
                  </div>
                ))}
              </div>

              {/* Mobile scroll */}
              <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                {activeIndustry.reviews.map((r: string, i: number) => (
                  <div
                    key={i}
                    className="snap-start min-w-[85%] bg-gradient-to-br from-[#0F172A] to-[#04194A] text-white p-5 rounded-2xl shadow-md"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{r}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mid-page CTA Banner ── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#04194A] to-[#0b3a8a] rounded-2xl p-6 md:p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(37,99,235,0.15),transparent_60%)]" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-widest text-blue-300 mb-2">Free Infrastructure Consultation</div>
                  <h4 className="text-xl md:text-2xl font-black leading-tight">
                    Ready to Build {activeIndustry.consultTag} Infrastructure?
                  </h4>
                  <p className="text-blue-200 text-sm mt-2">
                    Our architects will design a custom roadmap aligned to your goals — at zero cost.
                  </p>
                </div>
                <button
                  onClick={() => setShowConsult(true)}
                  className="shrink-0 bg-white text-[#08152E] px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-blue-50 transition shadow-lg whitespace-nowrap"
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* ── FAQs ── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
                <h3 className="text-xl font-black text-[#08152E]">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-3">
                {activeIndustry.faqs.map((f: any, i: number) => (
                  <div
                    key={i}
                    className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                      openFaq === i
                        ? "border-blue-400 shadow-md shadow-blue-100"
                        : "border-slate-200 hover:border-[#0055E5]/30"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className={`w-full px-5 py-4 flex justify-between items-center text-left font-bold text-sm gap-3 transition-colors ${
                        openFaq === i ? "bg-[#0F172A] text-white" : "bg-white text-slate-800 hover:bg-[#EDF4FF]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                          openFaq === i ? "bg-[#0055E5] text-white" : "bg-blue-100 text-[#0055E5]"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {f.q}
                      </span>
                      {openFaq === i
                        ? <ChevronUp size={18} className="shrink-0 text-blue-300" />
                        : <ChevronDown size={18} className="shrink-0 text-slate-400" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 py-4 border-t border-blue-100 bg-blue-50/30">
                        <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA Strip ── */}
      <section className="bg-[#0F172A] py-8 md:py-10 border-t border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Headphones size={12} /> SPEAK WITH AN EXPERT TODAY
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
            Power Your Business with <br className="hidden md:block" />
            <span className="text-[#5BAEFF]">
              Enterprise-Grade Infrastructure
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Join 500+ enterprises across India and the GCC who trust Serverwale for mission-critical IT infrastructure, cloud solutions, and round-the-clock expert support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowConsult(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-500/25"
            >
              Book Free Consultation <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            >
              <Mail size={16} /> Contact Our Team
            </Link>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: ShieldCheck, text: "ISO 27001 Certified" },
              { icon: BadgeCheck, text: "PCI-DSS Compliant" },
              { icon: Clock, text: "24×7 Dedicated Support" },
              { icon: Award, text: "500+ Happy Clients" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <b.icon size={14} className="text-blue-400" /> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Consultation Modal ── */}
      {showConsult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-7 relative shadow-2xl">
            <button
              onClick={() => setShowConsult(false)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <X size={16} className="text-slate-600" />
            </button>

            <div className="mb-5">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0055E5] text-xs font-bold px-3 py-1 rounded-full mb-3">
                <BadgeCheck size={12} /> FREE CONSULTATION
              </div>
              <h3 className="text-2xl font-black text-[#08152E]">Request a Free Consultation</h3>
              <p className="text-sm text-slate-500 mt-1">
                Our infrastructure experts will reach out within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: "name", label: "Full Name", placeholder: "e.g. Rohit Sharma" },
                { key: "phone", label: "Phone Number", placeholder: "e.g. +91 98765 43210" },
                { key: "state", label: "State / City", placeholder: "e.g. Delhi" },
                { key: "email", label: "Work Email", placeholder: "e.g. rohit@company.com" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">{label}</label>
                  <input
                    placeholder={placeholder}
                    className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <button
              disabled={submitting}
              onClick={submitConsultation}
              className="mt-5 w-full bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60 text-white py-3.5 rounded-xl font-black text-sm flex justify-center items-center gap-2 transition"
            >
              {submitting ? "Submitting..." : <>Book My Free Consultation <ArrowRight size={15} /></>}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              🔒 Your information is secure and never shared.
            </p>
          </div>
        </div>
      )}

      {/* Scrollbar hide style */}
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default SolutionPage;
