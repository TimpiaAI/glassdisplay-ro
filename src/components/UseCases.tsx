import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";

export function UseCases() {
  const cases = [
    {
      title: "Restaurante & Cafenele",
      desc: "Meniul zilei direct pe geam. Schimbă-l din telefon.",
      colSpan: "md:col-span-7",
    },
    {
      title: "Magazine & Retail",
      desc: "Promoții care se văd de pe trotuar.",
      colSpan: "md:col-span-5",
    },
    {
      title: "Saloane & Clinici",
      desc: "Portofoliu vizual fără print.",
      colSpan: "md:col-span-5",
    },
    {
      title: "Birouri & Coworking",
      desc: "Branding și informații la intrare.",
      colSpan: "md:col-span-7",
    },
  ];

  return (
    <section id="utilizări" className="py-32 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Pentru cine?" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-card border-2 border-text-head rounded-3xl p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_#00FF88] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#00FF88] transition-all duration-300 group ${c.colSpan}`}
            >
              <div className="w-full h-48 bg-primary rounded-xl mb-8 flex items-center justify-center border border-border-subtle overflow-hidden relative">
                <div className="text-text-label font-mono text-xs">
                  {/* Replace with illustration: {c.title} */}
                  [Illustration Placeholder]
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-head mb-2 group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                <p className="text-text-body leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
