import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

interface VideoItem {
  src: string;
  poster: string;
  alt: string;
  label?: string;
  logo?: string;
}

const leftColumn: VideoItem[] = [
  { src: "/videos/hologram-display.mp4", poster: "/videos/posters/hologram-display.webp", alt: "Hologramă pe vitrină", label: "Bella Vita Jewelery", logo: "/logos/bellavita.svg" },
  { src: "/videos/split-1.webm", poster: "/videos/posters/split-1.webp", alt: "Display LED transparent", label: "TechHub Coworking", logo: "/logos/techhub.svg" },
  { src: "/videos/aerial-drones.webm", poster: "/videos/posters/aerial-drones.webp", alt: "Drone cu LED", label: "SkyMedia Events", logo: "/logos/skymedia.svg" },
  { src: "/videos/split-4.webm", poster: "/videos/posters/split-4.webp", alt: "Ecran LED", label: "Working Hub București", logo: "/logos/workinghub.svg" },
  { src: "/videos/showcase.mp4", poster: "/videos/posters/showcase.webp", alt: "Showcase display", label: "Galeriile Moderne", logo: "/logos/galerii.svg" },
];

const middleColumn: VideoItem[] = [
  { src: "/videos/mall-fashion.webm", poster: "/videos/posters/mall-fashion.webp", alt: "Fashion display mall", label: "ONLY Fashion", logo: "/logos/onlyfashion.svg" },
  { src: "/videos/flexible-film.webm", poster: "/videos/posters/flexible-film.webp", alt: "Film LED flexibil", label: "AutoVision Showroom", logo: "/logos/autovision.svg" },
];

const rightColumn: VideoItem[] = [
  { src: "/videos/storefront-711.mp4", poster: "/videos/posters/storefront-711.webp", alt: "Vitrină magazin", label: "7-Eleven", logo: "/logos/7eleven.svg" },
  { src: "/videos/shopping-mall-ad.webm", poster: "/videos/posters/shopping-mall-ad.webp", alt: "Reclamă mall", label: "Plaza Mall București", logo: "/logos/plazamall.svg" },
  { src: "/videos/split-3.webm", poster: "/videos/posters/split-3.webp", alt: "Ecran transparent", label: "Optiblu Optica", logo: "/logos/optiblu.svg" },
  { src: "/videos/split-5.webm", poster: "/videos/posters/split-5.webp", alt: "Display LED", label: "RestoCraft Bistro", logo: "/logos/restocraft.svg" },
];

const rotations = [-2, 1.5, -1, 2.5, -1.5, 2];

function VideoCard({ src, poster, alt, label, logo, rotation }: { src: string; poster: string; alt: string; label?: string; logo?: string; rotation: number; [key: string]: unknown }) {
  return (
    <div
      className="w-full rounded-2xl border-2 border-text-head overflow-hidden shadow-[4px_4px_0px_0px_#00FF88] bg-card relative will-change-transform"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-auto block"
        title={alt}
      />
      {label && (
        <span className="absolute bottom-3 left-3 bg-white text-text-head text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-sm border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center gap-1.5">
          <img src={logo} alt="" className="w-4 h-4" />
          {label}
        </span>
      )}
    </div>
  );
}

function BrandCard() {
  return (
    <div
      className="w-full rounded-2xl border-2 border-text-head overflow-hidden shadow-[8px_8px_0px_0px_#00FF88] bg-white p-6 md:p-10 flex flex-col items-center justify-center text-center"
      style={{ transform: "rotate(2deg)" }}
    >
      <img src="/logo.svg" alt="Glass Display" className="w-14 h-14 md:w-20 md:h-20 mb-4 md:mb-6" />
      <div className="flex items-center gap-1.5 mb-3 md:mb-4">
        <span className="font-sans font-light text-xl md:text-3xl tracking-tight text-text-head">Glass</span>
        <span className="font-sans font-bold text-xl md:text-3xl tracking-tight text-text-head">Display</span>
        <span className="text-[0.75em] text-text-body align-super leading-none inline-block rotate-[-8deg]">®</span>
      </div>
      <p className="text-text-body text-xs md:text-sm max-w-[200px] leading-relaxed">
        Vitrine digitale transparente care atrag priviri.
      </p>
    </div>
  );
}

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Disable parallax on mobile for smooth scrolling
  const leftY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-30%"]);
  const middleY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-20%", "10%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["15%", "-25%"]);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-12 bg-alternate overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]"
    >
      {/* Ambient glow — hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="w-full px-[2px] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 items-start">
        {/* Left column — scrolls UP */}
        <motion.div className="flex flex-col gap-3 md:gap-10 will-change-transform" style={{ y: leftY }}>
          {leftColumn.map((vid, i) => (
            <VideoCard key={i} src={vid.src} poster={vid.poster} alt={vid.alt} label={vid.label} logo={vid.logo} rotation={rotations[i % rotations.length]} />
          ))}
        </motion.div>

        {/* Middle column — scrolls DOWN */}
        <motion.div className="flex flex-col gap-3 md:gap-10 will-change-transform" style={{ y: middleY }}>
          <VideoCard src={middleColumn[0].src} poster={middleColumn[0].poster} alt={middleColumn[0].alt} label={middleColumn[0].label} logo={middleColumn[0].logo} rotation={rotations[3]} />
          <BrandCard />
          <VideoCard src={middleColumn[1].src} poster={middleColumn[1].poster} alt={middleColumn[1].alt} label={middleColumn[1].label} logo={middleColumn[1].logo} rotation={rotations[4]} />
        </motion.div>

        {/* Right column — scrolls UP (hidden on mobile) */}
        <motion.div className="hidden md:flex flex-col gap-10 will-change-transform" style={{ y: rightY }}>
          {rightColumn.map((vid, i) => (
            <VideoCard key={i} src={vid.src} poster={vid.poster} alt={vid.alt} label={vid.label} logo={vid.logo} rotation={rotations[(i + 1) % rotations.length]} />
          ))}
        </motion.div>
      </div>

      {/* Fade-out gradients top & bottom */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-alternate to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-alternate to-transparent pointer-events-none z-10" />
    </section>
  );
}
