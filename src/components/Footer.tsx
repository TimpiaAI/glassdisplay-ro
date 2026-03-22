import { Instagram, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary border-2 border-text-head pt-20 md:pt-40 pb-6 overflow-hidden relative rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-12 z-[10]">
      <div className="max-w-7xl mx-auto px-6 mb-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <a href="#" className="flex items-center gap-2 mb-6">
            <img src="/logo.svg" alt="Glass Display" className="w-10 h-10 -rotate-3" />
            <div className="flex items-center gap-1">
              <span className="font-sans font-light text-2xl tracking-tight text-text-head">Glass</span>
              <span className="font-sans font-bold text-2xl tracking-tight text-text-head">Display</span>
            </div>
          </a>
          <p className="text-text-body text-lg max-w-sm mb-8">
            Transformăm vitrinele obișnuite în experiențe digitale captivante. Fără a bloca lumina naturală.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-body hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-body hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-body hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-text-head mb-6">Navigație</h4>
            <ul className="space-y-4">
              {["Soluția", "Cum funcționează", "Prețuri", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-text-body hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-head mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="https://timpia.ai/termeni-si-conditii" target="_blank" rel="noopener noreferrer" className="text-text-body hover:text-accent transition-colors flex items-center gap-1 group">Termeni și condiții <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="https://timpia.ai/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="text-text-body hover:text-accent transition-colors flex items-center gap-1 group">Politică de confidențialitate <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="https://timpia.ai/politica-cookie" target="_blank" rel="noopener noreferrer" className="text-text-body hover:text-accent transition-colors flex items-center gap-1 group">Politica Cookie <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-head mb-6">Contact</h4>
            <ul className="space-y-4">
              <li><a href="mailto:hello@timpia.ai" className="text-text-body hover:text-accent transition-colors flex items-center gap-1 group">hello@timpia.ai <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></a></li>
              <li><a href="tel:+40787578482" className="text-text-body hover:text-accent transition-colors">+40 787 578 482</a></li>
              <li className="text-text-body">Brașov, România</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden flex justify-center items-center pointer-events-none select-none mt-12 mb-4">
        <h2 className="text-[14vw] font-bold text-text-head/5 tracking-tighter leading-none whitespace-nowrap -rotate-1">
          GLASSDISPLAY
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center border-t border-border-subtle pt-6">
        <p className="text-xs text-text-label">
          © {new Date().getFullYear()} GlassDisplay.ro — un proiect Timpia. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
