"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type Marker } from "cobe";

/**
 * 互動 3D 地球：以 cobe 繪製的點陣地球，滑鼠或觸控可拖曳旋轉，
 * 放開後自動緩慢自轉；標記點可自訂。unmount 時會呼叫 destroy() 釋放 WebGL 資源。
 * 寬度跟隨容器、保持正方形比例。
 * @example
 * <Globe className="w-72" markers={[{ location: [25.03, 121.56], size: 0.1 }]} />
 */
type GlobeProps = {
  /** 標記點：location 為 [緯度, 經度]，size 為相對大小 */
  markers?: Marker[];
  /** 自轉速度（每幀增加的弧度），0 為不自轉 */
  rotateSpeed?: number;
  /** 地球底色（RGB 各分量 0–1） */
  baseColor?: [number, number, number];
  /** 標記點顏色（RGB 各分量 0–1） */
  markerColor?: [number, number, number];
  /** 光暈顏色（RGB 各分量 0–1） */
  glowColor?: [number, number, number];
  /** 暗色模式程度 0–1 */
  dark?: number;
  className?: string;
};

const DEFAULT_MARKERS: Marker[] = [
  { location: [25.033, 121.5654], size: 0.1 }, // 台北
  { location: [35.6762, 139.6503], size: 0.08 }, // 東京
  { location: [1.3521, 103.8198], size: 0.06 }, // 新加坡
  { location: [51.5074, -0.1278], size: 0.07 }, // 倫敦
  { location: [40.7128, -74.006], size: 0.08 }, // 紐約
  { location: [-33.8688, 151.2093], size: 0.06 }, // 雪梨
];

export function Globe({
  markers = DEFAULT_MARKERS,
  rotateSpeed = 0.004,
  baseColor = [0.3, 0.3, 0.35],
  markerColor = [0.98, 0.6, 0.2],
  glowColor = [0.8, 0.8, 0.9],
  dark = 1,
  className = "",
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerStart = useRef<number | null>(null);
  const pointerDelta = useRef(0);

  // 陣列 props 以值序列化當依賴，避免呼叫端每次 render 傳新陣列就重建 globe
  const markersKey = JSON.stringify(markers);
  const baseColorKey = JSON.stringify(baseColor);
  const markerColorKey = JSON.stringify(markerColor);
  const glowColorKey = JSON.stringify(glowColor);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const autoSpeed = reduceMotion ? 0 : rotateSpeed;

    let width = container.clientWidth;
    let phi = 0;
    let rafId = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor,
      markerColor,
      glowColor,
      markers,
    });

    const frame = () => {
      if (pointerStart.current === null) phi += autoSpeed;
      globe.update({
        phi: phi + pointerDelta.current,
        width: width * 2,
        height: width * 2,
      });
      rafId = window.requestAnimationFrame(frame);
    };
    rafId = window.requestAnimationFrame(frame);

    const observer = new ResizeObserver(() => {
      width = container.clientWidth;
      canvas.width = width * 2;
      canvas.height = width * 2;
    });
    observer.observe(container);

    const onPointerDown = (e: PointerEvent) => {
      pointerStart.current = e.clientX - pointerDelta.current * 200;
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerStart.current === null) return;
      pointerDelta.current = (e.clientX - pointerStart.current) / 200;
    };
    const endDrag = () => {
      if (pointerStart.current === null) return;
      // 把拖曳量併入基準角度，之後從這裡繼續自轉
      phi += pointerDelta.current;
      pointerDelta.current = 0;
      pointerStart.current = null;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      globe.destroy();
    };
    // markers 等陣列改以序列化字串比較（見上方 *Key 變數）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotateSpeed, dark, markersKey, baseColorKey, markerColorKey, glowColorKey]);

  return (
    <div ref={containerRef} className={`relative aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        style={{ cursor: "grab", contain: "layout paint size" }}
      />
    </div>
  );
}
