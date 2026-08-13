"use client";

import { ImageTrail } from "@/components/ui/image-trail";
import { gradientImage, gradientPairs } from "./_gradient-image";

const images = gradientPairs.map(([from, to], i) =>
  gradientImage(from, to, `${i + 1}`, 400, 400),
);

export default function ImageTrailDemo() {
  return (
    <div className="w-full px-6 py-6">
      <ImageTrail
        images={images}
        size={150}
        className="flex h-80 w-full items-center justify-center rounded-2xl bg-paper-2"
      >
        <div className="pointer-events-none relative z-10 text-center">
          <h3 className="text-2xl font-bold text-ink">把游標掃過這一塊</h3>
          <p className="mt-1 text-sm text-ink-mute">
            圖片會沿著游標軌跡一張張浮現又淡出
          </p>
        </div>
      </ImageTrail>
    </div>
  );
}
