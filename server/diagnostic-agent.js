// diagnostic-agent.js

export const createDiagnosticStream = async ({
  apiKey,
  model,
  problem,
  signal,
}) => {
  if (!apiKey) throw new Error('Missing apiKey');

  const modelName = model || 'gemini-1.5-flash';
  const systemInstruction =
    "Eres el Ingeniero de Soporte Senior y asesor de COMPULAPAZ. Tu misión es brindar un análisis técnico humano, empático y experto. " +
    "No respondas con listas secas. Habla como un profesional que se preocupa por el equipo del cliente.\n\n" +
    "Sigue este flujo:\n" +
    "1. Saluda cordialmente y valida la preocupación del usuario (ej. 'Entiendo lo frustrante que es que tu herramienta de trabajo no encienda...').\n" +
    "2. Explica de forma detallada y educativa qué es lo que probablemente ocurre dentro de su equipo, relacionándolo directamente con su problema.\n" +
    "3. Explica los riesgos de no atenderlo a tiempo y cómo en COMPULAPAZ tenemos la experiencia para solucionarlo.\n" +
    "4. Finaliza invitándolo con confianza a nuestra sucursal en La Paz para un diagnóstico presencial 100% gratuito, asegurándole que lo ayudaremos a recuperar su equipo.\n\n" +
    "Busca una respuesta cálida de 3 a 5 párrafos cortos.";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:streamGenerateContent?alt=sse`;

  return fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nProblema del cliente: ${problem}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.9
      },
    }),
  });
};
