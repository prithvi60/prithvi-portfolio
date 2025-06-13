import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const { prompt } = await request.json();

    // Validate input
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid non-empty prompt" },
        { status: 400 }
      );
    }

    // Call the portfolio API with the correct endpoint
    const apiResponse = await fetch(
      "https://api.portfolio.webibee.com/run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Uncomment and add authentication if required:
          // "Authorization": `Bearer ${process.env.PORTFOLIO_API_KEY}`
        },
        credentials: "include",
        body: JSON.stringify({
          prompt: prompt.trim(),
        }),
      }
    );

    // Handle API errors
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("API Error:", {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        response: errorText,
      });

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

    // Validate API response
    if (!response || typeof response !== "string") {
      console.error("Invalid API response:", { response, step });
      return NextResponse.json(
        { error: "Received invalid response from AI service" },
        { status: 502 }
      );
    }

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
