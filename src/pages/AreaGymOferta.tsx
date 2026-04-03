import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WordReveal } from "../components/WordReveal";
import { CountUp } from "../components/CountUp";
import {
  MapPin,
  Eye,
  Zap,
  Shield,
  Clock,
  Check,
  ChevronRight,
  Star,
  TrendingUp,
  Coffee,
  Dumbbell,
  Users,
  ArrowRight,
  Sparkles,
  Monitor,
  Wrench,
  Palette,
  Headphones,
  Ruler,
  Package,
  Trophy,
  Target,
  AlertTriangle,
  Maximize,
  Truck,
  FileText,
  Grid3x3,
} from "lucide-react";

/* ── ease shorthand ─────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Hero cards ─────────────────────────── */

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
      className={`relative w-full aspect-[9/16] max-h-[90vh] rounded-3xl border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
      style={{ touchAction: "none" }}
      onMouseMove={(e) => dragging && handleMove(e.clientX)}
      onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => { e.preventDefault(); handleMove(e.touches[0].clientX); }}
      onTouchStart={(e) => { e.preventDefault(); setDragging(true); handleMove(e.touches[0].clientX); }}
      onTouchEnd={() => setDragging(false)}
    >
      <video
        src="/demo/areagym/after.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src="/demo/areagym/before.webp"
          alt="Area Gym — Acum"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full border-2 border-text-head shadow-[3px_3px_0px_0px_#00FF88] flex items-center justify-center">
          <span className="text-text-head text-sm font-bold">&#x2194;</span>
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-white/90 text-text-head text-xs font-bold px-3 py-1.5 rounded-full border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] z-10">
        Acum
      </span>
      <span className="absolute top-4 right-4 bg-[#00FF88] text-text-head text-xs font-bold px-3 py-1.5 rounded-full border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] z-10">
        Cu Glass Display
      </span>
    </div>
  );
}

/* ── Main page ─────────────────────────── */
export function AreaGymOferta() {
  useEffect(() => {
    const key = "areagym-oferta-visit-tracked";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/demo/areagym/oferta" }),
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Area Gym Brașov — Ofertă personalizată | Glass Display</title>
        <meta name="description" content="Ofertă personalizată pentru Area Gym Brașov. Ecrane LED transparente pentru vitrinele alese." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Area Gym Brașov — Ofertă personalizată | Glass Display" />
        <meta property="og:description" content="Ofertă personalizată pentru Area Gym Brașov. Ecrane LED transparente pentru vitrinele alese." />
        <meta property="og:image" content="https://glasspanel.ro/demo/areagym/oferta/og-oferta.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar initialScrolled />

      {/* ═══════════════════════════════════════════════════
          HERO — Personalized, confident, premium
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] bg-primary flex items-center pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00FF88]/5 blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 bg-white border-2 border-text-head rounded-full px-5 py-2.5 mb-8 shadow-[3px_3px_0px_0px_#00FF88]"
          >
            <img src="/demo/areagym/logo-areagym.png" alt="Area Gym" className="w-7 h-7 rounded-full object-cover" />
            <span className="text-text-label text-sm font-medium">×</span>
            <img src="/logo.svg" alt="Glass Display" className="w-6 h-6" />
            <span className="text-text-head text-sm font-bold">Ofertă personalizată</span>
          </motion.div>

          <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-text-head leading-[1.08] mb-6 max-w-3xl">
            <WordReveal text="Vitrinele pe care le-ai ales," />
            <br />
            <span className="text-[#00FF88]"><WordReveal text="gata de acțiune." delay={0.4} /></span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="text-lg md:text-xl text-text-body max-w-2xl leading-relaxed mb-10"
          >
            Ai văzut cum arată. Acum să vorbim despre <span className="text-text-head font-bold">cât costă</span>, de ce
            merită, și cum se plătește singură investiția.
          </motion.p>

          {/* Two chosen location previews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="grid grid-cols-1 gap-5 max-w-3xl md:grid-cols-2"
          >
            <div className="relative rounded-2xl border-2 border-text-head overflow-hidden shadow-[4px_4px_0px_0px_#00FF88] bg-card" style={{ transform: "rotate(-1.5deg)" }}>
              <video src="/demo/areagym/areagym-front-point.mp4" autoPlay loop muted playsInline className="w-full aspect-[4/3] object-cover" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-white/90 backdrop-blur-sm border-2 border-text-head rounded-lg px-3 py-1.5 shadow-[2px_2px_0px_0px_#141414] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#00FF88] shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold text-text-head">Vitrina intrare</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl border-2 border-text-head overflow-hidden shadow-[4px_4px_0px_0px_#FFD700] bg-card" style={{ transform: "rotate(1.5deg)" }}>
              <video src="/demo/areagym/areagym-terrace-v6.mp4" autoPlay loop muted playsInline className="w-full aspect-[4/3] object-cover" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-white/90 backdrop-blur-sm border-2 border-text-head rounded-lg px-3 py-1.5 shadow-[2px_2px_0px_0px_#141414] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#FFD700] shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold text-text-head">Panouri balcon</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COMPETITIVE URGENCY — Dark section, aggressive
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#111111] relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[2]">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00FF88]/5 blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-bold">De ce contează acum</span>
          </motion.div>

          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.15] mb-8 max-w-2xl">
            <WordReveal text="Fiecare persoană care urcă la etajul 3 trece pe lângă vitrina ta." />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="space-y-6"
            >
              <p className="text-white/70 text-lg leading-relaxed">
                Liftul urcă de la etajul 2 direct la etajul 3 — acolo unde e <span className="text-white font-bold">competiția directă</span>.
                Ei deja au pus reclame agresive pe mall. Fiecare client care urcă cu liftul
                vede geamul tău <span className="text-white/40">gol</span> — și ajunge sus, unde e bombardat cu reclamele lor.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Vitrina ta e fix lângă lift. E <span className="text-[#00FF88] font-bold">prima și ultima</span> chestie pe care o vede
                oricine urcă sau coboară. Nu trebuie să o cauți — e imposibil de ignorat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="space-y-4"
            >
              {[
                { icon: Eye, text: "Vizibilitate directă din lift — zero efort", color: "bg-[#00FF88]" },
                { icon: Target, text: "Publicul competitorului trece pe lângă tine zilnic", color: "bg-[#FFD700]" },
                { icon: TrendingUp, text: "Panourile de la balcon — vizibile din stradă, de jos", color: "bg-[#00C9FF]" },
                { icon: Zap, text: "O investiție. Zero costuri lunare. 10+ ani.", color: "bg-[#A78BFA]" },
              ].map(({ icon: Icon, text, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                >
                  <div className={`w-10 h-10 ${color} rounded-lg border-2 border-white/20 flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LOCATIONS — Detailed breakdown of each spot
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 md:mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.15] mb-4">
              <WordReveal text="2 vitrine. 2 audiențe diferite." />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="text-lg text-text-body max-w-2xl"
            >
              Fiecare locație are un rol strategic. Împreună, acoperă 100% din traficul din zona sălii.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Location 1 — Entrance P6 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease }}
              className="bg-card border-2 border-text-head rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#00FF88]"
            >
              <div className="relative">
                <video src="/demo/areagym/areagym-front-point.mp4" autoPlay loop muted playsInline className="w-full aspect-[16/10] object-cover" />
                <div className="absolute top-3 left-3 bg-[#00FF88] border-2 border-text-head rounded-full px-3 py-1 shadow-[2px_2px_0px_0px_#141414]">
                  <span className="text-xs font-bold text-text-head flex items-center gap-1"><Star className="w-3 h-3" /> Preferata ta</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-text-head mb-2">Vitrina de la intrare</h3>
                <p className="text-sm text-text-label font-mono mb-4">Etaj 2 — interior, vizibilă din lift</p>
                <p className="text-text-body leading-relaxed mb-6">
                  Prima chestie pe care o vede oricine iese din lift. Ecran LED cu rezoluție mare,
                  perfect pentru conținut detaliat — oferte, antrenori, clase, video.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Pixel Pitch", value: "8mm" },
                    { label: "Transparență", value: "≥85%" },
                    { label: "Luminozitate", value: "4,000 cd/m²" },
                    { label: "Refresh Rate", value: "3,840 Hz" },
                    { label: "Cabinet", value: "240×1200mm" },
                    { label: "Greutate", value: "3.5 kg/m²" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-alternate rounded-lg px-3 py-2.5 border border-border-subtle">
                      <p className="text-[9px] text-text-label uppercase tracking-wider font-bold">{label}</p>
                      <p className="text-sm font-bold text-text-head font-mono">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Location 2 — Balcony P16 */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="bg-card border-2 border-text-head rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#FFD700]"
            >
              <div className="relative">
                <video src="/demo/areagym/areagym-terrace-v6.mp4" autoPlay loop muted playsInline className="w-full aspect-[16/10] object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-text-head mb-2">Panourile de la balcon</h3>
                <p className="text-sm text-text-label font-mono mb-4">Etaj 2 — exterior, vizibile de la stradă</p>
                <p className="text-text-body leading-relaxed mb-6">
                  Două panouri pe geamurile de la etajul 2, vizibile direct de jos — de pe stradă, din parcare, de la intrarea în mall.
                  Ideal pentru text mare și branding de impact.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Pixel Pitch", value: "16mm" },
                    { label: "Transparență", value: "≥85%" },
                    { label: "Luminozitate", value: "3,000 cd/m²" },
                    { label: "Refresh Rate", value: "3,840 Hz" },
                    { label: "Cabinet", value: "240×1000mm" },
                    { label: "Greutate", value: "3.3 kg/m²" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-alternate rounded-lg px-3 py-2.5 border border-border-subtle">
                      <p className="text-[9px] text-text-label uppercase tracking-wider font-bold">{label}</p>
                      <p className="text-sm font-bold text-text-head font-mono">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TECHNICAL — "Pregătit la milimetru"
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 bg-[#111111] relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[4]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00FF88]/3 blur-[200px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-4 py-2 mb-8"
          >
            <Ruler className="w-4 h-4 text-[#00FF88]" />
            <span className="text-[#00FF88] text-sm font-bold">Pregătit la milimetru</span>
          </motion.div>

          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.15] mb-4 max-w-2xl">
            <WordReveal text="Am făcut calculele. Dimensiunile sunt exacte." />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease }}
            className="text-lg text-white/60 max-w-2xl mb-12"
          >
            Fiecare panou e dimensionat pe geamurile voastre. Simulări reale, specificații de fabrică, ambalaj profesional.
          </motion.p>

          {/* Dimension simulations — full width each */}
          <div className="space-y-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#00FF88] rounded-lg flex items-center justify-center">
                    <Maximize className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">Simulare dimensiuni — Vitrina intrare</span>
                </div>
                <span className="text-white/40 text-xs font-mono hidden md:block">7 × 240mm = 1,680mm lățime · 2 × 1,200mm = 2,400mm înălțime</span>
              </div>
              <div className="p-3 bg-white/[0.02]">
                <img src="/demo/areagym/oferta/dimensiuni-intrare.png" alt="Simulare dimensiuni vitrina intrare" className="w-full rounded-lg border border-white/10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <Maximize className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">Simulare dimensiuni — Panouri balcon</span>
                </div>
                <span className="text-white/40 text-xs font-mono hidden md:block">20 panouri × 240mm · 1,000mm înălțime · 2 secțiuni</span>
              </div>
              <div className="p-3 bg-white/[0.02]">
                <img src="/demo/areagym/oferta/dimensiuni-balcon.png" alt="Simulare dimensiuni panouri balcon" className="w-full rounded-lg border border-white/10" />
              </div>
            </motion.div>
          </div>

          {/* Tech specs — 2 columns, bigger images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* P6 Spec Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00FF88]" />
                <span className="text-white font-bold text-sm">Fișă tehnică — Vitrina intrare</span>
              </div>
              <div className="p-4">
                <img
                  src="/demo/areagym/oferta/p6-specs.png"
                  alt="Specificații tehnice vitrina intrare"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { l: "Durată viață", v: "100,000h" },
                    { l: "Consum mediu", v: "280W/m²" },
                    { l: "IP Grade", v: "IP31" },
                    { l: "Unghi vizual", v: "120°×120°" },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/5 rounded-lg px-3 py-2">
                      <p className="text-[9px] text-white/30 uppercase tracking-wider font-bold">{l}</p>
                      <p className="text-xs font-bold text-white/80 font-mono">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* P16 Spec Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FFD700]" />
                <span className="text-white font-bold text-sm">Fișă tehnică — Panouri balcon</span>
              </div>
              <div className="p-4">
                <img
                  src="/demo/areagym/oferta/p16-specs.png"
                  alt="Specificații tehnice panouri balcon"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { l: "Durată viață", v: "100,000h" },
                    { l: "Consum mediu", v: "280W/m²" },
                    { l: "IP Grade", v: "IP31" },
                    { l: "Transparență", v: "≥85%" },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/5 rounded-lg px-3 py-2">
                      <p className="text-[9px] text-white/30 uppercase tracking-wider font-bold">{l}</p>
                      <p className="text-xs font-bold text-white/80 font-mono">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical drawing */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <Grid3x3 className="w-4 h-4 text-[#00FF88]" />
                <span className="text-white font-bold text-sm">Desen tehnic — modul individual</span>
              </div>
              <div className="p-4">
                <img
                  src="/demo/areagym/oferta/p6-drawing.png"
                  alt="Desen tehnic modul"
                  className="w-full rounded-xl bg-white"
                />
              </div>
              <div className="px-5 pb-5">
                <p className="text-sm text-white/50 leading-relaxed">
                  Fiecare modul are 240mm lățime × 1,000mm înălțime, cu driver integrat și carcasă din aluminiu de doar 32mm grosime.
                  Se montează direct pe geam cu adeziv special — fără perforări, fără daune pe suprafață.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ROI — "Matematica e simplă"
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 md:mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.15] mb-4">
              <WordReveal text="Matematica e simplă." />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="text-lg text-text-body max-w-2xl"
            >
              Asta nu e o cheltuială. E singura formă de publicitate pe care o cumperi <span className="text-text-head font-bold">o singură dată</span> și
              funcționează ani de zile fără costuri lunare.
            </motion.p>
          </div>

          {/* Big number cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
            {[
              { value: 10, suffix: "+ ani", label: "Durată de viață", sublabel: "100,000 ore de funcționare", icon: Clock, color: "bg-[#00FF88]" },
              { value: 3, suffix: ".70€", label: "Cost pe zi", sublabel: "pentru ambele vitrine", icon: Coffee, color: "bg-[#FFD700]" },
              { value: 0, suffix: "€", label: "Costuri lunare", sublabel: "zero, nada, nimic", icon: Shield, color: "bg-[#00C9FF]" },
              { value: 112, suffix: "€/lună", label: "Echivalent lunar", sublabel: "mai puțin de 3 abonamente", icon: Dumbbell, color: "bg-[#A78BFA]" },
            ].map(({ value, suffix, label, sublabel, icon: Icon, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-1.5, 1, -1, 1.5][i] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="bg-card border-2 border-text-head rounded-2xl p-4 md:p-6 shadow-[4px_4px_0px_0px_#00FF88]"
              >
                <div className={`w-10 h-10 ${color} rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-baseline gap-0.5 mb-1">
                  {value > 0 ? (
                    <>
                      <span className="text-2xl md:text-3xl font-bold text-text-head font-mono"><CountUp to={value} duration={1.5} /></span>
                      <span className="text-sm md:text-base font-bold text-text-head">{suffix}</span>
                    </>
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-[#00FF88] font-mono">0€</span>
                  )}
                </div>
                <p className="text-xs font-bold text-text-head">{label}</p>
                <p className="text-[10px] text-text-label mt-0.5">{sublabel}</p>
              </motion.div>
            ))}
          </div>

          {/* Comparison with traditional advertising */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease }}
            className="bg-card border-2 border-text-head rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_#00FF88]"
          >
            <h3 className="text-xl md:text-2xl font-bold text-text-head mb-2">
              Cât costă alternativele?
            </h3>
            <p className="text-text-body mb-8">Costul pe 10 ani — cât durează un ecran Glass Display.</p>

            <div className="space-y-4">
              {[
                { name: "Reclame Facebook / Instagram", monthly: "300-500€", total: "36,000-60,000€", width: "85%" },
                { name: "Banner pe mall (ca vecinii de sus)", monthly: "500-1,000€", total: "60,000-120,000€", width: "100%" },
                { name: "Google Ads local", monthly: "400-800€", total: "48,000-96,000€", width: "92%" },
                { name: "Flyere + print lunar", monthly: "200-400€", total: "24,000-48,000€", width: "55%" },
              ].map(({ name, monthly, total, width }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-text-body">{name}</span>
                    <span className="text-xs text-text-label font-mono">{monthly}/lună</span>
                  </div>
                  <div className="relative h-8 bg-alternate rounded-lg border border-border-subtle overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
                      className="absolute inset-y-0 left-0 bg-red-100 border-r-2 border-red-300 rounded-lg flex items-center justify-end pr-3"
                    >
                      <span className="text-xs font-bold text-red-500 font-mono whitespace-nowrap">{total}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Glass Display bar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease }}
                className="mt-6 pt-6 border-t-2 border-text-head"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-text-head flex items-center gap-2">
                    <img src="/logo.svg" alt="" className="w-4 h-4" />
                    Glass Display
                  </span>
                  <span className="text-xs text-[#00FF88] font-bold font-mono">plată unică</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 bg-alternate rounded-lg border-2 border-[#00FF88] overflow-hidden flex-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7, ease }}
                      className="absolute inset-y-0 left-0 bg-[#00FF88]/20 rounded-lg"
                    />
                  </div>
                  <span className="text-lg font-bold text-text-head font-mono whitespace-nowrap">13,500€</span>
                </div>
                <p className="text-xs text-text-label mt-2">
                  <span className="text-[#00FF88] font-bold">10+ ani de publicitate non-stop.</span>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Member math - subtle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-8 bg-card border-2 border-text-head rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_#FFD700]"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-text-head mb-1">Dacă ecranul aduce doar 3 membri noi pe lună...</h4>
                <p className="text-text-body leading-relaxed">
                  3 abonamente × ~45€/lună × 12 luni = <span className="font-bold text-text-head font-mono">~1,620€/an</span>.
                  Investiția se întoarce în <span className="font-bold text-[#00FF88]">sub 2 ani</span> — iar ecranul merge încă 8+.
                  Restul? Profit pur pe publicitate pe care ai plătit-o deja.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICING — Two packages, combined recommended
      ═══════════════════════════════════════════════════ */}
      <section id="oferte" className="py-16 md:py-28 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.15] mb-4">
              <WordReveal text="Alege pachetul tău." className="justify-center" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="text-lg text-text-body max-w-xl mx-auto"
            >
              Ambele variante includ tot ce trebuie — ecrane, transport, instalare, platformă, suport.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Package 1 — P6 Only */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease }}
              className="bg-card border-2 border-text-head rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#E5E5E5]"
            >
              <div className="mb-6">
                <p className="text-sm text-text-label font-bold uppercase tracking-wider mb-2">Pachet Esențial</p>
                <h3 className="text-2xl md:text-3xl font-bold text-text-head">Vitrina intrare</h3>
                <p className="text-text-body text-sm mt-1">Doar ecranul de la intrare — la lift, etaj 2</p>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl md:text-5xl font-bold text-text-head font-mono">9,000</span>
                <span className="text-xl text-text-body font-bold">€</span>
              </div>
              <p className="text-text-label text-sm mb-6">plată unică, fără TVA</p>

              <div className="bg-alternate rounded-xl p-4 mb-6 border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-label">Cost pe zi</span>
                  <span className="text-sm font-bold text-text-head font-mono">2.47€/zi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-label">Echivalent lunar</span>
                  <span className="text-sm font-bold text-text-head font-mono">~75€/lună</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "1× ecran LED transparent",
                  "Instalare profesională pe loc",
                  "Acces platformă de management",
                  "Suport tehnic 12 luni",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-text-label mt-0.5 shrink-0" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/40787578482?text=Salut!%20Vreau%20pachetul%20Esential%20pentru%20Area%20Gym."
                className="block w-full text-center bg-white border-2 border-text-head text-text-head px-6 py-3.5 rounded-full font-bold shadow-[3px_3px_0px_0px_#E5E5E5] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#E5E5E5] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#E5E5E5] transition-all"
              >
                Alege pachetul esențial
              </a>
            </motion.div>

            {/* Package 2 — P6 + P16 (RECOMMENDED) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="bg-card border-2 border-text-head rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#00FF88] relative"
            >
              {/* Recommended badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FF88] border-2 border-text-head rounded-full px-5 py-1.5 shadow-[2px_2px_0px_0px_#141414]">
                <span className="text-xs font-bold text-text-head flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> Recomandat</span>
              </div>

              <div className="mb-6 pt-2">
                <p className="text-sm text-[#00FF88] font-bold uppercase tracking-wider mb-2">Pachet Complet</p>
                <h3 className="text-2xl md:text-3xl font-bold text-text-head">Ambele vitrine</h3>
                <p className="text-text-body text-sm mt-1">Ecran la intrare + panouri la balcon</p>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl md:text-5xl font-bold text-text-head font-mono">13,500</span>
                <span className="text-xl text-text-body font-bold">€</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <p className="text-text-label text-sm">plată unică, fără TVA</p>
                <span className="bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00853E] text-xs font-bold px-2 py-0.5 rounded-full">
                  6,750€ / locație
                </span>
              </div>

              <div className="bg-[#00FF88]/5 rounded-xl p-4 mb-6 border border-[#00FF88]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-body">Cost pe zi</span>
                  <span className="text-sm font-bold text-text-head font-mono flex items-center gap-1.5">
                    3.70€/zi
                    <Coffee className="w-3.5 h-3.5 text-text-label" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-body">Echivalent lunar</span>
                  <span className="text-sm font-bold text-text-head font-mono">~112€/lună</span>
                </div>
              </div>

              {/* Savings callout */}
              <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl px-4 py-3 mb-6">
                <p className="text-sm text-text-head">
                  <span className="font-bold">+4,500€</span> față de pachetul esențial = <span className="font-bold text-[#00853E]">o locație întreagă în plus</span>.
                  Per locație, economisești <span className="font-bold font-mono">25%</span>.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "1× ecran LED transparent (intrare)",
                  "2× panouri LED transparent (balcon)",
                  "Instalare profesională — ambele locații",
                  "Acces platformă de management",
                  "Conținut inițial inclus",
                  "Suport tehnic 24 luni",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
                    <span className="text-sm text-text-body">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/40787578482?text=Salut!%20Vreau%20pachetul%20Complet%20pentru%20Area%20Gym."
                className="block w-full text-center bg-[#00FF88] border-2 border-text-head text-text-head px-6 py-3.5 rounded-full font-bold shadow-[4px_4px_0px_0px_#FFD700] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#FFD700] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#FFD700] transition-all"
              >
                Alege pachetul complet <ArrowRight className="w-4 h-4 inline ml-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHAT'S INCLUDED — Services breakdown
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-alternate relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[7]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.15] mb-4">
              <WordReveal text="Ce primești, concret." />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Ruler, title: "Măsurare la fața locului", desc: "Venim, măsurăm exact, planificăm instalarea." },
              { icon: Package, title: "Ecrane LED premium", desc: "Hardware de calitate, gata de instalare." },
              { icon: Wrench, title: "Instalare profesională", desc: "Montaj complet, cablaj ascuns, fără daune pe geam." },
              { icon: Monitor, title: "Platformă de management", desc: "Schimbi conținutul de pe telefon. Programezi, automatizezi." },
              { icon: Palette, title: "Conținut de start", desc: "Primele materiale grafice — gata de afișat din ziua 1." },
              { icon: Headphones, title: "Suport tehnic dedicat", desc: "Orice problemă, ne suni. Rezolvăm remote sau la fața locului." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="bg-card border-2 border-text-head rounded-2xl p-5 shadow-[3px_3px_0px_0px_#00FF88] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#00FF88] transition-all"
              >
                <div className="w-10 h-10 bg-[#00FF88] rounded-xl border-2 border-text-head shadow-[2px_2px_0px_0px_#141414] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-text-head mb-1">{title}</h4>
                <p className="text-xs text-text-body leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TIMELINE — Next steps
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.15] mb-4">
              <WordReveal text="Cum arată procesul." className="justify-center" />
            </h2>
          </div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Confirmi oferta", desc: "Alegi pachetul, semnăm. Avans 50% la confirmare.", time: "Ziua 1" },
              { step: "02", title: "Producție + livrare", desc: "Ecranele se fabrică pe dimensiunile exacte. Livrare 2-3 săptămâni de la confirmare.", time: "2-3 săptămâni" },
              { step: "03", title: "Instalare + Ești live", desc: "Montăm totul într-o zi. Lipim, cablăm, configurăm, testăm. Fără deranj. Îți arătăm platforma, setăm primul conținut, și e gata. Vitrina lucrează pentru tine.", time: "1 zi" },
            ].map(({ step, title, desc, time }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="flex gap-4 md:gap-6 relative"
              >
                {/* Line connector */}
                {i < 2 && (
                  <div className="absolute left-[23px] md:left-[27px] top-14 bottom-0 w-0.5 bg-border-subtle" />
                )}
                <div className="shrink-0 relative z-10">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-text-head flex items-center justify-center font-mono font-bold text-sm ${
                    i === 2 ? "bg-[#00FF88] text-white shadow-[3px_3px_0px_0px_#141414]" : "bg-white text-text-head shadow-[3px_3px_0px_0px_#00FF88]"
                  }`}>
                    {step}
                  </div>
                </div>
                <div className="pb-8 md:pb-10 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-base md:text-lg font-bold text-text-head">{title}</h4>
                    <span className="text-[10px] font-mono font-bold text-text-label bg-alternate border border-border-subtle rounded-md px-2 py-0.5">{time}</span>
                  </div>
                  <p className="text-sm text-text-body leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BEFORE / AFTER — Visual comparison
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 bg-[#111111] relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[9]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.15] mb-4">
              <WordReveal text="Înainte și după." className="justify-center" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="text-lg text-white/60"
            >
              Trage slider-ul și vezi diferența.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease }}
          >
            <BeforeAfter />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <div className="overflow-visible px-4 pt-8">
        <section className="max-w-5xl mx-auto py-20 md:py-28 bg-[#111111] relative rounded-[2rem] md:rounded-[2.5rem] border-2 border-[#00FF88] mb-24 md:mb-36 z-[9]">
          {/* Corner images */}
          <video
            src="/demo/areagym/areagym-front-point.mp4"
            autoPlay loop muted playsInline
            className="absolute -bottom-8 -left-8 w-32 md:w-44 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#00FF88] object-cover aspect-[3/4] hidden sm:block"
            style={{ transform: "rotate(-6deg)" }}
          />
          <video
            src="/demo/areagym/areagym-terrace-v6.mp4"
            autoPlay loop muted playsInline
            className="absolute -top-8 -right-8 w-32 md:w-44 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#FFD700] object-cover aspect-[3/4] hidden sm:block"
            style={{ transform: "rotate(5deg)" }}
          />

          <div className="max-w-xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-3 bg-white border-2 border-text-head rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_#00FF88] mb-8">
              <img src="/demo/areagym/logo-areagym.png" alt="Area Gym" className="w-9 h-9 rounded-full object-cover" />
              <span className="text-text-head/30 text-lg font-light">&times;</span>
              <a href="/" className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <img src="/logo.svg" alt="Glass Display" className="w-6 h-6" />
                <span className="font-light text-text-head">Glass</span><span className="font-bold text-text-head">Display</span><span className="text-[0.6em] text-text-body align-super leading-none inline-block rotate-[-8deg]">&reg;</span>
              </a>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Competiția pune bannere.<br />
              <span className="text-[#00FF88]">Tu pui viitorul pe geam.</span>
            </h2>

            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10">
              3.70€ pe zi. Zero costuri lunare. 10+ ani. Vitrina care lucrează non-stop,
              chiar și când tu nu ești la sală.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://wa.me/40787578482?text=Salut!%20Sunt%20interesat%20de%20oferta%20Glass%20Display%20pentru%20Area%20Gym."
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#00FF88] text-text-head px-8 py-4 rounded-full font-bold border-2 border-white/20 shadow-[4px_4px_0px_0px_#FFD700] hover:shadow-[6px_6px_0px_0px_#FFD700] transition-all"
              >
                Hai să pornim <Zap className="w-5 h-5" />
              </motion.a>
              <a
                href="tel:+40787578482"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                sau sună direct: <span className="font-mono font-bold text-white">+40 787 578 482</span>
              </a>
            </div>

            <p className="text-white/15 text-xs mt-12">
              Ofertă valabilă 30 de zile — pregătită exclusiv pentru Area Gym Brașov
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
