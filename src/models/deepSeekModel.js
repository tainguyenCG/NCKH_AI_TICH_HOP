// src/models/deepSeekModel.js
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const client = ModelClient(
  "https://models.github.ai/inference", // Matches Python code
  new AzureKeyCredential(import.meta.env.VITE_OPENAI_API_KEY)
);

export async function callDeepSeek(prompt) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "deepseek/DeepSeek-V3-0324",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message || "Failed to fetch DeepSeek response.");
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek-V3-0324 API:", error);
    throw new Error("Failed to fetch DeepSeek response.");
  }
}