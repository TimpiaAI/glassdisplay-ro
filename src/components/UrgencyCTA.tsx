import { motion } from "motion/react";

const words = ["Vitrina", "ta", "pierde", "bani", "chiar", "acum."];

export function UrgencyCTA() {
  return (
    <section className="py-32 md:py-40 bg-text-head relative overflow-hidden z-[7]">
      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div className="flex flex-wrap justify-center gap-x-[0.4em] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: [-1, 1.5, -2, 1, -1.5, 2][i] }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[1.1] block ${
                word === "bani" ? "text-accent" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-3xl font-light text-white/80 italic"
        >
          Hai s-o reparăm.
        </motion.p>
      </div>
    </section>
  );
}
