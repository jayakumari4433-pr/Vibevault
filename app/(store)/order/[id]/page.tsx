import Link from "next/link";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { Sparkles } from "@/components/motion/Sparkles";

const timeline = [
  { key: "new", title: "Order placed", text: "We've got it! A WhatsApp confirmation is on its way.", done: true },
  { key: "packed", title: "Hand-packing your surprise", text: "A real person is reading your note and matching your box.", done: false },
  { key: "shipped", title: "On its way", text: "Tracked delivery with a live link on WhatsApp.", done: false },
  { key: "delivered", title: "Unbox the feeling", text: "Tag @clueandcharm in your unboxing for a little surprise!", done: false },
];

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="vv-container py-16">
      <div className="mx-auto max-w-2xl">
        <div className="card tint relative overflow-hidden p-8 text-center md:p-12">
          <Sparkles />
          <LogoMark className="relative mx-auto h-16 w-16 animate-float" />
          <div className="relative">
            <span className="chip chip-accent mx-auto mt-5">
              <Icon.check width={14} height={14} /> order confirmed
            </span>
            <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
              Yay — your surprise is locked in 🤍
            </h1>
            <p className="mt-3 text-stone">
              Order <span className="font-semibold text-ink">{id}</span>. We&apos;ll
              keep you posted on WhatsApp, every step.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                <Icon.whatsapp width={18} height={18} /> Track on WhatsApp
              </a>
              <Link href="/unboxings" className="btn btn-ghost">See unboxings</Link>
            </div>
          </div>
        </div>

        <div className="card mt-8 p-8">
          <h2 className="text-lg font-bold text-ink">Order status</h2>
          <ol className="mt-6 space-y-6">
            {timeline.map((s, i) => (
              <li key={s.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ${
                      s.done ? "bg-ink text-cream" : "border border-line bg-paper text-mute"
                    }`}
                  >
                    {s.done ? <Icon.check width={16} height={16} /> : i + 1}
                  </span>
                  {i < timeline.length - 1 && <span className="mt-1 h-10 w-px bg-line" />}
                </div>
                <div className="pb-1">
                  <div className={`font-semibold ${s.done ? "text-ink" : "text-stone"}`}>
                    {s.title}
                    {i === 0 && (
                      <span className="ml-2 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-clay">
                        current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-mute">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="btn btn-ghost">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
