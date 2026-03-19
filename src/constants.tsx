
import React from 'react';
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, 
  HelpCircle, ChevronRight, MessageSquare, Lock, BarChart3, Rocket, Shield, X
} from "lucide-react";

import finance from "../src/assets/images/1.png";
import health from "../src/assets/images/health.png";
import manufacturing from "../src/assets/images/2.png";
import tech from "../src/assets/images/3.jpg";
import media from "../src/assets/images/4.png";
import retail from "../src/assets/images/retail.png";
import startup from "../src/assets/images/startup.jpg";
import education from "../src/assets/images/meeting2.jpg";

import network from "../src/assets/images/networking.png";
import cloud from "../src/assets/images/cloud.png";
import render from "../src/assets/images/render.png";
import hpc from "../src/assets/images/hpc.png";
import server from "../src/assets/images/5.png";
import cloudRental from "../src/assets/images/cloudRental.png";
import { 
  Network, 
  Cloud, 
  Cpu, 
  Settings, 
  Server, 
  Database,
  ShieldCheck,
  Activity,
  Zap,
  Briefcase,
  Monitor,
  Store,
  Factory,
  Hospital,
  Globe,
  Star,
  TrendingUp,
  Wifi,
  HardDrive,
  Layers,
  RefreshCw,
  LayoutGrid,
  BadgeCheck,
  Gauge,
  FlaskConical,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  FileText,
  Radio,
  PlayCircle,
  Repeat,
  Building2,
  MapPin,
  BriefcaseBusiness,
  CircleDollarSign,
  ScanSearch,
  Landmark,
  Bolt,
  Fingerprint,
  GraduationCap,
  BookOpen,
  Laptop,
  School,
  MonitorPlay,
  BarChart2
} from 'lucide-react';
import { Service, Industry, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
   id: 'it-consulting',
    title: 'Network & IT Consulting',
    shortDescription:
      'Expert-led IT consulting to design, optimize, and future-proof enterprise infrastructure.',
    longDescription:
      'Our Network & IT Consulting practice helps organizations build reliable, secure, and scalable IT foundations. We work closely with leadership and technical teams to assess existing infrastructure, identify performance and security gaps, and design practical roadmaps aligned with business growth. From startups to large enterprises, our consulting approach is grounded in real-world execution—not theory.',
    icon: 'Network',
    benefits: [
      'Scalable Network Architecture',
      'Infrastructure Risk Assessment',
      'Performance & Cost Optimization',
      'Business-Aligned IT Strategy'
    ],
    imageUrl: network
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions & Security',
    shortDescription:
      'Secure, compliant, and performance-driven cloud solutions built for modern businesses.',
    longDescription:
      'We help companies adopt cloud technologies with confidence. Our team designs and manages private, public, and hybrid cloud environments with a strong focus on security, compliance, and uptime. Whether you are migrating legacy systems or optimizing existing cloud workloads, we ensure stability, visibility, and long-term operational control across your infrastructure.',
    icon: 'Cloud',
    benefits: [
      'Hybrid & Multi-Cloud Architecture',
      'Cloud Security & Compliance',
      'Data Migration & Optimization',
      'High Availability & Backup Strategy'
    ],
    imageUrl: cloud
  },
  {
    id: 'rendering-infra',
    title: 'Rendering Infrastructure',
    shortDescription:
      'GPU-powered infrastructure designed for rendering, media, and creative workloads.',
    longDescription:
      'Creative and media-driven organizations rely on performance and consistency. Our rendering infrastructure solutions are built to support high-throughput GPU workloads for animation studios, architectural firms, and production houses. We design environments that enable faster rendering cycles, remote collaboration, and reliable storage—so creative teams can focus on output, not infrastructure limitations.',
    icon: 'Monitor',
    benefits: [
      'GPU-Optimized Infrastructure',
      'High-Speed Storage Systems',
      'Remote Rendering Workflows',
      'Scalable Media Pipelines'
    ],
    imageUrl: render
  },
  {
    id: 'hpc-solutions',
    title: 'Custom HPC / Server Solutions',
    shortDescription:
      'High-performance server and HPC solutions for compute-intensive workloads.',
    longDescription:
      'Our HPC and server solutions are designed for organizations that demand extreme performance and reliability. From AI and machine learning to scientific research and large-scale analytics, we architect and deploy custom compute environments that deliver consistent throughput, efficient cooling, and long-term scalability. Every solution is built with production stability in mind.',
    icon: 'Cpu',
    benefits: [
      'AI & HPC Compute Architecture',
      'High-Density Server Design',
      'Advanced Networking & Cooling',
      'End-to-End Deployment Support'
    ],
    imageUrl: hpc
  },
  {
    id: 'tailored-tech',
    title: 'Tailored Technology Solutions',
    shortDescription:
      'Custom-built technology solutions aligned with unique business workflows.',
    longDescription:
      'No two businesses operate the same way. Our tailored technology solutions are designed for organizations with specific performance, integration, or operational requirements. We combine custom hardware configurations, software integration, and long-term support to deliver systems that fit seamlessly into your workflows—helping teams operate faster, safer, and more efficiently.',
    icon: 'Settings',
    benefits: [
      'Custom Hardware & Software Design',
      'Workflow-Specific Integrations',
      'Lifecycle & Performance Management',
      'Dedicated Technical Support'
    ],
    imageUrl: server
  },
  {
  id: 'cloud-rental',
  title: 'Cloud & Infrastructure Rental Solutions',
  shortDescription:
    'Flexible, enterprise-grade cloud and infrastructure rentals designed for performance, scale, and operational continuity.',
  longDescription:
    'Modern businesses need infrastructure that can scale on demand without long-term capital lock-in. Serverwale Cloud & Infrastructure Rental Solutions provide secure, high-performance servers, GPU systems, and enterprise hardware on flexible rental models. Whether supporting short-term projects, peak workloads, AI training, or business-critical operations, our rental infrastructure is deployed, monitored, and supported to meet strict performance, uptime, and security requirements — allowing teams to focus on outcomes, not ownership.',
  icon: 'Settings',
  benefits: [
    'On-Demand Enterprise Servers & GPU Infrastructure',
    'Flexible Short-Term and Long-Term Rental Models',
    'Secure, High-Availability Deployments',
    '24/7 Monitoring, Maintenance & Technical Support'
  ],
  imageUrl: cloudRental
}
];


