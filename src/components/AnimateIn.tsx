/**
 * AnimateIn — Scroll-triggered entry animation component
 * Elements start hidden / offset, animate to final position when they enter viewport.
 * Uses IntersectionObserver (performant, no layout recalc).
 *
 * Usage:
 *   <AnimateIn variant="fadeUp" delay={100}>
 *     <YourCard />
 *   </AnimateIn>
 */
import React, { useEffect, useRef, useState } from "react";

export type AnimVariant =
  | "fadeUp"      // rise from below
  | "fadeDown"    // drop from above
  | "fadeLeft"    // enter from left
  | "fadeRight"   // enter from right
  | "zoomIn"      // scale up + fade
  | "zoomInUp"    // scale up + rise + fade
  | "fadeOnly";   // pure opacity (no movement)

interface AnimateInProps {
  children: React.ReactNode;
  variant?: AnimVariant;
  /** delay in ms AFTER element enters viewport */
  delay?: number;
  /** transition duration in ms */
  duration?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** extra className on the wrapper */
  className?: string;
  /** render as a different tag */
  as?: keyof React.JSX.IntrinsicElements;
}

const INITIAL_TRANSFORM: Record<AnimVariant, string> = {
  fadeUp:    "translateY(44px)",
  fadeDown:  "translateY(-44px)",
  fadeLeft:  "translateX(-48px)",
  fadeRight: "translateX(48px)",
  zoomIn:    "scale(0.85)",
  zoomInUp:  "scale(0.87) translateY(28px)",
  fadeOnly:  "none",
};

const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  variant   = "fadeUp",
  delay     = 0,
  duration  = 650,
  threshold = 0.1,
  className = "",
  as        = "div",
}) => {
  const ref    = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setSeen(true); ob.disconnect(); }
      },
      { threshold }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity:          seen ? 1 : 0,
        transform:        seen ? "none" : INITIAL_TRANSFORM[variant],
        transition:       `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${seen ? delay : 0}ms,
                           transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${seen ? delay : 0}ms`,
        willChange:       "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
};

export default AnimateIn;
