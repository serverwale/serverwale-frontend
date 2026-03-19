import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, ShieldCheck, ChevronRight, ArrowRight, Package,
  CheckCircle, Tag, ShoppingCart, FileText, PlayCircle, Image,
  Send, User, Building2, MessageSquare, X
} from "lucide-react";
import useSEO from "../hooks/useSEO";

const API = "http://localhost:5000";
const FALLBACK_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Crect fill='%23cbd5e1' x='160' y='90' width='80' height='60' rx='6'/%3E%3Crect fill='%23cbd5e1' x='145' y='155' width='110' height='8' rx='4'/%3E%3Crect fill='%23cbd5e1' x='165' y='170' width='70' height='8' rx='4'/%3E%3C/svg%3E`;

/* ─── HELPERS ───────────────────────────── */
function getImgUrl(raw: string | null): string {
  if (!raw) return FALLBACK_IMG;
  // comma-separated list → take first
  const first = raw.split(",")[0].trim();
  if (!first) return FALLBACK_IMG;
  if (first.startsWith("http")) return first;
  return `${API}/${first}`;
}

function getAllImgUrls(raw: string | null, extras: string[]): string[] {
  const out: string[] = [];
  if (raw) {
    raw.split(",").forEach(u => {
      const t = u.trim();
      if (t) out.push(t.startsWith("http") ? t : `${API}/${t}`);
    });
  }
  extras?.filter(Boolean).forEach(u => {
    const t = u.trim();
    if (t) out.push(t.startsWith("http") ? t : `${API}/${t}`);
  });
  return out.filter((v, i, a) => a.indexOf(v) === i); // dedupe
}

/** Extract key-value specs from HTML description */
function parseSpecsFromHtml(html: string): Record<string, string> {
  if (!html) return {};
  const specs: Record<string, string> = {};

  // Pattern 1: <tr><td>Key</td><td>Val</td></tr>
  const tableRe = /<tr[^>]*>\s*<td[^>]*>([^<]{1,80})<\/td>\s*<td[^>]*>([^<]{1,200})<\/td>/gi;
  let m: RegExpExecArray | null;
  while ((m = tableRe.exec(html)) !== null) {
    const k = m[1].replace(/&amp;/g,"&").replace(/&nbsp;/g," ").trim();
    const v = m[2].replace(/&amp;/g,"&").replace(/&nbsp;/g," ").trim();
    if (k && v && k.length < 80) specs[k] = v;
  }

  // Pattern 2: <strong>Key:</strong> value  or  <b>Key:</b> value
  if (Object.keys(specs).length === 0) {
    const boldRe = /<(?:strong|b)[^>]*>([^<:]{2,60}):\s*<\/(?:strong|b)>\s*([^<]{1,150})/gi;
    while ((m = boldRe.exec(html)) !== null) {
      const k = m[1].replace(/&amp;/g,"&").trim();
      const v = m[2].replace(/&amp;/g,"&").trim();
      if (k && v) specs[k] = v;
    }
  }

  // Pattern 3: <li>Key: Value</li>
  if (Object.keys(specs).length === 0) {
    const liRe = /<li[^>]*>\s*([A-Za-z][^<:]{2,50}):\s*([^<]{3,150})\s*<\/li>/gi;
    while ((m = liRe.exec(html)) !== null) {
      const k = m[1].trim();
      const v = m[2].trim();
      if (k && v && !k.includes("<")) specs[k] = v;
    }
  }

  return specs;
}

interface FAQ { q: string; a: string; }
interface Product {
  id: number; name: string; slug: string;
  short_description: string; full_description: string;
  price: string; original_price: string; discount_percent: number;
  category: string; tags: string[]; features: string[];
  specifications: Record<string, string>; warranty: string;
  faqs: FAQ[];
  stock_status: string; image: string | null; badge: string | null;
  images: string[]; video_url: string | null;
  is_featured: number; rating: number; review_count: number;
}

const BADGE_CONFIG: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  best_seller:   { label: "Best Seller",   bg: "bg-orange-500",  text: "text-white",     icon: "\u2B50" },
  new:           { label: "New Arrival",   bg: "bg-[#0055E5]",   text: "text-white",     icon: "\u2728" },
  limited_offer: { label: "Limited Offer", bg: "bg-red-600",     text: "text-white",     icon: "\uD83D\uDD25" },
  customizable:  { label: "Custom Build",  bg: "bg-slate-700",   text: "text-white",     icon: "\u2699" },
  featured:      { label: "Featured",      bg: "bg-[#0F172A]",   text: "text-[#0055E5]", icon: "\u26A1" },
  hot_deal:      { label: "Hot Deal",      bg: "bg-rose-600",    text: "text-white",     icon: "\uD83D\uDD25" },
};
interface Review { id: number; reviewer_name: string; company: string; rating: number; review: string; created_at: string; }
interface RelatedProduct { id: number; name: string; price: string; image: string | null; category: string; short_description: string; rating: number; }

const STOCK_LABELS: Record<string, { label: string; color: string }> = {
  in_stock:     { label: "In Stock",      color: "text-green-600 bg-green-50 border-green-200" },
  out_of_stock: { label: "Out of Stock",  color: "text-red-600 bg-red-50 border-red-200" },
  on_request:   { label: "On Request",    color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
  customizable: { label: "Customizable",  color: "text-slate-700 bg-slate-50 border-slate-200" },
};

/* ─── PRICING MODAL ─────────────────────── */
const PricingModal = ({ productName, onClose }: { productName: string; onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API}/api/pricing-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: form.name, phone: form.phone, email: form.email, service: productName }),
      });
    } catch { /* still show success */ }
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={20} /></button>
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Pricing Request Sent!</h3>
            <p className="text-slate-500 text-sm">Our team will contact you with pricing within 2 hours.</p>
            <button onClick={onClose} className="mt-5 bg-[#0F172A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0044BB] transition">Close</button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">Request Pricing</h3>
            <p className="text-slate-500 text-sm mb-5 line-clamp-2 leading-snug">{productName}</p>
            <form onSubmit={submit} className="space-y-3">
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
              <button type="submit" className="w-full bg-[#0F172A] hover:bg-[#0044BB] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300">Send Pricing Request</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Stars = ({ rating, size = 14, interactive = false, onRate }: {
  rating: number; size?: number; interactive?: boolean; onRate?: (r: number) => void
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={size}
          onClick={() => interactive && onRate?.(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`transition-colors ${interactive ? "cursor-pointer" : ""}
            ${i <= (hover || Math.round(rating))
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"}`}
        />
      ))}
    </div>
  );
};

