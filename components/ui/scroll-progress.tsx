"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/scroll-progress> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn，新增 containerRef prop 支援容器內捲動）。

import type * as React from "react";
import { motion, useScroll, type MotionProps } from "motion/react";

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
  /** 指定要追蹤的捲動容器；不傳則追蹤整頁捲動 */
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * 捲動進度條：固定在頂端的漸層細線，寬度隨捲動進度增長。
 * 預設追蹤整頁；傳入 containerRef 可改追蹤特定捲動容器。
 * @example <ScrollProgress className="top-16" />
 */
export function ScrollProgress({
  className,
  ref,
  containerRef,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}
