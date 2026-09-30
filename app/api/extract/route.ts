import { getGeminiClient, withGeminiRetry } from "@/app/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const description = body.description?.trim();

    if (!description) {
      return Response.json(
        { error: "Food description is required" },
        { status: 400 },
      );
    }

    const ai = getGeminiClient();

    const response = await withGeminiRetry(() =>
      ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: `
Extract the ingredients from the following food description.

Return only a clear bulleted list of ingredients.
Do not include explanations or cooking instructions.

Food description:
${description}
      `,
      }),
    );

    return Response.json({
      result: response.text,
    });
  } catch (error) {
    console.error("Extract API error:", error);

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
            : "Failed to extract ingredients",
      },
      { status },
    );
  }
}
