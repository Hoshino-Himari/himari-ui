"use client";

import { ImageAccordion } from "@/components/ui/image-accordion";

const panels = [
  {
    image: "/demos/ridgeline.png",
    title: "稜線",
    description: "清晨五點的第一道光。",
  },
  {
    image: "/demos/tidal-pools.png",
    title: "潮汐",
    description: "退潮後留下的水窪。",
  },
  {
    image: "/demos/rainforest.png",
    title: "苔原",
    description: "雨後整片森林都在滴水。",
  },
  {
    image: "/demos/neon-arcade.png",
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
