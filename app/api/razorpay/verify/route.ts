import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { createOrder } from "@/lib/db";
import type { CartItem } from "@/lib/types";

/**
 * Verifies a Razorpay payment signature, and ONLY on success creates the
 * order in the database. This runs server-side so the secret never leaks and
 * a forged signature can't create a paid order.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      customer,
      total,
      shipping,
    } = body;

    const ok = verifyRazorpaySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    if (!ok) {
      return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 400 });
    }

    const cart: CartItem[] = Array.isArray(items) ? items : [];
    const amount = Number(total) || cart.reduce((s, i) => s + i.price * i.qty, 0);

    // Payment verified. Persist the order (if DB configured).
    let orderId: string;
    if (supabaseConfigured()) {
      orderId = await createOrder({
        items: cart,
        payment: "prepaid",
        amount,
        shipping: Number(shipping) || 0,
        customer: {
          name: customer?.name ?? "",
          phone: customer?.phone ?? "",
          email: customer?.email ?? "",
          address: customer?.address ?? "",
          city: customer?.city ?? "",
          pincode: customer?.pincode ?? "",
        },
      });
    } else {
      orderId = `VV-${Math.floor(10000 + Math.random() * 89999)}`;
    }

    return NextResponse.json({ ok: true, orderId, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error("[razorpay/verify]", err);
    return NextResponse.json({ ok: false, error: "verify_failed" }, { status: 500 });
  }
}
