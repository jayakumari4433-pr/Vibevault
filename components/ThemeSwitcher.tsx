"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "blush", label: "Blush", swatch: "#d9638a" },
  { id: "mint", label: "Mint", swatch: "#3f9d78" },
  { id: "lilac", label: "Lilac", swatch: "#7d6bd0" },
  { id: "butter", label: "Butter", swatch: "#e0962f" },
];
const KEY = "vibevault.theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("blush");

  useEffect(() => {
    let saved = "blush";
    try {
      saved = localStorage.getItem(KEY) || "blush";
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function choose(id: string) {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Choose a colour theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => choose(t.id)}
          title={t.label}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.id}
          className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
            theme === t.id ? "border-ink" : "border-transparent"
          }`}
          style={{ background: t.swatch }}
        />
      ))}
    </div>
  );
}
