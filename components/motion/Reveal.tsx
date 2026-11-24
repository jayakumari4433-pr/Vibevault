"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children with a scroll-triggered animation the first time they
 * enter the viewport. Adds `.is-visible` to the `.reveal` element. Pass
 * `stagger` to cascade direct children. Honors prefers-reduced-motion via CSS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  stagger = false,
  className = "",
  threshold = 0.15,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      {...(stagger ? { "data-stagger": "" } : {})}
    >
      {children}
    </Tag>
  );
}
