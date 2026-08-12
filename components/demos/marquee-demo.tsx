"use client";

import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  { title: "即複即用", body: "複製單一檔案就能帶走整個元件。" },
  { title: "深色友善", body: "每個元件都在深淺色下測過。" },
  { title: "動畫節制", body: "只動 transform 與 opacity。" },
  { title: "尊重偏好", body: "支援 prefers-reduced-motion。" },
  { title: "型別完整", body: "Props 全部有 TypeScript 型別。" },
];

export default function MarqueeDemo() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <Marquee duration={25} pauseOnHover>
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="w-56 shrink-0 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {item.body}
            </p>
          </div>
        ))}
      </Marquee>
      <p className="text-center text-xs text-zinc-500">
        滑鼠移到卡片上會暫停捲動
      </p>
    </div>
  );
}
