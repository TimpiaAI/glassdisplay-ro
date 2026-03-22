import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative h-full w-[1px] ${className}`}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="#00FF88"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
