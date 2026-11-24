export type VibeSlug = "girls" | "boys" | "women" | "men" | "gamer" | "car";

export type BoxType = "ring" | "pendant" | "jewellery" | "customize";

export interface Vibe {
  slug: VibeSlug;
  name: string;
  tagline: string;
  quote: string; // GenZ one-liner
  emoji: string;
  blurb: string;
}

export interface Product {
  id: string;
  type: BoxType;
  name: string;
  price: number; // INR; for customize this is the minimum
  kicker: string; // tiny GenZ hook
  tagline: string; // the feeling
  description: string;
  feelings: string[]; // feeling words, NOT contents/quantity
  image?: string; // optional real photo (in /public/images); falls back to illustration
}

export interface Vibe2 {
  slug: VibeSlug;
}

export interface Colour {
  id: string;
  label: string;
  swatch: string; // css colour
}

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  sub?: string;
  /** For the final step, which box type this leans toward. */
  box?: BoxType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  helper?: string;
  options: QuizOption[];
}

export interface Review {
  id: string;
  name: string;
  city: string;
  vibe: VibeSlug;
  rating: number;
  text: string;
  verified: boolean;
}

export interface Unboxing {
  id: string;
  name: string;
  city: string;
  vibe: VibeSlug;
  caption: string;
}

/** A line in the cart — carries a full snapshot so customize amounts persist. */
export interface CartItem {
  lineId: string;
  productId: string;
  type: BoxType;
  name: string;
  price: number;
  qty: number;
  vibe?: VibeSlug;
  colour?: string;
  note?: string;
  category?: string; // customize: what they want
}

export type OrderStatus = "new" | "packed" | "shipped" | "delivered";
export type PaymentMode = "prepaid" | "cod";

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  email: string;
  city: string;
  vibe: VibeSlug;
  boxName: string;
  colour: string;
  note: string;
  amount: number;
  status: OrderStatus;
  payment: PaymentMode;
  placedAt: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
}
