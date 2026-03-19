import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Cloud, Cpu, ShieldCheck, Truck, BadgeCheck,
  Zap, Database, Globe, CheckCircle, Star, Award,
  Monitor, Server, ShoppingBag, Package, Flame,
  TrendingUp, BarChart3, Layers
} from "lucide-react";

/* ---------------------------------------------------
   HOME � ProStation Systems Brand + Store + Cloud Sections
--------------------------------------------------- */

const HomeStoreSections: React.FC = () => {
  return (
    <>

      {/* --------------------------------------------------
          SECTION 1 � ProStation Systems Brand (Our Own Products)
      -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(37,99,235,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">

          {/* Brand Badge */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0055E5]/15 border border-blue-500/30 text-blue-300 text-xs font-black px-5 py-2 rounded-full mb-5 uppercase tracking-widest">
              <Flame size={12} /> Introducing Our In-House Brand
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Pro<span className="text-[#5BAEFF]">Station</span>�
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-2">
              <strong className="text-white">India's First Purpose-Built Workstation & Server Brand</strong> �
              engineered by Serverwale for AI, rendering, cloud, and enterprise computing.
            </p>
            <p className="text-slate-400 text-sm max-w-xl">
              Every ProStation Systems� machine is <strong className="text-slate-300">custom-configured, rigorously tested,</strong> and
              backed by a <strong className="text-slate-300">1-year comprehensive warranty.</strong>
            </p>
          </div>

          {/* Product Lines Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Cpu size={28} />,
                name: "ProStation Systems GPU",
                tagline: "Built for AI & Rendering",
                desc: "Dual & quad GPU workstations engineered for AI/ML model training, 3D rendering, VFX pipelines, and scientific computing.",
                tags: ["AI / ML", "Cinema 4D", "Blender", "Unreal Engine"],
                highlight: "Dual RTX 4090 � 256GB RAM",
                accent: "from-blue-600 to-blue-800",
                badgeBg: "bg-[#0055E5]/20 border-blue-500/30 text-blue-300",
              },
              {
                icon: <Monitor size={28} />,
                name: "ProStation Systems Creator",
                tagline: "For Designers & Studios",
                desc: "High-refresh workstations for 4K/8K video editing, motion graphics, CAD/CAM design, and professional content creation workflows.",
                tags: ["Premiere Pro", "DaVinci Resolve", "AutoCAD", "SolidWorks"],
                highlight: "Intel i9 / Ryzen 9 � 128GB RAM",
                accent: "from-purple-600 to-purple-800",
                badgeBg: "bg-[#EDF4FF]/10 border-[#C7D2FE]/20 text-[#A5B4FC]",
              },
              {
                icon: <Server size={28} />,
                name: "ProStation Systems Server",
                tagline: "Enterprise-Ready Servers",
                desc: "Custom rack-mount and tower servers built on HP, Dell & Lenovo platforms � configured for your exact workload and budget.",
                tags: ["Virtualization", "Database", "HPC", "ERP"],
                highlight: "Dual Xeon � 1TB RAM Capable",
                accent: "from-[#0055E5] to-[#0044BB]",
                badgeBg: "bg-[#CFFAFE]/15 border-[#A5F3FC]/20 text-[#67E8F9]",
              },
              {
                icon: <Database size={28} />,
                name: "ProStation Systems NAS",
                tagline: "Intelligent Storage Systems",
                desc: "Network-attached storage solutions for video production houses, enterprises, and data-heavy environments needing fast shared access.",
                tags: ["Video NAS", "Backup", "RAID", "iSCSI"],
                highlight: "Up to 1PB � 10GbE Ready",
                accent: "from-orange-600 to-orange-800",
                badgeBg: "bg-[#FEF3C7]/15 border-[#FDE68A]/20 text-[#FCD34D]",
              },
              {
                icon: <Layers size={28} />,
                name: "ProStation Systems HPC",
                tagline: "Cluster Computing",
                desc: "High-performance computing clusters for research institutes, pharma labs, financial modeling, and deep learning training at scale.",
                tags: ["Research", "Genomics", "Quant Finance", "Deep Learning"],
                highlight: "InfiniBand � Multi-node Cluster",
                accent: "from-[#0055E5] to-[#6366F1]",
                badgeBg: "bg-[#D3E8FF]/15 border-[#B3D5FF]/20 text-[#0055E5]",
              },
              {
                icon: <BarChart3 size={28} />,
                name: "ProStation Systems Edge",
                tagline: "Edge Computing Solutions",
                desc: "Compact, fanless edge servers for retail, manufacturing, IoT deployments, and real-time data processing at the network edge.",
                tags: ["IoT", "Retail", "CCTV AI", "Edge AI"],
                highlight: "Compact Form � Industrial Grade",
                accent: "from-slate-700 to-slate-900",
                badgeBg: "bg-[#EDF4FF]/10 border-[#C7D2FE]/20 text-[#A5B4FC]",
              },
            ].map((product, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.accent} flex items-center justify-center text-white shadow-lg`}>
                    {product.icon}
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${product.badgeBg} uppercase tracking-wide`}>
                    ProStation Systems�
                  </span>
                </div>

                {/* Name & tagline */}
                <h3 className="text-white font-black text-lg mb-0.5">{product.name}</h3>
                <p className="text-[#0EA5E9] text-xs font-bold uppercase tracking-wider mb-3">{product.tagline}</p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{product.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] bg-white/8 border border-white/10 text-slate-400 px-2.5 py-1 rounded-lg font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlight */}
                <div className="text-xs text-slate-300 font-semibold border-t border-white/10 pt-3">
                  ? {product.highlight}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-5">
              All ProStation Systems� products are <strong className="text-slate-300">configurable to your exact requirements</strong> �
              from RAM and storage to GPU count and networking.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/product"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] px-8 py-4 rounded-xl font-black text-sm hover:bg-[#0044BB] hover:text-white transition shadow-xl duration-250"
              >
                <Package size={16} /> View All ProStation Systems� Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/15 transition"
              >
                Get Custom Configuration Quote
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------
          SECTION 2 � Store (Buy Online)
      ---------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT � Content */}
            <div>
              <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest mb-4 block">
                Serverwale� Online Store
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight mb-5">
                Buy Servers & IT Hardware{" "}
                <span className="text-[#0055E5]">
                  Online� Instantly
                </span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
                Shop our <strong className="text-slate-700">curated online store</strong> for in-stock refurbished servers,
                ProStation Systems� workstations, networking gear, and IT accessories.
                Every item is <strong className="text-slate-700">priced transparently, tested, and ships with warranty.</strong>
                No negotiation needed � just pick, order, and deploy.
              </p>

              {/* Feature checklist */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <BadgeCheck size={15} />, text: "Genuine, tested hardware" },
                  { icon: <Star size={15} />, text: "Transparent, fixed pricing" },
                  { icon: <Truck size={15} />, text: "Fast delivery pan-India" },
                  { icon: <ShieldCheck size={15} />, text: "Warranty on every product" },
                  { icon: <Zap size={15} />, text: "Same-day dispatch Delhi NCR" },
                  { icon: <Award size={15} />, text: "Bulk order discounts available" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <div className="text-blue-500 shrink-0">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop/now"
                  className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-250 shadow-lg shadow-blue-500/25"
                >
                  <ShoppingBag size={17} /> Visit Our Store <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#0055E5] px-6 py-4 rounded-xl font-semibold text-sm hover:bg-blue-100 transition"
                >
                  Request Bulk Quote
                </Link>
              </div>
            </div>

            {/* RIGHT � Store Preview Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  emoji: "???",
                  name: "ProStation Systems GPU Workstation",
                  price: "?1,85,000",
                  original: "?3,20,000",
                  badge: "42% OFF",
                  badgeColor: "bg-red-500",
                  rating: 5,
                  tag: "AI Workstation",
                },
                {
                  emoji: "??",
                  name: "HP ProLiant DL380 G10",
                  price: "?89,000",
                  original: "?1,80,000",
                  badge: "51% OFF",
                  badgeColor: "bg-green-600",
                  rating: 5,
                  tag: "Refurbished Server",
                },
                {
                  emoji: "?",
                  name: "Dell PowerEdge R740",
                  price: "?72,000",
                  original: "?1,50,000",
                  badge: "52% OFF",
                  badgeColor: "bg-[#0055E5]",
                  rating: 4,
                  tag: "Enterprise Server",
                },
                {
                  emoji: "??",
                  name: "Lenovo ThinkSystem SR650",
                  price: "?1,10,000",
                  original: "?2,10,000",
                  badge: "48% OFF",
                  badgeColor: "bg-slate-100",
                  rating: 5,
                  tag: "Rack Server",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  to="/shop/now"
                  className="group bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#0055E5]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Product emoji placeholder */}
                  <div className="bg-slate-50 rounded-xl h-24 flex items-center justify-center text-4xl mb-3 group-hover:bg-blue-50 transition">
                    {item.emoji}
                  </div>

                  {/* Badge */}
                  <span className={`text-[9px] font-black text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>

                  {/* Name */}
                  <h4 className="text-xs font-black text-[#0F172A] mt-2 mb-1 leading-snug line-clamp-2">{item.name}</h4>

                  {/* Tag */}
                  <p className="text-[10px] text-slate-400 mb-2">{item.tag}</p>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={9} className={j < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-[#0F172A]">{item.price}</span>
                    <span className="text-[10px] text-slate-400 line-through">{item.original}</span>
                  </div>
                </Link>
              ))}

              {/* View all CTA */}
              <Link
                to="/shop/now"
                className="col-span-2 bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-blue-900/40 rounded-2xl p-4 flex items-center justify-between group hover:from-[#1E293B] hover:to-[#040A1C] transition-all"
              >
                <div>
                  <p className="text-white font-black text-sm">500+ Products in Stock</p>
                  <p className="text-slate-400 text-xs mt-0.5">Servers, Workstations, Networking & More</p>
                </div>
                <div className="w-10 h-10 bg-[#0055E5] rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------
          SECTION 3 � Cloud Solutions
      ------------------------------------------ */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/60 rounded-full translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT � Cloud Dashboard Mockup */}
            <div>
              <div className="bg-[#0F172A] rounded-2xl p-7 border border-blue-900/40 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#0055E5]/20 rounded-lg flex items-center justify-center">
                      <Cloud size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm">Serverwale Cloud</p>
                      <p className="text-slate-500 text-[10px]">Infrastructure Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-[10px] font-bold">All Systems Online</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Uptime SLA", value: "99.9%", color: "text-blue-400" },
                    { label: "India DCs", value: "5+", color: "text-green-400" },
                    { label: "Avg Latency", value: "<10ms", color: "text-slate-400" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                      <div className="text-slate-500 text-[9px] mt-0.5 uppercase tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Service rows */}
                <div className="space-y-2">
                  {[
                    { name: "VPS Hosting", desc: "From ₹499/mo", dot: "bg-green-400", status: "Active" },
                    { name: "Dedicated Cloud Server", desc: "Bare-metal speed", dot: "bg-blue-400", status: "Active" },
                    { name: "Hybrid Cloud Setup", desc: "On-prem + cloud", dot: "bg-slate-100", status: "Available" },
                    { name: "Managed Cloud + Support", desc: "24/7 monitoring", dot: "bg-yellow-400", status: "Active" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-slate-200 text-xs font-semibold">{s.name}</p>
                        <p className="text-slate-500 text-[10px]">{s.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 ${s.dot} rounded-full`} />
                        <span className="text-slate-400 text-[10px]">{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT � Content */}
            <div>
              <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest mb-4 block">
                Cloud & VPS Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight mb-5">
                Enterprise Cloud Hosting{" "}
                <span className="text-[#0055E5]">
                  Built on Real Hardware
                </span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
                Unlike shared hosting providers, Serverwale Cloud runs on{" "}
                <strong className="text-slate-700">enterprise-grade dedicated hardware</strong> inside Indian data centers.
                Get the <strong className="text-slate-700">security of on-premise with the flexibility of cloud</strong> �
                VPS plans, dedicated servers, and fully managed solutions.
              </p>

              {/* Cloud plans mini cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { name: "Starter VPS", price: "?499/mo", specs: "2 vCPU � 4GB RAM � 50GB SSD", color: "border-blue-200 bg-blue-50" },
                  { name: "Business VPS", price: "?1,499/mo", specs: "8 vCPU � 16GB RAM � 200GB SSD", color: "border-slate-200 bg-slate-50" },
                  { name: "Dedicated Cloud", price: "?8,999/mo", specs: "32 vCPU � 128GB RAM � 1TB NVMe", color: "border-[#CFFAFE] bg-[#CFFAFE]" },
                  { name: "Custom Enterprise", price: "Get Quote", specs: "Your specs, your scale", color: "border-orange-200 bg-orange-50" },
                ].map((plan, i) => (
                  <div key={i} className={`border rounded-xl p-4 ${plan.color} hover:shadow-md transition`}>
                    <p className="font-black text-[#0F172A] text-xs mb-0.5">{plan.name}</p>
                    <p className="text-[#0055E5] font-black text-sm mb-1">{plan.price}</p>
                    <p className="text-slate-500 text-[10px] leading-relaxed">{plan.specs}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop/cloud"
                  className="inline-flex items-center gap-2 bg-[#0055E5] hover:bg-[#0044BB] text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-250 shadow-lg shadow-blue-500/25"
                >
                  <Cloud size={16} /> Explore Cloud Plans <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-xl font-semibold text-sm hover:border-[#0055E5]/40 hover:bg-blue-50 transition"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default HomeStoreSections;
