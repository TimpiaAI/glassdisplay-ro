import { motion } from "motion/react";
import { WordReveal } from "./WordReveal";
import { Check, BarChart3, Calendar, Sparkles, Users, Monitor, Layers, TrendingUp, Wifi, Eye, Clock, Zap, Play, Image } from "lucide-react";

function PlatformMockup() {
  const barData = [28, 42, 35, 58, 48, 72, 65, 80, 70, 90, 78, 95];

  return (
    <div>
      <div className="bg-white border-2 border-text-head rounded-2xl shadow-[8px_8px_0px_0px_#00FF88] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b-2 border-text-head">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-alternate border-2 border-text-head rounded-sm px-3 py-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] text-text-body font-mono">glasspanel.ro/dashboard</span>
            </div>
          </div>
          <div className="w-12" />
        </div>

        <div className="flex">
          {/* Mini sidebar */}
          <div className="w-10 bg-white border-r-2 border-text-head py-3 flex flex-col items-center gap-2.5">
            {[Monitor, BarChart3, Sparkles, Calendar, Layers].map((Icon, i) => (
              <div key={i} className={`w-7 h-7 rounded-sm flex items-center justify-center border-2 ${i === 0 ? 'bg-accent border-text-head shadow-[1px_1px_0px_0px_#141414]' : 'border-transparent'}`}>
                <Icon className={`w-3.5 h-3.5 ${i === 0 ? 'text-text-head' : 'text-text-label'}`} />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 bg-alternate">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[9px] text-text-label uppercase tracking-wider font-bold">Dashboard</p>
                <p className="text-xs font-bold text-text-head">Bun venit, Marco</p>
              </div>
              <div className="flex items-center gap-1.5 bg-accent/10 border border-accent rounded-sm px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[8px] text-text-head font-bold font-mono">4 online</span>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {[
                { icon: Monitor, label: "Ecrane", value: "4", trend: "+1", accent: "bg-accent" },
                { icon: Eye, label: "Impresii", value: "12.4K", trend: "+24%", accent: "bg-blue-500" },
                { icon: Clock, label: "Uptime", value: "99.8%", trend: "", accent: "bg-emerald-500" },
                { icon: Zap, label: "CTR", value: "3.2%", trend: "+0.8", accent: "bg-amber-500" },
              ].map(({ icon: Icon, label, value, trend, accent }) => (
                <div key={label} className="bg-white border-2 border-text-head rounded-sm p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                  <div className={`w-5 h-5 rounded-sm flex items-center justify-center mb-1 ${accent}`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[7px] text-text-label uppercase tracking-wider font-bold">{label}</p>
                  <div className="flex items-baseline gap-0.5">
                    <p className="text-[11px] font-bold text-text-head font-mono">{value}</p>
                    {trend && <span className="text-[6px] text-accent font-bold">{trend}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart + Ring */}
            <div className="grid grid-cols-3 gap-1.5 mb-2.5">
              {/* Area chart */}
              <div className="col-span-2 bg-white border-2 border-text-head rounded-sm p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] font-bold text-text-head uppercase tracking-wider">Impresii lunare</span>
                  <div className="flex items-center gap-0.5 bg-accent/10 border border-accent rounded-sm px-1 py-0.5">
                    <TrendingUp className="w-2 h-2 text-accent" />
                    <span className="text-[7px] text-text-head font-bold">+24%</span>
                  </div>
                </div>
                <svg viewBox="0 0 200 50" className="w-full h-12" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF88" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M0,50 ${barData.map((v, i) => `L${(i / (barData.length - 1)) * 200},${50 - v * 0.5}`).join(' ')} L200,50 Z`}
                    fill="url(#chartGrad)"
                  />
                  <path
                    d={barData.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (barData.length - 1)) * 200},${50 - v * 0.5}`).join(' ')}
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx={200} cy={50 - 95 * 0.5} r="3" fill="#00FF88" stroke="#141414" strokeWidth="1" />
                </svg>
                <div className="flex justify-between mt-0.5">
                  {['Ian', 'Mar', 'Mai', 'Iul', 'Sep', 'Nov'].map(m => (
                    <span key={m} className="text-[6px] text-text-label font-mono">{m}</span>
                  ))}
                </div>
              </div>

              {/* Activity ring */}
              <div className="bg-white border-2 border-text-head rounded-sm p-2.5 flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <svg viewBox="0 0 50 50" className="w-11 h-11 mb-1">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#F0F0F0" strokeWidth="4" />
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#00FF88" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="6.28" strokeLinecap="round" transform="rotate(-90 25 25)" />
                  <circle cx="25" cy="25" r="14" fill="none" stroke="#F0F0F0" strokeWidth="3.5" />
                  <circle cx="25" cy="25" r="14" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="87.9" strokeDashoffset="22" strokeLinecap="round" transform="rotate(-90 25 25)" />
                </svg>
                <span className="text-[7px] text-text-label font-bold uppercase tracking-wider">Performanță</span>
                <span className="text-[11px] font-bold text-text-head font-mono">95%</span>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* AI Generator */}
              <div className="bg-white border-2 border-text-head rounded-sm p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-1 mb-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-accent" />
                  <span className="text-[8px] font-bold text-text-head">AI Generator</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="aspect-square bg-accent/10 border-2 border-accent/30 rounded-sm flex items-center justify-center">
                    <Image className="w-3 h-3 text-accent/60" />
                  </div>
                  <div className="aspect-square bg-alternate border-2 border-border-subtle rounded-sm flex items-center justify-center">
                    <Image className="w-3 h-3 text-text-label" />
                  </div>
                </div>
              </div>

              {/* Screens */}
              <div className="bg-white border-2 border-text-head rounded-sm p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-1 mb-1.5">
                  <Wifi className="w-2.5 h-2.5 text-blue-500" />
                  <span className="text-[8px] font-bold text-text-head">Ecrane</span>
                </div>
                <div className="space-y-1">
                  {[
                    { name: "Vitrină #1", on: true },
                    { name: "Mall Nord", on: true },
                    { name: "Showroom", on: true },
                    { name: "Birou HQ", on: false },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.on ? 'bg-accent' : 'bg-text-label/30'}`} />
                      <span className="text-[7px] text-text-body font-mono truncate">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Playlist */}
              <div className="bg-white border-2 border-text-head rounded-sm p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-1 mb-1.5">
                  <Layers className="w-2.5 h-2.5 text-purple-500" />
                  <span className="text-[8px] font-bold text-text-head">Playlist</span>
                </div>
                <div className="space-y-0.5">
                  {[
                    { name: "promo-vara.jpg", active: true, type: "img" },
                    { name: "video-brand.mp4", active: false, type: "vid" },
                    { name: "reduceri.jpg", active: false, type: "img" },
                  ].map((item) => (
                    <div key={item.name} className={`flex items-center gap-1 px-1 py-0.5 rounded-sm ${item.active ? 'bg-accent/10 border border-accent/30' : ''}`}>
                      {item.type === 'vid' ? (
                        <Play className={`w-2 h-2 ${item.active ? 'text-accent' : 'text-text-label'}`} />
                      ) : (
                        <Image className={`w-2 h-2 ${item.active ? 'text-accent' : 'text-text-label'}`} />
                      )}
                      <span className={`text-[6px] font-mono truncate ${item.active ? 'text-text-head font-bold' : 'text-text-label'}`}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="prețuri" className="pt-16 pb-8 bg-gradient-to-b from-alternate to-primary relative overflow-hidden z-[7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Prețuri transparente. La fel ca ecranele noastre." className="justify-center" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-body max-w-2xl mx-auto"
          >
            Ecran + platformă de management + suport. Fără costuri ascunse.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — Platform mockup + stacked photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Platform mockup + overlapping storefront photos */}
            <div className="relative">
              <PlatformMockup />

              {/* Photo overlapping top-right of platform */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-4 -right-3 md:-right-6 w-[38%] rounded-2xl border-2 border-text-head shadow-[4px_4px_0px_0px_#00FF88] overflow-hidden hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#00FF88] transition-all duration-300 z-10"
              >
                <img src="/mockup-salon.webp" alt="Salon beauty cu peliculă LED" loading="lazy" className="w-full object-cover" />
              </motion.div>

              {/* Photo overlapping bottom-left of platform */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -left-3 md:-left-6 w-[38%] rounded-2xl border-2 border-text-head shadow-[4px_4px_0px_0px_#00FF88] overflow-hidden hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#00FF88] transition-all duration-300 z-10"
              >
                <img src="/mockup-restaurant.webp" alt="Restaurant cu peliculă LED" loading="lazy" className="w-full object-cover" />
              </motion.div>
            </div>


            <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center">
              {[
                { icon: Sparkles, text: "Generare AI" },
                { icon: Calendar, text: "Programare" },
                { icon: BarChart3, text: "Analytics" },
                { icon: Users, text: "Multi-ecran" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs text-text-body font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Pricing card */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-card rounded-3xl p-8 md:p-10 border-2 border-text-head shadow-[8px_8px_0px_0px_#00FF88] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#00FF88] transition-all duration-300"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-text-head px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm rotate-2 border-2 border-text-head">
              Ofertă lansare
            </div>

            <div className="mb-6">
              <h3 className="text-3xl font-bold text-text-head mb-1">Glass Display Pro</h3>
              <p className="text-text-label text-sm">Ecran + instalare + platformă</p>
            </div>

            <div className="mb-6 bg-alternate border-2 border-text-head rounded-xl p-5 shadow-[4px_4px_0px_0px_#00FF88]">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-4xl font-bold text-text-head">€750</span>
                <span className="text-text-label text-sm">/m²</span>
              </div>
              <p className="text-sm text-text-body">produs + instalare inclusă</p>
              <div className="mt-3 flex items-center gap-3 bg-white border-2 border-text-head rounded-sm px-3 py-2 shadow-[2px_2px_0px_0px_#141414]">
                <span className="text-sm font-bold text-text-body">Mentenanță lunară</span>
                <span className="font-mono text-lg font-bold text-text-head ml-auto">€150</span>
                <span className="text-text-label text-xs">/m²/lună</span>
              </div>
              <div className="mt-3 bg-accent/10 border-2 border-accent rounded-sm px-3 py-2 shadow-[2px_2px_0px_0px_#00FF88] rotate-[-1.5deg] hover:rotate-[1deg] transition-transform duration-300">
                <span className="text-sm font-bold text-text-head">Primele 2 luni GRATIS</span>
                <span className="text-xs text-text-body block">pentru primele 10 business-uri</span>
              </div>
            </div>

            <ul className="mb-8 space-y-3">
              {[
                "Ecran LED transparent inclus",
                "Instalare inclusă în preț",
                "Platformă management cu AI",
                "Generare conținut cu inteligență artificială",
                "Programare pe calendar",
                "Analytics și rapoarte",
                "Suport tehnic dedicat",
                "Garanție 2 ani",
              ].map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-text-body text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 rounded-full font-semibold bg-accent text-text-head hover:bg-[#00e67a] transition-colors relative overflow-hidden group cursor-pointer border-2 border-text-head shadow-[4px_4px_0px_0px_#141414] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#141414]">
              <span className="relative z-10">Solicită o ofertă</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </button>

            <p className="text-center text-xs text-text-label mt-3">
              Fără contract pe termen lung. Anulezi oricând.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
