"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/* -------------------------------------------------------------------------
   PrinterShowcase — cinematic 3D motion frame for the hero.
   Cross-dissolves between two stills (printing → finished) on a loop,
   with mouse-driven 3D parallax tilt, a print-head scan sweep, and a
   live status badge. Drop the two source images here:
     /public/images/print-printing.jpg   (mid-print)
     /public/images/print-complete.jpg   (finished statue)
--------------------------------------------------------------------------- */

const SLIDES = [
  {
    src: "/images/print-printing.jpg",
    badge: "STAMPA IN CORSO",
    sub: "Layer 214 / 246",
    dot: "#F0D060",
  },
  {
    src: "/images/print-complete.jpg",
    badge: "STAMPA COMPLETATA",
    sub: "Pronta alla consegna",
    dot: "#7CE38B",
  },
] as const;

const CYCLE_MS = 4200;

/* Cinematic 3D swap: the next frame swings in from the right in depth while
   the previous one rotates out to the left — a camera-pan feel, not a fade. */
const cinematic = {
  enter: { rotateY: 42, x: "62%", z: -340, opacity: 0, scale: 0.9, filter: "blur(8px)" },
  center: { rotateY: 0, x: "0%", z: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { rotateY: -42, x: "-62%", z: -340, opacity: 0, scale: 0.9, filter: "blur(8px)" },
};
/* reduced-motion fallback */
const simple = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PrinterShowcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [missing, setMissing] = useState<Record<string, boolean>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  /* --- mouse-driven 3D tilt --- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), spring);
  // layered parallax: foreground UI drifts more than the image
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const shiftImg = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const shiftUi = useTransform(mx, [-0.5, 0.5], [-26, 26]);

  function handleMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  /* --- auto cross-dissolve loop --- */
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];
  const printing = index === 0;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "1300px" }}
    >
      {/* ambient gold bloom behind the frame */}
      <div
        className="absolute -inset-10 rounded-full opacity-30 blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />

      <motion.div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, scale: 0.85, rotateX: 18, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[300px] sm:w-[360px] lg:w-[420px] aspect-[4/5] rounded-[26px]"
      >
        {/* floating decorative orbit rings */}
        <div
          className="absolute -inset-6 rounded-[34px] border border-[#D4AF37]/12 animate-float pointer-events-none"
          style={{ transform: "translateZ(-60px)" }}
        />

        {/* the glass frame */}
        <div
          className="relative w-full h-full rounded-[26px] overflow-hidden glass-dark gold-border"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* image stack — cinematic 3D swap */}
          <motion.div
            className="absolute inset-0"
            style={{ x: shiftImg, perspective: 1100, transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={slide.src}
                variants={reduce ? simple : cinematic}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.4 : 0.95, ease: [0.83, 0, 0.17, 1] }}
                className="absolute inset-0 will-change-transform"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", transformOrigin: "center center" }}
              >
                {missing[slide.src] ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
                    style={{ background: "radial-gradient(ellipse at 50% 35%, #0D2040 0%, #060E18 70%)" }}
                  >
                    <svg className="w-12 h-12 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-[#F5F0E8]/55 leading-relaxed font-mono">
                      {slide.src.replace("/images/", "")}
                      <br />
                      <span className="text-[#D4AF37]/70">aggiungi la foto qui</span>
                    </p>
                  </div>
                ) : (
                  <img
                    src={slide.src}
                    alt={printing ? "Stampa 3D in corso" : "Statua stampata completata"}
                    draggable={false}
                    onError={() => setMissing((m) => ({ ...m, [slide.src]: true }))}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            {/* navy grade to keep it on-brand */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060E18] via-transparent to-[#060E18]/20 pointer-events-none" />
            <div className="absolute inset-0 bg-[#0D2040]/15 mix-blend-color pointer-events-none" />
          </motion.div>

          {/* print-head scan sweep (only during the printing phase) */}
          {printing && !reduce && (
            <motion.div
              className="absolute left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(240,208,96,0.28), rgba(240,208,96,0.55), rgba(240,208,96,0.28), transparent)",
                boxShadow: "0 0 28px rgba(240,208,96,0.6)",
              }}
              initial={{ top: "-15%" }}
              animate={{ top: "110%" }}
              transition={{ duration: CYCLE_MS / 1000, ease: "linear", repeat: Infinity }}
            />
          )}

          {/* moving glare follows the cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.22), transparent 60%)`
              ),
            }}
          />

          {/* corner brackets — machined look */}
          {[
            "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg",
            "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg",
            "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
            "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
          ].map((c) => (
            <span key={c} className={`absolute w-7 h-7 border-[#D4AF37]/55 ${c}`} />
          ))}

          {/* live status badge (parallax foreground) */}
          <motion.div
            className="absolute top-4 left-4 z-10"
            style={{ x: shiftUi, transform: "translateZ(50px)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.badge}
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="glass flex items-center gap-2 px-3 py-1.5 rounded-full"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: slide.dot, boxShadow: `0 0 10px ${slide.dot}` }}
                />
                <span className="text-[11px] font-semibold tracking-wider text-[#F5F0E8]">
                  {slide.badge}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* bottom info bar */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-10"
            style={{ x: shiftUi, transform: "translateZ(40px)" }}
          >
            <div className="glass rounded-xl px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37]">
                  Bambu Lab · PLA
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={slide.sub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[11px] text-[#F5F0E8]/55"
                  >
                    {slide.sub}
                  </motion.span>
                </AnimatePresence>
              </div>
              {/* progress rail */}
              <div className="h-1.5 rounded-full bg-[#F5F0E8]/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #9A7A1A, #D4AF37, #F0D060)",
                  }}
                  animate={{ width: printing ? "87%" : "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* slide dots */}
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex gap-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Mostra fotogramma ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 26 : 8,
                background: i === index ? "#D4AF37" : "rgba(245,240,232,0.25)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
