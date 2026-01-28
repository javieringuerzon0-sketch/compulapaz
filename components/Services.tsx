
import React from 'react';
import { Wrench, Sparkles, Globe, Gamepad2, Zap, HeadsetIcon } from 'lucide-react';

const SERVICE_DATA = [
  {
    icon: Wrench,
    title: 'Reparación de Hardware',
    desc: 'Diagnóstico y reparación de componentes físicos con garantía total.',
    list: ['Fallas de encendido', 'Cambio de pantallas', 'Reparación de tarjetas']
  },
  {
    icon: Sparkles,
    title: 'Mantenimiento',
    desc: 'Prolonga la vida útil de tus equipos con limpieza profesional profunda.',
    list: ['Limpieza de ventiladores', 'Pasta térmica nueva', 'Optimización de sistema']
  },
  {
    icon: Globe,
    title: 'Redes & WiFi',
    desc: 'Diseño e instalación de redes empresariales y domésticas de alta velocidad.',
    list: ['Configuración WiFi 6', 'Cableado estructurado', 'Seguridad de red']
  },
  {
    icon: Gamepad2,
    title: 'Venta de Equipos',
    desc: 'Equipos personalizados para gaming, oficina o diseño profesional.',
    list: ['Workstations', 'Laptops última gen', 'Periféricos premium']
  },
  {
    icon: Zap,
    title: 'Actualización',
    desc: 'No compres una nueva, ¡mejora la que ya tienes! Upgrades de alta velocidad.',
    list: ['Discos SSD (10x más rápido)', 'Expansión de RAM', 'Nuevos procesadores']
  },
  {
    icon: HeadsetIcon,
    title: 'Soporte Técnico',
    desc: 'Asistencia técnica inmediata de forma remota o presencial.',
    list: ['Remoción de virus', 'Respaldo de datos', 'Capacitación personalizada']
  }
];

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-bg-secondary/50 border-y border-white/5 relative z-10 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent-cyan uppercase mb-4 tracking-tight">
            Servicios Especializados
          </h2>
          <p className="text-text-secondary uppercase tracking-widest font-bold text-sm">Tecnología de punta a tu alcance</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_DATA.map((service, idx) => (
            <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-accent-cyan/5 hover:border-accent-cyan/30 transition-all duration-300 group">
              <service.icon className="w-12 h-12 mb-6 text-accent-cyan transform group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold text-accent-cyan mb-4 uppercase tracking-wide">{service.title}</h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed font-medium">{service.desc}</p>
              <ul className="space-y-3">
                {service.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-text-primary">
                    <span className="text-accent-pink">▶</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
