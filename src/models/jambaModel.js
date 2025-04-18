// src/models/jambaModel.js
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const client = ModelClient(
  "https://models.inference.ai.azure.com",
  new AzureKeyCredential(import.meta.env.VITE_OPENAI_API_KEY)
);

export async function callJamba(prompt) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "AI21-Jamba-1.5-Large",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 0.1,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message || "Failed to fetch Jamba response.");
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI21-Jamba-1.5-Large API:", error);
    throw new Error("Failed to fetch Jamba response.");
  }
}