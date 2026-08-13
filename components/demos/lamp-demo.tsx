"use client";

import { Lamp } from "@/components/ui/lamp";

export default function LampDemo() {
  return (
    <div className="w-full">
      <Lamp color="#22d3ee">
        <h3 className="bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          聚光燈下的主角
        </h3>
        <p className="mt-3 max-w-md text-sm text-zinc-400">
          捲動進入視野時，燈光向兩側點亮，標題從光暈中緩緩浮現。
        </p>
      </Lamp>
    </div>
  );
}
