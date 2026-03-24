import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
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

/* ── Scroll gallery images ─────────────────────────── */
const galleryLeft = [
  { src: "/demo/atlantis/atlantis_01_casa_cu_paine_closeup.webp", alt: "Casa cu Paine — closeup", label: "Casa cu Paine" },
  { src: "/demo/atlantis/atlantis_03_paste_noapte_v2.webp", alt: "Paste seara", label: "Promoție seara" },
  { src: "/demo/atlantis/atlantis_07_fresh_produce_splash_wide.webp", alt: "Fructe proaspete", label: "Produse proaspete" },
  { src: "/demo/atlantis/atlantis_09_vara_inghetata_closeup.webp", alt: "Înghețată de vară", label: "Promo vară" },
];
const galleryMiddle = [
  { src: "/demo/atlantis/atlantis_02_oferte_zilnice_closeup.webp", alt: "Oferte zilnice", label: "Oferte zilnice" },
  { src: "/demo/atlantis/atlantis_08_produse_locale_noapte_wide.webp", alt: "Produse locale — noapte", label: "Produse locale" },
  { src: "/demo/atlantis/atlantis_06_gratar_weekend_closeup.webp", alt: "Grătar weekend", label: "Weekend grătar" },
];
const galleryRight = [
  { src: "/demo/atlantis/atlantis_06_gratar_weekend_noapte_wide.webp", alt: "Grătar weekend — noapte", label: "Seara — grătar" },
  { src: "/demo/atlantis/atlantis_07_fresh_produce_splash_noapte_closeup.webp", alt: "Fructe proaspete — noapte", label: "Noapte — fresh" },
  { src: "/demo/atlantis/atlantis_09_vara_inghetata_noapte_wide.webp", alt: "Înghețată — noapte", label: "Noapte — vară" },
];
const galleryRotations = [-2, 1.5, -1, 2.5, -1.5, 2];

function GalleryCard({ src, alt, label, rotation }: { src: string; alt: string; label: string; rotation: number }) {
  return (
    <div
      className="w-full rounded-2xl border-2 border-text-head overflow-hidden shadow-[4px_4px_0px_0px_#00FF88] bg-card relative"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      <span className="absolute bottom-3 left-3 bg-white text-text-head text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-sm border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center gap-1.5">
        <img src="/demo/atlantis/logo-atlantis.webp" alt="" className="w-4 h-4 rounded-full object-cover" />
        {label}
      </span>
    </div>
  );
}

/* ── Before / After slider ─────────────────────────── */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<number>();

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
    if (!hasInteracted) {
      setHasInteracted(true);
      if (idleRef.current) cancelAnimationFrame(idleRef.current);
    }
  }

  // Idle wiggle: move the whole slider back and forth until user interacts
  useEffect(() => {
    if (hasInteracted) return;
    let start: number | null = null;
    function wiggle(ts: number) {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      const cycle = t % 4;
      if (cycle < 2) {
        setPos(50 + Math.sin(cycle * Math.PI) * 8);
      }
      idleRef.current = requestAnimationFrame(wiggle);
    }
    const timeout = setTimeout(() => {
      idleRef.current = requestAnimationFrame(wiggle);
    }, 1500);
    return () => { clearTimeout(timeout); if (idleRef.current) cancelAnimationFrame(idleRef.current); };
  }, [hasInteracted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[3/4] md:aspect-[1/1] rounded-3xl border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
      onMouseMove={(e) => dragging && handleMove(e.clientX)}
      onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX); }}
      onTouchEnd={() => setDragging(false)}
    >
      {/* BEFORE — plain storefront (left = Acum) */}
      <img
        src="/demo/atlantis/before.webp"
        alt="Atlantis 10 — Acum"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* AFTER — video clipped from right (right = Cu Glass Display) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <video
          src="/demo/atlantis/after.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Straight vertical slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full border-2 border-text-head shadow-[3px_3px_0px_0px_#00FF88] flex items-center justify-center">
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
  {
    icon: Smartphone,
    title: "Control total de pe telefon",
    desc: "Schimbi reclamele de pe telefon. AI-ul sugerează conținut în funcție de ora zilei și tipul de clienți. Se integrează cu sistemele deja folosite — ERP, POS, inventar.",
    color: "bg-[#A78BFA]",
  },
];

/* ── Store locations ─────────────────────────── */
const stores = [
  "Casa Alba", "TQ", "3D", "Dacia", "Denar",
  "20", "10", "Delta", "DOR", "Dacapo",
];

