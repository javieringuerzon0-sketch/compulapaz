
import React from 'react';

interface NavbarProps {
  isScrolled: boolean;
}

const logoUrl = new URL('../Logo/logo-nuevo.png', import.meta.url).href;

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const offset = isScrolled ? 72 : 112;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      window.history.pushState(null, '', id);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'h-20 bg-bg-secondary/70 backdrop-blur-xl shadow-lg border-b border-white/5' : 'h-28 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 text-accent-cyan font-heading font-bold text-xl tracking-wider group shrink-0"
        >
          <img
            src={logoUrl}
            alt="Compulapaz"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'
              }`}
          />
        </a>

        {/* Navigation - Aligned further to the right as requested */}
        <div className="hidden md:flex items-center gap-12 ml-auto pr-6">
          <a
            href="#servicios"
            onClick={(e) => scrollToSection(e, '#servicios')}
            className="text-text-secondary hover:text-accent-cyan transition-colors font-bold text-[11px] uppercase tracking-[0.2em]"
          >
            Servicios
          </a>
          <a
            href="#ai-help"
            onClick={(e) => scrollToSection(e, '#ai-help')}
            className="text-text-secondary hover:text-accent-purple transition-colors font-bold text-[11px] uppercase tracking-[0.2em]"
          >
            Diagnóstico AI
          </a>
          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, '#contacto')}
            className="text-text-secondary hover:text-accent-cyan transition-colors font-bold text-[11px] uppercase tracking-[0.2em]"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};
