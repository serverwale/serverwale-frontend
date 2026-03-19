import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import {
  Linkedin, Twitter, Instagram, Facebook, Youtube,
  MapPin, Phone, Mail, Headphones, ChevronRight,
  Clock, Send, CheckCircle, BadgeCheck, ShieldCheck,
  Truck, Users, ArrowRight, Building2, Globe, Zap,
  MessageSquare, RefreshCw
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WA_NUMBER = "919999656064";
const WA_MESSAGE = encodeURIComponent(
  "Hi Serverwale! I want to enquire about enterprise servers and IT infrastructure solutions. Please help me."
);

export default function ContactPage() {
  useSEO({
    title: "Contact Serverwale | Buy Enterprise Servers Delhi NCR | +91 99996 56064",
    description: "Contact Serverwale for refurbished server pricing, custom IT infrastructure quotes, GPU workstations & cloud solutions. Visit us at Nehru Place, New Delhi or call +91 99996 56064. Pan-India delivery, 1-year warranty.",
    keywords: "contact serverwale, server dealer contact delhi, buy servers india, refurbished server price inquiry, IT infrastructure quote india, server dealer nehru place, HP Dell server contact delhi NCR",
    canonical: "https://serverwale.com/contact",
  });

  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", requirement: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success !== false) {
        setSubmitted(true);
      } else {
        setError("Submission failed. Please try again or WhatsApp us directly.");
      }
    } catch {
      setError("Network error. Please WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <MapPin size={20} />,
      title: "Head Office — Delhi",
      lines: ["Nehru Place IT Market,", "New Delhi , 110019, India"],
      link: "https://maps.google.com/?q=Nehru+Place+New+Delhi",
      linkLabel: "Get Directions →",
      color: "text-blue-400",
    },
    {
      icon: <Phone size={20} />,
      title: "Sales & Support",
      lines: ["+91 99996 56064", "Mon-Sat: 9:00 AM - 7:00 PM IST"],
      link: "tel:+919999656064",
      linkLabel: "Call Now →",
      color: "text-green-400",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      lines: ["contact@serverwale.com", "Response within 4 business hours"],
      link: "mailto:contact@serverwale.com",
      linkLabel: "Send Email →",
      color: "text-purple-400",
    },
    {
      icon: <Clock size={20} />,
      title: "Business Hours",
      lines: ["Monday — Saturday", "9:00 AM to 7:00 PM (IST)"],
      link: `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`,
      linkLabel: "WhatsApp After Hours →",
      color: "text-yellow-400",
    },
  ];

  const requirementOptions = [
    "Refurbished Enterprise Servers",
    "New HP / Dell / Lenovo Servers",
    "GPU Workstations / ProStation Systems",
    "Cloud & VPS Solutions",
    "Data Center Setup",
    "Server Rental Services",
    "IT Consulting & Support",
    "NAS / Storage Solutions",
    "Networking Equipment",
    "Other",
  ];

  const trustBadges = [
    { icon: <ShieldCheck size={14} />, text: "1-Year Warranty" },
    { icon: <BadgeCheck size={14} />, text: "72-Point Certified" },
    { icon: <Truck size={14} />, text: "Pan-India Delivery" },
    { icon: <Clock size={14} />, text: "Response in 30 Min" },
    { icon: <Users size={14} />, text: "500+ Happy Clients" },
    { icon: <Globe size={14} />, text: "6 Countries Served" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* -- HERO -- */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Contact Us</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 w-fit">
            <Zap size={12} /> RESPONSE GUARANTEED WITHIN 30 MINUTES
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            Get in Touch with{" "}
            <span className="text-[#5BAEFF]">
              Serverwale
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Looking to <strong className="text-white">buy refurbished servers, GPU workstations, or IT infrastructure</strong>?
            Our experts are ready to help you find the <strong className="text-white">best configuration at the lowest price</strong>.
            Contact us today for a <strong className="text-white">free consultation and custom quote</strong>.
          </p>

          {/* Quick Contact Pills */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-black text-sm transition"
            >
              <FaWhatsapp size={16} /> WhatsApp Now
            </a>
            <a
              href="tel:+919999656064"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/15 transition"
            >
              <Phone size={15} /> +91 99996 56064
            </a>
            <a
              href="mailto:contact@serverwale.com"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/15 transition"
            >
              <Mail size={15} /> Email Us
            </a>
          </div>
        </div>
      </section>

      {/* -- CONTACT CARDS ROW -- */}
      <section className="bg-[#08152E] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactCards.map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-400/40 hover:bg-white/10 transition-all group">
                <div className={`mb-3 ${card.color}`}>{card.icon}</div>
                <p className="text-white font-black text-xs uppercase tracking-wide mb-2">{card.title}</p>
                {card.lines.map((line, j) => (
                  <p key={j} className="text-slate-300 text-xs leading-relaxed">{line}</p>
                ))}
                <a
                  href={card.link}
                  target={card.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`mt-3 text-xs font-bold flex items-center gap-1 ${card.color} opacity-70 group-hover:opacity-100 transition`}
                >
                  {card.linkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- MAIN CONTACT SECTION -- */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-start">

            {/* -- LEFT: FORM -- */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Form Header */}
              <div className="bg-[#040A1C] px-7 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <MessageSquare size={18} className="text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-lg">Send Us Your Inquiry</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Get a custom quote for servers, workstations & IT solutions</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#040A1C] mb-2">Inquiry Received! ✓</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Thank you! Our team will contact you within <strong>30 minutes</strong> during business hours.
                    For urgent queries, WhatsApp us directly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition"
                    >
                      <FaWhatsapp size={16} /> WhatsApp Us Now
                    </a>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", requirement: "", message: "" }); }}
                      className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="rahul@company.com"
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        Company Name
                      </label>
                      <input
                        name="company" value={form.company} onChange={handleChange}
                        placeholder="Your Company Pvt. Ltd."
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        Phone Number
                      </label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-slate-50"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        What Are You Looking For?
                      </label>
                      <select
                        name="requirement" value={form.requirement} onChange={handleChange}
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white"
                      >
                        <option value="">— Select your requirement —</option>
                        {requirementOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                        Project Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us your requirements — server specs, quantity, budget, timeline, or any specific configuration you need. The more detail, the faster we can quote you!"
                        rows={4}
                        className="w-full border-2 border-slate-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none bg-slate-50"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
                      ⚠️ {error}
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-5">
                    <input type="checkbox" required className="accent-blue-500 mt-0.5 w-4 h-4 shrink-0" />
                    <span className="text-xs text-slate-500 leading-relaxed">
                      I agree to the <Link to="/policy" className="text-blue-600 underline">privacy policy</Link> and
                      consent to being contacted by Serverwale regarding my inquiry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#040A1C] hover:bg-[#091D3A] text-white py-3.5 rounded-xl font-black text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <><RefreshCw size={16} className="animate-spin" /> Submitting...</>
                    ) : (
                      <><Send size={15} /> Send Inquiry — Get Free Quote</>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-3">
                    🔒 Your data is secure. No spam. Response within <strong>30 minutes</strong> during business hours.
                  </p>
                </form>
              )}
            </div>

            {/* -- RIGHT COLUMN -- */}
            <div className="space-y-5">

              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-[#08152E] to-[#020617] rounded-2xl p-6 border border-blue-900/40 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-green-400">
  <FaWhatsapp size={24} />
</div>
                  <div>
                    <h3 className="font-black text-base">WhatsApp Us Now</h3>
                    <p className="text-slate-400 text-xs">Fastest way to reach us</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  Chat directly with our <strong className="text-white">server experts</strong> on WhatsApp.
                  Get <strong className="text-white">instant quotes, configurations,</strong> and answers -
                  no waiting, no forms.
                </p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-black text-sm transition w-full"
                >
                  <FaWhatsapp size={18} /> Start WhatsApp Chat
                </a>
                <p className="text-center text-slate-500 text-[10px] mt-2">Available Mon-Sat, 9AM-7PM IST</p>
              </div>

              {/* Office Address */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-black text-[#040A1C] text-sm mb-4 flex items-center gap-2">
                  <Building2 size={16} className="text-blue-500" /> Our Office
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#040A1C] text-xs">Head Office , Delhi</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                        <strong>Nehru Place IT Market</strong>,<br />
                        New Delhi 110019, India
                      </p>
                      <a
                        href="https://maps.google.com/?q=Nehru+Place+New+Delhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-[11px] font-bold mt-1 inline-flex items-center gap-1 hover:text-blue-800"
                      >
                        Get Directions on Google Maps <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#040A1C] text-xs">Sales & Helpdesk</p>
                      <a href="tel:+919999656064" className="text-slate-600 text-xs mt-0.5 block hover:text-blue-600 font-medium">
                        +91 99996 56064
                      </a>
                      <p className="text-slate-400 text-[11px]">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={16} className="text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#040A1C] text-xs">Email</p>
                      <a href="mailto:contact@serverwale.com" className="text-slate-600 text-xs mt-0.5 block hover:text-blue-600">
                        contact@serverwale.com
                      </a>
                      <p className="text-slate-400 text-[11px]">Reply within 4 business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <h3 className="font-black text-[#040A1C] text-sm mb-4 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500" /> Why Contact Serverwale
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Free expert consultation on server configuration",
                    "Custom quotes within 30 minutes",
                    "Best price guarantee on HP, Dell & Lenovo",
                    "1-year warranty on all refurbished hardware",
                    "Pan-India delivery — same day in Delhi NCR",
                    "Post-sales support and on-site installation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                      <CheckCircle size={12} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-black text-[#040A1C] text-sm mb-3">Follow Serverwale</h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { Icon: Linkedin, href: "https://www.linkedin.com/company/serverwale/posts/?feedView=all", label: "LinkedIn", color: "hover:bg-blue-600" },
                    { Icon: Twitter, href: "https://x.com/Serverwale", label: "Twitter", color: "hover:bg-sky-500" },
                    { Icon: Instagram, href: "https://www.instagram.com/serverwale/", label: "Instagram", color: "hover:bg-pink-600" },
                    { Icon: Facebook, href: "https://www.facebook.com/people/Serverwale/61555058137586/", label: "Facebook", color: "hover:bg-blue-700" },
                    { Icon: Youtube, href: "https://www.youtube.com/@serverwale0", label: "YouTube", color: "hover:bg-red-600" },
                  ].map(({ Icon, href, label, color }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-9 h-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-white ${color} hover:border-transparent transition-all duration-200 hover:scale-110`}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- WHO SHOULD CONTACT US -- */}
      <section className="py-8 md:py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-blue-600 text-xs font-black uppercase tracking-widest">Who We Help</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#040A1C] mt-3 mb-3">
              We Serve Businesses of All Sizes
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              From <strong>startups needing their first server</strong> to{" "}
              <strong>enterprises building 100-node data centers</strong> 
              Serverwale has the right solution for every budget.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Startups & SMEs",
                desc: "Budget-friendly refurbished servers to build your IT foundation. Save 60–80% vs new — same enterprise-grade performance.",
                icon: "🚀",
              },
              {
                title: "Enterprise Companies",
                desc: "Bulk server procurement, custom data center buildouts, and IT infrastructure consulting for large-scale deployments.",
                icon: "🏢",
              },
              {
                title: "VFX & AI Studios",
                desc: "High-performance GPU workstations and render farms for 3D rendering, VFX pipelines, and AI/ML model training.",
                icon: "🎬",
              },
              {
                title: "IT Resellers & Dealers",
                desc: "Wholesale pricing on HP, Dell & Lenovo servers. Reliable supply chain with consistent stock and competitive margins.",
                icon: "🔧",
              },
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md hover:bg-white transition-all duration-300">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-black text-[#040A1C] mb-2 text-sm">{card.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- TRUST BADGES + BOTTOM CTA -- */}
      <section className="py-8 bg-[#040A1C]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            India's Most Trusted Server Dealer
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            <strong className="text-slate-300">500+ businesses</strong> across India trust Serverwale for their IT infrastructure.
            From <strong className="text-slate-300">Nehru Place, New Delhi</strong> to your doorstep we deliver quality.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustBadges.map((b, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold px-4 py-2 rounded-full">
                <span className="text-blue-400">{b.icon}</span> {b.text}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-sm transition"
            >
              <FaWhatsapp size={17} /> WhatsApp an Expert Now
            </a>
            <Link
              to="/product"
              className="inline-flex items-center justify-center gap-2 bg-[#5BAEFF] hover:bg-[#8ac8ff] text-[#040A1C] px-8 py-3.5 rounded-xl font-black text-sm transition"
            >
              Browse All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
