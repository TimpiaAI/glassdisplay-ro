import { motion, AnimatePresence } from "motion/react";
import { WordReveal } from "./WordReveal";
import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";

export function FinalCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Eroare la trimitere");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "A apărut o eroare. Încearcă din nou.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pt-16 md:pt-24 pb-20 md:pb-32 bg-primary relative overflow-hidden z-[9]">
      <div className="max-w-[96%] mx-auto bg-text-head text-white rounded-[2rem] md:rounded-[4rem] p-6 md:p-24 relative overflow-hidden shadow-2xl border-2 border-accent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
          <div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-[1.1] mb-6">
              <WordReveal text="Vitrina ta pierde bani chiar acum." />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-accent leading-[1.2] mb-8"
            >
              Hai s-o reparăm.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-5 md:p-12 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_#00FF88] md:shadow-[8px_8px_0px_0px_#00FF88] border-2 border-text-head max-w-md w-full mx-auto"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-text-head shadow-[4px_4px_0px_0px_#141414]">
                    <Check className="w-8 h-8 text-text-head" />
                  </div>
                  <h3 className="text-xl font-bold text-text-head mb-2">Cererea a fost trimisă!</h3>
                  <p className="text-text-body text-sm mb-6">Te contactăm în maximum 24 de ore.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm text-accent font-semibold hover:underline"
                  >
                    Trimite altă cerere
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold text-text-head mb-1">Vreau să ies în evidență</h3>
                  <p className="text-text-body text-sm mb-5">Completează formularul și te contactăm în 24h.</p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative group">
                      <input
                        name="name"
                        type="text"
                        placeholder="Nume"
                        className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="relative group">
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Telefon"
                        className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="relative group">
                      <input
                        name="address"
                        type="text"
                        placeholder="Adresa magazinului"
                        className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="relative group">
                      <textarea
                        name="message"
                        placeholder="Mesaj (opțional)"
                        rows={3}
                        className="w-full bg-white border-2 border-text-head rounded-xl px-4 py-3 text-text-head placeholder-text-body/50 focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#00FF88] transition-all resize-none"
                        disabled={status === "loading"}
                      ></textarea>
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-accent text-text-head py-4 rounded-xl border-2 border-text-head font-bold hover:bg-[#00e67a] shadow-[4px_4px_0px_0px_#141414] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#141414] active:translate-y-[4px] active:shadow-none transition-all mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Se trimite...
                        </>
                      ) : (
                        "Solicită o ofertă"
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <a
                href="https://wa.me/40787578482?text=Bun%C4%83!%20Vreau%20s%C4%83%20aflu%20mai%20multe%20despre%20Glass%20Display."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-[#25D366] border-2 border-text-head rounded-xl shadow-[4px_4px_0px_0px_#141414] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#141414] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#141414] transition-all group"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div className="text-left">
                  <span className="text-white font-bold text-sm block">Scrie-ne pe WhatsApp</span>
                  <span className="text-white/80 font-mono text-xs">+40 787 578 482</span>
                </div>
                <span className="text-white/80 group-hover:translate-x-1 transition-transform ml-auto text-lg">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
