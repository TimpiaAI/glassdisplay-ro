import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";
import { CountUp } from "./CountUp";


export function Problem() {
  return (
    <section id="problema" className="pt-32 pb-48 md:pb-56 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head z-[2]">


      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
        {/* Main card with everything */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card p-10 md:p-14 rounded-3xl border-2 border-text-head shadow-[12px_12px_0px_0px_#00FF88] text-center max-w-4xl w-full"
        >
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Mii de oameni trec zilnic pe lângă vitrina ta." className="justify-center" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-accent leading-[1.2] mb-6"
          >
            Câți se opresc?
          </motion.p>

          <div className="flex flex-col items-center mb-6">
            <span className="font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold text-accent leading-none mb-2">
              <CountUp to={2847} duration={2.5} />
            </span>
            <span className="font-sans text-xs md:text-sm text-text-body uppercase tracking-widest">
              oameni trec zilnic pe lângă o vitrină medie
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-body leading-relaxed"
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
