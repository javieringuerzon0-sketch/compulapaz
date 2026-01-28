import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDiagnosticStream } from './diagnostic-agent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const loadEnvFile = (fileName) => {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;
  const contents = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf('=');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const PORT = Number(process.env.AI_SERVER_PORT || process.env.PORT || 8787);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const ALLOWED_ORIGIN = process.env.AI_ALLOWED_ORIGIN || '*';

const generateOfflineDiagnostic = (problem) => {
  const text = (problem || '').toLowerCase();
  let detail = "Detectamos un comportamiento inusual que sugiere una falla interna de hardware, posiblemente relacionada con la placa lógica o el suministro de energía.";
  let causa = "Esto suele ocurrir por picos de tensión, desgaste de componentes o fallas en los circuitos integrados.";
  let consejo = "Lo más importante ahora es no intentar encender el equipo repetidamente para evitar daños mayores.";

  if (/(enciende|prende|inicia|arranca|corriente|muerta|muerto)/.test(text)) {
    detail = "Entendemos lo preocupante que es que tu equipo no dé señales de vida. Según tu descripción, esto apunta directamente a una falla crítica en la etapa de potencia o el circuito de carga de la placa base.";
    causa = "Es probable que algún componente de protección (como un mosfet o capacitor) esté en corto, o que el circuito de gestión de energía esté bloqueado.";
    consejo = "Evita usar cargadores universales o genéricos por el momento.";
  } else if (/(apaga|calienta|temperatura|ventilador|ruido|quemado|humo|exploto|estallo)/.test(text)) {
    detail = "Este síntoma (sobrecalentamiento o ruidos inusuales) es una señal de auxilio crítica de tu hardware. El sistema se protege apagándose para evitar que el procesador o la tarjeta de video se dañen permanentemente.";
    causa = "Generalmente se debe a una falla en el sistema de enfriamiento, pasta térmica seca o, en caso de ruidos u olores, un componente eléctrico que ha fallado por sobrecarga.";
    consejo = "Te recomendamos desconectar el equipo de la corriente de inmediato si hubo olor o humo.";
  } else if (/(lenta|lento|tarda|traba|congela|pantallazo|azul)/.test(text)) {
    detail = "Experimentar lentitud o bloqueos es una señal clara de que el sistema operativo o el hardware de almacenamiento están bajo mucho estrés.";
    causa = "Posiblemente tu unidad de disco tiene fallas mecánicas/lógicas latentes o hay una saturación crítica de recursos de memoria RAM.";
    consejo = "Una actualización a tecnología SSD es la solución definitiva para devolverle la velocidad a tu equipo.";
  }

  return `Hola, gracias por consultarnos en COMPULAPAZ. Respecto a lo que nos comentas: ${detail}\n\n${causa} ${consejo}\n\nNuestros técnicos especializados pueden realizar una revisión profunda para darte una solución definitiva. Te invitamos a nuestra sucursal en La Paz para un diagnóstico presencial 100% GRATUITO. ¡Estamos aquí para ayudarte!`;
};

const applyCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const writeSse = (res, data) => {
  if (data === undefined || data === null) return;
  // Enviamos como JSON para preservar saltos de línea y caracteres especiales
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = requestUrl.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/api/diagnostic') {
    applyCors(res);
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    if (req.method !== 'POST') { sendJson(res, 405, { error: 'Method not allowed' }); return; }

    try {
      let bodyData = '';
      for await (const chunk of req) bodyData += chunk.toString('utf8');
      const payload = JSON.parse(bodyData || '{}');
      const problem = payload.problem;

      if (!problem) { sendJson(res, 400, { error: 'Missing problem' }); return; }

      if (!GEMINI_API_KEY) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        });
        res.write(':ok\n\n');
        writeSse(res, generateOfflineDiagnostic(problem));
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      const aiRes = await createDiagnosticStream({
        apiKey: GEMINI_API_KEY,
        model: GEMINI_MODEL,
        problem,
      });

      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
      res.write(':ok\n\n');

      if (!aiRes.ok) {
        const errText = await aiRes.text().catch(() => '');
        console.error('Gemini API Error:', aiRes.status, errText);
        writeSse(res, generateOfflineDiagnostic(problem));
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      const reader = aiRes.body.getReader();
      const decoder = new TextDecoder();
      let streamBuffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        streamBuffer += decoder.decode(value, { stream: true });
        const parts = streamBuffer.split('\n');
        streamBuffer = parts.pop() || '';

        for (const line of parts) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

          try {
            const jsonStr = trimmedLine.slice(5).trim();
            const json = JSON.parse(jsonStr);
            const textContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textContent) {
              writeSse(res, textContent);
            }
          } catch (e) { }
        }
      }

      if (streamBuffer.trim().startsWith('data:')) {
        try {
          const json = JSON.parse(streamBuffer.trim().slice(5).trim());
          const textContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textContent) writeSse(res, textContent);
        } catch (e) { }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      console.error('Error:', error);
      sendJson(res, 500, { error: 'Internal error' });
    }
    return;
  }

  applyCors(res);
  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
