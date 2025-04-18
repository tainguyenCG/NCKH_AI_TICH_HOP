// src/models/gptModel.js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com", // Use OpenAI's default API or Azure's if needed
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Load API key from .env
  dangerouslyAllowBrowser: true, // Allow running in browser (unsafe for production)
});

export async function callOpenAI(prompt) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o", // Use the model you have access to (e.g., gpt-3.5-turbo or gpt-4o)
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to fetch AI response.");
  }
}