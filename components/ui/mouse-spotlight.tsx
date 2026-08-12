"use client";

import { useRef, type ReactNode } from "react";

/**
 * 滑鼠聚光燈：游標在區塊內移動時，一圈柔和光暈跟隨游標位置，
 * 移出區塊後光暈淡出。以 ref 直接更新樣式，不觸發 re-render。
 * @example
 * <MouseSpotlight className="h-72 rounded-xl bg-zinc-950">
 *   <p>把滑鼠移進來</p>
 * </MouseSpotlight>
 */
type MouseSpotlightProps = {
  children?: ReactNode;
  /** 光暈直徑（px） */
  size?: number;
  /** 光暈顏色（建議帶透明度） */
  color?: string;
  className?: string;
};

export function MouseSpotlight({
  children,
  size = 320,
  color = "rgba(56, 189, 248, 0.15)",
  className = "",
}: MouseSpotlightProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlay.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;
    overlay.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
}
