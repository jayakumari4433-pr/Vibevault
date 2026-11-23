import type { Review, Unboxing } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ananya S.",
    city: "Pune",
    vibe: "girls",
    rating: 5,
    text: "Opened it on a call with my bestie and we both just grinned. It felt so me. The little note slip made my whole day.",
    verified: true,
  },
  {
    id: "r2",
    name: "Rohit K.",
    city: "Delhi",
    vibe: "boys",
    rating: 5,
    text: "Wasn't sure about a mystery box, but it just… landed. Wore it the same day. The surprise part is actually the fun part.",
    verified: true,
  },
  {
    id: "r3",
    name: "Meera T.",
    city: "Bengaluru",
    vibe: "women",
    rating: 5,
    text: "Asked for rose-gold and that's exactly the energy that showed up. Felt thoughtful, not random. Ordered one for mom too.",
    verified: true,
  },
  {
    id: "r4",
    name: "Arjun V.",
    city: "Mumbai",
    vibe: "gamer",
    rating: 5,
    text: "The note option is elite. I wrote one line about my setup and the surprise actually matched the vibe. 10/10 unboxing.",
    verified: true,
  },
  {
    id: "r5",
    name: "Sneha R.",
    city: "Hyderabad",
    vibe: "girls",
    rating: 5,
    text: "This is my little monthly treat now. It never feels expensive and it always feels like a gift to myself. 🩷",
    verified: true,
  },
  {
    id: "r6",
    name: "Karan P.",
    city: "Jaipur",
    vibe: "car",
    rating: 5,
    text: "Customised one for ₹120 with a note. They nailed what I was hoping for without me spelling it out. Will reorder.",
    verified: true,
  },
];

export const unboxings: Unboxing[] = [
  { id: "u1", name: "Ananya", city: "Pune", vibe: "girls", caption: "unboxing therapy 🎀" },
  { id: "u2", name: "Rohit", city: "Delhi", vibe: "boys", caption: "it just landed ⛓️" },
  { id: "u3", name: "Meera", city: "Bengaluru", vibe: "women", caption: "rose-gold energy 🌹" },
  { id: "u4", name: "Arjun", city: "Mumbai", vibe: "gamer", caption: "the note matched 🎮" },
  { id: "u5", name: "Karan", city: "Jaipur", vibe: "car", caption: "full send 🏎️" },
  { id: "u6", name: "Ishita", city: "Kolkata", vibe: "girls", caption: "felt like a hug 💌" },
  { id: "u7", name: "Dev", city: "Chennai", vibe: "men", caption: "clean & simple 🖤" },
  { id: "u8", name: "Priya", city: "Surat", vibe: "women", caption: "my little treat ✨" },
];

/** GenZ one-liners for the marquee / sprinkled copy. */
export const genzQuotes = [
  "it's giving main character ✨",
  "treat yourself, bestie 🩷",
  "no thoughts, just vibes",
  "serotonin, delivered 📦",
  "your sign to spoil yourself",
  "pov: your mood got a glow-up",
  "a feeling, boxed.",
  "lowkey the best ₹149 you'll spend",
  "unbox your soft-girl era",
  "surprise > scrolling",
];

/** Trust-first — lead with these before selling anything. */
export const trustPoints = [
  {
    icon: "heart",
    title: "A real, tiny team in India",
    text: "Not a faceless dropshipper. Every box is hand-packed by people who actually care how you feel opening it.",
  },
  {
    icon: "sparkle",
    title: "Packed to your vibe",
    text: "Your vibe, your colour, your note — we read every one, so the surprise feels picked, not random.",
  },
  {
    icon: "lock",
    title: "Pay safely, your way",
    text: "UPI, cards, netbanking or Cash on Delivery via Razorpay. We never see or store your card.",
  },
  {
    icon: "whatsapp",
    title: "We stay in touch",
    text: "A friendly WhatsApp from 'packed' to 'on its way'. Reach a human any time, no bots.",
  },
];

/** Honest promise instead of a returns policy. */
export const honestPromise = {
  title: "The honest bit 🤍",
  points: [
    "These are mystery boxes, so they can't be returned or exchanged — the surprise is the whole point.",
    "But we pour real love into every single one, matched to what you told us.",
    "Parcel arrived hurt in transit? Send one photo on WhatsApp and we'll make it right — no drama.",
  ],
};
