import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WA_NUM = "919999656064";
const WA_MSG = encodeURIComponent("Hi! I'd like to get a quote for enterprise servers.");

const StickyMobileCTA: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Show sticky bar only after user scrolls past the hero (~300px)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
        lg:hidden fixed bottom-0 left-0 right-0 z-[9990] font-sans
        transition-transform duration-300
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Safe-area pad for phones with notch/home bar */}
      <div className="bg-[#0F172A]/95 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-4 flex gap-3">
        <button
          onClick={() => navigate("/contact")}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-white font-black text-sm py-3 rounded-xl transition-all duration-200 shadow-lg"
        >
          <FileText size={15} /> Get Free Quote
        </button>
        <a
          href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0055E5] hover:bg-blue-50 text-white font-black text-sm py-3 rounded-xl transition-all duration-200 shadow-lg"
        >
          <FaWhatsapp size={16} /> WhatsApp Us
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
