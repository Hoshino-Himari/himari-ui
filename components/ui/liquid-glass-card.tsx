"use client";

// 移植自 GodUI <https://godui.design/docs/components/glass/liquid-glass-card> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（原本抽在 liquid-glass-utils 的折射工具內嵌進本檔）。

import * as React from "react";

/**
 * 液態玻璃卡片：用 SVG 位移貼圖做出真實折射的玻璃面板，邊緣會把背後畫面折彎並帶色散，
 * 游標移動時浮現鏡面高光。放在漸層或照片背景上效果最好。
 * @example
 * <LiquidGlassCard className="w-72 p-6">
 *   <p>玻璃卡片</p>
 * </LiquidGlassCard>
 */
export type LiquidGlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Corner radius in px. */
  radius?: number;
  /** Frost (backdrop blur) in px. */
  blur?: number;
  /** Refraction displacement scale in px — how hard the edges bend. */
  strength?: number;
  /** Chromatic aberration amount, `0`–`1`. Splits the R/G/B refraction. */
  dispersion?: number;
  /** Backdrop saturation multiplier. */
  saturation?: number;
  /** Glass tint color. Defaults to a subtle translucent white. */
  tint?: string;
  /** Specular highlight intensity, `0`–`1`. */
  sheen?: number;
};

/**
 * Builds the displacement map fed to `feDisplacementMap`. The red channel
 * encodes the horizontal sampling shift, the green channel the vertical one;
 * `128` means "no shift". Two channel-isolated linear gradients are
 * screen-blended so R and G vary independently.
 *
 * `band` holds the gradient neutral across the middle so only the rim bends
 * (the flat panel's convex-edge look).
 */
function buildDisplacementMap(width: number, height: number, band = 0.3): string {
  const lo = (0.5 - band / 2).toFixed(3);
  const hi = (0.5 + band / 2).toFixed(3);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
<linearGradient id="x" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="#ff0000"/>
<stop offset="${lo}" stop-color="#800000"/>
<stop offset="${hi}" stop-color="#800000"/>
<stop offset="1" stop-color="#000000"/>
</linearGradient>
<linearGradient id="y" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#00ff00"/>
<stop offset="${lo}" stop-color="#008000"/>
<stop offset="${hi}" stop-color="#008000"/>
<stop offset="1" stop-color="#000000"/>
</linearGradient>
</defs>
<rect width="${width}" height="${height}" fill="url(#x)"/>
<rect width="${width}" height="${height}" fill="url(#y)" style="mix-blend-mode:screen"/>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const RED_CHANNEL = "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0";
const GREEN_CHANNEL = "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0";
const BLUE_CHANNEL = "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0";

/**
 * Chromatic-aberration displacement chain: runs the map at three scales and
 * recombines isolated R/G/B channels, so color fringes where the bend is
 * strongest.
 */
function RefractionFilter({
  id,
  map,
  strength,
  dispersion,
}: {
  id: string;
  map: string;
  strength: number;
  dispersion: number;
}) {
  return (
    <filter
      id={id}
      x="0"
      y="0"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
    >
      <feImage href={map} result="map" preserveAspectRatio="none" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={strength * (1 + dispersion)}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispR"
      />
      <feColorMatrix in="dispR" type="matrix" values={RED_CHANNEL} result="red" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={strength}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispG"
      />
      <feColorMatrix
        in="dispG"
        type="matrix"
        values={GREEN_CHANNEL}
        result="green"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={strength * (1 - dispersion)}
        xChannelSelector="R"
        yChannelSelector="G"
        result="dispB"
      />
      <feColorMatrix
        in="dispB"
        type="matrix"
        values={BLUE_CHANNEL}
        result="blue"
      />
      <feBlend in="red" in2="green" mode="screen" result="rg" />
      <feBlend in="rg" in2="blue" mode="screen" />
    </filter>
  );
}

/** `backdrop-filter: url()` (live-DOM refraction) is Chrome/Edge only. */
function useRefractionSupport(): boolean {
  const [refract, setRefract] = React.useState(false);
  React.useEffect(() => {
    setRefract(
      typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("backdrop-filter", "url(#a)"),
    );
  }, []);
  return refract;
}

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  (
    {
      children,
      className,
      style,
      radius = 28,
      blur = 2,
      strength = 60,
      dispersion = 0.15,
      saturation = 1.6,
      tint,
      sheen = 0.5,
      onPointerMove,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const filterId = `lgc-${React.useId().replace(/:/g, "")}`;
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    const [hovering, setHovering] = React.useState(false);
    const refract = useRefractionSupport();

    React.useEffect(() => {
      const node = rootRef.current;
      if (!node) return;
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ width: Math.round(width), height: Math.round(height) });
      });
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    const map = React.useMemo(
      () =>
        size.width > 0 && size.height > 0
          ? buildDisplacementMap(size.width, size.height, 0.3)
          : null,
      [size.width, size.height],
    );

    const active = refract && map !== null;
    const backdrop = active
      ? `blur(${blur}px) saturate(${saturation}) url(#${filterId})`
      : `blur(${blur}px) saturate(${saturation})`;

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const node = rootRef.current;
      if (
        node &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const rect = node.getBoundingClientRect();
        node.style.setProperty(
          "--lg-x",
          `${((e.clientX - rect.left) / rect.width) * 100}%`,
        );
        node.style.setProperty(
          "--lg-y",
          `${((e.clientY - rect.top) / rect.height) * 100}%`,
        );
      }
      onPointerMove?.(e);
    };
    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
      setHovering(true);
      onPointerEnter?.(e);
    };
    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
      setHovering(false);
      onPointerLeave?.(e);
    };

    return (
      <div
        ref={mergeRefs(rootRef, ref)}
        data-slot="liquid-glass-card"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`group relative isolate overflow-hidden border border-white/20 shadow-lg ${className ?? ""}`}
        style={
          {
            borderRadius: `${radius}px`,
            backgroundColor: tint ?? "rgba(255,255,255,0.08)",
            "--lg-x": "50%",
            "--lg-y": "50%",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Refraction / frost layer — samples the live DOM behind the card. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            backdropFilter: backdrop,
            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
          }}
        />

        {/* Specular highlight — radial glow that tracks the pointer and fades
            out on leave. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen transition-opacity duration-200 motion-reduce:hidden"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(circle at var(--lg-x) var(--lg-y), rgba(255,255,255,${sheen}) 0%, rgba(255,255,255,0) 45%)`,
          }}
        />
        {/* Static edge sheen for the wet-glass rim. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: `inset 0 1px 0 0 rgba(255,255,255,${0.5 * sheen}), inset 0 -1px 1px 0 rgba(0,0,0,0.15)`,
          }}
        />

        {active && map && (
          <svg aria-hidden="true" className="absolute size-0">
            <RefractionFilter
              id={filterId}
              map={map}
              strength={strength}
              dispersion={dispersion}
            />
          </svg>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
LiquidGlassCard.displayName = "LiquidGlassCard";

export { LiquidGlassCard };
