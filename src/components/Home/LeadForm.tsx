import React, { useState, useRef, useEffect } from "react";
import AnimateIn from "../AnimateIn";
import {
  Send, CheckCircle, Clock, ShieldCheck, Tag,
  Package, Wrench, Settings, User, Building2,
  Mail, Phone, MessageSquare, ChevronDown, Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/leads";

/* -- Benefit items with distinct icons -- */
const BENEFITS = [
  {
    icon: Clock,
    title: "30-Minute Response Guarantee",
    desc: "Our infrastructure experts reply with a tailored quote within 30 minutes.",
  },
  {
    icon: Tag,
    title: "Best Price on HP, Dell & Lenovo",
    desc: "Certified refurbished servers at 60-80% below new hardware retail prices.",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Warranty on All Hardware",
    desc: "Every server and workstation is quality-tested and warranty-backed.",
  },
  {
    icon: Package,
    title: "Pan-India Delivery",
    desc: "Same-day dispatch in Delhi NCR. Fast shipping to all major cities.",
  },
  {
    icon: Settings,
    title: "Expert Config Advice",
    desc: "We spec the right hardware for your workload , no generic templates.",
  },
  {
    icon: Wrench,
    title: "AMC & On-Site Installation",
    desc: "Post-sales support, annual maintenance contracts, and on-site setup.",
  },
];

/* -- Service options -- */
const SERVICES = [
  "Refurbished Server Purchase",
  "ProStation Systems & GPU Workstation",
  "Cloud VPS / Hosting Plans",
  "Network & IT Consulting",
  "Cloud Solutions & Security",
  "Custom HPC / AI Cluster",
  "Server Rental",
  "Tailored Tech Solutions",
];

const BENEFIT_SLIDES = 2; // slide 0 = items 0-2, slide 1 = items 3-5

const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const benefitPaused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!benefitPaused.current)
        setActiveBenefit(prev => (prev + 1) % BENEFIT_SLIDES);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Refurbished Server Purchase",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Failed");
      setSubmitted(true);
      setForm({ name: "", company: "", email: "", phone: "", service: "Refurbished Server Purchase", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-8 sm:py-10 lg:py-8 relative overflow-hidden font-sans"
      style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}
      id="contact"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,#1E293B_0%,#0F172A_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(37,99,235,0.06),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
          <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
          <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
            Free Consultation & Quote
          </p>
        </div>

        {/* Card */}
        <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-950/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* -- LEFT PANEL -- */}
            <AnimateIn variant="fadeLeft" duration={750}>
            <div className="relative p-6 sm:p-8 lg:p-5 text-white bg-[#0F172A]/70 overflow-hidden">

              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#0055E5]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-800/20 rounded-full blur-2xl pointer-events-none" />

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#5BAEFF]/15 border border-[#5BAEFF]/25 text-[#5BAEFF] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full mb-5 sm:mb-6">
                <Zap size={11} /> RESPOND WITHIN 30 MINUTES
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight">
                Get a <span className="text-[#5BAEFF]">Free Custom Quote</span> for
                Servers, Workstations &amp; Cloud
              </h2>

              {/* Subtitle */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                Servers, <strong className="text-white">GPU workstations</strong>, cloud VPS or a full{" "}
                <strong className="text-white">enterprise data centre build</strong> our specialists
                craft the right solution for your budget.
              </p>

              {/* Benefit grid � MOBILE CAROUSEL (3 per slide) */}
              <div className="sm:hidden mb-5 relative z-10">
                <div
                  className="overflow-hidden w-full"
                  onMouseEnter={() => { benefitPaused.current = true; }}
                  onMouseLeave={() => { benefitPaused.current = false; }}
                  onTouchStart={() => { benefitPaused.current = true; }}
                  onTouchEnd={() => { setTimeout(() => { benefitPaused.current = false; }, 1200); }}
                >
                  <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${activeBenefit * 100}%)`, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  >
                    {[0, 1].map(slideIdx => (
                      <div key={slideIdx} className="w-full flex-shrink-0">
                        <div className="flex flex-col gap-2">
                          {BENEFITS.slice(slideIdx * 3, slideIdx * 3 + 3).map(({ icon: Icon, title, desc }) => (
                            <div
                              key={title}
                              className="flex gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 hover:bg-white/[0.09] hover:border-[#0055E5]/30 transition-colors"
                            >
                              <div className="shrink-0 w-8 h-8 rounded-lg bg-[#0055E5]/15 border border-[#0055E5]/20 flex items-center justify-center">
                                <Icon size={15} className="text-[#0EA5E9]" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-[11px] leading-snug mb-0.5">{title}</p>
                                <p className="text-slate-400 text-[10px] leading-snug">{desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {[0, 1].map(i => (
                    <button
                      key={i}
                      onClick={() => { setActiveBenefit(i); benefitPaused.current = true; setTimeout(() => { benefitPaused.current = false; }, 3000); }}
                      className={`rounded-full transition-all duration-300 ${i === activeBenefit ? "w-5 h-1.5 bg-[#0055E5]" : "w-1.5 h-1.5 bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Benefit grid � DESKTOP (sm+) */}
              <div className="hidden sm:grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6 relative z-10">
                {BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl p-3 sm:p-3.5 hover:bg-white/[0.09] hover:border-[#0055E5]/30 transition-colors"
                  >
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0055E5]/15 border border-[#0055E5]/20 flex items-center justify-center">
                      <Icon size={15} className="text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-[11px] sm:text-xs leading-snug mb-0.5">
                        {title}
                      </p>
                      <p className="text-slate-400 text-[10px] sm:text-[11px] leading-snug">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-4 sm:pt-4">
                <div className="flex -space-x-2">
                  {[
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/54.jpg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Client"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#08152E] object-cover"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-[10px] sm:text-xs">
                  <strong className="text-white">500+ enterprises</strong> already trust Serverwale
                </p>
              </div>
            </div>
            </AnimateIn>

            {/* -- RIGHT FORM -- */}
            <AnimateIn variant="fadeRight" delay={150} duration={750}>
            <div className="bg-white flex items-center justify-center px-5 sm:px-8 lg:px-12 py-8 sm:py-10">

              {submitted ? (
                /* Success state */
                <div className="max-w-sm w-full flex flex-col items-center justify-center text-center gap-4 py-6">
                  <div className="w-16 h-16 bg-green-50 border-2 border-green-200 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">Request Received!</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Our infrastructure specialists will review your requirements and get back to you
                      within <strong className="text-slate-900">30 minutes</strong>.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919999656064"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
                  >
                    <FaWhatsapp size={16} /> Chat on WhatsApp Instead
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-sm">

                  {/* Form header */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-1 leading-tight">
                      Talk to Our Experts
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Fill in your requirements , we'll configure the perfect solution.
                    </p>
                    <div className="w-10 h-1 bg-[#0055E5] mt-3 rounded-full" />
                  </div>

                  {/* Fields */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">

                    {/* Name + Company */}
                    <div className="grid grid-cols-2 gap-3">
                      <InputField icon={<User size={14} />} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                      <InputField icon={<Building2 size={14} />} type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <InputField icon={<Mail size={14} />} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Work email" required />
                      <InputField icon={<Phone size={14} />} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
                    </div>

                    {/* Service dropdown */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Settings size={14} />
                      </div>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="field pl-9 pr-8 cursor-pointer appearance-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown size={14} />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400 pointer-events-none">
                        <MessageSquare size={14} />
                      </div>
                      <textarea
                        required
                        rows={3}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your requirements server specs, use case, budget..."
                        className="field pl-9 resize-none"
                      />
                    </div>
                  </div>

                  {/* Response time guarantee */}
                  <div className="flex items-center gap-2 mb-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                    <span className="w-2 h-2 bg-green rounded-full animate-pulse shrink-0" />
                    <span className="text-[#22c55e] text-[11px] font-semibold">
                       Average response time: <strong>30 minutes</strong>  Mon-Sat, 9AM-7PM IST
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#f59e09] text-white py-3 sm:py-3.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:shadow-orange-400/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>Get Free Quote in 30 Min Response <Send size={15} /></>
                    )}
                  </button>

                  {/* WhatsApp alternative */}
                  <div className="mt-3 text-center">
                    <span className="text-slate-400 text-[11px]">or </span>
                    <a
                      href="https://wa.me/919999656064"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-[11px] transition-colors"
                    >
                      <FaWhatsapp size={13} /> WhatsApp us directly
                    </a>
                  </div>

                </form>
              )}
            </div>
            </AnimateIn>

          </div>
        </div>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.65rem 0.875rem 0.65rem 2.25rem;
          font-size: 0.8rem;
          color: #0f172a;
          transition: all 0.2s ease;
        }
        .field::placeholder { color: #94a3b8; }
        .field:hover  { border-color: #94a3b8; }
        .field:focus  { outline: none; border-color: #0055E5; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); background: #fff; }
      `}</style>
    </section>
  );
};

export default LeadForm;

/* -- Reusable input with icon -- */
const InputField: React.FC<{
  icon: React.ReactNode;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}> = ({ icon, type, name, value, onChange, placeholder, required }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
      {icon}
    </div>
    <input
      required={required}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="field pl-9"
    />
  </div>
);
