import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { city, time } = await request.json();

    // Validera input
    if (!city || !time) {
      return NextResponse.json(
        { error: "Stad och tid krävs" },
        { status: 400 }
      );
    }

    // Skicka vidare till den externa endpointen
    const externalResponse = await fetch(
      "https://weather-app-subscription.onrender.com/api/subscriptions/ping",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          time,
        }),
      }
    );

    // Hantera svaret från den externa API:et
    if (!externalResponse.ok) {
      const errorData = await externalResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Externt API fel" },
        { status: externalResponse.status }
      );
    }

    const externalData = await externalResponse.json();

    console.log("Abbonemang sparats externt:", { city, time });

    return NextResponse.json(
      {
        success: true,
        message: "Abbonemang uppdaterat framgångsrikt",
        data: externalData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription API error:", error);
    return NextResponse.json(
      { error: "Kunde inte ansluta till servern" },
      { status: 500 }
    );
  }
}
