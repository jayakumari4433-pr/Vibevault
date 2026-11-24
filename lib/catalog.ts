import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Catalog, Category, CatalogProduct } from "./catalog-types";

const FILE = path.join(process.cwd(), "data", "catalog.json");

const SEED: Catalog = {
  categories: [
    {
      id: "mystery",
      name: "Mystery Box",
      slug: "mystery",
      blurb: "Sealed surprises, matched to your note.",
      subcategories: [
        { id: "classic", name: "Classic Mystery Box" },
        { id: "fairy", name: "Fairy Mystery Box" },
      ],
    },
    {
      id: "jewellery",
      name: "Jewellery Boxes",
      slug: "jewellery",
      blurb: "Boxes of jewellery for every moment.",
      subcategories: [
        { id: "everyday", name: "Everyday" },
        { id: "gifting", name: "Gifting" },
        { id: "wedding", name: "Wedding" },
      ],
    },
  ],
  products: [
    { id: "m-mini", name: "Mini Mystery Box", price: 149, categoryId: "mystery", subcategoryId: "classic", image: "/images/jewellery.jpg", blurb: "A sweet little taster.", active: true },
    { id: "m-classic", name: "Classic Mystery Box", price: 249, categoryId: "mystery", subcategoryId: "classic", image: "/images/jewellery.jpg", blurb: "Our most-loved surprise.", active: true },
    { id: "m-grand", name: "Grand Mystery Box", price: 399, categoryId: "mystery", subcategoryId: "classic", image: "/images/jewellery-extra.jpg", blurb: "A generous surprise.", active: true },
    { id: "m-fairy", name: "Fairy Mystery Box", price: 599, categoryId: "mystery", subcategoryId: "fairy", image: "/images/pendant.jpg", blurb: "Dreamy, delicate pieces.", active: true },
    { id: "m-fairy-deluxe", name: "Fairy Deluxe Box", price: 999, categoryId: "mystery", subcategoryId: "fairy", image: "/images/pendant.jpg", blurb: "The full fairytale.", active: true },
    { id: "j-everyday", name: "Everyday Jewellery Box", price: 899, categoryId: "jewellery", subcategoryId: "everyday", image: "/images/ring.jpg", blurb: "Dainty pieces for daily wear.", active: true },
    { id: "j-gifting", name: "Gifting Jewellery Box", price: 1299, categoryId: "jewellery", subcategoryId: "gifting", image: "/images/customize.jpg", blurb: "Wrapped and ready to gift.", active: true },
    { id: "j-wedding", name: "Wedding Jewellery Box", price: 1999, categoryId: "jewellery", subcategoryId: "wedding", image: "/images/jewellery-extra.jpg", blurb: "Statement pieces for the big day.", active: true },
    { id: "j-bridal", name: "Bridal Luxe Box", price: 4999, categoryId: "jewellery", subcategoryId: "wedding", image: "/images/jewellery.jpg", blurb: "Our grandest bridal collection.", active: true },
  ],
};

function ensureFile(): void {
  try {
    const dir = path.dirname(FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify(SEED, null, 2));
  } catch {
    /* read-only fs (e.g. serverless) — fall back to seed in memory */
  }
}

export function readCatalog(): Catalog {
  ensureFile();
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw) as Catalog;
  } catch {
    return SEED;
  }
}

function writeCatalog(c: Catalog): void {
  fs.writeFileSync(FILE, JSON.stringify(c, null, 2));
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
}
function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------- Categories ----------
export function addCategory(name: string, blurb?: string): void {
  const c = readCatalog();
  const slug = slugify(name);
  const id = c.categories.some((x) => x.id === slug) ? uid(slug) : slug;
  c.categories.push({ id, name: name.trim(), slug: id, blurb: blurb?.trim() || undefined, subcategories: [] });
  writeCatalog(c);
}
export function renameCategory(id: string, name: string, blurb?: string): void {
  const c = readCatalog();
  const cat = c.categories.find((x) => x.id === id);
  if (cat) {
    cat.name = name.trim();
    if (blurb !== undefined) cat.blurb = blurb.trim() || undefined;
    writeCatalog(c);
  }
}
export function deleteCategory(id: string): void {
  const c = readCatalog();
  c.categories = c.categories.filter((x) => x.id !== id);
  c.products = c.products.filter((p) => p.categoryId !== id);
  writeCatalog(c);
}

// ---------- Subcategories ----------
export function addSubcategory(categoryId: string, name: string): void {
  const c = readCatalog();
  const cat = c.categories.find((x) => x.id === categoryId);
  if (cat) {
    const id = uid(slugify(name));
    cat.subcategories.push({ id, name: name.trim() });
    writeCatalog(c);
  }
}
export function deleteSubcategory(categoryId: string, subId: string): void {
  const c = readCatalog();
  const cat = c.categories.find((x) => x.id === categoryId);
  if (cat) {
    cat.subcategories = cat.subcategories.filter((s) => s.id !== subId);
    c.products.forEach((p) => {
      if (p.categoryId === categoryId && p.subcategoryId === subId) p.subcategoryId = undefined;
    });
    writeCatalog(c);
  }
}

// ---------- Products ----------
export function addProduct(input: Omit<CatalogProduct, "id" | "active"> & { active?: boolean }): void {
  const c = readCatalog();
  c.products.push({ ...input, id: uid("p"), active: input.active ?? true });
  writeCatalog(c);
}
export function updateProduct(id: string, patch: Partial<CatalogProduct>): void {
  const c = readCatalog();
  const p = c.products.find((x) => x.id === id);
  if (p) {
    Object.assign(p, patch);
    writeCatalog(c);
  }
}
export function deleteProduct(id: string): void {
  const c = readCatalog();
  c.products = c.products.filter((p) => p.id !== id);
  writeCatalog(c);
}

// ---------- Reads ----------
export function getCategoryBySlug(slug: string): Category | undefined {
  return readCatalog().categories.find((c) => c.slug === slug || c.id === slug);
}
export function productsIn(categoryId: string): CatalogProduct[] {
  return readCatalog().products.filter((p) => p.categoryId === categoryId && p.active);
}
