"use client";

// 移植自 GodUI <https://godui.design/docs/components/effects/image-trail> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import * as React from "react";

/**
 * 圖片拖尾：游標在區域內移動時，一張張圖片沿著軌跡依序浮現又淡出，還會朝移動方向微微傾斜。
 * 開啟減少動態時改成一排靜態小圖。
 * @example
 * <ImageTrail images={urls} className="h-96">
 *   <h2>把游標移過來</h2>
 * </ImageTrail>
 */
export type ImageTrailProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Images cycled through as the pointer moves. */
  images: string[];
  /** Minimum pointer distance (px) between two spawned images. */
  threshold?: number;
  /** Lifespan of each trail image, in ms. */
  duration?: number;
  /** Maximum images alive at once (the recycled DOM pool size). */
  max?: number;
  /** Width/height of each trail image, in px. */
  size?: number;
};

const TRAIL_IMG_CLASS =
  "absolute rounded-xl object-cover opacity-0 shadow-2xl ring-1 ring-[color-mix(in_srgb,var(--border,oklch(0.922_0_0))_40%,transparent)] will-change-transform";

const ImageTrail = React.forwardRef<HTMLDivElement, ImageTrailProps>(
  (
    {
      images,
      threshold = 64,
      duration = 750,
      max = 12,
      size = 180,
      className,
      children,
      onPointerMove,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

    // Pool of <img> slots, recycled round-robin. We drive everything with the
    // Web Animations API and direct style writes — no React re-render per move.
    const slots = React.useRef<(HTMLImageElement | null)[]>([]);
    const last = React.useRef<{ x: number; y: number } | null>(null);
    const slotIndex = React.useRef(0);
    const imageIndex = React.useRef(0);

    const spawn = (x: number, y: number, angleRad: number) => {
      const img = slots.current[slotIndex.current % max];
      slotIndex.current += 1;
      if (!img) return;

      img.src = images[imageIndex.current % images.length] as string;
      imageIndex.current += 1;

      const tilt = Math.max(-12, Math.min(12, (angleRad * 180) / Math.PI / 6));
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;

      img.animate(
        [
          {
            opacity: 0,
            transform: `translate(-50%, -50%) scale(0.4) rotate(${tilt}deg)`,
          },
          {
            opacity: 1,
            transform: `translate(-50%, -50%) scale(1) rotate(${tilt}deg)`,
            offset: 0.18,
          },
          {
            opacity: 0,
            transform: `translate(-50%, -65%) scale(0.92) rotate(${tilt}deg)`,
          },
        ],
        {
          duration,
          easing: "cubic-bezier(0.22,1,0.36,1)",
          fill: "forwards",
        },
      );
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e);
      const el = ref.current;
      if (!el || images.length === 0) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const prev = last.current;
      if (prev) {
        const dx = x - prev.x;
        const dy = y - prev.y;
        if (Math.hypot(dx, dy) < threshold) return;
        // Tilt the image a touch toward the direction of travel.
        spawn(x, y, Math.atan2(dy, dx));
      } else {
        spawn(x, y, 0);
      }
      last.current = { x, y };
    };

    return (
      <div
        ref={ref}
        data-slot="image-trail"
        onPointerMove={handlePointerMove}
        className={`relative overflow-hidden ${className ?? ""}`}
        {...props}
      >
        {/* Reduced-motion users get a calm static gallery instead of a trail. */}
        <div className="pointer-events-none absolute inset-0 hidden place-items-center motion-reduce:grid">
          <div className="flex flex-wrap justify-center gap-3 p-6 opacity-60">
            {images.slice(0, 5).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- 可攜元件，不依賴 next/image
              <img
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed gallery order
                key={i}
                src={src}
                alt=""
                className="size-24 rounded-lg object-cover shadow-md"
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 motion-reduce:hidden">
          {Array.from({ length: max }).map((_, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- 可攜元件，不依賴 next/image
            <img
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed recycled pool slot
              key={i}
              ref={(node) => {
                slots.current[i] = node;
              }}
              alt=""
              aria-hidden
              className={TRAIL_IMG_CLASS}
              style={{ width: size, height: size, left: 0, top: 0 }}
            />
          ))}
        </div>

        {children}
      </div>
    );
  },
);
ImageTrail.displayName = "ImageTrail";

export { ImageTrail };
