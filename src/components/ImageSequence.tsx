import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const roundedFrame = useTransform(frameIndex, (latest) => Math.round(latest));

  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 1], [0, 1, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-alternate">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <motion.div
            className="w-[95vw] h-[75vh] md:w-[85vw] md:h-[85vh] bg-card border border-border-subtle rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
            style={{
              boxShadow: useTransform(
                scrollYProgress,
                [0.8, 1],
                ["0 0 0px rgba(0,255,136,0)", "0 0 40px rgba(0,255,136,0.2)"]
              ),
            }}
          >
            <span className="font-mono text-text-label text-xl">
              Frame <motion.span>{roundedFrame}</motion.span> / 20
            </span>
            <div className="absolute bottom-4 right-4 text-xs text-text-label font-mono">
              {/* Replace with actual image sequence frames 1-20 */}
              [Image Sequence Placeholder]
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
