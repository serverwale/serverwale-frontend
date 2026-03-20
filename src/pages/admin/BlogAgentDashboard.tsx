import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Admin/AdminHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API: string = (import.meta as any).env?.VITE_API_URL || "";

/* ─── Types ──────────────────────────────────────────────── */
interface Topic { title: string; slug: string; primaryKeyword: string; secondaryKeywords: string[]; searchIntent: string; estimatedDifficulty: string; estimatedVolume: string; whyPick: string; }
interface Schedule { id: string; name: string; frequency: string; dayOfWeek: number; time: string; blogsPerRun: number; autoPickTopics: boolean; topics: string[]; targetLength: string; active: boolean; createdAt: string; lastRun: string | null; totalPublished: number; }
interface Blog { id: number; title: string; slug: string; excerpt: string; status: string; created_at: string; }

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const diffColor = (d: string) =>
  d === "easy" ? "text-green-400" : d === "medium" ? "text-yellow-400" : "text-red-400";

/* ─── Main ───────────────────────────────────────────────── */
const BlogAgentDashboard: React.FC = () => {
  const [tab, setTab] = useState<"auto"|"manual"|"schedules"|"blogs">("auto");

  /* Auto Pick Topics */
  const [topics, setTopics]         = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topicCount, setTopicCount] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [publishingTopic, setPublishingTopic] = useState(false);
  const [publishMsg, setPublishMsg] = useState("");

  /* Manual Generate */
  const [manualTopic, setManualTopic]   = useState("");
  const [manualKw, setManualKw]         = useState("");
  const [manualLength, setManualLength] = useState("medium");
  const [manualLoading, setManualLoading] = useState(false);
  const [manualMsg, setManualMsg]       = useState("");

  /* Schedules */
  const [schedules, setSchedules]     = useState<Schedule[]>([]);
  const [showNewSched, setShowNewSched] = useState(false);
  const [newSched, setNewSched]        = useState<Partial<Schedule> & { topicsText: string }>({
    name: "Weekly Blog Schedule",
    frequency: "weekly",
    dayOfWeek: 1,
    time: "09:00",
    blogsPerRun: 1,
    autoPickTopics: true,
    targetLength: "medium",
    topicsText: "",
  });
  const [schedMsg, setSchedMsg]       = useState("");
  const [runningId, setRunningId]     = useState<string>("");

  /* Blogs list */
  const [blogs, setBlogs]             = useState<Blog[]>([]);
  const [rewritingId, setRewritingId] = useState<number | null>(null);
  const [rewriteMsg, setRewriteMsg]   = useState("");

  useEffect(() => {
    if (tab === "schedules") fetchSchedules();
    if (tab === "blogs")     fetchBlogs();
  }, [tab]);

  /* ── API Calls ──────────────────────────────────────────── */
  async function fetchTopics() {
    setTopicsLoading(true); setPublishMsg("");
    try {
      const r = await fetch(`${API}/api/ai/blog/topics?count=${topicCount}`);
      const d = await r.json();
      if (d.success) setTopics(d.topics);
    } catch { setPublishMsg("❌ Network error"); }
    setTopicsLoading(false);
  }

  async function publishSelectedTopic() {
    if (!selectedTopic) return;
    setPublishingTopic(true); setPublishMsg("");
    try {
      const r = await fetch(`${API}/api/ai/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic.title, primaryKeyword: selectedTopic.primaryKeyword, secondaryKeywords: selectedTopic.secondaryKeywords }),
      });
      const d = await r.json();
      setPublishMsg(d.success ? `✅ Published: "${d.blog?.title}" — Email sent!` : `❌ ${d.error}`);
      if (d.success) setSelectedTopic(null);
    } catch { setPublishMsg("❌ Network error"); }
    setPublishingTopic(false);
  }

  async function generateManual() {
    if (!manualTopic.trim()) return;
    setManualLoading(true); setManualMsg("");
    try {
      const r = await fetch(`${API}/api/ai/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: manualTopic,
          primaryKeyword: manualKw || manualTopic,
          secondaryKeywords: [],
          targetLength: manualLength,
        }),
      });
      const d = await r.json();
      setManualMsg(d.success ? `✅ Published: "${d.blog?.title}" — Email sent to akankshaa.mee@gmail.com!` : `❌ ${d.error}`);
      if (d.success) { setManualTopic(""); setManualKw(""); }
    } catch { setManualMsg("❌ Network error"); }
    setManualLoading(false);
  }

  async function fetchSchedules() {
    const r = await fetch(`${API}/api/ai/blog/schedules`);
    const d = await r.json();
    if (d.success) setSchedules(d.schedules);
  }

  async function createSchedule() {
    setSchedMsg("");
    const topics = newSched.autoPickTopics ? [] : newSched.topicsText?.split("\n").map(t => t.trim()).filter(Boolean) || [];
    try {
      const r = await fetch(`${API}/api/ai/blog/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSched, topics }),
      });
      const d = await r.json();
      if (d.success) {
        setSchedMsg("✅ Schedule created!");
        setShowNewSched(false);
        fetchSchedules();
      } else setSchedMsg(`❌ ${d.error}`);
    } catch { setSchedMsg("❌ Network error"); }
  }

  async function toggleSchedule(s: Schedule) {
    await fetch(`${API}/api/ai/blog/schedules/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !s.active }),
    });
    fetchSchedules();
  }

  async function deleteSchedule(id: string) {
    if (!confirm("Delete this schedule?")) return;
    await fetch(`${API}/api/ai/blog/schedules/${id}`, { method: "DELETE" });
    fetchSchedules();
  }

  async function runScheduleNow(id: string) {
    setRunningId(id);
    try {
      const r = await fetch(`${API}/api/ai/blog/schedules/${id}/run`, { method: "POST" });
      const d = await r.json();
      setSchedMsg(d.success ? `✅ Published ${d.count} blog(s) now! Check your email.` : `❌ ${d.error}`);
      fetchSchedules();
    } catch { setSchedMsg("❌ Network error"); }
    setRunningId("");
  }

  async function fetchBlogs() {
    const r = await fetch(`${API}/api/blogs`);
    const d = await r.json();
    if (Array.isArray(d)) setBlogs(d);
  }

  async function rewriteBlog(id: number) {
    setRewritingId(id); setRewriteMsg("");
    try {
      const r = await fetch(`${API}/api/ai/blog/rewrite/${id}`, { method: "POST" });
      const d = await r.json();
      setRewriteMsg(d.success ? `✅ Rewritten & published! Email sent.` : `❌ ${d.error}`);
      fetchBlogs();
    } catch { setRewriteMsg("❌ Network error"); }
    setRewritingId(null);
  }

  const tabs = [
    { id: "auto",      label: "🤖 AI Topic Picker" },
    { id: "manual",    label: "✍️ Manual Generate" },
    { id: "schedules", label: "⏰ Schedules" },
    { id: "blogs",     label: "📄 Rewrite Existing" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <AdminHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">✍️ AI Blog Agent</h1>
          <p className="text-slate-400 text-sm">Auto-generate SEO blogs · Rewrite existing · Schedule publishing · Email notifications</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">BLOG AGENT ACTIVE</span>
            <span className="text-slate-500 text-xs ml-4">📧 Notifications → akankshaa.mee@gmail.com</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-violet-600 text-white shadow-lg" : "bg-[#1e293b] text-slate-300 hover:bg-[#263452]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── AUTO PICK TOPICS ────────────────────────────── */}
        {tab === "auto" && (
          <div>
            <div className="bg-[#1e293b] rounded-xl p-6 mb-4 border border-[#263452]">
              <h2 className="font-bold text-white mb-1">🤖 Let AI Pick the Best SEO Topics</h2>
              <p className="text-slate-400 text-sm mb-4">AI analyzes what will rank best for Serverwale and suggests top topics. Select one and publish instantly.</p>
              <div className="flex items-center gap-3">
                <label className="text-slate-400 text-sm">How many topics?</label>
                <select value={topicCount} onChange={e => setTopicCount(+e.target.value)}
                  className="bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm">
                  {[3,5,7,10].map(n => <option key={n} value={n}>{n} topics</option>)}
                </select>
                <button onClick={fetchTopics} disabled={topicsLoading}
                  className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 text-white px-5 py-2 rounded-lg text-sm font-medium">
                  {topicsLoading ? "AI is thinking..." : "🔍 Get Best Topics"}
                </button>
              </div>
            </div>

            {topics.length > 0 && (
              <div>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  {topics.map((t, i) => (
                    <div key={i} onClick={() => setSelectedTopic(selectedTopic?.title === t.title ? null : t)}
                      className={`cursor-pointer bg-[#1e293b] rounded-xl p-4 border-2 transition-all ${selectedTopic?.title === t.title ? "border-violet-500 bg-violet-900/20" : "border-[#263452] hover:border-violet-700"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-bold text-white mb-1">{t.title}</div>
                          <div className="text-xs text-violet-300 mb-2">🔑 {t.primaryKeyword}</div>
                          <div className="text-xs text-slate-400 mb-2 italic">"{t.whyPick}"</div>
                          <div className="flex gap-3 flex-wrap text-xs">
                            <span className={`font-medium ${diffColor(t.estimatedDifficulty)}`}>Difficulty: {t.estimatedDifficulty}</span>
                            <span className="text-blue-300">Volume: {t.estimatedVolume}</span>
                            <span className="text-slate-400">Intent: {t.searchIntent}</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 ${selectedTopic?.title === t.title ? "bg-violet-500 border-violet-500" : "border-slate-500"}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTopic && (
                  <div className="bg-[#1e293b] rounded-xl p-5 border border-violet-600">
                    <p className="text-sm text-slate-300 mb-3">Selected: <strong className="text-white">{selectedTopic.title}</strong></p>
                    <button onClick={publishSelectedTopic} disabled={publishingTopic}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-900 text-white px-6 py-3 rounded-lg font-semibold text-sm w-full">
                      {publishingTopic ? "🤖 AI is writing & publishing... (takes ~30 sec)" : "🚀 Generate, Publish & Send Email"}
                    </button>
                  </div>
                )}

                {publishMsg && (
                  <div className={`mt-3 p-4 rounded-lg text-sm font-medium ${publishMsg.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"}`}>
                    {publishMsg}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MANUAL GENERATE ─────────────────────────────── */}
        {tab === "manual" && (
          <div className="bg-[#1e293b] rounded-xl p-6 border border-[#263452]">
            <h2 className="font-bold text-white mb-1">✍️ Manual Blog Generator</h2>
            <p className="text-slate-400 text-sm mb-6">Apna topic do — AI full SEO blog likhega, publish karega, aur email bhejega.</p>

            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Blog Topic *</label>
                <input value={manualTopic} onChange={e => setManualTopic(e.target.value)}
                  placeholder="e.g. Best Refurbished HP Servers for Small Business in India 2025"
                  className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-4 py-3 text-sm focus:border-violet-500 outline-none" />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Primary Keyword <span className="text-slate-500">(optional)</span></label>
                <input value={manualKw} onChange={e => setManualKw(e.target.value)}
                  placeholder="e.g. refurbished HP server India"
                  className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-4 py-3 text-sm focus:border-violet-500 outline-none" />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Blog Length</label>
                <div className="flex gap-3">
                  {[["short","500-700 words"],["medium","900-1200 words"],["long","1400-1800 words"]].map(([v,l]) => (
                    <button key={v} onClick={() => setManualLength(v)}
                      className={`flex-1 py-2 rounded-lg text-sm border transition-all ${manualLength === v ? "bg-violet-600 border-violet-500 text-white" : "bg-[#0f172a] border-[#263452] text-slate-400 hover:border-violet-700"}`}>
                      <div className="font-medium capitalize">{v}</div>
                      <div className="text-xs opacity-70">{l}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={generateManual} disabled={manualLoading || !manualTopic.trim()}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 text-white py-3 rounded-lg font-semibold text-sm mt-2">
                {manualLoading ? "🤖 AI is writing... (30-60 sec)" : "🚀 Generate, Publish & Email"}
              </button>
              {manualMsg && (
                <div className={`p-4 rounded-lg text-sm font-medium ${manualMsg.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"}`}>
                  {manualMsg}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SCHEDULES ────────────────────────────────────── */}
        {tab === "schedules" && (
          <div>
            {schedMsg && (
              <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${schedMsg.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"}`}>
                {schedMsg}
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-lg">⏰ Blog Schedules</h2>
              <button onClick={() => setShowNewSched(!showNewSched)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {showNewSched ? "Cancel" : "+ New Schedule"}
              </button>
            </div>

            {/* Create Schedule Form */}
            {showNewSched && (
              <div className="bg-[#1e293b] rounded-xl p-6 border border-violet-600 mb-6">
                <h3 className="font-bold text-white mb-4">New Blog Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1">Schedule Name</label>
                    <input value={newSched.name} onChange={e => setNewSched(p => ({...p, name: e.target.value}))}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1">Frequency</label>
                    <select value={newSched.frequency} onChange={e => setNewSched(p => ({...p, frequency: e.target.value}))}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="twice-weekly">Twice a Week</option>
                    </select>
                  </div>
                  {newSched.frequency !== "daily" && (
                    <div>
                      <label className="text-slate-300 text-xs font-medium block mb-1">Day of Week</label>
                      <select value={newSched.dayOfWeek} onChange={e => setNewSched(p => ({...p, dayOfWeek: +e.target.value}))}
                        className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm">
                        {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1">Time (IST)</label>
                    <input type="time" value={newSched.time} onChange={e => setNewSched(p => ({...p, time: e.target.value}))}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1">Blogs per Run</label>
                    <select value={newSched.blogsPerRun} onChange={e => setNewSched(p => ({...p, blogsPerRun: +e.target.value}))}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm">
                      {[1,2,3,5].map(n => <option key={n} value={n}>{n} blog{n>1?"s":""}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1">Blog Length</label>
                    <select value={newSched.targetLength} onChange={e => setNewSched(p => ({...p, targetLength: e.target.value}))}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm">
                      <option value="short">Short (500-700 words)</option>
                      <option value="medium">Medium (900-1200 words)</option>
                      <option value="long">Long (1400-1800 words)</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={newSched.autoPickTopics} onChange={e => setNewSched(p => ({...p, autoPickTopics: e.target.checked}))}
                      className="w-4 h-4 accent-violet-500" />
                    <span className="text-slate-300 text-sm">Let AI auto-pick the best SEO topics</span>
                  </label>
                </div>
                {!newSched.autoPickTopics && (
                  <div className="mb-4">
                    <label className="text-slate-300 text-xs font-medium block mb-1">Your Topics (one per line)</label>
                    <textarea value={newSched.topicsText} onChange={e => setNewSched(p => ({...p, topicsText: e.target.value}))} rows={4}
                      placeholder={"Best refurbished server for small business India\nHP ProLiant vs Dell PowerEdge comparison 2025\nVPS hosting benefits for startups"}
                      className="w-full bg-[#0f172a] border border-[#263452] text-white rounded-lg px-3 py-2 text-sm font-mono" />
                    <p className="text-slate-500 text-xs mt-1">Topics will be used cyclically across runs</p>
                  </div>
                )}
                <button onClick={createSchedule}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-sm">
                  ✅ Create Schedule
                </button>
              </div>
            )}

            {/* Schedule List */}
            {schedules.length === 0 ? (
              <div className="bg-[#1e293b] rounded-xl p-12 text-center border border-[#263452]">
                <div className="text-4xl mb-3">⏰</div>
                <p className="text-slate-400">No schedules yet. Create one to auto-publish blogs!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {schedules.map(s => (
                  <div key={s.id} className={`bg-[#1e293b] rounded-xl p-5 border ${s.active ? "border-green-700/40" : "border-[#263452]"}`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {s.frequency === "daily" ? `Daily at ${s.time} IST` : s.frequency === "twice-weekly" ? `Twice weekly, starting ${DAYS[s.dayOfWeek]} at ${s.time} IST` : `Every ${DAYS[s.dayOfWeek]} at ${s.time} IST`}
                          {" · "}{s.blogsPerRun} blog{s.blogsPerRun > 1 ? "s" : ""} per run
                          {" · "}{s.autoPickTopics ? "AI picks topics" : `${s.topics.length} custom topic(s)`}
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${s.active ? "bg-green-500/20 text-green-400 border-green-600/40" : "bg-slate-700 text-slate-400 border-slate-600"}`}>
                        {s.active ? "ACTIVE" : "PAUSED"}
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500 mb-4">
                      <span>Total published: <strong className="text-white">{s.totalPublished}</strong></span>
                      {s.lastRun && <span>· Last run: {new Date(s.lastRun).toLocaleDateString("en-IN")}</span>}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => runScheduleNow(s.id)} disabled={runningId === s.id}
                        className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 text-white px-4 py-1.5 rounded-lg text-xs font-medium">
                        {runningId === s.id ? "Running..." : "▶ Run Now"}
                      </button>
                      <button onClick={() => toggleSchedule(s)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-medium border ${s.active ? "border-yellow-600 text-yellow-400 hover:bg-yellow-900/20" : "border-green-600 text-green-400 hover:bg-green-900/20"}`}>
                        {s.active ? "⏸ Pause" : "▶ Resume"}
                      </button>
                      <button onClick={() => deleteSchedule(s.id)}
                        className="border border-red-700 text-red-400 hover:bg-red-900/20 px-4 py-1.5 rounded-lg text-xs font-medium">
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REWRITE EXISTING BLOGS ───────────────────────── */}
        {tab === "blogs" && (
          <div>
            {rewriteMsg && (
              <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${rewriteMsg.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"}`}>
                {rewriteMsg}
              </div>
            )}
            <div className="bg-[#1e293b] rounded-xl p-5 mb-4 border border-[#263452]">
              <p className="text-slate-400 text-sm">AI will rewrite the blog with better SEO, add FAQ section, improve headings, add comparison tables, and republish it. You'll get an email with what changed.</p>
            </div>
            {blogs.length === 0 ? (
              <div className="bg-[#1e293b] rounded-xl p-12 text-center border border-[#263452]">
                <p className="text-slate-400">No blogs found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {blogs.map(b => (
                  <div key={b.id} className="bg-[#1e293b] rounded-xl p-4 border border-[#263452] flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{b.title}</div>
                      <div className="flex gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${b.status === "published" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>{b.status}</span>
                        <span className="text-xs text-slate-500">{new Date(b.created_at).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>
                    <button onClick={() => rewriteBlog(b.id)} disabled={rewritingId === b.id}
                      className="flex-shrink-0 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 text-white px-4 py-2 rounded-lg text-xs font-medium">
                      {rewritingId === b.id ? "Rewriting..." : "✍️ Rewrite with AI"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAgentDashboard;
