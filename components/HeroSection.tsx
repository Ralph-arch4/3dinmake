"use client";
import { motion } from "motion/react";
import PrinterShowcase from "@/components/PrinterShowcase";

/* Triskelion SVG — three bent legs at 0°/120°/240° create the classic Sicilian Trinacria swirl */
function TrinacriaIcon({ className = "" }: { className?: string }) {
  const arm = "M 95,100 C 100,80 120,65 130,48 C 138,32 132,14 118,12 C 108,10 96,26 94,48 C 90,68 88,86 105,100 Z";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="Trinacria — simbolo della Sicilia">
      <defs>
        <linearGradient id="gA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DC60" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6A10" />
        </linearGradient>
        <linearGradient id="gB" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0D060" />
          <stop offset="100%" stopColor="#B08820" />
        </linearGradient>
      </defs>
      {[0, 120, 240].map((rot, i) => (
        <path
          key={rot}
          d={arm}
          fill={i % 2 === 0 ? "url(#gA)" : "url(#gB)"}
          transform={`rotate(${rot}, 100, 100)`}
          opacity="0.94"
        />
      ))}
      {/* Concentric center rings */}
      <circle cx="100" cy="100" r="22" fill="#D4AF37" opacity="0.9" />
      <circle cx="100" cy="100" r="16" fill="#060E18" />
      <circle cx="100" cy="100" r="10" fill="#D4AF37" opacity="0.85" />
      <circle cx="100" cy="100" r="4"  fill="#060E18" />
    </svg>
  );
}

const navLinks = [
  { href: "#missione",      label: "Chi Siamo" },
  { href: "#categorie",     label: "Categorie" },
  { href: "#come-funziona", label: "Come Funziona" },
  { href: "#galleria",      label: "Galleria" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 25% 45%, #0D2040 0%, #060E18 65%)" }}
    >
      {/* Subtle ancient grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient gold glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.09] blur-[120px] bg-[#D4AF37] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px] bg-[#C17A4E] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20 glass border-b border-[#D4AF37]/10">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TrinacriaIcon className="w-7 h-7" />
          <span className="text-xl font-black tracking-tighter gold-shimmer">3D</span>
          <span className="text-xl font-black tracking-tighter text-[#F5F0E8]">TRINACRIA</span>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#F5F0E8]/60 hover:text-[#D4AF37] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contatti" className="gold-btn px-5 py-2 rounded-lg text-sm">
            <span>Commissione</span>
          </a>
        </motion.div>

        <a href="#contatti" className="md:hidden gold-btn px-4 py-2 rounded-lg text-sm">
          <span>Commissione</span>
        </a>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16">

        {/* TEXT COLUMN */}
        <div>
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] font-medium">Stampa 3D Artigianale • Sicilia</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="block text-[#F5F0E8]">STATUE.</span>
            <span className="block gold-text">EROI.</span>
            <span className="block text-[#F5F0E8]">LEGGENDE.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-[#F5F0E8]/60 max-w-lg mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Dalla Sicilia, l&apos;arte della stampa 3D artigianale.{" "}
            <span className="text-[#D4AF37] font-semibold">
              Statue, personaggi fantasy, eroi dei tuoi videogiochi
            </span>{" "}
            — realizzati su commissione, comu li vuoi tu.
          </motion.p>

          <motion.p
            className="text-base text-[#F5F0E8]/35 mb-10 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            &ldquo;Dimmi chi vuoi immortalare, e noi lu stampiamu.&rdquo;
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            <a
              href="#contatti"
              className="gold-btn px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2"
            >
              <span>Richiedi la Tua Commissione</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#galleria" className="outline-btn px-8 py-4 rounded-xl text-base text-center">
              Vedi il Catalogo
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.58 }}
          >
            {[
              { value: "100%", label: "Su Commissione" },
              { value: "Sicilia", label: "Artigianale" },
              { value: "∞",      label: "Possibilità" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black gold-text">{s.value}</div>
                <div className="text-xs text-[#F5F0E8]/35 mt-1 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D PRINTER MOTION FRAME */}
        <PrinterShowcase />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
        <span className="text-[10px] text-[#D4AF37]/60 tracking-[0.3em] uppercase">Scopri</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
