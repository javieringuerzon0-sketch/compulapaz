
import { createDiagnosticStream } from '../server/diagnostic-agent.js';

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

export default async function handler(req, res) {
    // Configuración de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { problem } = req.body || {};
    if (!problem) {
        return res.status(400).json({ error: 'Missing problem description' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    if (!GEMINI_API_KEY) {
        console.error('Missing GEMINI_API_KEY');
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.write(`data: ${JSON.stringify(generateOfflineDiagnostic(problem))}\n\n`);
        res.write('data: "[DONE]"\n\n');
        return res.end();
    }

    try {
        const aiRes = await createDiagnosticStream({
            apiKey: GEMINI_API_KEY,
            model: GEMINI_MODEL,
            problem,
        });

        if (!aiRes.ok) {
            console.error('Gemini API Error:', await aiRes.text());
            res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
            res.write(`data: ${JSON.stringify(generateOfflineDiagnostic(problem))}\n\n`);
            res.write('data: "[DONE]"\n\n');
            return res.end();
        }

        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

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
                        res.write(`data: ${JSON.stringify(textContent)}\n\n`);
                    }
                } catch (e) { }
            }
        }

        res.write('data: "[DONE]"\n\n');
        res.end();
    } catch (error) {
        console.error('Diagnostic error:', error);
        res.status(500).json({ error: 'Internal system error' });
    }
}
