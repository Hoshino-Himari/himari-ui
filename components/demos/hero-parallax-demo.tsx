"use client";

import { useRef } from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
const images = [
  "/demos/ridgeline.png",
  "/demos/tidal-pools.png",
  "/demos/rainforest.png",
  "/demos/neon-arcade.png",
];

const products = Array.from({ length: 15 }, (_, i) => {
  return {
    title: `作品 ${String(i + 1).padStart(2, "0")}`,
    thumbnail: images[i % images.length],
  };
});

export default function HeroParallaxDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm text-ink-mute">在下方框內往下捲動看視差效果：</p>
      <div
        ref={scrollRef}
        className="h-96 overflow-y-auto rounded-2xl border border-line"
      >
        <HeroParallax products={products} scrollContainer={scrollRef} />
      </div>
    </div>
  );
}
