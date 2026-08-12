import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_TC, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Himari UI — 繁體中文 UI 元件庫",
    template: "%s — Himari UI",
  },
  description:
    "分門別類、複製即用的 React + Tailwind 動效元件庫。每個元件都是完整自足的單一檔案，貼進任何專案就能跑。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${spaceGrotesk.variable} ${notoSansTC.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
