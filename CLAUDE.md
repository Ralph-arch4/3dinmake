# 3D TRINACRIA — CLAUDE.md

## Project Synopsis
Stampa 3D artigianale specializzata in statue, personaggi fantasy e game characters su commissione.
Brand: 3D Trinacria — Sicilian identity fused with modern 3D printing.
Industry: Artigianato / Entertainment — pure landing page, no auth, no DB.

**Stack:** Next.js 15 App Router (TypeScript) · Tailwind CSS 4 · Motion v12 (`motion/react`) · Lucide React · Formspree

**Sections (in order):** HeroSection · MissionSection · CategoriesSection · HowItWorksSection · GallerySection · ContactSection · Footer

## Color Palette
- Gold:       `#D4AF37` / light `#F0D060` / dark `#9A7A1A`
- Terracotta: `#C17A4E`
- Navy bg:    `#060E18` (main) · `#0D1B2A` (surface) · `#111E2E` (card)
- Text:       `#F5F0E8` (ivory)

## CSS Classes (globals.css)
- `.gold-text` — gold gradient text
- `.gold-shimmer` — animated gold shimmer text
- `.gold-btn` — primary CTA (gold background, navy text)
- `.outline-btn` — ghost button (gold border)
- `.glass` / `.glass-dark` — frosted glass surfaces
- `.card-dark` — dark card with gold border on hover
- `.gold-glow` / `.gold-border` — glow/border effects
- `.gold-divider` — horizontal gold gradient line

## Motion Patterns
- Entrance: `initial={{ opacity:0, y:30 }}` + `whileInView={{ opacity:1, y:0 }}` + `viewport={{ once:true }}`
- 3D tilt cards: `whileHover={{ rotateY:9, rotateX:-6, scale:1.04 }}` on `motion.div` with `style={{ transformStyle:"preserve-3d" }}`, parent has `style={{ perspective:"900px" }}`
- Trinacria spin: `animate={{ rotateZ:360 }}` + `transition={{ duration:32, repeat:Infinity, ease:"linear" }}`

## Key Files
- `components/HeroSection.tsx` — contains `TrinacriaIcon` SVG (triskelion with bent-leg arm path)
- `components/CategoriesSection.tsx` — 4 product categories with 3D tilt hover
- `components/GallerySection.tsx` — 6-slot gallery (add images at `/public/images/statua-1.jpg` … `statua-6.jpg`)
- `components/ContactSection.tsx` — Formspree form (replace `YOUR_FORM_ID` in the fetch URL)

## Lab Notes
- Motion import path for v12: `import { motion } from "motion/react"` (NOT `framer-motion`)
- Trinacria SVG arm path: `M 95,100 C 100,80 120,65 130,48 C 138,32 132,14 118,12 C 108,10 96,26 94,48 C 90,68 88,86 105,100 Z` — rotate(0/120/240, 100, 100) creates clockwise triskelion
- `scale-108` is not a Tailwind default; use `group-hover:scale-[1.08]` if needed
