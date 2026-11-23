import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin login · VibeVault",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <AdminLogin />;
}
