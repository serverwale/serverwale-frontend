import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Search, ChevronRight, Server, Monitor, Cpu, HardDrive,
  Network, Cloud, Zap, Package, ArrowRight, BadgeCheck,
  ShieldCheck, Clock, Award, Users, TrendingUp, Headphones,
  ChevronDown, ChevronUp, CheckCircle, Star, Truck, Wrench,
  RotateCcw, Mail, Tag, Sparkles, Settings, Layers, LayoutGrid
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import useSEO from "../hooks/useSEO";

type Product = {
  id: number;
  title: string;
  description: string;
  features: string[];
  image?: string | null;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

const ALL_ID = -1; // virtual "All" category id
const API_BASE = "http://localhost:5000";
const PRODUCTS_PER_PAGE = 6;
const WA_NUM = "919999656064";

/* -- Category icon mapping -- */
const getCategoryIcon = (name: string) => {
  const n = (name || "").toLowerCase();
  if (n.includes("server") || n.includes("rack"))            return Server;
  if (n.includes("workstation") || n.includes("desktop"))    return Monitor;
  if (n.includes("gpu") || n.includes("graphics"))           return Cpu;
  if (n.includes("storage") || n.includes("nas") || n.includes("drive")) return HardDrive;
  if (n.includes("network") || n.includes("switch") || n.includes("router")) return Network;
  if (n.includes("cloud") || n.includes("vps"))              return Cloud;
  if (n.includes("custom") || n.includes("build"))           return Settings;
  if (n.includes("solution") || n.includes("system"))        return Layers;
  return Package;
};

/* -- Smart deterministic badge -- */
const MAIN_BADGES = [
  { label: "Best Seller",   bg: "bg-[#FEF3C7] text-[#D97706]",   ring: "ring-[#F59E0B]/20", icon: TrendingUp },
  { label: "New Arrival",   bg: "bg-[#D3E8FF] text-[#0044BB]",   ring: "ring-blue-200",     icon: Sparkles   },
  { label: "Best Price",    bg: "bg-[#DCFCE7] text-[#16A34A]",   ring: "ring-green-200",    icon: Tag        },
  { label: "Customizable",  bg: "bg-[#EEF2FF] text-[#4F46E5]",   ring: "ring-purple-200",   icon: Settings   },
  { label: "Top Pick",      bg: "bg-[#D3E8FF] text-[#0044BB]",   ring: "ring-blue-200",     icon: Award      },
  { label: "Custom Order",  bg: "bg-[#EDF4FF] text-[#4F46E5]",   ring: "ring-indigo-200",   icon: Package    },
];

const STATUS_BADGES = [
  { label: "In Stock",     bg: "bg-[#DCFCE7] text-[#16A34A]" },
  { label: "In Stock",     bg: "bg-[#DCFCE7] text-[#16A34A]" },
  { label: "In Stock",     bg: "bg-[#DCFCE7] text-[#16A34A]" },
  { label: "On Request",   bg: "bg-[#FEF3C7] text-[#D97706]" },
  { label: "Customizable", bg: "bg-[#EEF2FF] text-[#4F46E5]" },
  { label: "On Request",   bg: "bg-[#FEF3C7] text-[#D97706]" },
];

const getMainBadge   = (id: number) => MAIN_BADGES  [Math.abs(id) % MAIN_BADGES.length];
const getStatusBadge = (id: number) => STATUS_BADGES[Math.abs(id) % STATUS_BADGES.length];

/* -- Static FAQ -- */
const faqs = [
  {
    q: "What is ProStation Systems and how is it different from regular products?",
    a: "ProStation Systems is Serverwale's exclusive in-house brand of custom-built GPU workstations, AI servers, and enterprise compute systems. Unlike off-the-shelf products, every ProStation Systems machine is sourced from trusted suppliers in Dubai & China, assembled and rigorously tested at our Nehru Place, Delhi facility, and customized to your exact specifications. You get enterprise-grade hardware at 60-80% lower cost than branded alternatives — with full transparency on where it comes from.",
  },
  {
    q: "Where do ProStation Systems components come from?",
    a: "We source premium server components, GPUs, and compute hardware from trusted suppliers in Dubai and China — the world's leading markets for enterprise IT hardware. All components are imported, inspected for authenticity and quality, then assembled and customized in-house at our Delhi facility. This allows us to offer significantly better pricing than MNC brands without compromising on performance or reliability.",
  },
  {
    q: "What warranty do ProStation Systems products come with?",
    a: "All ProStation Systems products ship with a minimum 1-year comprehensive warranty covering hardware defects, component failures, and parts replacement. Extended 2-3 year warranty options are available. We also offer AMC (Annual Maintenance Contracts) with on-site support in Delhi NCR and remote support pan-India.",
  },
  {
    q: "Can I fully customize my ProStation Systems configuration?",
    a: "Yes — complete customization is our core strength. You can specify CPU type and count, RAM capacity, storage type (HDD/SSD/NVMe) and size, GPU model and count, RAID configuration, power supply wattage, cooling solutions, and networking. Our engineers will help you design the optimal configuration for your workload — whether AI/ML, 3D rendering, VFX, CAD, or enterprise database hosting.",
  },
  {
    q: "How quickly can ProStation Systems products be delivered across India?",
    a: "Standard configurations are assembled and shipped within 3-5 business days from our Delhi facility. Same-day or next-day delivery is available in Delhi NCR. Pan-India shipping takes 3?5 business days with full transit insurance and professional packaging. Custom builds may take 7-10 days depending on component availability.",
  },
  {
    q: "Do you provide installation and on-site support?",
    a: "Yes. We offer end-to-end deployment services — rack mounting, cabling, OS installation, driver configuration, BIOS/RAID setup, and network integration. On-site engineers are available across Delhi NCR. Remote installation support is provided for all-India clients. ProStation Systems machines are delivered pre-configured and production-ready.",
  },
];

const globalStats = [
  { icon: Users,       value: "100+",    label: "Enterprise Clients"  },
  { icon: Award,       value: "1000+",   label: "Systems Deployed"    },
  { icon: ShieldCheck, value: "3-Yr",    label: "Warranty Included"   },
  { icon: Clock,       value: "24/7",    label: "Expert Support"      },
  { icon: TrendingUp,  value: "60-80%",  label: "Avg Cost Saving"     },
];

const trustBadges = [
  { icon: BadgeCheck, text: "72-Point Quality Certified" },
  { icon: Truck,      text: "Pan-India Delivery"         },
  { icon: Wrench,     text: "Free Installation"          },
  { icon: RotateCcw,  text: "7-Day Easy Returns"         },
];

/* -------------------------------- */
const ProductsPage: React.FC = () => {
  useSEO({
    title: "ProStation Systems Products | Custom GPU Workstations & Servers | Serverwale India",
    description: "Explore ProStation Systems — Serverwale's in-house brand of custom-built GPU workstations, AI servers, rendering rigs, and enterprise systems. Imported from Dubai & China, assembled & customized in India. 1-year warranty. Pan-India delivery.",
    keywords: "ProStation Systems workstation india, custom GPU workstation india, AI workstation india, refurbished servers india, buy servers online india, GPU server india, ProStation Systems GPU, workstation dealers india, enterprise server dealer delhi, HP Dell Lenovo server india",
    canonical: "https://serverwale.com/product",
  });

  const [categories,      setCategories]      = useState<Category[]>([]);
  const [allProducts,     setAllProducts]     = useState<Product[]>([]);   // cached "all"
  const [catProducts,     setCatProducts]     = useState<Product[]>([]);   // per-cat
  const [activeCategory,  setActiveCategory]  = useState<number>(ALL_ID);
  const [page,            setPage]            = useState(1);
  const [loading,         setLoading]         = useState(false);
  const [fade,            setFade]            = useState(false);
  const [search,          setSearch]          = useState("");
  const [openFaq,         setOpenFaq]         = useState<number | null>(null);
  const [catCounts,       setCatCounts]       = useState<Record<number, number>>({});

  /* -- load categories -- */
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then(r => r.json())
      .then((data: Category[]) => setCategories(data.map(c => ({ id: Number(c.id), name: c.name }))));
  }, []);

  /* -- load ALL products once + compute category counts -- */
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then((data: Product[]) => {
        const safe = Array.isArray(data)
          ? data.map(p => ({ ...p, features: Array.isArray(p.features) ? p.features : [] }))
          : [];
        setAllProducts(safe);
        // count per category
        const counts: Record<number, number> = {};
        safe.forEach(p => {
          counts[p.category_id] = (counts[p.category_id] || 0) + 1;
        });
        setCatCounts(counts);
      })
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  /* -- load per-category products when category changes -- */
  useEffect(() => {
    if (activeCategory === ALL_ID) return;
    setLoading(true); setFade(true); setPage(1);
    fetch(`${API_BASE}/api/products?category_id=${activeCategory}`)
      .then(r => r.json())
      .then((data: Product[]) => {
        setCatProducts(
          Array.isArray(data)
            ? data.map(p => ({ ...p, features: Array.isArray(p.features) ? p.features : [] }))
            : []
        );
      })
      .finally(() => { setLoading(false); setTimeout(() => setFade(false), 150); });
  }, [activeCategory]);

  useEffect(() => { setPage(1); }, [search]);

  /* -- active product list -- */
  const activeProducts = activeCategory === ALL_ID ? allProducts : catProducts;

  const filteredProducts = useMemo(
    () => activeProducts.filter(p => (p.title || "").toLowerCase().includes(search.toLowerCase())),
    [activeProducts, search]
  );
  const totalPages        = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, page]);

  const activeCatName = activeCategory === ALL_ID
    ? "All Products"
    : (categories.find(c => c.id === activeCategory)?.name || "Products");

    /* -- Brand story step carousel -- */
  const [activeStep,   setActiveStep]   = useState(0);
  const stepsPaused                     = useRef(false);
  const stepsRef                        = useRef<HTMLDivElement>(null); // kept for dom ref
  useEffect(() => {
    const timer = setInterval(() => {
      if (stepsPaused.current) return;
      setActiveStep(prev => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);
  const handleCatChange = (id: number) => {
    setActiveCategory(id);
    setSearch("");
    setPage(1);
    if (id !== ALL_ID) { setFade(true); setTimeout(() => setFade(false), 200); }
  };

  return (
    <div className="bg-white font-sans overflow-x-hidden text-[15px] md:text-base w-full max-w-full">

      {/* -- HERO -- */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:`linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize:"48px 48px" }}
        />
       <div className="relative max-w-7xl mx-auto px-3 md:px-6 z-10 flex flex-col justify-center h-full pt-20 pb-8 md:pt-28 md:pb-12">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Products</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
            <Zap size={12} /> SERVERWALE'S IN-HOUSE BRAND — CUSTOM-BUILT IN INDIA
          </div>
         <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-2 max-w-4xl">
            ProStation Systems — Custom Workstations &{" "}
            <span className="text-[#5BAEFF]">
              Servers Built for Performance
            </span>
          </h1>
         <p className="max-w-2xl text-blue-200 text-xs sm:text-sm md:text-lg font-medium leading-relaxed mb-3 border-l-2 border-blue-500 pl-3">
            <strong className="text-white">ProStation Systems</strong> is Serverwale's own brand of{" "}
            <strong className="text-white">custom-built GPU workstations, AI servers, and enterprise systems.</strong>{" "}
            We source premium hardware from <strong className="text-white">Dubai & China</strong>,
            assemble and customize in India, and deliver production-ready systems with{" "}
            <strong className="text-white">3-year warranty</strong> anywhere in India.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25">
              Get Custom Quote <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              <FaWhatsapp size={16} /> WhatsApp Expert
            </a>
          </div>
        </div>
      </section>

      {/* -- STATS BAR -- */}
      <div className="bg-[#0F172A] border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto snap-x hide-scrollbar divide-x divide-blue-900/30">
            {globalStats.map((s, i) => (
              <div key={i} className="snap-start flex items-center gap-2 px-4 py-3 min-w-fit">
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

      {/* -- TRUST BADGES -- */}
      <div className="bg-blue-50 border-b border-blue-100">
       <div className="max-w-7xl mx-auto px-3 py-3 flex flex-wrap justify-center gap-4 md:gap-6">
          {trustBadges.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-[#0F172A] text-xs font-bold">
              <b.icon size={14} className="text-blue-500" /> {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* -- ProStation Systems BRAND STORY -- */}
      <section className="bg-white border-b border-slate-100 py-6 md:py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-[#0055E5] rounded-full shrink-0" />
            <p className="text-[#0055E5] font-semibold uppercase tracking-wide text-xs">
              The ProStation Systems Story  100% Transparent
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">

            {/* LEFT ? Brand Story */}
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight mb-3">
                How We Build{" "}
                <span className="text-[#0055E5]">ProStation Systems</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
                Full transparency , you deserve to know exactly what you're buying.
              </p>

              {/* Steps ? auto-swipe on mobile, stacked on desktop */}
              <div
                ref={stepsRef} className="w-full">
                {/* -- MOBILE: Full-width transform carousel -- */}
                <div
                  className="relative overflow-hidden rounded-xl lg:hidden"
                  onMouseEnter={() => { stepsPaused.current = true;  }}
                  onMouseLeave={() => { stepsPaused.current = false; }}
                  onTouchStart={() => { stepsPaused.current = true;  }}
                  onTouchEnd={()   => { setTimeout(() => { stepsPaused.current = false; }, 1800); }}
                >
                  {/* Track */}
                  <div
                    className="flex transition-all duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeStep * 100}%)` }}
                  >
                    {[
                      {
                        step: "01", title: "Global Sourcing",
                        desc: "Premium components from Dubai, US, China & Malaysia � best quality at competitive prices.",
                        iconBg: "bg-blue-100 text-[#0055E5]", cardBg: "bg-blue-50 border-blue-200",
                      },
                      {
                        step: "02", title: "In-House Assembly",
                        desc: "Assembled & stress-tested at our New Delhi facility. RAM, GPU, storage, cooling � your exact specs.",
                        iconBg: "bg-slate-100 text-slate-700", cardBg: "bg-slate-50 border-slate-200",
                      },
                      {
                        step: "03", title: "72-Point Certification",
                        desc: "Burn-in, thermal validation, RAM diagnostics & NVMe health scans � 100% pass before shipping.",
                        iconBg: "bg-green-100 text-green-700", cardBg: "bg-green-50 border-green-200",
                      },
                      {
                        step: "04", title: "Delivered With Warranty",
                        desc: "Ships production-ready with 3-year warranty. On-site support Delhi NCR, remote pan-India.",
                        iconBg: "bg-orange-100 text-orange-700", cardBg: "bg-orange-50 border-orange-200",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`w-full shrink-0 flex gap-3 rounded-xl p-4 border ${item.cardBg}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${item.iconBg}`}>
                          {item.step}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-[#0F172A] text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dot indicators */}
                  <div className="flex justify-center gap-2 mt-3">
                    {[0,1,2,3].map(i => (
                      <button
                        key={i}
                        onClick={() => { setActiveStep(i); stepsPaused.current = true; setTimeout(() => { stepsPaused.current = false; }, 3000); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === i ? "w-6 bg-[#0055E5]" : "w-1.5 bg-slate-300"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* -- DESKTOP: Stacked list -- */}
                <div className="hidden lg:flex flex-col space-y-3">
                  {[
                    { step:"01", title:"Global Sourcing",         desc:"Premium components from Dubai, US, China & Malaysia � best quality at competitive prices.",              iconBg:"bg-blue-100 text-[#0055E5]",   cardBg:"bg-blue-50 border-blue-200"   },
                    { step:"02", title:"In-House Assembly",        desc:"Assembled & stress-tested at our Delhi facility. RAM, GPU, storage, cooling � customized to your specs.", iconBg:"bg-slate-100 text-slate-700",cardBg:"bg-slate-50 border-slate-200"},
                    { step:"03", title:"72-Point Certification",   desc:"Burn-in, thermal validation, RAM diagnostics & NVMe health scans � 100% pass before shipping.",          iconBg:"bg-blue-100 text-[#0055E5]",  cardBg:"bg-blue-50 border-blue-200"  },
                    { step:"04", title:"Delivered With Warranty",  desc:"Ships production-ready with 3-year warranty. On-site support Delhi NCR, remote pan-India.",              iconBg:"bg-orange-100 text-orange-700",cardBg:"bg-orange-50 border-orange-200"},
                  ].map((item,i) => (
                    <div key={i} className={`flex gap-3 rounded-xl p-3 border ${item.cardBg}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${item.iconBg}`}>{item.step}</div>
                      <div>
                        <h4 className="font-black text-[#0F172A] text-sm mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

                        </div>

            {/* RIGHT ? Why This Model Works */}
            <div className="space-y-3 min-w-0">
              <div className="bg-[#0F172A] rounded-2xl p-4 md:p-6 text-white">
                <h3 className="font-black text-sm md:text-base mb-3 text-[#0055E5]">Why This Model = Better Value for You</h3>
                <div className="space-y-2.5">
                  {[
                    { title: "Lower Cost",         text: "Direct sourcing cuts 3-4 middlemen. 6080% less than MNC prices."      },
                    { title: "Fully Customizable", text: "Built to your exact specs  GPU count, RAM, storage, cooling."          },
                    { title: "Made in India",      text: "Assembled, QC'd & supported at our Delhi facility."                     },
                    { title: "Real Warranty",      text: "We own it. When it fails, we fix it  no runaround."                   },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 leading-relaxed">
                      <CheckCircle size={13} className="text-[#0055E5] shrink-0 mt-0.5" />
                      <span className="text-[11px] md:text-sm text-slate-300">
                        <strong className="text-white">{item.title}  </strong>{item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 md:p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#0055E5] rounded-xl flex items-center justify-center shrink-0">
                    <Star size={14} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-[#0F172A] text-xs md:text-sm mb-0.5">ProStation Systems Promise</h4>
                    <p className="text-slate-600 text-[10px] md:text-xs leading-relaxed">
                      Full transparency, zero compromise. We tell you exactly where hardware comes from we stand behind every machine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "Global",  label: "US , Dubai , China", bg: "bg-blue-50   border-blue-100",   color: "text-[#0055E5]"   },
                  { value: "India",   label: "Assembled & QC",     bg: "bg-blue-50  border-blue-100",  color: "text-[#0055E5]"  },
                  { value: "3-Year",  label: "Warranty",           bg: "bg-slate-100 border-slate-200",  color: "text-slate-600" },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} border rounded-xl p-2 text-center`}>
                    <div className={`text-xs font-black ${s.color}`}>{s.value}</div>
                    <div className="text-slate-500 text-[9px] leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- MOBILE CATEGORY DROPDOWN -- */}
      <div className="lg:hidden px-4 pt-4 pb-2">
        <div className="relative w-full">
          <select
            value={activeCategory}
            onChange={e => handleCatChange(Number(e.target.value))}
            className="w-full appearance-none bg-[#0F172A] text-white border border-[#1E293B] rounded-xl px-4 py-3 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value={ALL_ID}>All Products ({allProducts.length})</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({catCounts[cat.id] ?? 0})
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none" />
        </div>
      </div>

      {/* -- MAIN -- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

        {/* -- SIDEBAR -- */}
        <aside className="hidden lg:flex flex-col gap-6">
          <div className="bg-[#EDF4FF] border border-[#C8DCFF] rounded-2xl p-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Product Categories</h4>
            <div className="space-y-1.5">
              {/* All button */}
              <button onClick={() => handleCatChange(ALL_ID)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all
                  ${activeCategory === ALL_ID ? "bg-[#0F172A] text-white shadow-md" : "bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0055E5]"}`}
              >
                <span className="flex items-center gap-2.5">
                  <LayoutGrid size={15} className={activeCategory === ALL_ID ? "text-blue-300" : "text-blue-500"} />
                  All Products
                </span>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${activeCategory === ALL_ID ? "bg-white/20 text-white" : "bg-blue-100 text-[#0055E5]"}`}>
                  {allProducts.length}
                </span>
              </button>
              {categories.map(cat => {
                const Icon  = getCategoryIcon(cat.name);
                const count = catCounts[cat.id] ?? 0;
                return (
                  <button key={cat.id} onClick={() => handleCatChange(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all
                      ${cat.id === activeCategory ? "bg-[#0F172A] text-white shadow-md" : "bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0055E5]"}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} className={cat.id === activeCategory ? "text-blue-300" : "text-blue-500"} />
                      {cat.name}
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ${cat.id === activeCategory ? "bg-white/20 text-white" : "bg-blue-100 text-[#0055E5]"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Why buy */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 rounded-2xl text-white">
            <h4 className="font-black text-sm mb-4 flex items-center gap-2">
              <BadgeCheck size={16} className="text-blue-300" /> Why Buy From Serverwale
            </h4>
            {[
              "40-Point hardware inspection on every unit",
              "1-Year warranty, extendable to 3 years",
              "Custom configurations on request",
              "Same-day dispatch in Delhi NCR",
              "Free rack mounting & installation support",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-200 mb-2">
                <CheckCircle size={11} className="text-blue-400 shrink-0 mt-0.5" /> {t}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#0055E5] p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <Tag size={26} className="mb-3 text-blue-100" />
            <h4 className="font-black text-lg mb-1 leading-tight">Need a Custom Config?</h4>
            <p className="text-blue-100 text-sm mb-4">Tell us your workload — we'll build the perfect system within your budget.</p>
            <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer"
              className="w-full bg-white text-[#0055E5] py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 hover:bg-blue-50 transition">
              <FaWhatsapp size={16} /> Get Free Quote
            </a>
          </div>
        </aside>

        {/* --------------------------------------
            PRODUCTS PANEL
            ? Only THIS div changes on category/page switch.
            Hero, Stats, Trust, Sidebar, FAQ, CTA = all static.
        -------------------------------------- */}
        <div>

          {/* -- Static: header row + search -- */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-[#0F172A]">{activeCatName}</h2>
              <p className="text-slate-500 text-sm mt-0.5 min-h-[20px]">
                {loading ? "Loading products..." : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} available`}
              </p>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm transition"
              />
            </div>
          </div>

          {/* -------------------------------------
              DYNAMIC ZONE ? only this box swaps
          ------------------------------------- */}
          <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>

            {/* Skeleton while loading */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-slate-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                      <div className="flex gap-2 pt-2">
                        <div className="h-9 bg-slate-200 rounded-xl flex-1" />
                        <div className="h-9 w-12 bg-slate-200 rounded-xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state — Coming Soon */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-16 px-4">
                {/* Professional broom-riding wizard animation */}
                <style>{`
                  @keyframes wizFlyIn {
                    0%   { transform: translateX(340px) translateY(-40px) rotate(12deg); opacity: 0; }
                    60%  { opacity: 1; }
                    75%  { transform: translateX(-16px) translateY(8px) rotate(-3deg); }
                    88%  { transform: translateX(8px) translateY(-4px) rotate(1.5deg); }
                    100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
                  }
                  @keyframes wizFloat {
                    0%, 100% { transform: translateY(0px)   rotate(0deg);   }
                    30%      { transform: translateY(-14px) rotate(-2deg);  }
                    60%      { transform: translateY(-8px)  rotate(1.5deg); }
                    85%      { transform: translateY(-16px) rotate(-1deg);  }
                  }
                  @keyframes waveArm {
                    0%, 100% { transform: rotate(0deg);  }
                    35%      { transform: rotate(-30deg);}
                    65%      { transform: rotate(12deg); }
                  }
                  @keyframes twinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg);  }
                    50%      { opacity: 1;    transform: scale(1.3) rotate(15deg); }
                  }
                  @keyframes trailPulse {
                    0%, 100% { opacity: 0.7; transform: scaleX(1);   }
                    50%      { opacity: 0.2; transform: scaleX(0.5); }
                  }
                  @keyframes dotPop {
                    0%, 100% { opacity: 0; transform: scale(0.3); }
                    50%      { opacity: 1; transform: scale(1.2);  }
                  }
                  .wiz-fly {
                    animation: wizFlyIn 1.6s cubic-bezier(0.34,1.56,0.64,1) forwards,
                               wizFloat 4.2s ease-in-out 1.6s infinite;
                  }
                  .wiz-arm {
                    transform-origin: 148px 104px;
                    animation: waveArm 2s ease-in-out 2s infinite;
                  }
                  .tw1 { animation: twinkle 2s ease-in-out 2s infinite; }
                  .tw2 { animation: twinkle 2.5s ease-in-out 2.6s infinite; }
                  .tw3 { animation: twinkle 1.8s ease-in-out 3s infinite; }
                  .tw4 { animation: twinkle 3s ease-in-out 1.8s infinite; }
                  .trl1 { transform-origin: 60px 50%; animation: trailPulse 1.8s ease-in-out 1.8s infinite; }
                  .trl2 { transform-origin: 60px 50%; animation: trailPulse 1.8s ease-in-out 2.1s infinite; }
                  .trl3 { transform-origin: 60px 50%; animation: trailPulse 1.8s ease-in-out 2.4s infinite; }
                  .dp1  { animation: dotPop 1.6s ease-in-out 2.2s infinite; }
                  .dp2  { animation: dotPop 2s   ease-in-out 2.8s infinite; }
                  .dp3  { animation: dotPop 1.4s ease-in-out 3.2s infinite; }
                `}</style>

                <div className="relative inline-block mb-6">
                  <div className="wiz-fly" style={{ opacity: 0, display: 'inline-block' }}>
                    <svg width="300" height="210" viewBox="0 0 300 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="wHandleG" x1="15" y1="160" x2="268" y2="88" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#6B3A1F"/>
                          <stop offset="55%" stopColor="#A0522D"/>
                          <stop offset="100%" stopColor="#CD853F"/>
                        </linearGradient>
                        <linearGradient id="wRobeG" x1="140" y1="90" x2="205" y2="148" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#3B82F6"/>
                          <stop offset="100%" stopColor="#003EA3"/>
                        </linearGradient>
                        <linearGradient id="wHatG" x1="140" y1="42" x2="198" y2="4" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#4C1D95"/>
                          <stop offset="100%" stopColor="#6366F1"/>
                        </linearGradient>
                        <radialGradient id="wGlow" cx="50%" cy="55%" r="48%">
                          <stop offset="0%" stopColor="#D3E8FF" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#D3E8FF" stopOpacity="0"/>
                        </radialGradient>
                        <filter id="wShadow">
                          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#003EA3" floodOpacity="0.18"/>
                        </filter>
                      </defs>

                      {/* Ambient glow */}
                      <ellipse cx="155" cy="120" rx="138" ry="88" fill="url(#wGlow)"/>

                      {/* Speed trail lines */}
                      <line className="trl1" x1="5"  y1="154" x2="62"  y2="148" stroke="#8AC8FF" strokeWidth="4"   strokeLinecap="round"/>
                      <line className="trl2" x1="5"  y1="164" x2="50"  y2="161" stroke="#8AC8FF" strokeWidth="3"   strokeLinecap="round"/>
                      <line className="trl3" x1="8"  y1="144" x2="55"  y2="140" stroke="#8AC8FF" strokeWidth="2.5" strokeLinecap="round"/>

                      {/* Sparkle dots in trail */}
                      <circle className="dp1" cx="74" cy="152" r="5"   fill="#FCD34D"/>
                      <circle className="dp2" cx="56" cy="164" r="3.5" fill="#8AC8FF"/>
                      <circle className="dp3" cx="38" cy="148" r="3"   fill="#C4B5FD"/>

                      {/* ── BROOM ── */}
                      {/* Bristle binding */}
                      <ellipse cx="56" cy="153" rx="13" ry="8" fill="#5C3A1E" transform="rotate(-20 56 153)"/>
                      {/* Bristles — clean fan */}
                      <path d="M 52 145 Q 26 124 12 108" stroke="#8B5513" strokeWidth="4"   strokeLinecap="round" fill="none"/>
                      <path d="M 54 150 Q 26 143 10 139" stroke="#8B5513" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M 55 155 Q 30 158 14 158" stroke="#8B5513" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M 56 158 Q 36 170 24 176" stroke="#8B5513" strokeWidth="3"   strokeLinecap="round" fill="none"/>
                      <path d="M 57 160 Q 42 178 35 186" stroke="#8B5513" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      {/* Handle */}
                      <line x1="62" y1="149" x2="268" y2="88" stroke="url(#wHandleG)" strokeWidth="9" strokeLinecap="round"/>
                      {/* Handle gloss */}
                      <line x1="65" y1="146" x2="263" y2="85" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.2"/>

                      {/* ── CHARACTER (sitting at ~60% of handle, x≈175, y≈106) ── */}

                      {/* Legs hanging below robe */}
                      <path d="M 162 132 Q 157 148 155 162" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" fill="none"/>
                      <ellipse cx="153" cy="165" rx="9" ry="5.5" fill="#111827" transform="rotate(-6 153 165)"/>
                      <path d="M 178 131 Q 182 148 184 162" stroke="#1E293B" strokeWidth="13" strokeLinecap="round" fill="none"/>
                      <ellipse cx="186" cy="165" rx="9.5" ry="5.5" fill="#111827" transform="rotate(6 186 165)"/>

                      {/* Robe / body — clean trapezoid */}
                      <path d="M 148,90 Q 202,90 202,112 Q 200,136 188,142 L 152,142 Q 140,136 140,112 Z" fill="url(#wRobeG)" filter="url(#wShadow)"/>
                      {/* Robe centre crease */}
                      <path d="M 171,90 Q 172,116 172,142" stroke="#0055E5" strokeWidth="1.5" fill="none" opacity="0.35"/>
                      {/* Robe hem */}
                      <path d="M 140 136 Q 171 144 202 136" stroke="#0044BB" strokeWidth="2" fill="none" opacity="0.5"/>

                      {/* Front sleeve/arm — gripping broom */}
                      <path d="M 200,108 Q 224,100 238,94" stroke="#0044BB" strokeWidth="15" strokeLinecap="round" fill="none"/>
                      <path d="M 200,108 Q 224,100 238,94" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" fill="none"/>
                      <circle cx="238" cy="94" r="9" fill="#FDDCB0"/>

                      {/* Back sleeve/arm — waving (animated) */}
                      <g className="wiz-arm">
                        <path d="M 148,104 Q 124,88 112,74" stroke="#0044BB" strokeWidth="14" strokeLinecap="round" fill="none"/>
                        <path d="M 148,104 Q 124,88 112,74" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" fill="none"/>
                        <circle cx="112" cy="74" r="8.5" fill="#FDDCB0"/>
                        {/* Sparkle rays from waving hand */}
                        <line x1="106" y1="65" x2="99"  y2="56" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="116" y1="63" x2="120" y2="53" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="102" y1="71" x2="92"  y2="70" stroke="#FCD34D" strokeWidth="2"   strokeLinecap="round"/>
                      </g>

                      {/* Neck */}
                      <rect x="163" y="74" width="16" height="18" rx="7" fill="#FDDCB0"/>

                      {/* Head */}
                      <circle cx="171" cy="60" r="27" fill="#FDDCB0" filter="url(#wShadow)"/>
                      {/* Rosy cheeks */}
                      <ellipse cx="154" cy="65" rx="8" ry="5" fill="#FBBF24" opacity="0.25"/>
                      <ellipse cx="188" cy="64" rx="8" ry="5" fill="#FBBF24" opacity="0.25"/>

                      {/* Eyes — facing right (direction of flight) */}
                      <circle cx="180" cy="58" r="5"   fill="#1E293B"/>
                      <circle cx="164" cy="59" r="4.5" fill="#1E293B"/>
                      {/* Eye gloss */}
                      <circle cx="181.8" cy="56.5" r="1.7" fill="white"/>
                      <circle cx="165.6" cy="57.5" r="1.5" fill="white"/>
                      {/* Eyebrows */}
                      <path d="M 160,53 Q 164,50 168,52" stroke="#1A1245" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                      <path d="M 176,52 Q 180,49 184,51" stroke="#1A1245" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                      {/* Smile */}
                      <path d="M 163,68 Q 171,76 181,68" stroke="#9A3412" strokeWidth="2.4" fill="none" strokeLinecap="round"/>

                      {/* ── WIZARD HAT ── */}
                      {/* Brim */}
                      <ellipse cx="171" cy="37" rx="36" ry="10" fill="#1A1245"/>
                      <ellipse cx="171" cy="35" rx="28" ry="6"  fill="#3B1FA8" opacity="0.55"/>
                      {/* Cone */}
                      <path d="M 136,38 L 169,2 L 206,38 Z" fill="url(#wHatG)"/>
                      {/* Hat band */}
                      <rect x="136" y="32" width="70" height="10" rx="4" fill="#1A1245"/>
                      {/* Band star */}
                      <text x="171" y="42" fontSize="12" fill="#FCD34D" textAnchor="middle">★</text>
                      {/* Hat shine */}
                      <path d="M 149,8 Q 154,20 152,35" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>

                      {/* ── BACKGROUND STARS ── */}
                      <text className="tw1" x="258" y="50"  fontSize="24" fill="#FCD34D" textAnchor="middle" style={{display:'inline-block'}}>★</text>
                      <text className="tw2" x="278" y="90"  fontSize="14" fill="#FCD34D" textAnchor="middle" style={{display:'inline-block'}}>★</text>
                      <text className="tw3" x="82"  y="32"  fontSize="16" fill="#C4B5FD" textAnchor="middle" style={{display:'inline-block'}}>✦</text>
                      <text className="tw4" x="256" y="130" fontSize="13" fill="#8AC8FF" textAnchor="middle" style={{display:'inline-block'}}>✦</text>
                      <text className="tw1" x="96"  y="178" fontSize="10" fill="#FCD34D" textAnchor="middle" style={{display:'inline-block'}}>✦</text>
                    </svg>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-3">
                  We are{" "}
                  <span className="text-[#0055E5]">Coming Soon</span>{" "}
                  with Our Products
                </h2>

                {/* SEO paragraphs */}
                <div className="max-w-xl mx-auto text-left space-y-3 mb-8">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    <strong className="text-[#0F172A]">ProStation Systems</strong> is actively expanding its lineup of{" "}
                    <strong className="text-[#0F172A]">custom-built GPU workstations, AI servers, and enterprise computing systems</strong>.
                    Our team is curating the finest hardware configurations tailored for{" "}
                    <strong className="text-[#0F172A]">AI/ML, video editing, deep learning, and data-center workloads</strong> — all assembled and quality-tested right here in India.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Every <strong className="text-[#0F172A]">ProStation system</strong> is sourced globally from Dubai, the US, and China,
                    then assembled with a{" "}
                    <strong className="text-[#0F172A]">72-point quality certification</strong> at our New Delhi facility.
                    Whether you need a{" "}
                    <strong className="text-[#0F172A]">multi-GPU workstation for deep learning</strong>, a rack-mount server for your data centre,
                    or a fully customized AI inference machine — we build it to your exact specifications with a{" "}
                    <strong className="text-[#0F172A]">3-year warranty</strong>.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Can't wait? Our experts are available right now to help you configure the{" "}
                    <strong className="text-[#0F172A]">perfect system for your budget and workload</strong>.
                    Reach out via WhatsApp or email and get a personalised quote within hours.
                  </p>
                </div>

                {/* CTA Links */}
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
                  >
                    ← Go back to Homepage
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25"
                  >
                    Get a Custom Quote <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}

            {/* Product grid ? 6 per page, pagination below */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {paginatedProducts.map(product => {
                  const mainBadge   = getMainBadge(product.id);
                  const statusBadge = getStatusBadge(product.id);
                  const MainIcon    = mainBadge.icon;
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-[#0055E5]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={product.image ? `${API_BASE}/${product.image}` : "https://placehold.co/500x300/e2e8f0/94a3b8?text=No+Image"}
                          alt={product.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Status ? top left */}
                        <div className={`absolute top-3 left-3 ${statusBadge.bg} text-white text-[10px] font-black px-2.5 py-1 rounded-full`}>
                          {statusBadge.label}
                        </div>
                        {/* Main ? top right */}
                        <div className={`absolute top-3 right-3 ${mainBadge.bg} text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1`}>
                          <MainIcon size={9} /> {mainBadge.label}
                        </div>
                        {/* Certified ? bottom overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2">
                          <div className="flex items-center gap-1 text-white text-[10px] font-bold">
                            <BadgeCheck size={10} className="text-blue-300" /> Serverwale Certified Refurbished
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-4 md:p-5">
                        <h3 className="font-black text-[#0F172A] text-base leading-snug mb-2 group-hover:text-[#0055E5] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                          {product.description}
                        </p>

                        {/* Feature chips */}
                        {product.features?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {product.features.slice(0, 3).map((f, i) => (
                              <span key={i} className="text-[10px] font-semibold bg-blue-50 text-[#0055E5] border border-blue-100 px-2 py-0.5 rounded-full">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                          <span className="text-xs text-slate-400 ml-1">Certified Quality</span>
                        </div>

                        {/* CTAs */}
                        <div className="flex gap-2 mt-auto">
                          <Link
                            to={`/products/${product.id}`}
                            className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white py-2.5 rounded-xl text-sm font-bold flex justify-center items-center gap-1.5 transition-all"
                          >
                            View Details <ArrowRight size={14} />
                          </Link>
                          <a
                            href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hi, I'm interested in: ${product.title}`)}`}
                            target="_blank" rel="noreferrer"
                            title="WhatsApp about this product"
                            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-3.5 rounded-xl text-sm font-bold transition-all"
                          >
                            <FaWhatsapp size={17} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination ? 6 per page */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => { setPage(p => p - 1); setFade(true); setTimeout(() => setFade(false), 200); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-semibold text-sm transition"
                >
                  ? Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); setFade(true); setTimeout(() => setFade(false), 200); }}
                    className={`w-9 h-9 rounded-xl font-bold text-sm transition ${page === i + 1 ? "bg-[#0F172A] text-white" : "bg-slate-100 hover:bg-slate-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => { setPage(p => p + 1); setFade(true); setTimeout(() => setFade(false), 200); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-semibold text-sm transition"
                >
                  Next ?
                </button>
              </div>
            )}
          </div>
          {/* --- END DYNAMIC ZONE --- */}

        </div>
      </section>

      {/* -- FAQ ? STATIC, always visible -- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="border-t border-slate-100 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#0F172A]">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <div key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${openFaq === i ? "border-blue-400 shadow-md shadow-blue-100 md:col-span-2" : "border-slate-200 hover:border-[#0055E5]/30"}`}
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full px-5 py-4 flex justify-between items-center text-left font-bold text-sm gap-3 transition-colors ${openFaq === i ? "bg-[#0F172A] text-white" : "bg-white text-slate-800 hover:bg-[#EDF4FF]"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${openFaq === i ? "bg-[#0055E5] text-white" : "bg-blue-100 text-[#0055E5]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                  {openFaq === i ? <ChevronUp size={18} className="shrink-0 text-blue-300" /> : <ChevronDown size={18} className="shrink-0 text-slate-400" />}
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
      </section>

      {/* -- BOTTOM CTA ? STATIC -- */}
      <section className="bg-[#1a3a6b] py-10 md:py-16 border-t border-blue-700/40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Headphones size={12} /> EXPERT ASSISTANCE — SAME-DAY RESPONSE
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
            Can't Find What You're Looking For?<br className="hidden md:block" />
            <span className="text-[#5BAEFF]"> We'll Build It for You.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
            From single workstations to full data center builds — Serverwale configures, tests, and delivers custom IT hardware across India. <strong className="text-slate-300">Get a quote in under 2 hours.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg">
              <FaWhatsapp size={18} /> WhatsApp for Custom Quote
            </a>
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all">
              <Mail size={16} /> Send Enquiry
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: ShieldCheck, text: "1-Year Warranty on All Products" },
              { icon: Truck,       text: "Pan-India Delivery"             },
              { icon: BadgeCheck,  text: "40-Point Quality Check"         },
              { icon: Award,       text: "500+ Happy Enterprises"         },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <b.icon size={14} className="text-blue-400" /> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default ProductsPage;
