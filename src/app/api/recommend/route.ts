import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/server/recommend";
import { checkRecommendRateLimit } from "@/lib/server/rateLimit";
import { parseRecommendRequest } from "@/lib/validateRecommendRequest";

export async function POST(request: Request) {
  const rateLimit = checkRecommendRateLimit(request);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body: unknown = await request.json();
    const payload = parseRecommendRequest(body);

    if (!payload) {
      return NextResponse.json(
        {
          error:
            "Invalid request. Provide valid interests, budget, duration, and regions.",
        },
        { status: 400 }
      );
    }

    const response = await getRecommendations(payload);

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
