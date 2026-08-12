"use client";

import { useSyncExternalStore } from "react";

type Ctx2D = CanvasRenderingContext2D & { drawElementImage?: unknown };

let cached: boolean | null = null;
function detectSupport(): boolean {
  if (cached === null) {
    const ctx = document.createElement("canvas").getContext("2d") as Ctx2D | null;
    cached = typeof ctx?.drawElementImage === "function";
  }
  return cached;
}

/**
 * WebGL 畫布類元件共用的支援偵測提示：
 * 瀏覽器沒有 HTML-in-canvas 實驗 API（drawElementImage）時，
 * 在 demo 上方顯示說明，避免看起來像元件壞掉。
 */
export function CanvasApiNote({
  fallback,
}: {
  /** partial＝降級後仍有部分效果；none＝降級後只剩原始內容 */
  fallback: "partial" | "none";
}) {
  // SSR 期間先當作支援（不顯示提示），掛載後以實際偵測結果為準
  const supported = useSyncExternalStore(
    () => () => {},
    detectSupport,
    () => true
  );

  if (supported) return null;

  return (
    <p className="mb-3 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 text-xs leading-relaxed text-accent">
      {fallback === "none"
        ? "⚠ 你的瀏覽器尚未支援 HTML-in-canvas 實驗 API，此效果目前只會顯示原始內容。"
        : "⚠ 你的瀏覽器尚未支援 HTML-in-canvas 實驗 API，目前顯示的是降級版效果。"}
      想先睹為快：在 Chrome 149+ 網址列輸入 chrome://flags/#canvas-draw-element
      開啟旗標並重啟瀏覽器。
    </p>
  );
}
