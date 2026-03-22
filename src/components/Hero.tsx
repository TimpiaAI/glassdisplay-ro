import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";

export function Hero() {
  return (
    <section className="sticky top-0 h-screen bg-primary flex items-center pt-24 pb-32 overflow-hidden z-0">
      <div className="max-w-[90rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-label">
              Ecrane LED Transparente
            </span>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-text-head leading-[1.1] tracking-tight mb-8">
            <WordReveal text="Vitrina ta. Acum digitală." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-body max-w-lg mb-10 leading-relaxed"
          >
            Se lipește pe geam. Se controlează din telefon. Se vede de pe
            trotuar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-accent text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-[#00e67a] transition-colors glow-accent-hover relative overflow-hidden group">
              <span className="relative z-10">Vezi cum funcționează</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>
            <button className="bg-transparent border border-text-head text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-text-head hover:text-white transition-colors">
              Cere ofertă
            </button>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[60vh] lg:h-[85vh] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white border border-border-subtle rounded-2xl overflow-hidden flex items-center justify-center shadow-sm"
          >
            <div className="text-text-label font-mono text-sm">
              {/* Replace with illustration: storefront with glowing LED screen */}
              [Illustration Placeholder]
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
