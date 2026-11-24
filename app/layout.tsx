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
  metadataBase: new URL("https://clueandcharm.in"),
  title: {
    default: "Clue & Charm — follow the clue, find the charm.",
    template: "%s · Clue & Charm",
  },
  description:
    "India's feel-good mystery jewellery boxes. Pick your price, leave us a little note, and open a surprise made to feel like you.",
  keywords: [
    "mystery box",
    "mystery jewellery box India",
    "wedding jewellery box",
    "surprise jewellery box",
    "Clue & Charm",
  ],
  openGraph: {
    title: "Clue & Charm — follow the clue, find the charm.",
    description:
      "India's feel-good mystery jewellery boxes. A surprise made to feel like you.",
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
