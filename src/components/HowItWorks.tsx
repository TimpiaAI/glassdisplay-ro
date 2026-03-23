import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WordReveal } from "./WordReveal";

export function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666666%"]);

  const steps = [
    {
      num: "01",
      title: "Măsurăm",
      desc: "Venim la locație, măsurăm vitrina și discutăm ce vrei să afișezi.",
      image: "/step-01.webp",
    },
    {
      num: "02",
      title: "Instalăm",
      desc: "Lipim ecranul pe geam în mai puțin de 2 ore. Fără modificări structurale.",
      image: "/step-02.webp",
    },
    {
      num: "03",
      title: "Controlezi",
      desc: "Schimbi conținutul de pe telefon oricând vrei. Meniu, promoții, program.",
      image: "/step-03.webp",
    },
  ];

  return (
    <section id="cum-funcționează" ref={targetRef} className="relative h-[300vh] bg-[#676768] text-white rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[5] overflow-x-clip">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full mb-12 shrink-0 relative z-10">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] mb-4">
            <WordReveal text="Trei pași. Două ore. O vitrină nouă." />
          </h2>
        </div>

        <motion.div style={{ x }} className="flex w-[300vw] relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="w-[100vw] flex items-center justify-center px-6">
              <div className="max-w-5xl w-full bg-white border-2 border-text-head rounded-[2.5rem] shadow-[8px_8px_0px_0px_#00FF88] p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pb-16 md:pb-16" style={{ transform: `rotate(${[-2.5, 2, -3][i]}deg)` }}>
                <div>
                  <span className="font-mono text-[clamp(3rem,6vw,5rem)] font-bold text-accent leading-none mb-2 md:mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-text-head mb-2 md:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-xl text-text-body leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full h-[25vh] md:h-[40vh] bg-card border-2 border-text-head rounded-3xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(20,20,20,0.2)] relative group hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(20,20,20,0.2)] transition-all duration-300">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden z-10">
          <motion.div 
            className="h-full bg-accent"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
