"use client";

import { SpotlightReveal } from "@/components/ui/spotlight-reveal";

export default function SpotlightRevealDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-6">
      <SpotlightReveal
        className="h-72 w-full max-w-xl"
        radius={130}
        reveal={
          // 下層：被光圈照到才會露出來的內容
          <div
            className="flex size-full flex-col items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #6366f1 100%)",
            }}
          >
            <span className="text-3xl font-bold tracking-widest text-white drop-shadow">
              已解鎖
            </span>
            <span className="text-sm text-white/85">光圈照到哪就露到哪</span>
          </div>
        }
      >
        {/* 上層：被光圈挖穿的封面 */}
        <div className="flex size-full items-center justify-center bg-zinc-900">
          <span className="text-3xl font-bold tracking-widest text-zinc-500">
            尚未解鎖
          </span>
        </div>
      </SpotlightReveal>
      <p className="text-sm text-ink-mute">
        把游標移進去挖開上層；點一下可以把光圈釘在原地
      </p>
    </div>
  );
}
