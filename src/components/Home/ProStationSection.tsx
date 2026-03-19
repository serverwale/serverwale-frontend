import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../AnimateIn";
import {
ArrowRight,
Cpu,
Monitor,
Server,
Database,
Layers,
BarChart3,
ShieldCheck,
BadgeCheck,
Zap,
CheckCircle,
} from "lucide-react";

const ProStationSystemsProducts = [
{
icon: <Cpu size={22} />,
name: "ProStation Systems GPU",
tagline: "AI ML 3D Rendering",
desc: "Purpose-built for AI workloads, deep learning, Cinema 4D & VFX pipelines with dual or quad GPU support.",
},
{
icon: <Monitor size={22} />,
name: "ProStation Systems Creator",
tagline: "Video Editing CAD Design",
desc: "High-performance workstations for 4K/8K editing, AutoCAD, SolidWorks & professional content creation.",
},
{
icon: <Server size={22} />,
name: "ProStation Systems Server",
tagline: "Enterprise Virtualization HPC",
desc: "Custom-configured rack & tower servers for databases, ERP systems & high-density compute environments.",
},
{
icon: <Database size={22} />,
name: "ProStation Systems NAS",
tagline: "Storage Backup RAID",
desc: "Enterprise-grade NAS solutions for video studios, enterprises & data-intensive workflows.",
},
{
icon: <Layers size={22} />,
name: "ProStation Systems HPC",
tagline: "Research Genomics Clusters",
desc: "Multi-node HPC clusters for scientific research, financial modelling & large-scale training workloads.",
},
{
icon: <BarChart3 size={22} />,
name: "ProStation Systems Edge",
tagline: "IoT Retail AI Edge Computing",
desc: "Compact industrial-grade edge servers for real-time processing at the network edge.",
},
];

const ProStationSection: React.FC = () => {
const sliderRef = useRef<HTMLDivElement>(null);
const [slide, setSlide] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setSlide((prev) => (prev === 0 ? 1 : 0));
}, 3500);


return () => clearInterval(interval);


}, []);

useEffect(() => {
if (sliderRef.current) {
sliderRef.current.scrollTo({
left: sliderRef.current.clientWidth * slide,
behavior: "smooth",
});
}
}, [slide]);

const column1 = ProStationSystemsProducts.slice(0, 2);
const column2 = ProStationSystemsProducts.slice(2, 4);
const column3 = ProStationSystemsProducts.slice(4, 6);

