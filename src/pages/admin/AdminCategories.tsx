import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import {
  Pencil, Trash2, Plus, X, Search, Layers, Package,
  ChevronLeft, AlertCircle, Tag, FolderOpen, Grid3x3
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  productCount: number;
};

const AdminCategories: React.FC = () => {
  const navigate = useNavigate();
  const [categories,   setCategories]   = useState<Category[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [showModal,    setShowModal]    = useState(false);
  const [catName,      setCatName]      = useState("");
  const [editingId,    setEditingId]    = useState<number | null>(null);
  const [saving,       setSaving]       = useState(false);
  const [err,          setErr]          = useState("");
  const [deleting,     setDeleting]     = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd  = () => { setCatName(""); setEditingId(null); setErr(""); setShowModal(true); };
  const openEdit = (c: Category) => { setCatName(c.name); setEditingId(c.id); setErr(""); setShowModal(true); };

  const handleSave = async () => {
    if (!catName.trim()) { setErr("Category name is required"); return; }
    setSaving(true); setErr("");
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, { name: catName });
        setCategories(prev => prev.map(c => c.id === editingId ? { ...c, name: catName } : c));
      } else {
        const res = await api.post("/categories", { name: catName });
        setCategories(prev => [...prev, res.data]);
      }
      setShowModal(false);
    } catch (e: any) {
      setErr(e.response?.data?.error || "Save failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category and all its products?")) return;
    setDeleting(id);
    try {
      await api.delete(`/categories/${id}`);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (e: any) {
      alert(e.response?.data?.error || "Delete failed");
    } finally { setDeleting(null); }
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const totalProducts = categories.reduce((s, c) => s + (c.productCount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ══ GRADIENT HERO ══ */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <button onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition text-sm">
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <Grid3x3 size={22} className="text-blue-300" />
                </div>
                <h1 className="text-2xl font-black">Product Categories</h1>
              </div>
              <p className="text-slate-400 text-sm">
                {categories.length} categories &nbsp;·&nbsp; {totalProducts} total products
              </p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#0055E5] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0">
              <Plus size={16} /> Add Category
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Categories",  value: categories.length,                                              icon: Layers,     color: "text-[#0055E5]   bg-blue-50   border-blue-200"   },
            { label: "Total Products",     value: totalProducts,                                                  icon: Package,    color: "text-green-600  bg-green-50  border-green-200"  },
            { label: "Avg per Category",   value: categories.length ? Math.round(totalProducts / categories.length) : 0, icon: Tag, color: "text-slate-600 bg-slate-50 border-slate-200" },
            { label: "Empty Categories",   value: categories.filter(c => !c.productCount).length,                icon: FolderOpen, color: "text-amber-600  bg-amber-50  border-amber-200"  },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className={`p-3 rounded-xl border ${s.color}`}><s.icon size={20} /></div>
              <div>
                <div className="text-2xl font-black text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH + COUNT ── */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search categories…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm transition"
            />
          </div>
          <span className="text-sm text-slate-500 shrink-0">{filtered.length} showing</span>
        </div>

        {/* ── TABLE VIEW ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-wider w-10">#</th>
                <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Category Name</th>
                <th className="px-5 py-3.5 text-center text-xs font-black text-slate-500 uppercase tracking-wider">Products</th>
                <th className="px-5 py-3.5 text-center text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t border-slate-100 animate-pulse">
                    <td className="px-5 py-4"><div className="h-3 w-6 bg-slate-200 rounded" /></td>
                    <td className="px-5 py-4"><div className="h-3 w-40 bg-slate-200 rounded" /></td>
                    <td className="px-5 py-4 text-center"><div className="h-5 w-14 bg-slate-200 rounded-full mx-auto" /></td>
                    <td className="px-5 py-4"><div className="h-8 w-32 bg-slate-200 rounded-xl mx-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-slate-400">
                    <Layers size={36} className="mx-auto mb-3 text-slate-300" />
                    <p className="font-semibold">No categories found</p>
                    <p className="text-xs mt-1">Try a different search or add a new category</p>
                  </td>
                </tr>
              ) : (
                filtered.map((cat, idx) => (
                  <tr key={cat.id} className="border-t border-slate-100 hover:bg-slate-50 transition group">
                    <td className="px-5 py-4 text-slate-400 text-xs font-bold">{idx + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg group-hover:bg-[#0044BB] group-hover:border-blue-600 transition-colors">
                          <Layers size={14} className="text-[#0055E5] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">{cat.name}</span>
                          <span className="text-slate-400 text-xs ml-2">ID: {cat.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-black px-3 py-1 rounded-full
                        ${cat.productCount > 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/admin/products?category_id=${cat.id}`}
                          className="flex items-center gap-1.5 bg-[#0F172A] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1E293B] transition">
                          <Package size={12} /> View Products
                        </Link>
                        <button onClick={() => openEdit(cat)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-[#0055E5]/40 text-slate-500 hover:text-[#0055E5] transition">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} disabled={deleting === cat.id}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-300 text-slate-500 hover:text-red-600 transition disabled:opacity-40">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add row at bottom */}
        <button onClick={openAdd}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-400 hover:text-[#0055E5] text-sm font-bold transition-all">
          <Plus size={16} /> Add New Category
        </button>

      </div>

      {/* ══ ADD / EDIT MODAL ══ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7 relative">
            <button onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition">
              <X size={15} className="text-slate-600" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0055E5] text-xs font-bold px-3 py-1 rounded-full mb-3">
                <Layers size={12} /> {editingId ? "EDIT" : "NEW"} CATEGORY
              </div>
              <h3 className="text-xl font-black text-slate-800">
                {editingId ? "Edit Category" : "Add New Category"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {editingId ? "Update the category name below." : "Enter a name for the new product category."}
              </p>
            </div>

            {err && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm">
                <AlertCircle size={15} /> {err}
              </div>
            )}

            <div className="mb-5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block">Category Name</label>
              <input
                type="text" value={catName} autoFocus
                onChange={e => setCatName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSave()}
                placeholder="e.g. Rack Servers, GPU Workstations…"
                className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-xl text-sm transition"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-60 text-white py-2.5 rounded-xl font-black text-sm transition flex items-center justify-center gap-2">
                {saving ? "Saving…" : editingId ? "Update" : <><Plus size={15} /> Add Category</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
