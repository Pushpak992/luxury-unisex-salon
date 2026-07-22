import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    console.info("[contact]", parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Message received",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 500 }
    );
  }
}
