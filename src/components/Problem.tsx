import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";
import { CountUp } from "./CountUp";


export function Problem() {
  return (
    <section id="problema" className="py-32 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head z-[2]">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: 3.5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative rounded-3xl md:rounded-r-3xl md:rounded-l-none overflow-hidden group aspect-square md:scale-110 origin-center"
        >
          <img
            src="/vitrina.png"
            alt="Afișul tău urât aici"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10 md:pl-16 lg:pl-24">
            <span className="font-mono text-[clamp(3.5rem,7vw,5rem)] font-bold text-accent leading-none mb-2">
              <CountUp to={2847} duration={2.5} />
            </span>
            <span className="font-sans text-sm md:text-base text-white/90 uppercase tracking-widest max-w-[250px]">
              oameni trec zilnic pe lângă o vitrină medie
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card p-8 md:p-12 rounded-3xl border-2 border-text-head shadow-[12px_12px_0px_0px_#00FF88] px-6 md:mr-6 lg:mr-12">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Mii de oameni trec zilnic pe lângă vitrina ta." />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-accent leading-[1.2] mb-8"
          >
            Câți se opresc?
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-body leading-relaxed max-w-lg"
          >
            Posterele statice nu mai funcționează. Oamenii trec pe lângă ele
            fără să le vadă. Vitrina ta e cea mai valoroasă suprafață de
            marketing pe care o deții — și stă degeaba.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
