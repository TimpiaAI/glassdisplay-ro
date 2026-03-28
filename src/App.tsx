import { useState, useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
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
import { TermeniSiConditii } from "./pages/TermeniSiConditii";
import { PoliticaConfidentialitate } from "./pages/PoliticaConfidentialitate";
import { GDPR } from "./pages/GDPR";
import { PoliticaCookie } from "./pages/PoliticaCookie";
import { AtlantisDemo } from "./pages/AtlantisDemo";
import { AreaGymDemo } from "./pages/AreaGymDemo";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
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
          <FinalCTA />
          <FAQ />
          <SocialProof />
        </main>
        <Footer />
      </div>
    </>
  );
}

function PageTransition({ children }: { children: ReactNode; [key: string]: unknown }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
            <Route path="/politica-de-confidentialitate" element={<PoliticaConfidentialitate />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/politica-cookie" element={<PoliticaCookie />} />
            <Route path="/demo/atlantis" element={<AtlantisDemo />} />
            <Route path="/demo/areagym" element={<AreaGymDemo />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}
