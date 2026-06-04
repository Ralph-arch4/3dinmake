"use client";
import { useState } from "react";
import { motion } from "motion/react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: form.name,
          email: form.email,
          telefono: form.phone,
          tipo_commissione: form.type,
          descrizione: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#0D1B2A] border border-[#D4AF37]/14 focus:border-[#D4AF37] text-[#F5F0E8] placeholder-[#F5F0E8]/20 rounded-xl px-4 py-3 outline-none transition-colors text-sm";

  return (
    <section id="contatti" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            Cuntatticci
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-4">
            Porta la Tua Idea{" "}
            <span className="gold-text">Alla Vita</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-xl mx-auto">
            Preventivo e anteprima 3D sempre gratuiti. Ti rispondiamo in tempu ru secunni.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🏺",
                title: "Commissione Gratuita",
                desc: "Raccontaci cosa vuoi creare e ti mandiamo un preventivo dettagliato senza impegno.",
              },
              {
                icon: "🔮",
                title: "Anteprima 3D",
                desc: "Vedi il modello digitale prima che stampiamo. Modifiche illimitate finché non sei soddisfatto.",
              },
              {
                icon: "🤝",
                title: "Prezzi Onesti",
                desc: "Prezzi trasparenti, senza sorprese. Facemu tutti cosi insieme.",
              },
            ].map((c) => (
              <div key={c.title} className="card-dark p-5 rounded-2xl">
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="text-[#F5F0E8] font-bold mb-1">{c.title}</h3>
                <p className="text-[#F5F0E8]/40 text-sm">{c.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-2xl flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#F5F0E8]/45 text-xs font-medium mb-1.5 block">Nome *</label>
                  <input
                    type="text" required placeholder="Mario Conti"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#F5F0E8]/45 text-xs font-medium mb-1.5 block">Email *</label>
                  <input
                    type="email" required placeholder="mario@esempio.it"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#F5F0E8]/45 text-xs font-medium mb-1.5 block">WhatsApp / Telefono</label>
                  <input
                    type="tel" placeholder="+39 333 123 4567"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#F5F0E8]/45 text-xs font-medium mb-1.5 block">Tipo di Commissione</label>
                  <select
                    className={inputClass}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="">Seleziona...</option>
                    <option value="statua">Statua / Replica Classica</option>
                    <option value="fantasy">Fantasy / D&amp;D / RPG</option>
                    <option value="gaming">Personaggio Videogioco</option>
                    <option value="custom">Idea Originale</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#F5F0E8]/45 text-xs font-medium mb-1.5 block">
                  Descrivi la tua commissione *
                </label>
                <textarea
                  required rows={5}
                  placeholder="Descrivi cosa vuoi: personaggio, stile, dimensioni, materiale, riferimenti visivi... più dettagli dai, meglio lavoriamo!"
                  className={inputClass + " resize-none"}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {status === "success" && (
                <div className="bg-emerald-900/30 border border-emerald-600/40 text-emerald-400 rounded-xl px-4 py-3 text-sm">
                  ✅ Commissione inviata! Ti rispondiamo presto.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-900/30 border border-red-600/40 text-red-400 rounded-xl px-4 py-3 text-sm">
                  ❌ Errore nell&apos;invio. Riprova o contattaci direttamente.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="gold-btn px-6 py-4 rounded-xl text-base w-full disabled:opacity-50"
              >
                <span>
                  {status === "sending" ? "Invio in corso..." : "Invia Commissione — Gratis"}
                </span>
              </button>

              <p className="text-[#F5F0E8]/22 text-xs text-center">
                Nessuno spam. Solo la tua creazione.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
