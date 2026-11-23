import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/auth";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const metadata: Metadata = {
  title: "Admin · VibeVault",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  return <AdminChrome>{children}</AdminChrome>;
}
