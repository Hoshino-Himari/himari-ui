"use client";

import type { CSSProperties } from "react";
import { EncryptedCard } from "@/components/ui/encrypted-card";

// 元件的顏色都吃 CSS 變數（帶預設值），這裡改成深色主題示範可自訂性
const theme = {
  "--card": "#0b0f19",
  "--card-foreground": "#e4e7ec",
  "--border": "rgba(255,255,255,0.12)",
} as CSSProperties;

export default function EncryptedCardDemo() {
  return (
    <div className="flex justify-center px-6 py-8">
      <EncryptedCard
        className="w-full max-w-sm p-6"
        style={theme}
        streamColor="#f59e0b"
        streamOpacity={0.7}
      >
        <h3 className="text-lg font-semibold">端對端加密</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-80">
          把游標移到卡片上，亂碼字流會在游標周圍的圓形視窗裡不斷跳動，像正在解密。
        </p>
        <p className="mt-4 font-mono text-xs opacity-60">AES-256-GCM</p>
      </EncryptedCard>
    </div>
  );
}
