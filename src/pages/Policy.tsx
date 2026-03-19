import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, FileText, RefreshCcw, Truck,
  AlertTriangle, Phone, MessageCircle, HelpCircle,
  ChevronDown, ChevronUp, Lock, Eye, UserCheck,
  Clock, BadgeCheck, Package, MapPin, Headphones,
  CheckCircle, ChevronRight, Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import useSEO from "../hooks/useSEO";

const POLICIES = [
  {
    icon: ShieldCheck,
    color: "bg-blue-50 border-blue-200 text-[#0055E5]",
    iconBg: "bg-blue-100",
    title: "Privacy Policy",
    subtitle: "Your data is yours. Always.",
    desc: (
      <>
        We are committed to <strong className="text-[#0F172A]">protecting your personal and business data</strong>.
        When you buy <strong className="text-[#0F172A]">refurbished servers, GPU workstations, or cloud services</strong> from
        Serverwale™, your information is handled with the strictest confidentiality.
      </>
    ),
    points: [
      { icon: Lock,     text: "Personal & business data kept strictly confidential"              },
      { icon: Eye,      text: "We never sell or share your information with third parties"       },
      { icon: UserCheck,text: "Data used only for order processing, support & service delivery"  },
      { icon: ShieldCheck,text:"Secure HTTPS encryption on all transactions"                     },
    ],
  },
  {
    icon: RefreshCcw,
    color: "bg-slate-50 border-slate-200 text-slate-600",
    iconBg: "bg-slate-100",
    title: "Refund Policy",
    subtitle: "Fair. Transparent. Case-by-case.",
    desc: (
      <>
        Refunds at Serverwale™ are handled <strong className="text-[#0F172A]">fairly and transparently</strong> based on
        product type, configuration, and the stage of fulfilment.
        <strong className="text-[#0F172A]"> Custom-built servers and enterprise deployments</strong> have specific refund terms.
      </>
    ),
    points: [
      { icon: CheckCircle, text: "Refund eligibility assessed case-by-case within 7 days"         },
      { icon: AlertTriangle,text:"Custom builds & dedicated servers: limited refund applicability" },
      { icon: Clock,       text: "Standard stock items: refund within 48–72 hours of approval"    },
      { icon: Headphones,  text: "Support team reviews every request personally"                  },
    ],
  },
  {
    icon: FileText,
    color: "bg-green-50 border-green-200 text-green-600",
    iconBg: "bg-green-100",
    title: "Terms & Conditions",
    subtitle: "Clear terms. Mutual respect.",
    desc: (
      <>
        By using Serverwale™ services — including <strong className="text-[#0F172A]">server purchases, cloud hosting, VPS, and IT consulting</strong> —
        you agree to comply with our acceptable-use policy and all applicable{" "}
        <strong className="text-[#0F172A]">Indian IT laws and regulations</strong>.
      </>
    ),
    points: [
      { icon: BadgeCheck, text: "Services must not be used for illegal or unethical activities"   },
      { icon: FileText,   text: "Users must comply with Indian IT Act 2000 & amendments"          },
      { icon: AlertTriangle,text:"Abuse of cloud resources may result in immediate suspension"    },
      { icon: Zap,        text: "Serverwale reserves the right to update terms with notice"       },
    ],
  },
  {
    icon: Truck,
    color: "bg-orange-50 border-orange-200 text-orange-600",
    iconBg: "bg-orange-100",
    title: "Shipping Policy",
    subtitle: "Pan-India. Packed safe. Delivered fast.",
    desc: (
      <>
        We ensure <strong className="text-[#0F172A]">secure and timely delivery</strong> of all servers, workstations, and IT hardware
        across India with professional packaging, insurance cover, and real-time tracking.
        <strong className="text-[#0F172A]"> Same-day dispatch</strong> available in Delhi NCR.
      </>
    ),
    points: [
      { icon: MapPin,   text: "Pan-India delivery — all major cities covered"                    },
      { icon: Package,  text: "Professional packaging — anti-static, foam-padded"                },
      { icon: Truck,    text: "Tracking details shared via SMS/email post-dispatch"              },
      { icon: Clock,    text: "Metro cities: 1–3 days · Other cities: 3–7 business days"        },
    ],
  },
];

const FAQS = [
  {
    q: "Do you provide warranty on refurbished servers?",
    a: "Yes — all refurbished servers from Serverwale™ come with a minimum 1-year comprehensive hardware warranty. This covers component failures, RAM faults, drive issues, and firmware defects. Extended 2–3 year warranty options are available on request. On-site support is available across Delhi NCR.",
  },
  {
    q: "Can I cancel my order after placing it?",
    a: "Order cancellations are accepted within 24 hours of placement for standard stock items. Custom-configured servers and enterprise builds cannot be cancelled once assembly has commenced, as components are allocated specifically to your order. Contact our support team immediately for cancellation requests.",
  },
  {
    q: "How long does shipping take across India?",
    a: "Same-day dispatch is available in Delhi NCR. Metro cities (Mumbai, Bangalore, Chennai, Hyderabad, Pune) receive delivery within 1–3 business days. All other cities across India are covered within 3–7 business days. Custom-configured systems may require additional time for pre-dispatch QC.",
  },
  {
    q: "Is my personal and business data secure with Serverwale™?",
    a: "Absolutely. We follow strict data protection practices compliant with Indian IT Act 2000. Your information is only used for order processing, delivery, and post-sales support. We never sell, rent, or share customer data with any third party. All transactions are secured via HTTPS encryption.",
  },
  {
    q: "What is covered under the refund policy for cloud/VPS services?",
    a: "Cloud VPS and hosting plans come with a 7-day money-back guarantee for new customers if the service fails to meet the promised uptime SLA. Dedicated cloud plans are reviewed on a case-by-case basis. Refunds are processed within 5–7 business days after approval.",
  },
  {
    q: "Who do I contact for policy-related queries or disputes?",
    a: "Contact our support team at contact@serverwale.com or call +91 85952 42521. For urgent matters, WhatsApp us directly. Our team is available Monday–Friday, 9AM–6:30PM IST, with emergency support for enterprise clients available 24×7.",
  },
];

