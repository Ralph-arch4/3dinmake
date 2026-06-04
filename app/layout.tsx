import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "3D Trinacria — Statue & Personaggi su Commissione",
  description:
    "Stampa 3D artigianale dalla Sicilia. Statue, personaggi fantasy, eroi dei videogiochi e figure su commissione. Preventivo e anteprima gratuiti.",
  keywords: [
    "stampa 3D Sicilia",
    "statue 3D personalizzate",
    "personaggi fantasy 3D",
    "figure su commissione",
    "stampa 3D artigianale",
    "3D printing Sicily",
    "busti personalizzati",
    "miniature D&D",
    "game characters 3D",
  ],
  openGraph: {
    title: "3D Trinacria — Statue & Personaggi su Commissione",
    description:
      "Stampa 3D artigianale dalla Sicilia. Statue, eroi e personaggi fantasy su commissione. Preventivo gratuito.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
