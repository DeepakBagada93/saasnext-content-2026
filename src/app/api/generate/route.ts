import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, action, context, model } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API Key not configured." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are Content Brain, an AI assistant for high-impact knowledge work and editorial content creation. Tone: Sophisticated, grounded, contemplative, and authoritative.
Context rules: ${context || "Brand Style: Tactile Digital Sanctuary, Warm-tonal."}`;

    const userContent = action
      ? `Action: ${action}\n\nTask/Draft Context:\n${prompt}`
      : prompt;

    // Use selected model or default to high-reliability OpenRouter model
    const targetModel = model || "openai/gpt-4o-mini";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://contentbrain.ai",
        "X-Title": "Content Brain SaaS",
      },
      body: JSON.stringify({
        model: targetModel,
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
        { error: `OpenRouter API error (${response.status}): ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content || "No output generated.";

    return NextResponse.json({
      result: resultText,
      model: data.model || targetModel,
      usage: data.usage,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate AI content" },
      { status: 500 }
    );
  }
}
