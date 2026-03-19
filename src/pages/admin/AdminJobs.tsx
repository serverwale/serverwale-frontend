import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, User, LogOut, LayoutDashboard, Building2,
  Newspaper, Bot, FolderTree, ShoppingBag, Briefcase,
  Plus, Pencil, Trash2, Power, PowerOff, Calendar,
  MapPin, Clock, ChevronDown, ChevronUp, Search,
  CheckCircle, XCircle, AlertCircle, RefreshCw
} from "lucide-react";

const API = "http://localhost:5000";

interface Job {
  id: number;
  title: string;
  location: string;
  job_type: "jobs" | "internships" | "remote";
  employment_type: string;
  description: string;
  requirements: string;
  department: string;
  experience: string;
  is_active: number;
  created_at: string;
}

const emptyForm = {
  title: "",
  location: "Delhi NCR",
  job_type: "jobs" as const,
  employment_type: "Full-Time",
  description: "",
  requirements: "",
  department: "",
  experience: "1-3 years",
};

/* ─── Sidebar Items ─── */
const SidebarItem = ({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition ${
      active
        ? "bg-cyan-500/20 text-cyan-400"
        : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const AdminJobs: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  /* ─── Load Jobs ─── */
  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs`);
      const data = await res.json();
      setJobs(data.data || []);
    } catch {
      showToast("Failed to load jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* ─── Open Add Form ─── */
  const openAdd = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  /* ─── Open Edit Form ─── */
  const openEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      location: job.location,
      job_type: job.job_type,
      employment_type: job.employment_type,
      description: job.description || "",
      requirements: job.requirements || "",
      department: job.department || "",
      experience: job.experience || "",
    });
    setShowForm(true);
  };

  /* ─── Save (Add/Edit) ─── */
  const handleSave = async () => {
    if (!form.title.trim()) { showToast("Job title is required!", "error"); return; }
    setSaving(true);
    try {
      const url = editingJob ? `${API}/api/jobs/${editingJob.id}` : `${API}/api/jobs`;
      const method = editingJob ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingJob ? "Job updated!" : "Job posted!", "success");
        setShowForm(false);
        loadJobs();
      } else {
        showToast("Save failed", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ─── Toggle Active ─── */
  const handleToggle = async (job: Job) => {
    try {
      const res = await fetch(`${API}/api/jobs/${job.id}/toggle`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        showToast(job.is_active ? "Job paused (hidden from portal)" : "Job activated!", "success");
        loadJobs();
      }
    } catch {
      showToast("Toggle failed", "error");
    }
  };

  /* ─── Delete ─── */
  const handleDelete = async (job: Job) => {
    if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API}/api/jobs/${job.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Job deleted", "success");
        loadJobs();
      }
    } catch {
      showToast("Delete failed", "error");
    }
  };

  /* ─── Filtered jobs ─── */
  const filtered = jobs.filter(j => {
    const matchType = filterType === "all" || j.job_type === filterType;
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      (j.department || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const typeLabel: Record<string, string> = {
    jobs: "Full-Time",
    internships: "Internship",
    remote: "Remote",
  };

  const typeColor: Record<string, string> = {
    jobs: "bg-blue-100 text-[#0055E5]",
    internships: "bg-slate-100 text-slate-700",
    remote: "bg-green-100 text-green-700",
  };

  const SidebarNav = () => (
    <nav className="space-y-1 mt-2">
      <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigate("/admin/dashboard")} />
      <SidebarItem icon={<FolderTree size={18} />} label="Categories" onClick={() => navigate("/admin/categories")} />
      <SidebarItem icon={<ShoppingBag size={18} />} label="Shop Products" onClick={() => navigate("/admin/shop")} />
      <SidebarItem icon={<Bot size={18} />} label="AI Leads" onClick={() => navigate("/admin/ai-leads")} />
      <SidebarItem icon={<Building2 size={18} />} label="Enterprise Solutions" />
      <SidebarItem icon={<Briefcase size={18} />} label="Job Portal" active onClick={() => navigate("/admin/jobs")} />
      <SidebarItem icon={<Newspaper size={18} />} label="Blog" onClick={() => navigate("/admin/blogs")} />
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 text-white">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0F172A] border-r border-slate-800 p-4">
        <div className="flex items-center gap-3 mb-8 py-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#0055E5] to-[#0055E5] rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-white">Serverwale<span className="text-[#0055E5]">™</span></span>
        </div>
        <SidebarNav />
      </aside>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed z-30 top-0 left-0 h-full w-64 bg-[#0F172A] border-r border-slate-800 p-4 md:hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-bold text-xl">Serverwale™</span>
          <button onClick={() => setSidebarOpen(false)} className="text-white"><X /></button>
        </div>
        <SidebarNav />
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <header className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}><Menu /></button>
            <Briefcase size={20} className="text-cyan-400" />
            <h1 className="text-lg font-semibold text-white">Job Portal Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadJobs} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition" title="Refresh">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0F172A] font-bold px-4 py-2 rounded-xl text-sm transition"
            >
              <Plus size={16} /> Post New Job
            </button>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl text-white">
              <User size={18} />
              <span className="hidden sm:block text-sm">Admin</span>
            </div>
          </div>
        </header>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mx-4 md:mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold ${
                toast.type === "success"
                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                  : "bg-red-500/15 border border-red-500/30 text-red-400"
              }`}
            >
              {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 md:p-6 overflow-auto">

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Jobs", value: jobs.length, color: "text-blue-400" },
              { label: "Active Jobs", value: jobs.filter(j => j.is_active).length, color: "text-green-400" },
              { label: "Paused Jobs", value: jobs.filter(j => !j.is_active).length, color: "text-yellow-400" },
              { label: "Internships", value: jobs.filter(j => j.job_type === "internships").length, color: "text-slate-400" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="text-slate-500 text-xs mb-1">{s.label}</p>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs by title, department…"
                className="w-full pl-9 pr-4 py-2.5 text-slate-800 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              />
            </div>
            <div className="flex gap-2">
              {["all", "jobs", "internships", "remote"].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    filterType === t
                      ? "bg-[#0F172A] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t === "all" ? "All" : t === "jobs" ? "Full-Time" : t === "internships" ? "Internships" : "Remote"}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-black text-slate-800 text-base">
                Recent Posted Jobs <span className="text-slate-400 font-normal text-sm">({filtered.length})</span>
              </h2>
              <span className="text-xs text-slate-400">Click Stop to hide from portal</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase size={40} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No jobs found. Post your first vacancy!</p>
                <button onClick={openAdd} className="mt-4 bg-cyan-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-400 transition">
                  + Post New Job
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filtered.map(job => (
                  <div key={job.id} className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 transition hover:bg-slate-50/80 ${!job.is_active ? "opacity-60" : ""}`}>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-800 text-sm truncate">{job.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[job.job_type]}`}>
                          {typeLabel[job.job_type]}
                        </span>
                        {!job.is_active && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">PAUSED</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-slate-500 text-xs">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {job.employment_type}</span>
                        {job.department && <span className="flex items-center gap-1"><Briefcase size={10} /> {job.department}</span>}
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar size={10} /> {new Date(job.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Stop/Resume */}
                      <button
                        onClick={() => handleToggle(job)}
                        title={job.is_active ? "Pause (hide from portal)" : "Activate"}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                          job.is_active
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {job.is_active ? <><PowerOff size={13} /> Stop</> : <><Power size={13} /> Resume</>}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEdit(job)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-100 text-[#0055E5] hover:bg-blue-200 transition"
                      >
                        <Pencil size={13} /> Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(job)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ═══════════════ ADD / EDIT MODAL ═══════════════ */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-50 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 md:top-1/2 md:-translate-y-1/2 md:h-auto w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-cyan-400" />
                  <h2 className="text-white font-black text-lg">
                    {editingJob ? "Edit Job Vacancy" : "Post New Job Vacancy"}
                  </h2>
                </div>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white transition">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">
                      Job Title *
                    </label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Senior DevOps Engineer"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Department</label>
                    <input
                      value={form.department}
                      onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                      placeholder="e.g. Engineering, Sales"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Location</label>
                    <input
                      value={form.location}
                      onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="e.g. Delhi NCR, Remote"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Job Type</label>
                    <select
                      value={form.job_type}
                      onChange={e => setForm(f => ({ ...f, job_type: e.target.value as any }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                      <option value="jobs">Full-Time</option>
                      <option value="internships">Internship</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Employment Type</label>
                    <input
                      value={form.employment_type}
                      onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))}
                      placeholder="e.g. Full-Time · Hybrid"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  {/* Experience */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Experience Required</label>
                    <input
                      value={form.experience}
                      onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                      placeholder="e.g. 2-4 years, Fresher OK"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Job Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Describe the role, responsibilities, and what the candidate will work on…"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
                    />
                  </div>

                  {/* Requirements */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5 block">Requirements / Skills</label>
                    <textarea
                      value={form.requirements}
                      onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                      placeholder="e.g. 3+ years DevOps, AWS certification, strong Linux skills…"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-black hover:bg-[#091D3A] transition disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <><RefreshCw size={14} className="animate-spin" /> Saving…</>
                  ) : (
                    <><Plus size={14} /> {editingJob ? "Update Job" : "Post Job"}</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminJobs;
