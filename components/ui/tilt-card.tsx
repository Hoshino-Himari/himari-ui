"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * 3D 傾斜卡片：依游標在卡片上的位置做 rotateX / rotateY 傾斜，內容帶 translateZ 景深，
 * 游標離開後以 spring 回正。
 * @example
 * <TiltCard>
 *   <h3>標題</h3>
 *   <p>內容</p>
 * </TiltCard>
 */
type TiltCardProps = {
  children: ReactNode;
  /** 最大傾斜角度（度） */
  maxTilt?: number;
  /** 內容抬升的景深距離（px） */
  depth?: number;
  className?: string;
};

export function TiltCard({
  children,
  maxTilt = 12,
  depth = 36,
  className = "",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // -0.5 ~ 0.5：游標相對卡片中心的位置比例
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 18, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig,
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-zinc-950/40 ${className}`}
      >
        <div
          style={{
            transform: reduced ? undefined : `translateZ(${depth}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
