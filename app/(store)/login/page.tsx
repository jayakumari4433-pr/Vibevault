"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { LogoMark } from "@/components/Logo";

export default function LoginPage() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && user) router.replace("/account");
  }, [ready, user, router]);

  return (
    <div className="vv-container py-16">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <LogoMark className="mx-auto h-14 w-14" />
          <h1 className="mt-4 text-3xl font-bold text-ink">Welcome to VibeVault</h1>
          <p className="mt-2 text-stone">
            Log in or sign up to order and track your little surprises.
          </p>
        </div>
        <div className="mt-6">
          <AuthForm redirectTo="/account" />
        </div>
      </div>
    </div>
  );
}
