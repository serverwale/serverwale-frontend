import { useState, ReactNode } from "react";
import AnimateIn from "../AnimateIn";
import {
  ChevronDown,
  HelpCircle,
  Mail,
  Server,
  RefreshCcw,
  ShieldCheck,
  Truck,
  Settings,
  Headphones,
  MessageCircle,
  Phone,
  BadgeCheck,
  Users,
  Package,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

/* ---------------- TYPES ---------------- */

interface FAQItem {
  icon: ReactNode;
  category: string;
  question: string;
  answer: ReactNode;
}

/* ---------------- FAQ DATA ---------------- */

const faqs: FAQItem[] = [
  {
    icon: <Server size={14} />,
    category: "Buying Servers",
    question: "Where can I buy certified refurbished servers online in India?",
    answer:
      "Serverwale is India's most trusted destination for certified refurbished servers headquartered at Nehru Place, New Delhi.",
  },
  {
    icon: <RefreshCcw size={14} />,
    category: "Refurbished vs New",
    question: "What is the difference between refurbished and new servers?",
    answer:
      "Refurbished servers are enterprise-grade systems restored to production-ready condition through diagnostics and testing.",
  },
  {
    icon: <ShieldCheck size={14} />,
    category: "Warranty",
    question: "Do refurbished servers from Serverwale come with warranty?",
    answer:
      "Yes — refurbished servers include a 1-year comprehensive warranty covering hardware failures and parts replacement.",
  },
  {
    icon: <Truck size={14} />,
    category: "Delivery",
    question: "How fast is server delivery across India?",
    answer:
      "Same-day dispatch in Delhi NCR and 1–5 business day delivery across India depending on city.",
  },
  {
    icon: <Settings size={14} />,
    category: "Custom Config",
    question: "Can I get a custom server configuration?",
    answer:
      "Yes — custom CPU, RAM, storage, RAID and GPU configurations are available.",
  },
  {
    icon: <Headphones size={14} />,
    category: "Rental & Consulting",
    question: "Do you offer server rental and IT consulting services?",
    answer:
      "Serverwale offers flexible server rental and infrastructure consulting services across India.",
  },
];

/* ---------------- MOBILE SLIDES ---------------- */

const faqSlides = [faqs.slice(0, 3), faqs.slice(3, 6)];

/* ---------------- TRUST POINTS ---------------- */

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "72-Point Quality Certified" },
  { icon: Users, label: "500+ Enterprises Served" },
  { icon: Package, label: "5000+ Servers Delivered" },
  { icon: Clock, label: "30-Min Expert Response" },
];

/* ---------------- CATEGORY COLORS ---------------- */

const catColors: { [key: string]: string } = {
  "Buying Servers":     "bg-[#D3E8FF] text-[#0044BB] border-[#B3D5FF]",
  "Refurbished vs New": "bg-[#EDF4FF] text-[#4F46E5] border-[#C7D2FE]",
  Warranty:             "bg-[#DCFCE7] text-[#16A34A] border-[#A7F3D0]",
  Delivery:             "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
  "Custom Config":      "bg-[#EEF2FF] text-[#4F46E5] border-[#DDD6FE]",
  "Rental & Consulting":"bg-[#CFFAFE] text-[#0369A1] border-[#A5F3FC]",
};