/* ── Scroll gallery section ─────────────────────────── */
function AtlantisGallery() {
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
      id="galerie"
      ref={containerRef}
      className="relative pt-24 pb-12 bg-alternate overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="w-full px-[2px] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 items-start">
        {/* Left column — scrolls UP */}
        <motion.div className="flex flex-col gap-3 md:gap-10" style={{ y: leftY }}>
          {galleryLeft.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[i % galleryRotations.length]} />
          ))}
        </motion.div>

        {/* Middle column — scrolls DOWN */}
        <motion.div className="flex flex-col gap-3 md:gap-10" style={{ y: middleY }}>
          {galleryMiddle.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[(i + 3) % galleryRotations.length]} />
          ))}
        </motion.div>

        {/* Right column — scrolls UP (hidden on mobile) */}
        <motion.div className="hidden md:flex flex-col gap-10" style={{ y: rightY }}>
          {galleryRight.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[(i + 1) % galleryRotations.length]} />
          ))}
        </motion.div>
      </div>

      {/* Fade-out gradients */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-alternate to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-alternate to-transparent pointer-events-none z-10" />
    </section>
  );
}

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
      <Helmet>
        <title>Atlantis 10 — Simulare vitrina digitala | Glass Display</title>
        <meta name="description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />
        <link rel="canonical" href="https://glasspanel.ro/demo/atlantis" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glasspanel.ro/demo/atlantis" />
        <meta property="og:title" content="Atlantis 10 — Simulare vitrina digitala | Glass Display" />
        <meta property="og:description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />
        <meta property="og:image" content="https://glasspanel.ro/demo/atlantis/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Atlantis 10 — Simulare vitrina digitala | Glass Display" />
        <meta name="twitter:description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />
        <meta name="twitter:image" content="https://glasspanel.ro/demo/atlantis/og.jpg" />
      </Helmet>
      <Navbar initialScrolled />

      {/* ═══ HERO ═══ */}
      <section ref={parallaxRef} className="relative min-h-screen bg-primary flex items-center pt-32 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 bg-white border-2 border-text-head rounded-full px-5 py-2.5 mb-6 shadow-[3px_3px_0px_0px_#00FF88]"
            >
              <img src="/demo/atlantis/logo-atlantis.webp" alt="Atlantis" className="w-7 h-7 rounded-full object-cover" />
              <span className="text-text-label text-sm font-medium">x</span>
              <img src="/logo.svg" alt="GlassPanel" className="w-6 h-6" />
              <span className="text-text-head text-sm font-bold">Prezentare exclusiva</span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-text-head leading-[1.05] mb-6">
              <WordReveal text="Asa ar arata vitrinele voastre." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-body max-w-lg leading-relaxed mb-8"
            >
              Simulare pentru magazinul <span className="text-accent font-bold">Atlantis 10</span>, cum ar arata vitrina cu ecran LED transparent lipit direct pe geam.
            </motion.p>

            <motion.a
              href="#galerie"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-[#00FF88] text-text-head px-8 py-4 rounded-full font-bold border-2 border-text-head shadow-[4px_4px_0px_0px_#FFD700] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#FFD700] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#FFD700] transition-all"
            >
              Vezi exemple <ChevronRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Right — before/after comparison */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <BeforeAfter />
          </motion.div>
        </div>
      </section>

      {/* ═══ SCROLL GALLERY ═══ */}
      <AtlantisGallery />

      {/* ═══ CE POȚI AFIȘA ═══ */}
      <section id="ce-afisa" className="pt-12 md:pt-16 pb-20 md:pb-28 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[2]">

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="Puteti programa orice." />
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
                whileInView={{ opacity: 1, y: 0, rotate: [-1.5, 1, -1, 1.5, 0][i] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-card border-2 border-text-head rounded-3xl p-8 shadow-[6px_6px_0px_0px_#00FF88] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#00FF88] transition-all duration-300${i === contentIdeas.length - 1 ? " md:col-span-2" : ""}`}
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
              <WordReveal text="Care sunt pasii urmatori?" />
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
                <div className="w-12 h-12 bg-accent rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center mb-4">
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

      {/* ═══ FOOTER ═══ */}
      <section className="max-w-5xl mx-auto py-20 md:py-28 bg-text-head relative rounded-[2rem] md:rounded-[2.5rem] border-2 border-[#00FF88] mb-24 md:mb-36 z-[5]">
        {/* Corner images */}
        <img
          src="/demo/atlantis/atlantis_07_fresh_produce_splash_wide.webp"
          alt=""
          className="absolute -bottom-8 -left-8 w-36 md:w-52 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#00FF88] object-cover aspect-[3/4]"
          style={{ transform: "rotate(-6deg)" }}
        />
        <img
          src="/demo/atlantis/atlantis_06_gratar_weekend_closeup.webp"
          alt=""
          className="absolute -top-8 -right-8 w-36 md:w-52 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#00FF88] object-cover aspect-[3/4]"
          style={{ transform: "rotate(5deg)" }}
        />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white border-2 border-text-head rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_#00FF88] mb-8">
            <img src="/demo/atlantis/logo-atlantis.webp" alt="Atlantis" className="w-9 h-9 rounded-full object-cover" />
            <span className="text-text-head/30 text-lg font-light">&times;</span>
            <a href="/" className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="GlassPanel" className="w-6 h-6" />
              <span className="font-light text-text-head">Glass</span><span className="font-bold text-text-head">Display</span><span className="text-[0.6em] text-text-body align-super leading-none inline-block rotate-[-8deg]">&reg;</span>
            </a>
          </div>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-3">
            Tot ce ai vazut aici poate fi live pe vitrinele voastre.
          </p>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10">
            Cand sunteti gata, ne ocupam noi de tot — instalare, configurare, continut. Voi doar alegeti ce vreti sa afisati.
          </p>

          <p className="text-white/20 text-xs">
            Pregatit pentru Varodimex SRL
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
