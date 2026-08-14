// 目錄頁預覽牆用：這些元件吃 canvas / WebGL / 物理引擎，
// 一整排同時跑會把頁面拖垮，所以改成滑鼠移入才啟動。
import type { ComponentEntry } from "./registry/types";

const HEAVY_SLUGS = new Set([
  "flickering-grid",
  "flow-field",
  "fluid-cursor",
  "globe",
  "gravity",
  "hero-parallax",
  "image-trail",
  "liquid-metaballs",
  "particle-dissolve",
  "particles-background",
  "pixel-grid",
  "retro-grid",
  "three-d-marquee",
  "topographic-drift",
  "warp-starfield",
  "world-map",
]);

export function isHeavyDemo(entry: ComponentEntry) {
  // canvas 分類整組都是 WebGL / 2D canvas 特效
  return entry.category === "canvas" || HEAVY_SLUGS.has(entry.slug);
}
