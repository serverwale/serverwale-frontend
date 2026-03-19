import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axiosAdmin";
import { ArrowLeft, Search, Phone, Mail, Calendar, Trash2, Bot } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  source: string;
  status: "new" | "old" | "not_contacted" | "interested" | "not_interested";
  created_at: string;
}

interface LeadCounts {
  total: number;
  new: number;
  old: number;
  not_contacted: number;
  interested: number;
  not_interested: number;
}

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-[#0055E5]", bg: "bg-blue-100 border-blue-300" },
  old: { label: "Old", color: "text-slate-600", bg: "bg-slate-100 border-slate-300" },
  not_contacted: { label: "Not Contacted", color: "text-yellow-700", bg: "bg-yellow-100 border-yellow-300" },
  interested: { label: "Interested", color: "text-green-700", bg: "bg-green-100 border-green-300" },
  not_interested: { label: "Not Interested", color: "text-red-700", bg: "bg-red-100 border-red-300" }
};

const API = "http://localhost:5000/api/ai-leads";

const AILeads: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<LeadCounts>({
    total: 0,
    new: 0,
    old: 0,
    not_contacted: 0,
    interested: 0,
    not_interested: 0
  });

  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const limit = 20;

  // ✅ Read ?status=new from URL
  useEffect(() => {
    const status = searchParams.get("status");
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

  const fetchLeads = async (reset = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;

      const res = await axios.get(API, {
        params: {
          status: activeStatus === "all" ? "" : activeStatus,
          search: searchQuery,
          limit,
          offset: newOffset
        }
      });

      if (res.data?.success) {
        const rows: Lead[] = res.data.leads || [];
        setLeads(reset ? rows : [...leads, ...rows]);
        setHasMore(rows.length === limit);
        setOffset(reset ? limit : newOffset + limit);
      }
    } catch (e) {
      console.error("Fetch leads error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  useEffect(() => {
    setOffset(0);
    fetchLeads(true);
  }, [activeStatus]);

  const handleStatusChange = async (id: number, status: Lead["status"]) => {
    try {
      const res = await axios.put(`${API}/${id}/status`, { status });
      if (res.data?.success) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        fetchCounts();
        setShowStatusModal(false);
        setSelectedLead(null);
      }
    } catch (e) {
      console.error("Status update error:", e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      const res = await axios.delete(`${API}/${id}`);
      if (res.data?.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        fetchCounts();
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0F172A] text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/admin/dashboard")} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold flex items-center gap-2">
            <Bot /> AI Leads
          </h1>
          <p className="text-sm">Total: {counts.total}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.entries(statusLabels).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveStatus(key)}
              className={`px-4 py-2 rounded-full border ${
                activeStatus === key ? "bg-[#0055E5] text-white" : "bg-white"
              }`}
            >
              {val.label} ({counts[key as keyof LeadCounts]})
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

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => {
                const badge = statusLabels[lead.status] || statusLabels.new;

                return (
                  <tr key={lead.id} className="border-t">
                    <td className="p-3">{lead.id}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3 text-sm">
                      <div className="flex justify-center gap-1"><Phone size={14}/> {lead.phone}</div>
                      <div className="flex justify-center gap-1"><Mail size={14}/> {lead.email}</div>
                    </td>
                    <td className="p-3">{lead.message || "—"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowStatusModal(true);
                        }}
                        className={`px-3 py-1 rounded-full border ${badge.bg} ${badge.color}`}
                      >
                        {badge.label}
                      </button>
                    </td>
                    <td className="p-3">
                      <Calendar size={14} className="inline mr-1" />
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleDelete(lead.id)} className="text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loading && <p className="p-4 text-center">Loading...</p>}
          {!loading && leads.length === 0 && <p className="p-4 text-center text-slate-400">No leads found</p>}
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && selectedLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="font-semibold mb-4">Update Status</h3>
            {Object.keys(statusLabels).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(selectedLead.id, s as Lead["status"])}
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

export default AILeads;
