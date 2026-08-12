"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  type Ref,
} from "react";

/**
 * 彩帶慶祝：自製 canvas 彩紙噴發，不依賴第三方套件。
 * 透過 ref 取得 fire() 從指定位置噴出彩紙，重力 + 旋轉 + 淡出，
 * 動畫結束自動停止繪製；prefers-reduced-motion 時 fire() 不產生動畫。
 * 絕對定位鋪滿父容器，請包在 `relative` 容器內使用。
 * @example
 * const confettiRef = useRef<ConfettiHandle>(null);
 * <div className="relative h-72">
 *   <Confetti ref={confettiRef} />
 *   <button onClick={() => confettiRef.current?.fire()}>慶祝一下</button>
 * </div>
 */
export type ConfettiFireOptions = {
  /** 噴發點 X（0–1，相對容器寬度） */
  x?: number;
  /** 噴發點 Y（0–1，相對容器高度） */
  y?: number;
  /** 彩紙數量 */
  count?: number;
  /** 噴發初速度倍率 */
  power?: number;
  /** 彩紙顏色池（覆蓋元件層級的 colors） */
  colors?: string[];
};

export type ConfettiHandle = {
  fire: (options?: ConfettiFireOptions) => void;
};

type ConfettiProps = {
  ref?: Ref<ConfettiHandle>;
  /** 預設彩紙顏色池 */
  colors?: string[];
  className?: string;
};

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  angle: number;
  spin: number;
  life: number;
  ttl: number;
  wobble: number;
};

const DEFAULT_COLORS = [
  "#f43f5e",
  "#f97316",
  "#facc15",
  "#4ade80",
  "#38bdf8",
  "#a78bfa",
];

export function Confetti({
  ref,
  colors = DEFAULT_COLORS,
  className = "",
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  useEffect(() => {
    // unmount 時停止動畫並清空粒子
    const pieces = piecesRef.current;
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      pieces.length = 0;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    fire(options: ConfettiFireOptions = {}) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return; // 尊重減少動態偏好
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const {
        x = 0.5,
        y = 0.5,
        count = 90,
        power = 1,
        colors: fireColors,
      } = options;
      const pool = fireColors ?? colorsRef.current;
      const originX = x * width;
      const originY = y * height;

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const velocity = (5 + Math.random() * 7) * power;
        piecesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          w: 5 + Math.random() * 5,
          h: 8 + Math.random() * 6,
          color: pool[Math.floor(Math.random() * pool.length)],
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.3,
          life: 0,
          ttl: 90 + Math.random() * 60,
          wobble: Math.random() * Math.PI * 2,
        });
      }

      if (runningRef.current) return;
      runningRef.current = true;

      const tick = () => {
        const pieces = piecesRef.current;
        ctx.clearRect(0, 0, width, height);
        for (let i = pieces.length - 1; i >= 0; i--) {
          const p = pieces[i];
          p.life += 1;
          p.vy += 0.18; // 重力
          p.vx *= 0.985; // 空氣阻力
          p.vy *= 0.99;
          p.wobble += 0.1;
          p.x += p.vx + Math.cos(p.wobble) * 0.6;
          p.y += p.vy;
          p.angle += p.spin;

          const fade = 1 - p.life / p.ttl;
          if (fade <= 0 || p.y > height + 24) {
            pieces.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = Math.min(1, fade * 2);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          // 模擬紙片翻轉：寬度隨 wobble 變化
          ctx.scale(1, 0.4 + Math.abs(Math.cos(p.wobble)) * 0.6);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
        if (pieces.length > 0) {
          rafRef.current = window.requestAnimationFrame(tick);
        } else {
          // 全部落幕：清空畫布並停止迴圈
          ctx.clearRect(0, 0, width, height);
          runningRef.current = false;
        }
      };
      rafRef.current = window.requestAnimationFrame(tick);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
