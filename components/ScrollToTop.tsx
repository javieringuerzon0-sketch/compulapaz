
import React, { useState, useEffect } from 'react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 left-8 w-14 h-14 rounded-2xl bg-bg-secondary/80 backdrop-blur-md border border-accent-cyan/30 text-accent-cyan flex items-center justify-center text-2xl shadow-2xl transition-all duration-500 z-[100] group overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Moving lines effect on hover */}
      <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent-cyan/50 animate-[scanline_2s_linear_infinite]"></div>
      </div>

      <span className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
        ↑
      </span>
      
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(56px); }
        }
      `}</style>
    </button>
  );
};