export default function PolicyPage() {
  useSEO({
    title: "Privacy, Refund & Shipping Policy | Serverwale™ India",
    description: "Read Serverwale™'s Privacy Policy, Refund Policy, Terms & Conditions, and Shipping Policy for buying refurbished servers, GPU workstations and cloud services in India.",
    keywords: "serverwale privacy policy, refund policy server india, shipping policy refurbished servers, terms conditions server dealer india",
    canonical: "https://serverwale.com/policy",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white font-sans overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden text-white min-h-[320px] sm:min-h-[380px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(37,99,235,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.10),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10 pt-24 sm:pt-28 pb-14 sm:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0055E5]">Policies &amp; Legal</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full mb-5 w-fit">
            <ShieldCheck size={12} /> TRANSPARENT POLICIES — LAST UPDATED MARCH 2025
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 max-w-3xl">
            Policies &amp;{" "}
            <span className="text-[#5BAEFF]">
              Legal Information
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Read our <strong className="text-white">Privacy Policy</strong>,{" "}
            <strong className="text-white">Refund Policy</strong>,{" "}
            <strong className="text-white">Terms &amp; Conditions</strong>, and{" "}
            <strong className="text-white">Shipping Policy</strong> — transparent terms for buying{" "}
            <strong className="text-white">refurbished servers, workstations &amp; cloud services</strong> from Serverwale™ India.
          </p>
        </div>
      </section>

      {/* ══ POLICY CARDS ══ */}
      <section className="py-14 sm:py-18 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#0055E5] rounded-full" />
              <p className="text-[#0055E5] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
                Our Commitments
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-2">
              Built on <span className="text-[#0055E5]">Trust &amp; Transparency</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Every policy at Serverwale™ is designed to protect both the customer and the company — fair, clear, and jargon-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {POLICIES.map(({ icon: Icon, color, iconBg, title, subtitle, desc, points }) => (
              <div
                key={title}
                className={`border-2 rounded-2xl p-5 sm:p-6 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${color.split(' ')[1]} ${color.split(' ')[2]}`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color.split(' ')[2]} />
                </div>

                <h3 className="font-black text-[#0F172A] text-base sm:text-lg mb-0.5">{title}</h3>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">{subtitle}</p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{desc}</p>

                <ul className="space-y-2">
                  {points.map(({ icon: PIcon, text }) => (
                    <li key={text} className="flex items-start gap-2 text-slate-600 text-[11px] sm:text-xs">
                      <PIcon size={12} className={`${color.split(' ')[2]} shrink-0 mt-0.5`} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DISCLAIMER ══ */}
      <section className="py-12 sm:py-16 bg-white border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-4 sm:gap-6 items-start bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-7">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle size={22} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] mb-2 flex items-center gap-2">
                Disclaimer
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Serverwale™ provides <strong className="text-[#0F172A]">servers, workstations, cloud hosting, and IT infrastructure services</strong> on an
                "as-is" and "as-available" basis. While we strive for maximum availability and quality,
                we do not guarantee <strong className="text-[#0F172A]">100% uninterrupted service</strong> in all scenarios.
                Serverwale™ is not liable for <strong className="text-[#0F172A]">indirect damages, data loss, or business interruption</strong> arising
                from third-party factors. Product specifications, pricing, and availability may change without prior notice.
                Please review applicable <strong className="text-[#0F172A]">SLA agreements and warranty documentation</strong> before purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#0055E5] rounded-full" />
              <p className="text-[#0055E5] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">FAQ</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
              Policy <span className="text-[#0055E5]">Questions &amp; Answers</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`border rounded-xl bg-white transition-all duration-300 ${openFaq === i ? "border-[#0055E5] shadow-md" : "border-slate-200 hover:border-slate-300"}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={15} className={openFaq === i ? "text-[#0055E5]" : "text-slate-400"} />
                    <span className={`text-sm font-bold ${openFaq === i ? "text-[#0F172A]" : "text-slate-700"}`}>{item.q}</span>
                  </div>
                  {openFaq === i ? <ChevronUp size={16} className="text-[#0055E5] shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-5 pb-4 pl-10 sm:pl-12 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-12 sm:py-16 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 bg-[#0055E5]/15 border border-[#0055E5]/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Headphones size={24} className="text-[#0055E5]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Still Have <span className="text-[#0055E5]">Questions?</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mb-7 leading-relaxed">
            Our support team is ready to clarify any policy, refund, warranty, or shipping concern.
            <strong className="text-slate-200"> We respond within 30 minutes.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="tel:+918595242521"
              className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition"
            >
              <Phone size={16} /> +91 85952 42521
            </a>
            <a
              href="https://wa.me/919999656064"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-sm hover:bg-green-600 transition"
            >
              <FaWhatsapp size={16} /> WhatsApp Support
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0055E5]/15 border border-[#0055E5]/30 text-[#0055E5] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm hover:bg-[#0044BB]/25 transition"
            >
              <MessageCircle size={16} /> Contact Form
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
