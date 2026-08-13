"use client";

// 移植自 GodUI <https://godui.design/docs/components/effects/lamp> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（主題 var(--primary) 改為帶 fallback、bg-card 改為 bg-zinc-950、z-raised 改為 z-10）。

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 聚光燈燈效：捲動進入視野時，兩道錐形光束向兩側點亮，標題從光暈中浮現。
 * @example <Lamp><h2>聚光燈下的主角</h2></Lamp>
 */
export type LampProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Accent color of the light. Accepts any CSS color. */
  color?: string;
};

const VIEWPORT = { once: true, margin: "-20%" } as const;

const Lamp = React.forwardRef<HTMLDivElement, LampProps>(
  (
    {
      color = "var(--primary, #22d3ee)",
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const lit = { scaleX: 1, opacity: 1 };
    const unlit = { scaleX: 0.5, opacity: 0 };

    return (
      <div
        ref={ref}
        data-slot="lamp"
        className={`relative isolate flex min-h-[24rem] w-full flex-col items-center justify-start overflow-hidden rounded-2xl bg-zinc-950 ${className ?? ""}`}
        style={{ ["--lamp" as string]: color, ...style }}
        {...props}
      >
        <div className="relative flex h-56 w-full scale-y-125 items-center justify-center">
          {/* Right cone of the lamp, mirrored from the left. */}
          <motion.div
            initial={reduceMotion ? lit : unlit}
            whileInView={lit}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute right-1/2 h-56 w-3/5 origin-right [background-image:conic-gradient(from_70deg_at_center_top,color-mix(in_oklch,var(--lamp)_60%,transparent),transparent,transparent)] [mask-image:linear-gradient(to_top,transparent,white)]"
          />
          <motion.div
            initial={reduceMotion ? lit : unlit}
            whileInView={lit}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-1/2 h-56 w-3/5 origin-left [background-image:conic-gradient(from_290deg_at_center_top,transparent,transparent,color-mix(in_oklch,var(--lamp)_60%,transparent))] [mask-image:linear-gradient(to_top,transparent,white)]"
          />
          {/* Glowing bar where the two cones meet. */}
          <motion.div
            initial={
              reduceMotion
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0.5, opacity: 0 }
            }
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 z-10 h-0.5 w-1/2 -translate-y-[3.5rem] rounded-full blur-sm [background:var(--lamp)]"
          />
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 z-10 h-36 w-full -translate-y-[6rem] [background:radial-gradient(ellipse_at_center_top,color-mix(in_oklch,var(--lamp)_25%,transparent),transparent_60%)]"
          />
        </div>

        {/* Headline rises into the light. */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="relative z-10 -mt-28 flex flex-col items-center px-6 text-center"
        >
          {children}
        </motion.div>
      </div>
    );
  },
);
Lamp.displayName = "Lamp";

export { Lamp };
