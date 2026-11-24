// Two product lines: (1) the Mystery Box at several prices,
// (2) Jewellery Boxes — different types at different prices.

export interface PriceOption {
  id: string;
  label: string;
  price: number; // INR
  blurb: string;
  popular?: boolean;
  tag?: string;
}

export const MYSTERY_BOX = {
  name: "Mystery Box",
  tagline: "Follow the clue. Find the charm.",
  blurb:
    "A hand-packed surprise, matched to the little note you leave us. Pick your price — the bigger the box, the more unexpected the treasures inside.",
  image: "/images/jewellery.jpg",
  minPrice: 499,
  maxPrice: 30000,
};

export const PRICE_OPTIONS: PriceOption[] = [
  { id: "mini", label: "Mini", price: 149, blurb: "a sweet little taster" },
  { id: "classic", label: "Classic", price: 249, blurb: "our most-loved size", popular: true },
  { id: "grand", label: "Grand", price: 399, blurb: "a generous surprise" },
  { id: "premium", label: "Premium", price: 2499, blurb: "premium finds — expect the unexpected" },
  { id: "exclusive", label: "Exclusive", price: 4999, blurb: "our grandest box — anything can be inside", tag: "most exclusive" },
];

export interface JewelleryBox {
  id: string;
  name: string;
  price: number;
  blurb: string;
  image: string;
  tag?: string;
}

export const JEWELLERY_BOXES: JewelleryBox[] = [
  { id: "mystery-jewel", name: "Mystery Jewellery Box", price: 599, blurb: "A surprise edit of jewellery, matched to you.", image: "/images/pendant.jpg" },
  { id: "everyday-jewel", name: "Everyday Jewellery Box", price: 899, blurb: "Dainty pieces made for daily wear.", image: "/images/ring.jpg" },
  { id: "gifting-jewel", name: "Gifting Jewellery Box", price: 1299, blurb: "Wrapped and ready to gift.", image: "/images/customize.jpg" },
  { id: "wedding-jewel", name: "Wedding Jewellery Box", price: 1999, blurb: "Statement pieces for the big day.", image: "/images/jewellery-extra.jpg", tag: "popular" },
  { id: "bridal-luxe", name: "Bridal Luxe Box", price: 4999, blurb: "Our grandest bridal collection.", image: "/images/jewellery.jpg", tag: "most premium" },
];
