import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pt-4 md:pt-6">
      <motion.nav
        className={`pointer-events-auto transition-all duration-500 flex items-center justify-between overflow-hidden rounded-full ${
          scrolled
            ? "w-full max-w-4xl bg-white/90 backdrop-blur-2xl border-2 border-text-head shadow-[4px_4px_0px_0px_#141414] py-3 px-6"
            : "w-full max-w-7xl bg-white/10 backdrop-blur-md py-2 px-2"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-1 shrink-0 px-4 md:px-0">
          <span className="font-sans font-light text-xl tracking-tight text-text-head">Glass</span>
          <span className="font-sans font-bold text-xl tracking-tight text-text-head relative">
            D<span className="relative inline-block">i<span className="absolute w-1.5 h-1.5 bg-accent rounded-full top-1 left-[3px]"></span></span>splay
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Soluția", "Cum funcționează", "Prețuri", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-text-body hover:text-text-head transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-text-head scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
            </a>
          ))}
        </div>

        <button className="bg-accent text-text-head px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00e67a] transition-all duration-300 glow-accent-hover relative overflow-hidden group shrink-0">
          <span className="relative z-10">Cere ofertă</span>
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
        </button>
      </motion.nav>
    </div>
  );
}
