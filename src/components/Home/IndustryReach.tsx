import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
Briefcase, Factory, Hospital, Globe,
Monitor, Zap, Store, Server,
ArrowRight, ArrowUpRight
} from "lucide-react";
import CanvasBg from "../CanvasBg";
import AnimateIn from "../AnimateIn";

const INDUSTRIES = [
{
icon: Briefcase,
name: "Banking & Fintech",
key: "finance",
desc: "High-availability servers for core banking, HFT infrastructure & RBI-compliant data storage.",
tag: "Zero-Downtime",
},
{
icon: Factory,
name: "Manufacturing",
key: "manufacturing",
desc: "ERP & MES hosting, SCADA servers, edge computing nodes for Industry 4.0 plants.",
tag: "Industry 4.0",
},
{
icon: Hospital,
name: "Healthcare",
key: "healthcare",
desc: "PACS servers, HIPAA-compliant storage arrays, HIS/EMR infrastructure for hospitals.",
tag: "HIPAA Ready",
},
{
icon: Globe,
name: "IT / ITES",
key: "technology",
desc: "Data centres, dev/test clusters, GPU compute & AI workstations for IT enterprises.",
tag: "AI-Ready",
},
{
icon: Monitor,
name: "Media & VFX",
key: "media",
desc: "GPU render farms, NAS/SAN editing storage, ProStation Systems� workstations for studios.",
tag: "4K / 8K Ready",
},
{
icon: Zap,
name: "Startups",
key: "startups",
desc: "Budget-friendly refurbished servers, scalable cloud VPS & pay-as-you-grow infra.",
tag: "Scale Fast",
},
{
icon: Store,
name: "Retail & E-commerce",
key: "retail",
desc: "POS server stacks, inventory management systems & high-throughput e-com backends.",
tag: "Always-On",
},
{
icon: Server,
name: "Education & Edtech",
key: "gcc",
desc: "Global Capability Centres, multi-site data processing & enterprise cloud migration.",
tag: "Enterprise",
},
];

const SLIDES = [
INDUSTRIES.slice(0,4),
INDUSTRIES.slice(4,8)
];

function IndustryReach(){

const navigate = useNavigate();

const [slide,setSlide] = useState(0);

useEffect(()=>{
const interval = setInterval(()=>{
setSlide(prev => prev === 1 ? 0 : prev + 1);
},4000);

return ()=> clearInterval(interval);

},[]);

return(

<section className="relative py-8 sm:py-10 lg:py-8 overflow-hidden font-sans bg-[#0F172A]">

<div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E293B]" />
<CanvasBg variant="cyan" count={55} />

<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

{/* HEADER */}
<AnimateIn variant="fadeUp">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">

<div className="max-w-2xl">

<div className="flex items-center gap-2 mb-3">
<div className="w-2 h-2 bg-[#5BAEFF] rounded-full"/>
<p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px] sm:text-xs">
Industry Expertise
</p>
</div>

<h2 className="text-xl sm:text-3xl lg:text-5xl font-black text-white mb-3 leading-tight">
Enterprise IT Infrastructure
<span className="text-transparent bg-clip-text bg-[#5BAEFF]">
{" "}Built for Every Industry
</span>
</h2>

<p className="text-xs sm:text-base text-slate-400 leading-relaxed max-w-xl">
From banking & fintech to healthcare, manufacturing, media studios and global enterprises
Serverwale designs battle-tested server infrastructure, cloud solutions and
ProStation Systems workstations tuned for your sector.
</p>

</div>

<button
onClick={()=>navigate("/enterprise-solution?industry=finance")}
className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-green-500 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-2px_rgba(37,99,235,0.5)]"

>

Explore Industry Solutions <ArrowRight size={16}/> </button>

</div>
</AnimateIn>

{/* DESKTOP GRID */}

<div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">

{INDUSTRIES.map((industry, idx)=>{

const Icon = industry.icon;

return(

<AnimateIn key={industry.name} variant="zoomInUp" delay={idx * 70} duration={580}>
<div
onClick={()=>navigate(`/enterprise-solution?industry=${industry.key}`)}
className="cursor-pointer group relative flex flex-col gap-3 p-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl hover:bg-[#0F172A]/70 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:border-[#0055E5]/40 transition-all duration-250"
>

<div className="flex items-center justify-between">

<div className="p-3 bg-white/[0.06] border border-white/10 rounded-xl group-hover:bg-[#5BAEFF]/80 group-hover:border-[#0055E5]/20  transition-all duration-250">
<Icon size={26} className="text-[#5BAEFF]  group-hover:text-white "/>
</div>

<span className="text-[10px] font-bold text-[#f59e09]/70 bg-[#f59e09]/10 border border-[#f59e09]/20 px-2 py-0.5 rounded-full uppercase">
{industry.tag}
</span>

</div>

<h4 className="text-sm font-bold text-white">{industry.name}</h4>

<p className="text-[11px] text-slate-400">{industry.desc}</p>

<div className="flex items-center gap-1 text-[#0055E5] text-xs mt-auto">
Learn more <ArrowUpRight size={12}/>
</div>

</div>
</AnimateIn>

)

})}

</div>

{/* MOBILE SLIDER */}

<div className="sm:hidden overflow-hidden">

<div
className="flex transition-transform duration-500 ease-in-out"
style={{ transform:`translateX(-${slide*100}%)` }}
>

{SLIDES.map((group,i)=>(

<div key={i} className="min-w-full grid grid-cols-2 gap-3">

{group.map((industry)=>{

const Icon = industry.icon;

return(

<div
key={industry.name}
onClick={()=>navigate(`/enterprise-solution?industry=${industry.key}`)}
className="cursor-pointer group flex flex-col gap-2 p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl"
>

<div className="flex items-center justify-between">

<div className="p-2 bg-white/[0.06] border border-white/10 rounded-lg">
<Icon size={16} className="text-[#0055E5]"/>
</div>

<span className="text-[8px] font-bold text-[#0055e5] bg-[#5BAEFF]/10 border border-[#5BAEFF]/20 px-1.5 py-0.5 rounded-full uppercase">
{industry.tag}
</span>

</div>

<h4 className="text-[11px] font-bold text-white">{industry.name}</h4>

<p className="text-[10px] text-slate-400">{industry.desc}</p>

<div className="flex items-center gap-1  text-[10px]">
Learn more <ArrowUpRight size={10}/>
</div>

</div>

)

})}

</div>

))}

</div>

{/* DOTS */}

<div className="flex justify-center gap-2 mt-4">

{SLIDES.map((_,i)=>(

<div
key={i}
className={`h-2 w-2 rounded-full ${slide===i ? "bg-[#0055E5]":"bg-gray-500"}`}
/>

))}

</div>

</div>

</div>
</section>

)

}

export default IndustryReach;
