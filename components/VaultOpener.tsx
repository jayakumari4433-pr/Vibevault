"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { inr } from "@/lib/format";

type RarityName = "Common" | "Rare" | "Epic" | "Legendary";
const RARITIES: { name: RarityName; w: number; tag: string; rgb: [number, number, number]; cssVar: string }[] = [
  { name: "Common", w: 50, tag: "a lovely little find", rgb: [169, 161, 155], cssVar: "var(--color-common)" },
  { name: "Rare", w: 30, tag: "ooh — a rare one!", rgb: [134, 176, 168], cssVar: "var(--color-rare)" },
  { name: "Epic", w: 15, tag: "EPIC pull ✦", rgb: [168, 146, 180], cssVar: "var(--color-epic)" },
  { name: "Legendary", w: 5, tag: "LEGENDARY ✦✦", rgb: [216, 179, 106], cssVar: "var(--color-legend)" },
];
const FINDS = products.map((p) => ({
  img: p.image ?? "/images/jewellery.jpg",
  name: p.name,
  price: p.type === "customize" ? `from ${inr(p.price)}` : inr(p.price),
  href: p.type === "customize" ? "/customize" : `/box/${p.id}`,
}));

function pickWeighted<T extends { w: number }>(arr: T[]): T {
  const t = arr.reduce((s, a) => s + a.w, 0);
  let r = Math.random() * t;
  for (const a of arr) if ((r -= a.w) <= 0) return a;
  return arr[0];
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function VaultOpener() {
  const burstRef = useRef<HTMLCanvasElement | null>(null);
  const [state, setState] = useState<"idle" | "shaking" | "revealed">("idle");
  const [find, setFind] = useState(FINDS[0]);
  const [rarity, setRarity] = useState(RARITIES[1]);
  const [found, setFound] = useState(0);
  const [flash, setFlash] = useState(false);

  // burst particle system (scoped to the stage)
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; r: number; rgb: [number, number, number] }[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const cv = burstRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function size() {
      const r = cv!.getBoundingClientRect();
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv!.width = r.width * DPR;
      cv!.height = r.height * DPR;
    }
    size();
    window.addEventListener("resize", size);

    function loop() {
      ctx!.clearRect(0, 0, cv!.width, cv!.height);
      const ps = particles.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; p.vy += 0.12; p.life -= 0.016;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, Math.max(0.5, p.r * p.life), 0, 6.28);
        ctx!.fillStyle = `rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},${p.life})`;
        ctx!.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    if (!reduce) loop();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", size); };
  }, []);

  function spawnBurst(rgb: [number, number, number]) {
    const cv = burstRef.current;
    if (!cv) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const cx = (cv.width) / 2;
    const cy = (cv.height) / 2;
    for (let i = 0; i < 90; i++) {
      const a = Math.random() * 6.28;
      const sp = (Math.random() * 6 + 2) * DPR;
      particles.current.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, r: (Math.random() * 2.4 + 1) * DPR, rgb });
    }
  }

  function open() {
    if (state !== "idle") return;
    setState("shaking");
    window.setTimeout(() => {
      const r = pickWeighted(RARITIES);
      const f = pick(FINDS);
      setRarity(r);
      setFind(f);
      spawnBurst(r.rgb);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 700);
      setState("revealed");
      setFound((n) => Math.min(n + 1, 50));
    }, 500);
  }

  function reset() {
    setState("idle");
  }

  return (
    <div className="relative mx-auto mt-6 flex max-w-xl flex-col items-center">
      <div className="relative grid h-[420px] w-full place-items-center">
        {/* burst canvas */}
        <canvas ref={burstRef} aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full" />

        {/* orbit rings */}
        <div className="pointer-events-none absolute h-[320px] w-[320px] animate-spin-slow rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full border border-magenta/12 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "26s" }} />

        {/* vault */}
        {state !== "revealed" && (
          <button
            onClick={open}
            aria-label="Open the vault"
            className="group relative grid h-64 w-64 place-items-center transition-transform hover:scale-105 focus:outline-none"
          >
            {flash && (
              <span
                className="pointer-events-none absolute inset-0 z-20 rounded-full"
                style={{ background: "radial-gradient(circle,#fff,transparent 60%)", animation: "flashBurst 0.7s ease-out" }}
              />
            )}
            <svg
              viewBox="0 0 120 120"
              className="relative z-10 h-56 w-56 animate-breathe"
              style={state === "shaking" ? { animation: "shake 0.5s ease-in-out" } : undefined}
            >
              <defs>
                <linearGradient id="vo-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#e6c47f" /><stop offset="0.5" stopColor="#cf8f88" /><stop offset="1" stopColor="#d8b36a" />
                </linearGradient>
                <radialGradient id="vo-gem" cx="0.35" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#fff6e6" /><stop offset="0.4" stopColor="#e6c47f" /><stop offset="1" stopColor="#cf8f88" />
                </radialGradient>
              </defs>
              <rect x="16" y="20" width="88" height="82" rx="24" fill="rgba(255,255,255,0.03)" stroke="url(#vo-g)" strokeWidth="3" />
              <g transform="translate(60 54)">
                <path d="M0 -20 L18 -5 L11 20 L-11 20 L-18 -5 Z" fill="url(#vo-gem)" stroke="url(#vo-g)" strokeWidth="2" />
                <path d="M-18 -5 L18 -5 M0 -20 L0 20 M-18 -5 L0 20 L18 -5" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
              </g>
              <rect x="56" y="74" width="8" height="18" rx="4" fill="url(#vo-g)" />
            </svg>
            <span className="absolute -bottom-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-mute" style={{ animation: "pulseDim 2s ease-in-out infinite" }}>
              tap to open
            </span>
          </button>
        )}

        {/* reveal */}
        {state === "revealed" && (
          <div className="relative z-20 w-[300px]" style={{ animation: "popIn 0.5s cubic-bezier(0.2,1.3,0.4,1)" }}>
            <div className="card p-4 text-center" style={{ ["--rc" as string]: rarity.cssVar }}>
              <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={find.img} alt={find.name} className="h-full w-full object-cover" />
                <span className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 60px -4px ${rarity.cssVar}` }} />
              </div>
              <span className="rarity" style={{ ["--rc" as string]: rarity.cssVar }}>{rarity.name}</span>
              <h3 className="mt-2.5 text-xl font-bold text-ink">{find.name}</h3>
              <p className="mt-1 text-sm text-stone">{rarity.tag}</p>
              <div className="mt-1.5 text-lg font-bold text-gradient">{find.price}</div>
              <div className="mt-3.5 flex gap-2">
                <button onClick={reset} className="btn btn-ghost h-10 flex-1 text-sm">Open another</button>
                <Link href={find.href} className="btn btn-accent h-10 flex-1 text-sm">Claim it</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* collection meter */}
      <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-5 py-2.5">
        <span className="text-[13px] text-stone">Treasures found</span>
        <span className="h-[7px] w-32 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-gradient-to-r from-magenta to-gold transition-all duration-700" style={{ width: `${Math.max(2, (found / 50) * 100)}%` }} />
        </span>
        <b className="font-display text-gold">{found}</b>
        <span className="text-mute">/ 50</span>
      </div>
    </div>
  );
}
