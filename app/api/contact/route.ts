import { NextResponse } from "next/server";

/**
 * Contact form handler (demo).
 * In production, forward this to email / WhatsApp / a DB table.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    // TODO: send to email/WhatsApp or store in Supabase.
    console.log("[contact]", { name, email, phone: body?.phone, message: body?.message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
