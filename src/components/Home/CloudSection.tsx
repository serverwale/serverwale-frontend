import React from "react";
import { Link } from "react-router-dom";
import AnimateIn from "../AnimateIn";
import {
  ArrowRight,
  Cloud,
  Zap,
  Globe,
  Server,
  Activity,
  Lock,
  HeadphonesIcon,
} from "lucide-react";

const cloudPlans = [
  {
    name: "Starter VPS",
    specs: "2 vCPU · 4GB RAM · 50GB NVMe",
    price: "₹499",
    period: "/mo",
    color: "border-blue-200 bg-blue-50",
    labelColor: "text-[#0055E5]",
  },
  {
    name: "Business VPS",
    specs: "8 vCPU · 16GB RAM · 200GB NVMe",
    price: "₹1,499",
    period: "/mo",
   color: "border-blue-200 bg-blue-50",
    labelColor: "text-[#0055E5]",
  },
  {
    name: "Dedicated Cloud",
    specs: "32 vCPU · 128GB RAM · 1TB NVMe",
    price: "₹8,999",
    period: "/mo",
   color: "border-blue-200 bg-blue-50",
    labelColor: "text-[#0055E5]",
  },
  {
    name: "Custom Enterprise",
    specs: "Your specs, your scale, your SLA",
    price: "Custom",
    period: " quote",
   color: "border-blue-200 bg-blue-50",
    labelColor: "text-[#0055E5]",
  },
];

const cloudFeatures = [
  { icon: Globe, text: "Indian data centers — ultra-low latency" },
  { icon: Activity, text: "99.99% uptime SLA — guaranteed" },
  { icon: Lock, text: "Enterprise firewall & DDoS protection" },
  { icon: Server, text: "Runs on dedicated enterprise hardware" },
  { icon: Zap, text: "Instant provisioning — live in minutes" },
  { icon: HeadphonesIcon, text: "24/7 technical support included" },
];

const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "5+",     label: "India DCs"  },
  { value: "<10ms",  label: "Avg Latency" },
  { value: "24/7",   label: "Support"    },
];

const USE_CASES = [
  "Web Hosting",
  "E-Commerce",
  "SaaS Apps",
  "DevOps CI/CD",
  "AI Model Serving",
  "Database Hosting",
  "Backup & DR",
  "ERP & CRM",
];

function CloudSection() {
  return (
    <section className="bg-white py-8 md:py-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* LEFT */}
          <AnimateIn variant="fadeLeft" duration={700}>
          <div className="flex flex-col">

            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs">
                Cloud & VPS Solutions
              </p>
            </div>

            <h2 className="text-2xl lg:text-4xl font-black text-slate-900 mb-3">
              Enterprise <span className="text-blue-400">Cloud Hosting & VPS</span>
            </h2>

            <p className="text-slate-600 text-sm mb-3">
              Serverwale Cloud runs on enterprise-grade servers inside Indian
              data centers — backed by a <strong>99.99% uptime SLA</strong>.
            </p>

            {/* SLA trust badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { label: "99.99% Uptime SLA",     color: "bg-blue-50 border-blue-200 text-[#0055E5]" },
                { label: "Tier-III Data Centers", color: "bg-blue-50 border-blue-200 text-[#0055E5]" },
                { label: "NVMe Enterprise SSD",   color: "bg-blue-50 border-blue-200 text-[#0055E5]" },
                { label: "DDoS Protected",        color: "bg-blue-50 border-blue-200 text-[#0055E5]" },
              ].map((b) => (
                <span key={b.label} className={`text-[10px] font-semibold border px-2.5 py-1 rounded-full ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <Link
              to="/shop/cloud"
              className="inline-flex items-center gap-2 bg-[#f59e00] hover:bg-[#f59e00] text-black px-5 py-2.5 rounded-xl text-sm font-bold mb-6 transition-all duration-250 shadow-md shadow-blue-500/25"
            >
              <Cloud size={14} />
              Explore Cloud Plans
              <ArrowRight size={14} />
            </Link>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {cloudPlans.map((plan, i) => (
                <Link
                  key={i}
                  to="/shop/cloud"
                  className={`border rounded-xl p-3 ${plan.color}`}
                >
                  <p className={`font-bold text-sm ${plan.labelColor}`}>
                    {plan.name}
                  </p>

                  <p className="text-xs text-slate-500">{plan.specs}</p>

                  <div className="mt-1">
                    <span className="font-bold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500">
                      {plan.period}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-[#0F172A] rounded-xl px-5 py-4 flex justify-between">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[#f59E09] font-bold">{s.value}</div>
                  <div className="text-slate-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
          </AnimateIn>

          {/* RIGHT */}
          <AnimateIn variant="fadeRight" delay={150} duration={700}>
          <div className="flex flex-col">

            <div className="space-y-3 py-5 mb-2">
              {cloudFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 bg-[#f59e09]/10 border border-[#f59e09] rounded-lg flex items-center justify-center text-[#f59e09]">
                    <Icon size={14} />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <div className="bg-[#5BAEFF]/10 border border-[#5BAEFF] rounded-xl p-4 mb-4">
              <p className="font-bold mb-2">Perfect For:</p>

              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-[#5BAEFF] px-2 py-1 rounded-full bg-[#5BAEFF]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">

              <Link
                to="/shop/cloud"
                className="flex-1 flex justify-center items-center gap-2 bg-[#22c55e] hover:bg-green-500 text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-250"
              >
                <Cloud size={14} />
                See All Plans
              </Link>

              <Link
                to="/contact"
                className="flex-1 flex justify-center items-center border rounded-xl py-2.5 text-sm font-semibold hover:border-[#0055e5] hover:text-[#0055e5]"
              >
                Talk to an Expert
              </Link>

            </div>

          </div>
          </AnimateIn>

        </div>

      </div>
    </section>
  );
}

export default CloudSection;