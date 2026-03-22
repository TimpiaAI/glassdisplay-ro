import { useState } from "react";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { ImageSequence } from "./components/ImageSequence";
import { Solution } from "./components/Solution";
import { HowItWorks } from "./components/HowItWorks";
import { UseCases } from "./components/UseCases";
import { Pricing } from "./components/Pricing";
import { SocialProof } from "./components/SocialProof";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SkeletonLoader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <ImageSequence />
          <Solution />
          <HowItWorks />
          <UseCases />
          <Pricing />
          <SocialProof />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

