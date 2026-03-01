import { NextRequest, NextResponse } from "next/server";
import { checkTreeProtection } from "@/lib/ordinances";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const species = searchParams.get("species");
    const dbh = searchParams.get("dbh");

    if (!city || !species || !dbh) {
      return NextResponse.json(
        { error: "Missing required query parameters: city, species, dbh" },
        { status: 400 }
      );
    }

    const dbhNum = parseFloat(dbh);
    if (isNaN(dbhNum)) {
      return NextResponse.json(
        { error: "dbh must be a valid number" },
        { status: 400 }
      );
    }

    const result = await checkTreeProtection(city, species, dbhNum);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking tree protection:", error);
    return NextResponse.json(
      { error: "Failed to check tree protection" },
      { status: 500 }
    );
  }
}
