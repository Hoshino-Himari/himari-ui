"use client";

import { useEffect, useRef, useState } from "react";
import { MagicInput, type MagicInputStatus } from "@/components/ui/magic-input";

export default function MagicInputDemo() {
  const [status, setStatus] = useState<MagicInputStatus>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const handleSubmit = () => {
    if (status !== "idle") return;
    setStatus("loading");
    timers.current.push(
      setTimeout(() => setStatus("success"), 1600),
      setTimeout(() => setStatus("idle"), 3000),
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md items-center justify-center rounded-2xl bg-zinc-100 p-8">
        <MagicInput
          className="w-full max-w-xs"
          placeholder="輸入你的電子郵件"
          submitLabel="送出"
          status={status}
          onSubmit={handleSubmit}
        />
      </div>
      <p className="text-sm text-ink-mute">
        聚焦看彩虹流光，按 Enter 或箭頭送出走一輪載入→成功
      </p>
    </div>
  );
}
