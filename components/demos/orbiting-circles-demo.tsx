"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const orb =
  "flex size-full items-center justify-center rounded-full border border-zinc-200 bg-white text-base shadow-sm dark:border-zinc-800 dark:bg-zinc-950";

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden">
      <span className="pointer-events-none z-10 bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-2xl font-semibold text-transparent dark:from-zinc-100 dark:to-zinc-500">
        軌道
      </span>

      <OrbitingCircles radius={110} iconSize={40}>
        <span className={orb} aria-label="星星">
          ⭐
        </span>
        <span className={orb} aria-label="月亮">
          🌙
        </span>
        <span className={orb} aria-label="彗星">
          ☄️
        </span>
        <span className={orb} aria-label="行星">
          🪐
        </span>
      </OrbitingCircles>

      <OrbitingCircles radius={60} iconSize={28} reverse speed={1.6}>
        <span className={orb} aria-label="火箭">
          🚀
        </span>
        <span className={orb} aria-label="衛星">
          🛰️
        </span>
      </OrbitingCircles>
    </div>
  );
}
