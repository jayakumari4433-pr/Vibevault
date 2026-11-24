"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "./auth";
import {
  addCategory,
  renameCategory,
  deleteCategory,
  addSubcategory,
  deleteSubcategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/catalog";
import type { CatalogProduct } from "@/lib/catalog-types";

async function guard() {
  if (!(await isAdmin())) throw new Error("Not authorized");
}
function refresh() {
  revalidatePath("/admin/catalog");
  revalidatePath("/products");
  revalidatePath("/category", "layout");
}

export async function addCategoryAction(name: string, blurb: string) {
  await guard();
  if (name.trim()) addCategory(name, blurb);
  refresh();
}
export async function renameCategoryAction(id: string, name: string, blurb: string) {
  await guard();
  renameCategory(id, name, blurb);
  refresh();
}
export async function deleteCategoryAction(id: string) {
  await guard();
  deleteCategory(id);
  refresh();
}
export async function addSubcategoryAction(categoryId: string, name: string) {
  await guard();
  if (name.trim()) addSubcategory(categoryId, name);
  refresh();
}
export async function deleteSubcategoryAction(categoryId: string, subId: string) {
  await guard();
  deleteSubcategory(categoryId, subId);
  refresh();
}
export async function addProductAction(input: {
  name: string;
  price: number;
  categoryId: string;
  subcategoryId?: string;
  image?: string;
  blurb?: string;
}) {
  await guard();
  if (input.name.trim() && input.categoryId) {
    addProduct({
      name: input.name.trim(),
      price: Math.max(0, Math.round(input.price) || 0),
      categoryId: input.categoryId,
      subcategoryId: input.subcategoryId || undefined,
      image: input.image?.trim() || undefined,
      blurb: input.blurb?.trim() || undefined,
    });
  }
  refresh();
}
export async function updateProductAction(id: string, patch: Partial<CatalogProduct>) {
  await guard();
  updateProduct(id, patch);
  refresh();
}
export async function deleteProductAction(id: string) {
  await guard();
  deleteProduct(id);
  refresh();
}
