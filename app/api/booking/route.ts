import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Ready for backend / CRM / email provider integration
    console.info("[booking]", parsed.data);

    return NextResponse.json({
      ok: true,
      message: "Booking request received",
      data: {
        reference: `LUM-${Date.now().toString(36).toUpperCase()}`,
        ...parsed.data,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 500 }
    );
  }
}
