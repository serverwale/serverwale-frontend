import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, User, ChevronRight, Tag, ArrowLeft } from "lucide-react";

interface Blog {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  tags: string;
  created_at: string;
  slug: string;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/public/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const readTime = blog
    ? Math.max(3, Math.ceil((blog.content || "").replace(/<[^>]+>/g, "").split(/\s+/).length / 220))
    : 5;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">Loading article…</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-3">📄</div>
          <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
          <Link to="/blog" className="text-[#0055E5] hover:underline text-sm">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 font-sans min-h-screen">

      {/* ── HERO (same dark navy theme as all pages) ───── */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[420px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.20),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400 truncate max-w-[200px]">{blog.title}</span>
          </div>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full mb-4 w-fit">
            <Tag size={11} /> SERVERWALE BLOG
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4 max-w-3xl">
            {blog.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-[#0055E5]" />
              <span className="text-slate-300 font-medium">Serverwale Team</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0055E5]" />
              {new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#0055E5]" />
              {readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────── */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Featured image (if blog has one) */}
          {blog.image && (
            <div className="rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-lg aspect-[16/7]">
              <img
                src={blog.image.startsWith("http") ? blog.image : `http://localhost:5000${blog.image}`}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          {/* Tags */}
          {blog.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.split(",").map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-[#0055E5] rounded-full text-xs font-semibold border border-blue-100">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Blog content */}
          <article className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#0055E5] font-semibold text-sm hover:gap-3 transition-all"
            >
              <ArrowLeft size={15} /> Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
