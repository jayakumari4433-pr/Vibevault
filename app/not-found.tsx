import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-sand px-6 text-center">
      <div>
        <LogoMark className="mx-auto h-16 w-16 animate-float" />
        <p className="eyebrow mt-6">error 404</p>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
          This surprise got away
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-stone">
          The page you&apos;re after drifted off. Let&apos;s get you back to the
          good stuff.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-accent">Back to home</Link>
          <Link href="/boxes" className="btn btn-ghost">Shop the boxes</Link>
        </div>
      </div>
    </main>
  );
}
