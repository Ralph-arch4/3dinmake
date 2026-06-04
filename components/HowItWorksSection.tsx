"use client";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Ci Contatti",
    desc: "Scrivici via form o WhatsApp. Dimmi cosa vuoi creare — statua, personaggio, busto. Più dettagli dai, meglio lavoriamo.",
    icon: "💬",
  },
  {
    number: "02",
    title: "Preventivo Gratis",
    desc: "In poco tempo ti mandiamo un preventivo dettagliato. Zero impegno, zero costi. Solo chiarezza.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Anteprima 3D",
    desc: "Vedi il modello digitale prima che stampiamo. Modifiche illimitate finché non sei soddisfatto — sempre gratis.",
    icon: "🔮",
  },
  {
    number: "04",
    title: "Stampa & Consegna",
    desc: "Approvata l'anteprima, stampiamo e spediamo. Veloci comu u lampu di Sicilia.",
    icon: "🚀",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="come-funziona" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            Il Nostro Processo
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-4">
            Come <span className="gold-text">Funziona</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-xl mx-auto">
            Semplice, trasparente e senza sorprese. Dall&apos;idea alla statua in mano.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/22 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="card-dark p-6 rounded-2xl h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-[#060E18]"
                      style={{
                        background: "linear-gradient(135deg, #F0D060, #D4AF37)",
                        boxShadow: "0 0 22px rgba(212,175,55,0.38)",
                      }}
                    >
                      {step.number}
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="text-[#F5F0E8] font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#F5F0E8]/50 text-sm leading-relaxed flex-1">{step.desc}</p>

                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-12 z-10 text-[#D4AF37] text-xl">
                      →
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#contatti" className="gold-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base">
            <span>Inizia Subito — È Gratis</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
