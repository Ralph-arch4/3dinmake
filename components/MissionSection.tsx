"use client";
import { motion } from "motion/react";

const features = [
  {
    icon: "🏺",
    title: "Tradizione Siciliana",
    desc: "L'artigianato siciliano incontra la tecnologia moderna. Ogni pezzo porta l'identità di questa terra.",
  },
  {
    icon: "🖨️",
    title: "Stampa di Precisione",
    desc: "FDM e resina ad alta risoluzione. Dettagli al decimo di millimetro. Ogni strato conta.",
  },
  {
    icon: "🆓",
    title: "Preventivo Gratuito",
    desc: "Preventivo e anteprima 3D gratuiti prima di ogni ordine. Zero sorprese, mai.",
  },
  {
    icon: "⚡",
    title: "Veloci Comu u Lampu",
    desc: "Tempi rapidi, qualità alta. Perché l'attesa è la cosa che odiamo di più.",
  },
];

export default function MissionSection() {
  return (
    <section id="missione" className="py-24 px-6 relative bg-[#0D1B2A]">
      <div className="gold-divider mb-16 mx-auto max-w-4xl" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            Chi Siamo
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-6 leading-tight">
            L&apos;Arte Siciliana nella{" "}
            <span className="gold-text">Terza Dimensione</span>
          </h2>
          <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-6">
            Siamo artigiani digitali nati in Sicilia. Uniamo la passione per l&apos;arte,
            la storia e la tecnologia per dare vita a{" "}
            <span className="text-[#D4AF37] font-semibold">
              statue, eroi e personaggi unici al mondo
            </span>.
          </p>
          <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-6">
            Dalla mitologia greca ai personaggi di Dark Souls. Dal busto personalizzato al
            guerriero fantasy del tuo gioco di ruolo.{" "}
            <em className="text-[#F5F0E8]/75">
              &ldquo;Si tu lu pensi, noi lu stampiamu.&rdquo;
            </em>
          </p>
          <p className="text-[#F5F0E8]/45 leading-relaxed">
            Zero produzione di massa. 100% su commissione. Ogni pezzo è unico come chi
            lo ordina — con la cura artigianale che solo la Sicilia sa dare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-dark p-5 rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-[#F5F0E8] font-bold mb-2">{f.title}</h3>
              <p className="text-[#F5F0E8]/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="gold-divider mt-16 mx-auto max-w-4xl" />
    </section>
  );
}
