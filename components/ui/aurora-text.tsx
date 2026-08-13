"use client";

// 移植自 GodUI <https://godui.design/docs/components/text/aurora-text> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（動畫 keyframes 內嵌）。

import * as React from "react";

/**
 * 極光文字：漸層色彩在文字上緩緩流動，如極光般循環變換，離開視窗時自動暫停動畫。
 * @example <AuroraText className="text-5xl font-bold">極光文字</AuroraText>
 */
export type AuroraTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
  /** Gradient stops the aurora cycles through. Defaults to a rainbow spectrum. */
  colors?: string[];
  /** Speed multiplier — `1` ≈ 10s per cycle, higher is faster. */
  speed?: number;
};

// Full-spectrum rainbow, looped back to the first stop for a seamless cycle.
const RAINBOW_COLORS = [
  "#ff2d55",
  "#ff9500",
  "#ffd60a",
  "#34c759",
  "#00c7be",
  "#0a84ff",
  "#5e5ce6",
  "#bf5af2",
];

const AuroraText = React.forwardRef<HTMLSpanElement, AuroraTextProps>(
  (
    {
      children,
      className,
      colors = RAINBOW_COLORS,
      speed = 1,
      style,
      ...props
    },
    ref,
  ) => {
    const stops = [...colors, colors[0]].join(", ");

    // The gradient runs on an infinite background-position keyframe (main-thread
    // paint). Pause it whenever the text is off screen so it costs nothing while
    // idle — resumes seamlessly on scroll-in.
    const gradientRef = React.useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
      const el = gradientRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver(
        ([entry]) => {
          el.style.animationPlayState = entry.isIntersecting ? "" : "paused";
        },
        { rootMargin: "128px" },
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    return (
      <span
        ref={ref}
        data-slot="aurora-text"
        className={`relative inline-block ${className ?? ""}`}
        {...props}
      >
        <span className="sr-only">{children}</span>
        <span
          ref={gradientRef}
          aria-hidden="true"
          className="himari-aurora-text bg-[length:200%_auto] bg-clip-text text-transparent"
          style={
            {
              backgroundImage: `linear-gradient(135deg, ${stops})`,
              "--aurora-text-speed": `${10 / speed}s`,
              ...style,
            } as React.CSSProperties
          }
        >
          {children}
        </span>
        <style>{`
          .himari-aurora-text {
            animation: himari-aurora-text var(--aurora-text-speed, 10s) linear infinite;
          }
          @keyframes himari-aurora-text {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .himari-aurora-text { animation: none; }
          }
        `}</style>
      </span>
    );
  },
);
AuroraText.displayName = "AuroraText";

export { AuroraText };