/* ---------------- COMPONENT ---------------- */

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((prev) => (prev === 1 ? 0 : prev + 1));
  const prevSlide = () => setSlide((prev) => (prev === 0 ? 1 : prev - 1));

  return (
    <section className="py-8 sm:py-10 lg:py-8 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <AnimateIn variant="fadeUp">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
          <div className="max-w-2xl">

            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#5BAEFF] rounded-full" />
              <p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px]">
                Frequently Asked Questions
              </p>
            </div>

            <h2 className="text-lg sm:text-3xl lg:text-4xl font-black text-[#0F172A] mb-2">
              Everything About{" "}
              <span className="text-[#5BAEFF]">Buying Servers</span>
            </h2>

            <p className="text-slate-500 text-[11px] sm:text-sm max-w-xl">
              Quick answers on refurbished servers, warranty, delivery and
              custom builds.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center text-[#0055e5] gap-1 bg-[#5BAEFF]/10 border border-[#5BAEFF]/30 px-2 py-1 rounded-full text-[10px] font-semibold"
              >
                <Icon size={11} className="text-[#0055e5]" />
                {label}
              </div>
            ))}
          </div>
        </div>
        </AnimateIn>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">

          {/* DESKTOP FAQ */}

          <div className="hidden sm:block space-y-3">
            {faqs.map((faq, i) => {

              const isOpen = openIndex === i;
              const catClass = catColors[faq.category] || "";

              return (
                <AnimateIn key={i} variant="fadeUp" delay={i * 70} duration={500}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >

                    <div className="flex items-center gap-3">

                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${catClass}`}>
                        {faq.icon}
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">
                          {faq.category}
                        </p>
                        <h3 className="font-bold text-sm">
                          {faq.question}
                        </h3>
                      </div>

                    </div>

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        isOpen
                          ? "rotate-180 text-[#0055E5]"
                          : "text-slate-400"
                      }`}
                    />

                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600">
                      {faq.answer}
                    </div>
                  )}

                </div>
                </AnimateIn>
              );
            })}
          </div>

          {/* MOBILE SLIDER */}

          <div className="sm:hidden">

            <div className="space-y-2">

              {faqSlides[slide].map((faq, i) => {

                const index = slide * 3 + i;
                const isOpen = openIndex === index;
                const catClass = catColors[faq.category] || "";

                return (
                  <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">

                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between px-3 py-3 text-left"
                    >

                      <div className="flex items-center gap-2">

                        <div className={`w-7 h-7 rounded-md border flex items-center justify-center ${catClass}`}>
                          {faq.icon}
                        </div>

                        <h3 className="text-[12px] font-semibold">
                          {faq.question}
                        </h3>

                      </div>

                      <ChevronDown
                        size={14}
                        className={`transition ${
                          isOpen
                            ? "rotate-180 text-[#0055E5]"
                            : "text-slate-400"
                        }`}
                      />

                    </button>

                    {isOpen && (
                      <div className="px-3 pb-3 text-[11px] text-slate-600">
                        {faq.answer}
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* MOBILE NAV */}

            <div className="flex justify-center gap-6 mt-5">

              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-4">

            {/* CONTACT CARD */}
<div className="bg-[#0F172A] rounded-xl p-4 sm:p-6 text-white">

  {/* Icon */}
  <div className="w-9 h-9 bg-[#0055E5]/20 rounded-lg flex items-center justify-center mb-3">
    <HelpCircle size={18} className="text-blue-300" />
  </div>

  {/* Heading */}
  <h3 className="font-bold text-base mb-2">
    Can't Find Your Answer?
  </h3>

  {/* Text */}
  <p className="text-slate-300 text-sm mb-4">
    Our experts respond within 30 minutes.
  </p>

  <div className="flex flex-col gap-2.5">

    {/* WhatsApp */}
    <a
      href="https://wa.me/919999656064"
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 hover:text-white text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <FaWhatsapp size={15} color="white" />
      Chat on WhatsApp
    </a>

    {/* Send Enquiry */}
    <Link
      to="/contact"
      className="flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <Mail size={15} className="text-white" />
      Send Enquiry
    </Link>

    {/* Phone */}
    <a
      href="tel:+918595242521"
      className="flex items-center justify-center gap-2 border border-slate-500 text-slate-200 hover:text-white hover:border-blue-400 hover:bg-white/5 px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
    >
      <Phone size={14} />
      +91 85952 42521
    </a>

  </div>

</div>

            {/* BROWSE BY TOPIC */}

            <div className="bg-[#f59e09]/15 border border-[#f59e09]/25 rounded-xl p-4 sm:p-5">

              <p className="font-bold text-black text-sm mb-3 flex items-center gap-2">
                <MessageCircle size={14} className="text-black" />
                Browse by Topic
              </p>

              <div className="flex flex-col gap-2">

                {[
                  { label: "Browse All Servers", link: "/product" },
                  { label: "Cloud & VPS Plans", link: "/shop/cloud" },
                  { label: "Enterprise Solutions", link: "/enterprise-solution" },
                  { label: "Contact & Support", link: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.link}
                    className="flex justify-between text-slate-600 hover:text-[#0055E5] text-sm group"
                  >
                    {item.label}

                    <ArrowRight
                      size={13}
                      className="text-slate-300 group-hover:text-[#0055E5] group-hover:translate-x-1 transition"
                    />
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}