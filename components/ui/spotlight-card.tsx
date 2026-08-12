"use client";

import {
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/**
 * 聚光燈卡片：滑鼠在卡片上移動時，一圈柔和的 radial-gradient 光暈會跟著游標走，
 * 適合用來突顯功能介紹或定價卡片。
 * @example
 * <SpotlightCard>
 *   <h3>標題</h3>
 *   <p>內容</p>
 * </SpotlightCard>
 */
type SpotlightCardProps = {
  children: ReactNode;
  /** 光暈顏色（建議帶透明度的 rgba / hsla） */
  spotlightColor?: string;
  /** 光暈半徑（px） */
  spotlightSize?: number;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function SpotlightCard({
  children,
  spotlightColor = "rgba(245, 158, 11, 0.16)",
  spotlightSize = 320,
  className = "",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--himari-spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--himari-spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 ${className}`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at var(--himari-spot-x, 50%) var(--himari-spot-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
