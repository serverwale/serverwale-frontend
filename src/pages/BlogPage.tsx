import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import axios from "axios";
import useSEO from "../hooks/useSEO";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock, User, ChevronRight, ArrowRight, BookOpen, Search,
  Tag, TrendingUp, Users, Award, Zap, ChevronDown, ChevronUp,
  Server, Cloud, Cpu, HardDrive, Network, Shield,
  Mail, Rss, Star, Layers, Globe, BadgeCheck, ChevronLeft
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  created_at: string;
  tags: string;
}

/* ── STATS BAR ── */
const BLOG_STATS = [
  { icon: BookOpen,   value: "50+",       label: "Expert Articles"     },
  { icon: Users,      value: "100+",   label: "Monthly Readers"     },
  { icon: Award,      value: "7+ Yrs",   label: "Industry Experience" },
  { icon: Globe,      value: "Pan-India", label: "Coverage & Reach"    },
  { icon: BadgeCheck, value: "Verified",  label: "Expert-Reviewed"     },
];

/* ── TOPIC CATEGORIES (tag = keyword to match in post.tags) ── */
const TOPICS = [
  { icon: Server,     label: "Refurbished Servers",  tag: "server"  },
  { icon: Cloud,      label: "Cloud & VPS Solutions", tag: "cloud"   },
  { icon: Cpu,        label: "GPU & AI Workstations", tag: "gpu"     },
  { icon: HardDrive,  label: "Data Center & Storage", tag: "storage" },
  { icon: Network,    label: "Networking & Security", tag: "network" },
  { icon: Shield,     label: "IT Cost Optimization",  tag: "cost"    },
  { icon: Layers,     label: "HPC & Rendering",       tag: "hpc"     },
  { icon: TrendingUp, label: "Enterprise IT Trends",  tag: "trends"  },
];

/* ── FAQs ── */
const FAQS = [
  {
    q: "What topics does the Serverwale blog cover?",
    a: "Our blog covers the full spectrum of enterprise IT — from buying refurbished servers and building GPU workstations, to cloud migration strategies, HPC cluster design, data center optimization, and IT cost reduction. Each article is written by experienced engineers with real-world deployment knowledge across India's enterprise landscape.",
  },
  {
    q: "Are your blog articles suitable for IT decision-makers and CTOs?",
    a: "Absolutely. Our content is designed for both technical teams and business leadership. Articles include ROI analysis, vendor comparison guides, cost-benefit breakdowns, and technology roadmaps — helping CIOs, CTOs, and procurement heads make informed IT investment decisions.",
  },
  {
    q: "Do you publish guides on buying refurbished servers and IT hardware?",
    a: "Yes — this is one of our most popular content categories. We publish in-depth guides on how to evaluate refurbished HP ProLiant, Dell PowerEdge, and Lenovo ThinkSystem servers, including certifications, warranty coverage, performance benchmarks, and vendor negotiation tips.",
  },
  {
    q: "How often does Serverwale publish new blog content?",
    a: "We publish new articles, case studies, and technology insights regularly — typically 2–4 posts per month. Each post goes through technical review before publishing to ensure accuracy and relevance to real business needs across India's IT market.",
  },
  {
    q: "Can I contact Serverwale's team if I have a specific IT question?",
    a: "Yes! If you have a question not covered in our blog, reach out via WhatsApp at +91-9999-656-064 or email contact@serverwale.com. We also offer free 30-minute IT consultations for businesses evaluating enterprise infrastructure investments.",
  },
];

const POSTS_PER_PAGE = 8;
const SLIDER_COUNT   = 4;   // latest N blogs in the auto-slider
const API_BASE       = "";
const SLIDE_INTERVAL = 3500; // ms

/* ── Smart blog image resolver ── */
function getBlogImage(image: string | null | undefined, tags?: string | null, title?: string): string {
  if (image) {
    if (image.startsWith("http")) return image;   // external URL stored directly
    return `${API_BASE}${image}`;                  // local upload path
  }
  // Topic-aware fallback using Unsplash
  const text = `${tags || ""} ${title || ""}`.toLowerCase();
  if (text.includes("gpu") || text.includes("ai") || text.includes("render") || text.includes("workstation"))
    return "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80";
  if (text.includes("cloud") || text.includes("hosting") || text.includes("vps"))
    return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80";
  if (text.includes("network") || text.includes("switch") || text.includes("cisco") || text.includes("firewall"))
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
  if (text.includes("storage") || text.includes("nas") || text.includes("backup"))
    return "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80";
  if (text.includes("hpc") || text.includes("cluster") || text.includes("render farm"))
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";
  if (text.includes("cost") || text.includes("saving") || text.includes("budget"))
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";
  if (text.includes("server") || text.includes("dell") || text.includes("hp") || text.includes("refurb"))
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
  return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
}

