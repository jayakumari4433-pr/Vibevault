"use client";

import { vibes } from "@/lib/vibes";
import { colours } from "@/lib/products";
import type { VibeSlug } from "@/lib/types";

export function VibeChips({
  value,
  onChange,
}: {
  value: VibeSlug | null;
  onChange: (v: VibeSlug) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {vibes.map((v) => {
        const active = value === v.slug;
        return (
          <button
            key={v.slug}
            type="button"
            data-vibe={v.slug}
            onClick={() => onChange(v.slug)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
              active
                ? "border-transparent text-white"
                : "border-line bg-paper text-stone hover:text-ink"
            }`}
            style={active ? { background: "var(--accent)" } : undefined}
          >
            <span>{v.emoji}</span> {v.name}
          </button>
        );
      })}
    </div>
  );
}

export function ColourSwatches({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string, label: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {colours.map((c) => {
        const active = value === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id, c.label)}
            title={c.label}
            aria-label={c.label}
            className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-sm transition-all ${
              active
                ? "border-ink bg-cream text-ink"
                : "border-line bg-paper text-stone hover:text-ink"
            }`}
          >
            <span
              className="h-5 w-5 rounded-full border border-black/10"
              style={{ background: c.swatch }}
            />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

export function NoteField({
  value,
  onChange,
  placeholder,
  max = 240,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max?: number;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={
          placeholder ??
          "Tell us what you're hoping for… a mood, an occasion, a 'please no X'. We read every one 🤍"
        }
        rows={3}
        className="field resize-none"
      />
      <div className="mt-1 text-right text-xs text-mute">
        {value.length}/{max}
      </div>
    </div>
  );
}
