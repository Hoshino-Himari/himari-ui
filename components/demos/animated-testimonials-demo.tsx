"use client";

import type { CSSProperties } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { gradientImage } from "./_gradient-image";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--foreground": "oklch(93% 0.008 80)",
  "--muted-foreground": "oklch(71% 0.014 265)",
  "--muted": "oklch(22% 0.02 265)",
  "--accent": "oklch(26% 0.02 265)",
} as CSSProperties;

// 不放假見證：這裡輪播的是站上元件的實際說明
const testimonials = [
  {
    quote: "一道光帶沿著按鈕邊緣繞行， 用來強調頁面上最重要的那顆行動呼籲。",
    name: "微光按鈕",
    role: "按鈕 / Shimmer Button",
    src: gradientImage("#f59e0b", "#7c2d12", "按鈕", 600, 700),
  },
  {
    quote: "漸層色彩在文字上緩緩流動， 離開視窗時自動暫停動畫省效能。",
    name: "極光文字",
    role: "文字特效 / Aurora Text",
    src: gradientImage("#8b5cf6", "#4c1d95", "文字", 600, 700),
  },
  {
    quote: "上千顆粒子順著雜訊向量場流動， 拖出綢緞般的漸隱軌跡。",
    name: "流場",
    role: "背景特效 / Flow Field",
    src: gradientImage("#10b981", "#065f46", "背景", 600, 700),
  },
];

export default function AnimatedTestimonialsDemo() {
  return (
    <div className="flex w-full justify-center px-6 py-6" style={theme}>
      <AnimatedTestimonials testimonials={testimonials} interval={6000} />
    </div>
  );
}
