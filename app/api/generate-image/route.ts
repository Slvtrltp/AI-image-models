import { InferenceClient } from "@huggingface/inference";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return Response.json(
        { error: "An image prompt is required" },
        { status: 400 },
      );
    }

    if (prompt.length > 1_000) {
      return Response.json(
        { error: "Prompt must be 1,000 characters or fewer" },
        { status: 400 },
      );
    }

    const token = process.env.HF_TOKEN;
    if (!token) {
      return Response.json(
        { error: "HF_TOKEN is not configured" },
        { status: 500 },
      );
    }

    const hf = new InferenceClient(token);
    const image = await hf.textToImage(
      {
        model: "black-forest-labs/FLUX.1-schnell",
        inputs: `High-quality appetizing food photography: ${prompt}`,
        parameters: {
          num_inference_steps: 4,
        },
      },
      { outputType: "blob" },
    );

    return new Response(image, {
      headers: {
        "Content-Type": image.type || "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Generate image API error:", error);

    const providerMessage =
      error instanceof Error ? error.message : "Unknown provider error";

    const status =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "status" in error.response &&
      typeof error.response.status === "number"
        ? error.response.status
        : 500;

    return Response.json(
      { error: `Hugging Face error: ${providerMessage}` },
      { status },
    );
  }
}
