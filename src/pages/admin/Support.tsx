import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axiosAdmin";
import { ArrowLeft, Search, Calendar, LifeBuoy } from "lucide-react";

type Status = "new" | "contacted" | "not_contacted" | "interested" | "not_interested" | "old";

interface SupportRow {
  id: number;
  name: string;
  city: string;
  phone: string;
  created_at: string;
  status: Status | null;
}

const statusLabels: Record<Status, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-300" },
  contacted: { label: "Contacted", color: "text-green-700", bg: "bg-green-100 border-green-300" },
  not_contacted: { label: "Not Contacted", color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-300" },
  interested: { label: "Interested", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-200" },
  not_interested: { label: "Not Interested", color: "text-red-700", bg: "bg-red-100 border-red-300" },
  old: { label: "Old", color: "text-slate-600", bg: "bg-slate-100 border-slate-300" },
};

const API = "/api/support-requests";

const SupportAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [rows, setRows] = useState<SupportRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState<"all" | Status>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<SupportRow | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // ✅ FIX: URL se status read karke direct tab open karo
  useEffect(() => {
    const status = searchParams.get("status") as Status | null;
    if (status) setActiveStatus(status);
  }, [searchParams]);

  const fetchCount = async () => {
    try {
      const res = await axios.get(`${API}/counts`);
      if (res.data?.success) {
        setTotal(res.data?.total || 0);
      }
    } catch (err) {
      console.error("Support count fetch error:", err);
    }
  };

  const fetchRows = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { params: { status: activeStatus } });
      let data: SupportRow[] = Array.isArray(res.data) ? res.data : [];

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        data = data.filter(
          (r) =>
            r.name?.toLowerCase().includes(q) ||
            r.city?.toLowerCase().includes(q) ||
            r.phone?.toLowerCase().includes(q)
        );
      }

      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
    fetchRows();
  }, [activeStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRows();
  };

  const handleStatusChange = async (id: number, status: Status) => {
    try {
      const res = await axios.put(`${API}/${id}/status`, { status });
      if (res.data?.success) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        fetchCount();
        setShowStatusModal(false);
        setSelected(null);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#0F172A] text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/admin/dashboard")} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold flex items-center gap-2">
            <LifeBuoy size={18} /> Support Requests
          </h1>
          <p className="text-sm">Total: {total}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(Object.keys(statusLabels) as Status[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveStatus(key)}
              className={`px-4 py-2 rounded-full border ${
                activeStatus === key ? "bg-[#0055E5] text-white" : "bg-white"
              }`}
            >
              {statusLabels[key].label}
            </button>
          ))}
          <button
            onClick={() => setActiveStatus("all")}
            className={`px-4 py-2 rounded-full border ${
              activeStatus === "all" ? "bg-[#0055E5] text-white" : "bg-white"
            }`}
          >
            All
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search support requests..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg"
            />
          </div>
        </form>

        {/* Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto mx-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">S.No.</th>
                <th className="p-3">Name</th>
                <th className="p-3">City</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => {
                const status = (r.status || "new") as Status;

                return (
                  <tr key={r.id} className="border-t hover:bg-slate-50">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.city}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelected(r);
                          setShowStatusModal(true);
                        }}
                        className={`px-3 py-1 rounded-full border text-xs ${statusLabels[status].bg} ${statusLabels[status].color}`}
                      >
                        {statusLabels[status].label}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar size={14} />
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loading && <p className="p-4 text-center">Loading...</p>}
          {!loading && rows.length === 0 && <p className="p-4 text-center text-slate-400">No support requests found</p>}
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="font-semibold mb-4">Update Status</h3>
            {(Object.keys(statusLabels) as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(selected.id, s)}
                className="block w-full text-left px-3 py-2 border rounded mb-2 hover:bg-slate-50"
              >
                {statusLabels[s].label}
              </button>
            ))}
            <button onClick={() => setShowStatusModal(false)} className="w-full py-2 bg-slate-100 rounded mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportAdmin;
