import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  Mail, MapPin, Phone,
} from "lucide-react";

const QUICK_LINKS = [
  { name: "Home",           path: "/"                  },
  { name: "About Us",       path: "/about"             },
  { name: "Products",       path: "/product"           },
  { name: "Services",       path: "/services"          },
  { name: "Blog",           path: "/blog"              },
  { name: "Store",          path: "/shop/now"          },
  { name: "Careers",        path: "/joinus"            },
  { name: "Privacy Policy", path: "/policy"            },
];

const SOLUTIONS = [
  { name: "Refurbished Servers",    path: "/product"                        },
  { name: "GPU Workstations",       path: "/services/hpc-solutions"         },
  { name: "IT Consulting",          path: "/services/it-consulting"         },
  { name: "Cloud Solutions",        path: "/services/cloud-solutions"       },
  { name: "Render Farms",           path: "/services/rendering-infra"       },
  { name: "HPC Clusters",           path: "/services/hpc-solutions"         },
  { name: "Enterprise Solutions",   path: "/enterprise-solution"            },
];

const TRUST_BADGES = [
  "✅ 500+ Happy Clients",
  "📦 10,000+ Servers Delivered",
  "🛡️ 1-Year Warranty",
  "🚀 Same-Day Dispatch Delhi NCR",
  "🌍 6 Countries Served",
];

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/company/serverwale/posts/?feedView=all", label: "Serverwale LinkedIn"  },
  { Icon: Twitter,   href: "https://x.com/Serverwale",                                        label: "Serverwale Twitter"   },
  { Icon: Facebook,  href: "https://www.facebook.com/people/Serverwale/61555058137586/",      label: "Serverwale Facebook"  },
  { Icon: Instagram, href: "https://www.instagram.com/serverwale/",                           label: "Serverwale Instagram" },
  { Icon: Youtube,   href: "https://www.youtube.com/@serverwale0",                            label: "Serverwale YouTube"   },
];

