// src/models/llamaModel.js
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const client = ModelClient(
  "https://models.github.ai/inference",
  new AzureKeyCredential(import.meta.env.VITE_OPENAI_API_KEY)
);

export async function callLlama(prompt) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "meta/Llama-4-Scout-17B-16E-Instruct",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 0.1,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message || "Failed to fetch Llama response.");
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Llama-4-Scout-17B-16E-Instruct API:", error);
    throw new Error("Failed to fetch Llama response.");
  }
}