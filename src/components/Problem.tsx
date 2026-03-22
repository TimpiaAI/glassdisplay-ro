import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";
import { CountUp } from "./CountUp";

export function Problem() {
  return (
    <section id="problema" className="py-32 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] z-[2]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-card p-8 md:p-12 rounded-3xl border-2 border-text-head shadow-[12px_12px_0px_0px_#00FF88]">
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
        </div>

        <div className="flex flex-col items-start md:items-end justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-3xl overflow-hidden border-2 border-text-head shadow-[12px_12px_0px_0px_#00FF88] group aspect-[4/3] md:aspect-square lg:aspect-[4/3]"
          >
            <img 
              src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80" 
              alt="Afișul tău urât aici" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10">
              <span className="font-mono text-[clamp(3.5rem,7vw,5rem)] font-bold text-accent leading-none mb-2">
                <CountUp to={2847} duration={2.5} />
              </span>
              <span className="font-sans text-sm md:text-base text-white/90 uppercase tracking-widest max-w-[250px]">
                oameni trec zilnic pe lângă o vitrină medie
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
