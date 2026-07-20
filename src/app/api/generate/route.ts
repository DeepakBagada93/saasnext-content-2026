import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, action, context } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API Key not configured." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are Content Brain, an AI assistant for high-impact knowledge work and editorial content creation. Tone: Sophisticated, grounded, contemplative, and authoritative.
Context: ${context || "Brand Style: Tactile Digital Sanctuary, Warm-tonal."}`;

    const userContent = action
      ? `Action: ${action}\n\nTask: ${prompt}`
      : prompt;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://contentbrain.ai",
        "X-Title": "Content Brain SaaS",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `OpenRouter error: ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content || "No output generated.";

    return NextResponse.json({ result: resultText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate AI content" }, { status: 500 });
  }
}
