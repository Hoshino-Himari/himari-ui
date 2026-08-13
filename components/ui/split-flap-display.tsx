"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/split-flap-display> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（動畫 keyframes 內嵌、主題變數加上 fallback）。

import { useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 翻牌顯示器：機場看板風格的機械翻字板，捲動進入視窗後逐欄波浪式翻出目標文字。
 * @example <SplitFlapDisplay value="NOW BOARDING" />
 */

/**
 * Reveal-on-scroll, iframe-safe. Framer's `useInView` observes with the parent
 * window's IntersectionObserver, which never intersects an element rendered
 * inside a same-origin `<iframe>` (e.g. the docs mobile-preview stage). Creating
 * the observer from the element's OWN `defaultView` roots it in that document's
 * viewport, so the board reveals in an iframe just like on the page.
 */
function useInViewOnce(ref: React.RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const win = el.ownerDocument.defaultView ?? window;
    if (!("IntersectionObserver" in win)) {
      setInView(true);
      return;
    }
    const io = new win.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, inView]);
  return inView;
}

export type SplitFlapSize = "sm" | "md" | "lg";
export type SplitFlapAlign = "left" | "center" | "right";

export type SplitFlapDisplayProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /** The text the board settles on. Rendered uppercase against `charset`. */
  value: string;
  /** Fixed number of flaps. Shorter values are padded, longer ones truncated. */
  length?: number;
  /** How the value sits inside a wider `length`. */
  align?: SplitFlapAlign;
  /** Flap size preset. */
  size?: SplitFlapSize;
  /**
   * Ordered glyph sequence the flaps rotate through (space is the blank flap).
   * Pass an array to give each column its own reel by position — e.g. a clock's
   * tens-of-seconds column only cycles `"012345"` so `5 → 0` wraps in one flip
   * instead of climbing `6 7 8 9`.
   */
  charset?: string | string[];
  /** Seconds each successive column waits before it starts — the wave. */
  stagger?: number;
  /** Cap on how many flips a single column will spin before settling. */
  maxFlaps?: number;
};

/** Mechanical tick of one flap — the board's characteristic cadence (like the
 * marquee's `--duration`, this is a domain constant, not a micro-motion token).
 * Mirrors the `0.12s` baked into the inlined flap keyframes below. */
const TICK = 0.12;

const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:-'!?@#&/";

const sizeClasses: Record<SplitFlapSize, string> = {
  sm: "h-9 w-6 text-xl [perspective:180px]",
  md: "h-14 w-10 text-4xl [perspective:280px]",
  lg: "h-20 w-14 text-6xl [perspective:400px]",
};

const alignClasses: Record<SplitFlapAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/** Forward distance from `a` to `b` walking the charset (wrapping). */
function fwdDistance(a: string, b: string, charset: string): number {
  const i = charset.indexOf(a);
  const j = charset.indexOf(b);
  if (i < 0 || j < 0) return 0;
  return (j - i + charset.length) % charset.length;
}

/** One step forward along the charset toward `to`. Blank is the empty state,
 * not a reel glyph, so clearing to a space is always a single flip (never a
 * long forward spin from wherever the space sits in the charset). */
function stepToward(from: string, to: string, charset: string): string {
  if (to === " ") return " ";
  const i = charset.indexOf(from);
  const j = charset.indexOf(to);
  if (i < 0 || j < 0 || i === j) return to;
  return charset[(i + 1) % charset.length];
}

/** The glyph `offset` places before `char` along the charset. */
function charAtOffset(char: string, offset: number, charset: string): string {
  const i = charset.indexOf(char);
  if (i < 0) return char;
  const n = charset.length;
  return charset[(((i + offset) % n) + n) % n];
}

type HalfProps = {
  char: string;
  part: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
};

/** One leaf of a flap. The glyph is drawn at full card height inside a clipped
 * half, so the top and bottom leaves reconstruct a single seamless letter. Used
 * both as a static background leaf and — with animation classes — as a moving
 * fold, so it always occupies exactly half the digit it sits in. */
function Half({ char, part, className, style, onAnimationEnd }: HalfProps) {
  const isTop = part === "top";
  return (
    <div
      className={`absolute inset-x-0 ${isTop ? "top-0 rounded-t-md border-b" : "bottom-0 rounded-b-md border-t"} h-1/2 overflow-hidden border-[var(--background,#09090b)]/15 bg-[var(--foreground,#fafafa)] text-[var(--background,#09090b)] ${className ?? ""}`}
      style={style}
      onAnimationEnd={onAnimationEnd}
    >
      <div
        className={`absolute inset-x-0 ${isTop ? "top-0" : "bottom-0"} flex h-[200%] items-center justify-center font-mono font-semibold leading-none tabular-nums`}
      >
        {char === " " ? " " : char}
      </div>
    </div>
  );
}

type FlapDigitProps = {
  target: string;
  active: boolean;
  startDelay: number;
  size: SplitFlapSize;
  charset: string;
  maxFlaps: number;
};

