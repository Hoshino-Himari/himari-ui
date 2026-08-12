"use client";

import { useState } from "react";
import { AnimatedSwitch } from "@/components/ui/animated-switch";

export default function AnimatedSwitchDemo() {
  const [notify, setNotify] = useState(true);

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-5 py-6">
      <label className="flex items-center justify-between gap-4 text-sm">
        <span>接收通知（受控）</span>
        <AnimatedSwitch
          checked={notify}
          onCheckedChange={setNotify}
          aria-label="接收通知"
        />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm">
        <span>訂閱電子報（非受控）</span>
        <AnimatedSwitch defaultChecked onColor="#6366f1" aria-label="訂閱電子報" />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm opacity-60">
        <span>尚未開放</span>
        <AnimatedSwitch disabled aria-label="尚未開放" />
      </label>
    </div>
  );
}
