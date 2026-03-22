import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 60]);
  const [currentFrame, setCurrentFrame] = useState(1);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    setCurrentFrame(Math.round(latest));
  });

  const padded = String(currentFrame).padStart(3, "0");

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-alternate">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-x-2 border-text-head">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <motion.div
            className="w-full h-full bg-card overflow-hidden relative"
            style={{
              boxShadow: useTransform(
                scrollYProgress,
                [0.8, 1],
                ["0 0 0px rgba(0,255,136,0)", "0 0 40px rgba(0,255,136,0.2)"]
              ),
            }}
          >
            <img
              src={`/frames/frame-${padded}.jpg`}
              alt={`Frame ${currentFrame}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
