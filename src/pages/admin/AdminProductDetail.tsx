import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  ChevronLeft, Save, Plus, Trash2, Image as ImageIcon,
  FileText, Settings, HelpCircle, Star, Shield, Package,
  CheckCircle, AlertCircle, Loader2, Upload, X
} from "lucide-react";

/* ── TYPES ── */
type Product = { id: number; title: string; tag: string; category_id: number; image?: string; };
type Description = { short_description: string; long_description_1: string; long_description_2: string; long_description_3: string; };
type Spec = { spec_key: string; spec_value: string; };
type FAQ  = { question: string; answer: string; };
type Review = { company_name: string; rating: number; review: string; };

/* ── TOAST ── */
type Toast = { type: "ok" | "err"; msg: string };
const Toast = ({ t, onClose }: { t: Toast; onClose: () => void }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold transition-all
    ${t.type === "ok" ? "bg-blue-50" : "bg-red-600"}`}>
    {t.type === "ok" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    {t.msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
  </div>
);

const API_BASE = "http://localhost:5000";

const AdminProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,  setLoading]  = useState(true);
  const [product,  setProduct]  = useState<Product | null>(null);
  const [toast,    setToast]    = useState<Toast | null>(null);

  const [description,    setDescription]    = useState<Description>({ short_description: "", long_description_1: "", long_description_2: "", long_description_3: "" });
  const [specifications, setSpecifications] = useState<Spec[]>([]);
  const [faqs,           setFaqs]           = useState<FAQ[]>([]);
  const [reviews,        setReviews]        = useState<Review[]>([]);
  const [warranty,       setWarranty]       = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);

  /* image state */
  const [mainFile,   setMainFile]   = useState<File | null>(null);
  const [mainPrev,   setMainPrev]   = useState<string | null>(null);
  const [extraFiles, setExtraFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [extraPrevs, setExtraPrevs] = useState<(string | null)[]>([null, null, null, null]);

  const [savingSection, setSavingSection] = useState<string | null>(null);

  const ok  = (msg: string) => setToast({ type: "ok",  msg });
  const err = (msg: string) => setToast({ type: "err", msg });

  /* ── LOAD ── */
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (!res.data?.product?.id) { alert("Product not found"); navigate(-1); return; }
        setProduct(res.data.product);
        setDescription(res.data.description || { short_description: "", long_description_1: "", long_description_2: "", long_description_3: "" });
        setSpecifications(res.data.specifications || []);
        setFaqs(res.data.faqs || []);
        setReviews(res.data.reviews || []);
        setWarranty(res.data.warranty || "");
        setExistingImages((res.data.images || []).map((img: any) => img.image));
      } catch { err("Failed to load product"); }
      finally { setLoading(false); }
    })();
  }, [id, navigate]);

  /* ── SAVE BASIC ── */
  const saveBasic = async () => {
    if (!product) return;
    setSavingSection("basic");
    try {
      await api.put(`/products/${product.id}`, { title: product.title, tag: product.tag });
      ok("Basic info saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE IMAGES ── */
  const saveImages = async () => {
    if (!product?.id) { err("Save basic info first"); return; }
    const hasMain  = !!mainFile;
    const hasExtra = extraFiles.some(Boolean);
    if (!hasMain && !hasExtra) { err("Select at least one image"); return; }
    setSavingSection("images");
    try {
      const fd = new FormData();
      if (mainFile) fd.append("main", mainFile);
      extraFiles.forEach(f => f && fd.append("extras", f));
      await api.post(`/products/${product.id}/images`, fd);
      ok("Images uploaded!");
      setMainFile(null); setMainPrev(null);
      setExtraFiles([null,null,null,null]); setExtraPrevs([null,null,null,null]);
      /* refresh existing */
      const res = await api.get(`/products/${product.id}`);
      setExistingImages((res.data.images || []).map((img: any) => img.image));
    } catch (e: any) {
      err("Image upload failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE DESCRIPTION ── */
  const saveDescription = async () => {
    if (!product) return;
    setSavingSection("desc");
    try {
      await api.post("/product-descriptions", { product_id: product.id, ...description });
      ok("Description saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE SPECS ── */
  const saveSpecifications = async () => {
    if (!product) return;
    const clean = specifications.filter(s => s.spec_key.trim() && s.spec_value.trim());
    if (!clean.length) { err("Add at least one specification"); return; }
    setSavingSection("specs");
    try {
      await api.post("/product-specifications/bulk", { product_id: product.id, specifications: clean });
      ok("Specifications saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE FAQs ── */
  const saveFaqs = async () => {
    if (!product) return;
    setSavingSection("faqs");
    try {
      await api.post("/product-faqs/bulk", { product_id: product.id, faqs });
      ok("FAQs saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE WARRANTY ── */
  const saveWarranty = async () => {
    if (!product) return;
    setSavingSection("warranty");
    try {
      await api.post("/product-warranty", { product_id: product.id, warranty_text: warranty });
      ok("Warranty saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── SAVE REVIEWS ── */
  const saveReviews = async () => {
    if (!product) return;
    setSavingSection("reviews");
    try {
      await api.post("/product-reviews/bulk", { product_id: product.id, reviews });
      ok("Reviews saved!");
    } catch (e: any) {
      err("Save failed: " + (e.response?.data?.error || e.message));
    } finally { setSavingSection(null); }
  };

  /* ── image helpers ── */
  const setMain = (f: File) => { setMainFile(f); setMainPrev(URL.createObjectURL(f)); };
  const clearMain = () => { mainPrev?.startsWith("blob:") && URL.revokeObjectURL(mainPrev); setMainFile(null); setMainPrev(null); };
  const setExtra = (i: number, f: File) => {
    const ef = [...extraFiles]; const ep = [...extraPrevs];
    ep[i]?.startsWith("blob:") && URL.revokeObjectURL(ep[i]!);
    ef[i] = f; ep[i] = URL.createObjectURL(f); setExtraFiles(ef); setExtraPrevs(ep);
  };
  const clearExtra = (i: number) => {
    const ef = [...extraFiles]; const ep = [...extraPrevs];
    ep[i]?.startsWith("blob:") && URL.revokeObjectURL(ep[i]!);
    ef[i] = null; ep[i] = null; setExtraFiles(ef); setExtraPrevs(ep);
  };

  /* ── LOADING ── */
  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-500">
        <Loader2 size={24} className="animate-spin text-blue-500" />
        <span className="font-medium">Loading product...</span>
      </div>
    </div>
  );
  if (!product) return null;

  /* ── UI ── */
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {toast && <Toast t={toast} onClose={() => setToast(null)} />}

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition text-sm">
            <ChevronLeft size={16} /> Back to Products
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Package size={28} className="text-blue-300" />
            </div>
            <div>
              <h1 className="text-2xl font-black">{product.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                {product.tag && (
                  <span className="bg-[#0055E5]/30 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                )}
                <span className="text-slate-400 text-xs">ID: {product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* ══ 1. BASIC INFO ══ */}
        <Card icon={Settings} title="Basic Information" saving={savingSection === "basic"} onSave={saveBasic}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Product Title *">
              <input className={Input} value={product.title}
                onChange={e => setProduct({ ...product, title: e.target.value })} />
            </Field>
            <Field label="Badge / Tag">
              <input className={Input} value={product.tag}
                onChange={e => setProduct({ ...product, tag: e.target.value })}
                placeholder="e.g. Best Seller, New Arrival" />
            </Field>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            💡 To edit <strong>features</strong> or <strong>description</strong>, use the sections below.
          </p>
        </Card>

        {/* ══ 2. IMAGES ══ */}
        <Card icon={ImageIcon} title="Product Images" saving={savingSection === "images"} onSave={saveImages}>
          {/* existing */}
          {existingImages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-black text-slate-500 uppercase mb-2">Current Images</p>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((img, i) => (
                  <img key={i} src={`${API_BASE}/${img}`} alt=""
                    className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200" />
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-5 gap-3">
            {/* Main */}
            <div className="col-span-2">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Main Image</p>
              <ImgSlot label="Click to upload" file={mainFile} preview={mainPrev}
                existing={product.image} onChange={setMain} onClear={clearMain} />
            </div>
            {/* Extras */}
            <div className="col-span-3">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1.5">Extra Images (up to 4)</p>
              <div className="grid grid-cols-2 gap-2">
                {([0,1,2,3] as const).map(i => (
                  <ImgSlot key={i} label={`Extra ${i+1}`} file={extraFiles[i]} preview={extraPrevs[i]}
                    existing={existingImages[i+1]} onChange={f => setExtra(i, f)} onClear={() => clearExtra(i)} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ══ 3. DESCRIPTION ══ */}
        <Card icon={FileText} title="Description" saving={savingSection === "desc"} onSave={saveDescription}>
          <Field label="Short Description">
            <textarea className={Input} rows={2} value={description.short_description}
              onChange={e => setDescription({ ...description, short_description: e.target.value })}
              placeholder="2-3 sentence overview shown in search results" />
          </Field>
          {(["1","2","3"] as const).map(n => (
            <Field key={n} label={`Long Description ${n}`}>
              <textarea className={Input} rows={4} value={(description as any)[`long_description_${n}`]}
                onChange={e => setDescription({ ...description, [`long_description_${n}`]: e.target.value } as Description)}
                placeholder={`Detailed section ${n} — HTML tags like <strong>, <ul>, <li> are supported`} />
            </Field>
          ))}
          <p className="text-xs text-slate-400">💡 HTML tags are supported and will render on the product page</p>
        </Card>

        {/* ══ 4. SPECIFICATIONS ══ */}
        <Card icon={Settings} title="Specifications" saving={savingSection === "specs"} onSave={saveSpecifications}>
          <div className="space-y-2">
            {specifications.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className={Input + " flex-1"} value={s.spec_key} placeholder="Key (e.g. RAM)"
                  onChange={e => { const c=[...specifications]; c[i].spec_key=e.target.value; setSpecifications(c); }} />
                <input className={Input + " flex-1"} value={s.spec_value} placeholder="Value (e.g. 32GB DDR4)"
                  onChange={e => { const c=[...specifications]; c[i].spec_value=e.target.value; setSpecifications(c); }} />
                <button onClick={() => setSpecifications(prev => prev.filter((_,j)=>j!==i))}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setSpecifications([...specifications, { spec_key: "", spec_value: "" }])}
            className="flex items-center gap-2 text-[#0055E5] hover:text-blue-800 text-sm font-semibold mt-2 transition">
            <Plus size={15} /> Add Specification
          </button>
        </Card>

        {/* ══ 5. FAQs ══ */}
        <Card icon={HelpCircle} title="FAQs" saving={savingSection === "faqs"} onSave={saveFaqs}>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-2 relative">
                <button onClick={() => setFaqs(prev => prev.filter((_,j)=>j!==i))}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition">
                  <Trash2 size={14} />
                </button>
                <input className={Input} value={f.question} placeholder="Question"
                  onChange={e => { const c=[...faqs]; c[i].question=e.target.value; setFaqs(c); }} />
                <textarea className={Input} rows={2} value={f.answer} placeholder="Answer"
                  onChange={e => { const c=[...faqs]; c[i].answer=e.target.value; setFaqs(c); }} />
              </div>
            ))}
          </div>
          <button onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
            className="flex items-center gap-2 text-[#0055E5] hover:text-blue-800 text-sm font-semibold mt-2 transition">
            <Plus size={15} /> Add FAQ
          </button>
        </Card>

        {/* ══ 6. WARRANTY ══ */}
        <Card icon={Shield} title="Warranty Information" saving={savingSection === "warranty"} onSave={saveWarranty}>
          <textarea className={Input} rows={4} value={warranty}
            onChange={e => setWarranty(e.target.value)}
            placeholder="e.g. 1 Year Onsite Warranty. Covers hardware defects, parts replacement, and technical support." />
        </Card>

        {/* ══ 7. REVIEWS ══ */}
        <Card icon={Star} title="Customer Reviews" saving={savingSection === "reviews"} onSave={saveReviews}>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 relative">
                <button onClick={() => setReviews(prev => prev.filter((_,j)=>j!==i))}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition">
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <input className={Input} value={r.company_name} placeholder="Company name"
                    onChange={e => { const c=[...reviews]; c[i].company_name=e.target.value; setReviews(c); }} />
                  <select className={Input} value={r.rating}
                    onChange={e => { const c=[...reviews]; c[i].rating=Number(e.target.value); setReviews(c); }}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                  </select>
                </div>
                <textarea className={Input} rows={2} value={r.review} placeholder="Review text"
                  onChange={e => { const c=[...reviews]; c[i].review=e.target.value; setReviews(c); }} />
              </div>
            ))}
          </div>
          <button onClick={() => setReviews([...reviews, { company_name: "", rating: 5, review: "" }])}
            className="flex items-center gap-2 text-[#0055E5] hover:text-blue-800 text-sm font-semibold mt-2 transition">
            <Plus size={15} /> Add Review
          </button>
        </Card>

      </div>
    </div>
  );
};

/* ── HELPERS ── */

const Input = "w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3.5 py-2.5 rounded-xl text-sm bg-white transition resize-none";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5 block">{label}</label>
    {children}
  </div>
);

const Card = ({ icon: Icon, title, saving, onSave, children }: {
  icon: any; title: string; saving: boolean; onSave: () => void; children: React.ReactNode;
}) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
          <Icon size={16} className="text-[#0055E5]" />
        </div>
        <h3 className="font-black text-slate-800 text-sm">{title}</h3>
      </div>
      <button onClick={onSave} disabled={saving}
        className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60 text-white px-5 py-2 rounded-xl text-xs font-black transition">
        {saving ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : <><Save size={13} /> Save</>}
      </button>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const ImgSlot = ({ label, file, preview, existing, onChange, onClear }: {
  label: string; file: File | null; preview: string | null; existing?: string;
  onChange: (f: File) => void; onClear: () => void;
}) => {
  const shown = preview || (existing ? `${API_BASE}/${existing}` : null);
  return (
    <div className="relative">
      <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-all h-[110px]
        ${shown ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}`}>
        {shown ? (
          <img src={shown} className="w-full h-full object-cover" alt="" />
        ) : (
          <>
            <Upload size={18} className="text-slate-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-semibold text-center px-1">{label}</span>
          </>
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

export default AdminProductDetail;
