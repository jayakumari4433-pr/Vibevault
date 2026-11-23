"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, adminSecret, adminPassword, isAdmin } from "./auth";
import {
  updateOrderStatus,
  setReviewStatus,
  adjustInventory,
  toggleCoupon,
} from "@/lib/db";
import type { OrderStatus } from "@/lib/types";

export async function adminLogin(password: string): Promise<{ ok: boolean }> {
  if (password === adminPassword()) {
    const c = await cookies();
    c.set(ADMIN_COOKIE, adminSecret(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return { ok: true };
  }
  return { ok: false };
}

export async function adminLogout(): Promise<void> {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
}

async function guard() {
  if (!(await isAdmin())) throw new Error("Not authorized");
}

export async function orderStatusAction(id: string, status: OrderStatus) {
  await guard();
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function reviewStatusAction(
  id: string,
  status: "pending" | "approved" | "hidden",
) {
  await guard();
  await setReviewStatus(id, status);
  revalidatePath("/admin/reviews");
}

export async function inventoryAction(id: string, stock: number, used: number) {
  await guard();
  await adjustInventory(id, stock, used);
  revalidatePath("/admin/inventory");
}

export async function couponAction(code: string, active: boolean) {
  await guard();
  await toggleCoupon(code, active);
  revalidatePath("/admin/coupons");
}
