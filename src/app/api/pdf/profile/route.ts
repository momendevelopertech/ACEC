import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "1";

    const res = await fetch(`${API_BASE}/api/v1/profile-pdf/active`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return new NextResponse("PDF not found", { status: 404 });
    }

    const json = await res.json();
    if (!json.success || !json.data?.file_url) {
      return new NextResponse("PDF not found", { status: 404 });
    }

    const pdfRes = await fetch(json.data.file_url, {
      cache: "no-store",
    });

    if (!pdfRes.ok) {
      return new NextResponse("PDF file unavailable", { status: 502 });
    }

    const pdfBuffer = await pdfRes.arrayBuffer();
    const fileName = json.data.name
      ? `${json.data.name.replace(/[^a-zA-Z0-9-_ ]/g, "")}.pdf`
      : "profile.pdf";

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Content-Disposition": download
          ? `attachment; filename="${fileName}"`
          : `inline; filename="${fileName}"`,
        "Cache-Control": "public, max-age=60, must-revalidate",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error) {
    console.error("PDF proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