/* ════════════════════════════════════════
   AUTO-SLIDER COMPONENT
════════════════════════════════════════ */
const FeaturedSlider: React.FC<{ posts: Blog[]; onNavigate: (slug: string) => void }> = ({ posts, onNavigate }) => {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [animDir, setAnimDir]   = useState<"left" | "right">("left");
  const [visible, setVisible]   = useState(true);
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = posts.slice(0, SLIDER_COUNT);
  const total  = slides.length;

  const goTo = useCallback((idx: number, dir: "left" | "right" = "left") => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
    }, 220);
  }, []);

  const next = useCallback(() => goTo((active + 1) % total, "left"),  [active, total, goTo]);
  const prev = useCallback(() => goTo((active - 1 + total) % total, "right"), [active, total, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (!paused && total > 1) {
      timerRef.current = setInterval(() => next(), SLIDE_INTERVAL);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next, total]);

  if (!slides.length) return null;
  const post = slides[active];

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#0F172A] select-none"
      style={{ minHeight: 340 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide image + overlay */}
      <div
        className="w-full h-[340px] sm:h-[400px] cursor-pointer relative"
        style={{
          transition: visible ? "opacity 0.22s ease, transform 0.22s ease" : "none",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : animDir === "left" ? "translateX(-24px)" : "translateX(24px)",
        }}
        onClick={() => onNavigate(post.slug)}
      >
        <img
          src={getBlogImage(post.image, post.tags, post.title)}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#0055E5] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Featured
            </span>
            <span className="text-blue-300 text-[10px] font-semibold uppercase tracking-widest">
              {post.tags || "Enterprise IT"}
            </span>
          </div>
          <h2 className="text-white font-black text-lg sm:text-2xl leading-tight line-clamp-2 mb-2">
            {post.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><User size={11} className="text-blue-400" /> Serverwale Team</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} /> 5 min read</span>
            <span>·</span>
            <span>{new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition">
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots + slide counter */}
      {total > 1 && (
        <div className="absolute bottom-4 right-6 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i, i > active ? "left" : "right")}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-2 bg-blue-400" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
          <span className="text-white/50 text-[10px] font-bold ml-1">{active + 1}/{total}</span>
        </div>
      )}

      {/* Pause indicator */}
      {paused && total > 1 && (
        <div className="absolute top-3 right-3 z-10 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
          ⏸ Paused
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
const BlogPage: React.FC = () => {
  useSEO({
    title: "IT Infrastructure Blog | Servers, Cloud & HPC Insights | Serverwale™",
    description: "Read expert articles on refurbished servers, cloud solutions, HPC clusters, GPU workstations and data center best practices from Serverwale's technology team. India's trusted IT knowledge hub.",
    keywords: "IT infrastructure blog india, refurbished server buying guide, enterprise IT insights india, cloud solutions blog, HPC cluster design, GPU workstation guide, data center blog india, server technology blog",
    canonical: "https://serverwale.com/blog",
  });

  const navigate      = useNavigate();
  const [posts,       setPosts]       = useState<Blog[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [page,        setPage]        = useState(1);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE}/api/blogs/public`)
      .then(res => setPosts(res.data))
      .catch(err => console.error("Blog fetch error ❌", err))
      .finally(() => setLoading(false));
  }, []);

  /* ── Compute real category counts from actual post tags ── */
  const topicCounts = useMemo(() => {
    const result: Record<string, number> = { all: posts.length };
    TOPICS.forEach(t => {
      result[t.tag] = posts.filter(p =>
        (p.tags || "").toLowerCase().includes(t.tag)
      ).length;
    });
    return result;
  }, [posts]);

  /* ── Filter + search (applied to ALL posts for the grid) ── */
  const filtered = useMemo(() => {
    let list = posts;
    if (activeTopic) list = list.filter(p => (p.tags || "").toLowerCase().includes(activeTopic));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, activeTopic, search]);

  /* ── Pagination (only grid, slider is always latest 4) ── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  /* Reset to page 1 on filter change */
  useEffect(() => setPage(1), [activeTopic, search]);

  const goToPost = useCallback((slug: string) => navigate(`/blog/${slug}`), [navigate]);

  return (
    <div className="bg-white font-sans overflow-x-hidden">

      {/* ════════════════════
           HERO
      ════════════════════ */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Blog & Insights</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 w-fit">
            <Rss size={12} /> ENTERPRISE IT KNOWLEDGE HUB · INDIA
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            Expert IT Insights &{" "}
            <span className="text-[#5BAEFF]">
              Infrastructure Guides
            </span>
          </h1>
          <p className="max-w-2xl text-blue-200 text-sm sm:text-base font-medium leading-relaxed mb-6 border-l-2 border-blue-500 pl-4">
            In-depth articles on <strong className="text-white">refurbished servers</strong>,{" "}
            <strong className="text-white">cloud migration</strong>,{" "}
            <strong className="text-white">GPU workstations</strong>, and{" "}
            <strong className="text-white">data center optimization</strong> — written by India's enterprise IT specialists.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#blog-grid"
              className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25">
              Read Articles <ArrowRight size={16} />
            </a>
            <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              <FaWhatsapp size={16} /> Ask IT Expert
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════
           STATS BAR
      ════════════════════ */}
      <div className="bg-[#0F172A] border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto snap-x hide-scrollbar divide-x divide-blue-900/30">
            {BLOG_STATS.map((s, i) => (
              <div key={i} className="snap-start flex items-center gap-3 px-4 md:px-6 py-4 min-w-fit">
                <s.icon size={17} className="text-blue-400 shrink-0" />
                <div>
                  <div className="text-white font-black text-sm md:text-base leading-tight">{s.value}</div>
                  <div className="text-slate-400 text-[10px] md:text-xs whitespace-nowrap">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════
           MOBILE CATEGORY DROPDOWN (static - not paginated)
      ════════════════════ */}
      <div className="lg:hidden px-4 pt-4 pb-2">
        <div className="relative w-full">
          <select
            value={activeTopic ?? ""}
            onChange={e => setActiveTopic(e.target.value || null)}
            className="w-full appearance-none bg-[#0F172A] text-white border border-blue-800 rounded-xl px-4 py-3 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value="">📚 All Topics ({posts.length})</option>
            {TOPICS.map(t => (
              <option key={t.tag} value={t.tag}>
                {t.label} ({topicCounts[t.tag] ?? 0})
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none" />
        </div>
      </div>

      {/* ════════════════════════════════════════
           MAIN LAYOUT — SIDEBAR + CONTENT
      ════════════════════════════════════════ */}
      <section className="py-8 md:py-14" id="blog-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 px-4 md:px-6">

          {/* ── DESKTOP SIDEBAR (static — not paginated) ── */}
          <aside className="hidden lg:flex flex-col col-span-4 gap-6">

            {/* Search */}
            <div className="bg-[#EDF4FF] border border-[#C8DCFF] rounded-2xl p-5">
              <h3 className="font-black text-[#08152E] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Search size={14} className="text-blue-500" /> Search Articles
              </h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by topic or keyword…"
                  className="w-full pl-8 pr-3 py-2.5 text-sm border border-[#C8DCFF] rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                />
              </div>
            </div>

            {/* Topic filter — with REAL counts */}
            <div className="bg-[#EDF4FF] border border-[#C8DCFF] rounded-2xl p-5">
              <h3 className="font-black text-[#08152E] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag size={14} className="text-blue-500" /> Browse by Topic
              </h3>
              <div className="space-y-1.5">
                {/* All */}
                <button onClick={() => setActiveTopic(null)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition
                    ${!activeTopic ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-white hover:text-[#08152E] border border-transparent hover:border-[#C8DCFF]"}`}>
                  <span className="flex items-center gap-2"><Layers size={13} /> All Topics</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${!activeTopic ? "bg-[#0055E5]/30 text-blue-200" : "bg-slate-100 text-slate-500"}`}>
                    {posts.length}
                  </span>
                </button>
                {TOPICS.map(t => {
                  const count = topicCounts[t.tag] ?? 0;
                  return (
                    <button key={t.tag} onClick={() => setActiveTopic(activeTopic === t.tag ? null : t.tag)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition
                        ${activeTopic === t.tag ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-white hover:text-[#08152E] border border-transparent hover:border-[#C8DCFF]"}`}>
                      <span className="flex items-center gap-2"><t.icon size={13} /> {t.label}</span>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full min-w-[24px] text-center
                        ${activeTopic === t.tag ? "bg-[#0055E5]/30 text-blue-200" : "bg-slate-100 text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar featured card (latest post, static) */}
            {posts[0] && (
              <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-blue-900/30 cursor-pointer"
                onClick={() => goToPost(posts[0].slug)}>
                <div className="h-36 overflow-hidden">
                  <img src={`${API_BASE}${posts[0].image}`} alt={posts[0].title}
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition" />
                </div>
                <div className="p-5">
                  <div className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Star size={10} /> Latest Article
                  </div>
                  <h4 className="text-white font-black text-sm leading-snug mb-3 line-clamp-2">{posts[0].title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{posts[0].excerpt}</p>
                  <span className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider hover:text-blue-300 transition">
                    Read Article <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            )}

            {/* WhatsApp CTA (static) */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <FaWhatsapp size={20} />
                <span className="font-black text-sm">Ask Our IT Expert</span>
              </div>
              <p className="text-green-100 text-xs leading-relaxed mb-4">
                Have an IT infrastructure question? Chat with our{" "}
                <strong>enterprise specialists</strong> for free guidance.
              </p>
              <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-green-700 py-2.5 rounded-xl font-black text-sm hover:bg-green-50 transition">
                <FaWhatsapp size={14} /> Chat on WhatsApp
              </a>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="col-span-1 lg:col-span-8 space-y-8">

            {/* ─── AUTO-SLIDING FEATURED CAROUSEL (always latest 4, STATIC — not paginated) ─── */}
            {!loading && posts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-black text-[#08152E] text-base flex items-center gap-2">
                    <Star size={15} className="text-blue-500" /> Featured Articles
                  </h2>
                  <span className="text-slate-400 text-xs">Hover to pause · Auto-sliding</span>
                </div>
                <FeaturedSlider posts={posts} onNavigate={goToPost} />
              </div>
            )}

            {/* Slider skeleton */}
            {loading && <div className="w-full h-[340px] bg-slate-100 rounded-2xl animate-pulse" />}

            {/* ─── BLOG GRID SECTION (THIS PART IS PAGINATED) ─── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-[#08152E] text-base flex items-center gap-2">
                  <BookOpen size={15} className="text-blue-500" />
                  {activeTopic
                    ? TOPICS.find(t => t.tag === activeTopic)?.label ?? "Articles"
                    : "All Articles"}
                  <span className="text-slate-400 text-xs font-normal">
                    ({filtered.length} {filtered.length === 1 ? "post" : "posts"})
                  </span>
                </h2>
                {(activeTopic || search) && (
                  <button onClick={() => { setActiveTopic(null); setSearch(""); }}
                    className="text-xs text-[#0055E5] font-bold hover:underline">
                    Clear filter ×
                  </button>
                )}
              </div>

              {/* Loading skeletons */}
              {loading && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
                  ))}
                </div>
              )}

              {/* No results */}
              {!loading && paginated.length === 0 && (
                <div className="text-center py-16 bg-slate-50 rounded-2xl">
                  <BookOpen size={40} className="mx-auto mb-3 text-slate-300" />
                  <p className="font-semibold text-slate-600">No articles found</p>
                  <p className="text-sm text-slate-400 mt-1">Try a different keyword or topic</p>
                  <button onClick={() => { setSearch(""); setActiveTopic(null); }}
                    className="mt-4 text-[#0055E5] text-sm font-bold hover:underline">
                    Clear filters
                  </button>
                </div>
              )}

              {/* Blog cards grid — PAGINATED (8 per page) */}
              {!loading && paginated.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {paginated.map(post => (
                    <article key={post.id} onClick={() => goToPost(post.slug)}
                      className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0055E5]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="h-44 overflow-hidden relative">
                        <img src={getBlogImage(post.image, post.tags, post.title)} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                          <Tag size={9} />
                          <span className="truncate">{post.tags || "IT Guide"}</span>
                          <span className="text-slate-300 shrink-0">•</span>
                          <span className="text-slate-400 shrink-0">
                            {new Date(post.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <h3 className="text-base font-black text-[#0F172A] mb-2 leading-snug line-clamp-2 group-hover:text-[#0055E5] transition">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <User size={10} className="text-blue-400" />
                            <span className="font-semibold">Serverwale Team</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock size={10} /> <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* ─── PAGINATION (only blog grid) ─── */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition">
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-9 h-9 rounded-xl text-sm font-black transition
                          ${page === i + 1 ? "bg-[#0F172A] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition">
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

          </main>
        </div>
      </section>

      {/* ════════════════════════════════════════
           SEO CONTENT SECTION (STATIC)
      ════════════════════════════════════════ */}
      <section className="py-8 md:py-10 bg-[#EDF4FF] border-t border-[#C8DCFF]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#0055E5] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={12} /> ABOUT THIS BLOG
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#08152E] mb-4 leading-tight">
              India's Trusted <strong>Enterprise IT Knowledge Hub</strong>
            </h2>
            <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                The Serverwale blog is your go-to resource for actionable insights on{" "}
                <strong className="text-[#08152E]">enterprise IT infrastructure</strong> in India.
                With over a decade of hands-on experience deploying{" "}
                <strong className="text-[#08152E]">refurbished HP ProLiant and Dell PowerEdge servers</strong>,
                building <strong className="text-[#08152E]">GPU workstations for AI and rendering</strong>, and
                architecting <strong className="text-[#08152E]">HPC clusters for research institutions</strong>,
                our team brings real-world knowledge to every article.
              </p>
              <p>
                Whether you're a CTO evaluating{" "}
                <strong className="text-[#08152E]">cloud migration strategies</strong>,
                an IT manager comparing <strong className="text-[#08152E]">refurbished vs new server costs</strong>,
                or a startup founder planning your first{" "}
                <strong className="text-[#08152E]">data center infrastructure</strong> — our guides are built
                to help you make faster, smarter, and more cost-effective decisions.
              </p>
              <p>
                We cover everything from <strong className="text-[#08152E]">server rack configuration</strong> and{" "}
                <strong className="text-[#08152E]">network security best practices</strong> to{" "}
                <strong className="text-[#08152E]">GPU cluster design for deep learning</strong> and{" "}
                <strong className="text-[#08152E]">IT rental vs ownership ROI analysis</strong>.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Refurbished Servers", "Cloud Solutions", "GPU Workstations", "HPC Clusters", "Data Center", "Network Security", "IT Cost Optimization", "Enterprise IT"].map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs font-semibold bg-white border border-[#C8DCFF] text-[#08152E] px-3 py-1.5 rounded-full">
                  <Tag size={10} className="text-blue-500" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FAQ SECTION (STATIC)
      ════════════════════════════════════════ */}
      <section className="py-8 md:py-10 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#0055E5] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <Zap size={12} /> FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#08152E] mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Everything you need to know about Serverwale's blog and IT resources</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-200
                ${openFaq === i ? "border-blue-300 shadow-md shadow-blue-100" : "border-slate-200 hover:border-[#0055E5]/30"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition
                      ${openFaq === i ? "bg-[#0055E5] text-white" : "bg-blue-50 text-[#0055E5]"}`}>
                      {i + 1}
                    </span>
                    <span className="font-bold text-[#08152E] text-sm pr-4">{faq.q}</span>
                  </div>
                  {openFaq === i
                    ? <ChevronUp size={18} className="text-[#0055E5] shrink-0" />
                    : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="pl-10 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           BOTTOM CTA STRIP (STATIC)
      ════════════════════════════════════════ */}
      <section className="bg-[#0F172A] py-10 border-t border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-xl md:text-2xl mb-2">
              Ready to Upgrade Your IT Infrastructure?
            </h3>
            <p className="text-blue-300 text-sm">
              Talk to our engineers — free consultation for{" "}
              <strong className="text-white">refurbished servers, cloud solutions</strong> &{" "}
              <strong className="text-white">enterprise IT projects</strong>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">
              <FaWhatsapp size={16} /> WhatsApp Us
            </a>
            <a href="mailto:contact@serverwale.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              <Mail size={15} /> Email Us
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6 pt-6 border-t border-blue-900/30 flex flex-wrap gap-4 justify-center md:justify-start">
          {["🏆 500+ Enterprise Clients", "🔒 ISO 27001 Security", "📦 1-Year Hardware Warranty", "🚚 Pan-India Delivery", "⚡ 48hr Deployment"].map((b, i) => (
            <span key={i} className="text-blue-300/80 text-xs font-semibold">{b}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════
           MOBILE STICKY CTA (STATIC)
      ════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-white border-t border-slate-200 px-4 py-3 flex gap-3">
        <a href="https://wa.me/919999656064" target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold text-sm transition">
          <FaWhatsapp size={16} /> Ask IT Expert
        </a>
        <Link to="/product"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1E293B] transition">
          View Servers <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
};

export default BlogPage;
