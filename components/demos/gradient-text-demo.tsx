"use client";

import { GradientText } from "@/components/ui/gradient-text";

export default function GradientTextDemo() {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-4 px-6 text-center">
      <GradientText className="text-4xl font-bold">讓文字自己會發光</GradientText>
      <GradientText
        colors={["#22d3ee", "#818cf8", "#f472b6"]}
        speed={3}
        className="text-xl font-semibold"
      >
        自訂顏色與流動速度
      </GradientText>
    </div>
  );
}