export const INDUSTRIES: Industry[] = [
  { name: 'Banking', icon: 'Briefcase' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Healthcare', icon: 'Hospital' },
  { name: 'IT / ITES', icon: 'Globe' },
  { name: 'Media', icon: 'Monitor' },
  { name: 'Startups', icon: 'Zap' },
  { name: 'Retail', icon: 'Store' },
  { name: 'GCC', icon: 'Server' }
];

export const TESTIMONIALS = [
  {
    name: "Amit Verma",
    role: "Head of IT",
    company: "Enterprise Financial Services",
    rating: 5,
    content:
      "Serverwale has been a dependable technology partner for us. Their team understands enterprise requirements deeply and delivers solutions that are stable, secure, and scalable. What stood out most was their responsiveness and ability to handle complex infrastructure challenges without disruption."
  },
  {
    name: "Neha Kapoor",
    role: "CTO",
    company: "Healthcare Technology Firm",
    rating: 5,
    content:
      "Working with Serverwale felt less like working with a vendor and more like working with an extended team. From planning to execution, everything was handled professionally. Their infrastructure support helped us improve performance while meeting strict compliance requirements."
  },
  {
    name: "Rahul Mehta",
    role: "Founder & CEO",
    company: "SaaS Startup",
    rating: 5,
    content:
      "As a growing company, we needed infrastructure that could scale without constant rework. Serverwale guided us at every step, explained trade-offs clearly, and delivered exactly what was promised. Their practical approach and honest advice made a real difference."
  },
  {
    name: "Daniel Thompson",
    role: "Operations Manager",
    company: "Global Manufacturing Group",
    rating: 5,
    content:
      "Reliability is critical for our operations, and Serverwale has consistently met that expectation. Their monitoring, support, and proactive communication give us confidence that our systems are in capable hands, even during peak workloads."
  },
  {
    name: "Priya Sharma",
    role: "Technology Lead",
    company: "Digital Media Company",
    rating: 5,
    content:
      "What we appreciate most about Serverwale is their transparency. They communicate clearly, set realistic expectations, and deliver on time. Their team brings both technical expertise and a strong service mindset, which is rare to find."
  }
];

export const industryContent: Record<string, any> = {
  finance: {
    title: "Financial Services & Fintech Solutions",
    tagline: "Mission-Critical Infrastructure Built for Zero-Downtime Finance",
    blogTag: "Fintech Infrastructure",
    consultTag: "Fintech",
    description:
      "Power your banking, NBFC, or fintech platform with enterprise-grade IT infrastructure engineered for maximum security, regulatory compliance, and sub-millisecond transaction performance.",
    long:
      "Financial institutions cannot afford downtime, data breaches, or compliance failures. Serverwale delivers hardened, audit-ready infrastructure purpose-built for banks, NBFCs, payment processors, and fintech startups. From PCI-DSS compliant data centers to real-time fraud detection systems, every solution is architected with a zero-trust security model, geo-redundant failover, and automated compliance reporting — so your teams can focus on customers, not infrastructure.",
    image: finance,
    stats: [
      { value: "72%", label: "Transaction Failure Reduction" },
      { value: "99.99%", label: "Guaranteed Uptime SLA" },
      { value: "5×", label: "Peak Load Capacity" },
    ],
    points: [
      { text: "PCI-DSS & RBI Compliance Ready", icon: BadgeCheck },
      { text: "Real-Time Fraud Detection Systems", icon: ScanSearch },
      { text: "Sub-Millisecond Transaction Latency", icon: Gauge },
      { text: "Geo-Redundant Disaster Recovery", icon: RefreshCw },
      { text: "Zero-Trust Network Architecture", icon: Fingerprint },
      { text: "Automated Regulatory Audit Reporting", icon: FileText },
    ],
    chooseUs: [
      "Zero-trust security model, certified compliant",
      "Sub-millisecond transaction processing",
      "Multi-region geo-redundant infrastructure",
      "Automated compliance & audit dashboards",
    ],
    reviews: [
      "72% drop in transaction failures post-deployment — Leading NBFC, Delhi",
      "5× peak traffic handled seamlessly during IPO launch — Fintech Startup, Mumbai",
      "Cleared RBI compliance audit with zero findings — Private Bank, Bengaluru",
    ],
    faqs: [
      {
        q: "Is your infrastructure PCI-DSS and RBI compliant?",
        a: "Yes. All financial deployments are architected to meet PCI-DSS Level 1, RBI IT guidelines, and IRDAI data security standards — with automated compliance reporting built in."
      },
      {
        q: "Can you integrate with our existing legacy banking systems?",
        a: "Absolutely. We specialize in secure hybrid integrations with legacy core banking platforms (Finacle, BaNCS, etc.) alongside modern cloud-native systems without disrupting live operations."
      },
      {
        q: "What is the guaranteed uptime for financial infrastructure?",
        a: "We offer 99.99% uptime SLAs backed by geo-redundant failover, real-time health monitoring, and dedicated L2/L3 support teams available 24×7×365."
      },
      {
        q: "How do you handle data residency requirements for Indian financial institutions?",
        a: "All sensitive financial data is hosted within India-based data centers to comply with RBI's data localization norms. Offshore backups are encrypted and governed by strict data handling policies."
      },
      {
        q: "Do you support real-time fraud detection and alerting?",
        a: "Yes. Our solutions include ML-powered anomaly detection, real-time transaction monitoring, and automated alert escalation pipelines that integrate directly with your SOC or risk management team."
      },
    ],
  },

  manufacturing: {
    title: "Smart Manufacturing & Industrial IT Solutions",
    tagline: "Transform Your Factory Floor with Intelligent, Connected Infrastructure",
    blogTag: "Smart Factory Infrastructure",
    consultTag: "Smart Factory",
    description:
      "Modernize your manufacturing operations with IIoT-connected systems, edge computing, and predictive analytics — reducing unplanned downtime and maximizing production throughput across every plant floor.",
    long:
      "In today's competitive manufacturing landscape, operational excellence depends on real-time data, intelligent automation, and resilient connectivity. Serverwale delivers end-to-end Industrial IT infrastructure — from IIoT sensor networks and edge computing nodes to OT security and predictive maintenance dashboards. Our solutions are designed for seamless integration with existing PLCs, SCADA systems, and ERP platforms, enabling manufacturers to achieve Industry 4.0 readiness without disrupting live production environments.",
    image: manufacturing,
    stats: [
      { value: "40%", label: "Downtime Reduction" },
      { value: "3×", label: "Faster Incident Response" },
      { value: "60%", label: "Maintenance Cost Savings" },
    ],
    points: [
      { text: "Industrial IoT (IIoT) Network Deployment", icon: Wifi },
      { text: "Factory Floor Edge Computing", icon: Cpu },
      { text: "Predictive Maintenance & AI Alerts", icon: Activity },
      { text: "OT/IT Converged Network Security", icon: ShieldCheck },
      { text: "PLC & SCADA System Integration", icon: Settings },
      { text: "Real-Time Production Dashboards", icon: LayoutGrid },
    ],
    chooseUs: [
      "Industry 4.0 certified architecture",
      "Seamless Siemens, Allen-Bradley PLC integration",
      "Air-gapped OT environment security",
      "24×7 plant-critical monitoring & support",
    ],
    reviews: [
      "40% reduction in unplanned downtime within 3 months — Auto Parts Manufacturer, Pune",
      "Real-time plant-wide visibility across 6 production lines — Industrial Group, Chennai",
      "Predictive alerts prevented ₹2.4 Cr equipment loss — FMCG Plant, Ahmedabad",
    ],
    faqs: [
      {
        q: "Which PLC and SCADA systems do you support?",
        a: "We support all major industrial platforms including Siemens S7, Allen-Bradley, Mitsubishi, Schneider Electric, and SCADA systems like Wonderware, Ignition, and FactoryTalk — with secure OT/IT integration."
      },
      {
        q: "How does edge computing benefit manufacturing operations?",
        a: "Edge computing brings processing power to the factory floor, enabling real-time data analysis without cloud latency. This allows faster machine-level decisions, local anomaly detection, and continued operation even during network disruptions."
      },
      {
        q: "Can your infrastructure operate in harsh industrial environments?",
        a: "Yes. We deploy ruggedized industrial-grade hardware rated for high temperature, dust, vibration, and humidity — ensuring reliable performance in foundries, chemical plants, textile units, and heavy manufacturing facilities."
      },
      {
        q: "How do you secure OT (Operational Technology) networks from cyber threats?",
        a: "We implement network segmentation, industrial firewalls, encrypted protocols, and continuous threat monitoring specifically designed for OT environments — preventing IT-side threats from crossing into production-critical systems."
      },
      {
        q: "What is the typical ROI timeline for smart factory infrastructure?",
        a: "Most clients see measurable ROI within 6–9 months through downtime reduction, maintenance savings, and productivity gains. We provide detailed baseline assessments and post-deployment reports to quantify your returns."
      },
    ],
  },

  healthcare: {
    title: "Healthcare & Life Sciences IT Solutions",
    tagline: "HIPAA-Compliant Infrastructure That Protects Lives and Patient Data",
    blogTag: "Healthcare Cloud Security",
    consultTag: "Healthcare IT",
    description:
      "Secure, compliant, and high-availability IT infrastructure for hospitals, diagnostic chains, pharma companies, and telemedicine platforms — built to safeguard sensitive patient data while ensuring zero-downtime clinical operations.",
    long:
      "Healthcare organizations operate in a high-stakes environment where data security, regulatory compliance, and 24×7 availability are non-negotiable. Serverwale delivers HIPAA, NABH, and IT Act-compliant infrastructure solutions for hospitals, diagnostic labs, pharmaceutical companies, and digital health platforms. From encrypted EHR systems and PACS storage solutions to AI-powered diagnostic infrastructure and telemedicine platforms — every deployment is engineered for clinical reliability, patient data privacy, and regulatory readiness.",
    image: health,
    stats: [
      { value: "99.99%", label: "Clinical Systems Uptime" },
      { value: "0", label: "Data Breaches on Record" },
      { value: "3×", label: "Faster Diagnostics Delivery" },
    ],
    points: [
      { text: "HIPAA, NABH & IT Act Compliance", icon: BadgeCheck },
      { text: "Encrypted EHR & Patient Data Systems", icon: Lock },
      { text: "PACS & Medical Imaging Storage", icon: HardDrive },
      { text: "Telemedicine Platform Infrastructure", icon: Monitor },
      { text: "AI-Powered Diagnostic Pipelines", icon: FlaskConical },
      { text: "Disaster Recovery & Clinical Continuity", icon: RefreshCw },
    ],
    chooseUs: [
      "Healthcare compliance expertise (HIPAA/NABH)",
      "End-to-end encrypted clinical data pipelines",
      "99.99% uptime for critical care systems",
      "Secure HL7 & FHIR-based EHR integrations",
    ],
    reviews: [
      "Zero patient data breaches since Serverwale deployment — Multi-specialty Hospital, Hyderabad",
      "99.99% uptime across ICU & OT critical systems — Hospital Chain, Delhi NCR",
      "Diagnostic report delivery time reduced by 65% — Diagnostic Lab Network, Mumbai",
    ],
    faqs: [
      {
        q: "Are your healthcare solutions HIPAA and NABH compliant?",
        a: "Yes. All healthcare infrastructure deployments are designed and audited to comply with HIPAA, NABH IT standards, and India's IT Act — with encrypted data flows, access control logs, and compliance dashboards built in."
      },
      {
        q: "Do you support HL7 and FHIR standards for EHR integration?",
        a: "Absolutely. We support HL7 v2/v3, FHIR R4, and DICOM protocols for seamless integration with leading EHR, HIS, RIS, and PACS systems — enabling secure, interoperable clinical data exchange."
      },
      {
        q: "How do you ensure 24×7 uptime for mission-critical hospital systems?",
        a: "Our clinical IT infrastructure includes redundant power paths, hot-failover servers, automated health monitoring, and on-call L3 engineers — ensuring ICU, OT, and emergency systems stay operational with zero single points of failure."
      },
      {
        q: "Can you support telemedicine and remote patient monitoring platforms?",
        a: "Yes. We architect low-latency, secure video and data infrastructure for telemedicine platforms, remote patient monitoring (RPM) devices, and connected health applications — compliant with data localization requirements."
      },
      {
        q: "What happens to patient data in case of a disaster or outage?",
        a: "We implement multi-tier disaster recovery with automated real-time backups, encrypted offsite data replication, and RTO/RPO commitments aligned to clinical criticality — ensuring patient data is never lost and recovery is measured in minutes, not hours."
      },
    ],
  },

  technology: {
    title: "IT, SaaS & Technology Company Solutions",
    tagline: "Cloud-Native Infrastructure for Engineering Teams That Move Fast",
    blogTag: "Cloud Native SaaS Infrastructure",
    consultTag: "SaaS & DevOps",
    description:
      "Accelerate your software delivery with enterprise-grade DevOps automation, Kubernetes orchestration, and cloud-native infrastructure designed to scale with your product — from 100 users to 10 million.",
    long:
      "Technology companies need infrastructure that keeps pace with rapid product iteration, unpredictable traffic spikes, and evolving security threats. Serverwale builds cloud-native, DevOps-automated infrastructure for SaaS platforms, software houses, and ITES organizations. From multi-cloud Kubernetes clusters and CI/CD pipelines to observability stacks and zero-trust security layers — we architect systems that enable faster releases, lower operational costs, and enterprise-grade reliability without the overhead of building it in-house.",
    image: tech,
    stats: [
      { value: "2×", label: "Faster Deployment Cycles" },
      { value: "45%", label: "Cloud Cost Reduction" },
      { value: "99.95%", label: "Service Availability SLA" },
    ],
    points: [
      { text: "Kubernetes Orchestration & Management", icon: Layers },
      { text: "CI/CD Pipeline Automation", icon: Repeat },
      { text: "Multi-Cloud & Hybrid Deployments", icon: Cloud },
      { text: "Observability, Tracing & Log Management", icon: LineChart },
      { text: "Auto-Scaling & Cost Optimization", icon: TrendingUp },
      { text: "DevSecOps & Zero-Trust Security", icon: ShieldCheck },
    ],
    chooseUs: [
      "Cloud-native architecture specialists",
      "End-to-end DevOps & GitOps automation",
      "Multi-region, multi-cloud scalability",
      "Security-first, SOC 2 ready deployments",
    ],
    reviews: [
      "Deployment frequency doubled with zero-downtime releases — B2B SaaS Startup, Bengaluru",
      "45% cloud bill reduction after infrastructure optimization — EdTech Platform, Noida",
      "Zero-downtime during 10× traffic surge on product launch — FinSaaS Company, Mumbai",
    ],
    faqs: [
      {
        q: "Do you support managed Kubernetes clusters across cloud providers?",
        a: "Yes. We manage Kubernetes clusters on AWS EKS, Google GKE, Azure AKS, and bare-metal environments — with GitOps-based deployment automation, auto-scaling policies, and proactive cluster health monitoring."
      },
      {
        q: "How can Serverwale reduce our monthly cloud infrastructure costs?",
        a: "Through infrastructure rightsizing, reserved instance planning, spot instance automation, and FinOps dashboards, our clients typically see 35–50% cloud cost reductions within 60–90 days of engagement."
      },
      {
        q: "Can you set up full CI/CD pipelines for our engineering team?",
        a: "Absolutely. We design and implement CI/CD pipelines using GitHub Actions, GitLab CI, Jenkins, or ArgoCD — integrated with automated testing, container scanning, and blue-green or canary deployment strategies."
      },
      {
        q: "What observability tools do you recommend and support?",
        a: "We support the full observability stack — Prometheus & Grafana for metrics, Loki or ELK for logging, Jaeger or Tempo for tracing — customized to your team's workflows and alert escalation needs."
      },
      {
        q: "Is your infrastructure setup compatible with SOC 2 and ISO 27001 compliance?",
        a: "Yes. We design cloud-native environments with SOC 2 Type II and ISO 27001 readiness in mind — including access controls, audit logging, encryption at rest/in transit, and vulnerability scanning pipelines."
      },
    ],
  },

  media: {
    title: "Media, OTT & Entertainment Infrastructure",
    tagline: "Stream at Scale. Deliver Without Limits. Captivate Every Audience.",
    blogTag: "OTT Streaming Infrastructure",
    consultTag: "Media & Streaming",
    description:
      "High-performance, ultra-low-latency streaming infrastructure for OTT platforms, broadcast networks, gaming companies, and content studios — engineered to deliver flawless experiences to millions of concurrent viewers.",
    long:
      "In the media and entertainment industry, every second of buffering costs audience retention and revenue. Serverwale delivers purpose-built streaming infrastructure with globally distributed CDN, adaptive bitrate encoding pipelines, and DRM-secured content delivery — built to scale from thousands to millions of concurrent viewers. Whether you're launching an OTT platform, expanding a gaming network, or powering live broadcast production, our infrastructure ensures your content reaches every screen with zero compromise on quality or uptime.",
    image: media,
    stats: [
      { value: "60%", label: "Buffering Reduction" },
      { value: "10M+", label: "Concurrent Viewers Supported" },
      { value: "4K", label: "Ultra-HD Streaming Ready" },
    ],
    points: [
      { text: "OTT Platform & Video Streaming Infrastructure", icon: PlayCircle },
      { text: "Global CDN & Adaptive Bitrate Delivery", icon: Globe },
      { text: "Ultra-Low Latency Live Streaming", icon: Radio },
      { text: "DRM & Content Protection Systems", icon: Lock },
      { text: "GPU-Powered Video Transcoding Pipelines", icon: Cpu },
      { text: "Elastic Auto-Scaling for Concurrent Peaks", icon: TrendingUp },
    ],
    chooseUs: [
      "Streaming-optimized edge infrastructure",
      "Multi-CDN management & intelligent routing",
      "Encrypted, DRM-protected content delivery",
      "Elastic scaling for live event traffic spikes",
    ],
    reviews: [
      "60% buffering reduction, 4K streaming enabled nationwide — OTT Platform, Mumbai",
      "Handled 2.4M concurrent viewers during IPL-equivalent live event — Media Network, Delhi",
      "90% improvement in content delivery speed across Tier 2 & 3 cities — Streaming Startup",
    ],
    faqs: [
      {
        q: "Can your infrastructure support 4K and 8K ultra-HD content delivery?",
        a: "Yes. Our GPU-accelerated transcoding pipelines support 4K, HDR, and 8K encoding with adaptive bitrate (ABR) streaming — automatically adjusting quality based on viewer bandwidth for stutter-free playback on any device."
      },
      {
        q: "How do you handle traffic spikes during live events or premiere launches?",
        a: "We deploy elastic auto-scaling infrastructure that provisions additional capacity in seconds, combined with predictive pre-scaling for known high-traffic events — ensuring zero degradation even at 10× normal load."
      },
      {
        q: "What CDN options do you support for global content delivery?",
        a: "We provide multi-CDN management across Akamai, Cloudflare, AWS CloudFront, and regional Indian CDN providers — with intelligent traffic routing to minimize latency for viewers across India and globally."
      },
      {
        q: "Is DRM content protection included in your streaming infrastructure?",
        a: "Yes. We implement industry-standard DRM solutions including Widevine, PlayReady, and FairPlay — protecting your premium content from piracy while ensuring seamless playback on all authorized devices and platforms."
      },
      {
        q: "Do you support low-latency live streaming for news broadcasts and sports?",
        a: "Absolutely. Our low-latency streaming architecture delivers sub-3-second end-to-end latency for live broadcasts — suitable for news, sports, esports, auctions, and any real-time interactive content experience."
      },
    ],
  },

  startups: {
    title: "Startup & High-Growth Company Solutions",
    tagline: "Go From MVP to Millions — Without Rebuilding Your Infrastructure",
    blogTag: "Startup Cloud & Scaling",
    consultTag: "Startup Growth Infrastructure",
    description:
      "Lean, scalable, and investor-ready infrastructure for early-stage and growth-stage startups — designed to grow with your product without surprise bills, technical debt, or downtime during your most critical moments.",
    long:
      "Startups need infrastructure that punches above its weight. Serverwale builds growth-ready, cost-optimized cloud and server infrastructure for early-stage to Series B startups across India and globally. We eliminate the complexity of DIY DevOps, help you avoid expensive over-provisioning, and ensure your platform handles scale when you need it most — whether that's a product hunt launch, a viral moment, or your first enterprise client onboarding. From MVP deployments to multi-region production architectures, we grow with you.",
    image: startup,
    stats: [
      { value: "10×", label: "Scale Without Rebuild" },
      { value: "50%", label: "Average Cloud Cost Savings" },
      { value: "48hr", label: "Production Setup Time" },
    ],
    points: [
      { text: "Rapid MVP to Production Deployment", icon: Rocket },
      { text: "Cost-Optimized Cloud Architecture", icon: CircleDollarSign },
      { text: "DevOps & CI/CD Pipeline Setup", icon: Repeat },
      { text: "Auto-Scaling for Viral Traffic Spikes", icon: TrendingUp },
      { text: "Security, Monitoring & Alerting Stack", icon: ShieldCheck },
      { text: "Investor-Ready Infrastructure Audits", icon: BadgeCheck },
    ],
    chooseUs: [
      "Startup-friendly pricing with no long-term lock-in",
      "Production-ready setup in as fast as 48 hours",
      "Infrastructure that scales 10× without rebuilding",
      "Hands-on technical support from day one",
    ],
    reviews: [
      "Scaled from 0 to 1M users without a single infrastructure rewrite — SaaS Startup, Bengaluru",
      "Reduced cloud spend by ₹8L/month with rightsizing & reserved instances — EdTech, Gurugram",
      "Production infrastructure live in 36 hours before investor demo — FinTech Startup, Pune",
    ],
    faqs: [
      {
        q: "How quickly can you get a startup's infrastructure production-ready?",
        a: "For standard production setups (cloud VMs, managed databases, CI/CD, monitoring), we typically deliver in 48–72 hours. Complex multi-service architectures are completed within 5–7 business days with full documentation handover."
      },
      {
        q: "We are pre-revenue — can we still afford Serverwale's services?",
        a: "Yes. We offer startup-tier pricing models including phased infrastructure setups, pay-as-you-grow commitments, and prioritized packages for early-stage startups backed by recognized incubators and accelerators in India."
      },
      {
        q: "Will we need to rebuild our infrastructure as we scale from 1,000 to 1,000,000 users?",
        a: "Not if it's architected correctly from the start. We design with scalability baked in — using auto-scaling groups, stateless microservices, and managed data layers that handle 10× growth without fundamental restructuring."
      },
      {
        q: "Do you help startups prepare their infrastructure for due diligence or investor reviews?",
        a: "Yes. We conduct infrastructure audits that produce documentation, architecture diagrams, uptime records, and security reports formatted to answer common technical due diligence questions from VCs and enterprise clients."
      },
      {
        q: "What cloud platforms do you support for startups?",
        a: "We work across AWS, Google Cloud, Azure, DigitalOcean, and bare-metal providers — and can manage migrations between them. We also leverage startup credit programs (AWS Activate, Google for Startups) to maximize your cloud budget."
      },
    ],
  },

  retail: {
    title: "Retail & E-Commerce Technology Solutions",
    tagline: "Sell Without Limits — Infrastructure Built for Every Season, Every Spike",
    blogTag: "E-Commerce Scalability & Performance",
    consultTag: "E-Commerce & Retail Tech",
    description:
      "High-performance, secure e-commerce infrastructure for D2C brands, omnichannel retailers, and marketplace platforms — engineered to handle Black Friday volumes, protect every payment, and deliver sub-second page loads that convert.",
    long:
      "E-commerce success is won and lost on performance, uptime, and checkout experience. Serverwale delivers purpose-built retail IT infrastructure that handles flash sale spikes, integrates seamlessly with your ERP and POS systems, secures every payment transaction, and delivers sub-second page loads globally. Whether you're a D2C brand scaling past ₹100 Cr or a marketplace handling millions of SKUs — our infrastructure is the silent engine behind your revenue growth.",
    image: retail,
    stats: [
      { value: "99.99%", label: "Checkout Uptime SLA" },
      { value: "0.8s", label: "Average Page Load Time" },
      { value: "35%", label: "Cart Abandonment Reduction" },
    ],
    points: [
      { text: "Flash Sale & High-Traffic Auto-Scaling", icon: Zap },
      { text: "PCI-DSS Secure Payment Infrastructure", icon: Lock },
      { text: "ERP, POS & OMS System Integration", icon: Package },
      { text: "Global CDN for Sub-Second Page Loads", icon: Globe },
      { text: "Real-Time Inventory & Order Sync", icon: RefreshCw },
      { text: "Customer Analytics & Behavior Tracking", icon: Users },
    ],
    chooseUs: [
      "Black Friday & sale-day tested infrastructure",
      "PCI-DSS compliant payment security",
      "Sub-second global page delivery",
      "Omnichannel ERP & POS integration",
    ],
    reviews: [
      "Handled 180K concurrent shoppers during Diwali sale with zero downtime — D2C Brand, Delhi",
      "Page load time reduced from 4.2s to 0.8s, conversion rate up 28% — E-Commerce Platform, Mumbai",
      "Checkout failure rate dropped to 0.02% post-migration — Marketplace, Bengaluru",
    ],
    faqs: [
      {
        q: "Can your infrastructure handle extreme traffic during flash sales and festive seasons?",
        a: "Yes. Our retail infrastructure uses predictive auto-scaling and load testing to pre-provision capacity for peak events. Clients have handled 50× normal traffic during sale events with zero downtime and sub-2-second page loads throughout."
      },
      {
        q: "Is your e-commerce infrastructure PCI-DSS compliant for payment processing?",
        a: "Absolutely. We architect PCI-DSS Level 1 compliant payment environments with tokenization, encrypted transaction flows, WAF protection, and regular penetration testing — ensuring every customer transaction is fully secured."
      },
      {
        q: "Can you integrate with our existing ERP, POS, and warehouse management systems?",
        a: "Yes. We support integrations with SAP, Oracle NetSuite, Unicommerce, Increff, and all major POS platforms — enabling real-time inventory sync, order management, and fulfillment orchestration across your entire retail stack."
      },
      {
        q: "How do you improve page load speed for better conversion rates?",
        a: "Through multi-CDN optimization, image and asset compression, database query caching, and global edge node deployment — we consistently bring e-commerce page load times below 1 second, directly improving conversion rates and SEO rankings."
      },
      {
        q: "Do you support omnichannel retail operations including physical stores and online channels?",
        a: "Yes. We design unified omnichannel infrastructure that connects your physical store POS, online storefront, mobile apps, and marketplace channels — with centralized inventory visibility, unified customer profiles, and consistent fulfillment logic."
      },
    ],
  },

  education: {
    title: "Education & EdTech Infrastructure Solutions",
    tagline: "Powering India's Classrooms, Campuses & EdTech Platforms with Future-Ready IT",
    blogTag: "EdTech & Campus IT Infrastructure",
    consultTag: "Education & EdTech",
    description:
      "High-performance, budget-conscious IT infrastructure for universities, schools, coaching institutes, and EdTech platforms — from GPU-powered AI learning labs and high-density computer labs to cloud-hosted LMS platforms and campus-wide network deployments.",
    long:
      "India's education sector is undergoing a massive digital transformation — and the right IT infrastructure is the foundation of it all. Serverwale specializes in building cost-effective, high-performance IT environments for educational institutions and EdTech companies. We deliver custom-built computer labs with refurbished workstations, GPU systems for AI/ML-focused programs, cloud VPS solutions for LMS and e-learning platforms, and campus-wide networking — all engineered for reliability, scalability, and tight academic budgets. Whether you're a coaching institute in Delhi, a university expanding its tech campus, or an EdTech startup serving lakhs of learners — we build the infrastructure that powers your growth.",
    image: education,
    stats: [
      { value: "60%", label: "Cost Saving vs New Hardware" },
      { value: "48hr", label: "Lab Setup Turnaround" },
      { value: "10,000+", label: "Workstations Deployed" },
    ],
    points: [
      { text: "Custom Computer Lab Setup & Refurbished Workstations", icon: Laptop },
      { text: "GPU Workstations for AI, ML & Data Science Labs", icon: Cpu },
      { text: "Cloud VPS & LMS Platform Hosting", icon: Cloud },
      { text: "Campus-Wide Wi-Fi & Network Infrastructure", icon: Wifi },
      { text: "Virtual Classroom & Remote Learning Infrastructure", icon: MonitorPlay },
      { text: "Student Data Management & Backup Solutions", icon: HardDrive },
    ],
    chooseUs: [
      "Refurbished hardware — 60% cost savings vs new",
      "Quick 48-hour lab deployment & setup",
      "Dedicated education pricing & AMC plans",
      "Pan-India delivery & on-site installation support",
    ],
    reviews: [
      "200-seat computer lab deployed in 3 days at 55% lower cost — Engineering College, Noida",
      "LMS platform handles 50,000 concurrent students with zero downtime — EdTech Startup, Delhi",
      "GPU workstation lab for AI course cut setup cost by 62% — Coaching Institute, Karol Bagh",
    ],
    faqs: [
      {
        q: "Can you set up a full computer lab with refurbished systems at a lower cost?",
        a: "Absolutely. Serverwale specializes in building high-performance computer labs using quality-tested refurbished workstations — delivering 50–65% cost savings compared to new hardware, without compromising on performance or reliability. Each system comes with a warranty and AMC support option."
      },
      {
        q: "Do you provide GPU workstations for AI, ML, and data science programs?",
        a: "Yes. We configure and supply GPU-powered workstations and servers optimized for AI/ML training, data science, computer vision, and deep learning coursework — available in both new and refurbished options to suit your institution's budget."
      },
      {
        q: "Can you host our LMS or e-learning platform on cloud infrastructure?",
        a: "Yes. We provide cloud VPS and dedicated server hosting optimized for LMS platforms like Moodle, Canvas, and custom-built e-learning applications — with auto-scaling to handle exam-time traffic spikes and 99.9% uptime SLAs for uninterrupted learning."
      },
      {
        q: "Do you handle campus-wide networking and Wi-Fi deployments for educational institutions?",
        a: "Yes. We design and deploy campus-wide structured cabling, high-density Wi-Fi networks, and secure LAN infrastructure for schools, colleges, and university campuses — ensuring seamless connectivity across classrooms, labs, libraries, and hostels."
      },
      {
        q: "What kind of after-sales support and AMC plans do you offer for educational institutions?",
        a: "We offer flexible Annual Maintenance Contracts (AMC) tailored for educational institutions — covering on-site hardware support, remote troubleshooting, spare parts availability, and scheduled preventive maintenance to keep your labs and infrastructure running throughout the academic year."
      },
    ],
  },
};

export const categories = [
  { key: "finance", name: "Finance & Fintech" },
  { key: "manufacturing", name: "Manufacturing" },
  { key: "healthcare", name: "Healthcare" },
  { key: "technology", name: "IT & SaaS" },
  { key: "media", name: "Media & OTT" },
  { key: "startups", name: "Startups" },
  { key: "retail", name: "Retail & E-Commerce" },
  { key: "education", name: "Education & EdTech" },
];

export const industryIcons: Record<string, any> = {
  finance: Briefcase,
  manufacturing: Factory,
  healthcare: Hospital,
  retail: ShoppingCart,
  technology: Server,
  media: PlayCircle,
  startups: Rocket,
  education: GraduationCap,
};
