import React, { useEffect, useRef, useState } from "react";
import AnimateIn from "../AnimateIn";
import { Star, Quote, BadgeCheck, Users, ThumbsUp, Award } from "lucide-react";

/* Testimonials */

const TESTIMONIALS = [
{
name:"Amit Verma",
role:"Head of IT",
company:"Enterprise Financial Services",
industry:"Banking & Fintech",
avatar:"AV",
rating:5,
highlight:"stable, secure, and scalable",
content:"Serverwale has been an outstanding partner for our core banking infrastructure. Their team delivered HP ProLiant servers configured for our exact workload stable, secure, and scalable. Their 72-point certified refurbished hardware saved us 65% vs new, without any compromise on uptime."
},
{
name:"Neha Kapoor",
role:"CTO",
company:"Healthcare Technology Firm",
industry:"Healthcare IT",
avatar:"NK",
rating:5,
highlight:"PACS storage and HIPAA-compliant infrastructure",
content:"We needed PACS storage and HIPAA-compliant infrastructure on a tight budget. Serverwale delivered Dell PowerEdge servers within 48 hours and supported us through the full deployment. Their post-sales support is genuinely excellent they feel like an extended team."
},
{
name:"Rahul Mehta",
role:"Founder & CEO",
company:"SaaS Startup",
industry:"Tech Startup",
avatar:"RM",
rating:5,
highlight:"scale without constant rework",
content:"As a funded SaaS startup, we needed infrastructure that could scale without constant rework. Serverwale set us up with a refurbished Lenovo server stack and cloud VPS at a fraction of the cost of new hardware."
},
{
name:"Daniel Thompson",
role:"Operations Manager",
company:"Global Manufacturing Group",
industry:"Manufacturing",
avatar:"DT",
rating:5,
highlight:"zero downtime in 2 years",
content:"Reliability is critical for our manufacturing ERP. Serverwale has delivered zero downtime in 2 years since we switched to their certified refurbished server stack."
},
{
name:"Priya Sharma",
role:"Technology Lead",
company:"Digital Media & VFX Studio",
industry:"Media & VFX",
avatar:"PS",
rating:5,
highlight:"ProStation Systems GPU workstations",
content:"We bought three ProStation Systems GPU workstations for 3D rendering and VFX. The performance is exceptional  Cinema 4D and DaVinci Resolve run flawlessly."
},
];

/* Stats */

const STATS = [
{ icon:Users,value:"500+",label:"Enterprises Served"},
{ icon:Star,value:"5.0/5",label:"Average Client Rating"},
{ icon:ThumbsUp,value:"98%",label:"Would Recommend Us"},
{ icon:Award,value:"7+ Yrs",label:"Industry Experience"},
];

const industryColors:any={
"Banking & Fintech":"bg-[#D3E8FF] text-[#0044BB]",
"Healthcare IT":    "bg-[#DCFCE7] text-[#16A34A]",
"Tech Startup":     "bg-[#EEF2FF] text-[#4F46E5]",
"Manufacturing":    "bg-[#FEF3C7] text-[#D97706]",
"Media & VFX":      "bg-[#CFFAFE] text-[#0369A1]",
};

