import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axiosAdmin";
import { ArrowLeft, Search, Calendar, Bot } from "lucide-react";

type Status = "new" | "contacted" | "not_contacted" | "interested" | "not_interested" | "old";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
  status: Status;
}

const statusLabels: Record<Status, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-300" },
  contacted: { label: "Contacted", color: "text-green-700", bg: "bg-green-100 border-green-300" },
  not_contacted: { label: "Not Contacted", color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-300" },
  interested: { label: "Interested", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-200" },
  not_interested: { label: "Not Interested", color: "text-red-700", bg: "bg-red-100 border-red-300" },
  old: { label: "Old", color: "text-slate-600", bg: "bg-slate-100 border-slate-300" },
};

const API = "http://localhost:5000/api/leads";

const Leads: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [rows, setRows] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState<"all" | Status>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // ✅ FIX: URL se status read karke direct tab open karo
  useEffect(() => {
    const status = searchParams.get("status") as Status | null;
    if (status) setActiveStatus(status);
  }, [searchParams]);

  const fetchCount = async () => {
    const res = await axios.get(`${API}/counts`);
    setTotal(res.data?.total || 0);
  };

  const fetchRows = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, {
        params: { status: activeStatus, search: searchQuery },
      });
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error("Fetch leads error:", e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
    fetchRows();
  }, [activeStatus]);

  const handleStatusChange = async (id: number, status: Status) => {
    await axios.put(`${API}/${id}/status`, { status });
    fetchRows();
    setShowStatusModal(false);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0F172A] text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/admin/dashboard")} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold flex items-center gap-2">
            <Bot /> Leads
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRows();
          }}
          className="mb-4"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg"
            />
          </div>
        </form>

        {/* Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto mx-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">S.No.</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Company</th>
                <th className="p-3">Service</th>
                <th className="p-3">Message</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Date</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.company}</td>
                  <td className="p-3">{r.service}</td>
                  <td className="p-3 max-w-xs truncate">{r.message}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setSelected(r);
                        setShowStatusModal(true);
                      }}
                      className={`px-3 py-1 rounded-full border text-xs ${statusLabels[r.status].bg} ${statusLabels[r.status].color}`}
                    >
                      {statusLabels[r.status].label}
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <Calendar size={14} className="inline mr-1" />
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="p-4 text-center">Loading...</p>}
          {!loading && rows.length === 0 && <p className="p-4 text-center text-slate-400">No leads found</p>}
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

export default Leads;
