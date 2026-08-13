"use client";

import { Highlighter } from "@/components/ui/highlighter";

export default function HighlighterDemo() {
  return (
    <div className="flex w-full justify-center py-8">
      <p className="max-w-md text-center text-lg leading-loose text-ink">
        Himari UI 收錄了{" "}
        <Highlighter action="highlight" color="#ffd60a">
          開箱即用
        </Highlighter>{" "}
        的動效元件，每一個都{" "}
        <Highlighter action="underline" color="#ff9500">
          完整自足
        </Highlighter>
        ，複製單一檔案就能{" "}
        <Highlighter action="circle" color="#bf5af2" padding={6}>
          直接使用
        </Highlighter>
        。
      </p>
    </div>
  );
}
