import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { material } = await req.json();

    if (!material) {
      return NextResponse.json(
        { error: "Material is required" },
        { status: 400 }
      );
    }

    const prompt = `List 3 things a first-time homeowner in Kanpur should check before buying ${material}. Explain each point briefly.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error: any) {
  console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Failed to generate response",
      },
      { status: 500 }
    );
  }
}
