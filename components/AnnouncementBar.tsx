export function AnnouncementBar() {
  const items = [
    "✦ Free shipping over ₹249",
    "Cash on Delivery available",
    "Every box has a rarity — pull yours",
    "Customise from ₹70",
  ];
  return (
    <div className="relative z-10 border-b border-line bg-[#0b0712] text-stone">
      <div className="vv-container flex h-9 items-center justify-center gap-6 overflow-hidden text-xs font-medium">
        {items.map((t, i) => (
          <span key={i} className={i > 1 ? "hidden sm:inline" : ""}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
