"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/avatar-group> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 頭像群組：一排互相重疊的頭像，滑鼠移入時整排散開、單顆再往上浮起，超過上限的收成 +N。
 * 沒有圖片時自動退回文字縮寫。
 * @example
 * <AvatarGroup avatars={[{ fallback: "王" }, { fallback: "林" }]} max={4} />
 */
export type Avatar = {
  src?: string;
  alt?: string;
  /** Fallback initials shown when no `src` (or it fails to load). */
  fallback?: string;
  href?: string;
};

export type AvatarGroupSize = "sm" | "md" | "lg";

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  avatars: Avatar[];
  /** Maximum avatars shown before collapsing into a `+N` chip. */
  max?: number;
  size?: AvatarGroupSize;
  /** Spread the stack apart on hover. */
  spreadOnHover?: boolean;
};

const sizeClasses: Record<AvatarGroupSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

const overlap: Record<AvatarGroupSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};

const FALLBACK_CLASS =
  "flex size-full items-center justify-center bg-[var(--muted,oklch(0.97_0_0))] font-medium text-[var(--muted-foreground,oklch(0.556_0_0))]";

const RING_CLASS =
  "ring-2 ring-[var(--background,oklch(1_0_0))] rounded-full overflow-hidden bg-[var(--background,oklch(1_0_0))] shadow-sm";

function Initials({ avatar }: { avatar: Avatar }) {
  const [errored, setErrored] = React.useState(false);
  const label = avatar.fallback ?? avatar.alt?.slice(0, 2).toUpperCase() ?? "?";
  if (avatar.src && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 可攜元件，不依賴 next/image
      <img
        src={avatar.src}
        alt={avatar.alt ?? ""}
        onError={() => setErrored(true)}
        className="size-full object-cover"
      />
    );
  }
  return <span className={FALLBACK_CLASS}>{label}</span>;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { avatars, max = 4, size = "md", spreadOnHover = true, className, ...props },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - visible.length;
    const margin = -overlap[size];

    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover={spreadOnHover && !reduceMotion ? "spread" : undefined}
        animate="rest"
        className={`group flex items-center ${className ?? ""}`}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {visible.map((avatar, i) => {
          const inner = (
            // biome-ignore lint/correctness/useJsxKeyInIterable: keyed on the wrapper element returned below
            <motion.div
              variants={{
                rest: { marginLeft: i === 0 ? 0 : margin, y: 0 },
                spread: { marginLeft: i === 0 ? 0 : 4, y: -2 },
              }}
              transition={{ type: "spring", stiffness: 520, damping: 32 }}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.06 }}
              style={{ zIndex: i }}
              className={`relative ${sizeClasses[size]} ${RING_CLASS}`}
            >
              <Initials avatar={avatar} />
            </motion.div>
          );
          return avatar.href ? (
            <a
              // biome-ignore lint/suspicious/noArrayIndexKey: stable avatar order
              key={i}
              href={avatar.href}
              aria-label={avatar.alt}
              className="inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,oklch(0.708_0_0))]"
            >
              {inner}
            </a>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable avatar order
            <React.Fragment key={i}>{inner}</React.Fragment>
          );
        })}

        {overflow > 0 && (
          <motion.div
            variants={{
              rest: { marginLeft: margin },
              spread: { marginLeft: 4 },
            }}
            transition={{ type: "spring", stiffness: 520, damping: 32 }}
            style={{ zIndex: visible.length }}
            className={`relative flex items-center justify-center rounded-full bg-[var(--muted,oklch(0.97_0_0))] font-medium text-[var(--muted-foreground,oklch(0.556_0_0))] ring-2 ring-[var(--background,oklch(1_0_0))] ${sizeClasses[size]}`}
          >
            +{overflow}
          </motion.div>
        )}
      </motion.div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
