import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { WordReveal } from "./WordReveal";

function HeroBeforeAfter() {
  const [pos, setPos] = useState(5);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [entryDone, setEntryDone] = useState(false);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<number>();
  const clickAnimRef = useRef<number>();
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const posRef = useRef(5);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPos = (x / rect.width) * 100;
    setPos(newPos);
    posRef.current = newPos;
    if (!hasInteracted) {
      setHasInteracted(true);
      if (idleRef.current) cancelAnimationFrame(idleRef.current);
    }
  }

  function animateTo(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const target = (x / rect.width) * 100;
    const from = posRef.current;
    if (clickAnimRef.current) cancelAnimationFrame(clickAnimRef.current);
    setAnimating(true);
    let start: number | null = null;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 400, 1); // 400ms
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = from + (target - from) * eased;
      setPos(val);
      posRef.current = val;
      if (progress < 1) {
        clickAnimRef.current = requestAnimationFrame(step);
      } else {
        setAnimating(false);
      }
    }
    clickAnimRef.current = requestAnimationFrame(step);
    if (!hasInteracted) {
      setHasInteracted(true);
      if (idleRef.current) cancelAnimationFrame(idleRef.current);
    }
  }

  // Entry animation: slide from 5% to 50%
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start: number | null = null;
      function animate(ts: number) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1000, 1); // 1s duration
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const val = 5 + eased * 30;
        setPos(val);
        posRef.current = val;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setEntryDone(true);
        }
      }
      requestAnimationFrame(animate);
    }, 800); // delay before entry starts
    return () => clearTimeout(timeout);
  }, []);

  // Idle wiggle after entry is done
  useEffect(() => {
    if (!entryDone || hasInteracted) return;
    let start: number | null = null;
    function wiggle(ts: number) {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      const cycle = t % 4;
      if (cycle < 2) {
        const val = 35 + Math.sin(cycle * Math.PI) * 8;
        setPos(val);
        posRef.current = val;
      }
      idleRef.current = requestAnimationFrame(wiggle);
    }
    const timeout = setTimeout(() => {
      idleRef.current = requestAnimationFrame(wiggle);
    }, 500);
    return () => { clearTimeout(timeout); if (idleRef.current) cancelAnimationFrame(idleRef.current); };
  }, [entryDone, hasInteracted]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
      style={{ touchAction: "none" }}
      onMouseDown={(e) => { setDragging(true); movedRef.current = false; startXRef.current = e.clientX; }}
      onMouseMove={(e) => { if (dragging) { movedRef.current = true; if (clickAnimRef.current) { cancelAnimationFrame(clickAnimRef.current); setAnimating(false); } handleMove(e.clientX); } }}
      onMouseUp={(e) => { setDragging(false); if (!movedRef.current) animateTo(e.clientX); }}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => { e.preventDefault(); setDragging(true); movedRef.current = false; startXRef.current = e.touches[0].clientX; }}
      onTouchMove={(e) => { e.preventDefault(); if (dragging) { movedRef.current = true; if (clickAnimRef.current) { cancelAnimationFrame(clickAnimRef.current); setAnimating(false); } handleMove(e.touches[0].clientX); } }}
      onTouchEnd={(e) => { setDragging(false); if (!movedRef.current && e.changedTouches[0]) animateTo(e.changedTouches[0].clientX); }}
    >
      {/* BEFORE — plain storefront (full behind) */}
      <img
        src="/hero-before.webp"
        alt="Vitrină goală"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* AFTER — video clipped from right side */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(${pos}% 0%, 100% 0%, 100% 100%, ${pos}% 100%)` }}
      >
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-2 border-text-head shadow-[3px_3px_0px_0px_#00FF88] flex items-center justify-center">
          <span className="text-text-head text-sm font-bold">&#x2194;</span>
        </div>
        {/* Trage-ma tooltip */}
        {entryDone && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 whitespace-nowrap"
          >
            <span className="bg-white text-text-head text-xs font-bold px-3 py-1.5 rounded-full border-2 border-text-head shadow-[2px_2px_0px_0px_#00FF88]">
              Trage-ma!
            </span>
          </motion.div>
        )}
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-white/90 text-text-head text-xs font-bold px-3 py-1.5 rounded-full border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] z-10">
        Acum
      </span>
      <span className="absolute top-4 right-4 bg-[#00FF88] text-text-head text-xs font-bold px-3 py-1.5 rounded-full border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] z-10">
        Cu Glass Display
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative md:sticky md:top-0 min-h-screen md:h-screen bg-primary flex items-start md:items-center pt-28 md:pt-24 pb-16 md:pb-32 overflow-hidden z-0">
      <div className="max-w-[90rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-label inline-block -rotate-2">
              Ecrane LED Transparente
            </span>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-text-head leading-[1.1] tracking-tight mb-8">
            <WordReveal text="Vitrina ta. Acum digitală." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-body max-w-lg mb-10 leading-relaxed"
          >
            Se lipește pe geam. Se controlează din telefon. Se vede de pe
            trotuar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="bg-accent text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-[#00e67a] transition-colors glow-accent-hover relative overflow-hidden group inline-block">
              <span className="relative z-10">Solicită o ofertă</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </a>
            <a href="#cum-funcționează" className="bg-transparent border border-text-head text-text-head px-8 py-4 rounded-sm font-semibold hover:bg-text-head hover:text-white transition-colors inline-block">
              Vezi cum funcționează
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-7 relative h-[40vh] md:h-[50vh] lg:h-[70vh] w-full lg:w-[110%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black border-2 border-text-head rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_#00FF88]"
          >
            <HeroBeforeAfter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
