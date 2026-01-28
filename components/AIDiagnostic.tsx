
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CalendarCheck } from 'lucide-react';

export const AIDiagnostic: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!problem.trim()) {
      setIsReady(false);
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    setIsReady(false);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setIsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [problem]);

  const handleDiagnostic = async () => {
    if (!problem.trim()) return;

    setLoading(true);
    setResult(null);
    setIsReady(false);

    const generateOfflineDiagnostic = (input: string) => {
      const text = input.toLowerCase();
      let diagnostico = 'Posible fallo general del sistema.';
      let causas = 'Software o hardware con fallas leves.';
      let accion = 'Reinicia, verifica cables y elimina perifericos externos.';
      let extra = 'Si persiste, trae el equipo para revision profesional.';
      let nota = 'Podemos validar en taller con diagnostico completo.';

      if (/(no enciende|no prende|no inicia|no arranca|no da corriente)/.test(text)) {
        diagnostico = 'Posible falla de energia, fuente o bateria.';
        causas = 'Adaptador, fuente interna o bateria degradada.';
        accion = 'Prueba otro cargador/toma y revisa el boton de encendido.';
      } else if (/(se apaga|sobrecalienta|calienta|apaga solo)/.test(text)) {
        diagnostico = 'Posible sobrecalentamiento o ventilacion obstruida.';
        causas = 'Polvo, pasta termica seca o ventilador fallando.';
        accion = 'Limpieza interna y cambio de pasta termica.';
      } else if (/(pantalla negra|no da imagen|sin video|pantalla|gpu)/.test(text)) {
        diagnostico = 'Posible problema de video, pantalla o RAM.';
        causas = 'Modulo RAM, flex de pantalla o GPU inestable.';
        accion = 'Prueba RAM/monitor y revisa conexiones internas.';
      } else if (/(lento|lenta|se traba|congela|tarda)/.test(text)) {
        diagnostico = 'Sistema con almacenamiento lento o saturado.';
        causas = 'Disco degradado, poco RAM o exceso de programas.';
        accion = 'Limpieza de sistema y revision de SSD/RAM.';
      } else if (/(wifi|internet|red|no conecta)/.test(text)) {
        diagnostico = 'Falla de red o configuracion inestable.';
        causas = 'Drivers, modem o señal inestable.';
        accion = 'Reinicia modem/router y revisa drivers de red.';
      } else if (/(teclado|touchpad|mouse|usb|puerto)/.test(text)) {
        diagnostico = 'Posible desgaste o daño en puertos/perifericos.';
        causas = 'Conectores flojos o soldadura fatigada.';
        accion = 'Prueba otro puerto y revisa soldaduras internas.';
      } else if (/(virus|malware|publicidad|pop)/.test(text)) {
        diagnostico = 'Posible infeccion o software malicioso.';
        causas = 'Descargas inseguras o software no confiable.';
        accion = 'Escaneo profundo y limpieza de sistema.';
      } else if (/(consola|ps4|ps5|xbox|switch)/.test(text)) {
        diagnostico = 'Falla comun de hardware en consola.';
        causas = 'Temperatura elevada o fuente inestable.';
        accion = 'Revision de temperatura, fuente y limpieza interna.';
      } else if (/(disco|ssd|hdd|almacenamiento)/.test(text)) {
        diagnostico = 'Posible falla de disco o rendimiento degradado.';
        causas = 'Sectores dañados o desgaste del SSD.';
        accion = 'Diagnostico SMART y clonacion si es necesario.';
      }

      return `Diagnostico rapido: ${diagnostico}\nPosibles causas: ${causas}\nAccion recomendada: ${accion}\n${extra}\n${nota}`;
    };

    try {
      // Acceso a la API Key
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setResult('Error: API Key no configurada. Contacta al administrador.');
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Actua como tecnico experto de COMPULAPAZ, un taller de reparacion de computadoras y consolas.
Responde en maximo 6 lineas, con diagnostico corto y accion recomendada.
No uses Markdown ni caracteres especiales.
Problema del cliente: ${problem}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text || 'No se pudo generar un diagnostico. Intenta de nuevo.');
    } catch (error: any) {
      console.error('Diagnostic error:', error);
      setResult(`Error de IA: ${error.message || 'Error desconocido'}. Por favor, contactanos directamente.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 relative z-10">
      <style>{`
        @keyframes fadeInUpCustom { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scanline {
          0% { top: -6px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% + 6px); opacity: 0; }
        }
        @keyframes pulseGreen { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        .animate-fade-in-up { animation: fadeInUpCustom 0.6s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .scanline-track {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 40;
        }
        .scanline-line {
          position: absolute;
          left: 0;
          right: 0;
          top: -6px;
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(125,211,252,0.9), transparent);
          filter: blur(0.6px);
          animation: scanline 2.2s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-1 rounded-[2.75rem] bg-gradient-to-r from-accent-cyan/25 via-accent-purple/20 to-accent-pink/20 blur-2xl opacity-70"></div>
        <div className="relative bg-bg-secondary/70 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_35px_90px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_55%)]"></div>
          <div className="absolute inset-0 opacity-35 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_40%)]"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"></div>
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-accent-cyan/15 blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-accent-pink/10 blur-3xl"></div>
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          <div className="scanline-track">
            <div className="scanline-line"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 animate-fade-in-up">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center shadow-[0_0_30px_rgba(125,211,252,0.45)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    >
                      <circle cx="5" cy="5" r="2"></circle>
                      <circle cx="19" cy="5" r="2"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                      <circle cx="5" cy="19" r="2"></circle>
                      <circle cx="19" cy="19" r="2"></circle>
                      <path d="M7 5h10"></path>
                      <path d="M6.5 6.5l4 4"></path>
                      <path d="M17.5 6.5l-4 4"></path>
                      <path d="M6.5 17.5l4-4"></path>
                      <path d="M17.5 17.5l-4-4"></path>
                      <path d="M7 19h10"></path>
                    </svg>
                  </div>
                  {(loading || isTyping) && (
                    <div className="absolute -inset-1 border-2 border-accent-cyan rounded-2xl animate-ping opacity-30"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white uppercase tracking-tight">Centro de Diagnostico</h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400' : 'bg-accent-cyan'} animate-pulse`}></span>
                    <span className="text-accent-cyan text-[10px] font-bold uppercase tracking-[0.35em]">IA Gemini 2025</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-bold">Analisis preliminar</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-bold">Respuesta</p>
                  <p className="text-lg font-heading font-semibold text-white">2-5 min</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-bold">Soporte</p>
                  <p className="text-lg font-heading font-semibold text-white">Local</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe el sintoma de tu equipo..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:border-accent-cyan/60 h-40 resize-none font-mono text-sm animate-fade-in-up delay-1 shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]"
              />

              <button
                onClick={handleDiagnostic}
                disabled={loading || !problem.trim()}
                className="w-full py-5 bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-primary font-heading font-bold rounded-2xl hover:brightness-110 transition-all disabled:opacity-30 shadow-[0_15px_35px_rgba(125,211,252,0.25)] animate-fade-in-up delay-2"
              >
                {loading ? 'ANALIZANDO...' : 'INICIAR ANALISIS IA'}
              </button>

              {result && (
                <div className="mt-10 p-8 bg-black/45 border border-accent-cyan/20 rounded-[2rem] animate-fade-in-up delay-3">
                  <div className="bg-bg-secondary/80 rounded-xl p-6 border border-white/5 font-mono text-sm text-text-primary/90 whitespace-pre-line">
                    {result}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <a href="#contacto" className="flex items-center gap-2 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-heading font-bold text-xs rounded-xl uppercase tracking-widest hover:bg-accent-cyan hover:text-white transition-all">
                      <CalendarCheck className="w-4 h-4" />
                      Agendar Ahora
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
