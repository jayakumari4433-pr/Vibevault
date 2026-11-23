import { NextResponse } from "next/server";
import { razorpayConfigured, createRazorpayOrder } from "@/lib/razorpay";

/**
 * Creates a Razorpay order for the given amount (INR).
 * The client opens Razorpay Checkout with the returned order id + key id,
 * then the success handler calls /api/razorpay/verify.
 */
export async function POST(req: Request) {
  try {
    const { amount } = await req.json().catch(() => ({ amount: 0 }));
    const amt = Number(amount);
    if (!amt || amt < 1) {
      return NextResponse.json({ ok: false, error: "invalid_amount" }, { status: 400 });
    }
    if (!razorpayConfigured()) {
      return NextResponse.json(
        { ok: false, error: "razorpay_not_configured" },
        { status: 503 },
      );
    }
    const receipt = `VV-${Date.now()}`;
    const order = await createRazorpayOrder(amt, receipt);
    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[razorpay/order]", err);
    return NextResponse.json({ ok: false, error: "order_failed" }, { status: 500 });
  }
}
