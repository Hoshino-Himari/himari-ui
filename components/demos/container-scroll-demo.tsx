"use client";

import { useRef } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll";

export default function ContainerScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm text-ink-mute">
        在下方框內往下捲動，傾斜的裝置外框會慢慢立正放大：
      </p>
      <div
        ref={scrollRef}
        className="h-96 overflow-y-auto rounded-2xl border border-line"
      >
        <ContainerScroll
          scrollContainer={scrollRef}
          header={
            <div>
              <p className="text-sm text-ink-mute">為深夜工作室打造</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">Himari UI</h2>
            </div>
          }
        >
          <div
            className="flex size-full items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #6366f1 100%)",
            }}
          >
            <span className="text-2xl font-bold text-white drop-shadow">
              產品畫面
            </span>
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
