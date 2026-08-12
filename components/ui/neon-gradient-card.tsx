"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/neon-gradient-card> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn、以檔內 <style> keyframes 取代
// MagicUI 全域的 animate-background-position-spin 動畫）。

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * 霓虹漸層卡片：卡片外圈一層流動的雙色漸層邊框，外加同色系大範圍模糊光暈，
 * 像霓虹燈管一樣發光。顏色、邊框寬度與圓角可調，並尊重 prefers-reduced-motion。
 * @example
 * <NeonGradientCard className="max-w-sm">
 *   <p>內容</p>
 * </NeonGradientCard>
 */

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

const NEON_SPIN_STYLES = `
.himari-neon-spin::before,
.himari-neon-spin::after {
  animation: himari-neon-spin 3s infinite alternate;
}
@keyframes himari-neon-spin {
  0% { background-position: top center; }
  100% { background-position: bottom center; }
}
@media (prefers-reduced-motion: reduce) {
  .himari-neon-spin::before,
  .himari-neon-spin::after {
    animation: none;
  }
}
`;

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number;

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--after-blur": `${dimensions.width / 3}px`,
        } as CSSProperties
      }
      className={cn(
        "relative z-10 size-full rounded-(--border-radius)",
        className
      )}
      {...props}
    >
      <style>{NEON_SPIN_STYLES}</style>
      <div
        className={cn(
          "himari-neon-spin relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6",
          "before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block",
          "before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius) before:content-['']",
          "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]",
          "after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block",
          "after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur) after:content-['']",
          "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80",
          "dark:bg-neutral-900",
          "wrap-break-word"
        )}
      >
        {children}
      </div>
    </div>
  );
};
