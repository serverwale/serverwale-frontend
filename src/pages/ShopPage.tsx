import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search, Star, ShieldCheck, ArrowRight,
  Package, Zap, X, ChevronRight, LayoutGrid, ChevronDown,
  ChevronLeft, ChevronsLeft, ChevronsRight, ChevronUp,
  Server, HardDrive, Monitor, Cpu, Wifi, Cloud,
  Wrench, Laptop, Boxes
} from "lucide-react";
import useSEO from "../hooks/useSEO";

const API = "";
const ITEMS_PER_PAGE = 12;
const SHOP_STATE_KEY = "shop_scroll_state";

const FALLBACK_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Crect fill='%23cbd5e1' x='140' y='80' width='120' height='90' rx='8'/%3E%3Crect fill='%23cbd5e1' x='145' y='185' width='110' height='8' rx='4'/%3E%3Crect fill='%23cbd5e1' x='165' y='200' width='70' height='8' rx='4'/%3E%3C/svg%3E`;

function getImgUrl(raw: string | null): string {
  if (!raw) return FALLBACK_IMG;
  const first = raw.split(",")[0].trim();
  if (!first) return FALLBACK_IMG;
  if (first.startsWith("http")) return first;
  return `${API}/${first}`;
}

function getDisplayRating(id: number, rating: number): number {
  if (rating && rating > 0) return Math.min(5, rating);
  const h = ((id * 2654435761) >>> 0) % 15;
  return parseFloat((3.5 + h * 0.1).toFixed(1));
}

// Parse "Main > Sub" format
function parseCategory(cat: string): { main: string; sub: string | null } {
  if (!cat) return { main: "Other", sub: null };
  const idx = cat.indexOf(" > ");
  if (idx === -1) return { main: cat, sub: null };
  return { main: cat.substring(0, idx), sub: cat.substring(idx + 3) };
}

interface ShopProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: string;
  original_price: string;
  discount_percent: number;
  category: string;
  tags: string[];
  features: string[];
  warranty: string;
  stock_status: "in_stock" | "out_of_stock" | "on_request" | "customizable";
  image: string | null;
  is_featured: number;
  badge: string | null;
  rating: number;
  review_count: number;
}

interface ShopCategory { id: number; name: string; product_count: number; }

const STOCK_LABELS: Record<string, { label: string; color: string }> = {
  in_stock:     { label: "In Stock",     color: "bg-green-100 text-green-700" },
  out_of_stock: { label: "Out of Stock", color: "bg-red-100 text-red-700" },
  on_request:   { label: "On Request",   color: "bg-amber-100 text-amber-700" },
  customizable: { label: "Customizable", color: "bg-slate-100 text-slate-600" },
};

const BADGE_CONFIG: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  best_seller:   { label: "Best Seller",   bg: "bg-orange-500",  text: "text-white", icon: "⭐" },
  new:           { label: "New Arrival",   bg: "bg-[#0055E5]",   text: "text-white", icon: "✨" },
  limited_offer: { label: "Limited Offer", bg: "bg-red-600",     text: "text-white", icon: "🔥" },
  customizable:  { label: "Custom Build",  bg: "bg-slate-700",   text: "text-white", icon: "⚙" },
  featured:      { label: "Featured",      bg: "bg-[#0F172A]",   text: "text-[#5BAEFF]", icon: "⚡" },
  hot_deal:      { label: "Hot Deal",      bg: "bg-rose-600",    text: "text-white", icon: "🔥" },
};

// Main category icons
const CAT_ICONS: Record<string, React.ReactNode> = {
  "Servers":        <Server size={14} />,
  "Workstations":   <Monitor size={14} />,
  "Laptops":        <Laptop size={14} />,
  "Desktops":       <Monitor size={14} />,
  "Storage":        <HardDrive size={14} />,
  "Networking":     <Wifi size={14} />,
  "Components":     <Cpu size={14} />,
  "Rentals":        <Boxes size={14} />,
  "Cloud & VPS":    <Cloud size={14} />,
  "AMC & Services": <Wrench size={14} />,
};

/* --- STAR RATING --- */
const Stars = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size}
        className={i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
    ))}
  </div>
);

/* --- QUOTE MODAL --- */
const QuoteModal = ({ product, onClose }: { product: ShopProduct; onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: `I'm interested in ${product.name}` });
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API}/api/pricing-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: form.name, phone: form.phone, email: form.email, service: product.name }),
      });
      setSent(true);
    } catch { setSent(true); }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={20} /></button>
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Pricing Request Sent!</h3>
            <p className="text-slate-500 text-sm">Our team will contact you with pricing within 2 hours.</p>
            <button onClick={onClose} className="mt-5 bg-[#0F172A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0044BB] transition">Close</button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">Request Pricing</h3>
            <p className="text-slate-500 text-sm mb-5 line-clamp-1">{product.name}</p>
            <form onSubmit={submit} className="space-y-3">
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none resize-none" />
              <button type="submit" className="w-full bg-[#0F172A] hover:bg-[#0044BB] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300">Send Quote Request</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

