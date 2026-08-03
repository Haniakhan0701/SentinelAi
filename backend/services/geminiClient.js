import { GoogleGenerativeAI } from "@google/generative-ai";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set. Copy .env.example to .env and fill it in.");
    }
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return client;
}

export async function sendPromptToGemini(prompt) {
  const modelName = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const model = getClient().getGenerativeModel({ model: modelName });

  const result = await model.generateContent(prompt);
  const response = result.response;
  return {
    text: response.text(),
    model: modelName
  };
}