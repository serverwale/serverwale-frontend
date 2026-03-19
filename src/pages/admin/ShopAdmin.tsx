import React, { useEffect, useState, useCallback } from "react";
import {
  Plus, Pencil, Trash2, X, Search, Star, Package,
  Image, Video, ImagePlus, FolderOpen, ChevronRight,
  LayoutGrid, Tag, Calendar, AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

const STOCK_OPTIONS = [
  { value: "in_stock",     label: "In Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
  { value: "on_request",   label: "On Request" },
  { value: "customizable", label: "Customizable" },
];

const BADGE_OPTIONS = [
  { value: "",             label: "No Badge" },
  { value: "best_seller",  label: "🏆 Best Seller" },
  { value: "new",          label: "✨ New Arrival" },
  { value: "limited_offer",label: "⏳ Limited Offer" },
  { value: "customizable", label: "🔧 Customizable" },
  { value: "featured",     label: "⭐ Featured" },
];

/* ─── TYPES ─────────────────────────────── */
interface ShopCategory {
  id: number; name: string; product_count: number; created_at: string;
}
interface ShopProduct {
  id: number; name: string; category: string; price: string;
  original_price: string; discount_percent: number; stock_status: string;
  image: string | null; images: string[]; is_featured: number;
  rating: number; review_count: number; badge?: string; video_url?: string;
  short_description?: string; full_description?: string;
  tags?: string[]; features?: string[]; specifications?: Record<string,string>;
  warranty?: string; slug?: string;
}

/* ─── EMPTY FORM ────────────────────────── */
const emptyForm = () => ({
  name: "", slug: "", short_description: "", full_description: "",
  price: "", original_price: "", discount_percent: "0",
  category: "", tags: "", features: "",
  specifications: "", warranty: "", stock_status: "in_stock",
  is_featured: "0", badge: "", video_url: "",
});

/* ═══════════════════════════════════════════
   CATEGORY MANAGER SECTION
═══════════════════════════════════════════ */
const CategoryManager = ({
  categories,
  onRefresh,
  onViewProducts,
  selectedCategory,
}: {
  categories: ShopCategory[];
  onRefresh: () => void;
  onViewProducts: (cat: ShopCategory | null) => void;
  selectedCategory: ShopCategory | null;
}) => {
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const addCategory = async () => {
    if (!newName.trim()) return;
    setSaving(true); setErr("");
    try {
      const r = await fetch(`${API}/api/shop-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const d = await r.json();
      if (d.success) { setNewName(""); onRefresh(); }
      else setErr(d.error || "Failed");
    } catch { setErr("Network error"); }
    setSaving(false);
  };

  const saveEdit = async () => {
    if (!editName.trim() || !editId) return;
    setSaving(true); setErr("");
    try {
      const r = await fetch(`${API}/api/shop-categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const d = await r.json();
      if (d.success) { setEditId(null); setEditName(""); onRefresh(); }
      else setErr(d.error || "Failed");
    } catch { setErr("Network error"); }
    setSaving(false);
  };

  const deleteCategory = async (cat: ShopCategory) => {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    try {
      const r = await fetch(`${API}/api/shop-categories/${cat.id}`, { method: "DELETE" });
      const d = await r.json();
      if (d.success) onRefresh();
      else alert(d.error || "Cannot delete");
    } catch { alert("Network error"); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

      {/* LEFT: Add Category Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2 text-sm">
          <Tag size={16} className="text-[#0055E5]" /> Add New Category
        </h3>
        {err && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg mb-3 border border-red-200">
            <AlertCircle size={13} /> {err}
          </div>
        )}
        <div className="space-y-3">
          <input
            value={newName}
            onChange={e => { setNewName(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && addCategory()}
            placeholder="e.g. Storage, Workstations..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none"
          />
          <button
            onClick={addCategory}
            disabled={saving || !newName.trim()}
            className="w-full bg-[#0F172A] hover:bg-[#0044BB] text-white font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plus size={15} /> {saving ? "Adding..." : "Add Category"}
          </button>
        </div>

        {/* Edit inline form */}
        {editId && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-2 font-medium">Editing category:</p>
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && saveEdit()}
              className="w-full border border-[#0055E5] rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#0055E5]/20 outline-none mb-2"
            />
            <div className="flex gap-2">
              <button onClick={saveEdit} disabled={saving} className="flex-1 bg-[#0055E5] text-white text-xs font-semibold py-2 rounded-xl">
                {saving ? "..." : "Save"}
              </button>
              <button onClick={() => { setEditId(null); setEditName(""); }} className="flex-1 border border-slate-200 text-slate-600 text-xs font-semibold py-2 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Category List (2 cols span) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
            <LayoutGrid size={16} className="text-[#0055E5]" /> Categories
            <span className="ml-1 bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{categories.length}</span>
          </h3>
          <button onClick={() => onViewProducts(null)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${!selectedCategory ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            All Products
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {categories.map(cat => (
            <div key={cat.id} className={`flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition ${selectedCategory?.id === cat.id ? "bg-blue-50" : ""}`}>
              {/* Name + meta */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => onViewProducts(cat)}
                  className="text-sm font-semibold text-[#0F172A] hover:text-[#0055E5] transition truncate text-left"
                >
                  {cat.name}
                </button>
                <span className="shrink-0 bg-blue-50 text-[#0055E5] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cat.product_count} products
                </span>
              </div>

              {/* Meta + Actions */}
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} />
                  {new Date(cat.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short" })}
                </span>

                <button
                  onClick={() => onViewProducts(cat)}
                  title="View products in this category"
                  className="flex items-center gap-1 text-[10px] font-semibold text-[#0055E5] hover:text-[#0055E5] bg-blue-50 hover:bg-blue-100 px-2 py-1.5 rounded-lg transition"
                >
                  <FolderOpen size={12} /> View
                </button>
                <button
                  onClick={() => { setEditId(cat.id); setEditName(cat.name); setErr(""); }}
                  title="Edit category"
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-[#0055E5] transition"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteCategory(cat)}
                  title="Delete category"
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">No categories yet. Add one!</div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PRODUCT MODAL
═══════════════════════════════════════════ */
const ProductModal = ({
  product, categories, defaultCategory, onClose, onSaved
}: {
  product: ShopProduct | null;
  categories: ShopCategory[];
  defaultCategory?: string;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [form, setForm] = useState(emptyForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extraImageFiles, setExtraImageFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [extraPreviews, setExtraPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        short_description: product.short_description || "",
        full_description: product.full_description || "",
        price: product.price || "",
        original_price: product.original_price || "",
        discount_percent: String(product.discount_percent ?? "0"),
        category: product.category || "",
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
        features: Array.isArray(product.features) ? product.features.join(", ") : "",
        specifications: product.specifications ? JSON.stringify(product.specifications, null, 2) : "",
        warranty: product.warranty || "",
        stock_status: product.stock_status || "in_stock",
        is_featured: String(product.is_featured ?? "0"),
        badge: product.badge || "",
        video_url: product.video_url || "",
      });
      setPreview(product.image ? `${API}/${product.image}` : null);
      const extras = Array.isArray(product.images)
        ? product.images.filter(Boolean).map(img => `${API}/${img}`)
        : [];
      setExtraPreviews(extras);
    } else {
      const fresh = emptyForm();
      // Pre-fill category from defaultCategory (when adding from a category view)
      fresh.category = defaultCategory || (categories.length > 0 ? categories[0].name : "");
      setForm(fresh);
    }
  }, [product, categories, defaultCategory]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleExtraImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setExtraImageFiles(files);
    setExtraPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const removeExtraPreview = (idx: number) => {
    setExtraImageFiles(prev => prev.filter((_, i) => i !== idx));
    setExtraPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (imageFile) fd.append("image", imageFile);
    extraImageFiles.forEach((f: File) => fd.append("images", f));
    try {
      const url = product ? `${API}/api/shop-products/${product.id}` : `${API}/api/shop-products`;
      const method = product ? "PUT" : "POST";
      const res = await fetch(url, { method, body: fd });
      const data = await res.json();
      if (data.success) { onSaved(); onClose(); }
      else setError(data.error || "Failed to save");
    } catch { setError("Network error. Please try again."); }
    setSaving(false);
  };

  const inp = (label: string, key: keyof ReturnType<typeof emptyForm>, type = "text", ph = "") => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
        placeholder={ph} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-6 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#0F172A]">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2"><AlertCircle size={15}/>{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inp("Product Name *", "name", "text", "e.g. Dell PowerEdge R740")}
            {inp("Slug", "slug", "text", "auto-generated if empty")}
            {inp("Price (₹) *", "price", "text", "e.g. 1,85,000")}
            {inp("Original Price (₹)", "original_price", "text", "e.g. 3,20,000")}
            {inp("Discount %", "discount_percent", "number")}
            {inp("Warranty", "warranty", "text", "e.g. 1 Year Comprehensive")}
          </div>

          {/* Category, Stock, Badge, Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] outline-none">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stock Status</label>
              <select value={form.stock_status} onChange={e => setForm({...form, stock_status: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] outline-none">
                {STOCK_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Product Badge</label>
              <select value={form.badge} onChange={e => setForm({...form, badge: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] outline-none">
                {BADGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div className="flex items-center pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured === "1"}
                  onChange={e => setForm({...form, is_featured: e.target.checked ? "1" : "0"})} className="w-4 h-4 rounded" />
                <span className="text-sm font-medium text-slate-700">⭐ Mark as Featured</span>
              </label>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Short Description *</label>
            <textarea value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})}
              rows={2} placeholder="1-2 sentence summary"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Full Description{" "}
              <span className="font-normal text-[#0055E5] text-[10px] ml-1">✦ HTML supported — use &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;p&gt;, &lt;table&gt; for SEO-rich content</span>
            </label>
            <textarea value={form.full_description} onChange={e => setForm({...form, full_description: e.target.value})}
              rows={8}
              placeholder={`<h2>About This Product</h2>\n<p>Brief intro paragraph here...</p>\n\n<h3>Key Highlights</h3>\n<ul>\n  <li><strong>Processor:</strong> Intel Xeon E5-2680 v4</li>\n  <li><strong>RAM:</strong> 128GB DDR4 ECC</li>\n  <li><strong>Storage:</strong> 4 x 1.2TB SAS HDD</li>\n</ul>\n\n<h3>Why Choose This Server?</h3>\n<p>Ideal for data centers, virtualization, AI/ML workloads...</p>`}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none resize-y font-mono" />
            <p className="text-[10px] text-slate-400 mt-1">💡 HTML format me likho — headings, bullet lists, bold text — sab shop page pe render hoga.</p>
          </div>

          {/* Tags & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                placeholder="GPU, AI, Refurbished" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Features (comma separated)</label>
              <input value={form.features} onChange={e => setForm({...form, features: e.target.value})}
                placeholder="48GB VRAM, 10496 CUDA Cores" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] outline-none" />
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Specifications (JSON)</label>
            <textarea value={form.specifications} onChange={e => setForm({...form, specifications: e.target.value})}
              rows={3} placeholder='{"GPU": "NVIDIA RTX A6000", "VRAM": "48GB"}'
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:border-[#0055E5] outline-none resize-none" />
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
              <Image size={13} /> Main Image <span className="text-slate-400 font-normal">(shown on card)</span>
            </label>
            <div className="flex items-start gap-4">
              {preview && (
                <div className="relative shrink-0">
                  <img src={preview} alt="preview" className="w-20 h-20 rounded-xl object-cover border-2 border-[#0055E5]" />
                  <span className="absolute -top-2 -right-2 bg-[#0055E5] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">MAIN</span>
                </div>
              )}
              <label className="flex-1 border-2 border-dashed border-slate-200 hover:border-[#0055E5] rounded-xl p-4 text-center cursor-pointer transition-all">
                <Image size={20} className="text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-500">{imageFile ? imageFile.name : "Click to upload main image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            </div>
          </div>

          {/* Extra Images */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
              <ImagePlus size={13} /> Extra Images <span className="text-slate-400 font-normal">(max 5)</span>
            </label>
            {extraPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {extraPreviews.map((src, idx) => (
                  <div key={idx} className="relative">
                    <img src={src} alt={`extra ${idx+1}`} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                    <button type="button" onClick={() => removeExtraPreview(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="w-full border-2 border-dashed border-slate-200 hover:border-[#0055E5] rounded-xl p-4 text-center cursor-pointer transition-all block">
              <ImagePlus size={20} className="text-slate-400 mx-auto mb-1" />
              <span className="text-xs text-slate-500">{extraImageFiles.length > 0 ? `${extraImageFiles.length} selected` : "Select up to 5 extra images"}</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleExtraImages} />
            </label>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
              <Video size={13} /> Video URL <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input type="url" value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-[#0055E5] focus:ring-2 focus:ring-[#0055E5]/20 outline-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 rounded-xl text-sm transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-[#0F172A] hover:bg-[#0044BB] text-white font-semibold py-2.5 rounded-xl text-sm transition disabled:opacity-60">
              {saving ? "Saving..." : product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════════ */
const ShopAdmin: React.FC = () => {
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<ShopProduct | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | null>(null);

  const loadCategories = useCallback(async () => {
    const r = await fetch(`${API}/api/shop-categories`);
    const d = await r.json();
    setCategories(d);
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const url = selectedCategory
      ? `${API}/api/shop-products?category=${encodeURIComponent(selectedCategory.name)}`
      : `${API}/api/shop-products`;
    const r = await fetch(url);
    const d = await r.json();
    setProducts(d);
    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => { loadCategories(); }, [loadCategories]);
  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleDelete = async (p: ShopProduct) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    setDeleting(p.id);
    await fetch(`${API}/api/shop-products/${p.id}`, { method: "DELETE" });
    loadProducts();
    loadCategories();
    setDeleting(null);
  };

  const handleRefreshAll = () => { loadCategories(); loadProducts(); };

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  const STOCK_COLORS: Record<string, string> = {
    in_stock:     "bg-green-100 text-green-700",
    out_of_stock: "bg-red-100 text-red-700",
    on_request:   "bg-yellow-100 text-yellow-700",
    customizable: "bg-slate-100 text-slate-700",
  };

  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0F172A]">Shop Management</h1>
            <p className="text-slate-500 text-sm mt-1">{categories.length} categories · {totalProducts} products</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-sm text-slate-500 hover:text-[#0055E5] transition">← Dashboard</Link>
            <button onClick={() => { setEditProduct(null); setShowModal(true); }}
              className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#0044BB] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-300">
              <Plus size={16} /> {selectedCategory ? `Add to "${selectedCategory.name}"` : "Add Product"}
            </button>
          </div>
        </div>

        {/* ── CATEGORY MANAGER ── */}
        <CategoryManager
          categories={categories}
          onRefresh={handleRefreshAll}
          onViewProducts={cat => { setSelectedCategory(cat); setSearch(""); }}
          selectedCategory={selectedCategory}
        />

        {/* ── PRODUCTS TABLE ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <h2 className="font-bold text-[#0F172A] text-sm">
                {selectedCategory ? (
                  <span className="flex items-center gap-2">
                    <button onClick={() => setSelectedCategory(null)} className="text-[#0055E5] hover:underline">All</button>
                    <ChevronRight size={14} className="text-slate-400" />
                    {selectedCategory.name}
                  </span>
                ) : "All Products"}
              </h2>
              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{filtered.length}</span>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#0055E5] outline-none w-56" />
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-400 text-sm">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center">
              <Package size={36} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Product</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Category</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Badge</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Price</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Stock</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Rating</th>
                    <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {p.image ? (
                            <img src={`${API}/${p.image}`} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                              <Package size={18} className="text-slate-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0F172A] line-clamp-1 text-sm">{p.name}</p>
                            {p.is_featured === 1 && <span className="text-[10px] text-[#0055E5] font-bold">⭐ Featured</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-sm">{p.category}</td>
                      <td className="px-5 py-4">
                        {(p as any).badge ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {(p as any).badge === "best_seller" ? "🏆 Best Seller" :
                             (p as any).badge === "new" ? "✨ New" :
                             (p as any).badge === "limited_offer" ? "⏳ Limited" :
                             (p as any).badge === "customizable" ? "🔧 Custom" :
                             (p as any).badge === "featured" ? "⭐ Featured" : (p as any).badge}
                          </span>
                        ) : <span className="text-slate-300 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-[#0F172A]">₹{p.price}</span>
                        {p.discount_percent > 0 && <span className="ml-1 text-xs text-red-500">-{p.discount_percent}%</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STOCK_COLORS[p.stock_status] || "bg-slate-100 text-slate-600"}`}>
                          {p.stock_status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-slate-700 text-sm">{p.rating}</span>
                          <span className="text-slate-400 text-xs">({p.review_count})</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => { setEditProduct(p); setShowModal(true); }}
                            className="flex items-center gap-1.5 bg-blue-50 hover:bg-[#0044BB] text-[#0055E5] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                            <Pencil size={12} /> Edit
                          </button>
                          <button onClick={() => handleDelete(p)} disabled={deleting === p.id}
                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50">
                            <Trash2 size={12} /> {deleting === p.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          categories={categories}
          defaultCategory={!editProduct && selectedCategory ? selectedCategory.name : undefined}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSaved={handleRefreshAll}
        />
      )}
    </div>
  );
};

export default ShopAdmin;
