"use client";

import { ImageAccordion } from "@/components/ui/image-accordion";
import { gradientImage } from "./_gradient-image";

const panels = [
  {
    image: gradientImage("#f59e0b", "#7c2d12", "山"),
    title: "稜線",
    description: "清晨五點的第一道光。",
  },
  {
    image: gradientImage("#38bdf8", "#1e3a8a", "海"),
    title: "潮汐",
    description: "退潮後留下的水窪。",
  },
  {
    image: gradientImage("#10b981", "#065f46", "林"),
    title: "苔原",
    description: "雨後整片森林都在滴水。",
  },
  {
    image: gradientImage("#ec4899", "#4c1d95", "夜"),
    title: "霓虹",
    description: "凌晨兩點的騎樓招牌。",
  },
];

export default function ImageAccordionDemo() {
  return (
    <div className="w-full px-4 py-4">
      <ImageAccordion panels={panels} height="22rem" />
    </div>
  );
}
