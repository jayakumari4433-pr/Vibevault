import "server-only";
import crypto from "crypto";

/**
 * Razorpay helpers (server-only). Uses the REST API directly with Basic auth
 * so there's no extra SDK dependency. Keys come from env:
 *   RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
 */

export function razorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function authHeader(): string {
  const id = process.env.RAZORPAY_KEY_ID!;
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

export interface RzpOrder {
  id: string;
  amount: number;
  currency: string;
}

/** Create a Razorpay order. `amountInr` is whole rupees; converted to paise. */
export async function createRazorpayOrder(
  amountInr: number,
  receipt: string,
): Promise<RzpOrder> {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amountInr * 100), // paise
      currency: "INR",
      receipt,
      notes: { app: "VibeVault" },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Razorpay order failed (${res.status}): ${text}`);
  }
  return (await res.json()) as RzpOrder;
}

/** Verify the payment signature returned by Razorpay Checkout. */
export function verifyRazorpaySignature(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.razorpay_order_id}|${params.razorpay_payment_id}`)
    .digest("hex");
  // constant-time compare
  const a = Buffer.from(expected);
  const b = Buffer.from(params.razorpay_signature || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
