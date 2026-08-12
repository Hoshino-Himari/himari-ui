"use client";

import { useRef } from "react";
import { FloatingNavbar } from "@/components/ui/floating-navbar";

const items = [
  { label: "首頁", href: "#home" },
  { label: "元件", href: "#components" },
  { label: "定價", href: "#pricing" },
  { label: "關於", href: "#about" },
];

const sections = [
  "往下捲動，導覽列會收起來；往上捲動又會滑出來。",
  "這種模式常用在內容很長的頁面：閱讀時把畫面留給內容，需要導覽時往上捲一下就好。",
  "導覽列本身是玻璃模糊的膠囊造型，疊在任何內容上都不突兀。",
  "已經捲到底了嗎？往上捲一點點，看導覽列滑出來。",
];

export default function FloatingNavbarDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-80 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <FloatingNavbar
        items={items}
        activeHref="#home"
        scrollContainer={containerRef}
        position="sticky"
      />
      <div className="space-y-16 px-8 pt-10 pb-16">
        {sections.map((text, index) => (
          <section key={index}>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              段落 {index + 1}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {text}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
