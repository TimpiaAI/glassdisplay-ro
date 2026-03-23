import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";

export function Hero() {
  return (
    <section className="relative md:sticky md:top-0 min-h-screen md:h-screen bg-primary flex items-start md:items-center pt-28 md:pt-24 pb-16 md:pb-32 overflow-hidden z-0">
      <div className="max-w-[90rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-label inline-block -rotate-2">
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
            <a href="#contact" className="bg-accent text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-[#00e67a] transition-colors glow-accent-hover relative overflow-hidden group inline-block">
              <span className="relative z-10">Solicită o ofertă</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </a>
            <a href="#cum-funcționează" className="bg-transparent border border-text-head text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-text-head hover:text-white transition-colors inline-block">
              Vezi cum funcționează
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[40vh] md:h-[50vh] lg:h-[70vh] w-full lg:w-[110%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black border-2 border-text-head rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#00FF88]"
          >
            <video
              src="/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
