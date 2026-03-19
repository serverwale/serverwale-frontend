import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import AdminHeader from "../../components/Admin/AdminHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API: string = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";

/* ─── Types ─────────────────────────────────────────────── */
interface Visitor {
  sessionId: string;
  ip: string;
  page: string;
  country: string;
  city: string;
  flag: string;
  browser: string;
  device: string;
  os: string;
  timestamp: string;
  lastSeen: string;
}
interface SecurityLog {
  id: number;
  timestamp: string;
  type: string;
  ip: string;
  detail: string;
  severity: "low" | "medium" | "high" | "critical";
}
interface AgentInfo {
  name: string;
  status: string;
  icon: string;
  description: string;
  stats: Record<string, unknown>;
  reportSchedule: string;
}
interface AnalyticsSummary {
  activeNow: number;
  todayVisits: number;
  todayUnique: number;
  totalPageViews: number;
  topPages: { page: string; views: number }[];
  topCountries: { country: string; visits: number }[];
  deviceStats: Record<string, number>;
  browserStats: Record<string, number>;
}

/* ─── Severity badge ────────────────────────────────────── */
const SevBadge = ({ s }: { s: string }) => {
  const map: Record<string, string> = {
    critical: "bg-red-600 text-white",
    high:     "bg-orange-500 text-white",
    medium:   "bg-yellow-400 text-black",
    low:      "bg-green-500 text-white",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${map[s] || "bg-gray-600 text-white"}`}>
      {s}
    </span>
  );
};

/* ─── Stat card ─────────────────────────────────────────── */
const StatCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="bg-[#0f172a] rounded-xl p-4 text-center border border-[#1e293b]">
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">{label}</div>
  </div>
);

/* ─── Main Component ────────────────────────────────────── */
const AIAgentsDashboard: React.FC = () => {
  const socketRef = useRef<Socket | null>(null);

  const [tab, setTab]                   = useState<"live"|"security"|"analytics"|"agents"|"reports">("live");
  const [liveVisitors, setLiveVisitors] = useState<Visitor[]>([]);
  const [activeCount, setActiveCount]   = useState(0);
  const [secLogs, setSecLogs]           = useState<SecurityLog[]>([]);
  const [agents, setAgents]             = useState<AgentInfo[]>([]);
  const [analytics, setAnalytics]       = useState<AnalyticsSummary | null>(null);
  const [reportStatus, setReportStatus] = useState<string>("");
  const [reportLoading, setReportLoading] = useState<string>("");

  /* Socket.io */
  useEffect(() => {
    const socket = io(API, { transports: ["websocket", "polling"] });
    socketRef.current = socket;
    socket.emit("join-admin");

    socket.on("visitor-update", ({ activeCount: cnt, activeVisitors: vis }) => {
      if (cnt !== undefined) setActiveCount(cnt);
      if (vis) setLiveVisitors(vis);
    });
    socket.on("security-logs", ({ logs, suspiciousIPs }) => {
      if (logs) setSecLogs(logs);
    });

    return () => { socket.disconnect(); };
  }, []);

  /* Fetch on tab change */
  useEffect(() => {
    if (tab === "security") fetchSecLogs();
    if (tab === "analytics") fetchAnalytics();
    if (tab === "agents") fetchAgents();
  }, [tab]);

  async function fetchSecLogs() {
    const r = await fetch(`${API}/api/ai/security/logs?limit=50`);
    const d = await r.json();
    if (d.success) setSecLogs(d.logs.reverse());
  }

  async function fetchAnalytics() {
    const r = await fetch(`${API}/api/ai/analytics/summary`);
    const d = await r.json();
    if (d.success) setAnalytics(d);
  }

  async function fetchAgents() {
    const r = await fetch(`${API}/api/ai/status`);
    const d = await r.json();
    if (d.success) setAgents(d.agents);
  }

  async function sendReport(type: string, label: string) {
    setReportLoading(type);
    setReportStatus("");
    try {
      const r = await fetch(`${API}/api/ai/reports/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const d = await r.json();
      setReportStatus(d.message || (d.success ? "✅ Sent!" : "❌ Failed"));
    } catch {
      setReportStatus("❌ Network error");
    }
    setReportLoading("");
  }

  /* ─── TABS ─────────────────────────────────────────────── */
  const tabs = [
    { id: "live",      label: "🔴 Live Visitors" },
    { id: "security",  label: "🛡️ Security" },
    { id: "analytics", label: "📊 Analytics" },
    { id: "agents",    label: "🤖 Agents" },
    { id: "reports",   label: "📧 Reports" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">🤖 AI Agents Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time monitoring — Security · Analytics · Marketing · SEO · Reports</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">ALL AGENTS ACTIVE</span>
            <span className="text-slate-500 text-xs ml-4">{activeCount} visitors online right now</span>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "bg-[#1e293b] text-slate-300 hover:bg-[#263452]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── LIVE VISITORS ────────────────────────────────── */}
        {tab === "live" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Active Now" value={activeCount} color="text-cyan-400" />
              <StatCard label="Total Tracked" value={liveVisitors.length} color="text-indigo-400" />
              <StatCard label="Countries" value={[...new Set(liveVisitors.map(v => v.country))].length} color="text-purple-400" />
              <StatCard label="Devices" value={[...new Set(liveVisitors.map(v => v.device))].length} color="text-green-400" />
            </div>

            <div className="bg-[#1e293b] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#263452] flex items-center gap-2">
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                <span className="font-semibold text-sm">Live Visitor Map</span>
                <span className="ml-auto text-xs text-slate-400">Auto-refreshes via Socket.io</span>
              </div>
              {liveVisitors.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <div className="text-4xl mb-3">👁️</div>
                  <p>Waiting for visitors...</p>
                  <p className="text-xs mt-1">Real-time tracking active</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 text-xs uppercase border-b border-[#263452]">
                        <th className="px-4 py-3 text-left">Location</th>
                        <th className="px-4 py-3 text-left">Page</th>
                        <th className="px-4 py-3 text-left">Device</th>
                        <th className="px-4 py-3 text-left">Browser</th>
                        <th className="px-4 py-3 text-left">IP</th>
                        <th className="px-4 py-3 text-left">Since</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liveVisitors.map((v) => (
                        <tr key={v.sessionId} className="border-b border-[#1a2540] hover:bg-[#263452]/30">
                          <td className="px-4 py-3">
                            <span className="text-lg mr-2">{v.flag}</span>
                            <span className="text-white font-medium">{v.city || v.country}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-indigo-300 font-mono text-xs">{v.page}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{v.device}</td>
                          <td className="px-4 py-3 text-slate-300">{v.browser}</td>
                          <td className="px-4 py-3 text-slate-400 font-mono text-xs">{v.ip}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs">
                            {new Date(v.timestamp).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SECURITY ─────────────────────────────────────── */}
        {tab === "security" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Critical" value={secLogs.filter(l => l.severity === "critical").length} color="text-red-400" />
              <StatCard label="High" value={secLogs.filter(l => l.severity === "high").length} color="text-orange-400" />
              <StatCard label="Medium" value={secLogs.filter(l => l.severity === "medium").length} color="text-yellow-400" />
              <StatCard label="Low" value={secLogs.filter(l => l.severity === "low").length} color="text-green-400" />
            </div>

            <div className="bg-[#1e293b] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#263452] font-semibold text-sm flex items-center justify-between">
                🛡️ Recent Security Events
                <button onClick={fetchSecLogs} className="text-xs text-indigo-400 hover:underline">Refresh</button>
              </div>
              {secLogs.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <div className="text-4xl mb-3">✅</div>
                  <p>No security events — all clear!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 text-xs uppercase border-b border-[#263452]">
                        <th className="px-4 py-3 text-left">Severity</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-left">IP</th>
                        <th className="px-4 py-3 text-left">Detail</th>
                        <th className="px-4 py-3 text-left">Time (IST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {secLogs.map((l) => (
                        <tr key={l.id} className="border-b border-[#1a2540] hover:bg-[#263452]/30">
                          <td className="px-4 py-3"><SevBadge s={l.severity} /></td>
                          <td className="px-4 py-3 text-white font-medium text-xs">{l.type}</td>
                          <td className="px-4 py-3 text-slate-300 font-mono text-xs">{l.ip}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">{l.detail}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs">
                            {new Date(l.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ANALYTICS ────────────────────────────────────── */}
        {tab === "analytics" && (
          <div>
            {!analytics ? (
              <div className="text-center py-20 text-slate-400">Loading analytics...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard label="Active Now" value={analytics.activeNow} color="text-cyan-400" />
                  <StatCard label="Today Visits" value={analytics.todayVisits} color="text-green-400" />
                  <StatCard label="Unique Today" value={analytics.todayUnique} color="text-purple-400" />
                  <StatCard label="Total Page Views" value={analytics.totalPageViews} color="text-yellow-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Top Pages */}
                  <div className="bg-[#1e293b] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#263452] font-semibold text-sm">📄 Top Pages</div>
                    <div className="p-4">
                      {analytics.topPages.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-4">No data yet</p>
                      ) : (
                        analytics.topPages.map((p, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-[#263452] last:border-0">
                            <span className="text-slate-400 text-xs font-mono">{p.page}</span>
                            <span className="text-indigo-300 font-bold text-sm">{p.views}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Top Countries */}
                  <div className="bg-[#1e293b] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#263452] font-semibold text-sm">🌍 Top Countries</div>
                    <div className="p-4">
                      {analytics.topCountries.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-4">No data yet</p>
                      ) : (
                        analytics.topCountries.map((c, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-[#263452] last:border-0">
                            <span className="text-white text-sm">{c.country}</span>
                            <span className="text-green-400 font-bold text-sm">{c.visits}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Devices */}
                  <div className="bg-[#1e293b] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#263452] font-semibold text-sm">📱 Devices</div>
                    <div className="p-4 flex gap-4 flex-wrap">
                      {Object.entries(analytics.deviceStats).map(([d, c]) => (
                        <div key={d} className="text-center">
                          <div className="text-2xl font-bold text-cyan-400">{c}</div>
                          <div className="text-xs text-slate-400">{d}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Browsers */}
                  <div className="bg-[#1e293b] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#263452] font-semibold text-sm">🌐 Browsers</div>
                    <div className="p-4 flex gap-4 flex-wrap">
                      {Object.entries(analytics.browserStats).map(([b, c]) => (
                        <div key={b} className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{c}</div>
                          <div className="text-xs text-slate-400">{b}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── AGENTS STATUS ─────────────────────────────────── */}
        {tab === "agents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.length === 0 && (
              <div className="col-span-2 text-center py-16 text-slate-400">
                <button onClick={fetchAgents} className="bg-indigo-600 px-6 py-2 rounded-lg text-white hover:bg-indigo-700">Load Agents</button>
              </div>
            )}
            {agents.map((agent, i) => (
              <div key={i} className="bg-[#1e293b] rounded-xl p-5 border border-[#263452]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl mb-1">{agent.icon}</div>
                    <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">{agent.description}</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 uppercase">
                    {agent.status}
                  </span>
                </div>
                <div className="bg-[#0f172a] rounded-lg p-3 mb-3">
                  {Object.entries(agent.stats).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1">
                      <span className="text-slate-400 text-xs capitalize">{k}</span>
                      <span className="text-white text-xs font-medium">{String(v)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-indigo-300 flex items-center gap-1">
                  <span>📧</span>
                  <span>{agent.reportSchedule}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── REPORTS ───────────────────────────────────────── */}
        {tab === "reports" && (
          <div>
            <div className="bg-[#1e293b] rounded-xl p-6 mb-6 border border-[#263452]">
              <h2 className="font-bold text-white text-lg mb-1">📧 Email Reports Configuration</h2>
              <p className="text-slate-400 text-sm mb-4">All reports are sent automatically. You can also trigger them manually.</p>
              <div className="bg-[#0f172a] rounded-lg p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">From:</span>
                  <span className="text-white font-mono">hostserverwale@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">To:</span>
                  <span className="text-white font-mono">akankshaa.mee@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Daily Report:</span>
                  <span className="text-green-400">Every day at 8:00 AM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Marketing:</span>
                  <span className="text-green-400">Every Monday at 9:00 AM IST</span>
                </div>
              </div>
            </div>

            {reportStatus && (
              <div className={`p-4 rounded-lg mb-4 text-sm font-medium ${reportStatus.includes("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"}`}>
                {reportStatus}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "security",  label: "🛡️ Send Security Report",  desc: "Sends current security events, flagged IPs, threat summary" },
                { type: "traffic",   label: "📊 Send Traffic Report",    desc: "Sends live visitor stats, top pages, countries, devices" },
                { type: "marketing", label: "📈 Send Marketing Report",  desc: "Sends lead stats, recommendations, SEO keywords" },
              ].map(r => (
                <div key={r.type} className="bg-[#1e293b] rounded-xl p-5 border border-[#263452]">
                  <h3 className="font-bold text-white mb-2">{r.label}</h3>
                  <p className="text-slate-400 text-xs mb-4">{r.desc}</p>
                  <p className="text-xs text-slate-500 mb-4">→ akankshaa.mee@gmail.com</p>
                  <button
                    onClick={() => sendReport(r.type, r.label)}
                    disabled={reportLoading === r.type}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {reportLoading === r.type ? "Sending..." : "Send Now"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#1e293b] rounded-xl p-5 border border-amber-700/30">
              <h3 className="font-bold text-amber-400 mb-2">⚙️ Setup Required</h3>
              <p className="text-slate-400 text-sm mb-3">To enable email reports, add your Gmail App Password in the backend .env file:</p>
              <div className="bg-[#0f172a] rounded-lg p-3 font-mono text-xs text-green-300">
                <p>REPORT_FROM_EMAIL=hostserverwale@gmail.com</p>
                <p>REPORT_TO_EMAIL=akankshaa.mee@gmail.com</p>
                <p>REPORT_EMAIL_PASS=<span className="text-yellow-400">your-16-digit-app-password</span></p>
              </div>
              <p className="text-slate-500 text-xs mt-2">Get App Password: Google Account → Security → 2-Step Verification → App passwords</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentsDashboard;
