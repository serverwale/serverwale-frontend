import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import SupportFormModal from "../components/supportFormModal";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Enterprise Solution", path: "/enterprise-solution" },
    { name: "Product", path: "/product" },
    { name: "Services", path: "/services" },
    { name: "Store", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isLinkActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5BAEFF] to-[#3b82f6] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <span
              className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[#020617]" : "text-white"
              }`}
            >
              SERVERWALE<span className="text-[#5BAEFF]">™</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);

              if (link.name === "Store") {
                return (
                  <div key="Store" ref={shopRef} className="relative">
                    <button
                      onClick={() => setShopOpen((v) => !v)}
                      className={`flex items-center gap-1 font-medium text-sm transition-all duration-300 py-2 ${
                        active
                          ? "text-[#5BAEFF]"
                          : scrolled
                          ? "text-slate-700 hover:text-[#5BAEFF]"
                          : "text-white hover:text-[#5BAEFF]"
                      }`}
                    >
                      Store
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          shopOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {shopOpen && (
                      <div className="absolute top-full mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden">
                        <Link
                          to="/shop/now"
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#5BAEFF] font-medium"
                          onClick={() => setShopOpen(false)}
                        >
                          🛒 Our Store
                        </Link>
                        <Link
                          to="/shop/cloud"
                          className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#5BAEFF]"
                          onClick={() => setShopOpen(false)}
                        >
                          ☁️ Cloud
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium text-sm transition-all duration-300 py-2 group ${
                    active
                      ? "text-[#5BAEFF]"
                      : scrolled
                      ? "text-slate-700 hover:text-[#5BAEFF]"
                      : "text-white hover:text-[#5BAEFF]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#5BAEFF] rounded-full transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                scrolled ? "text-slate-600" : "text-white"
              }`}
            >
              <Phone size={16} className="text-[#5BAEFF]" />
              <span className="font-medium">+91 85952 42521</span>
            </div>

            <button
              onClick={() => setSupportModalOpen(true)}
              className="bg-[#040A1C] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
            >
              Get Support
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="flex flex-col px-4 py-6 gap-1">
              {navLinks.map((link) =>
                link.name === "Store" ? (
                  <div key="Store">
                    <button
                      onClick={() => setShopOpen((v) => !v)}
                      className="flex items-center justify-between w-full py-3 font-medium text-slate-700"
                    >
                      Store
                      <ChevronDown size={16} />
                    </button>
                    {shopOpen && (
                      <div className="pl-4">
                        <Link
                          to="/shop/now"
                          className="block py-2 text-sm text-slate-700 font-medium"
                          onClick={() => setMobileOpen(false)}
                        >
                          🛒 Our Store
                        </Link>
                        <Link
                          to="/shop/cloud"
                          className="block py-2 text-sm text-slate-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          ☁️ Cloud
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 font-medium text-slate-700"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </header>

      <SupportFormModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </>
  );
};

export default Header;
