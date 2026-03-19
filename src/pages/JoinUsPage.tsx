import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, GraduationCap, Globe, MapPin, Clock, ArrowRight,
  Search, Users, Award, Zap, Heart, TrendingUp, ShieldCheck,
  CheckCircle, Star, Send, ChevronRight, Building2, Code2, BarChart3,
  HeadphonesIcon, Wrench, BadgeCheck, Mail
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const API = "http://localhost:5000";
const WA_NUMBER = "919999656064";

type TabType = "all" | "jobs" | "internships" | "remote";

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

const tabConfig: { key: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: "all", label: "All Openings", icon: <Briefcase size={16} />, desc: "View all vacancies" },
  { key: "jobs", label: "Full-Time Jobs", icon: <Building2 size={16} />, desc: "Permanent positions" },
  { key: "internships", label: "Internships", icon: <GraduationCap size={16} />, desc: "Learn & grow" },
  { key: "remote", label: "Remote Roles", icon: <Globe size={16} />, desc: "Work from anywhere" },
];

const deptIcons: Record<string, React.ReactNode> = {
  engineering: <Code2 size={16} />,
  sales: <BarChart3 size={16} />,
  support: <HeadphonesIcon size={16} />,
  operations: <Wrench size={16} />,
  default: <Briefcase size={16} />,
};

