"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/animated-testimonials> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

/**
 * 動畫見證輪播：左側人像以微傾斜的牌堆輪流翻到最前面，右側引言逐字模糊淡入，
 * 可自動輪播也能手動前後切換。
 * @example
 * <AnimatedTestimonials
 *   testimonials={[{ quote: "很好用", name: "王小明", role: "設計師", src: "/a.jpg" }]}
 * />
 */
export type Testimonial = {
  /** The testimonial quote. */
  quote: string;
  /** Person's name. */
  name: string;
  /** Person's role / company. */
  role: string;
  /** Avatar / portrait image URL. */
  src: string;
};

export type AnimatedTestimonialsProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Testimonials to cycle through. */
  testimonials: Testimonial[];
  /** Advance automatically. */
  autoplay?: boolean;
  /** Autoplay interval in milliseconds. */
  interval?: number;
};

const ARROW_BASE =
  "flex size-9 items-center justify-center rounded-full bg-[var(--muted,oklch(0.97_0_0))] text-[var(--foreground,oklch(0.145_0_0))] [transition:background_200ms_ease] hover:bg-[var(--accent,oklch(0.97_0_0))]";

const AnimatedTestimonials = React.forwardRef<
  HTMLDivElement,
  AnimatedTestimonialsProps
>(
  (
    { testimonials, autoplay = true, interval = 5000, className, ...props },
    ref,
  ) => {
    const [active, setActive] = React.useState(0);
    const count = testimonials.length;

    const next = React.useCallback(
      () => setActive((prev) => (prev + 1) % count),
      [count],
    );
    const prev = () => setActive((p) => (p - 1 + count) % count);

    // Stable per-item rotation so inactive cards fan out consistently.
    const rotations = React.useMemo(
      () => testimonials.map(() => Math.floor(Math.random() * 16) - 8),
      [testimonials],
    );

    // Keyed on `active` so the countdown restarts whenever the slide changes —
    // including manual prev / next — instead of firing on a fixed cadence.
    // biome-ignore lint/correctness/useExhaustiveDependencies: `active` is the intentional reset trigger
    React.useEffect(() => {
      if (!autoplay || count <= 1) return;
      const id = setTimeout(next, interval);
      return () => clearTimeout(id);
    }, [autoplay, interval, next, count, active]);

    if (count === 0) return null;
    const current = testimonials[active];

    return (
      <div
        ref={ref}
        data-slot="animated-testimonials"
        className={`grid w-full max-w-3xl gap-8 md:grid-cols-2 ${className ?? ""}`}
        {...props}
      >
        <div className="relative h-72 [perspective:1000px]">
          <AnimatePresence>
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <motion.img
                  // biome-ignore lint/suspicious/noArrayIndexKey: stack position is the identity here
                  key={t.src + i}
                  src={t.src}
                  alt={t.name}
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.9, rotate: rotations[i] }}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    scale: isActive ? 1 : 0.92,
                    rotate: isActive ? 0 : rotations[i],
                    zIndex: isActive ? count : count - Math.abs(active - i),
                    y: isActive ? 0 : 8,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 32,
                    mass: 0.9,
                  }}
                  className="absolute inset-0 size-full rounded-2xl object-cover shadow-lg"
                />
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-[var(--foreground,oklch(0.145_0_0))]">
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    // biome-ignore lint/suspicious/noArrayIndexKey: words are positional within a quote
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.2, delay: 0.02 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
              <div className="mt-4">
                <div className="font-semibold text-[var(--foreground,oklch(0.145_0_0))]">
                  {current.name}
                </div>
                <div className="text-sm text-[var(--muted-foreground,oklch(0.556_0_0))]">
                  {current.role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className={ARROW_BASE}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className={ARROW_BASE}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    );
  },
);
AnimatedTestimonials.displayName = "AnimatedTestimonials";

export { AnimatedTestimonials };
