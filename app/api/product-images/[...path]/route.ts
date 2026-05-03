import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGES_ROOT = path.join(process.cwd(), "images");

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;

  if (!segments || segments.length === 0) {
    return NextResponse.json({ error: "Image path is required." }, { status: 400 });
  }

  const filePath = path.join(IMAGES_ROOT, ...segments);
  const normalizedRoot = path.resolve(IMAGES_ROOT);
  const normalizedFile = path.resolve(filePath);

  if (!normalizedFile.startsWith(normalizedRoot)) {
    return NextResponse.json({ error: "Invalid image path." }, { status: 400 });
  }

  try {
    const buffer = await fs.readFile(normalizedFile);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": getContentType(normalizedFile),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
