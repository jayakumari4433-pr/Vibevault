"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { vibeMap } from "@/lib/vibes";
import { inr } from "@/lib/format";
import { Icon } from "@/components/icons";
import { AuthForm } from "@/components/AuthForm";
import type { PaymentMode } from "@/lib/types";

// ---- Razorpay Checkout (loaded from their CDN) ----
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (r: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance {
  open: () => void;
  on: (event: string, cb: () => void) => void;
}
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const RZP_SRC = "https://checkout.razorpay.com/v1/checkout.js";
function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = RZP_SRC;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, count, clear, ready } = useCart();
  const { user, ready: authReady } = useAuth();

  const [payment, setPayment] = useState<PaymentMode>("prepaid");
  const [placing, setPlacing] = useState(false);
  const [addr, setAddr] = useState({ address: "", city: "", pincode: "" });

  const shipping = subtotal >= 249 ? 0 : 39;
  const total = subtotal + shipping;

  if (!ready || !authReady) {
    return <div className="vv-container py-20 text-center text-mute">Loading…</div>;
  }

  if (count === 0 && !placing) {
    return (
      <div className="vv-container py-20 text-center">
        <p className="text-stone">Your cart is empty.</p>
        <Link href="/boxes" className="btn btn-accent mt-4">Shop the boxes</Link>
      </div>
    );
  }

  // Login gate — login before ordering.
  if (!user) {
    return (
      <div className="vv-container py-16">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <span className="chip chip-accent mx-auto">
              <Icon.lock width={14} height={14} /> one quick step
            </span>
            <h1 className="mt-4 text-3xl font-bold text-ink">Log in to check out</h1>
            <p className="mt-2 text-stone">
              So we can send updates and reach you about your surprise. Takes 10
              seconds.
            </p>
          </div>
          <div className="mt-6">
            <AuthForm redirectTo="/checkout" compact />
          </div>
        </div>
      </div>
    );
  }

  const valid =
    addr.address.trim().length > 4 &&
    addr.city.trim().length > 1 &&
    /^\d{6}$/.test(addr.pincode);

  async function placeCodOrder() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, payment: "cod", customer: { ...user, ...addr }, total, shipping }),
    });
    const data = await res.json();
    clear();
    router.push(`/order/${data.orderId}`);
  }

  async function payWithRazorpay() {
    const customer = { ...user, ...addr };
    // 1. Create a Razorpay order on the server.
    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });
    const order = await orderRes.json();

    // If Razorpay isn't configured, fall back to a direct (demo) order.
    if (!order.ok) {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, payment: "prepaid", customer, total, shipping }),
      });
      const data = await res.json();
      clear();
      router.push(`/order/${data.orderId}`);
      return;
    }

    // 2. Open Razorpay Checkout.
    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setPlacing(false);
      alert("Couldn't load the payment window. Check your connection and try again.");
      return;
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Clue & Charm",
      description: "A feeling, boxed.",
      order_id: order.orderId,
      prefill: { name: user!.name, email: user!.email, contact: user!.phone },
      theme: { color: "#C17A54" },
      modal: { ondismiss: () => setPlacing(false) },
      handler: async (resp) => {
        // 3. Verify the signature server-side; the order is created only if valid.
        const vr = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...resp, items, customer, total, shipping }),
        });
        const vd = await vr.json();
        if (vd.ok) {
          clear();
          router.push(`/order/${vd.orderId}`);
        } else {
          setPlacing(false);
          alert("Payment couldn't be verified. If you were charged, message us on WhatsApp and we'll sort it.");
        }
      },
    });
    rzp.on("payment.failed", () => {
      setPlacing(false);
      alert("Payment failed. Please try again.");
    });
    rzp.open();
  }

  async function placeOrder() {
    if (!valid || !user) return;
    setPlacing(true);
    try {
      if (payment === "cod") {
        await placeCodOrder();
      } else {
        await payWithRazorpay();
      }
    } catch {
      setPlacing(false);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="vv-container py-14">
      <Link href="/cart" className="text-sm text-mute hover:text-ink">← Back to cart</Link>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          {/* Contact (from account) */}
          <section className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Your details</h2>
              <span className="chip">logged in</span>
            </div>
            <div className="mt-4 grid gap-1 text-sm text-stone">
              <div><span className="text-ink font-medium">{user.name}</span></div>
              <div>{user.phone}</div>
              <div>{user.email}</div>
            </div>
          </section>

          {/* Address */}
          <section className="card p-6">
            <h2 className="text-lg font-bold text-ink">Delivery address</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-stone">Address</span>
                <input
                  value={addr.address}
                  onChange={(e) => setAddr({ ...addr, address: e.target.value })}
                  placeholder="House / flat, street, area"
                  className="field mt-1.5"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-stone">City</span>
                  <input
                    value={addr.city}
                    onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                    placeholder="City"
                    className="field mt-1.5"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-stone">Pincode</span>
                  <input
                    value={addr.pincode}
                    onChange={(e) => setAddr({ ...addr, pincode: e.target.value })}
                    placeholder="6-digit"
                    inputMode="numeric"
                    className="field mt-1.5"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="card p-6">
            <h2 className="text-lg font-bold text-ink">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <PayOption active={payment === "prepaid"} onClick={() => setPayment("prepaid")} title="Pay online" sub="UPI · Card · Netbanking" icon="wallet" />
              <PayOption active={payment === "cod"} onClick={() => setPayment("cod")} title="Cash on Delivery" sub="Pay when it arrives" icon="truck" />
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-mute">
              <Icon.lock width={13} height={13} />
              {payment === "prepaid"
                ? "Secured by Razorpay (test mode — use a test card, no real charge)."
                : "COD confirmed on WhatsApp before dispatch."}
            </p>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-ink">Your order</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.lineId} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-lg">
                    {item.vibe ? vibeMap[item.vibe].emoji : "🎁"}
                  </span>
                  <span className="flex-1 text-sm">
                    <span className="block font-medium text-ink">{item.name}</span>
                    <span className="text-xs text-mute">Qty {item.qty}</span>
                  </span>
                  <span className="text-sm font-semibold text-ink">{inr(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-stone"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
              <div className="flex justify-between text-stone"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : inr(shipping)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2.5">
                <dt className="font-bold text-ink">Total</dt>
                <dd className="text-lg font-bold text-ink">{inr(total)}</dd>
              </div>
            </dl>
            <button
              onClick={placeOrder}
              disabled={!valid || placing}
              className="btn btn-accent mt-6 h-12 w-full text-base"
            >
              {placing ? "Placing…" : payment === "cod" ? "Place COD order" : `Pay ${inr(total)}`}
            </button>
            {!valid && (
              <p className="mt-2 text-center text-xs text-mute">
                Add your address, city &amp; 6-digit pincode.
              </p>
            )}
            <p className="mt-3 text-center text-xs text-mute">
              Mystery boxes are non-returnable — the surprise is the point. 🤍
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  title,
  sub,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  icon: "wallet" | "truck";
}) {
  const I = Icon[icon];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
        active ? "border-clay bg-[var(--accent-soft)]" : "border-line bg-paper hover:border-stone/40"
      }`}
    >
      <span className={active ? "text-clay" : "text-stone"}>
        <I width={22} height={22} />
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-xs text-stone">{sub}</span>
      </span>
    </button>
  );
}
