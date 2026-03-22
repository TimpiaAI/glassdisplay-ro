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
      <div className="max-w-5xl mx-auto bg-[#676768] text-white border-2 border-text-head rounded-[2.5rem] md:rounded-[4rem] py-20 px-6 md:px-12 relative" ref={ref}>
        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] mb-12">
          <WordReveal text="Primii 10 clienți primesc instalare gratuită." className="justify-center" />
        </h2>

        <div className="max-w-md mx-auto mb-6">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent rounded-full"
              style={{ width }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex justify-between items-center text-sm font-mono">
            <span className="text-white font-bold">7 din 10 locuri rămase</span>
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

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-accent text-text-head px-10 py-5 rounded-full font-semibold hover:bg-[#00e67a] transition-colors glow-accent-hover relative overflow-hidden group shadow-[4px_4px_0px_0px_#FFFFFF]"
        >
          <span className="relative z-10">Rezervă locul tău</span>
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
        </motion.button>
      </div>
    </section>
  );
}
