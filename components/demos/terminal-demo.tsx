"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <Terminal className="text-zinc-800 dark:text-zinc-200">
        <TypingAnimation>&gt; npx himari-ui@latest init</TypingAnimation>
        <AnimatedSpan className="text-green-500">
          ✔ 檢查專案環境。
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ 驗證 Tailwind CSS 設定。
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ 驗證 import alias。
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ 寫入 components.json。
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          ✔ 更新 CSS 變數。
        </AnimatedSpan>
        <AnimatedSpan className="text-blue-500">
          <span>ℹ 已更新 1 個檔案：</span>
          <span className="pl-2">- lib/utils.ts</span>
        </AnimatedSpan>
        <TypingAnimation className="text-zinc-500">
          安裝完成，可以開始加入元件了。
        </TypingAnimation>
      </Terminal>
    </div>
  );
}
