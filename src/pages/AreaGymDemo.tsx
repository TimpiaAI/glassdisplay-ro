import { motion, useScroll, useTransform, useMotionValue, useTransform as useT, animate, PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WordReveal } from "../components/WordReveal";
import {
  Dumbbell,
  Users,
  Clock,
  Tag,
  Smartphone,
  MapPin,
  Monitor,
  Sparkles,
  ChevronRight,
  ChevronLeft,
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
  Heart,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  X,
  Check,
  Send,
  Mail,
} from "lucide-react";

/* ── Scroll gallery images ─────────────────────────── */
const galleryLeft = [
  { src: "/demo/areagym/areagym_fron_point.webp", alt: "Area Gym — vedere frontala", label: "Vedere frontala" },
  { src: "/demo/areagym/areagym-mall-v10-benchpress.webp", alt: "Benchpress — vitrina mall", label: "Benchpress" },
  { src: "/demo/areagym/areagym-terrace-v6.webp", alt: "Terasa — alien display", label: "Terasa display" },
  { src: "/demo/areagym/areagym-glasspanel-v2-2.webp", alt: "Glass panel etaj 3", label: "Geam etaj 3" },
  { src: "/demo/areagym/areagym-mall-v9-energyball-2.webp", alt: "Energy ball — vitrina mall", label: "Energy ball" },
  { src: "/demo/areagym/areagym-balustrade-v11-1.webp", alt: "Balustrada — Vino la Area Gym", label: "Vino la sala" },
];
const galleryMiddle = [
  { src: "/demo/areagym/areagym-mall-v10-squat.webp", alt: "Squat — vitrina mall", label: "Squat" },
  { src: "/demo/areagym/areagym-terrace-v10-beast.webp", alt: "Unleash the beast — terasa", label: "Unleash the beast" },
  { src: "/demo/areagym/areagym-night-front-v13.webp", alt: "Area Gym — noapte", label: "Noapte" },
  { src: "/demo/areagym/areagym-mall-v7-pointing.webp", alt: "Pointing — vitrina mall", label: "Hai la sala" },
  { src: "/demo/areagym/areagym-balustrade-v12-3.webp", alt: "Balustrada — abonamente", label: "Abonamente" },
  { src: "/demo/areagym/areagym-protein-shakes-v4.webp", alt: "Protein shakes display", label: "Protein shakes" },
];
const galleryRight = [
  { src: "/demo/areagym/areagym-mall-v10-deadlift.webp", alt: "Deadlift — vitrina mall", label: "Deadlift" },
  { src: "/demo/areagym/areagym-terrace-v13-powerlifting-2.webp", alt: "Powerlifting — terasa", label: "Powerlifting" },
  { src: "/demo/areagym/areagym-glasspanel-v13a-2.webp", alt: "Glass panel etaj 3 v2", label: "Geam etaj 3 v2" },
  { src: "/demo/areagym/areagym-mall-v10-hailasala-3.webp", alt: "Hai la sala — vitrina mall", label: "Hai la sala" },
  { src: "/demo/areagym/areagym-terrace-v8-boxing.webp", alt: "Boxing — terasa", label: "Boxing" },
  { src: "/demo/areagym/areagym-balustrade-v14-2.webp", alt: "Balustrada — ai zis ca te apuci", label: "Te apuci din 1" },
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
        <img src="/demo/areagym/logo-areagym.png" alt="" className="w-4 h-4 rounded-full object-cover" />
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
      className={`relative w-full aspect-[9/16] max-h-[70vh] rounded-3xl border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
      style={{ touchAction: "none" }}
      onMouseMove={(e) => dragging && handleMove(e.clientX)}
      onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => { e.preventDefault(); handleMove(e.touches[0].clientX); }}
      onTouchStart={(e) => { e.preventDefault(); setDragging(true); handleMove(e.touches[0].clientX); }}
      onTouchEnd={() => setDragging(false)}
    >
      {/* AFTER — video with Glass Display (full background, right side) */}
      <video
        src="/demo/areagym/after.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE — plain storefront (clipped overlay, left side) */}
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

      {/* Slider line */}
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
    icon: Tag,
    title: "Abonamente & Oferte",
    desc: "Afișează promoțiile curente, abonamente avantajoase și oferte de sezon direct pe vitrina sălii. Clienții văd prețurile de pe stradă.",
    color: "bg-[#00FF88]",
  },
  {
    icon: Calendar,
    title: "Program clase & antrenamente",
    desc: "Orarul claselor de grup, sesiuni de personal training și program de funcționare — actualizate automat, live.",
    color: "bg-[#FFD700]",
  },
  {
    icon: Users,
    title: "Antrenori & spotlight",
    desc: "Prezintă echipa de antrenori profesioniști, comunicativi, mereu pregătiți să motiveze și să îndrume spre rezultate.",
    color: "bg-[#00C9FF]",
  },
  {
    icon: Trophy,
    title: "Facilitați & echipamente",
    desc: "Aparate de ultima generație: Hoist, Prime, Nebula, Atlantis, Cybex, Eleiko — afișate cu video-uri live pe vitrina.",
    color: "bg-[#A78BFA]",
  },
  {
    icon: Smartphone,
    title: "Control total de pe telefon",
    desc: "Schimbi reclamele de pe telefon pentru ambele locații. AI-ul sugerează conținut în funcție de oră, sezon și tipul de clienți.",
    color: "bg-[#00FF88]",
  },
];

/* ── Locations ─────────────────────────── */
const locations = ["Baia Mare", "Brașov"];

/* ── Swipe cards data ─────────────────────────── */
const swipeCards = [
  { src: "/demo/areagym/areagym_fron_point.webp", label: "În fața mall-ului — intrare principală" },
  { src: "/demo/areagym/areagym-mall-v10-benchpress.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-mall-v10-deadlift.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-mall-v10-squat.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-mall-v7-pointing.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-mall-v10-hailasala-3.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-mall-v9-energyball-2.webp", label: "Vitrina mare — față mall, parter" },
  { src: "/demo/areagym/areagym-terrace-v6.webp", label: "Terasă etaj 3 — geam exterior" },
  { src: "/demo/areagym/areagym-terrace-v10-beast.webp", label: "Terasă etaj 3 — geam exterior" },
  { src: "/demo/areagym/areagym-terrace-v13-powerlifting-2.webp", label: "Terasă etaj 3 — geam exterior" },
  { src: "/demo/areagym/areagym-terrace-v8-boxing.webp", label: "Terasă etaj 3 — geam exterior" },
  { src: "/demo/areagym/areagym-balustrade-v11-1.webp", label: "Balustradă — exterior, deasupra intrării" },
  { src: "/demo/areagym/areagym-balustrade-v12-3.webp", label: "Balustradă — exterior, deasupra intrării" },
  { src: "/demo/areagym/areagym-balustrade-v14-2.webp", label: "Balustradă — exterior, deasupra intrării" },
  { src: "/demo/areagym/areagym-glasspanel-v2-2.webp", label: "Geam lateral — etaj 3, Brașov" },
  { src: "/demo/areagym/areagym-glasspanel-v13a-2.webp", label: "Geam lateral — etaj 3, Brașov" },
  { src: "/demo/areagym/areagym-night-front-v13.webp", label: "Geam lateral — noapte, etaj 3, Brașov" },
  { src: "/demo/areagym/areagym-protein-shakes-v4.webp", label: "Interior — vitrina bar protein" },
];

/* ── Sound helpers ─────────────────────────── */
function playSwipeSound(direction: "left" | "right") {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (direction === "right") {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.12);
    }
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

function playUndoSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch {}
}

/* ── LocalStorage helpers ─────────────────────────── */
const LS_KEY = "areagym-swipe";

function loadProgress() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { current: number; liked: number[]; history: Array<{ index: number; wasLiked: boolean }>; submitted: boolean };
  } catch { return null; }
}

function saveProgress(data: { current: number; liked: number[]; history: Array<{ index: number; wasLiked: boolean }>; submitted: boolean }) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

/* ── Tinder Swipe Component ─────────────────────────── */
function SwipeSelector() {
  const saved = useRef(loadProgress());
  const [current, setCurrent] = useState(saved.current?.current ?? 0);
  const [liked, setLiked] = useState<number[]>(saved.current?.liked ?? []);
  const [history, setHistory] = useState<Array<{ index: number; wasLiked: boolean }>>(saved.current?.history ?? []);
  const [dir, setDir] = useState<"left" | "right" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(saved.current?.submitted ?? false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const x = useMotionValue(0);
  const rotate = useT(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useT(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const leftOp = useT(x, [-100, 0], [1, 0]);
  const rightOp = useT(x, [0, 100], [0, 1]);

  const done = current >= swipeCards.length;

  // Save to localStorage on every change
  useEffect(() => {
    saveProgress({ current, liked, history, submitted });
  }, [current, liked, history, submitted]);

  // Wiggle hint on first card
  useEffect(() => {
    if (hasInteracted || current !== 0) return;
    const timeout = setTimeout(() => {
      animate(x, 40, { duration: 0.3 }).then(() =>
        animate(x, -40, { duration: 0.4 }).then(() =>
          animate(x, 0, { duration: 0.3 })
        )
      );
    }, 1200);
    return () => clearTimeout(timeout);
  }, [hasInteracted, current, x]);

  const swipe = useCallback((direction: "left" | "right") => {
    if (done) return;
    if (!hasInteracted) setHasInteracted(true);
    playSwipeSound(direction);
    setDir(direction);
    const target = direction === "right" ? 400 : -400;
    animate(x, target, { duration: 0.3 }).then(() => {
      const wasLiked = direction === "right";
      if (wasLiked) setLiked((p) => [...p, current]);
      setHistory((p) => [...p, { index: current, wasLiked }]);
      setCurrent((p) => p + 1);
      x.set(0);
      setDir(null);
    });
  }, [current, done, x]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    playUndoSound();
    const last = history[history.length - 1];
    setHistory((p) => p.slice(0, -1));
    if (last.wasLiked) setLiked((p) => p.filter((i) => i !== last.index));
    setCurrent(last.index);
    x.set(0);
  }, [history, x]);

  function handleDragEnd(_: any, info: PanInfo) {
    if (!hasInteracted) setHasInteracted(true);
    if (Math.abs(info.offset.x) > 80) {
      swipe(info.offset.x > 0 ? "right" : "left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  }

  // Auto-submit when done
  useEffect(() => {
    if (!done || submitted || liked.length === 0) return;
    const selectedLabels = liked.map((i) => swipeCards[i].label);
    const payload = {
      name: "Area Gym — Selecție amplasamente (swipe)",
      phone: "—",
      address: "demo/areagym",
      message: `Selecție amplasamente Area Gym (${liked.length}/${swipeCards.length}):\n\n${selectedLabels.map((l, i) => `${i + 1}. ${l}`).join("\n")}`,
    };
    console.log("[SwipeSelector] Sending selection:", payload);
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => { console.log("[SwipeSelector] Response:", r.status); return r.json(); })
      .then((d) => console.log("[SwipeSelector] Data:", d))
      .catch((e) => console.error("[SwipeSelector] Error:", e));
    setSubmitted(true);
  }, [done, submitted, liked]);

  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-mono font-bold text-white/60">
          {Math.min(current + 1, swipeCards.length)}/{swipeCards.length}
        </span>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00FF88] rounded-full transition-all duration-300"
            style={{ width: `${(Math.min(current + 1, swipeCards.length) / swipeCards.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-[#00FF88]">{liked.length} selectate</span>
      </div>

      {!done ? (
        <>
          {/* Card stack */}
          <div className="relative w-[300px] h-[400px] md:w-[420px] md:h-[520px]">
            {/* Next card preview */}
            {current + 1 < swipeCards.length && (
              <div className="absolute inset-0 rounded-2xl border-2 border-white/10 overflow-hidden scale-[0.95] opacity-50">
                <img
                  src={swipeCards[current + 1].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Active card */}
            <motion.div
              key={current}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 rounded-2xl border-2 border-text-head overflow-hidden shadow-[6px_6px_0px_0px_#00FF88] cursor-grab active:cursor-grabbing bg-white"
            >
              <img
                src={swipeCards[current].src}
                alt={swipeCards[current].label}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Location label */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm border-2 border-text-head rounded-xl px-4 py-2.5 shadow-[2px_2px_0px_0px_#141414] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00FF88] shrink-0" />
                  <span className="text-sm font-bold text-text-head">{swipeCards[current].label}</span>
                </div>
              </div>

              {/* Swipe overlays */}
              <motion.div
                style={{ opacity: rightOp }}
                className="absolute inset-0 bg-[#00FF88]/20 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-[#00FF88] border-4 border-white rounded-2xl px-6 py-3 rotate-[-15deg] shadow-lg">
                  <span className="text-2xl font-bold text-white flex items-center gap-2">
                    <Check className="w-7 h-7" /> VREAU
                  </span>
                </div>
              </motion.div>
              <motion.div
                style={{ opacity: leftOp }}
                className="absolute inset-0 bg-red-500/20 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-red-500 border-4 border-white rounded-2xl px-6 py-3 rotate-[15deg] shadow-lg">
                  <span className="text-2xl font-bold text-white flex items-center gap-2">
                    <X className="w-7 h-7" /> SKIP
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => swipe("left")}
              className="w-14 h-14 bg-white border-2 border-text-head rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#FF4444] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#FF4444] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#FF4444] transition-all"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>
            <button
              onClick={undo}
              disabled={history.length === 0}
              className="w-11 h-11 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center hover:-translate-y-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="Înapoi"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => swipe("right")}
              className="w-14 h-14 bg-[#00FF88] border-2 border-text-head rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#141414] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#141414] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#141414] transition-all"
            >
              <Check className="w-6 h-6 text-white" />
            </button>
          </div>

          <p className="text-white/40 text-xs mt-4 flex items-center gap-2">
            <X className="w-3 h-3" /> Skip
            <span className="mx-1">•</span>
            <ChevronLeft className="w-3 h-3" /> Înapoi
            <span className="mx-1">•</span>
            Vreau <Check className="w-3 h-3" />
          </p>
        </>
      ) : (
        /* ── Auto-submitted result ── */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white border-2 border-text-head rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#00FF88] text-center">
            <div className="w-16 h-16 bg-[#00FF88] rounded-2xl border-2 border-text-head shadow-[3px_3px_0px_0px_#141414] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-text-head mb-2">
              {liked.length > 0 ? "Am primit alegerea ta!" : "Gata!"}
            </h3>
            <p className="text-text-body mb-6">
              {liked.length > 0
                ? `Ai selectat ${liked.length} amplasamente. Revenim cu o ofertă personalizată în cel mai scurt timp.`
                : "Nu ai selectat niciun amplasament. Ne poți contacta direct dacă ai întrebări."}
            </p>

            {/* Selected thumbnails */}
            {liked.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {liked.map((i) => (
                  <div key={i} className="relative w-14 h-14 rounded-lg border-2 border-[#00FF88] overflow-hidden">
                    <img src={swipeCards[i].src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ── Scroll gallery section ─────────────────────────── */
function AreaGymGallery() {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00FF88]/5 blur-[150px] pointer-events-none" />

      <div className="w-full px-[2px] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 items-start">
        <motion.div className="flex flex-col gap-3 md:gap-10" style={{ y: leftY }}>
          {galleryLeft.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[i % galleryRotations.length]} />
          ))}
        </motion.div>

        <motion.div className="flex flex-col gap-3 md:gap-10" style={{ y: middleY }}>
          {galleryMiddle.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[(i + 3) % galleryRotations.length]} />
          ))}
        </motion.div>

        <motion.div className="hidden md:flex flex-col gap-10" style={{ y: rightY }}>
          {galleryRight.map((img, i) => (
            <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} rotation={galleryRotations[(i + 1) % galleryRotations.length]} />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-alternate to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-alternate to-transparent pointer-events-none z-10" />
    </section>
  );
}

/* ── Main page ─────────────────────────── */
export function AreaGymDemo() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Helmet>
        <title>Area Gym Brașov — Simulare vitrina digitala | Glass Display</title>
        <meta name="description" content="Simulare pentru Area Gym Brașov. Cum ar arăta vitrina sălii cu ecran LED transparent lipit direct pe geam." />
        <link rel="canonical" href="https://glasspanel.ro/demo/areagym" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glasspanel.ro/demo/areagym" />
        <meta property="og:title" content="Area Gym Brașov — Simulare vitrina digitala | Glass Display" />
        <meta property="og:description" content="Simulare pentru Area Gym Brașov. Cum ar arăta vitrina sălii cu ecran LED transparent lipit direct pe geam." />
        <meta property="og:image" content="https://glasspanel.ro/demo/areagym/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Area Gym Brașov — Simulare vitrina digitala | Glass Display" />
        <meta name="twitter:description" content="Simulare pentru Area Gym Brașov. Cum ar arăta vitrina sălii cu ecran LED transparent lipit direct pe geam." />
        <meta name="twitter:image" content="https://glasspanel.ro/demo/areagym/og.jpg" />
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
              <img src="/demo/areagym/logo-areagym.png" alt="Area Gym" className="w-7 h-7 rounded-full object-cover" />
              <span className="text-text-label text-sm font-medium">x</span>
              <img src="/logo.svg" alt="GlassPanel" className="w-6 h-6" />
              <span className="text-text-head text-sm font-bold">Prezentare exclusiva</span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-text-head leading-[1.05] mb-6">
              <WordReveal text="Asa ar arata vitrina salii voastre." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-body max-w-lg leading-relaxed mb-8"
            >
              Simulare pentru <span className="text-[#00FF88] font-bold">Area Gym Brașov</span> — cea mai modernă și premium sală din oraș, cu ecran LED transparent lipit direct pe geam.
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
      <AreaGymGallery />


      {/* ═══ CE POȚI AFIȘA ═══ */}
      <section id="ce-afisa" className="pt-12 md:pt-16 pb-20 md:pb-28 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="Ce puteti afisa pe vitrina salii?" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-text-body max-w-xl"
            >
              Oferă antrenamentului tău mai multă varietate ca niciodată. Conținut care se schimbă automat, programat sau manual — de pe telefon, pentru ambele locații.
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
                  <idea.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-head mb-2">{idea.title}</h3>
                <p className="text-text-body leading-relaxed">{idea.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALEGE AMPLASAMENTELE ═══ */}
      <section className="py-16 md:pt-16 md:pb-28 bg-alternate relative overflow-hidden -mt-12 z-[4] md:min-h-screen md:flex md:items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#676768] rounded-[2rem] md:rounded-[2.5rem] border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] py-8 md:py-10 px-6 md:px-12 text-white">
            <div className="text-center mb-6">
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-[1.2] mb-4">
                <WordReveal text="Care sunt pasii urmatori?" className="justify-center" />
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto">
                Alege amplasamentele care ți se potrivesc. La final, primim automat selecția ta și revenim cu o ofertă.
              </p>
            </div>

            <SwipeSelector />
          </motion.div>
        </div>
      </section>

      {/* ═══ 2 LOCATII, O PLATFORMA ═══ */}
      <section className="py-20 md:py-32 bg-primary relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head -mt-12 z-[5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
              <WordReveal text="2 locatii. O singura platforma." className="justify-center" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-text-body max-w-2xl mx-auto"
            >
              Schimbi conținutul la ambele locații simultan sau personalizezi fiecare individual. Totul de pe un singur telefon.
            </motion.p>
          </div>

          {/* Dashboard Mockup */}
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
                    <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                    <span className="text-xs text-text-body font-mono">glasspanel.ro/dashboard/areagym</span>
                  </div>
                </div>
                <div className="w-12" />
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-12 md:w-14 bg-white border-r-2 border-text-head py-4 flex flex-col items-center gap-3 shrink-0">
                  {[Monitor, BarChart3, Sparkles, Calendar, Layers, Store].map((Icon, i) => (
                    <div key={i} className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center border-2 ${i === 0 ? 'bg-[#00FF88] border-text-head shadow-[1px_1px_0px_0px_#141414]' : 'border-transparent'}`}>
                      <Icon className={`w-4 h-4 ${i === 0 ? 'text-white' : 'text-text-label'}`} />
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 md:p-6 bg-alternate min-h-[400px] md:min-h-[500px]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                      <p className="text-[10px] md:text-xs text-text-label uppercase tracking-wider font-bold">Dashboard</p>
                      <p className="text-sm md:text-lg font-bold text-text-head">Bun venit, Area Gym</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-[#00FF88]/10 border border-[#00FF88] rounded-md px-2 md:px-3 py-1">
                        <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                        <span className="text-[9px] md:text-xs text-text-head font-bold font-mono">2 ecrane online</span>
                      </div>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
                    {[
                      { icon: Store, label: "Locații", value: "2", trend: "", accent: "bg-[#00FF88]" },
                      { icon: Eye, label: "Impresii azi", value: "3.4K", trend: "+24%", accent: "bg-blue-500" },
                      { icon: Clock, label: "Uptime", value: "99.9%", trend: "", accent: "bg-emerald-500" },
                      { icon: Zap, label: "Membri noi", value: "18", trend: "+12%", accent: "bg-[#FFD700]" },
                    ].map(({ icon: Icon, label, value, trend, accent }) => (
                      <div key={label} className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center mb-1.5 ${accent}`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <p className="text-[8px] md:text-[9px] text-text-label uppercase tracking-wider font-bold">{label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-sm md:text-lg font-bold text-text-head font-mono">{value}</p>
                          {trend && <span className="text-[8px] md:text-[10px] text-[#00FF88] font-bold">{trend}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart + Locations list */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                    {/* Chart */}
                    <div className="md:col-span-2 bg-white border-2 border-text-head rounded-lg p-3 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <span className="text-[9px] md:text-xs font-bold text-text-head uppercase tracking-wider">Impresii / Locatie</span>
                        <div className="flex items-center gap-1 bg-[#00FF88]/10 border border-[#00FF88] rounded-md px-2 py-0.5">
                          <TrendingUp className="w-3 h-3 text-[#00FF88]" />
                          <span className="text-[8px] md:text-[10px] text-text-head font-bold">+31%</span>
                        </div>
                      </div>
                      <svg viewBox="0 0 200 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
                        {[78, 85].map((v, i) => (
                          <g key={i}>
                            <rect x={i * 100 + 15} y={80 - v * 0.8} width="70" height={v * 0.8} rx="4" fill={i === 0 ? "#00FF88" : "#FFD700"} opacity={0.8} />
                          </g>
                        ))}
                      </svg>
                      <div className="flex justify-around mt-1">
                        {locations.map(s => (
                          <span key={s} className="text-[8px] md:text-[10px] text-text-label font-mono font-bold">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Active locations */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Wifi className="w-3.5 h-3.5 text-[#00FF88]" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head uppercase tracking-wider">Ecrane active</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "Baia Mare", address: "Str. Andrei Mureșanu Nr. 8" },
                          { name: "Brașov", address: "Bdul Gării 3A, Unirea SC" },
                        ].map((loc) => (
                          <div key={loc.name} className="flex items-center gap-2 bg-alternate rounded-lg p-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] md:text-[11px] text-text-head font-bold font-mono block truncate">Area Gym {loc.name}</span>
                              <span className="text-[7px] md:text-[9px] text-text-label truncate block">{loc.address}</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] text-[#00FF88] font-bold">ON</span>
                          </div>
                        ))}
                      </div>

                      {/* Schedule mini */}
                      <div className="mt-3 pt-3 border-t border-border-subtle">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Clock className="w-3 h-3 text-text-label" />
                          <span className="text-[8px] md:text-[10px] text-text-label font-bold">Program afișaj</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[8px] md:text-[10px]">
                            <span className="text-text-body">L-V</span>
                            <span className="font-mono font-bold text-text-head">06:00 — 22:00</span>
                          </div>
                          <div className="flex items-center justify-between text-[8px] md:text-[10px]">
                            <span className="text-text-body">S-D</span>
                            <span className="font-mono font-bold text-text-head">10:00 — 22:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* AI Generator */}
                    <div className="bg-white border-2 border-text-head rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
                        <span className="text-[9px] md:text-xs font-bold text-text-head">AI Generator</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="aspect-square bg-[#00FF88]/10 border-2 border-[#00FF88]/30 rounded-md flex items-center justify-center">
                          <Image className="w-4 h-4 text-[#00FF88]/60" />
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
                          { name: "promo-abonament.jpg", active: true, type: "img" },
                          { name: "tur-virtual.mp4", active: false, type: "vid" },
                          { name: "clase-grup.jpg", active: false, type: "img" },
                        ].map((item) => (
                          <div key={item.name} className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md ${item.active ? 'bg-[#00FF88]/10 border border-[#00FF88]/30' : ''}`}>
                            {item.type === 'vid' ? (
                              <Play className={`w-2.5 h-2.5 ${item.active ? 'text-[#00FF88]' : 'text-text-label'}`} />
                            ) : (
                              <Image className={`w-2.5 h-2.5 ${item.active ? 'text-[#00FF88]' : 'text-text-label'}`} />
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
                          { time: "06:00", content: "Promo dimineață" },
                          { time: "12:00", content: "Clase după-amiază" },
                          { time: "17:00", content: "Ofertă abonament" },
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

      {/* ═══ FOOTER CTA ═══ */}
      <div className="overflow-hidden px-4">
      <section className="max-w-5xl mx-auto py-20 md:py-28 bg-[#676768] relative rounded-[2rem] md:rounded-[2.5rem] border-2 border-[#00FF88] mb-24 md:mb-36 z-[7]">
        {/* Corner images */}
        <img
          src="/demo/areagym/areagym-terrace-v6.webp"
          alt=""
          className="absolute -bottom-8 -left-8 w-36 md:w-52 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#00FF88] object-cover aspect-[3/4]"
          style={{ transform: "rotate(-6deg)" }}
        />
        <img
          src="/demo/areagym/areagym-terrace-v10-beast.webp"
          alt=""
          className="absolute -top-8 -right-8 w-36 md:w-52 rounded-2xl border-2 border-white/20 shadow-[4px_4px_0px_0px_#00FF88] object-cover aspect-[3/4]"
          style={{ transform: "rotate(5deg)" }}
        />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white border-2 border-text-head rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_#00FF88] mb-8">
            <img src="/demo/areagym/logo-areagym.png" alt="Area Gym" className="w-9 h-9 rounded-full object-cover" />
            <span className="text-text-head/30 text-lg font-light">&times;</span>
            <a href="/" className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="GlassPanel" className="w-6 h-6" />
              <span className="font-light text-text-head">Glass</span><span className="font-bold text-text-head">Display</span><span className="text-[0.6em] text-text-body align-super leading-none inline-block rotate-[-8deg]">&reg;</span>
            </a>
          </div>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-3">
            Tot ce ai văzut aici poate fi live pe vitrinele sălii voastre.
          </p>
          <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10">
            Când sunteți gata, ne ocupăm noi de tot — instalare, configurare, conținut. Voi doar alegeți ce vreți să afișați.
          </p>

          <motion.a
            href="https://glasspanel.ro/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#00FF88] text-text-head px-8 py-4 rounded-full font-bold border-2 border-white/20 shadow-[4px_4px_0px_0px_#FFD700] hover:shadow-[6px_6px_0px_0px_#FFD700] transition-all"
          >
            Fă-ți abonament la vizibilitate <Dumbbell className="w-5 h-5" />
          </motion.a>

          <p className="text-white/20 text-xs mt-10">
            Pregătit pentru Area Gym — Brașov & Baia Mare
          </p>
        </div>
      </section>
      </div>

      <Footer />
    </>
  );
}
