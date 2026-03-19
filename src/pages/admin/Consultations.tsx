import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axiosAdmin";
import { ArrowLeft, Search, Phone, Mail, Calendar, Bot, MapPin } from "lucide-react";

type Status =
  | "new"
  | "contacted"
  | "not_contacted"
  | "interested"
  | "not_interested"
  | "old";

interface Consultation {
  id: number;
  name: string;
  phone: string;
  state: string;
  email: string;
  created_at: string;
  status: Status;
}

interface Counts {
  total: number;
  new: number;
  contacted: number;
  not_contacted: number;
  interested: number;
  not_interested: number;
  old: number;
}

const statusLabels: Record<Status, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-300" },
  contacted: { label: "Contacted", color: "text-green-700", bg: "bg-green-100 border-green-300" },
  not_contacted: { label: "Not Contacted", color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-300" },
  interested: { label: "Interested", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-200" },
  not_interested: { label: "Not Interested", color: "text-red-700", bg: "bg-red-100 border-red-300" },
  old: { label: "Old", color: "text-slate-600", bg: "bg-slate-100 border-slate-300" }
};

const API = "http://localhost:5000/api/consultations";

const Consultations: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [rows, setRows] = useState<Consultation[]>([]);
  const [counts, setCounts] = useState<Counts>({
    total: 0,
    new: 0,
    contacted: 0,
    not_contacted: 0,
    interested: 0,
    not_interested: 0,
    old: 0
  });

  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState<"all" | Status>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Consultation | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // ✅ FIX: URL se status read karke direct tab open karo
  useEffect(() => {
    const status = searchParams.get("status") as Status | null;
    if (status) setActiveStatus(status);
  }, [searchParams]);

  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${API}/counts`);
      if (res.data?.success) setCounts(res.data.counts);
    } catch (e) {
      console.error("Counts error:", e);
    }
  };

  const fetchRows = async () => {
    try {
      setLoading(true);
      const status = activeStatus === "all" ? "" : activeStatus;

      const res = await axios.get(API, {
        params: { status, search: searchQuery }
      });

      if (res.data?.success && Array.isArray(res.data.data)) {
        setRows(res.data.data);
      } else {
        setRows([]);
      }
    } catch (e) {
      console.error("Fetch consultations error:", e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        fetchCounts();
        setShowStatusModal(false);
        setSelected(null);
      }
    } catch (e) {
      console.error("Status update error:", e);
    }
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
            <Bot /> Consultation Requests
          </h1>
          <p className="text-sm">Total: {counts.total}</p>
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
              {statusLabels[key].label} ({counts[key] || 0})
            </button>
          ))}
          <button
            onClick={() => setActiveStatus("all")}
            className={`px-4 py-2 rounded-full border ${
              activeStatus === "all" ? "bg-[#0055E5] text-white" : "bg-white"
            }`}
          >
            All ({counts.total})
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search consultations..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg"
            />
          </div>
        </form>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">S.No.</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">State</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, index) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 font-mono text-sm">{index + 1}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3 text-sm">
                    <div className="flex justify-center items-center gap-1">
                      <Phone size={14} /> {r.phone}
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <Mail size={14} /> {r.email}
                    </div>
                  </td>
                  <td className="p-3 text-sm flex justify-center items-center gap-1">
                    <MapPin size={14} /> {r.state}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelected(r);
                        setShowStatusModal(true);
                      }}
                      className={`px-3 py-1 rounded-full border ${statusLabels[r.status].bg} ${statusLabels[r.status].color}`}
                    >
                      {statusLabels[r.status].label}
                    </button>
                  </td>
                  <td className="p-3 text-sm flex justify-center items-center gap-1">
                    <Calendar size={14} /> {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="p-4 text-center">Loading...</p>}
          {!loading && rows.length === 0 && (
            <p className="p-4 text-center text-slate-400">No consultation requests found</p>
          )}
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

export default Consultations;
