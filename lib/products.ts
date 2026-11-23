import type { Product, BoxType, Colour } from "./types";

/**
 * The box menu. Price-first, feeling-led — we never state quantity or value.
 * The surprise is the point.
 */
export const products: Product[] = [
  {
    id: "ring",
    type: "ring",
    name: "Ring Mystery Box",
    price: 149,
    kicker: "it's giving main character",
    tagline: "A ring you didn't pick, that somehow feels picked for you.",
    description:
      "Slip on a surprise. Tell us your vibe and colour, and we'll match a ring to your mood — the kind you keep reaching for.",
    feelings: ["everyday", "a little lucky", "so you"],
  },
  {
    id: "pendant",
    type: "pendant",
    name: "Pendant Mystery Box",
    price: 199,
    kicker: "wear your mood",
    tagline: "Something to rest right over your heart.",
    description:
      "A pendant chosen to your vibe — soft, bold, cute or clean. The surprise is which one lands in your hands.",
    feelings: ["close to the heart", "quietly special", "gift-worthy"],
  },
  {
    id: "jewellery",
    type: "jewellery",
    name: "Jewellery Mystery Box",
    price: 249,
    kicker: "serotonin, delivered",
    tagline: "A little edit of surprises, matched to your vibe.",
    description:
      "Our most-loved box. Tell us who it's for and the colour you love — we pack a feel-good mix and keep the rest a secret.",
    feelings: ["main-character", "glow-up", "treat-yourself"],
  },
  {
    id: "jewellery-plus",
    type: "jewellery",
    name: "Jewellery Box · Extra",
    price: 399,
    kicker: "go full spoil",
    tagline: "The whole feeling — a bigger hit of surprise.",
    description:
      "When you want the moment to last a little longer. Same secret magic, turned up — matched to your vibe and colour.",
    feelings: ["spoiled", "all-out", "your-sign"],
  },
  {
    id: "customize",
    type: "customize",
    name: "Customise Your Surprise",
    price: 70,
    kicker: "you set the vibe",
    tagline: "Your budget, your colour, your note — our surprise.",
    description:
      "Start from ₹70. Pick what it's for — jewellery, a ring, a pendant, or something else entirely (a cup, a book, a pen… tell us). Add a colour and a little note about what you're hoping for, and leave the surprise to us.",
    feelings: ["made-for-you", "your-call", "thoughtful"],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const shopProducts = products.filter((p) => p.type !== "customize");
export const customizeProduct = products.find((p) => p.type === "customize")!;

export const BOX_TYPE_LABEL: Record<BoxType, string> = {
  ring: "Ring box",
  pendant: "Pendant box",
  jewellery: "Jewellery box",
  customize: "Customised",
};

export const MIN_CUSTOM_PRICE = 70;

/** Colour preferences a buyer can request. */
export const colours: Colour[] = [
  { id: "blush", label: "Blush pink", swatch: "#e6a9a0" },
  { id: "lilac", label: "Lilac", swatch: "#c7a7d6" },
  { id: "sage", label: "Sage green", swatch: "#8aa177" },
  { id: "gold", label: "Classic gold", swatch: "#c6a24b" },
  { id: "rose-gold", label: "Rose gold", swatch: "#c88f78" },
  { id: "silver", label: "Silver", swatch: "#c7ccd1" },
  { id: "black", label: "Classic black", swatch: "#2a2521" },
  { id: "pearl", label: "Pearl white", swatch: "#f3ece0" },
  { id: "pastel", label: "Pastel mix", swatch: "linear-gradient(90deg,#e6a9a0,#c7a7d6,#8aa177)" },
  { id: "surprise", label: "Surprise me", swatch: "linear-gradient(90deg,#c17a54,#c6a24b)" },
];

/** What a customise box can be about. */
export const customCategories = [
  { id: "jewellery", label: "Jewellery mix", emoji: "💍" },
  { id: "ring", label: "A ring", emoji: "💫" },
  { id: "pendant", label: "A pendant", emoji: "🫧" },
  { id: "else", label: "Something else", emoji: "🎁", hint: "a cup, a book, a pen… tell us below" },
];
