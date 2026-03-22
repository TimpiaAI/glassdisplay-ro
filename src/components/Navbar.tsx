import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = ["Soluția", "Cum funcționează", "Prețuri", "Contact"];

export function Navbar({ initialScrolled = false }: { initialScrolled?: boolean } = {}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(initialScrolled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const linkPrefix = isHome ? "" : "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pt-4 md:pt-6">
        <motion.nav
          className={`pointer-events-auto transition-all duration-500 flex items-center justify-between overflow-hidden rounded-full ${
            scrolled
              ? "w-full max-w-4xl bg-white/90 backdrop-blur-2xl border-2 border-text-head shadow-[4px_4px_0px_0px_#141414] py-3 px-4 md:px-6"
              : "w-full max-w-7xl bg-white/10 backdrop-blur-md py-2 px-2"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="/" className="flex items-center gap-2 shrink-0 px-2 md:px-0">
            <div className="relative w-8 h-8 md:w-9 md:h-9 -rotate-3 transition-transform duration-500 ease-out hover:-rotate-6 hover:scale-110 group/icon overflow-hidden rounded">
              <img
                src="/logo.svg"
                alt="Glass Display"
                className="w-full h-full"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[50%] skew-x-[-20deg] pointer-events-none opacity-0 group-hover/icon:animate-[shine_0.6s_ease-in-out]" />
            </div>
            <div className="flex items-center gap-1 transition-transform duration-500 ease-out hover:-rotate-1 relative overflow-hidden group/text">
              <span className="font-sans font-light text-lg md:text-xl tracking-tight text-text-head">Glass</span>
              <span className="font-sans font-bold text-lg md:text-xl tracking-tight text-text-head">Display</span>
              <span className="text-[0.85em] text-text-body align-super leading-none inline-block rotate-[-8deg]">®</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[40%] skew-x-[-20deg] pointer-events-none opacity-0 group-hover/text:animate-[shine_0.6s_ease-in-out]" />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`${linkPrefix}#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-text-body hover:text-text-head transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-text-head scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden md:block bg-accent text-text-head px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00e67a] transition-all duration-300 glow-accent-hover relative overflow-hidden group shrink-0">
              <span className="relative z-10">Cere ofertă</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-text-head"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`${linkPrefix}#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold text-text-head hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={`${linkPrefix}#contact`}
                onClick={() => setMobileOpen(false)}
                className="bg-accent text-text-head px-8 py-4 rounded-full text-lg font-semibold text-center mt-4 border-2 border-text-head shadow-[4px_4px_0px_0px_#141414]"
              >
                Cere ofertă
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
