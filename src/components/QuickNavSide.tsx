import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, MonitorCheck, CloudCog } from "lucide-react";

const ITEMS = [
  {
    id: "store",
    icon: <ShoppingBag size={20} />,
    label: "Serverwale Store",
    path: "/shop/now",
    borderColor:  "border-blue-300",
    iconColor:    "text-[#0055E5]",
    hoverBg:      "hover:bg-[#0044BB] hover:border-[#0055E5]",
    labelBg:      "bg-[#0055E5]",
  },
  {
    id: "prostation",
    icon: <MonitorCheck size={20} />,
    label: "ProStation Systems",
    path: "/product",
    borderColor:  "border-slate-400",
    iconColor:    "text-[#08152E]",
    hoverBg:      "hover:bg-[#0F172A] hover:border-[#08152E]",
    labelBg:      "bg-[#0F172A]",
  },
  {
    id: "cloud",
    icon: <CloudCog size={20} />,
    label: "Cloud Services",
    path: "/shop/cloud",
    borderColor:  "border-indigo-300",
    iconColor:    "text-indigo-600",
    hoverBg:      "hover:bg-indigo-600 hover:border-indigo-600",
    labelBg:      "bg-indigo-600",
  },
];

const QuickNavSide: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="fixed right-6 z-[9990] flex flex-col items-end gap-3 font-sans"
      style={{ top: "72px" }}  /* just below the header */
    >
      {ITEMS.map((item) => {
        const isHovered = hoveredId === item.id;
        return (
          <div
            key={item.id}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Slide-out label — left of the button */}
            <div
              className={`
                absolute right-16
                ${item.labelBg} text-white
                text-xs font-semibold px-3 py-2 rounded-full shadow-md
                whitespace-nowrap
                transition-all duration-200
                ${isHovered
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-2 pointer-events-none"
                }
              `}
            >
              {item.label}
            </div>

            {/* Circular button — same style as QuickButtons */}
            <Link
              to={item.path}
              className={`
                w-12 h-12 rounded-full
                bg-white ${item.borderColor} border-2
                ${item.iconColor}
                shadow-md
                flex items-center justify-center
                transition-all duration-200
                hover:scale-110 hover:text-white hover:shadow-lg
                ${item.hoverBg}
              `}
            >
              {item.icon}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuickNavSide;
