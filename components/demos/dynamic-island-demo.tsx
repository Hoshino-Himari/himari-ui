"use client";

import { useState } from "react";
import {
  DynamicIsland,
  type DynamicIslandSize,
} from "@/components/ui/dynamic-island";

const SIZES: { size: DynamicIslandSize; label: string }[] = [
  { size: "compact", label: "精簡" },
  { size: "default", label: "預設" },
  { size: "long", label: "加長" },
  { size: "tall", label: "加高" },
  { size: "large", label: "展開" },
];

function IslandContent({ size }: { size: DynamicIslandSize }) {
  switch (size) {
    case "compact":
      return (
        <div className="flex items-center gap-2 text-xs">
          <span className="size-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
          錄音中
        </div>
      );
    case "default":
      return (
        <div className="flex items-center gap-2 text-sm">
          <span aria-hidden>🎵</span>
          <span className="truncate">正在播放：示範曲目</span>
        </div>
      );
    case "long":
      return (
        <div className="flex w-full items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <span aria-hidden>📞</span> 來電：示範聯絡人
          </span>
          <span className="flex gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-red-500 text-xs">
              ✕
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-emerald-500 text-xs">
              ✓
            </span>
          </span>
        </div>
      );
    case "tall":
      return (
        <div className="flex flex-col items-center gap-1 text-sm">
          <span className="text-2xl" aria-hidden>
            ⏱️
          </span>
          <span className="font-semibold tabular-nums">12:34</span>
          <span className="text-xs text-white/60">計時器進行中</span>
        </div>
      );
    case "large":
      return (
        <div className="flex w-full flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">今日行程</span>
            <span className="text-xs text-white/60">3 項</span>
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-xs">
            10:00 設計評審會議
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-xs">
            14:30 元件庫發布
          </div>
        </div>
      );
  }
}

export default function DynamicIslandDemo() {
  const [size, setSize] = useState<DynamicIslandSize>("default");

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-8 px-6">
      <div className="flex h-52 items-start justify-center pt-4">
        <DynamicIsland size={size}>
          <IslandContent size={size} />
        </DynamicIsland>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SIZES.map(({ size: s, label }) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            aria-pressed={size === s}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
              size === s
                ? "border-accent bg-accent-soft text-accent"
                : "border-line bg-paper-2 text-ink-mute hover:bg-paper-3"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
