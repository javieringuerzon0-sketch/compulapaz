import React from 'react';

export const Hero: React.FC = () => {
  const handlePrimaryMouseOver = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const span = event.currentTarget.querySelector('span') as HTMLSpanElement | null;
    if (span) {
      span.style.background = 'none';
    }
  };

  const handlePrimaryMouseOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const span = event.currentTarget.querySelector('span') as HTMLSpanElement | null;
    if (span) {
      span.style.backgroundColor = 'rgb(5, 6, 45)';
    }
  };

  const handlePrimaryMouseDown = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = 'scale(0.9)';
  };

  const handlePrimaryMouseUp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <section
      className="relative z-10 sm:p-8 animate-scaleIn animation-delay-200 w-full max-w-7xl border rounded-3xl mt-32 mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 border-white/5 overflow-hidden"
      style={{ height: '600px' }}
    >
      <div className="absolute inset-0 -z-20 overflow-hidden rounded-3xl">
        <img
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee9b32bb-e72d-47cb-a983-ddf26a66cef2_3840w.jpg"
          srcSet="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee9b32bb-e72d-47cb-a983-ddf26a66cef2_1600w.jpg 1600w, https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee9b32bb-e72d-47cb-a983-ddf26a66cef2_3840w.jpg 3840w"
          sizes="(min-width: 1024px) 1280px, 100vw"
          alt=""
          className="hero-bg absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'saturate(1.1) contrast(1.28) brightness(1.03) sepia(0.08) hue-rotate(-6deg)' }}
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-neutral-950/20 via-neutral-950/8 to-neutral-950/25 -z-10"></div>
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.12] mix-blend-soft-light pointer-events-none -z-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.25%27/%3E%3C/svg%3E')",
          backgroundSize: '200px 200px',
        }}
      ></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-200 animate-fadeIn animation-delay-300">
            <span className="h-2 w-2 rounded-full bg-accent-cyan"></span>
            Agencia digital
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl leading-[0.98] font-heading font-semibold tracking-[-0.02em] animate-fadeInLeft animation-delay-300 text-zinc-100 max-w-[18ch]">
            Devolvemos vida y rendimiento a tus equipos
          </h1>
        </div>
      </div>

      <div className="mt-10 md:mt-0 md:absolute md:bottom-8 md:right-8 md:text-right md:max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl shadow-black/30">
          <p className="sm:text-base text-sm max-w-[42ch] animate-fadeInRight animation-delay-400 text-neutral-200 font-sans">
            Diagnostico preciso, reparacion confiable y mantenimiento completo para equipos personales, consolas y estaciones de trabajo.
          </p>
          <div className="flex gap-6 animate-fadeInUp animation-delay-500 mt-5 items-center md:justify-end">
            <a
              href="https://wa.me/526121585201"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                alignItems: 'center',
                backgroundImage:
                  'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
                border: '0px',
                borderRadius: '8px',
                boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
                boxSizing: 'border-box',
                color: 'rgb(255, 255, 255)',
                display: 'inline-flex',
                fontSize: '14px',
                justifyContent: 'center',
                lineHeight: '1em',
                maxWidth: '100%',
                minWidth: 'auto',
                padding: '3px',
                textDecoration: 'none',
                userSelect: 'none',
                touchAction: 'manipulation',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                height: '50px',
                marginTop: '0.5rem',
                transform: 'scale(0.95)',
                width: 'auto',
              }}
              onMouseOver={handlePrimaryMouseOver}
              onMouseOut={handlePrimaryMouseOut}
              onMouseDown={handlePrimaryMouseDown}
              onMouseUp={handlePrimaryMouseUp}
            >
              <span
                style={{
                  background: 'rgb(5, 6, 45)',
                  padding: '16px 24px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                Contactanos en segundos
              </span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scaleIn {
          opacity: 0;
          animation: scaleIn 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeInLeft {
          opacity: 0;
          animation: fadeInLeft 0.9s ease-out forwards;
        }
        .animate-fadeInRight {
          opacity: 0;
          animation: fadeInRight 0.9s ease-out forwards;
        }
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.9s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </section>
  );
};
