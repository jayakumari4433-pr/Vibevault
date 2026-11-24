// Ambient floating sparkles. Deterministic positions (SSR-safe, no random),
// purely decorative. Sits behind content with pointer-events disabled.

const DOTS = [
  { top: "12%", left: "8%", size: 8, delay: "0s" },
  { top: "22%", left: "90%", size: 12, delay: "0.7s" },
  { top: "44%", left: "16%", size: 6, delay: "1.4s" },
  { top: "64%", left: "84%", size: 10, delay: "0.3s" },
  { top: "76%", left: "26%", size: 7, delay: "1.0s" },
  { top: "34%", left: "54%", size: 5, delay: "1.8s" },
  { top: "86%", left: "62%", size: 9, delay: "0.5s" },
  { top: "16%", left: "42%", size: 6, delay: "1.2s" },
];

export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="spark"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
