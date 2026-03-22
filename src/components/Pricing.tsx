import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "motion/react";
import { WordReveal } from "./WordReveal";
import { Check } from "lucide-react";
import { useState } from "react";

function PriceWithHoverImage({ price, subtext, imageSrc }: { price: string, subtext?: string, imageSrc: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const xOffset = useTransform(x, (value) => value - 128);
  const yOffset = useTransform(y, (value) => value - 80);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="mb-8 inline-block cursor-crosshair relative z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="font-mono text-3xl font-bold text-text-head block mb-1">
        {price}
      </span>
      {subtext && (
        <span className="text-sm text-text-label block">{subtext}</span>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            src={imageSrc}
            alt="Preview"
            referrerPolicy="no-referrer"
            className="fixed z-[100] w-64 h-40 object-cover rounded-xl shadow-2xl pointer-events-none border-2 border-text-head"
            style={{
              left: 0,
              top: 0,
              x: xOffset,
              y: yOffset,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      size: "1 m²",
      price: "3.500 RON",
      features: ["ecran + instalare", "configurare", "1 an garanție"],
      cta: "Cere ofertă",
      popular: false,
      image: "https://picsum.photos/seed/starter/400/300?blur=2"
    },
    {
      name: "Business",
      size: "2-4 m²",
      price: "3.000 RON/m²",
      features: ["tot din Starter", "app management", "suport prioritar"],
      cta: "Cere ofertă",
      popular: true,
      image: "https://picsum.photos/seed/business/400/300?blur=2"
    },
    {
      name: "Enterprise",
      size: "5+ m²",
      price: "Cere ofertă",
      features: ["tot din Business", "proiect personalizat", "SLA"],
      cta: "Cere ofertă",
      popular: false,
      image: "https://picsum.photos/seed/enterprise/400/300?blur=2"
    },
  ];

  return (
    <section id="prețuri" className="pt-16 pb-8 bg-gradient-to-b from-alternate to-primary relative overflow-hidden z-[7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-head leading-[1.2] mb-4">
            <WordReveal text="Investiția ta." className="justify-center" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-text-body max-w-2xl mx-auto"
          >
            Prețuri transparente, ca ecranele noastre.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative bg-card rounded-3xl p-8 flex flex-col min-h-[450px] md:min-h-[550px] border-2 border-text-head transition-all duration-300 ${
                plan.popular
                  ? "md:-translate-y-4 shadow-[8px_8px_0px_0px_#00FF88] hover:-translate-y-6 hover:shadow-[12px_12px_0px_0px_#00FF88]"
                  : "shadow-sm hover:-translate-y-2 hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-text-head px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-head mb-2">{plan.name}</h3>
                <p className="text-text-label font-mono text-sm">{plan.size}</p>
              </div>
              
              <PriceWithHoverImage
                price={plan.price}
                subtext={plan.price !== "Cere ofertă" ? "preț estimativ" : undefined}
                imageSrc={plan.image}
              />
              
              <ul className="mb-10 flex-1 space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-text-body">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-4 rounded-sm font-semibold transition-colors relative overflow-hidden group mt-auto ${
                  plan.popular
                    ? "bg-accent text-text-head hover:bg-[#00e67a] glow-accent-hover"
                    : "bg-transparent border border-text-head text-text-head hover:bg-text-head hover:text-white"
                }`}
              >
                <span className="relative z-10">{plan.cta}</span>
                {plan.popular && (
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
