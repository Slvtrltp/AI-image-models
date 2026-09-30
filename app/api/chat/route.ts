import { getGeminiClient, withGeminiRetry } from "@/app/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message?.trim();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const ai = getGeminiClient();

    const response = await withGeminiRetry(() =>
      ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: `
You are a helpful food assistant.
Only answer questions related to food, recipes, ingredients, and cooking.

User question:
${message}
      `,
      }),
    );

    return Response.json({
      message: response.text,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 503
        ? 503
        : 500;

    return Response.json(
      {
        error:
          status === 503
            ? "Gemini is temporarily busy. Please try again shortly."
            : "Failed to generate a response",
      },
      { status },
    );
  }
}
