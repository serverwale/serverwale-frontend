import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Building2,
  Newspaper,
  MessageSquare,
  LifeBuoy,
  FileText,
  Send,
  FolderTree,
  Bot,
  Loader2,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  Phone,
  Mail,
  Tag,
  Clock,
  PhoneCall,
  PhoneOff,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
} from "lucide-react";

/* ============================
   Types
============================ */

interface DashboardData {
  blogs: number;
  leads: number;
  requests: number;
  support: number;
  inquiries: number;
  aiLeads: number;
  consultations: number;
  newLeads: number;
  newRequests: number;
  newSupport: number;
  newInquiries: number;
  newAiLeads: number;
  newConsultations: number;
}

interface StoreLead {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  created_at: string;
  status: string | null;
}

const LEAD_STATUS: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  new:            { label: "New",           color: "text-[#0055E5]",  bg: "bg-blue-50",   icon: <Clock size={11} /> },
  contacted:      { label: "Connected",     color: "text-green-700",  bg: "bg-green-50",  icon: <PhoneCall size={11} /> },
  not_contacted:  { label: "Not Connected", color: "text-yellow-700", bg: "bg-yellow-50", icon: <PhoneOff size={11} /> },
  interested:     { label: "Interested",    color: "text-purple-700", bg: "bg-purple-50", icon: <ThumbsUp size={11} /> },
  not_interested: { label: "Not Interested",color: "text-red-700",    bg: "bg-red-50",    icon: <ThumbsDown size={11} /> },
  old:            { label: "Old",           color: "text-slate-500",  bg: "bg-slate-50",  icon: null },
};

/* ============================
   Reusable Components
============================ */

const SidebarItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 cursor-pointer transition"
  >
    {icon}
    <span>{label}</span>
  </div>
);

