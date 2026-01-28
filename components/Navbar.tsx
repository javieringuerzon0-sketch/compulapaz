
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
      const offset = isScrolled ? 70 : 90;
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
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? 'h-16 bg-bg-secondary/95 backdrop-blur-md shadow-lg border-b border-white/10'
        : 'h-20 bg-bg-primary/40 backdrop-blur-sm shadow-none border-b border-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-2">
        {/* Logo - Fixed sizing to prevent mobile overflow */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex-shrink-0"
        >
          <img
            src={logoUrl}
            alt="Compulapaz"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-9 md:h-14' : 'h-11 md:h-20'
              }`}
          />
        </a>

        {/* Links - Forced visibility with high contrast and explicit flex layout */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12 ml-auto">
          <a
            href="#servicios"
            onClick={(e) => scrollToSection(e, '#servicios')}
            className="text-white hover:text-accent-cyan transition-colors font-bold text-[10px] md:text-[11px] uppercase tracking-tighter sm:tracking-widest whitespace-nowrap"
          >
            Servicios
          </a>
          <a
            href="#ai-help"
            onClick={(e) => scrollToSection(e, '#ai-help')}
            className="text-white hover:text-accent-purple transition-colors font-bold text-[10px] md:text-[11px] uppercase tracking-tighter sm:tracking-widest whitespace-nowrap"
          >
            IA Help
          </a>
          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, '#contacto')}
            className="text-white hover:text-accent-cyan transition-colors font-bold text-[10px] md:text-[11px] uppercase tracking-tighter sm:tracking-widest whitespace-nowrap"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};