const Footer: React.FC = () => {
  return (
   <footer
  className="font-sans"
  style={{
    color: "#CBD5F5",
    background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)"
  }}
  aria-label="Serverwale Footer"
>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

        {/* ══════════════════════════════════════════
            DESKTOP GRID (lg+): 5-col — unchanged
            MOBILE: Brand → 2×2 Links Grid → Contact
        ══════════════════════════════════════════ */}

        {/* ── DESKTOP LAYOUT (lg+) ── */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-10">
          <BrandCol />
          <LinksCol title="Quick Links"    items={QUICK_LINKS} />
          <LinksCol title="Our Solutions"  items={SOLUTIONS}   />
          <ContactCol />
        </div>

        {/* ── MOBILE LAYOUT (< lg) ── */}
        <div className="lg:hidden flex flex-col gap-7">

          {/* 1. Brand block */}
          <BrandCol />

          {/* 2. 2-col grid: Quick Links + Solutions */}
          <div className="grid grid-cols-2 gap-6">
            <LinksCol title="Quick Links"   items={QUICK_LINKS} />
            <LinksCol title="Our Solutions" items={SOLUTIONS}   />
          </div>

          {/* 3. Contact full-width */}
          <ContactCol />
        </div>

        {/* ══ CERT / PARTNER BADGES ══ */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/8">

          {/* Partner Certs */}
          <div className="mb-4 sm:mb-5">
            <p className="text-center text-white/20 text-[9px] uppercase tracking-widest font-semibold mb-3">
              Certifications &amp; Partnerships
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "ISO 9001 Certified",     color: "border-blue-500/30 text-blue-400"  },
                { label: "HP Authorized Dealer",   color: "border-blue-500/30 text-blue-400"    },
                { label: "Dell Certified Partner", color: "border-blue-500/30 text-blue-400" },
                { label: "Lenovo Partner",         color: "border-blue-500/30 text-blue-400"    },
                { label: "Microsoft Partner",      color: "border-blue-500/30 text-blue-400" },
                { label: "VMware Reseller",        color: "border-blue-500/30 text-blue-400"   },
              ].map((b) => (
                <span
                  key={b.label}
                  className={`text-[9px] sm:text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-white/3 ${b.color}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-5 sm:mb-6">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="text-[10px] sm:text-xs text-slate-400 bg-[#1E293B] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Serverwale™ Systems Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <Link to="/policy" className="hover:text-[#0055E5] transition">Privacy Policy</Link>
              <span>|</span>
              <a href="/sitemap.xml" className="hover:text-[#0055E5] transition">Sitemap</a>
              <span>|</span>
              <span>CIN: U74999DL2017PTC000000</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

/* ══ BRAND COLUMN ══ */
const BrandCol: React.FC = () => (
  <div className="lg:col-span-2">
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#0055E5] to-[#6366F1] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
        S
      </div>
      <span className="text-lg sm:text-xl font-bold text-[#5BAEFF] ">
        Serverwale<span className="text-[#5BAEFF] ">™</span>
      </span>
    </div>

    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-2">
      India's trusted enterprise IT infrastructure company. We supply{" "}
      <strong className="text-slate-300">certified refurbished HP, Dell &amp; Lenovo servers</strong>,{" "}
      GPU workstations, and complete data center solutions — with{" "}
      <strong className="text-slate-300">pan-India delivery</strong> and 1-year warranty.
    </p>

    <p className="text-[#5BAEFF] text-[10px] sm:text-xs font-semibold mb-4 sm:mb-5 uppercase tracking-widest">
      Desk to Data Center — We Build It All
    </p>
{/* Socials */}
<div className="flex gap-2 sm:gap-3">
  {SOCIALS.map(({ Icon, href, label }, i) => (
    <a
      key={i}
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-7 h-7 sm:w-8 sm:h-8 bg-[#1E293B] border border-white/10 rounded-full flex items-center justify-center
                 transition-all duration-300 hover:bg-[#0055E5] hover:border-[#0055E5] hover:scale-110"
    >
      <Icon
        size={13}
        className="text-[#0055E5] transition-colors duration-300 group-hover:text-white"
      />
    </a>
  ))}
</div>
  </div>
);

/* ══ LINKS COLUMN ══ */
const LinksCol: React.FC<{ title: string; items: { name: string; path: string }[] }> = ({ title, items }) => (
  <div>
    <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4">{title}</h4>
    <ul className="space-y-1.5 sm:space-y-2.5">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.path}
            className="text-slate-400 hover:text-[#0055E5] hover:translate-x-1 transition-all duration-200 inline-block text-[11px] sm:text-sm"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ══ CONTACT COLUMN ══ */
const ContactCol: React.FC = () => (
  <div>
    <h4 className="text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4">Contact Us</h4>
    <div className="space-y-3 sm:space-y-4 text-sm">

      <div className="flex items-start gap-2 sm:gap-3">
        <MapPin size={13} className="text-[#0055E5] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-slate-300 font-medium text-xs sm:text-sm">Head Office</p>
          <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
            Nehru Place IT Market,<br />New Delhi – 110019, India
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2 sm:gap-3">
        <Phone size={13} className="text-[#0055E5] mt-0.5 flex-shrink-0" />
        <div>
          <a
            href="tel:+918595242521"
            className="text-slate-300 hover:text-[#0055E5] transition font-medium text-xs sm:text-sm"
            aria-label="Call Serverwale"
          >
            +91 85952 42521
          </a>
          <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">Mon–Fri: 9AM–6:30PM IST</p>
        </div>
      </div>

      <div className="flex items-start gap-2 sm:gap-3">
        <Mail size={13} className="text-[#0055E5] mt-0.5 flex-shrink-0" />
        <div>
          <a
            href="mailto:contact@serverwale.com"
            className="text-slate-300 hover:text-[#0055E5] transition text-[11px] sm:text-xs break-all"
            aria-label="Email Serverwale"
          >
            contact@serverwale.com
          </a>
          <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">Sales &amp; Support</p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/918595242521?text=Hi%20Serverwale%2C%20I%20need%20information%20about%20servers%20and%20IT%20infrastructure."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Serverwale on WhatsApp"
        className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366]
                   hover:bg-[#25D366] hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold
                   transition-all duration-300 mt-1"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z"/>
        </svg>
        Chat on WhatsApp
      </a>
    </div>
  </div>
);
