"use client";

import { CardSwap } from "@/components/ui/card-swap";

const cards = [
  {
    title: "設計系統",
    body: "統一的色彩、字型與間距規範，讓介面維持一致的質感。",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  },
  {
    title: "動效元件",
    body: "80+ 個開箱即用的動效元件，複製一個檔案就能使用。",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
  },
  {
    title: "深色介面",
    body: "為深夜工作室打造的深色主題，長時間閱讀也不刺眼。",
    gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
  },
];

export default function CardSwapDemo() {
  return (
    <div className="flex w-full justify-center pb-16 pt-6">
      <CardSwap className="h-52 w-64" interval={3000}>
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex h-full w-full flex-col justify-end rounded-2xl p-5 text-white shadow-xl"
            style={{ background: card.gradient }}
          >
            <div className="text-lg font-bold">{card.title}</div>
            <p className="mt-1 text-sm leading-relaxed text-white/85">{card.body}</p>
          </div>
        ))}
      </CardSwap>
    </div>
  );
}
