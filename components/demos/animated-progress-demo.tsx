"use client";

import { useEffect, useState } from "react";

import { AnimatedProgress } from "@/components/ui/animated-progress";

export default function AnimatedProgressDemo() {
  const [value, setValue] = useState(24);

  // 每 2 秒換一個進度值，示範受控 value 的平滑過渡
  useEffect(() => {
    const values = [24, 58, 82, 100, 42];
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % values.length;
      setValue(values[i] ?? 0);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-48 flex-col items-center justify-center gap-8 px-6">
      <div className="w-full max-w-sm space-y-6">
        <AnimatedProgress value={value} showLabel label="下載進度" />
        <AnimatedProgress value={value} color="#22d3ee" height={6} label="上傳進度" />
      </div>
      <p className="text-sm text-ink-faint">進度值每 2 秒自動變化，示範平滑過渡</p>
    </div>
  );
}