const typeColor: Record<string, { bg: string; text: string; badge: string }> = {
  jobs: { bg: "bg-blue-50", text: "text-[#0055E5]", badge: "bg-blue-100 text-[#0055E5]" },
  internships: { bg: "bg-slate-50", text: "text-slate-700", badge: "bg-slate-100 text-slate-700" },
  remote: { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700" },
};

const perks = [
  { icon: <TrendingUp size={20} />, title: "Fast Career Growth", desc: "Transparent roadmap with mentorship. Grow faster with real ownership on live systems." },
  { icon: <Award size={20} />, title: "Learning & Certifications", desc: "Company-sponsored AWS, Azure & Linux certifications. Stay ahead of the curve." },
  { icon: <Heart size={20} />, title: "Work-Life Balance", desc: "Flexible timings, remote-friendly culture, and meaningful work that doesn't burn you out." },
  { icon: <ShieldCheck size={20} />, title: "Health & Wellness Benefits", desc: "Medical insurance coverage for you and your family. Your wellbeing matters to us." },
  { icon: <Users size={20} />, title: "Collaborative Culture", desc: "No micromanagement. Direct communication, flat hierarchy, and genuine team support." },
  { icon: <Zap size={20} />, title: "Real Impact Work", desc: "Your code and solutions run in actual production environments serving real enterprises." },
];

const process_steps = [
  { step: "01", title: "Application Review", desc: "We carefully review your profile, experience, and portfolio. No ghost rejections — you'll always hear back." },
  { step: "02", title: "Technical Discussion", desc: "Practical conversation about your skills, past projects, and problem-solving approach." },
  { step: "03", title: "Task-Based Evaluation", desc: "Real-world task or system design challenge relevant to the role — nothing theoretical." },
  { step: "04", title: "Culture Fit Interview", desc: "Meet the team. We assess alignment of expectations, values, and growth mindset." },
  { step: "05", title: "Offer & Onboarding", desc: "Fast offer turnaround. Structured 30-day onboarding with a dedicated mentor assigned." },
];

const JoinUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const url = activeTab === "all"
          ? `${API}/api/jobs/public`
          : `${API}/api/jobs/public?type=${activeTab}`;
        const res = await fetch(url);
        const data = await res.json();
        setJobs(data.data || []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    setExpandedJob(null);
  }, [activeTab]);

  const handleApply = (job: Job) => {
    const msg = encodeURIComponent(`Hi Serverwale! I'm applying for: *${job.title}* (${job.location}). Please share more details about the role.`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    (j.department || "").toLowerCase().includes(search.toLowerCase()) ||
    (j.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const getDeptIcon = (dept: string) => {
    const key = (dept || "").toLowerCase();
    for (const k in deptIcons) { if (key.includes(k)) return deptIcons[k]; }
    return deptIcons.default;
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden text-white min-h-[480px] md:min-h-[540px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(139,92,246,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-28 pb-16 md:pt-32 md:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Careers</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 w-fit">
            <BadgeCheck size={12} /> WE'RE HIRING — JOIN INDIA'S GROWING IT INFRASTRUCTURE TEAM
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5 max-w-4xl">
            Build Your Career at{" "}
            <span className="text-[#5BAEFF]">
              Serverwale™
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Join a <strong className="text-white">mission-driven IT infrastructure company</strong> trusted by 500+ enterprises across India.
            Work on <strong className="text-white">real enterprise systems</strong>, grow faster, and make actual impact —
            not just write code that gathers dust.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => {
                const el = document.getElementById("open-positions");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 bg-[#0055E5] text-[#0F172A] px-6 py-3 rounded-xl font-black text-sm hover:bg-[#0055E5] transition"
            >
              View Open Positions <ArrowRight size={16} />
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'd like to explore career opportunities at Serverwale.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-black text-sm transition"
            >
              <FaWhatsapp size={16} /> WhatsApp HR
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Team Members", value: "50+" },
              { label: "Cities", value: "6+" },
              { label: "Years in Business", value: "7+" },
              { label: "Clients Served", value: "500+" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-[#0055E5]">{s.value}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY SERVERWALE — Perks ══ */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest">Why Join Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-3 mb-4">
              More Than Just a <span className="text-[#0055E5]">Job</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              At Serverwale, we invest in people who invest in themselves. Here's what makes us different from every other IT company.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#0055E5]/40 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0055E5] mb-4 group-hover:bg-[#0044BB] group-hover:text-white transition-all duration-300">
                  {perk.icon}
                </div>
                <h3 className="font-black text-[#0F172A] mb-2">{perk.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ══ */}
      <section id="open-positions" className="py-16 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest">Current Openings</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mt-3 mb-4">
              Open Job Vacancies at Serverwale
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Explore <strong>full-time jobs, internships, and remote opportunities</strong> in IT infrastructure, cloud computing, sales, and support.
              All roles come with mentorship and growth opportunities.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tabConfig.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border transition-all ${
                  activeTab === tab.key
                    ? "bg-[#0F172A] text-white border-[#040A1C] shadow-lg"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#0055E5]/40 hover:bg-blue-50"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-lg">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by role, department, location…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <Briefcase size={48} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-400 mb-2">No openings right now</h3>
              <p className="text-slate-400 text-sm mb-6">
                We're always looking for great talent. Share your CV and we'll reach out when there's a fit!
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in career opportunities at Serverwale. Please keep my profile in mind.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition"
              >
                <FaWhatsapp size={16} /> Share Your CV on WhatsApp
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => {
                const colors = typeColor[job.job_type] || typeColor.jobs;
                const isOpen = expandedJob === job.id;
                return (
                  <div
                    key={job.id}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-blue-400 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-[#0055E5]/30 hover:shadow-md"}`}
                  >
                    {/* Card Header */}
                    <div
                      className={`p-5 md:p-6 cursor-pointer ${isOpen ? "bg-[#0F172A]" : "bg-white hover:bg-slate-50"} transition-colors`}
                      onClick={() => setExpandedJob(isOpen ? null : job.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isOpen ? "bg-[#0055E5]/20 text-blue-300" : `${colors.bg} ${colors.text}`}`}>
                          {getDeptIcon(job.department)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className={`font-black text-base ${isOpen ? "text-white" : "text-[#0F172A]"}`}>{job.title}</h3>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${colors.badge}`}>
                              {job.job_type === "jobs" ? "Full-Time" : job.job_type === "internships" ? "Internship" : "Remote"}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <span className={`flex items-center gap-1.5 font-medium ${isOpen ? "text-slate-300" : "text-slate-500"}`}>
                              <MapPin size={12} /> {job.location || "Delhi NCR"}
                            </span>
                            <span className={`flex items-center gap-1.5 font-medium ${isOpen ? "text-slate-300" : "text-slate-500"}`}>
                              <Clock size={12} /> {job.employment_type || "Full-Time"}
                            </span>
                            {job.experience && (
                              <span className={`flex items-center gap-1.5 font-medium ${isOpen ? "text-slate-300" : "text-slate-500"}`}>
                                <Star size={12} /> {job.experience}
                              </span>
                            )}
                            {job.department && (
                              <span className={`flex items-center gap-1.5 font-medium ${isOpen ? "text-slate-300" : "text-slate-500"}`}>
                                <Building2 size={12} /> {job.department}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3 md:shrink-0">
                          <button
                            onClick={e => { e.stopPropagation(); handleApply(job); }}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-black text-xs transition"
                          >
                            <FaWhatsapp size={14} /> Apply Now
                          </button>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isOpen ? "bg-[#0055E5]/20 text-blue-300" : "bg-slate-100 text-slate-400"}`}>
                            {isOpen ? "−" : "+"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isOpen && (
                      <div className="bg-blue-50/50 border-t border-blue-100 p-5 md:p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {job.description && (
                            <div>
                              <h4 className="font-black text-[#0F172A] text-sm mb-2 flex items-center gap-2">
                                <Briefcase size={14} className="text-blue-500" /> About This Role
                              </h4>
                              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
                            </div>
                          )}
                          {job.requirements && (
                            <div>
                              <h4 className="font-black text-[#0F172A] text-sm mb-2 flex items-center gap-2">
                                <CheckCircle size={14} className="text-blue-500" /> Requirements & Skills
                              </h4>
                              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.requirements}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-5 pt-4 border-t border-blue-100 flex flex-wrap gap-3">
                          <button
                            onClick={() => handleApply(job)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-black text-sm transition"
                          >
                            <FaWhatsapp size={16} /> Apply on WhatsApp
                          </button>
                          <a
                            href={`mailto:hr@serverwale.com?subject=Application: ${job.title}&body=Hi, I'm interested in the ${job.title} role at Serverwale. Please find my details below.`}
                            className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#091D3A] text-white px-6 py-3 rounded-xl font-black text-sm transition"
                          >
                            <Mail size={16} /> Email CV
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ LIFE AT SERVERWALE ══ */}
      <section className="py-16 md:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4 block">Life at Serverwale</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Work That{" "}
                <span className="text-[#5BAEFF]">
                  Actually Matters
                </span>
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                We are a <strong className="text-white">technology-first organization</strong> where decisions are driven by logic, data, and long-term thinking.
                Our teams work on <strong className="text-white">real production systems</strong> used by 500+ businesses — no unnecessary layers, no guesswork.
              </p>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                From <strong className="text-slate-300">refurbished server infrastructure</strong> to cloud deployments and AI workloads,
                every team member at Serverwale directly impacts how Indian enterprises build their IT backbone.
              </p>
              <ul className="space-y-3">
                {[
                  "Real enterprise-scale projects from Day 1",
                  "Clear ownership & full accountability",
                  "AWS, Azure & Linux certification support",
                  "Remote-friendly & flexible work culture",
                  "Transparent promotion & growth roadmap",
                  "Direct communication — no politics",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-green-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0F172A] to-[#0F172A] p-8 rounded-2xl border border-blue-900/40">
              <h3 className="text-white font-black text-xl mb-6">Our 5-Step Hiring Process</h3>
              <div className="space-y-5">
                {process_steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#0055E5]/20 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center text-xs font-black shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DIDN'T FIND A ROLE CTA ══ */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-[#0F172A] rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <Send size={12} /> OPEN APPLICATION
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              Didn't Find the Right Role?
            </h2>
            <p className="text-slate-300 mb-3 leading-relaxed max-w-xl mx-auto text-sm">
              If you're passionate about <strong className="text-white">IT infrastructure, cloud computing, enterprise sales,</strong> or{" "}
              <strong className="text-white">building reliable systems</strong>, we'd love to hear from you.
            </p>
            <p className="text-slate-400 text-xs mb-8">Share your profile and we'll reach out when there's a fit. No spam. No ghost rejections.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in joining Serverwale. Here is my profile/CV:")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-sm transition"
              >
                <FaWhatsapp size={17} /> Share Your CV on WhatsApp
              </a>
              <a
                href="mailto:hr@serverwale.com?subject=Open Application — Serverwale"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition"
              >
                <Mail size={16} /> Email: hr@serverwale.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM SEO SECTION ══ */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-black text-[#0F172A] text-sm mb-2">IT Jobs in Delhi NCR</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Looking for <strong>IT jobs in Delhi NCR</strong>? Serverwale is hiring DevOps engineers, cloud architects, sales executives, and IT support specialists for its Nehru Place headquarters.
              </p>
            </div>
            <div>
              <h3 className="font-black text-[#0F172A] text-sm mb-2">Tech Internships in India</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Fresh graduates looking for <strong>cloud engineering internships</strong> or <strong>IT internship programs in Delhi</strong>? We offer hands-on, mentored internships on live enterprise systems.
              </p>
            </div>
            <div>
              <h3 className="font-black text-[#0F172A] text-sm mb-2">Remote IT Roles</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We offer <strong>remote DevOps jobs</strong>, backend developer roles, and SRE positions for experienced professionals who deliver results from anywhere in India.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default JoinUsPage;
