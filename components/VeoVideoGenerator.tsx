
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const LOADING_MESSAGES = [
  "Iniciando motores de renderizado Veo...",
  "Analizando arquitectura del equipo...",
  "Sincronizando fotogramas con el mañana...",
  "Estabilizando flujo de energía IA...",
  "Finalizando animación cinemática..."
];

export const VeoVideoGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const statusIntervalRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [cleanup, videoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageType(file.type || 'image/png');
        setVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const generateVideo = async () => {
    if (!image) return;

    try {
      const runtime = globalThis as typeof globalThis & {
        aistudio?: {
          hasSelectedApiKey?: () => Promise<boolean>;
          openSelectKey?: () => Promise<void>;
        };
        process?: {
          env?: Record<string, string | undefined>;
        };
      };
      const aistudio = runtime.aistudio;
      if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey && typeof aistudio.openSelectKey === 'function') {
          await aistudio.openSelectKey();
        }
      }

      setLoading(true);
      setStatusIndex(0);
      statusIntervalRef.current = window.setInterval(() => {
        setStatusIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 7000);

      const env = runtime.process?.env;
      const apiKey = env?.API_KEY || env?.GEMINI_API_KEY;
      if (!apiKey) {
        alert('Se necesita una clave de API válida para generar el video. Contáctanos para activarlo.');
        cleanup();
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const base64Data = image.split(',')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic high-tech animation of this computer hardware with blue glowing neon accents and smooth camera movement.',
        image: {
          imageBytes: base64Data,
          mimeType: imageType || 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling robusto
      let attempts = 0;
      const maxAttempts = 60; // 10 minutos aprox

      while (!operation.done && attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        if (!operation) break;
      }

      cleanup();

      const uri = operation?.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        const keyUrl = uri.includes('?') ? `${uri}&key=${apiKey}` : `${uri}?key=${apiKey}`;
        const response = await fetch(keyUrl);
        if (!response.ok) throw new Error('Error al descargar el video');
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error('No se recibió la URL del video.');
      }
    } catch (error) {
      console.error('Video error:', error);
      cleanup();
      const message = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Error en el laboratorio: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
      {!image && !loading && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleUploadKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Subir imagen"
          className="w-full aspect-video border-2 border-dashed border-accent-cyan/30 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-accent-cyan/5 transition-all group"
        >
          <div className="text-5xl mb-4"><span role="img" aria-label="Foto">📸</span></div>
          <p className="text-accent-cyan font-heading font-bold uppercase tracking-widest text-sm text-center px-4">Sube foto de tu equipo para animar</p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
      )}

      {image && !loading && !videoUrl && (
        <div className="w-full space-y-4">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/20">
            <img src={image} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button onClick={generateVideo} className="px-6 py-3 bg-accent-cyan text-bg-primary font-heading font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
                ANIMAR EQUIPO
              </button>
            </div>
            <button
              onClick={() => {
                setImage(null);
                setImageType(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full text-white"
              aria-label="Quitar imagen"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="w-full aspect-video bg-bg-secondary/80 rounded-3xl flex flex-col items-center justify-center p-8 border border-accent-cyan/20">
          <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-accent-cyan font-heading font-bold uppercase tracking-widest text-center text-xs animate-pulse">
            {LOADING_MESSAGES[statusIndex]}
          </p>
        </div>
      )}

      {videoUrl && (
        <div className="w-full space-y-4 animate-fade-in">
          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-accent-cyan shadow-2xl">
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
          </div>
          <button
            onClick={() => {
              setImage(null);
              setImageType(null);
              setVideoUrl(null);
            }}
            className="w-full py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5"
          >
            Nueva Animación
          </button>
        </div>
      )}
    </div>
  );
};
