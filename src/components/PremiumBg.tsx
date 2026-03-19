/**
 * PremiumBg — reusable animated background layer
 * Drop inside any `relative overflow-hidden` section.
 * All animations are CSS transform-only → GPU-accelerated, no layout jank.
 */
import React from "react";

interface PremiumBgProps {
  /** Colour scheme of the host section */
  variant?: "blue" | "violet" | "orange";
}

type Orb = {
  w: number; h: number;
  top: string; left: string;
  color: string;
  anim: string; dur: string; delay: string;
};

type Dot = {
  size: number; top: string; left: string;
  delay: string; dur: string; color: string;
};

const PremiumBg: React.FC<PremiumBgProps> = ({ variant = "blue" }) => {

  /* ── Orbs ────────────────────────────────── */
  const orbs: Orb[] = variant === "blue" ? [
    { w:420, h:420, top:"−10%", left:"−8%",  color:"rgba(37,99,235,0.09)",  anim:"orbFloat1", dur:"16s", delay:"0s"   },
    { w:320, h:320, top:"50%",  left:"70%",  color:"rgba(139,92,246,0.07)",  anim:"orbFloat2", dur:"20s", delay:"4s"   },
    { w:260, h:260, top:"25%",  left:"45%",  color:"rgba(37,99,235,0.05)",  anim:"orbFloat3", dur:"14s", delay:"8s"   },
    { w:180, h:180, top:"75%",  left:"10%",  color:"rgba(249,115,22,0.055)", anim:"orbFloat1", dur:"18s", delay:"12s"  },
  ] : variant === "violet" ? [
    { w:380, h:380, top:"-5%",  left:"-5%",  color:"rgba(139,92,246,0.10)",  anim:"orbFloat2", dur:"17s", delay:"0s"   },
    { w:300, h:300, top:"55%",  left:"65%",  color:"rgba(37,99,235,0.07)",  anim:"orbFloat1", dur:"22s", delay:"5s"   },
    { w:220, h:220, top:"30%",  left:"50%",  color:"rgba(249,115,22,0.05)",  anim:"orbFloat3", dur:"13s", delay:"10s"  },
    { w:160, h:160, top:"80%",  left:"80%",  color:"rgba(139,92,246,0.06)",  anim:"orbFloat2", dur:"19s", delay:"7s"   },
  ] : /* orange */ [
    { w:360, h:360, top:"-8%",  left:"60%",  color:"rgba(249,115,22,0.09)",  anim:"orbFloat1", dur:"15s", delay:"0s"   },
    { w:280, h:280, top:"60%",  left:"-5%",  color:"rgba(37,99,235,0.07)",  anim:"orbFloat3", dur:"21s", delay:"6s"   },
    { w:200, h:200, top:"20%",  left:"35%",  color:"rgba(251,191,36,0.06)",  anim:"orbFloat2", dur:"12s", delay:"3s"   },
    { w:150, h:150, top:"85%",  left:"70%",  color:"rgba(139,92,246,0.05)",  anim:"orbFloat1", dur:"17s", delay:"9s"   },
  ];

  /* ── Dots ────────────────────────────────── */
  const dots: Dot[] = [
    { size:3, top:"15%", left:"20%",  delay:"0s",   dur:"3.2s", color:"rgba(37,99,235,0.6)"  },
    { size:2, top:"35%", left:"75%",  delay:"0.8s", dur:"4s",   color:"rgba(139,92,246,0.5)"  },
    { size:3, top:"60%", left:"40%",  delay:"1.5s", dur:"3.5s", color:"rgba(249,115,22,0.5)"  },
    { size:2, top:"80%", left:"85%",  delay:"2.2s", dur:"5s",   color:"rgba(37,99,235,0.4)"  },
    { size:4, top:"10%", left:"55%",  delay:"0.4s", dur:"4.5s", color:"rgba(251,191,36,0.45)" },
    { size:2, top:"50%", left:"8%",   delay:"3.1s", dur:"3.8s", color:"rgba(139,92,246,0.4)"  },
    { size:3, top:"90%", left:"30%",  delay:"1.9s", dur:"4.2s", color:"rgba(37,99,235,0.5)"  },
    { size:2, top:"25%", left:"92%",  delay:"2.7s", dur:"3.0s", color:"rgba(249,115,22,0.4)"  },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">

      {/* Subtle dot-grid base */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width:  orb.w,
            height: orb.h,
            top:    orb.top,
            left:   orb.left,
            background: orb.color,
            filter: "blur(72px)",
            animation: `${orb.anim} ${orb.dur} ease-in-out ${orb.delay} infinite`,
          }}
        />
      ))}

      {/* Twinkling particle dots */}
      {dots.map((d, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width:  d.size,
            height: d.size,
            top:    d.top,
            left:   d.left,
            background: d.color,
            animation: `twinkleDot ${d.dur} ease-in-out ${d.delay} infinite`,
          }}
        />
      ))}

      {/* Horizontal sweep line */}
      <div
        className="absolute top-1/2 left-0 w-1/3 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)",
          animation: "scanSweep 8s ease-in-out 2s infinite",
        }}
      />

      {/* Pulsing ring (top-right corner accent) */}
      <div
        className="absolute -top-20 -right-20 rounded-full border border-blue-400/20"
        style={{
          width:  380,
          height: 380,
          animation: "ringPulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -top-10 -right-10 rounded-full border border-slate-200/10"
        style={{
          width:  240,
          height: 240,
          animation: "ringPulse 6s ease-in-out 2s infinite",
        }}
      />

    </div>
  );
};

export default PremiumBg;
