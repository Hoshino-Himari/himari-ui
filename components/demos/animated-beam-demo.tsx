"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const nodeClass =
  "z-10 flex size-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-950";

const iconProps = {
  className: "size-5 text-zinc-700 dark:text-zinc-300",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export default function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-72 w-full max-w-md items-center justify-between px-8"
    >
      {/* 使用者 */}
      <div ref={userRef} className={nodeClass} title="使用者">
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
        </svg>
      </div>
      {/* 中心節點 */}
      <div ref={hubRef} className={nodeClass} title="伺服器">
        <svg {...iconProps}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01" />
        </svg>
      </div>
      {/* 雲端 */}
      <div ref={cloudRef} className={nodeClass} title="雲端">
        <svg {...iconProps}>
          <path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98A6 6 0 0 0 6.3 8.6 4.5 4.5 0 0 0 7 17.5Z" />
        </svg>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={hubRef}
        curvature={-60}
        duration={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={cloudRef}
        curvature={60}
        duration={5}
        delay={1}
        reverse
      />
    </div>
  );
}
