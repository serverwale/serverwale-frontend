import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../../api";

import AddForm from "../../components/Admin/AddForm";
import EditProductModal from "../../components/Admin/EditProduct";

type Product = {
  id: number;
  title: string;
  features: string | string[];
  image: string;
  tag: string;
  category_id: number;
  created_at: string;
};

const API_BASE = "";

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const [search, setSearch] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const categoryId = Number(searchParams.get("category_id"));

  /* =========================
     LOAD PRODUCTS
  ========================= */
  useEffect(() => {
    if (!categoryId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .get(`/products?category_id=${categoryId}`)
      .then(res => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [categoryId]);

  /* =========================
     HELPERS
  ========================= */
  const normalizeFeatures = (f: string | string[]) =>
    Array.isArray(f) ? f.join(", ") : f || "";

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p =>
      [p.title, p.tag, normalizeFeatures(p.features)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [products, search]);

  const deleteProduct = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    const res = await api.get(`/products?category_id=${categoryId}`);
    setProducts(res.data);
  };

  useEffect(() => {
  if (!categoryId) return;

  api
    .get(`/categories/${categoryId}`)
    .then(res => {
      setCategoryName(res.data?.name || "");
    })
    .catch(() => setCategoryName(""));
}, [categoryId]);


  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
         <h1 className="text-3xl font-bold mb-2">
  {categoryName ? `${categoryName} Products` : "Products"}
</h1>


          {/* Breadcrumb */}
          <div className="text-sm text-slate-300">
            <Link to="/admin/categories" className="hover:underline">
              Categories
            </Link>
            <span className="mx-2">›</span>
            <span>Products</span>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#0055E5] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Tag</th>
                <th className="px-4 py-3 text-left">Features</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filteredProducts.map(p => (
                 <tr
  key={p.id}
  onDoubleClick={() => navigate(`/admin/products/${p.id}`)}
  title="Double click to open admin product detail"
  className="border-t hover:bg-slate-50 cursor-pointer"
>

                    <td className="px-4 py-3">
                      {p.image && (
                        <img
                          src={`${API_BASE}/${p.image}`}
                          alt={p.title}
                          className="w-12 h-12 rounded object-cover cursor-pointer hover:opacity-80"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(`${API_BASE}/${p.image}`);
                          }}
                        />
                      )}
                    </td>

                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3">{p.tag}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {normalizeFeatures(p.features)}
                    </td>
                    <td className="px-4 py-3">
                      {p.created_at?.split("T")[0]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(p);
                            setShowEditForm(true);
                          }}
                          className="text-[#0055E5] hover:text-blue-800"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(p.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white p-3 rounded-lg">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full"
            >
              <X size={16} />
            </button>
            <img
              src={previewImage}
              className="max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}

      {/* ADD */}
      {showAddForm && categoryId && (
        <AddForm
          categoryId={categoryId}
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            api
              .get(`/products?category_id=${categoryId}`)
              .then(res => setProducts(res.data));
          }}
        />
      )}

      {/* EDIT */}
      {showEditForm && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            api
              .get(`/products?category_id=${categoryId}`)
              .then(res => setProducts(res.data));
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