function FlapDigit({
  target,
  active,
  startDelay,
  size,
  charset,
  maxFlaps,
}: FlapDigitProps) {
  const reduce = useReducedMotion();
  const [settled, setSettled] = React.useState(" ");
  const steppedRef = React.useRef(0);
  const lastDesiredRef = React.useRef(" ");

  // Blank until the board is scrolled into view, then settle on the target.
  const desired = active ? target : " ";

  // New target → reset the per-column wave counter so the first flip staggers.
  /* eslint-disable react-hooks/refs -- 保留 GodUI 原始實作：render 期間重設波浪計數 ref */
  if (desired !== lastDesiredRef.current) {
    lastDesiredRef.current = desired;
    steppedRef.current = 0;
  }
  /* eslint-enable react-hooks/refs */

  React.useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 保留原始實作：偏好減少動態時直接定格
      setSettled(desired);
      return;
    }
    // Never spin more than `maxFlaps` — fast-forward the head of a long run.
    // Blanks clear in one flip (see stepToward), so they never pre-position.
    if (desired !== " " && fwdDistance(settled, desired, charset) > maxFlaps) {
      setSettled(charAtOffset(desired, -maxFlaps, charset));
    }
  }, [reduce, desired, settled, charset, maxFlaps]);

  const flipping = !reduce && settled !== desired;
  const next = flipping ? stepToward(settled, desired, charset) : settled;

  // eslint-disable-next-line react-hooks/refs -- 保留原始實作：讀取波浪計數決定首翻延遲
  const firstOfRun = steppedRef.current === 0;
  const fallDelay = firstOfRun ? startDelay : 0;

  return (
    <div
      aria-hidden
      className={`relative shrink-0 select-none ${sizeClasses[size]}`}
    >
      {/* Static leaves: the next glyph's top is revealed as the old top falls;
          the old bottom holds until the new bottom rises over it. */}
      <Half char={next} part="top" />
      <Half char={settled} part="bottom" />

      {flipping ? (
        // Keyed on the step so each flip remounts and restarts the keyframes.
        <React.Fragment key={`${settled}-${next}`}>
          <Half
            char={settled}
            part="top"
            className="himari-split-flap-fall z-10 origin-bottom [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ animationDelay: `${fallDelay}s` }}
          />
          <Half
            char={next}
            part="bottom"
            className="himari-split-flap-rise z-10 origin-top [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ animationDelay: `${fallDelay + TICK}s` }}
            onAnimationEnd={() => {
              steppedRef.current += 1;
              setSettled(next);
            }}
          />
        </React.Fragment>
      ) : null}

      {/* Center hinge shadow — a static seam, no animated paint. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-[var(--background,#09090b)]/25" />
    </div>
  );
}

const SplitFlapDisplay = React.forwardRef<
  HTMLDivElement,
  SplitFlapDisplayProps
>(
  (
    {
      value,
      length,
      align = "left",
      size = "md",
      charset = DEFAULT_CHARSET,
      stagger = 0.06,
      maxFlaps = 12,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as HTMLDivElement,
    );
    const inView = useInViewOnce(ref);

    const upper = value.toUpperCase();
    const count = length ?? upper.length;
    const chars = React.useMemo(() => {
      const pad = Math.max(0, count - upper.length);
      const body = upper.slice(0, count);
      if (align === "left") return (body + " ".repeat(pad)).slice(0, count);
      if (align === "right") return (" ".repeat(pad) + body).slice(-count);
      const left = Math.floor(pad / 2);
      return (" ".repeat(left) + body + " ".repeat(pad - left)).slice(0, count);
    }, [upper, count, align]);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={value}
        data-slot="split-flap-display"
        className={`inline-flex gap-1 ${alignClasses[align]} rounded-lg bg-[var(--muted,#27272a)] p-2 ${className ?? ""}`}
        {...props}
      >
        {Array.from(chars).map((char, i) => (
          <FlapDigit
            // 翻牌欄位是固定位置的插槽，索引即識別
            key={i}
            target={char}
            active={inView}
            startDelay={i * stagger}
            size={size}
            charset={
              Array.isArray(charset) ? (charset[i] ?? DEFAULT_CHARSET) : charset
            }
            maxFlaps={maxFlaps}
          />
        ))}
        <style>{`
          .himari-split-flap-fall { animation: himari-split-flap-fall 0.12s ease-in both; }
          .himari-split-flap-rise { animation: himari-split-flap-rise 0.12s ease-out both; }
          @keyframes himari-split-flap-fall { from { transform: rotateX(0deg); } to { transform: rotateX(-90deg); } }
          @keyframes himari-split-flap-rise { from { transform: rotateX(90deg); } to { transform: rotateX(0deg); } }
          @media (prefers-reduced-motion: reduce) {
            .himari-split-flap-fall, .himari-split-flap-rise { animation: none; }
          }
        `}</style>
      </div>
    );
  },
);
SplitFlapDisplay.displayName = "SplitFlapDisplay";

export { SplitFlapDisplay };
