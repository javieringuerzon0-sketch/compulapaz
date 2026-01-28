
import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: '"El servicio aquí fue más allá de las expectativas. Mi computadora quedó como nueva y el precio fue muy justo. Definitivamente los mejores en La Paz."',
    name: 'María Rodríguez',
    role: 'Diseñadora Digital',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    stars: 5
  },
  {
    text: '"Excelente atención y muy profesionales. Resolvieron mi problema de hardware en tiempo récord. Super recomendados para cualquier reparación técnica."',
    name: 'Carlos Mendoza',
    role: 'Estudiante de Ingeniería',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
    stars: 5
  },
  {
    text: '"Más de 10 años de experiencia se nota. Muy eficientes, honestos y con precios competitivos. Mi equipo gaming ahora vuela con el nuevo SSD."',
    name: 'Lucía Torres',
    role: 'Arquitecta',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop',
    stars: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent"></div>
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent-cyan uppercase mb-4 tracking-tight">
            Clientes Satisfechos
          </h2>
          <p className="text-text-secondary uppercase tracking-widest font-bold text-sm">La confianza de La Paz nos respalda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="group bg-bg-secondary/40 border border-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] relative transition-all duration-500 hover:border-accent-cyan/20 hover:bg-bg-secondary/60 hover:-translate-y-2 shadow-xl hover:shadow-accent-cyan/5"
            >
              {/* Floating Quote Icon */}
              <span className="absolute top-4 right-8 text-7xl text-accent-cyan/5 font-mono leading-none group-hover:text-accent-cyan/10 transition-colors">"</span>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500 blur-[0.5px] drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  ))}
                </div>

                <p className="text-text-secondary italic mb-8 leading-relaxed font-sans text-sm md:text-base">
                  {t.text}
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  {/* Avatar with tech frame */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-accent-cyan to-accent-purple rounded-full blur-[2px] opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-bg-secondary"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-secondary rounded-full"></div>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-white uppercase tracking-wider text-sm">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-accent-cyan font-bold uppercase tracking-[0.2em] font-mono">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 right-2 w-4 h-[2px] bg-accent-cyan"></div>
                <div className="absolute bottom-2 right-2 w-[2px] h-4 bg-accent-cyan"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Badge */}
        <div className="mt-16 flex justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <CheckCircle className="text-accent-cyan w-5 h-5" />
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em]">Reseñas verificadas vía Google Maps & Facebook</span>
          </div>
        </div>
      </div>
    </section>
  );
};
