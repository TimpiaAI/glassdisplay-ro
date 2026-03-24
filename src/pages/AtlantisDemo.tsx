import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WordReveal } from "../components/WordReveal";
import {
  ShoppingCart,
  Croissant,
  Clock,
  Gift,
  MapPin,
  Smartphone,
  Monitor,
  Sparkles,
  ChevronRight,
  Store,
  BarChart3,
  Calendar,
  Layers,
  TrendingUp,
  Wifi,
  Eye,
  Zap,
  Play,
  Image,
} from "lucide-react";

/* ── Before / After slider ─────────────────────────── */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] md:aspect-[4/3] rounded-3xl border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] overflow-hidden cursor-col-resize select-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseDown={(e) => handleMove(e.clientX)}
    >
      {/* BEFORE — full image behind */}
      <img
        src="/demo/atlantis/storefront-close.webp"
        alt="Atlantis 10 — Înainte"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* AFTER — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src="/demo/atlantis/storefront-close.webp"
          alt="Atlantis 10 — După"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Glass display overlay on the windows */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="w-[70%] mb-[22%] md:mb-[18%] relative">
            {/* Transparent LED screen simulation */}
            <div className="bg-black/30 backdrop-blur-[1px] border border-white/20 rounded-lg p-3 md:p-5 shadow-[0_0_30px_rgba(0,255,136,0.15)]">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 md:w-7 md:h-7 bg-[#FFD700] rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-[6px] md:text-[8px] font-black text-[#003399]">A</span>
                  </div>
                  <span className="text-white text-[8px] md:text-xs font-bold tracking-wider drop-shadow-lg">ATLANTIS 10</span>
                </div>
                <span className="text-[#00FF88] text-[7px] md:text-[10px] font-mono font-bold">LIVE</span>
              </div>
              {/* Promo content */}
              <div className="bg-gradient-to-r from-[#00FF88]/20 to-[#FFD700]/20 rounded-md p-2 md:p-3 border border-white/10 mb-2">
                <p className="text-white text-[8px] md:text-sm font-bold leading-tight drop-shadow-lg">
                  Oferta zilei
                </p>
                <p className="text-[#00FF88] text-[10px] md:text-lg font-black leading-tight drop-shadow-lg">
                  -30% Produse Casa cu Paine
                </p>
                <p className="text-white/80 text-[6px] md:text-[10px] font-medium">
                  Pita din Ardeal + Cozonac traditional
                </p>
              </div>
              {/* Bottom info */}
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-[6px] md:text-[9px] font-mono">Program: 07:00 — 22:00</span>
                <span className="text-[#00FF88] text-[6px] md:text-[9px] font-bold">glasspanel.ro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-2 border-text-head shadow-[3px_3px_0px_0px_#00FF88] flex items-center justify-center">
          <span className="text-text-head text-sm font-bold">&#x2194;</span>
        </div>
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

/* ── Content ideas cards ─────────────────────────── */
const contentIdeas = [
  {
    icon: ShoppingCart,
    title: "Oferte zilnice",
    desc: "Promoții care se schimbă automat. Clienții văd oferta de azi direct de pe trotuar.",
    color: "bg-[#00FF88]",
  },
  {
    icon: Croissant,
    title: "Casa cu Paine",
    desc: "Pita din Ardeal, cozonaci, cornuri cu vanilie — afișate cu poze apetisante, live.",
    color: "bg-[#FFD700]",
  },
  {
    icon: Gift,
    title: "Promoții sezoniere",
    desc: "Crăciun, Paște, Back to School. Schimbi tema în 2 minute, de pe telefon.",
    color: "bg-[#FF6B6B]",
  },
  {
    icon: Clock,
    title: "Program & info",
    desc: "Program, produse noi, evenimente. Informația potrivită la momentul potrivit.",
    color: "bg-[#6B9FFF]",
  },
];

/* ── Store locations ─────────────────────────── */
const stores = [
  "Casa Alba", "TQ", "3D", "Dacia", "Denar",
  "20", "10", "Delta", "DOR", "Dacapo",
];

/* ── Main page ─────────────────────────── */
export function AtlantisDemo() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Navbar initialScrolled />

      {/* ═══ HERO ═══ */}
      <section ref={parallaxRef} className="relative min-h-screen bg-primary flex items-center pt-28 md:pt-0 pb-16 md:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-text-head border-2 border-text-head rounded-full px-4 py-2 mb-6 shadow-[3px_3px_0px_0px_#00FF88]"
            >
              <div className="w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-black text-[#003399]">A</span>
              </div>
              <span className="text-white text-sm font-medium">Prezentare exclusiva pentru Atlantis</span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-text-head leading-[1.05] mb-6">
              <WordReveal text="Atlantis, reimaginat digital." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-body max-w-lg leading-relaxed mb-8"
            >
              Cum ar arata vitrinele celor <span className="text-accent font-bold">10 magazine Atlantis</span> cu ecrane LED transparente care atrag clienti de pe trotuar.
            </motion.p>

            <motion.a
              href="#demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-[#00FF88] text-text-head px-8 py-4 rounded-full font-bold border-2 border-text-head shadow-[4px_4px_0px_0px_#FFD700] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#FFD700] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#FFD700] transition-all"
            >
              Vezi simularea <ChevronRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Right — storefront image */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl md:rounded-[2.5rem] border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] md:shadow-[12px_12px_0px_0px_#00FF88] overflow-hidden">
              <img
                src="/demo/atlantis/storefront-wide.webp"
                alt="Magazin Atlantis 10 — Varodimex SRL"
                className="w-full h-auto block"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-text-head/80 to-transparent pointer-events-none" />
              {/* Bottom info */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                <span className="text-white font-bold text-lg md:text-xl block drop-shadow-lg">Atlantis 10</span>
                <span className="text-white/70 text-sm drop-shadow-lg">SC Varodimex SRL — Bistrita</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BEFORE / AFTER ═══ */}
      <section id="demo" className="py-20 md:py-32 bg-primary relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="Trage sa vezi diferenta." className="justify-center" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-text-body max-w-xl mx-auto"
            >
              Aceeasi vitrina. Dar cu un ecran transparent care afiseaza promotii, produse si informatii — fara sa blocheze vizibilitatea in magazin.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <BeforeAfter />
          </motion.div>
        </div>
      </section>

      {/* ═══ CE POȚI AFIȘA ═══ */}
      <section className="py-20 md:py-32 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[2]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#FFD700]/8 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="Ce ar afisa Atlantis?" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-text-body max-w-xl"
            >
              Continut care se schimba automat, programat sau manual — de pe telefon, pentru toate cele 10 magazine.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentIdeas.map((idea, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-1.5, 1, -1, 1.5][i] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border-2 border-text-head rounded-3xl p-8 shadow-[6px_6px_0px_0px_#00FF88] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#00FF88] transition-all duration-300"
              >
                <div className={`w-12 h-12 ${idea.color} rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center mb-4`}>
                  <idea.icon className="w-6 h-6 text-text-head" />
                </div>
                <h3 className="text-xl font-bold text-text-head mb-2">{idea.title}</h3>
                <p className="text-text-body leading-relaxed">{idea.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUM FUNCȚIONEAZĂ ═══ */}
      <section className="py-20 md:py-32 bg-[#676768] text-white relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] mb-4">
              <WordReveal text="Trei pasi. Doua ore. Gata." />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Masuram",
                desc: "Venim la magazinul Atlantis, masuram vitrinele si stabilim pozitionarea optima.",
                icon: MapPin,
              },
              {
                num: "02",
                title: "Instalam",
                desc: "Lipim ecranul LED transparent pe geam in mai putin de 2 ore. Fara modificari structurale.",
                icon: Monitor,
              },
              {
                num: "03",
                title: "Controlezi",
                desc: "Schimbi continutul pentru toate cele 10 magazine de pe telefon. Oferte, program, promotii.",
                icon: Smartphone,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border-2 border-text-head rounded-[2rem] shadow-[6px_6px_0px_0px_#00FF88] p-8"
              >
                <span className="font-mono text-5xl font-bold text-[#00FF88] leading-none mb-4 block">
                  {step.num}
                </span>
                <div className="w-12 h-12 bg-[#FFD700] rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-text-head" />
                </div>
                <h3 className="text-2xl font-bold text-text-head mb-2">{step.title}</h3>
                <p className="text-text-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10 MAGAZINE, O PLATFORMA ═══ */}
      <section className="py-20 md:py-32 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="10 magazine. O singura platforma." className="justify-center" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-text-body max-w-2xl mx-auto"
            >
              Schimbi oferta la toate magazinele simultan sau personalizezi fiecare locatie individual. Totul de pe un singur telefon.
            </motion.p>
          </div>

          {/* Full Atlantis Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white border-2 border-text-head rounded-2xl md:rounded-3xl shadow-[8px_8px_0px_0px_#00FF88] md:shadow-[12px_12px_0px_0px_#00FF88] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-3 px-4 md:px-6 py-3 bg-white border-b-2 border-text-head">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-alternate border-2 border-text-head rounded-md px-4 py-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs text-text-body font-mono">glasspanel.ro/dashboard/atlantis</span>
                  </div>
                </div>
                <div className="w-12" />
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-12 md:w-14 bg-white border-r-2 border-text-head py-4 flex flex-col items-center gap-3 shrink-0">
                  {[Monitor, BarChart3, Sparkles, Calendar, Layers, Store].map((Icon, i) => (
                    <div key={i} className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center border-2 ${i === 0 ? 'bg-[#FFD700] border-text-head shadow-[1px_1px_0px_0px_#141414]' : 'border-transparent'}`}>
                      <Icon className={`w-4 h-4 ${i === 0 ? 'text-text-head' : 'text-text-label'}`} />
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 md:p-6 bg-alternate min-h-[400px] md:min-h-[500px]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                      <p className="text-[10px] md:text-xs text-text-label uppercase tracking-wider font-bold">Dashboard</p>
                      <p className="text-sm md:text-lg font-bold text-text-head">Bun venit, Darius</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-accent/10 border border-accent rounded-md px-2 md:px-3 py-1">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[9px] md:text-xs text-text-head font-bold font-mono">10 ecrane online</span>
                      </div>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
                    {[
                      { icon: Store, label: "Magazine", value: "10", trend: "", accent: "bg-[#FFD700]" },
                      { icon: Eye, label: "Impresii azi", value: "8.2K", trend: "+18%", accent: "bg-blue-500" },
                      { icon: Clock, label: "Uptime", value: "99.9%", trend: "", accent: "bg-emerald-500" },
                      { icon: Zap, label: "Opriri azi", value: "247", trend: "+32%", accent: "bg-accent" },
                    ].map(({ icon: Icon, label, value, trend, accent }) => (
                      <div key={label} className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center mb-1.5 ${accent}`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <p className="text-[8px] md:text-[9px] text-text-label uppercase tracking-wider font-bold">{label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-sm md:text-lg font-bold text-text-head font-mono">{value}</p>
                          {trend && <span className="text-[8px] md:text-[10px] text-accent font-bold">{trend}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart + Stores list */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                    {/* Chart */}
                    <div className="md:col-span-2 bg-white border-2 border-text-head rounded-lg p-3 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <span className="text-[9px] md:text-xs font-bold text-text-head uppercase tracking-wider">Impresii / Locatie</span>
                        <div className="flex items-center gap-1 bg-accent/10 border border-accent rounded-md px-2 py-0.5">
                          <TrendingUp className="w-3 h-3 text-accent" />
                          <span className="text-[8px] md:text-[10px] text-text-head font-bold">+24%</span>
                        </div>
                      </div>
                      <svg viewBox="0 0 300 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="atlantisGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Bars for each store */}
                        {[65, 82, 45, 78, 55, 90, 72, 60, 88, 50].map((v, i) => (
                          <g key={i}>
                            <rect x={i * 30 + 2} y={80 - v * 0.8} width="22" height={v * 0.8} rx="3" fill={i === 5 ? "#00FF88" : "#FFD700"} opacity={0.8} />
                          </g>
                        ))}
                      </svg>
                      <div className="flex justify-between mt-1">
                        {stores.map(s => (
                          <span key={s} className="text-[5px] md:text-[7px] text-text-label font-mono">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Active stores */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Wifi className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head uppercase tracking-wider">Ecrane active</span>
                      </div>
                      <div className="space-y-1.5">
                        {stores.map((s) => (
                          <div key={s} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-[8px] md:text-[10px] text-text-body font-mono flex-1 truncate">Atlantis {s}</span>
                            <span className="text-[7px] md:text-[9px] text-accent font-bold">ON</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* AI Generator */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head">AI Generator</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="aspect-square bg-[#FFD700]/10 border-2 border-[#FFD700]/30 rounded-md flex items-center justify-center">
                          <Image className="w-4 h-4 text-[#FFD700]/60" />
                        </div>
                        <div className="aspect-square bg-alternate border-2 border-border-subtle rounded-md flex items-center justify-center">
                          <Image className="w-4 h-4 text-text-label" />
                        </div>
                      </div>
                    </div>

                    {/* Current playlist */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Layers className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head">Playlist activ</span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { name: "oferta-zilei.jpg", active: true, type: "img" },
                          { name: "casa-cu-paine.mp4", active: false, type: "vid" },
                          { name: "promo-weekend.jpg", active: false, type: "img" },
                        ].map((item) => (
                          <div key={item.name} className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md ${item.active ? 'bg-[#FFD700]/10 border border-[#FFD700]/30' : ''}`}>
                            {item.type === 'vid' ? (
                              <Play className={`w-2.5 h-2.5 ${item.active ? 'text-[#FFD700]' : 'text-text-label'}`} />
                            ) : (
                              <Image className={`w-2.5 h-2.5 ${item.active ? 'text-[#FFD700]' : 'text-text-label'}`} />
                            )}
                            <span className={`text-[7px] md:text-[9px] font-mono truncate ${item.active ? 'text-text-head font-bold' : 'text-text-label'}`}>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head">Programare</span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { time: "07:00", content: "Oferte dimineata" },
                          { time: "12:00", content: "Meniu pranz" },
                          { time: "17:00", content: "Promo seara" },
                        ].map((slot) => (
                          <div key={slot.time} className="flex items-center gap-2 bg-alternate rounded-md px-2 py-1">
                            <span className="text-[8px] md:text-[10px] font-mono font-bold text-text-head">{slot.time}</span>
                            <span className="text-[7px] md:text-[9px] text-text-body truncate">{slot.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-32 bg-text-head relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-[#00FF88] -mt-12 z-[5]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFD700]/10 blur-[150px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
              <span className="text-[8px] font-black text-[#003399]">A</span>
            </div>
            <span className="text-white/90 text-sm font-medium">Atlantis x GlassPanel</span>
          </motion.div>

          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[1.1] mb-6">
            <WordReveal text="Hai sa discutam." className="justify-center" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Putem incepe cu un singur magazin pilot si scala la toate cele 10 locatii. Fara angajament pe termen lung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/40787578482?text=Bun%C4%83!%20Am%20v%C4%83zut%20prezentarea%20pentru%20Atlantis%20%C8%99i%20vreau%20s%C4%83%20discut%C4%83m."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold border-2 border-text-head shadow-[4px_4px_0px_0px_#141414] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#141414] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#141414] transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Scrie-ne pe WhatsApp
            </a>

            <a
              href="mailto:hello@timpia.ai?subject=Atlantis%20x%20GlassPanel&body=Bun%C4%83!%20Am%20v%C4%83zut%20prezentarea%20%C8%99i%20vreau%20s%C4%83%20discut%C4%83m."
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold border-2 border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all"
            >
              Trimite un email
            </a>
          </motion.div>

          <p className="text-white/40 text-sm mt-8">
            Prezentare pregatita de <a href="/" className="text-[#00FF88] hover:underline">GlassPanel.ro</a> pentru Varodimex SRL
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
