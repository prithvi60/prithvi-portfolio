import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt, session_id } = await request.json();

    // ✅ Validate both prompt and session_id
    if (!prompt || !session_id || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid prompt/session_id" },
        { status: 400 }
      );
    }

    // 🎯 Call FastAPI with session_id from the frontend
    const apiResponse = await fetch("https://api.portfolio.webibee.com/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        session_id: session_id.trim(),
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return NextResponse.json(
        {
          error: "Failed to fetch response from AI service",
          details:
            process.env.NODE_ENV === "development" ? errorText : undefined,
        },
        { status: apiResponse.status || 502 }
      );
    }

    const { response, step } = await apiResponse.json();
    return NextResponse.json({ response, step });

  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      {
        error: "Internal server error",
        suggestion: "Please try again later",
      },
      { status: 500 }
    );
  }
}
