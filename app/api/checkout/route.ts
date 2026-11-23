import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { createOrder } from "@/lib/db";
import type { CartItem, PaymentMode } from "@/lib/types";

/**
 * Checkout handler.
 *  - If Supabase is configured: creates the customer + order + items for real.
 *  - If not: returns a demo order id so the flow still works before keys are set.
 *
 * For prepaid in production, create a Razorpay order and verify the signature
 * before marking the order paid (see app/api/razorpay/order/route.ts).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const items: CartItem[] = Array.isArray(body?.items) ? body.items : [];
    const payment: PaymentMode = body?.payment === "cod" ? "cod" : "prepaid";
    const customer = body?.customer ?? {};
    const amount = Number(body?.total) || items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = Number(body?.shipping) || 0;

    if (items.length === 0) {
      return NextResponse.json({ ok: false, error: "empty_cart" }, { status: 400 });
    }

    if (supabaseConfigured()) {
      const orderId = await createOrder({
        items,
        payment,
        amount,
        shipping,
        customer: {
          name: customer.name ?? "",
          phone: customer.phone ?? "",
          email: customer.email ?? "",
          address: customer.address ?? "",
          city: customer.city ?? "",
          pincode: customer.pincode ?? "",
        },
      });
      return NextResponse.json({ ok: true, orderId, payment, persisted: true });
    }

    // Demo fallback (no DB yet)
    const orderId = `VV-${Math.floor(10000 + Math.random() * 89999)}`;
    return NextResponse.json({ ok: true, orderId, payment, persisted: false });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ ok: false, error: "checkout_failed" }, { status: 500 });
  }
}
