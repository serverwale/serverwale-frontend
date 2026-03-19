"use client";

import React, { useState } from "react";
import useSEO from "../hooks/useSEO";
import { Link } from "react-router-dom";
import {
  Server, Cpu, Database, Cloud, Search, PenTool,
  CheckCircle, Package, ShieldCheck, Activity, Check, Award,
  MapPin, Globe, Settings, HeadphonesIcon, ChevronRight,
  TrendingUp, Users, Star, Zap, BadgeCheck, Truck,
  BarChart3, Heart, ArrowRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import story from "../assets/images/team.jpg";
import faqImg from "../assets/images/employee.jpg";
import whatdo from "../assets/images/work2.jpg";
import missionImg from "../assets/images/3.jpg";
import visionImg from "../assets/images/bg.png";
import goalsImg from "../assets/images/1.png";

const WA_NUMBER = "919999656064";

export default function AboutPage() {
  useSEO({
    title: "About Serverwale | India's #1 Refurbished Server Dealers Since 2017 | Delhi NCR",
    description: "Serverwale is India's most trusted server dealer since 2017. Serving 500+ businesses with HP, Dell & Lenovo refurbished servers, GPU workstations, cloud solutions & IT infrastructure. 1-year warranty. Pan-India delivery.",
    keywords: "about serverwale, server dealers india, refurbished server company india, HP Dell server supplier delhi, IT infrastructure company india, Nehru Place server dealer, enterprise server supplier, workstation dealer india, cloud solutions india",
    canonical: "https://serverwale.com/about",
  });

  const stats = [
  {
    value: "7+ Yrs",
    label: "Infrastructure Experience",
    sub: "Serving enterprise clients since 2014",
    color: "text-yellow-400"
  },
  {
    value: "100+",
    label: "Enterprise Clients",
    sub: "From startups to Fortune 500",
    color: "text-blue-500"
  },
  {
    value: "1000+",
    label: "Servers Delivered",
    sub: "HP · Dell · Lenovo · GPU systems",
    color: "text-purple-400"
  },
  {
    value: "3+",
    label: "Countries Served",
    sub: "India · UAE · UK · SEA & more",
    color: "text-green-400"
  }
];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes Serverwale different from other server dealers in India?",
      a: "Serverwale combines 7+ years of enterprise hardware expertise with a rigorous 72-point quality testing process. Every refurbished server undergoes burn-in testing, firmware stabilization, thermal validation, and RAM/NVMe diagnostics before delivery. We offer 1-year warranty, pan-India delivery, and dedicated post-sales support making us India's most trusted server partner.",
    },
    {
      q: "What types of servers and workstations does Serverwale sell?",
      a: "We specialize in HP ProLiant, Dell PowerEdge, and Lenovo ThinkSystem enterprise servers both new and certified refurbished. Our workstation range includes custom GPU workstations for AI/ML, 3D rendering, VFX, and CAD workloads. We also offer NAS storage, network switches, and complete data center rack solutions.",
    },
    {
      q: "Do you offer warranty on refurbished servers?",
      a: "Yes. All refurbished servers and workstations from Serverwale come with a minimum 1-year comprehensive hardware warranty. Extended 2-3 year warranty options are available. Our warranty covers component failures, with on-site replacement available for mission-critical deployments in Delhi NCR and remote support pan-India.",
    },
    {
      q: "Can I rent servers instead of buying them?",
      a: "Yes, Serverwale offers flexible server rental and workstation rental solutions across India. Rental is ideal for short-term projects, cloud migrations, disaster recovery setups, AI/GPU workloads, and temporary production scaling. Get enterprise-grade hardware without the CapEx commitment.",
    },
    {
      q: "How fast is your delivery across India?",
      a: "We offer same-day delivery in Delhi NCR and Nehru Place. For other major metros Mumbai, Bangalore, Chennai, Hyderabad, Pune delivery takes 1-3 business days. We ship pan-India within 5-7 business days, with professional handling for sensitive enterprise hardware.",
    },
  ];

  const services = [
    {
      title: "Refurbished Enterprise Servers",
      desc: "HP ProLiant, Dell PowerEdge & Lenovo servers fully tested, 72-point certified, 1-year warranty. Save 60-80% vs new.",
      icon: <Server className="w-5 h-5" />,
      tag: "SERVERS",
      link: "/product",
    },
    {
      title: "Cloud & VPS Solutions",
      desc: "Hybrid cloud deployments, VPS hosting, and cloud-ready infrastructure with enterprise security and flexible scaling.",
      icon: <Cloud className="w-5 h-5" />,
      tag: "CLOUD",
      link: "/shop/cloud",
    },
    {
      title: "GPU Workstations & ProStation Systems",
      desc: "Custom high-performance workstations for AI/ML, VFX, CAD, 3D rendering, and data science workloads.",
      icon: <Cpu className="w-5 h-5" />,
      tag: "WORKSTATIONS",
      link: "/product",
    },
    {
      title: "Data Center Solutions",
      desc: "Complete data center infrastructure storage arrays, network switches, UPS, rack units, and structured cabling.",
      icon: <Database className="w-5 h-5" />,
      tag: "DATA_CENTER",
      link: "/enterprise-solution",
    },
    {
      title: "IT Consulting & Support",
      desc: "Expert IT infrastructure consulting for startups, SMEs, and enterprises. Design, deploy, and manage your IT backbone.",
      icon: <HeadphonesIcon className="w-5 h-5" />,
      tag: "CONSULTING",
      link: "/contact",
    },
    {
      title: "Server Rental Services",
      desc: "Flexible server and workstation rental across India. Perfect for temporary workloads, migrations, and GPU compute.",
      icon: <BarChart3 className="w-5 h-5" />,
      tag: "RENTAL",
      link: "/contact",
    },
  ];

  const whyChooseUs = [
    {
      title: "72-Point Quality Testing",
      desc: "Every server undergoes a rigorous 72-point inspection RAM diagnostics, NVMe testing, thermal validation, firmware checks before it reaches you.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Save 60-80% vs New",
      desc: "Get enterprise-grade HP, Dell & Lenovo servers at 60-80% lower cost than new equipment. Same performance, certified reliability.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Pan-India Delivery",
      desc: "Same-day dispatch in Delhi NCR. 1-3 days to Mumbai, Bangalore, Chennai, Hyderabad & Pune. Nationwide delivery within 5-7 days.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Custom Configurations",
      desc: "Not finding your spec? We custom-configure servers and workstations to your exact requirements RAM, storage, GPU, networking.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "1-Year Real Warranty",
      desc: "No fine print. Comprehensive 1-year warranty on all hardware. Extendable to 3 years. Free replacement for faulty components.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Global Reach",
      desc: "Trusted by businesses in India, UAE, Singapore, Malaysia, Nepal & UK. Export capability for enterprise hardware procurement.",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  const approach = [
    {
      title: "Workload Analysis",
      desc: "We begin with a deep analysis of your application stack, I/O requirements, and compute needs to recommend the optimal configuration.",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: "Custom Configuration",
      desc: "Our architects design balanced systems where memory bandwidth, CPU cores, and storage throughput are optimized to eliminate bottlenecks.",
      icon: <PenTool className="w-5 h-5" />,
    },
    {
      title: "72-Hour Burn-In Testing",
      desc: "All systems undergo mandatory 72-hour stress testing under maximum thermal load to ensure zero-day production stability.",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      title: "Production-Ready Delivery",
      desc: "We deliver infrastructure configured at the firmware and OS layer designed for immediate integration into your production environment.",
      icon: <Package className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white font-sans">

      {/* -- HERO -- */}
      <section className="relative overflow-hidden text-white min-h-[340px] md:min-h-[440px]">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(37,99,235,0.22),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)`, backgroundSize: "48px 48px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pt-24 pb-10 md:pt-28 md:pb-12">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-widest mb-5">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">About Us</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0055E5]/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5 w-fit">
            <BadgeCheck size={12} /> INDIA'S TRUSTED IT INFRASTRUCTURE PARTNER SINCE 2017
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 max-w-4xl">
            We Are{" "}
            <span className="text-transparent bg-clip-text bg-[#5BAEFF]">
              Serverwale
            </span>
            <br className="hidden sm:block" />
            {" "}India's Most Trusted <strong className="text-white">Server & IT Partner</strong>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-5 sm:mb-6">
            Since <strong className="text-white">2017</strong>, we have been serving{" "}
            <strong className="text-white">100+ businesses across India &amp; 3 countries</strong> with{" "}
            <strong className="text-white">certified refurbished HP, Dell &amp; Lenovo servers</strong>,{" "}
            <strong className="text-white">ProStation Systems GPU workstations</strong>, cloud solutions & managed IT services.
            Headquartered at <strong className="text-white">New Delhi</strong> India's largest IT hardware market.
          </p>

          {/* Mini trust pills */}
          <div className="flex flex-wrap gap-2 mb-5 sm:mb-7">
            {[
              { icon: <ShieldCheck size={11} />, text: "72-Point Quality Certified" },
              { icon: <Award size={11} />,       text: "3-Year Warranty" },
              { icon: <Zap size={11} />,         text: "Same-Day Delhi NCR" },
              { icon: <Globe size={11} />,       text: "3 Countries Served" },
            ].map((p) => (
              <span key={p.text} className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/10 text-slate-200 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                <span className="text-[#0055E5]">{p.icon}</span>{p.text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/product"
              className="inline-flex items-center gap-2 bg-[#f59e09] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-sm hover:bg-[#f59e30] hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Browse Products <ArrowRight size={15} />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I want to learn more about Serverwale's services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 border border-green hover:bg-white/15  px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all"
            >
              <FaWhatsapp size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* -- STATS -- */}
<section className="py-2 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-slate-800">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <p className="text-center text-xs tracking-[0.25em] text-slate-400 uppercase mb-8">
      Our Infrastructure Expertise
    </p>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

      {stats.map((stat, idx) => (
        <div key={idx} className="space-y-1">

          {/* Number */}
          <div className={`text-2xl md:text-3xl font-extrabold ${stat.color}`}>
            {stat.value}
          </div>

          {/* Title */}
          <p className="text-white font-semibold text-sm">
            {stat.label}
          </p>

          {/* Subtitle */}
          <p className="text-slate-400 text-xs">
            {stat.sub}
          </p>

        </div>
      ))}

    </div>
  </div>
</section>
      {/* -- WHO WE ARE -- */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative group">
            <div className="aspect-square bg-slate-100 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={story}
                alt="Serverwale team - server dealers in Delhi NCR"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0F172A] p-5 hidden md:block border-t-4 border-[#0055E5] rounded-br-2xl shadow-xl">
              <p className="text-[10px] font-mono text-[#0055E5] tracking-widest uppercase">Est. 2017</p>
              <p className="text-white text-sm font-bold"> New Delhi</p>
            </div>
          </div>

          <div>
            <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-6 uppercase tracking-tight">
              Trusted <strong className="text-[#0055E5]">Server Dealers</strong> in India Since 2017
            </h2>

            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>
                Founded in <strong className="text-[#0F172A]">Nehru Place, New Delhi</strong> {" "}
                India's premier IT hardware hub Serverwale has grown into one of India's most trusted{" "}
                <strong className="text-[#0F172A]">enterprise server dealers</strong>.
                We specialize in <strong className="text-[#0F172A]">HP ProLiant, Dell PowerEdge, and Lenovo ThinkSystem</strong>{" "}
                servers, both new and <strong className="text-[#0F172A]">certified refurbished</strong>.
              </p>
              <p>
                As a leading <strong className="text-[#0F172A]">IT infrastructure company in India</strong>,
                we serve 500+ businesses with{" "}
                <strong className="text-[#0F172A]">pan-India delivery capabilities</strong>.
                Our product range spans refurbished servers, GPU workstations, cloud solutions, NAS storage,
                and complete data center deployments.{" "}
                Whether you need a <strong className="text-[#0F172A]">refurbished server at 60-80% off</strong> or a{" "}
                <strong className="text-[#0F172A]">custom AI workstation</strong>, we deliver quality-tested systems
                backed by real warranty.
              </p>
              <p>
                From startups to Fortune 500 enterprises, VFX studios to government organizations {" "}
                Serverwale is the <strong className="text-[#0F172A]">one-stop destination for enterprise IT infrastructure in India</strong>.
                Our <strong className="text-[#0F172A]">7+ years of experience</strong>,{" "}
                <strong className="text-[#0F172A]">72-point testing process</strong>, and{" "}
                <strong className="text-[#0F172A]">1-year warranty</strong> make us the go-to partner for businesses
                that take their IT seriously.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {["Nehru Place, Delhi", "Pan-India Delivery", "1-Year Warranty", "72-Point Testing"].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-[#0055E5] border border-blue-100">
                  <BadgeCheck size={11} /> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- MISSION VISION  GOALS -- */}
      <section className="py-10 md:py-14 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[#0055E5] text-xs uppercase tracking-[0.4em] font-bold">Our Purpose</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Mission, Vision & Goals
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-300 text-sm">
              The principles driving how we build, sell, and support enterprise servers, workstations, and IT infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                img: missionImg,
                alt: "Serverwale Mission - enterprise server supplier India",
                title: "Our Mission",
                content: "To deliver <strong>enterprise-grade servers, refurbished workstations, and cloud-ready IT infrastructure</strong> that empowers Indian businesses with secure, scalable, and cost-efficient computing at 60-80% lower cost than new equipment.",
              },
              {
                img: visionImg,
                alt: "Serverwale Vision - India's most trusted IT infrastructure company",
                title: "Our Vision",
                content: "To become <strong>India's #1 IT infrastructure partner</strong> for enterprise servers, data centers, cloud solutions, and performance workstations known for quality, reliability, and genuine post-sales support.",
              },
              {
                img: goalsImg,
                alt: "Serverwale Goals - enterprise servers workstations 10000 businesses",
                title: "Our Goals",
                content: "To help <strong>10,000+ businesses across India</strong> build robust IT infrastructure using certified refurbished servers, cloud-ready architecture, and AI/GPU workstations while reducing IT CapEx by up to 80%.",
              },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#0055E5] hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl mb-5">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
                </div>
                <h3 className="text-lg font-black text-[#0F172A] uppercase mb-3">{item.title}</h3>
                <p
                  className="text-slate-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- WHAT WE OFFER -- */}
      <section className="py-10 md:py-14 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-7">
            <span className="text-[#5BAEFF] text-xs font-black uppercase tracking-widest mb-2 block">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-black text-black">
              Comprehensive <span className="text-[#5BAEFF]">IT Infrastructure Services</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
              From individual servers to complete data center buildouts we supply, configure, deliver, and support your entire IT infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="bg-white p-7 border border-slate-200 rounded-xl hover:border-[#0055E5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm group"
              >
                <div className="flex justify-between mb-5">
                  <div className="bg-white border border-[#f59e09] p-3 rounded-lg text-[#f59e09] group-hover:bg-[#f59e09] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-black tracking-widest">{item.tag}</span>
                </div>
                <h3 className="font-black text-xs text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 text-[#0055E5] text-xs font-bold mt-4">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- WHAT WE DO -- */}
      <section className="py-10 md:py-14 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4 block">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase">
              Delivering <span className="text-[#5BAEFF]">Enterprise IT Infrastructure</span>
            </h2>
            <p className="text-slate-300 leading-relaxed mb-5">
              Serverwale is a <strong className="text-white">leading IT infrastructure company in India</strong>,
              specializing in <strong className="text-white">enterprise servers</strong>,{" "}
              <strong className="text-white">refurbished workstations</strong>, data center solutions,
              and cloud-ready infrastructure. We design and deploy{" "}
              <strong className="text-white">cost-optimized server architectures</strong> for startups,
              enterprises, VFX studios, AI labs, and government organizations.
            </p>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              From <strong className="text-slate-300">Dell & HP enterprise servers</strong> to{" "}
              <strong className="text-slate-300">custom GPU workstations</strong> and scalable cloud deployments,
              our solutions help organizations achieve{" "}
              <strong className="text-slate-300">high performance, reliability, and long-term scalability</strong>{" "}
              without overpaying for new equipment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/product"
                className="inline-flex items-center gap-2 bg-[#5BAEFF] text-[#0F172A] px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#0055E5] transition"
              >
                View Products <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition"
              >
                Get IT Consultation
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={whatdo}
              alt="Enterprise Server Solutions & Data Center Infrastructure in India - Serverwale"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-[#0F172A] border border-blue-900/50 p-4 rounded-xl hidden md:block">
              <p className="text-[10px] font-mono text-[#0055E5] tracking-widest uppercase mb-1">Quality Standard</p>
              <p className="text-white text-sm font-black">72-Point Certified ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* -- WHY CHOOSE US -- */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-7">
            <span className="text-[#5BAEFF] text-xs font-black uppercase tracking-widest mb-2 block">Why Serverwale</span>
            <h2 className="text-xs md:text-3xl font-black text-black">
              Why <span className="text-[#5BAEFF]">500+ Businesses</span> Trust Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-7 rounded-xl border border-slate-100 hover:border-[#0055E5] hover:shadow-lg hover:bg-white transition-all duration-300">
                <div className="bg-blue-100 p-3 rounded-lg text-[#0055E5] w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#0F172A] mb-2 text-base">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- OUR PROCESS -- */}
      <section className="py-10 md:py-14 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div>
            <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-4 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black mb-5">How We Work</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              We don't push pre-packaged solutions. Our process starts with understanding your workloads,
              workflows, and growth plans. We assess performance needs, security requirements, and operational
              realities before designing a solution whether you're a{" "}
              <strong className="text-slate-300">startup scaling rapidly</strong> or an{" "}
              <strong className="text-slate-300">enterprise modernizing legacy infrastructure</strong>.
            </p>
            <div className="w-12 h-0.5 bg-[#0055E5]" />
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {approach.map((item, idx) => (
              <div key={idx} className="border-l-2 border-white/10 pl-6 hover:border-[#0055E5] transition-colors">
                <div className="text-[#0055E5] mb-3">{item.icon}</div>
                <h3 className="font-black text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-10 md:py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">

          {/* FAQs */}
          <div>
            <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest mb-4 block">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-10 uppercase">
              Frequently Asked <span className="text-slate-300">Questions</span>
            </h2>

            <div className="divide-y border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className={`transition-all duration-300 ${isOpen ? "shadow-md" : ""}`}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 ${
                        isOpen ? "bg-[#0F172A] text-white" : "bg-white text-[#0F172A] hover:bg-slate-50"
                      }`}
                    >
                      <span className={`font-bold text-sm ${isOpen ? "text-[#0055E5]" : ""}`}>{item.q}</span>
                      <span className={`text-xl font-bold shrink-0 ${isOpen ? "text-[#0055E5]" : "text-slate-400"}`}>
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden bg-[#0F172A] px-6">
                        <p className="text-slate-300 text-sm leading-relaxed py-4">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-700 ${openIndex !== null ? "mt-10 lg:mt-16" : "mt-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={faqImg}
                alt="Serverwale - Enterprise Server & Workstation FAQs India"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-[#0055E5]/10 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* -- PHILOSOPHY QUOTE -- */}
      <section className="py-10 md:py-14 bg-white border-y border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#0055E5] font-black text-[10px] uppercase tracking-[0.6em] mb-5 block">
            The Serverwale Manifesto
          </span>
          <blockquote className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase italic text-[#0F172A]">
            "Technology should{" "}
            <span className="text-[#0055E5] underline decoration-4 underline-offset-8">remove friction</span>,
            not create it."
          </blockquote>
          <p className="mt-8 max-w-xl mx-auto text-slate-500 text-lg font-light leading-relaxed">
            We believe infrastructure should be <strong>invisible</strong>.{" "}
            <strong>Reliability, scalability, and predictable long-term value</strong>{" "}
            are the only metrics that define success.
          </p>
        </div>
      </section>

      {/* -- QUALITY STANDARDS -- */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#0055E5] text-xs font-black uppercase tracking-widest mb-4 block">Quality Standard</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8 uppercase">
              Quality <span className="text-slate-300">& Trust</span>
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Every <strong className="text-[#0F172A]">refurbished server and workstation</strong> at Serverwale
              passes a comprehensive quality checklist before it leaves our facility.
              We don't cut corners because <strong className="text-[#0F172A]">your business can't afford downtime</strong>.
            </p>
            <div className="space-y-3">
              {[
                "NVMe & SSD health diagnostics",
                "RAM stress testing (72-hour)",
                "Firmware stabilization & BIOS updates",
                "Thermal validation under full load",
                "Network & redundant fabric testing",
                "Long-term lifecycle support guarantee",
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="text-[#0055E5] w-4 h-4 shrink-0" />
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A] p-10 border-t-8 border-[#0055E5] rounded-2xl text-white shadow-xl">
            <ShieldCheck className="text-[#0055E5] mb-5" size={44} />
            <h3 className="text-2xl font-black mb-3">Verified Before Delivery</h3>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
              Every system is validated for stability before it leaves our facility.
              <strong className="text-slate-300"> No exceptions. No compromises.</strong>
            </p>
            <p className="text-slate-400 text-sm mb-6">
              Our <strong className="text-slate-300">72-hour burn-in test</strong> under maximum thermal load
              ensures your server won't fail on Day 1 of production.
            </p>
            <div className="bg-[#0F172A] border border-white/10 p-4 flex justify-between items-center rounded-xl">
              <span className="text-[10px] text-[#0055E5] tracking-widest font-mono">PASS_72H_BURN_IN_TEST</span>
              <Activity className="text-[#0055E5] animate-pulse" size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* -- FINAL CTA -- */}
      <section className="py-10 md:py-14 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-5">
            Your Strategic IT Infrastructure Partner
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            Technology keeps evolving, but the fundamentals remain:{" "}
            <strong className="text-white">reliable systems, secure data, and infrastructure that scales with intent.</strong>
          </p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            At Serverwale, we continue to invest in deeper expertise across{" "}
            <strong className="text-slate-300">cloud, AI-driven workloads, and enterprise computing</strong>
            helping organizations stay ahead without unnecessary complexity.
            If you're looking for infrastructure built to last and a partner who stands behind it
            <strong className="text-white"> you're in the right place.</strong>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I want to enquire about Serverwale's server and IT infrastructure services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-black text-sm transition"
            >
              <FaWhatsapp size={17} /> WhatsApp an Expert
            </a>
            <Link
              to="/product"
              className="inline-flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-[#0055E5] text-[#0F172A] px-8 py-3.5 rounded-xl font-black text-sm transition"
            >
              Browse All Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition"
            >
              Get Free Consultation
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-xs font-black tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-blue-400" /> 1-YEAR WARRANTY</span>
            <span className="flex items-center gap-2"><BadgeCheck size={12} className="text-blue-400" /> 72-PT CERTIFIED</span>
            <span className="flex items-center gap-2"><Truck size={12} className="text-blue-400" /> PAN-INDIA DELIVERY</span>
            <span className="flex items-center gap-2"><Users size={12} className="text-blue-400" /> 500+ HAPPY CLIENTS</span>
            <span className="flex items-center gap-2"><Globe size={12} className="text-blue-400" /> 3 COUNTRIES</span>
          </div>
        </div>
      </section>

    </div>
  );
}
