import type { Metadata } from "next";
import { CustomizeBuilder } from "@/components/CustomizeBuilder";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Customise your surprise",
  description:
    "Set your own budget from ₹70, pick a colour, choose what it's for — even a cup, a book or a pen — and write us a note. We'll surprise you.",
};

export default function CustomizePage() {
  return (
    <div className="vv-container py-14">
      <div className="max-w-2xl">
        <span className="chip chip-accent">
          <Icon.sparkle width={14} height={14} /> you&apos;re the designer
        </span>
        <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
          Customise your surprise
        </h1>
        <p className="mt-3 text-stone">
          Your budget, your colour, your note — our little magic. Start from{" "}
          <span className="font-semibold text-ink">₹70</span>. Want a ring, a
          pendant, a jewellery mix… or something else like a cup, a book or a
          pen for her or him? Just tell us. 🤍
        </p>
      </div>

      <div className="mt-10">
        <CustomizeBuilder />
      </div>
    </div>
  );
}
