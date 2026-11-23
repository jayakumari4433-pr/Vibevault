"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";

type NewItem = Omit<CartItem, "lineId">;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: NewItem) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vibevault.cart.v2";

function signature(i: NewItem) {
  return [i.productId, i.price, i.vibe, i.colour, i.note, i.category].join("|");
}

function newLineId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `line-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, ready]);

  const add = useCallback((item: NewItem) => {
    setItems((prev) => {
      const sig = signature(item);
      const existing = prev.find((i) => signature(i) === sig);
      if (existing) {
        return prev.map((i) =>
          i.lineId === existing.lineId ? { ...i, qty: i.qty + item.qty } : i,
        );
      }
      return [...prev, { ...item, lineId: newLineId() }];
    });
  }, []);

  const remove = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const setQty = useCallback((lineId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.lineId === lineId ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, add, remove, setQty, clear, ready }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
