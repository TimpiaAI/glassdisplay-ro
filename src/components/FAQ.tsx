import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordReveal } from "./WordReveal";
import { Plus } from "lucide-react";


export function FAQ() {
  const faqs = [
    {
      q: "Cât de transparent este ecranul când e oprit?",
      a: "Aproximativ 90%. Arată ca o folie de protecție ușor fumurie. Când este oprit, clienții pot vedea perfect în interiorul magazinului tău.",
    },
    {
      q: "Se poate instala pe orice tip de geam?",
      a: "Da, pe orice suprafață de sticlă plană și curată. Instalarea se face pe interior, deci ecranul este protejat de intemperii și vandalism.",
    },
    {
      q: "Cât consumă?",
      a: "Consumul mediu este de 250W/m², similar cu un televizor mare. Luminozitatea se ajustează automat în funcție de lumina de afară.",
    },
    {
      q: "Cum schimb conținutul?",
      a: "Prin aplicația noastră de mobil sau din browser. Poți încărca imagini, video-uri, sau poți folosi șabloanele noastre pentru texte și oferte.",
    },
    {
      q: "Se vede bine în bătaia soarelui?",
      a: "Da. Ecranele noastre au o luminozitate de 5000 nits (de 10 ori mai luminoase decât un televizor normal), fiind perfect vizibile chiar și în lumina directă a soarelui.",
    },
    {
      q: "Ce se întâmplă dacă se strică un LED?",
      a: "Folia este modulară. Dacă o secțiune se defectează, o putem înlocui doar pe aceea, fără a schimba întregul ecran. Ai 1 an garanție inclusă.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="pt-44 pb-32 bg-alternate relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] z-[7]">

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Întrebări frecvente." />
          </h2>
        </div>

        <div className="border-t border-border-subtle">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border-subtle">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="text-lg font-medium text-text-head group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="ml-4 shrink-0 text-text-label group-hover:text-accent transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-text-body leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
