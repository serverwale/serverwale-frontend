import React, { useState, useEffect } from "react";
import AiChat from "../components/ai/AiChat";
import { Plus, X, User, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER  = "918383042521";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi 👋 I'm visiting your website and would love to get more details about your services. Could you please help me?"
);

const QuickButtons: React.FC = () => {
  const [openMenu,     setOpenMenu]     = useState(false);
  const [showConsult,  setShowConsult]  = useState(false);
  const [showConnect,  setShowConnect]  = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showChat,     setShowChat]     = useState(false);
  const [isAutoOpen,   setIsAutoOpen]   = useState(false);

  /* ── Auto-open chat 3 seconds after page load (no scroll needed) ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setIsAutoOpen(true);
      setShowChat(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const openChatManual = () => {
    setIsAutoOpen(false);
    setShowChat(v => !v);
  };

  const closeChat = () => {
    setShowChat(false);
    setIsAutoOpen(false);
  };

  const actions = [
    { label: "Instagram", icon: <Instagram size={18} />, onClick: () => window.open("https://www.instagram.com/serverwale/", "_blank") },
    { label: "LinkedIn",  icon: <Linkedin  size={18} />, onClick: () => window.open("https://www.linkedin.com/company/serverwale/posts/?feedView=all", "_blank") },
    { label: "Twitter",   icon: <Twitter   size={18} />, onClick: () => window.open("https://x.com/Serverwale", "_blank") },
    { label: "Facebook",  icon: <Facebook  size={18} />, onClick: () => window.open("https://www.facebook.com/people/Serverwale/61555058137586/", "_blank") },
    { label: "WhatsApp",  icon: <FaWhatsapp size={18} />, onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, "_blank") },
  ];

  return (
    <>
      {/* Backdrop when arc menu is open */}
      {openMenu && (
        <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={() => setOpenMenu(false)} />
      )}

      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">

        {/* ── Kiara AI Chat button ── */}
        <div
          className={`relative transition-all duration-300 ${openMenu ? "-translate-y-8 opacity-50 pointer-events-none" : ""}`}
          onMouseEnter={() => setShowConsult(true)}
          onMouseLeave={() => setShowConsult(false)}
        >
          {showConsult && !openMenu && (
            <div className="absolute right-16 bg-[#0F172A] text-white text-sm px-3 py-2 rounded-full shadow-md whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Kiara · 24/7 Expert
            </div>
          )}
          <button
            onClick={openChatManual}
            className={`w-12 h-12 rounded-full border-2 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110
              ${showChat
                ? "bg-[#0F172A] text-white border-[#08152E] shadow-blue-300/40 shadow-lg"
                : "bg-white text-[#0055E5] border-blue-200 hover:bg-[#0F172A] hover:text-white hover:border-[#08152E]"
              }`}
          >
            <User size={20} />
          </button>
        </div>

        {/* ── WhatsApp button ── */}
        <div
          className={`relative transition-all duration-300 ${openMenu ? "opacity-50 pointer-events-none" : ""}`}
          onMouseEnter={() => setShowWhatsApp(true)}
          onMouseLeave={() => setShowWhatsApp(false)}
        >
          {showWhatsApp && !openMenu && (
            <div className="absolute right-16 bg-green-600 text-white text-sm px-3 py-2 rounded-full shadow-md whitespace-nowrap">
              WhatsApp Us
            </div>
          )}
          <button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, "_blank")}
            className="w-12 h-12 rounded-full bg-white text-green-500 border-2 border-green-200 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-green-500 hover:text-white hover:border-green-500"
          >
            <FaWhatsapp size={20} />
          </button>
        </div>

        {/* ── Arc menu trigger (Plus) ── */}
        <div className="relative w-12 h-12">

          {/* Arc menu items */}
          {actions.map((item, index) => {
            const startAngle = 180, endAngle = 270;
            const angle  = startAngle + ((endAngle - startAngle) / (actions.length - 1)) * index;
            const radius = openMenu ? 110 : 0;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <button
                key={item.label}
                onClick={() => { item.onClick(); setOpenMenu(false); }}
                title={item.label}
                className="absolute w-11 h-11 rounded-full bg-white text-[#0055E5] border border-blue-200 shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#0044BB] hover:text-white hover:scale-110 hover:shadow-lg focus:outline-none"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: openMenu ? 1 : 0,
                  pointerEvents: openMenu ? "auto" : "none",
                }}
              >
                {item.icon}
              </button>
            );
          })}

          {/* Plus button — white bg + blue icon; hover = blue bg + white icon */}
          <div
            onMouseEnter={() => !openMenu && setShowConnect(true)}
            onMouseLeave={() => setShowConnect(false)}
          >
            {showConnect && !openMenu && (
              <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0055E5] text-white text-sm px-3 py-2 rounded-full shadow-md whitespace-nowrap">
                Connect with us
              </div>
            )}
            <button
              onClick={() => setOpenMenu(v => !v)}
              className={`w-12 h-12 rounded-full border-2 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none
                ${openMenu
                  ? "bg-[#0055E5] text-white border-blue-600"
                  : "bg-white text-[#0055E5] border-blue-200 hover:bg-[#0044BB] hover:text-white hover:border-blue-600"
                }`}
            >
              {openMenu ? <X size={20} /> : <Plus size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Floating Chat Widget (above the button cluster) ── */}
      <div
        className={`fixed bottom-[220px] right-6 z-[9998] w-[340px] sm:w-[370px] transition-all duration-300 origin-bottom-right
          ${showChat ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
        style={{ height: "500px" }}
      >
        <button
          onClick={closeChat}
          className="absolute -top-3 -right-3 z-10 bg-[#0F172A] hover:bg-blue-700 text-white rounded-full p-1.5 shadow-lg transition"
        >
          <X size={14} />
        </button>
        <div className="h-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          {showChat && (
            <AiChat
              isAutoOpen={isAutoOpen}
              key={`${String(isAutoOpen)}-${String(showChat)}`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuickButtons;
