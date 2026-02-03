import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateWithGemini(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: `
    You are a productivity assistant.
    Break down the task into small actionable steps.
    `,
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
