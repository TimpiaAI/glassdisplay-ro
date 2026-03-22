import { motion } from "motion/react";

export function SkeletonLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-4 bg-[#F0F0F0] rounded w-32 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="h-20 bg-[#F0F0F0] rounded w-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="h-20 bg-[#F0F0F0] rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="h-6 bg-[#F0F0F0] rounded w-2/3 relative overflow-hidden mt-8">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="h-14 bg-[#F0F0F0] rounded w-48 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
            <div className="h-14 bg-[#F0F0F0] rounded w-40 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 h-[50vh] lg:h-[70vh] bg-[#F0F0F0] rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>
    </motion.div>
  );
}
