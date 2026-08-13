"use client";

import { ThreeDMarquee } from "@/components/ui/three-d-marquee";
const imageSet = [
  "/demos/ridgeline.webp",
  "/demos/tidal-pools.webp",
  "/demos/rainforest.webp",
  "/demos/neon-arcade.webp",
];

const images = Array.from({ length: 16 }, (_, i) => imageSet[i % imageSet.length]);

export default function ThreeDMarqueeDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-paper-2">
      <ThreeDMarquee images={images} />
    </div>
  );
}
