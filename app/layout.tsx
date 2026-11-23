import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibevault.in"),
  title: {
    default: "VibeVault — a feeling, boxed.",
    template: "%s · VibeVault",
  },
  description:
    "India's feel-good mystery boxes. Pick your vibe, tell us a little, and open a surprise made to feel like you. Jewellery, rings, pendants — or customise your own from ₹70.",
  keywords: [
    "mystery box",
    "jewellery mystery box India",
    "ring mystery box",
    "pendant mystery box",
    "customised surprise box",
    "VibeVault",
  ],
  openGraph: {
    title: "VibeVault — a feeling, boxed.",
    description:
      "India's feel-good mystery boxes. A surprise made to feel like you.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
