import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axiosAdmin";
import {
  ArrowLeft, Search, Calendar, ShoppingBag, Phone, Mail,
  User, Tag, X, CheckCircle, Clock, PhoneOff, PhoneCall,
  ThumbsUp, ThumbsDown, RefreshCw, Filter
} from "lucide-react";

/* ─── Types ─────────────────────────────── */
type Status =
  | "new"
  | "contacted"
  | "not_contacted"
  | "interested"
  | "not_interested"
  | "old";

interface StoreLead {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  created_at: string;
  status: Status | null;
}

/* ─── Status Config ─────────────────────── */
const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  new:            { label: "New",           color: "text-[#0055E5]",  bg: "bg-blue-50",   border: "border-blue-300",  icon: <Clock size={12} /> },
  contacted:      { label: "Connected",     color: "text-green-700",  bg: "bg-green-50",  border: "border-green-300", icon: <PhoneCall size={12} /> },
  not_contacted:  { label: "Not Connected", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300",icon: <PhoneOff size={12} /> },
  interested:     { label: "Interested",    color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-300",icon: <ThumbsUp size={12} /> },
  not_interested: { label: "Not Interested",color: "text-red-700",    bg: "bg-red-50",    border: "border-red-300",   icon: <ThumbsDown size={12} /> },
  old:            { label: "Old",           color: "text-slate-500",  bg: "bg-slate-50",  border: "border-slate-200", icon: <CheckCircle size={12} /> },
};

/* Filter tabs — ordered as user requested */
const FILTER_TABS: Array<{ key: "all" | Status; label: string; icon: React.ReactNode }> = [
  { key: "all",           label: "All",          icon: <Filter size={13} /> },
  { key: "new",           label: "New",          icon: <Clock size={13} /> },
  { key: "contacted",     label: "Connected",    icon: <PhoneCall size={13} /> },
  { key: "not_contacted", label: "Not Connected",icon: <PhoneOff size={13} /> },
  { key: "interested",    label: "Interested",   icon: <ThumbsUp size={13} /> },
  { key: "not_interested",label: "Not Interested",icon: <ThumbsDown size={13} /> },
];

const API = "/api/pricing-requests";

/* ─── Main Component ─────────────────────── */
const StoreLeads: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [rows, setRows]               = useState<StoreLead[]>([]);
  const [counts, setCounts]           = useState<Record<string, number>>({});
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(false);
  const [activeStatus, setActiveStatus] = useState<"all" | Status>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected]       = useState<StoreLead | null>(null);
  const [showModal, setShowModal]     = useState(false);

  /* read ?status= from URL */
  useEffect(() => {
    const s = searchParams.get("status") as Status | null;
    if (s) setActiveStatus(s);
  }, [searchParams]);

  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${API}/counts`);
      if (res.data?.success) {
        setTotal(res.data.total || 0);
        setCounts(res.data.byCounts || {});
      }
    } catch (e) { /* silent */ }
  };

  const fetchRows = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { params: { status: activeStatus } });
      let data: StoreLead[] = Array.isArray(res.data) ? res.data : [];
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        data = data.filter(r =>
          r.full_name?.toLowerCase().includes(q) ||
          r.phone?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.service?.toLowerCase().includes(q)
        );
      }
      setRows(data);
    } catch (e) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCounts(); fetchRows(); }, [activeStatus]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchRows(); };

  const handleStatusChange = async (id: number, status: Status) => {
    try {
      const res = await axios.put(`${API}/${id}/status`, { status });
      if (res.data?.success) {
        setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        fetchCounts();
        setShowModal(false);
        setSelected(null);
      }
    } catch (e) { /* silent */ }
  };

  const newCount = rows.filter(r => (r.status || "new") === "new").length;

  return (
    <div className="min-h-screen bg-[#F3F8FF]">
      {/* ── Header ── */}
      <header className="bg-[#040A1C] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition"
          >
            <ArrowLeft size={18} /> <span className="hidden sm:inline text-sm">Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#0055E5]" />
            <h1 className="font-bold text-lg">Store Leads</h1>
            {newCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {newCount} New
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Total: <strong className="text-white">{total}</strong></span>
            <button onClick={() => { fetchCounts(); fetchRows(); }} className="p-2 hover:bg-white/10 rounded-lg transition">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── Filter Tabs ── */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key as "all" | Status)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeStatus === tab.key
                  ? "bg-[#0055E5] text-white border-[#0055E5] shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#0055E5] hover:text-[#0055E5]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Search ── */}
        <form onSubmit={handleSearch} className="mb-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, email, product..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0055E5]/20 focus:border-[#0055E5]"
            />
          </div>
        </form>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#0055E5]" />
              <h2 className="font-semibold text-slate-800">
                {activeStatus === "all" ? "All Store Leads" : STATUS_CONFIG[activeStatus as Status]?.label + " Leads"}
              </h2>
              <span className="bg-[#EDF4FF] text-[#0055E5] text-xs font-bold px-2 py-0.5 rounded-full">
                {rows.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-10">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Product Requested</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((r, i) => {
                  const status: Status = (r.status || "new") as Status;
                  const cfg = STATUS_CONFIG[status];
                  return (
                    <tr key={r.id} className="hover:bg-[#F3F8FF] transition-colors group">
                      <td className="px-4 py-3.5 text-slate-400 text-xs">{i + 1}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#EDF4FF] flex items-center justify-center shrink-0">
                            <User size={14} className="text-[#0055E5]" />
                          </div>
                          <span className="font-medium text-slate-800">{r.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                            <Phone size={11} className="text-slate-400" /> {r.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <Mail size={11} className="text-slate-400" /> {r.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-start gap-1.5">
                          <Tag size={12} className="text-[#0055E5] mt-0.5 shrink-0" />
                          <span className="text-slate-700 text-xs leading-relaxed line-clamp-2 max-w-[220px]">{r.service || "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => { setSelected(r); setShowModal(true); }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition hover:shadow-sm ${cfg.bg} ${cfg.color} ${cfg.border}`}
                        >
                          {cfg.icon} {cfg.label}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(r.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(r.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="p-8 text-center">
              <RefreshCw size={20} className="animate-spin text-[#0055E5] mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Loading store leads...</p>
            </div>
          )}
          {!loading && rows.length === 0 && (
            <div className="p-8 text-center">
              <ShoppingBag size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No store leads found</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Status Update Modal ── */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="bg-[#040A1C] px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-sm">Update Lead Status</h3>
                <p className="text-slate-400 text-xs mt-0.5 truncate max-w-[220px]">{selected.full_name} — {selected.service?.slice(0, 40)}{selected.service?.length > 40 ? "…" : ""}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition">
                <X size={18} />
              </button>
            </div>
            {/* Status options */}
            <div className="p-4 space-y-2">
              {FILTER_TABS.filter(t => t.key !== "all").map(tab => {
                const cfg = STATUS_CONFIG[tab.key as Status];
                const isActive = (selected.status || "new") === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleStatusChange(selected.id, tab.key as Status)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      isActive
                        ? `${cfg.bg} ${cfg.color} ${cfg.border} shadow-sm`
                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={isActive ? cfg.color : "text-slate-400"}>{cfg.icon}</span>
                    {cfg.label}
                    {isActive && <span className="ml-auto text-xs font-bold">Current</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreLeads;
