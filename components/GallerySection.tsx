"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const galleryItems = [
  { src: "/images/statua-1.jpg", alt: "Statua greca personalizzata",     label: "Dea Atena",          tag: "Statua Classica" },
  { src: "/images/statua-2.jpg", alt: "Personaggio D&D personalizzato",  label: "Guerriero Fantasy",  tag: "Fantasy RPG"     },
  { src: "/images/statua-3.jpg", alt: "Personaggio videogioco 3D",       label: "Game Character",     tag: "Gaming"          },
  { src: "/images/statua-4.jpg", alt: "Busto personalizzato",            label: "Busto Custom",       tag: "Su Misura"       },
  { src: "/images/statua-5.jpg", alt: "Drago fantasy stampato 3D",       label: "Drago Fantasy",      tag: "Fantasy"         },
  { src: "/images/statua-6.jpg", alt: "Set commissione personalizzata",  label: "Set Commissione",    tag: "Collezione"      },
];

const tagColors: Record<string, string> = {
  "Statua Classica": "#D4AF37",
  "Fantasy RPG":     "#8B6FBD",
  "Gaming":          "#2E86AB",
  "Su Misura":       "#C17A4E",
  "Fantasy":         "#8B6FBD",
  "Collezione":      "#D4AF37",
};

function GalleryCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const color = tagColors[item.tag] ?? "#D4AF37";

  return (
    <motion.div
      style={{ perspective: "900px" }}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.09 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="card-dark rounded-2xl overflow-hidden"
        whileHover={{
          rotateY: 6,
          rotateX: -4,
          scale: 1.03,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-[4/5] bg-[#111E2E] overflow-hidden group">
          {/* Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#F5F0E8]/12 group-hover:text-[#D4AF37]/25 transition-colors duration-300">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.7}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-xs font-medium tracking-wider">Foto in arrivo</span>
          </div>

          {!imgError && (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060E18]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tag chip */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
            style={{
              background: `color-mix(in srgb, ${color} 22%, #060E18)`,
              color: color,
              border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
            }}
          >
            {item.tag}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-[#F5F0E8] font-bold">{item.label}</h3>
          <p className="text-[#F5F0E8]/40 text-sm mt-1">Su commissione • Personalizzato</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section id="galleria" className="py-24 px-6 bg-[#060E18]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            Le Nostre Creazioni
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-4">
            Ogni Pezzo è{" "}
            <span className="gold-text">Una Leggenda</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-xl mx-auto">
            Statue, eroi, personaggi. La tua commissione potrebbe essere la prossima.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Upload reminder (dev only hint) */}
        <p className="mt-6 text-center text-[#F5F0E8]/20 text-xs">
          📁 Aggiungi le immagini in <code className="text-[#D4AF37]/40">/public/images/</code> →{" "}
          <code className="text-[#D4AF37]/40">statua-1.jpg … statua-6.jpg</code>
        </p>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#F5F0E8]/55 mb-4">
            Vuoi qualcosa di simile? O completamente tuo?
          </p>
          <a
            href="#contatti"
            className="outline-btn inline-flex items-center gap-2 px-8 py-3 rounded-xl"
          >
            Richiedi la Tua Commissione
          </a>
        </motion.div>
      </div>
    </section>
  );
}
