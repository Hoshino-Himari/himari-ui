"use client";

import { ElasticText } from "@/components/ui/elastic-text";

// Space Grotesk 是本站載入的 variable font（wght 300–700），
// 元件需要可變字重軸才看得到粗細掃過的效果。
const variableFont = { fontFamily: "var(--font-space-grotesk), sans-serif" };

export default function ElasticTextDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <ElasticText
          mode="auto"
          minWeight={300}
          maxWeight={700}
          className="text-4xl text-ink sm:text-5xl"
          style={variableFont}
        >
          Himari UI
        </ElasticText>
        <p className="text-xs text-ink-faint">auto 模式：聚光燈自動來回掃過</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ElasticText
          mode="hover"
          minWeight={300}
          maxWeight={700}
          radius={100}
          className="text-3xl text-ink-mute sm:text-4xl"
          style={variableFont}
        >
          Move your cursor here
        </ElasticText>
        <p className="text-xs text-ink-faint">hover 模式：字重跟著滑鼠位置起伏</p>
      </div>
    </div>
  );
}
