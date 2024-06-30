// Using Gemini Pro
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

const model = google("models/gemini-1.5-flash-latest");

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // extract the prompt from body of request:
  const { prompt } = await req.json();

  const result = await generateText({
    model: model,
    prompt: `Create blog post based on this title:  ${prompt}`,
  });
  console.log(result.text);
  // return new Response(text);

  return new Response(result.text);
}
