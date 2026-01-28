import React, { useEffect, useRef, useState } from 'react';

const contactMaskStyle = {
  maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
} as React.CSSProperties;

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting'>('idle');
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: 'Reparacion de Hardware',
    fecha: '',
    mensaje: ''
  });
  const [emailError, setEmailError] = useState('');
  const services = [
    'Reparacion de Hardware',
    'Mantenimiento Preventivo',
    'Limpieza Profunda',
    'Cambio de Pasta Termica',
    'Eliminacion de Virus/Malware',
    'Formateo e Instalacion de Sistema',
    'Recuperacion de Datos',
    'Backups y Migracion',
    'Actualizacion de BIOS/Firmware',
    'Cambio de Bateria',
    'Reparacion de Pantalla',
    'Reparacion de Consolas',
    'Armado de PC',
    'Optimizacion de Rendimiento',
    'Redes y WiFi',
    'Actualizacion (SSD/RAM)',
    'Instalacion de Software',
    'Diagnostico Avanzado',
    'Soporte Remoto',
    'Venta de Equipo',
    'Otro'
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError('');
  };

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, servicio: value }));
    setIsServiceOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (serviceDropdownRef.current && target && !serviceDropdownRef.current.contains(target)) {
        setIsServiceOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleOutsideClick);
    return () => window.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(formData.email)) {
      setEmailError('Por favor ingresa un correo electronico valido.');
      return;
    }

    setFormState('submitting');

    const phone = '526121585201';
    const message = `*NUEVA SOLICITUD DE CITA - COMPULAPAZ*%0A%0A` +
      `👤 *Cliente:* ${formData.nombre}%0A` +
      `📧 *Correo:* ${formData.email}%0A` +
      `🛠️ *Servicio:* ${formData.servicio}%0A` +
      `📅 *Fecha solicitada:* ${formData.fecha}%0A` +
      `📝 *Mensaje:* ${formData.mensaje}%0A%0A` +
      `_Enviado desde el portal web._`;

    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormState('idle');
      setFormData({
        nombre: '',
        email: '',
        servicio: 'Reparacion de Hardware',
        fecha: '',
        mensaje: ''
      });
    }, 800);
  };

  return (
    <section
      id="contacto"
      className="md:pt-40 bg-center z-[70] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77f55872-adf5-4910-9a7c-d21c0041bbe1_3840w.webp)] bg-cover pt-40 pb-40 relative scroll-mt-24"
      style={contactMaskStyle}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="contact-stars contact-stars-slow" aria-hidden="true"></div>
        <div className="contact-stars contact-stars-fast" aria-hidden="true"></div>
        <div className="contact-glow" aria-hidden="true"></div>
        <div className="contact-planet-mask absolute inset-0">
          <div className="contact-planet-spin absolute inset-0">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77f55872-adf5-4910-9a7c-d21c0041bbe1_3840w.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'brightness(1.2) contrast(1.1) saturate(1.1)' }}
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          className="absolute -left-40 top-10 h-[70vh] w-[60vh] rounded-full blur-3xl opacity-25"
          style={{
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.15), rgba(0,0,0,0))'
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-primary animate-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M4 6l8 5 8-5"></path>
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            </svg>
            Agenda premium
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl tracking-tight font-semibold text-text-primary animate-in" data-delay="100">
            Tu equipo listo, <span className="italic font-heading font-medium text-text-secondary">sin perder tiempo</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto animate-in" data-delay="200">
            Agenda tu reparacion con diagnostico claro, tiempos reales y atencion profesional para PC, laptops y consolas.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur animate-in premium-card" data-delay="300">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Enviar una solicitud</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-nombre" className="block text-sm font-medium text-text-secondary mb-2">Nombre</label>
                  <input
                    type="text"
                    id="contact-nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-text-primary placeholder-text-secondary/60 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">Correo</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-text-primary placeholder-text-secondary/60 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                  {emailError && <p className="mt-2 text-xs text-accent-pink font-semibold">{emailError}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-servicio" className="block text-sm font-medium text-text-secondary mb-2">Servicio</label>
                  <div className="relative" ref={serviceDropdownRef}>
                    <button
                      id="contact-servicio"
                      type="button"
                      className="contact-select w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-text-primary focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 flex items-center justify-between gap-3"
                      aria-haspopup="listbox"
                      aria-expanded={isServiceOpen}
                      onClick={() => setIsServiceOpen(prev => !prev)}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') setIsServiceOpen(false);
                        if (event.key === 'ArrowDown') setIsServiceOpen(true);
                      }}
                    >
                      <span className="text-sm sm:text-base text-text-primary truncate">{formData.servicio}</span>
                      <span className={`text-xs text-text-secondary transition-transform ${isServiceOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isServiceOpen && (
                      <div
                        role="listbox"
                        aria-label="Servicios"
                        className="contact-select-menu absolute left-0 top-full mt-2 w-full rounded-lg border border-white/10 bg-bg-primary/95 backdrop-blur max-h-64 overflow-auto shadow-2xl"
                      >
                        {services.map((service) => (
                          <button
                            type="button"
                            key={service}
                            role="option"
                            aria-selected={service === formData.servicio}
                            className="contact-select-option w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
                            onClick={() => handleServiceSelect(service)}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-fecha" className="block text-sm font-medium text-text-secondary mb-2">Fecha</label>
                  <div className="contact-date-wrap flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20">
                    <input
                      type="date"
                      id="contact-fecha"
                      name="fecha"
                      required
                      value={formData.fecha}
                      onChange={handleInputChange}
                      ref={dateInputRef}
                      className="contact-date-input flex-1 min-w-0 bg-transparent py-3 text-[14px] sm:text-[15px] text-text-primary focus:outline-none [color-scheme:dark]"
                    />
                    <button
                      type="button"
                      aria-label="Abrir calendario"
                      className="contact-date-button flex-shrink-0 inline-flex h-[26px] w-[26px] items-center justify-center rounded-md border border-white/10 bg-white/5 text-text-secondary transition-colors hover:text-text-primary"
                      onClick={() => {
                        if (dateInputRef.current?.showPicker) {
                          dateInputRef.current.showPicker();
                        } else {
                          dateInputRef.current?.focus();
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="contact-mensaje" className="block text-sm font-medium text-text-secondary mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  id="contact-mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-text-primary placeholder-text-secondary/60 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                  placeholder="Cuéntanos el problema de tu equipo..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-text-primary hover:bg-white/15 transition"
              >
                <span className="font-medium">
                  {formState === 'submitting' ? 'Enviando...' : 'Enviar solicitud'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </button>
              <p className="text-[11px] text-text-secondary mt-3">
                Seras redirigido a WhatsApp para confirmar los detalles finales.
              </p>
            </form>
          </div>

          <div className="space-y-8">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur animate-in premium-card" data-delay="400">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-text-primary"
                  >
                    <path d="M4 6l8 5 8-5"></path>
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Correo</h3>
                  <a href="mailto:servicios@compulapaz.com" className="text-text-secondary">
                    servicios@compulapaz.com
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur animate-in premium-card" data-delay="500">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Celular</h3>
                  <a href="tel:6121585201" className="text-text-secondary">
                    612 158 5201
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur animate-in premium-card" data-delay="600">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 p-3 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-text-primary"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Ubicacion</h3>
                  <a
                    href="https://www.google.com/maps?q=Constitucion+713,+Zona+Central,+La+Paz,+BCS+23000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:underline"
                  >
                    Constitucion 713, Zona Central, La Paz, BCS 23000
                  </a>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur animate-in" data-delay="700">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Siguenos</h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/compulapaz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-text-secondary hover:text-white hover:bg-[#1877F2] transition"
                  title="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.09 4.39 23.06 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.69 4.56-4.69 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.28h3.35l-.54 3.49h-2.81V24C19.61 23.06 24 18.09 24 12.07Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/compulapaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-text-secondary hover:text-white hover:bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)] transition"
                  title="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42.55.22.95.49 1.36.9.41.41.68.81.9 1.36.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22-.22.55-.49.95-.9 1.36-.41.41-.81.68-1.36.9-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42-.55-.22-.95-.49-1.36-.9-.41-.41-.68-.81-.9-1.36-.17-.42-.37-1.05-.42-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.22-.55.49-.95.9-1.36.41-.41.81-.68 1.36-.9.42-.17 1.05-.37 2.22-.42C8.42 2.17 8.8 2.16 12 2.16Zm0-2.16C8.73 0 8.33.01 7.05.07c-1.3.06-2.19.27-2.97.58a5.98 5.98 0 0 0-2.16 1.4A5.98 5.98 0 0 0 .52 4.22C.21 5 .01 5.9.07 7.2.13 8.48.14 8.88.14 12s-.01 3.52-.07 4.8c-.06 1.3.14 2.2.45 2.98.3.78.72 1.45 1.4 2.16a5.98 5.98 0 0 0 2.16 1.4c.78.31 1.67.51 2.97.58 1.28.06 1.68.07 4.95.07s3.67-.01 4.95-.07c1.3-.06 2.2-.27 2.98-.58a5.98 5.98 0 0 0 2.16-1.4 5.98 5.98 0 0 0 1.4-2.16c.31-.78.51-1.68.58-2.98.06-1.28.07-1.68.07-4.95s-.01-3.67-.07-4.95c-.06-1.3-.27-2.2-.58-2.98a5.98 5.98 0 0 0-1.4-2.16A5.98 5.98 0 0 0 19.78.52C19 .21 18.1.01 16.8.07 15.52.13 15.12.14 12 .14Z" />
                    <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                    <circle cx="18.4" cy="5.6" r="1.44" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/526121585201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-text-secondary hover:text-white hover:bg-[#25D366] transition"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.52 3.49A11.81 11.81 0 0 0 12.04 0C5.48 0 .16 5.31.16 11.86c0 2.08.54 4.11 1.57 5.9L0 24l6.38-1.67a11.78 11.78 0 0 0 5.66 1.44h.01c6.56 0 11.88-5.31 11.88-11.86 0-3.17-1.24-6.15-3.41-8.42ZM12.05 21.1h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.79.99 1.01-3.69-.24-.38a9.88 9.88 0 0 1-1.5-5.25c0-5.45 4.45-9.89 9.93-9.89a9.83 9.83 0 0 1 7 2.9 9.82 9.82 0 0 1 2.92 7c0 5.45-4.45 9.89-9.91 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-25 w-[60%] h-8"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)'
          }}
        ></div>
        <div className="h-px bg-white/10 w-full"></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-15deg); }
          to { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes starsDriftSlow {
          from { background-position: 0 0, 0 0, 0 0; }
          to { background-position: 220px 160px, -180px 120px, 140px -220px; }
        }
        @keyframes starsDriftFast {
          from { background-position: 0 0, 0 0; }
          to { background-position: -260px 200px, 320px -240px; }
        }
        @keyframes glowPulse {
          0% { opacity: 0.22; transform: translate3d(0, 0, 0) scale(1); }
          50% { opacity: 0.45; transform: translate3d(-2%, 1%, 0) scale(1.05); }
          100% { opacity: 0.22; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes contactPlanetSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .premium-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-card:hover {
          transform: translateY(-4px);
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 217, 255, 0.1);
        }
        .contact-stars {
          position: absolute;
          inset: -20%;
          mix-blend-mode: screen;
          opacity: 0.35;
          background-repeat: repeat;
          filter: drop-shadow(0 0 6px rgba(125, 211, 252, 0.35));
        }
        .contact-stars-slow {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.7) 0, transparent 60%),
            radial-gradient(1px 1px at 70% 30%, rgba(125,211,252,0.7) 0, transparent 60%),
            radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.6) 0, transparent 60%);
          background-size: 240px 240px, 320px 320px, 280px 280px;
          animation: starsDriftSlow 60s linear infinite;
        }
        .contact-stars-fast {
          background-image:
            radial-gradient(1.5px 1.5px at 15% 10%, rgba(255,255,255,0.7) 0, transparent 60%),
            radial-gradient(1.5px 1.5px at 60% 60%, rgba(255,255,255,0.7) 0, transparent 60%);
          background-size: 180px 180px, 220px 220px;
          opacity: 0.22;
          animation: starsDriftFast 32s linear infinite;
        }
        .contact-glow {
          position: absolute;
          inset: -10% 0 0 0;
          background:
            radial-gradient(40% 40% at 70% 30%, rgba(0, 217, 255, 0.35), transparent 65%),
            radial-gradient(35% 35% at 30% 70%, rgba(240, 171, 252, 0.3), transparent 70%);
          animation: glowPulse 8s ease-in-out infinite;
        }
        .contact-planet-mask {
          --planet-x: 72%;
          --planet-y: 46%;
          --planet-size: 22%;
          clip-path: circle(var(--planet-size) at var(--planet-x) var(--planet-y));
        }
        .contact-planet-spin {
          transform-origin: var(--planet-x) var(--planet-y);
          animation: contactPlanetSpin 14s linear infinite;
          will-change: transform;
        }
        .contact-select {
          color: #e2e8f0;
          background-color: rgba(255, 255, 255, 0.06);
        }
        .contact-select-menu {
          scrollbar-width: thin;
        }
        .contact-select-option[aria-selected="true"] {
          color: #f8fafc;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .contact-date-wrap {
          background-image: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 8px 20px rgba(0,0,0,0.25);
        }
        .contact-date-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
        }
        .contact-date-input::-webkit-datetime-edit {
          color: #e2e8f0;
        }
        .contact-date-input::-webkit-datetime-edit-year-field {
          padding-right: 0.25rem;
          min-width: 3.6em;
        }
        .contact-date-input::-webkit-datetime-edit-year-field {
          padding-right: 0.35rem;
          min-width: 3.4em;
        }
        .animate-in {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-in[data-delay="100"] { animation-delay: 100ms; }
        .animate-in[data-delay="200"] { animation-delay: 200ms; }
        .animate-in[data-delay="300"] { animation-delay: 300ms; }
        .animate-in[data-delay="400"] { animation-delay: 400ms; }
        .animate-in[data-delay="500"] { animation-delay: 500ms; }
        .animate-in[data-delay="600"] { animation-delay: 600ms; }
        @media (prefers-reduced-motion: reduce) {
          .contact-planet-spin { animation: none; }
          .contact-stars-slow { animation: none; }
          .contact-stars-fast { animation: none; }
          .contact-glow { animation: none; }
        }
      `}</style>
    </section>
  );
};
