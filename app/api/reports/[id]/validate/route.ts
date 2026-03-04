import { NextRequest, NextResponse } from "next/server";
import { validateReportForCertification } from "@/lib/report-validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await validateReportForCertification(params.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error validating report:", error);
    return NextResponse.json(
      { error: "Failed to validate report" },
      { status: 500 }
    );
  }
}
