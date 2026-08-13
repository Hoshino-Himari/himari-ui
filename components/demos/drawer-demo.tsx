"use client";

import { useState } from "react";
import { Drawer, type DrawerSide } from "@/components/ui/drawer";

const buttonClass =
  "rounded-full border border-line bg-paper-2 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<DrawerSide>("bottom");

  const openDrawer = (s: DrawerSide) => {
    setSide(s);
    setOpen(true);
  };

  return (
    <div className="flex h-56 flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() => openDrawer("bottom")}
        >
          開啟底部抽屜
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => openDrawer("right")}
        >
          開啟右側抽屜
        </button>
      </div>
      <p className="text-center text-xs text-ink-faint">
        抽屜為全螢幕浮層：點背景、按 Esc、往關閉方向拖曳都能關閉。
      </p>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side={side}
        title={side === "bottom" ? "播放佇列" : "篩選條件"}
      >
        <ul className="space-y-2 pb-2 text-sm text-zinc-500 dark:text-zinc-400">
          <li className="rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
            {side === "bottom" ? "示範曲目一 — 3:21" : "分類：浮層元件"}
          </li>
          <li className="rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
            {side === "bottom" ? "示範曲目二 — 4:05" : "來源：GodUI 移植"}
          </li>
          <li className="rounded-lg bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
            {side === "bottom" ? "示範曲目三 — 2:48" : "授權：MIT"}
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-transform duration-150 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.99] dark:bg-zinc-100 dark:text-zinc-900"
        >
          關閉抽屜
        </button>
      </Drawer>
    </div>
  );
}
