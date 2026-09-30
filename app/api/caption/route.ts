import { createPartFromBase64, createPartFromText } from "@google/genai";
import { getGeminiClient, withGeminiRetry } from "@/app/lib/gemini";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json(
        { error: "An image file is required" },
        { status: 400 },
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return Response.json(
        { error: "Only JPEG, PNG, WebP, HEIC, and HEIF images are supported" },
        { status: 415 },
      );
    }

    if (image.size > MAX_IMAGE_SIZE) {
      return Response.json(
        { error: "Image must be smaller than 10 MB" },
        { status: 413 },
      );
    }

    const imageBase64 = Buffer.from(await image.arrayBuffer()).toString(
      "base64",
    );
    const ai = getGeminiClient();

    const response = await withGeminiRetry(() =>
      ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: [
          createPartFromText(
            "Analyze this food image. Clearly describe the food and list every visible ingredient you can identify. Group the ingredients into helpful categories when appropriate. Do not claim certainty for unclear items.",
          ),
          createPartFromBase64(imageBase64, image.type),
        ],
      }),
    );

    if (!response.text) {
      return Response.json(
        { error: "Gemini returned an empty response" },
        { status: 502 },
      );
    }

    return Response.json({ result: response.text });
  } catch (error) {
    console.error("Caption API error:", error);

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
            : "Failed to analyze the image",
      },
      { status },
    );
  }
}
