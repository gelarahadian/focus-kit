import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generateWithGroq(prompt: string) {
  const chat = await groq.chat.completions.create({
    model: "allam-2-7b",
    messages: [
        {
            role: 'system',
            content: "You are a productivity assistant. Break down the task into small actionable steps."
        },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chat.choices[0]?.message?.content || "";
}