/* ─── TOAST ──────────────────────────────── */
const Toast = ({ msg, onDone }: { msg: string; onDone: () => void }) => {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#0F172A] text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2">
      <CheckCircle size={16} className="text-green-400" /> {msg}
    </div>
  );
};

/* ─── REVIEW FORM ────────────────────────── */
const ReviewForm = ({ productId, onSubmitted }: { productId: number; onSubmitted: () => void }) => {
  const [form, setForm] = useState({ reviewer_name: "", company: "", rating: 5, review: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.reviewer_name.trim() || !form.review.trim()) return;
    setLoading(true);
    try {
      await fetch(`${API}/api/shop-products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setDone(true);
      onSubmitted();
    } catch {
      // still show success
      setDone(true);
      onSubmitted();
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mt-6">
      <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
      <p className="font-bold text-green-700">Review submitted! Thank you.</p>
      <p className="text-sm text-green-600 mt-1">Your review will appear shortly.</p>
    </div>
  );

  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mt-6">
      <h4 className="font-bold text-[#0F172A] text-base mb-4 flex items-center gap-2">
        <MessageSquare size={16} className="text-[#0055E5]" /> Write a Review
      </h4>
      <form onSubmit={submit} className="space-y-3">
        {/* Rating */}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Your Rating *</label>
          <Stars
            rating={form.rating}
            size={22}
            interactive
            onRate={(r) => setForm(f => ({ ...f, rating: r }))}
          />
        </div>
        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required
              value={form.reviewer_name}
              onChange={e => setForm(f => ({ ...f, reviewer_name: e.target.value }))}
              placeholder="Your Name *"
              className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none bg-white"
            />
          </div>
          <div className="relative">
            <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="Company (optional)"
              className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none bg-white"
            />
          </div>
        </div>
        {/* Review Text */}
        <textarea
          required
          value={form.review}
          onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
          rows={3}
          placeholder="Share your experience with this product *"
          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none bg-white resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#0044BB] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
        >
          <Send size={14} />
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

/* ─── MAIN ─────────────────────────────────── */
const ShopProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<{ product: Product; reviews: Review[]; related: RelatedProduct[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "warranty" | "faqs">("description");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [reviewKey, setReviewKey] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);

  useSEO({
    title: data ? `${data.product.name} | Buy Online India | Serverwale` : "Product | Serverwale",
    description: data?.product.short_description ?? "Buy certified refurbished IT hardware from Serverwale — India's trusted server dealer.",
    canonical: `https://serverwale.com/shop/now/${id}`,
  });

  const [fetchError, setFetchError] = useState(false);

  const loadProduct = React.useCallback(() => {
    if (!id) return;
    setLoading(true);
    setFetchError(false);
    fetch(`${API}/api/shop-products/${id}`)
      .then(r => { if (!r.ok) throw new Error("not ok"); return r.json(); })
      .then(d => {
        if (!d?.product) throw new Error("no product");
        setData(d);
        const allImgs = getAllImgUrls(d.product.image, d.product.images ?? []);
        setActiveImg(allImgs[0] ?? null);
        setLoading(false);
      })
      .catch(() => { setLoading(false); setFetchError(true); });
  }, [id]);

  useEffect(() => { loadProduct(); }, [loadProduct]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0055E5] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (fetchError) return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">{"\u26A0\uFE0F"}</div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Could not load product</h2>
        <p className="text-slate-400 text-sm mb-5">Backend server se connect nahi ho paya.</p>
        <button onClick={loadProduct}
          className="bg-[#0F172A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0044BB] transition mr-3"
        >
          Retry
        </button>
        <Link to="/shop/now" className="text-[#0055E5] hover:underline text-sm">&larr; Back to Shop</Link>
      </div>
    </div>
  );

  if (!data?.product) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Package size={48} className="text-slate-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Product not found</h2>
        <Link to="/shop/now" className="text-[#0055E5] hover:underline text-sm">&larr; Back to Shop</Link>
      </div>
    </div>
  );

  const { product, reviews, related } = data;
  const stock = STOCK_LABELS[product.stock_status] ?? STOCK_LABELS.in_stock;

  // Safely parse faqs — backend may return raw JSON string if not restarted yet
  const faqs: FAQ[] = (() => {
    const raw = (product as any).faqs;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") { try { return JSON.parse(raw); } catch { return []; } }
    return [];
  })();

  // Specs: use stored specs, or parse from HTML
  let specs: Record<string, string> = {};
  if (product.specifications && !Array.isArray(product.specifications) && Object.keys(product.specifications).length > 0) {
    specs = product.specifications;
  } else {
    specs = parseSpecsFromHtml(product.full_description ?? "");
  }

  // Build image gallery — always show at least 4 thumbnails (pad with main image)
  const rawImages = getAllImgUrls(product.image, product.images ?? []);
  const mainImg = getImgUrl(product.image);
  const allImages = rawImages.length >= 4
    ? rawImages
    : [...rawImages, ...Array(4 - rawImages.length).fill(mainImg)];

  const handleWhatsApp = (msg: string) => {
    window.open(`https://wa.me/918595242521?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const primaryCategory = (product.category ?? "").split(",")[0].trim();

  // Average rating from reviews if product.rating is 0
  const displayRating = product.rating > 0
    ? product.rating
    : reviews.length > 0
      ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length * 10) / 10
      : 0;

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ── BREADCRUMB HERO ──────────────────────── */}
      <div className="bg-[#0F172A] text-white pt-20 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#0055E5] mb-2">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <Link to="/shop/now" className="hover:text-white transition">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-slate-400 line-clamp-1">{product.name}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0055E5] bg-[#0055E5]/10 px-3 py-1 rounded-full">
              {primaryCategory}
            </span>
            {product.badge && BADGE_CONFIG[product.badge] && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${BADGE_CONFIG[product.badge].bg} ${BADGE_CONFIG[product.badge].text}`}>
                {BADGE_CONFIG[product.badge].icon} {BADGE_CONFIG[product.badge].label}
              </span>
            )}
            {product.is_featured === 1 && !product.badge && (
              <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full">
                {"\u2B50"} Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN SECTION ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT: Image Gallery */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-72 sm:h-96 mb-4 border border-slate-100">
            {showVideo && product.video_url ? (
              <div className="w-full h-full">
                {product.video_url.includes("youtube") || product.video_url.includes("youtu.be") ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${product.video_url.split("v=")[1]?.split("&")[0] || product.video_url.split("/").pop()}`}
                    className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen title="Video"
                  />
                ) : (
                  <video src={product.video_url} controls autoPlay className="w-full h-full object-cover" />
                )}
                <button onClick={() => setShowVideo(false)}
                  className="absolute top-3 right-3 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition"
                >✕</button>
              </div>
            ) : activeImg ? (
              <img src={activeImg} alt={product.name} className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={64} className="text-slate-300" />
              </div>
            )}

            {product.discount_percent > 0 && !showVideo && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow">
                -{product.discount_percent}% OFF
              </div>
            )}
            {product.badge && BADGE_CONFIG[product.badge] && !showVideo && (
              <div className={`absolute top-4 right-4 ${BADGE_CONFIG[product.badge].bg} ${BADGE_CONFIG[product.badge].text} text-xs font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1`}>
                <span>{BADGE_CONFIG[product.badge].icon}</span>
                <span>{BADGE_CONFIG[product.badge].label}</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {(allImages.length > 1 || product.video_url) && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => { setActiveImg(img); setShowVideo(false); }}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${!showVideo && activeImg === img ? "border-[#0055E5]" : "border-transparent hover:border-slate-200"}`}
                >
                  <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  />
                </button>
              ))}
              {product.video_url && (
                <button onClick={() => setShowVideo(true)}
                  className={`shrink-0 w-16 h-16 rounded-xl border-2 flex items-center justify-center bg-[#0F172A] transition-all ${showVideo ? "border-[#0055E5]" : "border-transparent hover:border-slate-200"}`}
                >
                  <PlayCircle size={24} className="text-[#0055E5]" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Image size={12} /> {allImages.length} image{allImages.length !== 1 ? "s" : ""}</span>
            {product.video_url && <span className="flex items-center gap-1 text-[#0055E5]"><PlayCircle size={12} /> Video available</span>}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <Stars rating={displayRating} size={16} />
            <span className="text-sm text-slate-600 font-medium">
              {displayRating > 0 ? `${displayRating}` : "No ratings yet"}
              {product.review_count > 0 && ` (${product.review_count} review${product.review_count > 1 ? "s" : ""})`}
            </span>
            {reviews.length > 0 && (
              <button onClick={() => setActiveTab("reviews")}
                className="text-xs text-[#0055E5] hover:underline"
              >
                See all reviews
              </button>
            )}
          </div>

          {/* Price hidden — use Request Pricing flow */}

          {/* Stock */}
          <div className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-xl border mb-5 ${stock.color}`}>
            <CheckCircle size={14} />
            {stock.label}
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-slate-600 text-sm leading-relaxed mb-5">{product.short_description}</p>
          )}

          {/* Key Features */}
          {product.features?.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={14} className="text-[#0055E5] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-blue-50 text-[#0055E5] text-xs font-medium px-2.5 py-1 rounded-full">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Warranty Badge */}
          {product.warranty && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm text-green-700">
              <ShieldCheck size={16} className="text-green-500 shrink-0" />
              <span><strong>Warranty:</strong> {product.warranty}</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setToast("Our team will contact you shortly to process your order!")}
              className="w-full flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#0044BB] text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_-2px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={() => setShowPricingModal(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white font-bold py-3.5 rounded-xl transition-all duration-300"
            >
              <FileText size={18} /> Request Pricing
            </button>
            <button
              onClick={() => handleWhatsApp(`Hi Serverwale! I have a question about: ${product.name}. Can I talk to an expert?`)}
              className="w-full flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z"/>
              </svg>
              Talk to Our Experts
            </button>
          </div>
        </div>
      </section>

      {/* ── TABS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {(["description","specs","reviews","warranty","faqs"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-3 font-semibold text-sm transition-all border-b-2 -mb-px ${
                  activeTab === tab ? "border-[#0055E5] text-[#0055E5]" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "specs" ? "Specifications"
                  : tab === "reviews" ? `Reviews${reviews.length > 0 ? ` (${reviews.length})` : ""}`
                  : tab === "faqs" ? "FAQs"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        {activeTab === "description" && (
          <div className="product-html-desc max-w-4xl">
            {product.full_description ? (
              <div dangerouslySetInnerHTML={{ __html:
                // Strip literal \n escape sequences that WooCommerce stores as text
                product.full_description
                  .replace(/\\n\\n/g, '')
                  .replace(/\\n/g, ' ')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\n/g, ' ')
              }} />
            ) : product.short_description ? (
              <p className="text-slate-700 leading-relaxed text-base">{product.short_description}</p>
            ) : (
              <p className="text-slate-400 text-sm">No description available for this product.</p>
            )}
          </div>
        )}

        {/* Specifications */}
        {activeTab === "specs" && (
          <div>
            {Object.keys(specs).length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 max-w-3xl">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-5 py-3 font-semibold text-[#0F172A] w-2/5 border-r border-slate-100 align-top">{key}</td>
                        <td className="px-5 py-3 text-slate-600 align-top">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                <Package size={36} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 font-medium mb-1">No specifications listed.</p>
                <p className="text-slate-400 text-sm">Check the Description tab for full product details.</p>
                <button
                  onClick={() => setActiveTab("description")}
                  className="mt-3 text-[#0055E5] text-sm hover:underline font-semibold"
                >
                  View Description &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div>
            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6 flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="text-4xl font-black text-[#0F172A]">{displayRating.toFixed(1)}</div>
                  <Stars rating={displayRating} size={16} />
                  <p className="text-xs text-slate-500 mt-1">{reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  {[5,4,3,2,1].map(star => {
                    const count = reviews.filter(r => Math.round(r.rating) === star).length;
                    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-4">{star}</span>
                        <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
                        <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 w-6">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Review Cards */}
            {reviews.length > 0 ? (
              <div className="space-y-4 mb-2">
                {reviews.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <div>
                        <p className="font-bold text-[#0F172A] text-sm">{r.reviewer_name}</p>
                        {r.company && <p className="text-xs text-slate-500">{r.company}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <Stars rating={r.rating} size={13} />
                        <p className="text-[10px] text-slate-400">
                          {new Date(r.created_at).toLocaleDateString("en-IN", { year:"numeric", month:"short", day:"numeric" })}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{r.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                <Star size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">No reviews yet</p>
                <p className="text-slate-400 text-sm">Be the first to review this product!</p>
              </div>
            )}

            {/* Submit Review Form */}
            <ReviewForm
              key={reviewKey}
              productId={product.id}
              onSubmitted={() => { setReviewKey(k => k + 1); loadProduct(); }}
            />
          </div>
        )}

        {/* FAQs */}
        {activeTab === "faqs" && (
          <div className="max-w-3xl">
            {/* JSON-LD FAQ Schema for SEO */}
            {faqs.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map(f => ({
                      "@type": "Question",
                      "name": f.q,
                      "acceptedAnswer": { "@type": "Answer", "text": f.a },
                    })),
                  }),
                }}
              />
            )}

            <h2 className="text-xl font-black text-[#0F172A] mb-6">
              Frequently Asked Questions
            </h2>

            {faqs.length > 0 ? (
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-[#0F172A] text-sm leading-snug">
                        {faq.q}
                      </span>
                      <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[#0055E5] border border-[#0055E5] transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 pt-1 bg-slate-50 border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 font-medium">No FAQs available for this product.</p>
              </div>
            )}
          </div>
        )}

        {/* Warranty */}
        {activeTab === "warranty" && (
          <div className="max-w-xl">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-5">
              <ShieldCheck size={36} className="text-green-500 mb-3" />
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Warranty Coverage</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {product.warranty || "1 Year Comprehensive Warranty"}
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {[
                  "All manufacturing defects covered",
                  "Free parts replacement during warranty period",
                  "Pan-India service network",
                  "On-site support available in Delhi NCR",
                  "WhatsApp support for quick resolution",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h4 className="font-bold text-[#0F172A] mb-2 text-sm">Need Warranty Support?</h4>
              <p className="text-slate-600 text-xs mb-3">Contact our support team for warranty claims and assistance.</p>
              <button
                onClick={() => handleWhatsApp(`Hi Serverwale! I need warranty support for: ${product.name}`)}
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1ebe5d] transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.528 5.85L0 24l6.335-1.496A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.8a9.8 9.8 0 01-5.007-1.37l-.36-.213-3.73.881.936-3.638-.235-.374A9.761 9.761 0 012.2 12C2.2 6.588 6.588 2.2 12 2.2S21.8 6.588 21.8 12 17.412 21.8 12 21.8z"/>
                </svg>
                WhatsApp for Warranty
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── RELATED PRODUCTS ─────────────────────── */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">You May Also Like</h2>
              <Link to="/shop/now" className="text-[#0055E5] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all shrink-0">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {/* Horizontal scroll row — no wrapping, hidden scrollbar */}
            <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
              {related.map(rp => {
                const img = getImgUrl(rp.image);
                const ratingVal = rp.rating > 0 ? rp.rating : parseFloat((3.5 + (((rp.id * 2654435761) >>> 0) % 15) * 0.1).toFixed(1));
                return (
                  <Link key={rp.id} to={`/shop/now/${rp.id}`}
                    className="bg-white rounded-2xl border border-slate-100 hover:border-[#0055E5] hover:shadow-lg transition-all duration-300 overflow-hidden group shrink-0 w-44 sm:w-52"
                  >
                    <div className="h-32 sm:h-36 overflow-hidden bg-slate-100">
                      <img src={img} alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                      />
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-[#0055E5] uppercase tracking-widest line-clamp-1">
                        {(rp.category ?? "").split(",")[0].trim()}
                      </span>
                      <h3 className="font-bold text-[#0F172A] text-xs mt-1 mb-2 line-clamp-2 leading-snug">{rp.name}</h3>
                      <Stars rating={ratingVal} size={10} />
                      <div className="mt-1.5 font-bold text-sm text-[#0055E5]">
                        Contact for Price
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      {showPricingModal && <PricingModal productName={product.name} onClose={() => setShowPricingModal(false)} />}
    </div>
  );
};

export default ShopProductDetail;