return ( <section className="bg-white py-8 md:py-8 px-4 md:px-6 font-sans border-t border-slate-100"> <div className="max-w-7xl mx-auto">

    {/* Label */}
    <AnimateIn variant="fadeUp">
    <div className="flex items-center gap-2 mb-2 md:mb-3">
      <div className="w-3 h-3 bg-[#5BAEFF] rounded-full" />
      <p className="text-[#5BAEFF] font-semibold uppercase tracking-wide text-[11px] md:text-xs">
        Our In-House Brand
      </p>
    </div>
    </AnimateIn>

    {/* Heading */}
    <AnimateIn variant="fadeUp" delay={70}>
    <div className="max-w-3xl mb-2 md:mb-3">
      <h2 className="text-2xl md:text-4xl font-black text-[#0F172A] leading-tight mb-2 md:mb-3">
        Introducing{" "}
        <span className="text-[#5BAEFF]">ProStation Systems</span>  India's Own Workstation & Server Brand
      </h2>

      <p className="text-slate-600 text-[13px] md:text-base leading-relaxed">
        <strong>ProStation Systems</strong> is Serverwale's exclusive in-house brand of{" "}
        <strong>custom-built GPU workstations and enterprise servers</strong>.
        We import premium hardware from <strong>Dubai, US, Taiwan, Malaysia</strong> and assemble them in <strong>Delhi</strong>.
      </p>
    </div>
    </AnimateIn>

    {/* Transparency */}
    <AnimateIn variant="fadeUp" delay={140}>
    <div className="bg-[#F59E0B]/10 border border-[#F59E0B] rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-5">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {[
          { num: "01", title: "Sourced from International Market", desc: "Premium components from global markets" },
          { num: "02", title: "Assembled in India", desc: "Custom-built at Inpries, Delhi" },
          { num: "03", title: "72-Point Tested & Certified", desc: "Ships with upto 3-year warranty" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F59E0B] rounded-lg md:rounded-xl flex items-center justify-center text-white text-[10px] md:text-xs font-black">
              {item.num}
            </div>
            <div>
              <p className="font-black text-text-[#F59E0B] text-[11px] md:text-xs">{item.title}</p>
              <p className="text-slate-500 text-[10px] md:text-[11px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AnimateIn>

    {/* CTA */}
    <AnimateIn variant="zoomIn" delay={200}>
    <div className="mb-4 md:mb-5">
      <Link
        to="/product"
        className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] hover:text-white text-white px-5 md:px-6 py-2.5 md:py-3.5 rounded-xl font-black text-xs md:text-sm shadow-lg hover:shadow-[0_4px_20px_-2px_rgba(34,197,94,0.45)] transition-all duration-250 hover:-translate-y-0.5"
      >
        View All ProStation Systems Products
        <ArrowRight size={16} />
      </Link>
    </div>
    </AnimateIn>

    {/* Badges � each with its own accent color */}
    <AnimateIn variant="fadeUp" delay={260}>
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
      {[
        {
          icon: <BadgeCheck size={14} />,
          text: "Custom-configured to your specs",
          cls: "bg-blue-50 border-blue-200 text-[#0055E5]",
          iconCls: "text-[#0055E5]",
        },
        {
          icon: <ShieldCheck size={14} />,
          text: "1-Year warranty on every machine",
          cls: "bg-blue-50 border-blue-200 text-[#0055E5]",
          iconCls: "text-[#0055E5]",
        },
        {
          icon: <Zap size={14} />,
          text: "Assembled & tested in India",
          cls:  "bg-blue-50 border-blue-200 text-[#0055E5]",
          iconCls: "text-[#0055E5]",
        },
        {
          icon: <CheckCircle size={14} />,
          text: "72-point quality certification",
          cls:  "bg-blue-50 border-blue-200 text-[#0055E5]",
          iconCls: "text-[#0055E5]",
        },
      ].map((b, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 text-[11px] md:text-xs font-semibold border px-2 py-1.5 md:px-3 md:py-2 rounded-full ${b.cls}`}
        >
          <span className={b.iconCls}>{b.icon}</span>
          {b.text}
        </div>
      ))}
    </div>
    </AnimateIn>

   {/* Desktop Grid */}
<div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
  {ProStationSystemsProducts.map((product, i) => (
    <AnimateIn key={i} variant="zoomInUp" delay={i * 80} duration={580}>
      <div
        className="group bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#0055E5] hover:shadow-[0_8px_30px_rgba(37,99,235,0.10)] transition-all"
      >
        <div className="flex items-center gap-3 mb-3">
          
          {/* Icon */}
          <div className="w-11 h-11 bg-[#0F172A]/8 rounded-xl flex items-center justify-center text-[#f59e0b] transition-all duration-300 group-hover:bg-[#f59e09] group-hover:text-white">
            {product.icon}
          </div>

          <div>
            <h3 className="font-black text-[#0F172A] text-sm">
              {product.name}
            </h3>
            <p className="text-[#0055E5] text-[10px] font-bold uppercase tracking-wide">
              {product.tagline}
            </p>
          </div>

        </div>

        <p className="text-slate-500 text-xs leading-relaxed">
          {product.desc}
        </p>
      </div>
    </AnimateIn>
  ))}
</div>

 

<div className="sm:hidden mb-6">

  <div ref={sliderRef} className="flex overflow-hidden scroll-smooth">

    {/* Slide 1 */}
    <div className="min-w-full space-y-3">
      {column1.map((product, i) => (
        <MobileCard key={i} product={product} />
      ))}
    </div>

    {/* Slide 2 */}
    <div className="min-w-full space-y-3">
      {column2.map((product, i) => (
        <MobileCard key={i} product={product} />
      ))}
    </div>

    {/* Slide 3 */}
    <div className="min-w-full space-y-3">
      {column3.map((product, i) => (
        <MobileCard key={i} product={product} />
      ))}
    </div>

  </div>

  {/* Dots */}
  <div className="flex justify-center gap-2 mt-3">

    <div
      className={`h-2 w-2 rounded-full ${
        slide === 0 ? "bg-[#0055E5]" : "bg-gray-300"
      }`}
    />

    <div
      className={`h-2 w-2 rounded-full ${
        slide === 1 ? "bg-[#0055E5]" : "bg-gray-300"
      }`}
    />

    <div
      className={`h-2 w-2 rounded-full ${
        slide === 2 ? "bg-[#0055E5]" : "bg-gray-300"
      }`}
    />

  </div>

</div>
</div>
</section>


);
};

const MobileCard = ({ product }: any) => (

  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 bg-[#0F172A]/8 rounded-lg flex items-center justify-center">
        {product.icon}
      </div>
      <div>
        <h3 className="font-black text-[#0F172A] text-[13px]">{product.name}</h3>
        <p className="text-[#0EA5E9] text-[9px] font-bold uppercase">{product.tagline}</p>
      </div>
    </div>
    <p className="text-slate-500 text-[11px]">{product.desc}</p>
  </div>
);

export default ProStationSection;
