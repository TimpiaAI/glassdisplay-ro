import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { useRef } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  separator?: string;
}

export function CountUp({ from = 0, to, duration = 2, className = "", separator = "," }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [count, isInView, to, duration]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
