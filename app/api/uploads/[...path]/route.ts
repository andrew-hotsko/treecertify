import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { resolveUploadPath, getMimeType } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path: segments } = params;

    if (!segments || segments.length === 0) {
      return NextResponse.json({ error: "No path specified" }, { status: 400 });
    }

    const relativePath = segments.join("/");
    const absolutePath = resolveUploadPath(relativePath);

    if (!absolutePath) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) {
      return NextResponse.json(
        { error: "Not a file" },
        { status: 400 }
      );
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const mimeType = getMimeType(relativePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving upload:", error);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}
