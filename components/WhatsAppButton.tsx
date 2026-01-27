
import React from 'react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/526121585201?text=Hola,%20vengo%20de%20la%20web%20y%20necesito%20ayuda%20con%20mi%20computadora" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform z-[100] animate-bounce"
      style={{ animationDuration: '2s' }}
    >
      <span aria-hidden="true">💬</span>
    </a>
  );
};
