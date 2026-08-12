"use client";

import { useEffect, useRef } from "react";

/**
 * 粒子背景：canvas 上的小圓點緩慢漂浮，數量、顏色、速度皆可調。
 * 絕對定位鋪滿父容器，請包在 `relative` 容器內使用；
 * 已處理 devicePixelRatio、視窗縮放與 unmount 清理，並尊重 prefers-reduced-motion。
 * @example
 * <div className="relative h-72 overflow-hidden bg-zinc-950">
 *   <ParticlesBackground quantity={80} />
 * </div>
 */
type ParticlesBackgroundProps = {
  /** 粒子數量 */
  quantity?: number;
  /** 粒子顏色（任何合法 CSS 顏色） */
  color?: string;
  /** 漂浮速度倍率，1 約為每秒 24px */
  speed?: number;
  /** 粒子最大半徑（px） */
  size?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

export function ParticlesBackground({
  quantity = 60,
  color = "#a1a1aa",
  speed = 1,
  size = 2,
  className = "",
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < quantity; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (0.15 + Math.random() * 0.25) * speed;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          r: 0.5 + Math.random() * size,
          alpha: 0.2 + Math.random() * 0.6,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      if (reduceMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // 超出邊界就從對側回來，保持粒子密度均勻
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;
      }
      draw();
      rafId = window.requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    if (reduceMotion) {
      draw(); // 減少動態偏好：只畫靜態一幀
    } else {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [quantity, color, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
