"use client";

import { useRef } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const paragraphs = [
  "捲動下方內容，頂端的漸層進度條會隨著捲動位置增長。",
  "進度條元件預設固定在頁面頂端追蹤整頁捲動；這裡透過 containerRef 改為追蹤這個固定高度的容器。",
  "適合放在長文閱讀頁、文件頁或部落格文章頂端，讓讀者隨時知道自己讀到哪裡。",
  "元件本身只是一條 h-px 的細線，用 transform: scaleX 依進度縮放，效能負擔極低。",
  "顏色是三段漸層，可以用 className 覆寫高度、位置與層級。",
  "繼續往下捲，進度條會慢慢走到 100%。",
  "已經接近底部了，進度條也快滿了。",
  "到底囉！往回捲動，進度條會跟著縮回。",
];

export default function ScrollProgressDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      // 讓元件的 fixed 定位以這個容器為基準
      style={{ transform: "translateZ(0)" }}
    >
      <ScrollProgress containerRef={scrollRef} />
      <div ref={scrollRef} className="h-full overflow-y-auto p-6">
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          捲動進度條
        </p>
        {paragraphs.map((text, i) => (
          <p key={i} className="mt-6 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
