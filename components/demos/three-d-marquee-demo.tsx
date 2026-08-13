"use client";

import { ThreeDMarquee } from "@/components/ui/three-d-marquee";
import { gradientImage, gradientPairs } from "./_gradient-image";

const images = Array.from({ length: 16 }, (_, i) => {
  const [from, to] = gradientPairs[i % gradientPairs.length];
  return gradientImage(from, to, `${i + 1}`, 400, 300);
});

export default function ThreeDMarqueeDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-paper-2">
      <ThreeDMarquee images={images} />
    </div>
  );
}
