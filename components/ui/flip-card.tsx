"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * 翻轉卡片：hover 或點擊時沿 Y 軸 3D 翻面，front / back 各接一個 ReactNode。
 * 鍵盤聚焦（hover 模式）或 Enter / 空白鍵（click 模式）也能翻面。
 * @example
 * <FlipCard front={<div>正面</div>} back={<div>背面</div>} />
 */
type FlipCardProps = {
  /** 正面內容 */
  front: ReactNode;
  /** 背面內容 */
  back: ReactNode;
  /** 翻面觸發方式 */
  trigger?: "hover" | "click";
  /** 翻面動畫秒數 */
  duration?: number;
  className?: string;
};

export function FlipCard({
  front,
  back,
  trigger = "hover",
  duration = 0.6,
  className = "",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const interactionProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setFlipped(true),
          onMouseLeave: () => setFlipped(false),
          onFocus: () => setFlipped(true),
          onBlur: () => setFlipped(false),
          tabIndex: 0,
        }
      : {
          role: "button",
          tabIndex: 0,
          "aria-pressed": flipped,
          onClick: () => setFlipped((f) => !f),
          onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setFlipped((f) => !f);
            }
          },
        };

  return (
    <div
      className={`h-52 w-80 cursor-pointer rounded-2xl [perspective:1000px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 ${className}`}
      {...interactionProps}
    >
      <div
        className="relative h-full w-full transition-transform ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none"
        style={{
          transitionDuration: `${duration}s`,
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]"
          aria-hidden={flipped}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-hidden={!flipped}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
