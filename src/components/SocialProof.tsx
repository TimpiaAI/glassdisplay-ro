import { motion, useScroll, useTransform } from "motion/react";
import { WordReveal } from "./WordReveal";
import { useRef } from "react";

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  return (
    <section className="pt-12 pb-24 px-4 md:px-8 bg-primary relative overflow-hidden text-center rounded-b-[2.5rem] md:rounded-b-[4rem] z-[8]">
      <div className="max-w-6xl mx-auto bg-[#676768] text-white border-2 border-text-head rounded-[2.5rem] md:rounded-[4rem] py-20 px-6 md:px-16 relative" ref={ref}>

        {/* Left stacked photo */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: -10 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:block absolute -left-32 bottom-20 w-64 h-52 rounded-2xl border-2 border-text-head shadow-[6px_6px_0px_0px_#00FF88] overflow-hidden z-20"
        >
          <img src="/product/product-2.webp" alt="LED display" className="w-full h-full object-cover scale-110" />
        </motion.div>

        {/* Right stacked photo */}
        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: 12 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:block absolute -right-32 top-20 w-64 h-52 rounded-2xl border-2 border-text-head shadow-[6px_6px_0px_0px_#00FF88] overflow-hidden z-20"
        >
          <img src="/product/product-1.webp" alt="Flexible LED film" className="w-full h-full object-cover scale-125" />
        </motion.div>

        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] mb-6">
          <WordReveal text="Primele 10 business-uri." className="justify-center" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Primesc <span className="text-accent font-bold">2 luni gratuite</span> de mentenanță și acces complet la platformă. Instalarea este inclusă în preț.
        </motion.p>

        <div className="max-w-md mx-auto mb-6">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent rounded-full"
              style={{ width }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex justify-between items-center text-sm font-mono">
            <span className="text-white font-bold inline-block -rotate-1">7 din 10 locuri rămase</span>
            <span className="text-white/60">30 aprilie 2026</span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-sm mb-10"
        >
          Ofertă valabilă până la 30 aprilie 2026
        </motion.p>

      </div>
    </section>
  );
}
