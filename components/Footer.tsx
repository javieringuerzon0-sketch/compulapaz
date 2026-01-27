
import React from 'react';

const logoUrl = new URL('../Logo/logo-nuevo.png', import.meta.url).href;

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <img
          src={logoUrl}
          alt="Compulapaz"
          className="mx-auto h-24 md:h-28 w-auto mb-4 drop-shadow-[0_0_20px_rgba(160,158,238,0.28)]"
          loading="lazy"
        />
        <p className="text-text-secondary font-bold uppercase tracking-widest max-w-lg mx-auto mb-12 text-xs">
          "Más de 10 años transformando problemas en soluciones tecnológicas"
        </p>
        
        <div className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-mono">
          © 2025 COMPULAPAZ. Todos los derechos reservados. <br className="md:hidden" />
          <span className="hidden md:inline"> | </span> 
          Desarrollado con Tecnología de Próxima Generación.
        </div>
      </div>
    </footer>
  );
};
