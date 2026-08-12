"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/magic-card> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn、以 class/媒體查詢偵測深色模式取代 next-themes、
// 以 backgroundColor / borderColor props 取代 shadcn 的 --color-background / --color-border）。

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

/**
 * 魔法卡片：游標靠近時邊框浮現漸層、卡片內跟著游標出現柔和光暈；
 * 另有 orb 模式改為一顆彈簧跟隨的模糊光球。深色模式自動偵測（html.dark 或系統偏好）。
 * @example
 * <MagicCard className="rounded-xl p-8">
 *   <h3>標題</h3>
 * </MagicCard>
 */

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface MagicCardBaseProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  /** 卡片內層背景色；未指定時依深淺色模式自動選擇 */
  backgroundColor?: string;
  /** 靜止時的邊框色；未指定時依深淺色模式自動選擇 */
  borderColor?: string;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient";

  gradientColor?: string;
  gradientOpacity?: number;

  glowFrom?: never;
  glowTo?: never;
  glowAngle?: never;
  glowSize?: never;
  glowBlur?: never;
  glowOpacity?: never;
}

interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: "orb";

  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;

  gradientColor?: never;
  gradientOpacity?: never;
}

type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps;
type ResetReason = "enter" | "leave" | "global" | "init";

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === "orb";
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient",
    backgroundColor,
    borderColor,
  } = props;

  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? "#ee4f27") : "#ee4f27";
  const glowTo = isOrbMode(props) ? (props.glowTo ?? "#6b21ef") : "#6b21ef";
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90;
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420;
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60;
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9;
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const root = document.documentElement;
      setIsDarkTheme(
        root.classList.contains("dark") ||
          (!root.classList.contains("light") && colorScheme.matches)
      );
    };
    update();
    colorScheme.addEventListener("change", update);
    const themeObserver = new MutationObserver(update);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      colorScheme.removeEventListener("change", update);
      themeObserver.disconnect();
    };
  }, []);

  const resolvedBackground =
    backgroundColor ?? (isDarkTheme ? "#0a0a0a" : "#ffffff");
  const resolvedBorder = borderColor ?? (isDarkTheme ? "#262626" : "#e5e5e5");

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const modeRef = useRef(mode);
  const glowOpacityRef = useRef(glowOpacity);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(
    (reason: ResetReason = "leave") => {
      const currentMode = modeRef.current;

      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }

      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
      style={{
        background: useMotionTemplate`
          linear-gradient(${resolvedBackground} 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            ${resolvedBorder} 100%
          ) border-box
        `,
      }}
    >
      <div
        className="absolute inset-px z-20 rounded-[inherit]"
        style={{ background: resolvedBackground }}
      />

      {mode === "gradient" && (
        <motion.div
          suppressHydrationWarning
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
            opacity: gradientOpacity,
          }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          suppressHydrationWarning
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,

            mixBlendMode: isDarkTheme ? "screen" : "multiply",
            willChange: "transform, opacity",
          }}
        />
      )}
      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
