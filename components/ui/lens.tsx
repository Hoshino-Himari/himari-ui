"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/lens> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn，新增 className prop）。

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate } from "motion/react";

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface Position {
  /** The x coordinate of the lens */
  x: number;
  /** The y coordinate of the lens */
  y: number;
}

interface LensProps {
  /** The children of the lens */
  children: React.ReactNode;
  /** The zoom factor of the lens */
  zoomFactor?: number;
  /** The size of the lens */
  lensSize?: number;
  /** The position of the lens */
  position?: Position;
  /** The default position of the lens */
  defaultPosition?: Position;
  /** Whether the lens is static */
  isStatic?: boolean;
  /** The duration of the animation */
  duration?: number;
  /** The color of the lens */
  lensColor?: string;
  /** The aria label of the lens */
  ariaLabel?: string;
  className?: string;
}

/**
 * 放大鏡：滑鼠移到內容上時，出現一個跟著游標移動的圓形放大鏡片。
 * 也可用 isStatic + position 固定鏡片位置。
 * @example
 * <Lens zoomFactor={1.5}>
 *   <div className="h-48 w-72 bg-gradient-to-br from-violet-500 to-amber-300" />
 * </Lens>
 */
export function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
  className,
}: LensProps) {
  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than 1");
  }
  if (lensSize < 0) {
    throw new Error("lensSize must be greater than 0");
  }

  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>(position);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsHovering(false);
  }, []);

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 100%, transparent 100%)`;

  const LensContent = useMemo(() => {
    const { x, y } = currentPosition;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration }}
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${x}px ${y}px`,
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  }, [currentPosition, maskImage, zoomFactor, children, duration]);

  return (
    <div
      ref={containerRef}
      className={cn("relative z-20 overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {isStatic || defaultPosition ? (
        LensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {isHovering && LensContent}
        </AnimatePresence>
      )}
    </div>
  );
}
