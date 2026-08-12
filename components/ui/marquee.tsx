"use client";

import { type ReactNode } from "react";

/**
 * 無限跑馬燈：內容複製兩份接續捲動，實現無縫循環；
 * 方向、速度、hover 暫停皆可調，並尊重 prefers-reduced-motion。
 * @example
 * <Marquee duration={25} pauseOnHover>
 *   <span>項目一</span>
 *   <span>項目二</span>
 * </Marquee>
 */
type MarqueeProps = {
  children: ReactNode;
  /** 捲動方向 */
  direction?: "left" | "right";
  /** 捲完一輪的秒數，越小越快 */
  duration?: number;
  /** 項目間距（px） */
  gap?: number;
  /** 滑鼠移入時暫停 */
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({
  children,
  direction = "left",
  duration = 30,
  gap = 16,
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`himari-marquee group flex w-full overflow-hidden ${className}`}
      style={{ gap, ["--himari-marquee-gap" as string]: `${gap}px` }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={`himari-marquee-track flex shrink-0 items-center ${
            pauseOnHover ? "himari-marquee-pausable" : ""
          }`}
          style={{
            gap,
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        .himari-marquee-track {
          min-width: 100%;
          animation-name: himari-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes himari-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--himari-marquee-gap, 16px))); }
        }
        .himari-marquee:hover .himari-marquee-pausable {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
