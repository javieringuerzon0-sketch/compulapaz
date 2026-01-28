
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
      const offset = isScrolled ? 72 : 90;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      window.history.pushState(null, '', id);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'h-16 bg-bg-secondary/80 backdrop-blur-xl shadow-2xl border-b border-white/5' : 'h-24 bg-transparent'
      }`}>
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2 md:gap-3 text-accent-cyan font-heading font-bold text-lg md:text-xl tracking-wider group shrink-0"
        >
          <img
            src={logoUrl}
            alt="Compulapaz"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'
              }`}
          />
        </a>

        {/* Navigation - Always visible but compact on mobile */}
        <div className="flex items-center gap-3 md:gap-8">
          <a
            href="#servicios"
            onClick={(e) => scrollToSection(e, '#servicios')}
            className="text-text-secondary hover:text-accent-cyan transition-colors font-bold text-[10px] md:text-sm uppercase tracking-wide"
          >
            Servicios
          </a>
          <a
            href="#ai-help"
            onClick={(e) => scrollToSection(e, '#ai-help')}
            className="text-text-secondary hover:text-accent-purple transition-colors font-bold text-[10px] md:text-sm uppercase tracking-wide"
          >
            Diagnóstico AI
          </a>
          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, '#contacto')}
            className="text-white hover:text-accent-cyan transition-colors font-bold text-[10px] md:text-sm uppercase tracking-wide"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};
