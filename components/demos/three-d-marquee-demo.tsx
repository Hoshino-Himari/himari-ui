"use client";

import { ThreeDMarquee } from "@/components/ui/three-d-marquee";
const imageSet = [
  "/demos/ridgeline.png",
  "/demos/tidal-pools.png",
  "/demos/rainforest.png",
  "/demos/neon-arcade.png",
];

const images = Array.from({ length: 16 }, (_, i) => imageSet[i % imageSet.length]);

export default function ThreeDMarqueeDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-paper-2">
      <ThreeDMarquee images={images} />
    </div>
  );
}
