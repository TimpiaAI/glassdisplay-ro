import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";

export function FinalCTA() {
  return (
    <section id="contact" className="pt-16 md:pt-24 pb-20 md:pb-32 bg-primary relative overflow-hidden z-[9]">
      <div className="max-w-[96%] mx-auto bg-text-head text-white rounded-[2rem] md:rounded-[4rem] p-6 md:p-24 relative overflow-hidden shadow-2xl border-2 border-accent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
          <div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-[1.1] mb-6">
              <WordReveal text="Vitrina ta pierde bani chiar acum." />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-accent leading-[1.2] mb-8"
            >
              Hai s-o reparăm.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-5 md:p-12 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_#00FF88] md:shadow-[8px_8px_0px_0px_#00FF88] border-2 border-text-head max-w-md w-full mx-auto"
          >
            <form className="space-y-4">
              {["Nume", "Telefon", "Adresa magazinului"].map((field, i) => (
                <div key={i} className="relative group">
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all"
                    required
                  />
                </div>
              ))}
              <div className="relative group">
                <textarea
                  placeholder="Mesaj (opțional)"
                  rows={3}
                  className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-text-head py-4 rounded-xl border-2 border-text-head font-bold hover:bg-[#00e67a] shadow-[4px_4px_0px_0px_#141414] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#141414] active:translate-y-[4px] active:shadow-none transition-all mt-6"
              >
                Trimite cererea
              </button>
            </form>

            <div className="mt-8 text-center">
              <a
                href="#"
                className="flex flex-col items-center justify-center p-4 bg-white border-2 border-text-head rounded-xl shadow-[4px_4px_0px_0px_#00FF88] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#00FF88] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#00FF88] transition-all group"
              >
                <span className="text-text-body group-hover:text-accent transition-colors inline-flex items-center gap-2 mb-1">
                  Sau scrie-ne pe WhatsApp
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
                <span className="text-text-head font-mono text-xl font-bold">
                  0700 000 000
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
