import React, { useEffect, useState } from "react";
import {
  X, ImageIcon, Video, Link as LinkIcon, Upload,
  Tag, AlertCircle, Save, ChevronDown
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  tag: string;
  features: string | string[];
  image: string;
  category_id: number;
  video_url?: string;
};

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
};

const BADGE_OPTIONS = [
  { value: "",              label: "No Badge"      },
  { value: "Best Seller",   label: "🏆 Best Seller" },
  { value: "New Arrival",   label: "✨ New Arrival"  },
  { value: "Lowest Price",  label: "🔥 Lowest Price" },
  { value: "Customizable",  label: "🔧 Customizable" },
  { value: "Top Pick",      label: "⭐ Top Pick"     },
  { value: "Custom Order",  label: "📦 Custom Order" },
  { value: "In Stock",      label: "🟢 In Stock"    },
  { value: "On Request",    label: "🟡 On Request"  },
];

const API = "http://localhost:5000";

const ImageSlot = ({
  label, file, preview, existing, onChange, onClear,
}: {
  label: string; file: File | null; preview: string | null; existing?: string;
  onChange: (f: File) => void; onClear: () => void;
}) => {
  const shown = preview || (existing ? `${API}/${existing}` : null);
  return (
    <div className="relative">
      <label className={`block border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-all
        ${shown ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}
        style={{ height: 110 }}
      >
        {shown ? (
          <img src={shown} className="w-full h-full object-cover" alt="" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1.5 text-slate-400">
            <ImageIcon size={20} />
            <span className="text-[10px] font-semibold text-center px-1">{label}</span>
          </div>
        )}
        <input type="file" hidden accept="image/*" onChange={e => e.target.files?.[0] && onChange(e.target.files[0])} />
      </label>
      {shown && (
        <button onClick={onClear}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition">
          <X size={10} />
        </button>
      )}
    </div>
  );
};

const EditProduct: React.FC<Props> = ({ product, onClose, onSuccess }) => {
  const [title,       setTitle]       = useState(product.title || "");
  const [description, setDescription] = useState(product.description || "");
  const [tag,         setTag]         = useState(product.tag || "");
  const [features,    setFeatures]    = useState(
    Array.isArray(product.features) ? product.features.join(", ") : (product.features || "")
  );
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  /* main image */
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPrev, setMainPrev] = useState<string | null>(null);

  /* extra images */
  const [extras,   setExtras]   = useState<(File | null)[]>([null, null, null, null]);
  const [extPrevs, setExtPrevs] = useState<(string | null)[]>([null, null, null, null]);

  /* video */
  const [videoMode, setVideoMode] = useState<"url" | "file">("url");
  const [videoUrl,  setVideoUrl]  = useState(product.video_url || "");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPrev, setVideoPrev] = useState<string | null>(null);

  /* fetch existing extra images */
  const [existingExtras, setExistingExtras] = useState<string[]>([]);
  useEffect(() => {
    fetch(`${API}/api/products/${product.id}`)
      .then(r => r.json())
      .then(d => {
        if (d?.images) setExistingExtras(d.images.map((img: any) => img.image));
        if (d?.product?.video_url) setVideoUrl(d.product.video_url || "");
      })
      .catch(() => {});
  }, [product.id]);

  const setMain = (f: File) => { setMainFile(f); setMainPrev(URL.createObjectURL(f)); };
  const clearMain = () => { mainPrev?.startsWith("blob:") && URL.revokeObjectURL(mainPrev); setMainFile(null); setMainPrev(null); };

  const setExtra = (i: number, f: File) => {
    const e = [...extras]; const p = [...extPrevs];
    p[i]?.startsWith("blob:") && URL.revokeObjectURL(p[i]!);
    e[i] = f; p[i] = URL.createObjectURL(f); setExtras(e); setExtPrevs(p);
  };
  const clearExtra = (i: number) => {
    const e = [...extras]; const p = [...extPrevs];
    p[i]?.startsWith("blob:") && URL.revokeObjectURL(p[i]!);
    e[i] = null; p[i] = null; setExtras(e); setExtPrevs(p);
  };

  const setVidFile = (f: File) => { setVideoFile(f); setVideoPrev(URL.createObjectURL(f)); };
  const clearVid = () => { videoPrev?.startsWith("blob:") && URL.revokeObjectURL(videoPrev); setVideoFile(null); setVideoPrev(null); };

  const handleUpdate = async () => {
    if (!title.trim()) { setError("Product title is required"); return; }
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("description", description);
      fd.append("tag", tag);
      fd.append("features", features);
      if (mainFile) fd.append("image", mainFile);
      extras.forEach(f => f && fd.append("extras", f));
      if (videoMode === "url") fd.append("video_url", videoUrl.trim());
      if (videoMode === "file" && videoFile) fd.append("video", videoFile);

      const res  = await fetch(`${API}/api/products/${product.id}`, { method: "PUT", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      onSuccess();
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4 pt-8">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative mb-8">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-800">Edit Product</h2>
            <p className="text-slate-500 text-sm truncate max-w-xs">{product.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition">
            <X size={16} className="text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <SectionLabel icon={Tag} label="Basic Information" />
            <Field label="Product Title *">
              <input value={title} onChange={e => setTitle(e.target.value)} className={Input} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Badge">
                <div className="relative">
                  <select value={tag} onChange={e => setTag(e.target.value)} className={Input + " appearance-none pr-9"}>
                    {BADGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Features (comma-separated)">
                <input value={features} onChange={e => setFeatures(e.target.value)} className={Input}
                  placeholder="32GB RAM, 2×Xeon, 1TB SSD" />
              </Field>
            </div>
            <Field label="Description (HTML supported)" hint="HTML tags like <strong>, <ul>, <li> will render on the frontend">
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                rows={5} className={Input} />
            </Field>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <SectionLabel icon={ImageIcon} label="Product Images" />
            <p className="text-xs text-slate-500">Leave empty to keep existing images</p>
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Main Image</p>
                <ImageSlot label="Click to change" file={mainFile} preview={mainPrev}
                  existing={product.image} onChange={setMain} onClear={clearMain} />
              </div>
              <div className="col-span-3">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Extra Images (up to 4)</p>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1, 2, 3].map(i => (
                    <ImageSlot key={i} label={`Extra ${i + 1}`} file={extras[i]} preview={extPrevs[i]}
                      existing={existingExtras[i]} onChange={f => setExtra(i, f)} onClear={() => clearExtra(i)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="space-y-3">
            <SectionLabel icon={Video} label="Product Video (Optional)" />
            <div className="flex gap-2 mb-3">
              {(["url", "file"] as const).map(m => (
                <button key={m} onClick={() => setVideoMode(m)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition
                    ${videoMode === m ? "bg-[#0F172A] text-white border-[#08152E]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0055E5]/40"}`}>
                  {m === "url" ? <span className="flex items-center gap-1"><LinkIcon size={11} /> URL</span>
                               : <span className="flex items-center gap-1"><Upload size={11} /> Upload PC</span>}
                </button>
              ))}
            </div>
            {videoMode === "url" ? (
              <Field label="Video URL" hint="YouTube, Vimeo, or direct video link">
                <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..." className={Input} />
              </Field>
            ) : (
              <label className={`block border-2 border-dashed rounded-xl cursor-pointer p-4 text-center transition
                ${videoPrev ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}>
                {videoPrev ? (
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-[#0055E5] shrink-0" />
                    <span className="text-sm font-semibold text-[#0055E5] truncate">{videoFile?.name}</span>
                    <button type="button" onClick={e => { e.preventDefault(); clearVid(); }} className="ml-auto text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Video size={24} />
                    <span className="text-sm">Click to upload video (MP4, MOV, WebM · max 200MB)</span>
                  </div>
                )}
                <input type="file" hidden accept="video/*" onChange={e => e.target.files?.[0] && setVidFile(e.target.files[0])} />
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white transition">
            Cancel
          </button>
          <button onClick={handleUpdate} disabled={loading}
            className="px-7 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60 text-white font-black text-sm transition flex items-center gap-2">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating…</>
            ) : (
              <><Save size={15} /> Update Product</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* helpers */
const Input = "w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3.5 py-2.5 rounded-xl text-sm bg-white transition";

const SectionLabel = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
    <Icon size={15} className="text-blue-500" />
    <h3 className="font-black text-slate-700 text-sm uppercase tracking-wider">{label}</h3>
  </div>
);

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5 block">{label}</label>
    {children}
    {hint && <p className="text-[10px] text-slate-400 mt-1">{hint}</p>}
  </div>
);

export default EditProduct;