function Testimonials(){

const sliderRef = useRef<HTMLDivElement>(null);
const [slide,setSlide]=useState(0);

/* auto slider */

useEffect(()=>{
const interval=setInterval(()=>{
setSlide(prev=>prev===TESTIMONIALS.length-1?0:prev+1);
},4000);

return()=>clearInterval(interval);

},[]);

useEffect(()=>{
if(sliderRef.current){
sliderRef.current.style.transform=`translateX(-${slide*100}%)`;
}
},[slide]);

return(

<section className="py-8 sm:py-10 lg:py-8 bg-white font-sans">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

{/* HEADER */}

<AnimateIn variant="fadeUp">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">

<div className="max-w-2xl">

<div className="flex items-center gap-2 mb-2">
<div className="w-2 h-2 bg-[#0055E5] rounded-full"/>
<p className="text-[#5BAEFF] font-semibold uppercase tracking-widest text-[10px]">
Client Reviews & Testimonials
</p>
</div>

<h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0F172A] mb-2">
Trusted by <span className="text-[#5BAEFF]">500+ Enterprises</span>
</h2>

<p className="text-slate-500 text-[11px] sm:text-sm max-w-xl">
From startups to Fortune 500 companies look what our clients say about Serverwale infrastructure.
</p>

</div>

<div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
<div>
<div className="flex gap-0.5 mb-1">
{[1,2,3,4,5].map(i=>(
<Star key={i} size={11} className="text-[#facc15] fill-[#facc15]"/>
))}
</div>
<p className="text-[#0F172A] font-black text-sm">4.5 / 5.0</p>
<p className="text-slate-500 text-[10px]">500+ clients</p>
</div>
<BadgeCheck size={22} className="text-[#0055E5]"/>
</div>

</div>
</AnimateIn>

{/* STATS */}

<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">

{STATS.map(({icon:Icon,value,label},si)=>(

<AnimateIn key={label} variant="zoomInUp" delay={si * 90} duration={550}>
<div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
<div className="w-6 h-6 bg-[#0055E5]/15 rounded-lg flex items-center justify-center">
<Icon size={12} className="text-[#0055E5]"/>
</div>
<div>
<p className="text-[#0F172A] font-black text-xs">{value}</p>
<p className="text-slate-500 text-[9px]">{label}</p>
</div>
</div>
</AnimateIn>
))}

</div>

{/* DESKTOP GRID */}

<div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">

{TESTIMONIALS.map((t,i)=>{

const tagClass=industryColors[t.industry] || "bg-slate-100 text-slate-700";

return(

<AnimateIn key={i} variant="fadeUp" delay={i * 80} duration={600}>
<div className="flex flex-col gap-3 p-5 bg-slate-50 border border-slate-200 rounded-xl">

<div className="flex items-start justify-between">
<Quote size={20} className="text-slate-300"/>
<div className="flex gap-0.5">
{[...Array(t.rating)].map((_,j)=>(
<Star key={j} size={11} className="text-[#facc15] fill-[#facc15]"/>
))}
</div>
</div>

<p className="text-sm text-slate-600">{t.content}</p>

<div className="flex items-center justify-between pt-2 border-t border-slate-200">

<div className="flex items-center gap-3">

<div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-[#0055E5] font-black text-xs">
{t.avatar}
</div>

<div>
<p className="text-[#0F172A] font-bold text-sm">{t.name}</p>
<p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
</div>

</div>

<span className={`text-[10px] px-2 py-1 rounded-full ${tagClass}`}>
{t.industry} </span>

</div>

</div>
</AnimateIn>

)

})}

</div>

{/* MOBILE SLIDER */}

<div className="sm:hidden overflow-hidden">

<div
ref={sliderRef}
className="flex transition-transform duration-500 ease-in-out"
>

{TESTIMONIALS.map((t,i)=>{

const tagClass=industryColors[t.industry] || "bg-slate-100 text-slate-700";

return(

<div key={i} className="min-w-full">

<div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">

<div className="flex items-start justify-between">
<Quote size={18} className="text-slate-300"/>
<div className="flex gap-0.5">
{[...Array(t.rating)].map((_,j)=>(
<Star key={j} size={10} className="text-[#facc15] fill-[#facc15]"/>
))}
</div>
</div>

<p className="text-[12px] text-slate-600 leading-relaxed">
{t.content}
</p>

<div className="flex items-center justify-between pt-2 border-t border-slate-200">

<div className="flex items-center gap-2">

<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#0055E5] font-black text-xs">
{t.avatar}
</div>

<div>
<p className="text-[#0F172A] font-bold text-xs">{t.name}</p>
<p className="text-slate-500 text-[10px]">{t.role}</p>
</div>

</div>

<span className={`text-[9px] px-2 py-1 rounded-full ${tagClass}`}>
{t.industry} </span>

</div>

</div>

</div>

)

})}

</div>

{/* DOTS */}

<div className="flex justify-center gap-2 mt-4">

{TESTIMONIALS.map((_,i)=>(

<div
key={i}
className={`h-2 w-2 rounded-full ${slide===i?"bg-[#0055E5]":"bg-gray-300"}`}
/>
))}

</div>

</div>

{/* FOOTER */}

<div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">

<p className="text-slate-500 text-[11px] sm:text-sm text-center sm:text-left">
Join <strong className="text-[#0F172A]">500+ enterprises</strong> who trust Serverwale�.
</p>

<div className="flex items-center gap-2 text-slate-500 text-[11px]">
<BadgeCheck size={14} className="text-[#0055E5]"/>
<span>Reviews from real enterprise clients</span>
</div>

</div>

</div>

</section>

)

}

export default Testimonials;
