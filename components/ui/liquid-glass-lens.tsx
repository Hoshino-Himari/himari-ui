"use client";

// 移植自 GodUI <https://godui.design/docs/components/glass/liquid-glass-lens> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（原本抽在 liquid-glass-utils 的折射工具內嵌進本檔）。

import * as React from "react";

/**
 * 液態玻璃透鏡：一顆跟著游標跑的圓形玻璃鏡片，把底下的真實畫面折射放大並帶色散。
 * 父層必須是 `relative`；鏡片本身 `pointer-events-none`，不會擋住點擊。
 * @example
 * <div className="relative h-72 w-full">
 *   <p>底下的內容</p>
 *   <LiquidGlassLens size={160} />
 * </div>
 */
export type LiquidGlassLensProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Diameter of the circular lens in px. */
  size?: number;
  /** Frost (backdrop blur) in px. */
  blur?: number;
  /** Refraction displacement scale in px — how hard the lens bends light. */
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
 * `128` means "no shift". A `band` of `0` ramps edge-to-edge — a solid
 * converging lens.
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

const LiquidGlassLens = React.forwardRef<HTMLDivElement, LiquidGlassLensProps>(
  (
    {
      children,
      className,
      style,
      size = 160,
      blur = 2,
      strength = 80,
      dispersion = 0.15,
      saturation = 1.6,
      tint,
      sheen = 0.5,
      ...props
    },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const filterId = `lgl-${React.useId().replace(/:/g, "")}`;
    const [hovering, setHovering] = React.useState(false);
    const refract = useRefractionSupport();

    React.useEffect(() => {
      const node = rootRef.current;
      const parent = node?.parentElement;
      if (!node || !parent) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const move = (e: PointerEvent) => {
        if (reduced.matches) return;
        const rect = parent.getBoundingClientRect();
        node.style.setProperty("--lg-px", `${e.clientX - rect.left}px`);
        node.style.setProperty("--lg-py", `${e.clientY - rect.top}px`);
      };
      const enter = () => setHovering(true);
      const leave = () => setHovering(false);

      parent.addEventListener("pointermove", move);
      parent.addEventListener("pointerenter", enter);
      parent.addEventListener("pointerleave", leave);
      return () => {
        parent.removeEventListener("pointermove", move);
        parent.removeEventListener("pointerenter", enter);
        parent.removeEventListener("pointerleave", leave);
      };
    }, []);

    const map = React.useMemo(() => buildDisplacementMap(size, size, 0), [size]);

    const backdrop = refract
      ? `blur(${blur}px) saturate(${saturation}) url(#${filterId})`
      : `blur(${blur}px) saturate(${saturation})`;

    return (
      <div
        ref={mergeRefs(rootRef, ref)}
        data-slot="liquid-glass-lens"
        className={`pointer-events-none absolute left-0 top-0 isolate z-50 flex items-center justify-center overflow-hidden rounded-full border border-white/30 text-center shadow-xl transition-opacity duration-200 [will-change:transform] motion-reduce:hidden ${className ?? ""}`}
        style={
          {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: tint ?? "rgba(255,255,255,0.08)",
            opacity: hovering ? 1 : 0,
            transform:
              "translate(calc(var(--lg-px, 0px) - 50%), calc(var(--lg-py, 0px) - 50%))",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Refraction / frost layer — samples the live DOM beneath the lens. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            backdropFilter: backdrop,
            WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
          }}
        />

        {/* Fixed top-left sphere glint + inset depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            backgroundImage: `radial-gradient(circle at 32% 28%, rgba(255,255,255,${0.7 * sheen}) 0%, rgba(255,255,255,0) 55%)`,
            boxShadow: `inset 0 2px 2px 0 rgba(255,255,255,${0.6 * sheen}), inset 0 -6px 12px 0 rgba(0,0,0,0.22)`,
          }}
        />

        {refract && (
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
LiquidGlassLens.displayName = "LiquidGlassLens";

export { LiquidGlassLens };
