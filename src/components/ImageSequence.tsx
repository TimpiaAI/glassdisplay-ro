import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const leftColumn = [
  { src: "/product/product-2.jpg", alt: "Hologramă pe vitrină" },
  { src: "/product/product-4.jpg", alt: "Specificații LED" },
  { src: "/solution-1.png", alt: "Ecran transparent pe clădire" },
  { src: "/product/product-3.jpg", alt: "Flexibil și rezistent" },
  { src: "/step-01.png", alt: "Măsurare vitrină" },
  { src: "/product/product-1.jpg", alt: "Film LED flexibil" },
];

const middleColumn = [
  { src: "/product/product-1.jpg", alt: "Film LED flexibil" },
  { src: "/vitrina.png", alt: "Vitrină clasică" },
  { src: "/product/product-5.jpg", alt: "Ghid instalare" },
  { src: "/solution-2.png", alt: "Film cristal LED" },
  { src: "/product/product-6.jpg", alt: "Instalări globale" },
  { src: "/product/product-2.jpg", alt: "Hologramă pe vitrină" },
];

const rightColumn = [
  { src: "/product/product-6.jpg", alt: "Instalări globale" },
  { src: "/step-02.png", alt: "Instalare ecran" },
  { src: "/product/product-4.jpg", alt: "Specificații LED" },
  { src: "/solution-2.png", alt: "Film cristal LED" },
  { src: "/product/product-3.jpg", alt: "Flexibil și rezistent" },
  { src: "/step-03.png", alt: "Control din telefon" },
];

const rotations = [-2, 1.5, -1, 2.5, -1.5, 2];

function ImageCard({ src, alt, rotation, ...rest }: { src: string; alt: string; rotation: number; [key: string]: unknown }) {
  return (
    <div
      className="w-full rounded-2xl border-2 border-text-head overflow-hidden shadow-[4px_4px_0px_0px_#00FF88] bg-card"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </div>
  );
}

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const middleY = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-alternate overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="w-full px-[2px] grid grid-cols-3 gap-6 md:gap-10 items-start">
        {/* Left column — scrolls UP */}
        <motion.div className="flex flex-col gap-6 md:gap-10" style={{ y: leftY }}>
          {leftColumn.map((img, i) => (
            <ImageCard key={i} src={img.src} alt={img.alt} rotation={rotations[i]} />
          ))}
        </motion.div>

        {/* Middle column — scrolls DOWN */}
        <motion.div className="flex flex-col gap-6 md:gap-10" style={{ y: middleY }}>
          {middleColumn.map((img, i) => (
            <ImageCard key={i} src={img.src} alt={img.alt} rotation={rotations[(i + 3) % rotations.length]} />
          ))}
        </motion.div>

        {/* Right column — scrolls UP */}
        <motion.div className="flex flex-col gap-6 md:gap-10" style={{ y: rightY }}>
          {rightColumn.map((img, i) => (
            <ImageCard key={i} src={img.src} alt={img.alt} rotation={rotations[(i + 1) % rotations.length]} />
          ))}
        </motion.div>
      </div>

      {/* Fade-out gradients top & bottom */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-alternate to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-alternate to-transparent pointer-events-none z-10" />
    </section>
  );
}
