"use client";
import { motion } from "motion/react";

const categories = [
  {
    icon: "🏛️",
    title: "Statue Classiche",
    subtitle: "Replicas & Originals",
    desc: "Repliche di statue greche, romane e siciliane. Dall'Agrigento alla Roma imperiale — stampate con precisione millimetrica.",
    tag: "Classico",
    color: "#D4AF37",
  },
  {
    icon: "⚔️",
    title: "Fantasy & D&D",
    subtitle: "RPG Characters",
    desc: "Il tuo personaggio D&D, Warhammer o eroe fantasy. Armature, draghi, maghi — esattamente come li immagini.",
    tag: "Fantasy",
    color: "#8B6FBD",
  },
  {
    icon: "🎮",
    title: "Game Characters",
    subtitle: "Video Game Icons",
    desc: "Il tuo personaggio preferito dai videogiochi. Dark Souls, Elden Ring, Final Fantasy, Zelda — da schermo a realtà.",
    tag: "Gaming",
    color: "#2E86AB",
  },
  {
    icon: "✍️",
    title: "Su Commissione",
    subtitle: "Fully Custom",
    desc: "Hai un'idea unica? Un disegno originale? Descrivi l'idea o mandaci il file — lo trasformiamo in oggetto 3D.",
    tag: "Custom",
    color: "#C17A4E",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categorie" className="py-24 px-6 relative overflow-hidden bg-[#060E18]">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #D4AF37 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            Cosa Creiamo
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-4">
            Dal Mito al{" "}
            <span className="gold-text">Modello 3D</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-xl mx-auto">
            Specializzati in statue, personaggi fantasy ed eroi digitali. Ogni pezzo stampato
            a mano in Sicilia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group"
              style={{ perspective: "900px" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="card-dark p-6 rounded-2xl h-full flex flex-col cursor-pointer"
                whileHover={{
                  rotateY: 9,
                  rotateX: -6,
                  scale: 1.04,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Tag */}
                <div
                  className="inline-flex self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
                  style={{
                    background: `color-mix(in srgb, ${cat.color} 14%, transparent)`,
                    color: cat.color,
                    border: `1px solid color-mix(in srgb, ${cat.color} 28%, transparent)`,
                  }}
                >
                  {cat.tag}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>

                <h3 className="text-[#F5F0E8] font-black text-xl mb-1">{cat.title}</h3>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: `color-mix(in srgb, ${cat.color} 70%, #F5F0E8)` }}
                >
                  {cat.subtitle}
                </p>
                <p className="text-[#F5F0E8]/50 text-sm leading-relaxed flex-1">{cat.desc}</p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 h-[1.5px] rounded-full opacity-35 group-hover:opacity-65 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
        >
          <a
            href="#contatti"
            className="gold-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base"
          >
            <span>Inizia la Tua Commissione — Gratis</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
