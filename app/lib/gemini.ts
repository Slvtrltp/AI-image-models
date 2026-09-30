import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  return new GoogleGenAI({ apiKey });
}

function getErrorStatus(error: unknown) {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return undefined;
  }

  return typeof error.status === "number" ? error.status : undefined;
}

export async function withGeminiRetry<T>(operation: () => Promise<T>) {
  const retryableStatuses = new Set([429, 500, 502, 503, 504]);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt === 2;
      const status = getErrorStatus(error);

      if (isLastAttempt || !status || !retryableStatuses.has(status)) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 750 * Math.pow(2, attempt)),
      );
    }
  }

  throw new Error("Gemini request failed");
}
