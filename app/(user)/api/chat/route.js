import { NextResponse } from "next/server";
import { parse, serialize } from "cookie";
import { v4 as uuidv4 } from "uuid";

// Session storage (in-memory for this example)
const sessions = new Map();

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const cookies = parse(request.headers.get("cookie") || "");

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Get or create session ID
    let sessionId = cookies.sessionId;
    if (!sessionId || !sessions.has(sessionId)) {
      sessionId = uuidv4();
      sessions.set(sessionId, []);
    }

    // Get previous messages from session
    const previousMessages = sessions.get(sessionId) || [];

    // Create new messages array with previous context
    const messages = [...previousMessages, { role: "user", content: prompt }];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to fetch from OpenAI API"
      );
    }

    const data = await response.json();
    const aiResponse =
      data.choices[0]?.message?.content || "No response from AI";

    // Update conversation history
    const updatedMessages = [
      ...messages,
      { role: "assistant", content: aiResponse },
    ];

    // Store updated messages in session
    sessions.set(sessionId, updatedMessages);

    // Create response with Set-Cookie header
    const responseHeaders = {
      "Set-Cookie": serialize("sessionId", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      }),
    };

    return NextResponse.json(
      {
        result: aiResponse,
        conversationHistory: updatedMessages,
      },
      {
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Error processing your request" },
      { status: 500 }
    );
  }
}
