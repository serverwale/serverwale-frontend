import React from 'react';
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
  Star
} from 'lucide-react';
import { Service, Industry, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'it-consulting',
    title: 'Network & IT Consulting',
    shortDescription: 'Expert IT infrastructure consulting for data centers, enterprise networks & hybrid architectures across India.',
    longDescription: `Serverwale's Network & IT Consulting services help businesses design, deploy, and optimize high-performance IT infrastructure. Whether you're a startup building your first server room or an enterprise modernizing a legacy data center, our certified architects provide end-to-end guidance tailored to your workload and budget.

We conduct in-depth analysis of your existing environment — including network topology, bandwidth utilization, hardware health, and security posture — to deliver a future-proof infrastructure blueprint. Our team specializes in Dell, HP, and Cisco enterprise environments, helping organizations across Delhi NCR, Mumbai, and Bangalore reduce IT costs by up to 50% while improving uptime and reliability.

From structured cabling and rack design to firewall configuration and disaster recovery planning, we cover every aspect of your IT infrastructure lifecycle.`,
    icon: 'Network',
    benefits: [
      'Custom infrastructure roadmaps aligned to your business goals',
      '24/7 proactive network monitoring & alerting',
      'Hardware lifecycle management & procurement',
      'VLAN segmentation, firewall & zero-trust security',
      'Rack planning, cabling & data center optimization',
      'Pan-India on-site deployment & support teams'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions & Security',
    shortDescription: 'Hybrid cloud deployments, cloud migration & cybersecurity frameworks for Indian enterprises.',
    longDescription: `Modernize your IT infrastructure with Serverwale's enterprise-grade Cloud Solutions & Security services. We design and implement hybrid cloud architectures that combine the performance of on-premise servers with the flexibility and scalability of public cloud platforms including AWS, Azure, and GCP.

Our security-first approach ensures every cloud environment we deploy meets industry compliance standards — whether your business operates in BFSI, healthcare, retail, or manufacturing. We implement zero-trust security models, data encryption, identity & access management (IAM), and real-time threat monitoring to protect your critical workloads.

For businesses in India looking to migrate from on-premise servers to cloud, or build a robust hybrid infrastructure, our team delivers seamless migrations with zero data loss and minimal downtime.`,
    icon: 'Cloud',
    benefits: [
      'AWS, Azure & GCP hybrid cloud architecture design',
      'Zero-trust security framework implementation',
      'Seamless cloud migration with zero data loss',
      'GDPR, ISO 27001 & DPDP compliance support',
      'Cloud cost optimization — reduce bills by 30-40%',
      'Real-time threat detection & incident response'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'rendering-infra',
    title: 'Rendering Infrastructure',
    shortDescription: 'High-performance GPU render farms for VFX studios, animation houses & architectural firms in India.',
    longDescription: `Power your creative pipeline with Serverwale's purpose-built Rendering Infrastructure solutions. We design and deploy GPU render farms optimized for industry-standard software including V-Ray, Arnold, Redshift, Octane, and Blender Cycles — delivering the raw compute power your studio needs to meet production deadlines.

Our rendering infrastructure packages are tailored for VFX studios, 3D animation companies, architectural visualization firms, and game development studios across India. We supply certified refurbished NVIDIA Quadro, RTX 3090, RTX 4090, A5000, and A6000 GPUs along with high-bandwidth NAS storage and 100GbE networking.

Whether you need a 4-node render cluster or a full 50-node farm, Serverwale handles design, procurement, racking, OS deployment, and licensing — so your team can focus on creating, not configuring.`,
    icon: 'Monitor',
    benefits: [
      'NVIDIA RTX & Quadro GPU clusters for V-Ray, Redshift & Arnold',
      'High-bandwidth NAS storage with NVMe caching',
      'Remote render management via Deadline & Tractor',
      '100GbE Infiniband networking for zero-bottleneck I/O',
      'GPU workstations for individual artists & supervisors',
      'Flexible rental & lease options for production peaks'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'hpc-solutions',
    title: 'Custom HPC & AI Server Solutions',
    shortDescription: 'High-performance computing servers for AI/ML, deep learning, genomics & scientific research in India.',
    longDescription: `Accelerate your most demanding workloads with Serverwale's Custom HPC & AI Server Solutions. From AI model training and deep learning inference to genomic sequencing, financial simulation, and climate modeling — our HPC clusters deliver the sustained compute performance your research and enterprise applications demand.

We build custom HPC nodes powered by NVIDIA H100, A100, and H200 GPUs with Infiniband HDR networking, NVMe-oF storage, and liquid-cooled chassis for maximum thermal efficiency. Our engineers configure CUDA, ROCm, MPI, and Slurm environments for immediate production deployment.

Serverwale has deployed HPC infrastructure for research institutions, pharmaceutical companies, fintech firms, and AI startups across India — delivering turnkey solutions from rack design to OS configuration at a fraction of the cost of OEM quotes.`,
    icon: 'Cpu',
    benefits: [
      'NVIDIA H100, A100 & H200 GPU cluster design & deployment',
      'Infiniband HDR & HDR100 high-speed fabric networking',
      'NVMe-oF parallel storage with Lustre/GPFS',
      'CUDA, ROCm, MPI & Slurm HPC environment setup',
      'Liquid cooling for high-density compute racks',
      'Turnkey AI training clusters from ₹25L onwards'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'tailored-tech',
    title: 'Tailored Tech & Enterprise Solutions',
    shortDescription: 'Custom-built enterprise IT solutions, server configurations & hardware integrations for unique business needs.',
    longDescription: `No two businesses are alike — which is why Serverwale offers fully Tailored Tech & Enterprise Solutions designed around your specific operational requirements. Our engineering team builds proprietary hardware stacks, custom rackmount configurations, and bespoke software-hardware integration layers that give your organization a competitive edge.

From custom NAS appliances and edge computing nodes to specialized industrial servers and workstation builds, we handle the full product lifecycle — requirements analysis, hardware selection, firmware customization, QA testing, and deployment.

We work with leading OEM component suppliers including Supermicro, Intel, AMD, NVIDIA, and Samsung to source the right parts at the right price. Every custom solution undergoes our rigorous 72-point quality assurance process before shipment, ensuring zero-day production stability.`,
    icon: 'Settings',
    benefits: [
      'Custom server & workstation configurations for unique workloads',
      'Proprietary NAS, edge compute & embedded system builds',
      'Full lifecycle management from design to decommissioning',
      'Specialized firmware & BIOS optimization',
      'Component sourcing from Supermicro, Intel, AMD & NVIDIA',
      '72-point QA testing with 72-hour burn-in validation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Banking & BFSI', icon: 'Briefcase' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Healthcare & Pharma', icon: 'Hospital' },
  { name: 'IT / ITES', icon: 'Globe' },
  { name: 'Media & VFX', icon: 'Monitor' },
  { name: 'Startups & SMBs', icon: 'Zap' },
  { name: 'Retail & E-Commerce', icon: 'Store' },
  { name: 'GCC & MNCs', icon: 'Server' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Arjun Mehta',
    role: 'CTO',
    company: 'FinTech Solutions Ltd.',
    content: 'Serverwale transformed our legacy server infrastructure into a modern hybrid cloud facility at 65% lower cost than OEM quotes. Their team\'s expertise in enterprise security and HP ProLiant configurations is unmatched. Highly recommend for any serious IT upgrade.',
    rating: 5
  },
  {
    name: 'Priya Nair',
    role: 'Head of Post Production',
    company: 'Creative Pixels Studio',
    content: 'We set up a 20-node render farm for our VFX pipeline with Serverwale. They delivered the entire cluster — racked, configured, and production-ready — in under two weeks. Our render times dropped by 40%. Exceptional service and deep technical knowledge.',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    role: 'IT Infrastructure Manager',
    company: 'Global Health Systems',
    content: 'We\'ve been sourcing refurbished HP and Dell servers from Serverwale for three years. The quality, warranty support, and pricing are consistently excellent. Their pan-India delivery and on-site support team makes them our go-to infrastructure partner.',
    rating: 5
  },
  {
    name: 'Rajat Sharma',
    role: 'Founder & CEO',
    company: 'DataDriven AI Labs',
    content: 'We needed a GPU cluster for AI model training on a tight budget. Serverwale configured a 4x NVIDIA A100 server that performs on par with cloud alternatives at a fraction of the monthly cost. Their after-sales support has been outstanding.',
    rating: 5
  },
  {
    name: 'Anita Joshi',
    role: 'Director of Operations',
    company: 'Tridiv Architects',
    content: 'Serverwale built a custom visualization workstation farm for our architectural team. Every machine is perfectly tuned for 3ds Max and Enscape rendering. Incredible value for money and the team\'s product knowledge saved us from many costly mistakes.',
    rating: 5
  },
  {
    name: 'Sandeep Kaur',
    role: 'IT Director',
    company: 'Horizon Manufacturing',
    content: 'We procured 25 rack servers and complete networking infrastructure through Serverwale for our new factory data center. The project was delivered on time, within budget, and the technical team handled every challenge professionally. World-class service.',
    rating: 5
  }
];
