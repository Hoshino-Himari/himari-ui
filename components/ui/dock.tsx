"use client";

import {
  createContext,
  useContext,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * macOS 風格 Dock：底部圖示列，游標靠近的圖示放大、鄰近圖示漸進縮放。
 * 以 Dock 包住多個 DockIcon 使用。
 * @example
 * <Dock>
 *   <DockIcon aria-label="首頁">🏠</DockIcon>
 *   <DockIcon aria-label="設定">⚙️</DockIcon>
 * </Dock>
 */
type DockContextValue = {
  mouseX: MotionValue<number>;
  size: number;
  magnification: number;
  distance: number;
};

const DockContext = createContext<DockContextValue | null>(null);

type DockProps = {
  children: ReactNode;
  /** 圖示基礎尺寸（px） */
  size?: number;
  /** 游標正下方時的放大尺寸（px） */
  magnification?: number;
  /** 放大效果的影響半徑（px） */
  distance?: number;
  className?: string;
};

export function Dock({
  children,
  size = 44,
  magnification = 76,
  distance = 140,
  className = "",
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      style={{ height: magnification + 12 }}
      className={`flex items-end gap-2 rounded-2xl border border-zinc-200 bg-white/70 px-3 pb-2 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/70 ${className}`}
    >
      <DockContext.Provider value={{ mouseX, size, magnification, distance }}>
        {children}
      </DockContext.Provider>
    </motion.div>
  );
}

type DockIconProps = {
  children: ReactNode;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

export function DockIcon({ children, className = "", ...props }: DockIconProps) {
  const ctx = useContext(DockContext);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  // 未包在 Dock 內時的安全預設值
  const fallbackX = useMotionValue(Number.POSITIVE_INFINITY);
  const mouseX = ctx?.mouseX ?? fallbackX;
  const size = ctx?.size ?? 44;
  const magnification = ctx?.magnification ?? 76;
  const distance = ctx?.distance ?? 140;

  const distanceFromCursor = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Number.POSITIVE_INFINITY;
    return x - bounds.left - bounds.width / 2;
  });
  const widthSync = useTransform(
    distanceFromCursor,
    [-distance, 0, distance],
    [size, magnification, size],
  );
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 13 });
  // 內容跟著格子等比縮放（讓 emoji / SVG 一起變大）
  const scale = useTransform(width, (w) => w / size);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={reduced ? { width: size, height: size } : { width, height: width }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 active:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:active:bg-zinc-600 ${className}`}
      {...props}
    >
      <motion.span
        aria-hidden
        style={reduced ? undefined : { scale }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
