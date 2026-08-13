"use client";

import type { CSSProperties } from "react";
import { OrbitCarousel } from "@/components/ui/orbit-carousel";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--card": "oklch(18% 0.02 265)",
  "--border": "oklch(27% 0.022 265)",
  "--foreground": "oklch(93% 0.008 80)",
  "--muted-foreground": "oklch(71% 0.014 265)",
  "--accent": "oklch(24% 0.02 265)",
} as CSSProperties;

const slides = [
  { label: "設計", gradient: "linear-gradient(160deg,#f59e0b,#7c2d12)" },
  { label: "動效", gradient: "linear-gradient(160deg,#8b5cf6,#4c1d95)" },
  { label: "排版", gradient: "linear-gradient(160deg,#10b981,#065f46)" },
  { label: "色彩", gradient: "linear-gradient(160deg,#38bdf8,#1e3a8a)" },
  { label: "互動", gradient: "linear-gradient(160deg,#ec4899,#831843)" },
];

export default function OrbitCarouselDemo() {
  return (
    <div className="flex justify-center overflow-hidden py-4">
      <OrbitCarousel
        radius={200}
        itemWidth={140}
        itemHeight={180}
        defaultIndex={2}
        style={theme}
      >
        {slides.map((slide) => (
          <div
            key={slide.label}
            className="flex size-full items-center justify-center text-2xl font-bold text-white"
            style={{ background: slide.gradient }}
          >
            {slide.label}
          </div>
        ))}
      </OrbitCarousel>
    </div>
  );
}
