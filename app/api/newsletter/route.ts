import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    console.info("[newsletter]", parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Subscribed",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 500 }
    );
  }
}
