"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inr } from "@/lib/format";
import { Icon } from "@/components/icons";
import type { Catalog } from "@/lib/catalog-types";
import {
  addCategoryAction,
  deleteCategoryAction,
  addSubcategoryAction,
  deleteSubcategoryAction,
  addProductAction,
  deleteProductAction,
} from "@/app/admin/catalog-actions";

export function CatalogManager({ catalog }: { catalog: Catalog }) {
  const router = useRouter();
  const [, start] = useTransition();
  const run = (fn: () => Promise<void>) => start(async () => { await fn(); router.refresh(); });

  const [newCat, setNewCat] = useState("");

  return (
    <div className="space-y-6">
      {/* add category */}
      <div className="card p-5">
        <h2 className="text-lg font-bold text-ink">Add a category</h2>
        <p className="mt-1 text-sm text-stone">e.g. Mystery Box, Jewellery Boxes, Rings…</p>
        <div className="mt-3 flex gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Category name"
            className="field"
          />
          <button
            onClick={() => { if (newCat.trim()) { run(() => addCategoryAction(newCat, "")); setNewCat(""); } }}
            className="btn btn-accent shrink-0 px-5"
          >
            Add
          </button>
        </div>
      </div>

      {catalog.categories.map((cat) => (
        <CategoryBlock key={cat.id} cat={cat} catalog={catalog} run={run} />
      ))}

      {catalog.categories.length === 0 && (
        <p className="text-sm text-mute">No categories yet — add your first above.</p>
      )}
    </div>
  );
}

function CategoryBlock({
  cat,
  catalog,
  run,
}: {
  cat: Catalog["categories"][number];
  catalog: Catalog;
  run: (fn: () => Promise<void>) => void;
}) {
  const products = catalog.products.filter((p) => p.categoryId === cat.id);
  const [newSub, setNewSub] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  // new product form state
  const [p, setP] = useState({ name: "", price: "", subcategoryId: "", image: "", blurb: "" });

  function submitProduct() {
    if (!p.name.trim()) return;
    run(() =>
      addProductAction({
        name: p.name,
        price: Number(p.price) || 0,
        categoryId: cat.id,
        subcategoryId: p.subcategoryId || undefined,
        image: p.image,
        blurb: p.blurb,
      }),
    );
    setP({ name: "", price: "", subcategoryId: "", image: "", blurb: "" });
    setShowAdd(false);
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">{cat.name}</h3>
          <p className="text-xs text-mute">/category/{cat.slug} · {products.length} product{products.length === 1 ? "" : "s"}</p>
        </div>
        <button
          onClick={() => { if (confirm(`Delete category "${cat.name}" and all its products?`)) run(() => deleteCategoryAction(cat.id)); }}
          className="text-mute hover:text-clay"
          aria-label="Delete category"
        >
          <Icon.trash width={18} height={18} />
        </button>
      </div>

      {/* subcategories */}
      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-mute">Subcategories</div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {cat.subcategories.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1 text-sm text-ink">
              {s.name}
              <button onClick={() => run(() => deleteSubcategoryAction(cat.id, s.id))} className="text-mute hover:text-clay" aria-label={`Remove ${s.name}`}>
                <Icon.close width={13} height={13} />
              </button>
            </span>
          ))}
          <span className="inline-flex items-center gap-1">
            <input
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              placeholder="+ subcategory"
              className="field h-8 w-40 py-1 text-sm"
            />
            <button
              onClick={() => { if (newSub.trim()) { run(() => addSubcategoryAction(cat.id, newSub)); setNewSub(""); } }}
              className="btn btn-ghost h-8 px-3 text-xs"
            >
              Add
            </button>
          </span>
        </div>
      </div>

      {/* products */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wide text-mute">Products</div>
          <button onClick={() => setShowAdd((v) => !v)} className="text-sm font-medium text-clay hover:underline">
            {showAdd ? "Cancel" : "+ Add product"}
          </button>
        </div>

        {showAdd && (
          <div className="mt-3 grid gap-2 rounded-xl border border-line bg-cream p-4 sm:grid-cols-2">
            <input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} placeholder="Product name" className="field sm:col-span-2" />
            <input value={p.price} onChange={(e) => setP({ ...p, price: e.target.value })} placeholder="Price (₹)" inputMode="numeric" className="field" />
            <select value={p.subcategoryId} onChange={(e) => setP({ ...p, subcategoryId: e.target.value })} className="field">
              <option value="">No subcategory</option>
              {cat.subcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <input value={p.image} onChange={(e) => setP({ ...p, image: e.target.value })} placeholder="Image path e.g. /images/ring.jpg" className="field sm:col-span-2" />
            <input value={p.blurb} onChange={(e) => setP({ ...p, blurb: e.target.value })} placeholder="Short description" className="field sm:col-span-2" />
            <button onClick={submitProduct} className="btn btn-accent sm:col-span-2">Save product</button>
          </div>
        )}

        <div className="mt-3 space-y-2">
          {products.map((pr) => {
            const sub = cat.subcategories.find((s) => s.id === pr.subcategoryId);
            return (
              <div key={pr.id} className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-cream">
                  {pr.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pr.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-ink">{pr.name}</div>
                  <div className="text-xs text-stone">{sub ? `${sub.name} · ` : ""}{inr(pr.price)}</div>
                </div>
                <button onClick={() => run(() => deleteProductAction(pr.id))} className="text-mute hover:text-clay" aria-label="Delete product">
                  <Icon.trash width={16} height={16} />
                </button>
              </div>
            );
          })}
          {products.length === 0 && <p className="text-sm text-mute">No products yet.</p>}
        </div>
      </div>
    </div>
  );
}