/* --- PRODUCT CARD --- */
const ProductCard = ({ p, onQuote, onSave }: { p: ShopProduct; onQuote: (p: ShopProduct) => void; onSave: () => void }) => {
  const stock = STOCK_LABELS[p.stock_status] ?? STOCK_LABELS.on_request;
  const img = getImgUrl(p.image);
  const { sub, main } = parseCategory(p.category);
  const displayCat = sub || main;
  const rating = getDisplayRating(p.id, p.rating);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col group">
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
        <img
          src={img}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
        {p.discount_percent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
            -{p.discount_percent}% OFF
          </div>
        )}
        {p.badge && BADGE_CONFIG[p.badge] && (
          <div className={`absolute top-2 right-2 ${BADGE_CONFIG[p.badge].bg} ${BADGE_CONFIG[p.badge].text} text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md`}>
            <span className="text-[8px]">{BADGE_CONFIG[p.badge].icon}</span>
            <span>{BADGE_CONFIG[p.badge].label}</span>
          </div>
        )}
        <div className={`absolute bottom-2 left-2 text-[9px] font-semibold px-2 py-0.5 rounded-md ${stock.color}`}>
          {stock.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#0055E5] mb-1">
          {displayCat}
        </span>
        <h3 className="font-bold text-[#0F172A] text-xs sm:text-sm leading-snug mb-2 line-clamp-2 flex-1">
          {p.name}
        </h3>
        <p className="hidden sm:block text-slate-500 text-xs leading-relaxed mb-2 line-clamp-2">
          {p.short_description}
        </p>

        {/* Tags */}
        {Array.isArray(p.tags) && p.tags.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1 mb-2">
            {p.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="bg-blue-50 text-[#0055E5] text-[10px] font-medium px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <Stars rating={rating} size={10} />
          <span className="text-[9px] sm:text-xs text-slate-500">
            {p.review_count > 0 ? `(${p.review_count} reviews)` : `(${rating})`}
          </span>
        </div>

        {/* Price — hidden, request pricing flow instead */}

        {/* Warranty */}
        {p.warranty && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mb-3">
            <ShieldCheck size={12} className="text-green-500 shrink-0" />
            <span>{p.warranty}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/shop/now/${p.id}`}
            onClick={onSave}
            className="flex-1 bg-[#0F172A] hover:bg-[#0044BB] text-white text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-1"
          >
            View Details <ArrowRight size={10} className="hidden xs:inline" />
          </Link>
          <button
            onClick={() => onQuote(p)}
            className="flex-1 border border-[#0055E5] text-[#0055E5] hover:bg-[#0044BB] hover:text-white text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 rounded-xl transition-all duration-300"
          >
            Request Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- PAGINATION --- */
const Pagination = ({ currentPage, totalPages, onPage }: { currentPage: number; totalPages: number; onPage: (p: number) => void }) => {
  if (totalPages <= 1) return null;
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }
  return (
    <div className="flex items-center justify-center gap-1 mt-8 py-4">
      <button disabled={currentPage === 1} onClick={() => onPage(1)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0055E5] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronsLeft size={14} /></button>
      <button disabled={currentPage === 1} onClick={() => onPage(currentPage - 1)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0055E5] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronLeft size={14} /></button>
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`e-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">...</span>
        ) : (
          <button key={`p-${p}`} onClick={() => onPage(p as number)}
            className={`w-8 h-8 rounded-xl text-xs font-semibold transition ${p === currentPage ? "bg-[#0F172A] text-white shadow" : "text-slate-600 hover:bg-blue-50 hover:text-[#0055E5]"}`}>
            {p}
          </button>
        )
      )}
      <button disabled={currentPage === totalPages} onClick={() => onPage(currentPage + 1)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0055E5] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronRight size={14} /></button>
      <button disabled={currentPage === totalPages} onClick={() => onPage(totalPages)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0055E5] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition"><ChevronsRight size={14} /></button>
    </div>
  );
};

