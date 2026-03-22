import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";
import { CountUp } from "./CountUp";

export function Solution() {
  return (
    <section id="soluția" className="py-32 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[4]">
      {/* Dispersed colors */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Un ecran care nu se vede." className="justify-center" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-light italic text-text-body leading-[1.2]"
          >
            Până îl pornești.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 bg-text-head gap-[2px] border-2 border-text-head rounded-3xl shadow-[8px_8px_0px_0px_#00FF88] mb-24 overflow-hidden">
          {[
            { value: 90, unit: "%", label: "transparență" },
            { value: 2, unit: "mm", label: "grosime" },
            { value: 5000, unit: "nits", label: "luminozitate" },
            { value: 100, unit: "K", label: "ore durată de viață" },
          ].map((stat, i) => (
            <div key={i} className="bg-card">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center p-8 h-full hover:bg-primary transition-colors duration-300"
              >
                <span className="font-mono text-[clamp(2rem,4vw,3rem)] font-semibold text-accent leading-none mb-3 flex items-baseline justify-center gap-1 whitespace-nowrap">
                  <CountUp to={stat.value} duration={2} />
                  <span className="text-[clamp(1.2rem,2vw,1.5rem)]">{stat.unit}</span>
                </span>
                <span className="font-sans text-xs md:text-sm text-text-label uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[40vh] md:h-[60vh] bg-card border-2 border-text-head rounded-3xl flex items-center justify-center shadow-[8px_8px_0px_0px_#00FF88] relative overflow-hidden"
        >
          <div className="text-text-label font-mono text-sm">
            {/* Replace with illustration: transparency explainer (seeing through the panel) */}
            [Illustration Placeholder]
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}
