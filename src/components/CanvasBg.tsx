/**
 * CanvasBg — Interactive canvas particle-network background
 * - Floating glowing particles
 * - Dynamic connection lines between nearby particles
 * - Mouse hover: particles scatter away from cursor + cursor glow ring
 * - Large visible colour orbs layered beneath for depth
 * Fully GPU-friendly: only canvas 2D ops + CSS transforms.
 */
import React, { useEffect, useRef } from "react";

interface Props {
  /** Blue = #0055E5 family | Violet = #6366f1 family | Cyan = #22d3ee family */
  variant?: "blue" | "violet" | "cyan";
  /** Number of particles (default 70) */
  count?: number;
}

const PALETTE = {
  blue:   { dot: "96,165,250",  line: "96,165,250",  orb1: "#003080", orb2: "#312e81", orb3: "#003EA3"  },
  violet: { dot: "167,139,250", line: "139,92,246",  orb1: "#2e1065", orb2: "#1e1b4b", orb3: "#3b0764"  },
  cyan:   { dot: "34,211,238",  line: "6,182,212",   orb1: "#0c4a6e", orb2: "#083344", orb3: "#164e63"   },
};

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  r: number;
  opacity: number;
  pulsePhase: number;
}

const CanvasBg: React.FC<Props> = ({ variant = "blue", count = 70 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pal = PALETTE[variant];

    /* ── Sizing ── */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Particles ── */
    const makeParticles = (): Particle[] =>
      Array.from({ length: count }, () => {
        const bvx = (Math.random() - 0.5) * 0.6;
        const bvy = (Math.random() - 0.5) * 0.6;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: bvx, vy: bvy,
          baseVx: bvx, baseVy: bvy,
          r: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.4 + 0.4,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });

    let particles = makeParticles();
    let t = 0;

    /* ── Draw loop ── */
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const CONNECT_DIST  = 130;
      const MOUSE_DIST    = 110;
      const MOUSE_FORCE   = 1.8;

      /* --- Connection lines --- */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        /* Mouse repulsion */
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST && md > 0) {
          const force = (MOUSE_DIST - md) / MOUSE_DIST;
          p.vx += (mdx / md) * force * MOUSE_FORCE;
          p.vy += (mdy / md) * force * MOUSE_FORCE;
        }

        /* Damping back to base speed */
        p.vx = p.vx * 0.96 + p.baseVx * 0.04;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;

        /* Speed cap */
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 3) { p.vx = (p.vx / sp) * 3; p.vy = (p.vy / sp) * 3; }

        /* Move */
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges (seamless) */
        if (p.x < -10) p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        /* Lines to other particles */
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${pal.line},${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      /* --- Particles --- */
      for (const p of particles) {
        const pulse   = 0.5 + 0.5 * Math.sin(t * 1.5 + p.pulsePhase);
        const r       = p.r + pulse * 0.6;
        const opacity = p.opacity * (0.75 + pulse * 0.25);

        /* Outer glow */
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grd.addColorStop(0,   `rgba(${pal.dot},${opacity})`);
        grd.addColorStop(0.4, `rgba(${pal.dot},${opacity * 0.4})`);
        grd.addColorStop(1,   `rgba(${pal.dot},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pal.dot},${opacity})`;
        ctx.fill();
      }

      /* --- Mouse glow ring --- */
      if (mx > 0 && my > 0 && mx < canvas.width && my < canvas.height) {
        const mGrd = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        mGrd.addColorStop(0,   `rgba(${pal.dot},0.10)`);
        mGrd.addColorStop(0.5, `rgba(${pal.dot},0.04)`);
        mGrd.addColorStop(1,   `rgba(${pal.dot},0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fillStyle = mGrd;
        ctx.fill();

        /* Crisp ring stroke */
        ctx.beginPath();
        ctx.arc(mx, my, 28, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pal.dot},0.30)`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    /* Mouse tracking */
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [variant, count]);

  const pal = PALETTE[variant];

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

      {/* Deep colour orbs — CSS, clearly visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full opacity-40"
          style={{ background: `radial-gradient(circle, ${pal.orb1}cc, transparent 70%)`,
                   animation: "orbFloat1 18s ease-in-out infinite" }} />
        <div className="absolute -bottom-20 -right-16 w-[380px] h-[380px] rounded-full opacity-35"
          style={{ background: `radial-gradient(circle, ${pal.orb2}bb, transparent 70%)`,
                   animation: "orbFloat2 22s ease-in-out 6s infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${pal.orb3}99, transparent 70%)`,
                   animation: "orbFloat3 15s ease-in-out 3s infinite" }} />
      </div>

      {/* Interactive canvas on top — pointer-events-auto so mouse works */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
      />

      {/* Edge fade vignette so canvas blends with section */}
      <div className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(2,6,23,0.65) 100%)"
        }} />
    </div>
  );
};

export default CanvasBg;