/* --- HIERARCHICAL SIDEBAR --- */
interface HierarchyItem {
  main: string;
  mainCount: number;
  subs: { name: string; count: number }[];
}

function buildHierarchy(categories: ShopCategory[], products: ShopProduct[]): HierarchyItem[] {
  // Build from categories list
  const mainMap: Record<string, { count: number; subs: { name: string; count: number }[] }> = {};

  for (const cat of categories) {
    const { main, sub } = parseCategory(cat.name);
    if (!sub) {
      // This is a main category entry
      if (!mainMap[main]) mainMap[main] = { count: 0, subs: [] };
      mainMap[main].count = cat.product_count;
    } else {
      if (!mainMap[main]) mainMap[main] = { count: 0, subs: [] };
      mainMap[main].subs.push({ name: sub, count: cat.product_count });
    }
  }

  // Sort main categories by logical order
  const ORDER = ["Servers", "Workstations", "Laptops", "Desktops", "Storage", "Networking", "Components", "Rentals", "Cloud & VPS", "AMC & Services"];
  return ORDER
    .filter(m => mainMap[m])
    .map(m => {
      const subsTotal = mainMap[m].subs.reduce((s, sub) => s + sub.count, 0);
      return {
        main: m,
        mainCount: mainMap[m].count > 0 ? mainMap[m].count : subsTotal,
        subs: mainMap[m].subs.sort((a, b) => b.count - a.count),
      };
    })
    .concat(
      Object.keys(mainMap)
        .filter(m => !ORDER.includes(m))
        .map(m => {
          const subsTotal = mainMap[m].subs.reduce((s, sub) => s + sub.count, 0);
          return { main: m, mainCount: mainMap[m].count > 0 ? mainMap[m].count : subsTotal, subs: mainMap[m].subs };
        })
    );
}

