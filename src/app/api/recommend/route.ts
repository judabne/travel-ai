import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/server/recommend";
import { parseRecommendRequest } from "@/lib/validateRecommendRequest";

const TRIAL_RESPONSE_DELAY_MS = 3000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
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

    const response = getRecommendations(payload);

    await delay(TRIAL_RESPONSE_DELAY_MS);

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
