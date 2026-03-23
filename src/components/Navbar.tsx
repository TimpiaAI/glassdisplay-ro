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
          className={`pointer-events-auto flex flex-wrap items-center justify-between transition-[max-width,background-color,padding,box-shadow,border-color] duration-500 rounded-3xl md:rounded-full ${
            scrolled || mobileOpen
              ? "w-full max-w-4xl bg-white/95 backdrop-blur-sm md:backdrop-blur-2xl border-2 border-text-head shadow-[4px_4px_0px_0px_#141414] py-3 px-4 md:px-6"
              : "w-full max-w-7xl bg-white/10 backdrop-blur-none md:backdrop-blur-md py-2 px-2 border-2 border-transparent shadow-none"
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
              <span className="relative z-10">Solicită o ofertă</span>
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

          {/* Mobile menu - expands inside navbar */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-4 pt-4 pb-2 border-t border-text-head/10 mt-3">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item}
                      href={`${linkPrefix}#${item.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="text-lg font-bold text-text-head hover:text-accent transition-colors px-2"
                    >
                      {item}
                    </motion.a>
                  ))}
                  <motion.a
                    href={`${linkPrefix}#contact`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                    className="bg-accent text-text-head px-6 py-3 rounded-full text-sm font-semibold text-center mt-2 border-2 border-text-head shadow-[3px_3px_0px_0px_#141414]"
                  >
                    Solicită o ofertă
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
