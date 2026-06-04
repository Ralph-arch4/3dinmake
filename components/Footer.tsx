export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060E18] border-t border-[#D4AF37]/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tighter gold-shimmer">3D</span>
          <span className="text-xl font-black tracking-tighter text-[#F5F0E8]">TRINACRIA</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#F5F0E8]/35">
          <a href="#missione"      className="hover:text-[#D4AF37] transition-colors">Chi Siamo</a>
          <a href="#categorie"     className="hover:text-[#D4AF37] transition-colors">Categorie</a>
          <a href="#come-funziona" className="hover:text-[#D4AF37] transition-colors">Come Funziona</a>
          <a href="#galleria"      className="hover:text-[#D4AF37] transition-colors">Galleria</a>
          <a href="#contatti"      className="hover:text-[#D4AF37] transition-colors">Contatti</a>
        </nav>

        <p className="text-[#F5F0E8]/22 text-xs text-center md:text-right">
          © {year} 3D Trinacria. Fattu cu passioni in Sicilia. 🏺
        </p>
      </div>

      <div className="gold-divider mt-8 max-w-xs mx-auto opacity-20" />
    </footer>
  );
}