const DesktopSidebar = ({ categories, products, total, activeCategory, onSelect }: {
  categories: ShopCategory[]; products: ShopProduct[];
  total: number; activeCategory: string; onSelect: (c: string) => void;
}) => {
  const hierarchy = useMemo(() => buildHierarchy(categories, products), [categories, products]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Auto-expand the active category's parent
    const init: Record<string, boolean> = {};
    if (activeCategory !== "All") {
      const { main } = parseCategory(activeCategory);
      init[main] = true;
    }
    return init;
  });

  const toggleMain = (main: string) => setExpanded(p => ({ ...p, [main]: !p[main] }));

  const isActive = (cat: string) => activeCategory === cat;
  const isParentActive = (main: string) => activeCategory === main || activeCategory.startsWith(main + " > ");

  return (
    <aside className="hidden lg:block w-60 xl:w-64 shrink-0 self-start sticky top-32">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-50 flex items-center gap-2">
          <LayoutGrid size={15} className="text-[#0055E5]" />
          <span className="font-bold text-[#0F172A] text-sm">Categories</span>
        </div>
        <nav className="p-2 overflow-y-auto max-h-[calc(100vh-14rem)]" style={{ scrollbarWidth: "thin" }}>
          {/* All Products */}
          <button
            onClick={() => onSelect("All")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${
              activeCategory === "All" ? "bg-[#0F172A] text-white font-semibold" : "text-slate-600 hover:bg-blue-50 hover:text-[#0055E5] font-medium"
            }`}
          >
            <span className="flex items-center gap-2"><LayoutGrid size={13} />All Products</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{total}</span>
          </button>

          {/* Hierarchical categories */}
          {hierarchy.map(({ main, mainCount, subs }) => (
            <div key={main} className="mb-0.5">
              {/* Main category row */}
              <div className="flex items-center">
                <button
                  onClick={() => onSelect(main)}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left ${
                    isParentActive(main) && !activeCategory.includes(" > ")
                      ? "bg-[#0F172A] text-white font-semibold"
                      : "text-slate-700 hover:bg-blue-50 hover:text-[#0055E5] font-semibold"
                  }`}
                >
                  <span className="shrink-0">{CAT_ICONS[main] ?? <Server size={14} />}</span>
                  <span className="flex-1 truncate">{main}</span>
                  <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isParentActive(main) && !activeCategory.includes(" > ") ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {mainCount}
                  </span>
                </button>
                {subs.length > 0 && (
                  <button
                    onClick={() => toggleMain(main)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0055E5] hover:bg-blue-50 transition ml-0.5 shrink-0"
                  >
                    {expanded[main] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {expanded[main] && subs.length > 0 && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-2">
                  {subs.map(sub => (
                    <button
                      key={sub.name}
                      onClick={() => onSelect(`${main} > ${sub.name}`)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left ${
                        isActive(`${main} > ${sub.name}`)
                          ? "bg-[#0055E5] text-white font-semibold"
                          : "text-slate-500 hover:bg-blue-50 hover:text-[#0055E5] font-medium"
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <span className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${isActive(`${main} > ${sub.name}`) ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {sub.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

/* --- MOBILE CATEGORY DROPDOWN --- */
const MobileCategoryDropdown = ({ categories, products, total, activeCategory, onSelect }: {
  categories: ShopCategory[]; products: ShopProduct[];
  total: number; activeCategory: string; onSelect: (c: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const hierarchy = useMemo(() => buildHierarchy(categories, products), [categories, products]);

  const displayName = activeCategory === "All" ? "All Products" :
    activeCategory.includes(" > ") ? activeCategory.split(" > ")[1] : activeCategory;

  return (
    <div className="relative lg:hidden mb-4 z-20">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between bg-white border-2 border-slate-200 hover:border-[#0055E5] rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition-colors shadow-sm"
      >
        <span className="flex items-center gap-2.5">
          <LayoutGrid size={16} className="text-[#0055E5]" />
          <span className="text-[#0F172A]">{displayName}</span>
        </span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
          <button onClick={() => { onSelect("All"); setOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm border-b border-slate-50 transition ${activeCategory === "All" ? "bg-[#0F172A] text-white" : "text-slate-700 hover:bg-blue-50"}`}>
            <span className="font-semibold">All Products</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === "All" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{total}</span>
          </button>

          {hierarchy.map(({ main, mainCount, subs }) => (
            <div key={main}>
              <button onClick={() => { onSelect(main); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold border-b border-slate-50 transition ${activeCategory === main ? "bg-[#0F172A] text-white" : "text-slate-800 hover:bg-blue-50"}`}>
                <span className="flex items-center gap-2">{CAT_ICONS[main]}{main}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === main ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{mainCount}</span>
              </button>
              {subs.map(sub => (
                <button key={sub.name} onClick={() => { onSelect(`${main} > ${sub.name}`); setOpen(false); }}
                  className={`w-full flex items-center justify-between pl-8 pr-4 py-2 text-xs border-b border-slate-50 transition ${activeCategory === `${main} > ${sub.name}` ? "bg-[#0055E5] text-white font-semibold" : "text-slate-500 hover:bg-blue-50 hover:text-[#0055E5]"}`}>
                  <span>↳ {sub.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === `${main} > ${sub.name}` ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>{sub.count}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="aspect-[4/3] bg-slate-200" />
    <div className="p-4 space-y-2">
      <div className="h-2 bg-slate-200 rounded w-1/3" />
      <div className="h-3 bg-slate-200 rounded w-4/5" />
      <div className="h-3 bg-slate-200 rounded w-3/5" />
      <div className="h-5 bg-slate-200 rounded w-2/5 mt-2" />
      <div className="flex gap-2 mt-3">
        <div className="h-8 bg-slate-200 rounded-xl flex-1" />
        <div className="h-8 bg-slate-200 rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

/* ===================== MAIN COMPONENT ===================== */
const ShopPage: React.FC = () => {
  // Restore state saved before navigating to product detail
  const [savedState] = useState<{ category: string; search: string; page: number; scrollY: number } | null>(() => {
    try {
      const raw = sessionStorage.getItem(SHOP_STATE_KEY);
      if (!raw) return null;
      sessionStorage.removeItem(SHOP_STATE_KEY);
      return JSON.parse(raw);
    } catch { return null; }
  });

  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(savedState?.category ?? "All");
  const [search, setSearch] = useState(savedState?.search ?? "");
  const [quoteProduct, setQuoteProduct] = useState<ShopProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(savedState?.page ?? 1);
  const [fetchError, setFetchError] = useState(false);
  const pendingScrollRef = React.useRef<number | null>(savedState?.scrollY ?? null);

  useSEO({
    title: "Buy Refurbished Servers, Workstations, Storage & Networking | Serverwale Shop",
    description: "Shop certified refurbished servers (Dell, HP, Lenovo, IBM), GPU workstations, laptops, networking gear and enterprise storage at best price in India. Warranted & pan-India delivery.",
    keywords: "buy refurbished servers India, HP ProLiant server price, Dell PowerEdge India, enterprise storage India, GPU workstation India, refurbished laptop India, server rental India",
    canonical: "https://serverwale.com/shop/now",
  });

  const loadData = useCallback(() => {
    setLoading(true);
    setFetchError(false);
    Promise.all([
      fetch(`${API}/api/shop-products`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`${API}/api/shop-categories`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
      .then(([prods, cats]) => {
        setProducts(Array.isArray(prods) && prods.length > 0 ? prods : []);
        setCategories(Array.isArray(cats) && cats.length > 0 ? cats : []);
        setLoading(false);
      })
      .catch(() => { setLoading(false); setFetchError(true); });
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  /* URL category param */
  const [searchParams] = useSearchParams();
  const CATEGORY_MAP: Record<string, string> = {
    "servers": "Servers", "workstations": "Workstations", "gpu-workstations": "Workstations",
    "rendering-pcs": "Workstations > Rendering Workstations", "networking": "Networking",
    "storage": "Storage", "cloud-vps": "Cloud & VPS", "laptops": "Laptops", "desktops": "Desktops",
    "rentals": "Rentals", "components": "Components", "amc": "AMC & Services",
  };
  useEffect(() => {
    const param = searchParams.get("category");
    if (!param) return;
    const mapped = CATEGORY_MAP[param.toLowerCase()];
    if (mapped) setActiveCategory(mapped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setSearch("");
    setCurrentPage(1);
  };

  /* Filtered products — support hierarchical matching */
  const filtered = useMemo(() => {
    return products.filter(p => {
      const pCat = (p.category ?? "").toLowerCase();
      let matchCat = false;
      if (activeCategory === "All") {
        matchCat = true;
      } else {
        const selLower = activeCategory.toLowerCase();
        // Exact match OR product category starts with "main > "
        matchCat = pCat === selLower || pCat.startsWith(selLower + " > ");
      }
      const q = search.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        (p.short_description ?? "").toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q) ||
        (Array.isArray(p.tags) ? p.tags.some((t: string) => t.toLowerCase().includes(q)) : false);
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  /* Scroll restoration after data loads */
  useEffect(() => {
    if (!loading && pendingScrollRef.current !== null) {
      const y = pendingScrollRef.current;
      pendingScrollRef.current = null;
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    }
  }, [loading]);

  /* Save state before navigating to product detail */
  const saveShopState = useCallback(() => {
    sessionStorage.setItem(SHOP_STATE_KEY, JSON.stringify({
      category: activeCategory,
      search,
      page: currentPage,
      scrollY: window.scrollY,
    }));
  }, [activeCategory, search, currentPage]);

  /* Reset page on filter change — skip on initial mount (restored state) */
  const prevFilter = React.useRef({ activeCategory: savedState?.category ?? "All", search: savedState?.search ?? "" });
  useEffect(() => {
    if (prevFilter.current.activeCategory !== activeCategory || prevFilter.current.search !== search) {
      setCurrentPage(1);
      prevFilter.current = { activeCategory, search };
    }
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const featured = useMemo(() => products.filter(p => p.is_featured === 1).slice(0, 10), [products]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden text-white min-h-[320px] md:min-h-[420px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.14),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Shop Now</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full mb-4 w-fit">
            <Zap size={12} /> CERTIFIED REFURBISHED · TESTED · WARRANTED · READY TO SHIP
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            India's Largest{" "}
            <span className="text-[#5BAEFF]">Refurbished IT</span>{" "}
            Hardware Store
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-6 border-l-2 border-blue-500 pl-4 font-medium">
            Servers, Workstations, Storage, Networking & More —{" "}
            <strong className="text-white">1,000+ products</strong> certified, tested &amp; dispatched pan-India.
          </p>
          <div className="flex flex-wrap gap-5 sm:gap-8">
            {[
              { v: "1000+", l: "Products" },
              { v: "60-80%", l: "Below MRP" },
              { v: "1 Year", l: "Warranty" },
              { v: "Pan-India", l: "Delivery" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="text-lg sm:text-2xl font-black text-[#0055E5]">{v}</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STRIP */}
      {featured.length > 0 && (
        <section className="bg-white border-b border-slate-100 py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-[#0055E5] uppercase tracking-widest whitespace-nowrap flex items-center gap-1">
              <Zap size={12} /> Featured
            </span>
            {featured.map(p => (
              <Link key={p.id} to={`/shop/now/${p.id}`}
                className="flex items-center gap-1.5 shrink-0 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-[#0055E5] px-3 py-1.5 rounded-xl text-xs text-slate-700 hover:text-[#0055E5] transition-all">
                <Package size={12} className="text-[#0055E5]" />
                <span className="max-w-[140px] sm:max-w-none truncate">{p.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SEARCH BAR */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search servers, workstations, storage, networking..."
              className="w-full pl-8 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none bg-slate-50"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X size={13} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500 whitespace-nowrap">
              <span className="font-bold text-[#0F172A]">{filtered.length}</span> products
            </span>
            {totalPages > 1 && (
              <span className="hidden sm:inline text-xs font-semibold text-[#0055E5] bg-blue-50 px-2.5 py-1 rounded-lg whitespace-nowrap">
                Page {currentPage}/{totalPages}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR + GRID */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8 items-start">

          <DesktopSidebar
            categories={categories.filter(c => c.product_count > 0)}
            products={products}
            total={products.length}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />

          <div className="flex-1 min-w-0">
            <MobileCategoryDropdown
              categories={categories.filter(c => c.product_count > 0)}
              products={products}
              total={products.length}
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />

            {/* Active filter breadcrumb */}
            {activeCategory !== "All" && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs text-slate-500">Showing:</span>
                {activeCategory.includes(" > ") ? (
                  <>
                    <button onClick={() => handleCategorySelect(activeCategory.split(" > ")[0])}
                      className="text-xs font-semibold text-[#0055E5] hover:underline">
                      {activeCategory.split(" > ")[0]}
                    </button>
                    <ChevronRight size={12} className="text-slate-400" />
                    <span className="text-xs font-bold text-[#0F172A]">{activeCategory.split(" > ")[1]}</span>
                  </>
                ) : (
                  <span className="text-xs font-bold text-[#0F172A]">{activeCategory}</span>
                )}
                <button onClick={() => handleCategorySelect("All")} className="text-xs text-slate-400 hover:text-red-500 ml-1">
                  <X size={12} />
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : fetchError ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="text-4xl mb-3">🚨</div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">Could not load products</h3>
                <p className="text-slate-400 text-sm mb-4">Backend server se connection nahi mila.</p>
                <button onClick={loadData} className="bg-[#0F172A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0044BB] transition">Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <Package size={40} className="text-slate-200 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700 mb-1">No products found</h3>
                <p className="text-slate-400 text-sm">Try a different category or search term.</p>
                <button onClick={() => { setActiveCategory("All"); setSearch(""); }} className="mt-4 text-[#0055E5] text-sm hover:underline">Clear filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                  {paginated.map(p => (
                    <ProductCard key={p.id} p={p} onQuote={prod => setQuoteProduct(prod)} onSave={saveShopState} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPage={p => setCurrentPage(p)} />
                {totalPages > 1 && (
                  <p className="text-center text-xs text-slate-400 mt-2">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} products
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-[#0F172A] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-black mb-2">Why Buy from Serverwale?</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">India's most trusted IT hardware partner since 2010. Every product certified, tested & warranted.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[
              { icon: "✅", title: "72-Point Certified", desc: "Every product tested" },
              { icon: "🚚", title: "Pan-India Delivery", desc: "Same-day Delhi NCR" },
              { icon: "🛡️", title: "1 Year Warranty", desc: "Parts + Labour" },
              { icon: "💬", title: "Expert Support", desc: "WhatsApp & on-site" },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-2xl sm:text-3xl mb-1.5">{item.icon}</div>
                <div className="font-bold text-xs sm:text-sm mb-0.5">{item.title}</div>
                <div className="text-[10px] sm:text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/918595242521?text=Hi%20Serverwale%2C%20I%20want%20to%20know%20more%20about%20your%20products"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z" />
            </svg>
            Chat with Our Experts on WhatsApp
          </a>
        </div>
      </section>

      {quoteProduct && <QuoteModal product={quoteProduct} onClose={() => setQuoteProduct(null)} />}
    </div>
  );
};

export default ShopPage;
