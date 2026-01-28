import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDiagnosticText } from './diagnostic-agent.js';

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
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const problem = process.argv.slice(2).join(' ').trim();

if (!problem) {
  console.error('Uso: node server/diagnostic-cli.js "Describe el problema"');
  process.exit(1);
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

if (!OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY missing');
  process.exit(1);
}

try {
  const diagnosis = await createDiagnosticText({
    apiKey: OPENAI_API_KEY,
    model: OPENAI_MODEL,
    problem,
  });
  console.log(diagnosis);
} catch (error) {
  console.error('ERROR: OpenAI request failed');
  process.exit(1);
}
