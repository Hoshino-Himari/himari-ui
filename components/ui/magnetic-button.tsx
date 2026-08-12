"use client";

import {
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * 磁吸按鈕：滑鼠靠近時按鈕被輕微吸向游標，離開後彈性回彈。
 * @example <MagneticButton>靠近我試試</MagneticButton>
 */
type MagneticButtonProps = {
  children: ReactNode;
  /** 吸附強度（0–1，越大偏移越明顯） */
  strength?: number;
  /** 感應範圍：按鈕外圍多少 px 內就開始吸附 */
  range?: number;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style"
>;

export function MagneticButton({
  children,
  strength = 0.35,
  range = 24,
  className = "",
  ...props
}: MagneticButtonProps) {
  const zoneRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });
  const reducedMotion = useReducedMotion();

  function handleMouseMove(event: MouseEvent<HTMLSpanElement>) {
    if (reducedMotion) return;
    const rect = zoneRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <span
      ref={zoneRef}
      className="inline-block"
      style={{ padding: range }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.96 }}
        className={`inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    </span>
  );
}
