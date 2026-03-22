import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar initialScrolled />
      {/* Header */}
      <div className="bg-text-head text-white pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link to="/" className="hover:text-accent transition-colors">
              Acasă
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{title}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-4 text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-sm font-mono"
          >
            Ultima actualizare: {lastUpdated}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-6 py-12 md:py-20"
      >
        <div className="bg-card border-2 border-text-head rounded-3xl p-6 md:p-12 shadow-[8px_8px_0px_0px_#00FF88] rotate-[-1deg]">
          <article className="prose prose-lg max-w-none
            prose-headings:text-text-head prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-border-subtle
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-text-body prose-p:leading-relaxed
            prose-li:text-text-body prose-li:leading-relaxed
            prose-strong:text-text-head
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-ul:space-y-2 prose-ol:space-y-2
          ">
            {children}
          </article>
        </div>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-body hover:text-accent transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Înapoi la pagina principală
          </Link>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
