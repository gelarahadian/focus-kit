import { generateWithGemini } from "./gemini";
import { generateWithGroq } from "./groq";
import { generateWithOpenAI } from "./openai";

export async function generateAI(prompt: string) {
  const providers = [
    { name: "OpenAI", fn: generateWithOpenAI },
    { name: "Gemini", fn: generateWithGemini },
    { name: "Groq", fn: generateWithGroq },
  ];

  for (const p of providers) {
    try {
      console.log(`Trying ${p.name}`);
      return await p.fn(prompt);
    } catch(err) {
      console.log(`${p.name} failed`);
      console.log(err);
    }
  }
}