const DashboardCard = ({
  title,
  count,
  icon,
  onClick,
  loading,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg 
             flex items-center justify-between cursor-pointer hover:border-[#0055E5]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all"
  >
    <div>
      <p className="text-slate-400 text-sm">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        {loading ? (
          <Loader2 size={20} className="animate-spin text-[#0055E5]" />
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white">{count}</h2>
            <span className="text-xs text-slate-500">total</span>
          </>
        )}
      </div>
    </div>
    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-[#0055E5]">
      {icon}
    </div>
  </motion.div>
);

/* ============================
   Main Component
============================ */

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storeLeads, setStoreLeads] = useState<StoreLead[]>([]);
const [data, setData] = useState<DashboardData>({
  blogs: 0,
  leads: 0,
  requests: 0,
  support: 0,
  inquiries: 0,
  aiLeads: 0,
  consultations: 0,

  newLeads: 0,
  newRequests: 0,
  newSupport: 0,
  newInquiries: 0,
  newAiLeads: 0,
  newConsultations: 0,
});

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const responses = await Promise.allSettled([
        fetch("http://localhost:5000/api/blogs/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/leads/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/pricing-requests/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/support-requests/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/inquiries/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/ai-leads/counts").then((r) => r.json()),
        fetch("http://localhost:5000/api/consultations/counts").then((r) => r.json()),
      ]);

      const blogsRes = responses[0].status === "fulfilled" ? responses[0].value : { count: 0 };
      const leadsRes = responses[1].status === "fulfilled" ? responses[1].value : { count: 0 };
      const requestsRes = responses[2].status === "fulfilled" ? responses[2].value : { count: 0 };
      const supportRes = responses[3].status === "fulfilled" ? responses[3].value : { count: 0 };
      const inquiriesRes = responses[4].status === "fulfilled" ? responses[4].value : { count: 0 };
      const aiLeadsRes = responses[5].status === "fulfilled" ? responses[5].value : { counts: { total: 0 } };
      const consultationsRes = responses[6].status === "fulfilled" ? responses[6].value : { count: 0 };

 const getNew = (res: any) =>
  res?.newCount ??
  res?.new ??
  res?.counts?.newCount ??
  res?.counts?.new ??
  0;

const newData: DashboardData = {
  blogs: blogsRes?.count || blogsRes?.total || 0,

  leads: leadsRes?.count || leadsRes?.total || leadsRes?.counts?.total || 0,
  requests: requestsRes?.count || requestsRes?.total || requestsRes?.counts?.total || 0,
  support: supportRes?.count || supportRes?.total || supportRes?.counts?.total || 0,
  inquiries: inquiriesRes?.count || inquiriesRes?.total || inquiriesRes?.counts?.total || 0,
  aiLeads: aiLeadsRes?.count || aiLeadsRes?.total || aiLeadsRes?.counts?.total || 0,
  consultations: consultationsRes?.count || consultationsRes?.total || consultationsRes?.counts?.total || 0,

  newLeads: getNew(leadsRes),
  newRequests: getNew(requestsRes),
  newSupport: getNew(supportRes),
  newInquiries: getNew(inquiriesRes),
  newAiLeads: getNew(aiLeadsRes),
  newConsultations: getNew(consultationsRes),
};



      setData(newData);

      // Fetch recent store leads
      try {
        const leadsRes = await fetch("http://localhost:5000/api/pricing-requests?status=all");
        const leadsData = await leadsRes.json();
        if (Array.isArray(leadsData)) setStoreLeads(leadsData.slice(0, 8));
      } catch { /* silent */ }

    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError(err?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const SidebarNav = () => (
    <nav className="space-y-3">
      <SidebarItem icon={<FolderTree size={18} />} label="Categories" onClick={() => navigate("/admin/categories")} />
      <SidebarItem icon={<ShoppingBag size={18} />} label="Shop Products" onClick={() => navigate("/admin/shop")} />
      <SidebarItem icon={<Tag size={18} />} label="Store Leads" onClick={() => navigate("/admin/request")} />
      <SidebarItem icon={<Bot size={18} />} label="AI Leads" onClick={() => navigate("/admin/ai-leads")} />
      <SidebarItem icon={<Bot size={18} />} label="🤖 AI Agents" onClick={() => navigate("/admin/ai-agents")} />
      <SidebarItem icon={<Building2 size={18} />} label="Enterprise Solutions" />
      <SidebarItem icon={<LayoutDashboard size={18} />} label="Job Portal" onClick={() => navigate("/admin/jobs")} />
      <SidebarItem icon={<Newspaper size={18} />} label="Blog" onClick={() => navigate("/admin/blogs")} />
    </nav>
  );

  return (
    <div className="min-h-screen text-white flex bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0F172A] border-r border-slate-800 p-4">
        <div className="flex items-center gap-3 mb-10 py-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0055E5] to-[#0055E5] rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-2xl font-bold text-white">Serverwale<span className="text-[#0055E5]"> ™</span></span>
        </div>
        <SidebarNav />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed z-30 top-0 left-0 h-full w-64 bg-[#0F172A] border-r border-slate-800 p-4 md:hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0055E5] to-[#0055E5] rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-white font-bold text-xl">Serverwale<span className="text-[#0055E5]"> ™</span></span>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X />
          </button>
        </div>
        <SidebarNav />
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl text-white hover:bg-slate-700 transition"
              >
                <User size={18} />
                <span className="hidden sm:block">Admin</span>
              </button>

              {profileOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-800 text-white">Profile</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center gap-2 text-red-400">
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {error && (
          <div className="mx-4 md:mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-2">
            <AlertCircle size={18} />
            <div>
              <p>Error: {error}</p>
              <button onClick={fetchDashboardData} className="mt-1 text-sm underline hover:text-red-300">
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Cards */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Blog Posts" count={data.blogs} icon={<Newspaper size={22} />} onClick={() => navigate("/admin/blogs")} loading={loading} />
            <DashboardCard title="Leads" count={data.leads} icon={<MessageSquare size={22} />} onClick={() => navigate("/admin/leads")} loading={loading} />
            <DashboardCard title="Store Leads" count={data.requests} icon={<ShoppingBag size={22} />} onClick={() => navigate("/admin/request")} loading={loading} />
            <DashboardCard title="Support Requests" count={data.support} icon={<LifeBuoy size={22} />} onClick={() => navigate("/admin/support")} loading={loading} />
            <DashboardCard title="Inquiries" count={data.inquiries} icon={<FileText size={22} />} onClick={() => navigate("/admin/inquiry")} loading={loading} />
            <DashboardCard title="Consultation Requests" count={data.consultations} icon={<Bot size={22} />} onClick={() => navigate("/admin/consultations")} loading={loading} />
            <DashboardCard title="AI Leads" count={data.aiLeads} icon={<Bot size={22} />} onClick={() => navigate("/admin/ai-leads")} loading={loading} />
          </div>
        

          

          {/* Quick Stats Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white  border rounded-2xl shadow-sm border border-pink-400 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 rounded-xl p-4">
                  <p className="text-sm text-slate-600">Total Leads</p>
                  <p className="text-2xl font-bold text-[#0055E5]">{data.leads + data.aiLeads}</p>
                </div>
                <div className="bg-slate-100 rounded-xl p-4">
                  <p className="text-sm text-slate-600">Total Requests</p>
                  <p className="text-2xl font-bold text-slate-500">{data.requests + data.inquiries + data.support}</p>
                </div>

                <div className="bg-green-100 rounded-xl p-4">
                  <p className="text-sm text-slate-600">Total Consultation Requests</p>
                  <p className="text-2xl font-bold text-green-500">{data.consultations}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm  border border-blue-400 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600">Backend Server</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600">Database</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0055E5] rounded-full" />
                    <span className="text-sm text-slate-600">AI Chatbot</span>
                  </div>
                  <span className="text-xs text-[#0055E5] font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Quick Notifications ================= */}
<div className="mt-8 bg-white  rounded-2xl shadow-sm border border-green-400 p-6">
  <h3 className="text-lg font-semibold text-slate-900 mb-4">
    🔔 New Notifications
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div onClick={() => navigate("/admin/leads?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-blue-100">
      <p className="text-sm text-slate-600">New Leads</p>
      <p className="text-2xl font-bold text-[#0055E5]">{data.newLeads}</p>
    </div>

    <div onClick={() => navigate("/admin/ai-leads?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-slate-100">
      <p className="text-sm text-slate-600">New AI Leads</p>
      <p className="text-2xl font-bold text-slate-600">{data.newAiLeads}</p>
    </div>

    <div onClick={() => navigate("/admin/request?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-blue-100">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-slate-600">New Store Leads</p>
        <ShoppingBag size={16} className="text-[#0055E5]" />
      </div>
      <p className="text-2xl font-bold text-[#0055E5]">{data.newRequests}</p>
      {data.newRequests > 0 && <p className="text-xs text-[#0055E5] mt-1 font-medium">Click to view →</p>}
    </div>

    <div onClick={() => navigate("/admin/support?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-yellow-100">
      <p className="text-sm text-slate-600">New Support Requests</p>
      <p className="text-2xl font-bold text-yellow-600">{data.newSupport}</p>
    </div>

    <div onClick={() => navigate("/admin/inquiry?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-red-100">
      <p className="text-sm text-slate-600">New Inquiries</p>
      <p className="text-2xl font-bold text-pink-600">{data.newInquiries}</p>
    </div>

    <div onClick={() => navigate("/admin/consultations?status=new")} className="cursor-pointer p-4 rounded-xl border hover:shadow bg-indigo-100">
      <p className="text-sm text-slate-600">New Consultations</p>
      <p className="text-2xl font-bold text-indigo-600">{data.newConsultations}</p>
    </div>
  </div>
</div>

          {/* ═══════════ STORE LEADS TABLE ═══════════ */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-[#040A1C] to-[#08152E]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0055E5] rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Store Leads</h3>
                  <p className="text-slate-400 text-xs">Pricing requests from shop products</p>
                </div>
                {data.newRequests > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse ml-2">
                    {data.newRequests} New
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate("/admin/request")}
                className="flex items-center gap-1.5 bg-[#0055E5] hover:bg-[#0044BB] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
              >
                View All <ArrowRight size={13} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide w-10">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Product Requested</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">Loading store leads...</td></tr>
                  ) : storeLeads.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No store leads yet</td></tr>
                  ) : storeLeads.map((lead, i) => {
                    const st = lead.status || "new";
                    const cfg = LEAD_STATUS[st] || LEAD_STATUS.new;
                    return (
                      <tr key={lead.id} className="hover:bg-[#F3F8FF] transition-colors cursor-pointer" onClick={() => navigate("/admin/request")}>
                        <td className="px-4 py-3 text-slate-400 text-xs">{i + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#EDF4FF] flex items-center justify-center shrink-0">
                              <User size={12} className="text-[#0055E5]" />
                            </div>
                            <span className="font-medium text-slate-800 text-xs">{lead.full_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-slate-600 text-xs">
                              <Phone size={10} className="text-slate-400" /> {lead.phone}
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                              <Mail size={10} className="text-slate-400" /> {lead.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-1">
                            <Tag size={11} className="text-[#0055E5] mt-0.5 shrink-0" />
                            <span className="text-slate-700 text-xs line-clamp-2 max-w-[200px]">{lead.service || "—"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {storeLeads.length > 0 && (
              <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <p className="text-xs text-slate-400">Showing latest {storeLeads.length} leads</p>
                <button
                  onClick={() => navigate("/admin/request")}
                  className="text-xs text-[#0055E5] font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View all {data.requests} leads <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>

        </main>


      </div>
    </div>
  );
};

export default AdminDashboard;
