"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient game atmosphere mounted once per storefront:
 *  - a drifting starfield / dust canvas (fixed, behind everything)
 *  - a soft jewel-glow that follows the cursor
 * Both are purely decorative, pointer-events disabled, and respect
 * prefers-reduced-motion.
 */
export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    let W = 0, H = 0, DPR = 1, raf = 0;
    const motes: { x: number; y: number; r: number; s: number; tw: number; tws: number }[] = [];

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = cv!.width = window.innerWidth * DPR;
      H = cv!.height = window.innerHeight * DPR;
      cv!.style.width = window.innerWidth + "px";
      cv!.style.height = window.innerHeight + "px";
    }
    resize();

    const count = window.innerWidth < 640 ? 44 : 80;
    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        r: (Math.random() * 1.5 + 0.4) * DPR,
        s: Math.random() * 0.0004 + 0.00008,
        tw: Math.random() * 6.28,
        tws: Math.random() * 0.03 + 0.008,
      });
    }

    function tick() {
      ctx!.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.y -= m.s;
        if (m.y < -0.02) m.y = 1.02;
        m.tw += m.tws;
        const o = 0.22 + Math.sin(m.tw) * 0.22;
        ctx!.beginPath();
        ctx!.arc(m.x * W, m.y * H, m.r, 0, 6.28);
        ctx!.fillStyle = `rgba(255,225,180,${o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    if (!reduce) tick();
    else {
      // draw one static frame
      for (const m of motes) {
        ctx.beginPath();
        ctx.arc(m.x * W, m.y * H, m.r, 0, 6.28);
        ctx.fillStyle = "rgba(255,225,180,0.3)";
        ctx.fill();
      }
    }

    window.addEventListener("resize", resize);

    const glow = glowRef.current;
    function onMove(e: PointerEvent) {
      if (!glow) return;
      glow.style.opacity = "1";
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
    function onLeave() {
      if (glow) glow.style.opacity = "0";
    }
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(216,179,106,0.13), rgba(207,143,136,0.06) 42%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
