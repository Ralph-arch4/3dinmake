"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/* -------------------------------------------------------------------------
   PrinterShowcase — cinematic 3D motion frame for the hero.
   A looping print timelapse (MP4) lives inside a glass frame that tilts in
   3D under the cursor, with parallax UI, a cursor-tracking glare, machined
   corner brackets, a gold bloom and a live status badge.
   Media:  /public/videos/3Dprintertech.mp4   (poster: /images/print-complete.jpg)
--------------------------------------------------------------------------- */

const VIDEO_SRC = "/videos/3Dprintertech.mp4";
const POSTER = "/images/print-complete.jpg";

export default function PrinterShowcase() {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* --- mouse-driven 3D tilt --- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), spring);
  // layered parallax: foreground UI drifts more than the footage
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const shiftMedia = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const shiftUi = useTransform(mx, [-0.5, 0.5], [-26, 26]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.22), transparent 60%)`
  );

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
        {/* floating decorative orbit ring */}
        <div
          className="absolute -inset-6 rounded-[34px] border border-[#D4AF37]/12 animate-float pointer-events-none"
          style={{ transform: "translateZ(-60px)" }}
        />

        {/* the glass frame */}
        <div
          className="relative w-full h-full rounded-[26px] overflow-hidden glass-dark gold-border"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* media layer (parallax) */}
          <motion.div className="absolute inset-0" style={{ x: shiftMedia }}>
            {failed ? (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
                style={{ background: "radial-gradient(ellipse at 50% 35%, #0D2040 0%, #060E18 70%)" }}
              >
                <svg className="w-12 h-12 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-[#F5F0E8]/55 leading-relaxed font-mono">
                  {VIDEO_SRC.replace("/videos/", "")}
                  <br />
                  <span className="text-[#D4AF37]/70">video non trovato</span>
                </p>
              </div>
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={POSTER}
                onError={() => setFailed(true)}
                className="absolute inset-0 w-full h-full object-cover select-none"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            )}
            {/* navy grade to keep it on-brand */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060E18] via-transparent to-[#060E18]/20 pointer-events-none" />
            <div className="absolute inset-0 bg-[#0D2040]/15 mix-blend-color pointer-events-none" />
          </motion.div>

          {/* cursor-following glare */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light"
            style={{ background: glare }}
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
            <div className="glass flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#F0D060", boxShadow: "0 0 10px #F0D060" }}
              />
              <span className="text-[11px] font-semibold tracking-wider text-[#F5F0E8]">
                STAMPA 3D · LIVE
              </span>
            </div>
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
                <span className="text-[11px] text-[#F5F0E8]/55">Timelapse</span>
              </div>
              {/* looping "in-progress" rail */}
              <div className="h-1.5 rounded-full bg-[#F5F0E8]/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #9A7A1A, #D4AF37, #F0D060)" }}
                  animate={reduce ? { width: "100%" } : { width: ["0%", "100%"] }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 5, ease: "easeInOut", repeat: Infinity }
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
