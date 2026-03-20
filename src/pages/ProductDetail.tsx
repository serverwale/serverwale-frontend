import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, MessageSquare, Phone, CheckCircle, Star,
  ShieldCheck, Truck, BadgeCheck, Award, Wrench, Clock,
  ChevronDown, ChevronUp, FileText, Package, Zap, ArrowRight,
  RotateCcw, BarChart2, Mail, Headphones, Users, Tag,
  Play, Image as ImageIcon, ChevronLeft
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const API_URL    = "";
const WA_NUMBER  = "919999656064";

/* ─── Section anchors for in-page nav ─── */
const SECTIONS = [
  { id: "description",   label: "Description",    icon: FileText    },
  { id: "specification", label: "Specifications",  icon: BarChart2   },
  { id: "warranty",      label: "Warranty",        icon: ShieldCheck },
  { id: "faq",           label: "FAQs",            icon: Package     },
  { id: "reviews",       label: "Reviews",         icon: Star        },
];

const ProductDetail: React.FC = () => {
  const { id }        = useParams();
  const [data,        setData]        = useState<any>(null);
  const [loading,     setLoading]     = useState(true);
  const [mainImgIdx,  setMainImgIdx]  = useState(0);   // 0 = product.image, 1-4 = extras
  const [showVideo,   setShowVideo]   = useState(false);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [moreLike,    setMoreLike]    = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("description");
  const sectionRefs   = useRef<Record<string, HTMLElement | null>>({});

  /* ── Fetch product ── */
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_URL}/api/products/${id}`)
      .then(r => r.json())
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  /* ── Fetch "more like this" from same category ── */
  useEffect(() => {
    if (!data?.product?.category_id) return;
    fetch(`${API_URL}/api/products?category_id=${data.product.category_id}`)
      .then(r => r.json())
      .then((list: any[]) => {
        const safe = Array.isArray(list) ? list.filter(p => String(p.id) !== String(id)) : [];
        setMoreLike(safe.slice(0, 4));
      });
  }, [data, id]);

  /* ── Scroll spy for in-page nav ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach(s => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [data]);

  /* ── Video helpers ── */
  const getVideoSrc = (v: string) => {
    if (!v) return null;
    // YouTube full URL: https://www.youtube.com/watch?v=ID
    const ytFull = v.match(/youtube\.com\/watch\?v=([\w-]+)/);
    if (ytFull) return `https://www.youtube.com/embed/${ytFull[1]}?autoplay=1&rel=0`;
    // YouTube short URL: https://youtu.be/ID
    const ytShort = v.match(/youtu\.be\/([\w-]+)/);
    if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1&rel=0`;
    // Local/direct file
    return v.startsWith("http") ? v : `${API_URL}/${v}`;
  };
  const isYouTube = (v: string) => !!(v && (v.includes("youtube.com") || v.includes("youtu.be")));
  const videoSrc  = data?.product?.video_url ? getVideoSrc(data.product.video_url) : null;

  const scrollTo = (sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWA  = () => {
    const msg = encodeURIComponent(`Hi, I'm interested in: ${data?.product?.title || ""}. Please help me.`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };
  const handleCall = () => { window.location.href = "tel:9999656064"; };

  /* ─── Loading ─── */
  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Loading product details…</p>
      </div>
    </div>
  );

  if (!data?.product) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Package size={48} className="text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-black text-[#08152E]">Product Not Found</h2>
        <Link to="/product" className="mt-6 inline-flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1E293B] transition">
          ← Browse All Products
        </Link>
      </div>
    </div>
  );

  const { product, description = {}, specifications = [], warranty = "", reviews = [], faqs = [], images = [] } = data;

  /* ─── All gallery images (main + extras) ─── */
  const galleryImages: string[] = [
    product.image ? `${API_URL}/${product.image}` : "",
    ...images.map((img: any) => `${API_URL}/${img.image}`),
  ].filter(Boolean);

  /* ─── Tag badges from comma-separated string ─── */
  const tags = product.tag
    ? product.tag.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-white font-sans overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden text-white min-h-[280px] md:min-h-[340px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:`linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize:"48px 48px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-20 pb-8 md:pt-24 md:pb-12">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <Link to="/product" className="hover:text-white transition">Products</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400 truncate max-w-[220px]">{product.title}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 w-fit">
            <BadgeCheck size={12} /> CERTIFIED REFURBISHED · WARRANTY INCLUDED
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-2 max-w-3xl">{product.title}</h1>
          <p className="text-blue-200 text-sm max-w-xl border-l-2 border-blue-500 pl-4 font-medium">
            Enterprise-grade · <strong className="text-white">60–80% lower cost</strong> vs new · 1-Year warranty
          </p>
        </div>
      </section>

      {/* ══ PRODUCT TOP: Gallery + Info ══ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* ── Image Gallery ── */}
          <div className="space-y-3 w-full min-w-0">
            {/* Main Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50 aspect-[4/3] max-h-[280px] sm:max-h-[380px] md:max-h-none">
              {!showVideo ? (
                <>
                  <img
                    src={galleryImages[mainImgIdx] || "https://placehold.co/700x500/e2e8f0/94a3b8?text=No+Image"}
                    alt={product.title}
                    className="w-full h-full max-w-full object-cover transition-transform duration-500"
                  />
                  {/* Nav arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setMainImgIdx(i => (i - 1 + galleryImages.length) % galleryImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setMainImgIdx(i => (i + 1) % galleryImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                  {/* Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {mainImgIdx + 1} / {galleryImages.length + (product.video_url ? 1 : 0)}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black rounded-2xl overflow-hidden" style={{minHeight:"200px"}}>
                  {videoSrc ? (
                    isYouTube(product.video_url) ? (
                      /* ── YouTube embed ── */
                      <iframe
                        src={videoSrc}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={product.title}
                      />
                    ) : (
                      /* ── Local / direct video file ── */
                      <video
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        <source src={videoSrc} type="video/mp4" />
                        <source src={videoSrc} type="video/webm" />
                        <p className="text-slate-300 text-sm p-4">
                          Your browser does not support this video.{" "}
                          <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                            Open video
                          </a>
                        </p>
                      </video>
                    )
                  ) : (
                    <div className="text-slate-400 text-sm text-center p-6">
                      <Play size={32} className="mx-auto mb-2 opacity-40" />
                      <p>No video available for this product.</p>
                    </div>
                  )}
                </div>
              )}
              {/* Certified badge */}
              <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck size={10} className="text-blue-300" /> Serverwale Certified
              </div>
            </div>

            {/* Thumbnails row */}
            {(galleryImages.length > 1 || product.video_url) && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {galleryImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => { setMainImgIdx(i); setShowVideo(false); }}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                      ${mainImgIdx === i && !showVideo ? "border-blue-500 shadow-md" : "border-slate-200 hover:border-[#0055E5]/40"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {/* Video thumbnail */}
                {product.video_url && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`shrink-0 w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all
                      ${showVideo ? "border-red-500 bg-red-600 text-white" : "border-slate-200 bg-slate-100 text-slate-500 hover:border-red-400 hover:bg-red-50 hover:text-red-500"}`}
                  >
                    <Play size={18} />
                    <span className="text-[9px] font-black uppercase">Video</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="min-w-0 w-full">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((t: string, i: number) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-black text-[#08152E] leading-tight mb-3">{product.title}</h2>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-sm text-slate-500 font-medium">Certified Quality · Enterprise Tested</span>
            </div>

            <div
              className="text-slate-600 leading-relaxed mb-5 text-sm md:text-base prose prose-sm max-w-none prose-strong:text-[#08152E]"
              dangerouslySetInnerHTML={{ __html: description.short_description || product.description || "" }}
            />

            {/* Feature chips */}
            {Array.isArray(JSON.parse(product.features || "[]")) && JSON.parse(product.features || "[]").length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {JSON.parse(product.features || "[]").map((f: string, i: number) => (
                  <span key={i} className="text-xs font-semibold bg-blue-50 text-[#0055E5] border border-blue-100 px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Quick highlights */}
            <div className="grid grid-cols-2 gap-2 mb-4 md:mb-5">
              {[
                { icon: ShieldCheck, text: "1-Year Warranty"     },
                { icon: BadgeCheck,  text: "40-Pt Inspected"     },
                { icon: Truck,       text: "Pan-India Delivery"  },
                { icon: Wrench,      text: "Free Installation"   },
              ].map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                  <h.icon size={14} className="text-[#0055E5] shrink-0" />
                  <span className="text-xs font-bold text-[#08152E]">{h.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-4">
              <button onClick={handleWA}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-xl font-black text-sm transition-all shadow-md shadow-green-500/20">
                <FaWhatsapp size={17} /> WhatsApp Expert
              </button>
              <button onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-3.5 rounded-xl font-black text-sm transition-all shadow-md">
                <Phone size={16} /> Call Now
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center">🔒 Free consultation · No obligation · Response within 30 min</p>
          </div>
        </div>
      </div>

      {/* ══ STICKY IN-PAGE NAV ══ */}
      <div className="border-t border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            {SECTIONS.map(({ id: sid, label, icon: Icon }) => (
              <button
                key={sid}
                onClick={() => scrollTo(sid)}
                className={`flex items-center gap-2 px-5 py-3.5 font-bold text-sm whitespace-nowrap border-b-2 transition-all
                  ${activeSection === sid
                    ? "border-blue-500 text-[#08152E]"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ OVERVIEW — All sections in one scroll ══ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10 md:space-y-14 overflow-hidden">

        {/* ── 1. DESCRIPTION ── */}
        <section
          id="description"
          ref={el => { sectionRefs.current["description"] = el; }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#08152E]">Product Description</h2>
          </div>
          <div className="space-y-8 md:space-y-12">
            {[
              { text: description.long_description_1, img: images[0] },
              { text: description.long_description_2, img: images[1], reverse: true },
              { text: description.long_description_3, img: images[2] },
            ].map((block, i) => {
              if (!block.text) return null;
              const imgSrc = block.img ? `${API_URL}/${block.img.image}` : null;
              return (
                <div key={i} className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${block.reverse ? "md:[direction:rtl]" : ""}`}>
                  <div className="[direction:ltr] min-w-0 overflow-hidden">
                    {/* Render HTML — HTML tags from admin will render properly */}
                    <div
                      className="prose prose-sm max-w-none text-slate-700 leading-relaxed overflow-hidden
                        prose-strong:text-[#08152E] prose-ul:list-disc prose-ol:list-decimal
                        prose-li:text-slate-700 prose-headings:text-[#08152E] prose-img:max-w-full prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  </div>
                  <div className="[direction:ltr] min-w-0">
                    {imgSrc ? (
                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md w-full">
                        <img src={imgSrc} alt="" className="w-full max-w-full h-48 sm:h-56 object-cover transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="hidden md:flex rounded-2xl bg-slate-50 border border-slate-200 h-48 items-center justify-center">
                        <ImageIcon size={32} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {!description.long_description_1 && !description.long_description_2 && !description.long_description_3 && (
              <div
                className="prose prose-sm max-w-none text-slate-500 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />
            )}
          </div>
        </section>

        {/* ── 2. SPECIFICATIONS ── */}
        <section
          id="specification"
          ref={el => { sectionRefs.current["specification"] = el; }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#08152E]">Technical Specifications</h2>
          </div>
          {specifications.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    <th className="text-left px-5 py-3.5 font-bold text-sm w-2/5">Specification</th>
                    <th className="text-left px-5 py-3.5 font-bold text-sm">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((s: any, i: number) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-[#EDF4FF]"} hover:bg-blue-50 transition-colors`}>
                      <td className="px-5 py-3.5 font-semibold text-sm text-[#08152E]">{s.spec_key}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-600">{s.spec_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
              <BarChart2 size={32} className="mx-auto mb-2 text-slate-300" />
              <p className="font-medium text-sm">Specifications not yet added. Contact us for details.</p>
            </div>
          )}
        </section>

        {/* ── 3. WARRANTY ── */}
        <section
          id="warranty"
          ref={el => { sectionRefs.current["warranty"] = el; }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#08152E]">Warranty & Support</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#04194A] rounded-2xl p-5 text-white">
              <ShieldCheck size={30} className="text-blue-300 mb-4" />
              <h4 className="font-black text-lg mb-3">Warranty Coverage</h4>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {warranty || "Includes Serverwale's 1-year hardware warranty covering all component defects and failures under normal operating conditions."}
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Clock,      title: "1-Year Hardware Warranty",   desc: "Covers component failures. Extendable to 2–3 years." },
                { icon: Wrench,     title: "Free Installation Support",   desc: "On-site setup for Delhi NCR. Remote support pan-India." },
                { icon: RotateCcw,  title: "7-Day Return Policy",        desc: "Hassle-free returns if product doesn't meet expectations." },
                { icon: Headphones, title: "24×7 Technical Support",     desc: "Dedicated support for warranty claims and troubleshooting." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 bg-[#EDF4FF] border border-[#C8DCFF] rounded-xl p-4">
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <item.icon size={15} className="text-[#0055E5]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#08152E]">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. FAQs ── */}
        <section
          id="faq"
          ref={el => { sectionRefs.current["faq"] = el; }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#08152E]">Frequently Asked Questions</h2>
          </div>
          {faqs.length > 0 ? (
            <div className="space-y-3">
              {faqs.map((f: any, i: number) => (
                <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${openFaq === i ? "border-blue-400 shadow-md shadow-blue-100" : "border-slate-200 hover:border-[#0055E5]/30"}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full px-5 py-4 flex justify-between items-center text-left font-bold text-sm gap-3 transition-colors ${openFaq === i ? "bg-[#0F172A] text-white" : "bg-white text-slate-800 hover:bg-[#EDF4FF]"}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${openFaq === i ? "bg-[#0055E5] text-white" : "bg-blue-100 text-[#0055E5]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.question}
                    </span>
                    {openFaq === i ? <ChevronUp size={18} className="shrink-0 text-blue-300" /> : <ChevronDown size={18} className="shrink-0 text-slate-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 py-4 border-t border-blue-100 bg-blue-50/30">
                      <p className="text-slate-600 text-sm leading-relaxed">{f.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-400 text-sm">No FAQs yet for this product. <span className="text-[#0055E5] cursor-pointer" onClick={handleWA}>Ask us on WhatsApp →</span></p>
            </div>
          )}
        </section>

        {/* ── 5. REVIEWS ── */}
        <section
          id="reviews"
          ref={el => { sectionRefs.current["reviews"] = el; }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
            <h2 className="text-2xl font-black text-[#08152E]">Client Reviews</h2>
          </div>
          {reviews.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-5 bg-white hover:shadow-lg hover:border-[#0055E5]/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-black text-[#08152E] text-sm">{r.company_name}</h4>
                      {r.reviewer_name && <p className="text-slate-400 text-xs">{r.reviewer_name}</p>}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-black text-yellow-700">{r.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(Math.round(r.rating || 5))].map((_, j) => <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
              <Star size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">No reviews yet. Be the first — <span className="text-[#0055E5] cursor-pointer" onClick={handleWA}>share your experience →</span></p>
            </div>
          )}
        </section>
      </div>

      {/* ══ MORE LIKE THIS ══ */}
      {moreLike.length > 0 && (
        <section className="bg-[#EDF4FF] border-t border-[#C8DCFF] py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-0.5 w-8 bg-[#0055E5] rounded" />
              <h2 className="text-xl md:text-2xl font-black text-[#08152E]">More Like This</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moreLike.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0055E5]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-36 overflow-hidden bg-slate-100">
                    <img
                      src={p.image ? `${API_URL}/${p.image}` : "https://placehold.co/300x200/e2e8f0/94a3b8?text=No+Image"}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-black text-[#08152E] text-xs leading-snug mb-1.5 line-clamp-2 group-hover:text-[#0055E5] transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={9} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <span className="text-[10px] font-bold text-[#0055E5] flex items-center gap-1">
                      View Details <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-[#0F172A] py-8 md:py-12 border-t border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Headphones size={12} /> DEDICATED EXPERT SUPPORT
          </div>
          <h2 className="text-xl md:text-3xl font-black text-white mb-3">Ready to Order or Need More Details?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-5">
            Our specialists will help you choose the right config, arrange a demo, or process your bulk order. <strong className="text-slate-300">Response in 30 minutes.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleWA}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all">
              <FaWhatsapp size={17} /> WhatsApp an Expert
            </button>
            <button onClick={handleCall}
              className="inline-flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all">
              <Phone size={16} /> Call: 9999-656-064
            </button>
            <Link to="/product"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all">
              ← Browse All Products
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { icon: ShieldCheck, text: "1-Year Warranty"      },
              { icon: Users,       text: "500+ Happy Clients"   },
              { icon: BadgeCheck,  text: "Certified Refurbished"},
              { icon: Truck,       text: "Pan-India Delivery"   },
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

export default ProductDetail;
