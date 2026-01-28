
import React, { useState, useRef, useEffect } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const AIDiagnostic: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || loading) return;

    setLoading(true);
    setResult('');
    setIsReady(false);

    try {
      // Production Sync: 1769563180288 - Vercel Serverless Path
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        throw new Error('Connection error');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        setIsTyping(true);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]' || data === '"[DONE]"') break;

              try {
                const parsed = JSON.parse(data);
                fullText += parsed;
                setResult(fullText);
              } catch (e) {
                // Fallback for raw strings
                if (data.startsWith('"') && data.endsWith('"')) {
                  fullText += data.slice(1, -1);
                } else {
                  fullText += data;
                }
                setResult(fullText);
              }
            }
          }
        }
        setIsTyping(false);
        setIsReady(true);
      }
    } catch (err) {
      setResult('Lo sentimos, hubo un error al conectar con el servidor de inteligencia artificial. Por favor, intenta de nuevo o contáctanos directamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resultRef.current && (isTyping || isReady)) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result, isTyping, isReady]);

  return (
    <section id="ai-help" className="py-24 relative overflow-hidden section-nitidez">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

          <div className="scanline-track">
            <div className="scanline-line"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.4)]">
                    <BrainCircuit className="h-8 w-8 text-white stroke-[1.5]" />
                  </div>
                  {(loading || isTyping) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-pink rounded-full animate-ping"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl md:text-3xl font-heading font-bold text-white uppercase tracking-tight">
                    Centro de Diagnóstico
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-[0.2em] font-mono">IA Gemini • Respuesta en tiempo real</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe qué le sucede a tu equipo (ej: 'No enciende', 'Se calienta mucho', 'Pantalla rota'...)"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan/40 focus:ring-4 focus:ring-accent-cyan/5 transition-all min-h-[160px] text-lg font-medium resize-none shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !problem.trim()}
                className={`absolute bottom-6 right-6 px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all overflow-hidden group
                  ${loading || !problem.trim()
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-accent-cyan text-white shadow-[0_10px_20px_rgba(0,217,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,217,255,0.4)] hover:-translate-y-1'
                  }`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analizando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>Iniciar Análisis IA</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {result && (
              <div
                ref={resultRef}
                className="mt-10 p-8 bg-black/45 border border-accent-cyan/20 rounded-[2rem] animate-fade-in-up shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group"
              >
                <div className="absolute top-4 right-8 flex items-center gap-2 opacity-30">
                  <Sparkles className="w-3 h-3 text-accent-cyan" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Resultado Generado</span>
                </div>

                <div className="font-mono text-sm md:text-base text-text-primary/90 whitespace-pre-line leading-relaxed tracking-tight">
                  {result}
                  {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-accent-cyan animate-pulse align-middle"></span>}
                </div>

                {isReady && (
                  <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-text-secondary">
                      <AlertCircle className="w-5 h-5 text-accent-cyan" />
                      <p className="text-[10px] font-medium max-w-[250px] leading-tight">
                        Este es un pre-diagnóstico digital. Para una solución definitiva, visítanos.
                      </p>
                    </div>
                    <a
                      href="#contacto"
                      className="w-full sm:w-auto px-8 py-4 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-heading font-bold text-[10px] rounded-xl uppercase tracking-widest hover:bg-accent-cyan hover:text-white transition-all flex items-center justify-center gap-3 group"
                    >
                      <Calendar className="w-4 h-4" />
                      Agendar en Sucursal
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
