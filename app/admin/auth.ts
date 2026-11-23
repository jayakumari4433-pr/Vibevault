import "server-only";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vv_admin";

export function adminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "vibevault-dev-secret";
}
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "vault123";
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminSecret();
}
