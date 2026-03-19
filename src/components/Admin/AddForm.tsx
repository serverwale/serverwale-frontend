import React, { useEffect, useRef, useState } from "react";
import {
  X, ImageIcon, Plus, Trash2, Video, Link as LinkIcon,
  Upload, Tag, AlertCircle, CheckCircle, ChevronDown
} from "lucide-react";

type Props = {
  categoryId: number;
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

/* ── single image picker ── */
const ImageSlot = ({
  label, file, preview, onChange, onClear,
}: {
  label: string; file: File | null; preview: string | null;
  onChange: (f: File) => void; onClear: () => void;
}) => (
  <div className="relative">
    <label className={`block border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-all
      ${preview ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}
      style={{ height: 120 }}
    >
      {preview ? (
        <img src={preview} className="w-full h-full object-cover" alt="" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-1.5 text-slate-400">
          <ImageIcon size={22} />
          <span className="text-[10px] font-semibold text-center px-1">{label}</span>
        </div>
      )}
      <input type="file" hidden accept="image/*" onChange={e => e.target.files?.[0] && onChange(e.target.files[0])} />
    </label>
    {preview && (
      <button onClick={onClear}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition">
        <X size={11} />
      </button>
    )}
  </div>
);

const AddForm: React.FC<Props> = ({ categoryId, onClose, onSuccess }) => {
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [tag,         setTag]         = useState("");       // badge
  const [features,    setFeatures]    = useState("");
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  /* images */
  const [mainFile,    setMainFile]    = useState<File | null>(null);
  const [mainPrev,    setMainPrev]    = useState<string | null>(null);
  const [extras,      setExtras]      = useState<(File | null)[]>([null, null, null, null]);
  const [extPrevs,    setExtPrevs]    = useState<(string | null)[]>([null, null, null, null]);

  /* video */
  const [videoMode,   setVideoMode]   = useState<"url" | "file">("url");
  const [videoUrl,    setVideoUrl]    = useState("");
  const [videoFile,   setVideoFile]   = useState<File | null>(null);
  const [videoPrev,   setVideoPrev]   = useState<string | null>(null);

  /* revoke blobs */
  useEffect(() => () => {
    [mainPrev, ...extPrevs, videoPrev].forEach(u => u?.startsWith("blob:") && URL.revokeObjectURL(u));
  }, []);

  const setMain = (f: File) => { setMainFile(f); setMainPrev(URL.createObjectURL(f)); };
  const clearMain = () => { mainPrev?.startsWith("blob:") && URL.revokeObjectURL(mainPrev); setMainFile(null); setMainPrev(null); };

  const setExtra = (i: number, f: File) => {
    const e = [...extras]; const p = [...extPrevs];
    p[i]?.startsWith("blob:") && URL.revokeObjectURL(p[i]!);
    e[i] = f; p[i] = URL.createObjectURL(f);
    setExtras(e); setExtPrevs(p);
  };
  const clearExtra = (i: number) => {
    const e = [...extras]; const p = [...extPrevs];
    p[i]?.startsWith("blob:") && URL.revokeObjectURL(p[i]!);
    e[i] = null; p[i] = null;
    setExtras(e); setExtPrevs(p);
  };

  const setVidFile = (f: File) => { setVideoFile(f); setVideoPrev(URL.createObjectURL(f)); };
  const clearVid = () => { videoPrev?.startsWith("blob:") && URL.revokeObjectURL(videoPrev); setVideoFile(null); setVideoPrev(null); };

  const handleSubmit = async () => {
    if (!title.trim()) { setError("Product title is required"); return; }
    setLoading(true); setError("");

    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("description", description);
      fd.append("tag", tag);
      fd.append("features", features);
      fd.append("category_id", String(categoryId));
      if (mainFile) fd.append("image", mainFile);
      extras.forEach(f => f && fd.append("extras", f));
      if (videoMode === "url" && videoUrl.trim()) fd.append("video_url", videoUrl.trim());
      if (videoMode === "file" && videoFile) fd.append("video", videoFile);

      const res  = await fetch(`${API}/api/products`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
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
            <h2 className="text-xl font-black text-slate-800">Add New Product</h2>
            <p className="text-slate-500 text-sm">Fill in the details below. Fields marked * are required.</p>
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

          {/* ── Basic Info ── */}
          <div className="space-y-4">
            <SectionLabel icon={Tag} label="Basic Information" />
            <Field label="Product Title *" hint="Full name as shown on listing">
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. HP ProLiant DL380 Gen9 2U Rack Server"
                className={Input} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Badge" hint="Shown on product card">
                <div className="relative">
                  <select value={tag} onChange={e => setTag(e.target.value)} className={Input + " appearance-none pr-9"}>
                    {BADGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Features / Specs" hint="Comma-separated tags">
                <input value={features} onChange={e => setFeatures(e.target.value)}
                  placeholder="e.g. 32GB RAM, 2×Xeon, 1TB SSD"
                  className={Input} />
              </Field>
            </div>

            <Field label="Description (HTML supported)" hint="<strong>, <ul>, <li>, <br> etc. will render on the frontend">
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Enter full product description. You can use HTML tags for formatting."
                rows={5} className={Input} />
              <p className="text-xs text-slate-400 mt-1">💡 HTML tags are supported — they will render properly on the product page.</p>
            </Field>
          </div>

          {/* ── Images ── */}
          <div className="space-y-3">
            <SectionLabel icon={ImageIcon} label="Product Images" />
            <p className="text-xs text-slate-500">1 main image (required) + up to 4 extra images (optional)</p>
            <div className="grid grid-cols-5 gap-3">
              {/* Main */}
              <div className="col-span-2">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Main Image *</p>
                <ImageSlot label="Click to upload main image" file={mainFile} preview={mainPrev} onChange={setMain} onClear={clearMain} />
              </div>
              {/* Extras */}
              <div className="col-span-3">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Extra Images (up to 4)</p>
                <div className="grid grid-cols-2 gap-2">
                  {extras.map((_, i) => (
                    <ImageSlot key={i} label={`Extra ${i + 1}`} file={extras[i]} preview={extPrevs[i]}
                      onChange={f => setExtra(i, f)} onClear={() => clearExtra(i)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Video ── */}
          <div className="space-y-3">
            <SectionLabel icon={Video} label="Product Video (Optional)" />
            <div className="flex gap-2 mb-3">
              {(["url", "file"] as const).map(m => (
                <button key={m} onClick={() => setVideoMode(m)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition
                    ${videoMode === m ? "bg-[#0F172A] text-white border-[#08152E]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0055E5]/40"}`}>
                  {m === "url" ? <span className="flex items-center gap-1"><LinkIcon size={11} /> Paste URL</span>
                               : <span className="flex items-center gap-1"><Upload size={11} /> Upload from PC</span>}
                </button>
              ))}
            </div>

            {videoMode === "url" ? (
              <Field label="Video URL" hint="YouTube, Vimeo, or direct MP4 link">
                <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/... or https://..."
                  className={Input} />
              </Field>
            ) : (
              <div>
                <label className={`block border-2 border-dashed rounded-xl cursor-pointer p-5 text-center transition
                  ${videoPrev ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}>
                  {videoPrev ? (
                    <div className="flex items-center gap-3">
                      <Video size={20} className="text-[#0055E5] shrink-0" />
                      <span className="text-sm font-semibold text-[#0055E5] truncate">{videoFile?.name}</span>
                      <button type="button" onClick={e => { e.preventDefault(); clearVid(); }}
                        className="ml-auto text-red-500 hover:text-red-700">
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Video size={28} />
                      <span className="text-sm font-semibold">Click to upload video (MP4, MOV, WebM)</span>
                      <span className="text-xs">Max 200MB</span>
                    </div>
                  )}
                  <input type="file" hidden accept="video/*" onChange={e => e.target.files?.[0] && setVidFile(e.target.files[0])} />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-7 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60 text-white font-black text-sm transition flex items-center gap-2">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
            ) : (
              <><Plus size={16} /> Add Product</>
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

export default AddForm;
